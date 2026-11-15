// STILL: crea i video da condividere fotogramma per fotogramma (WebCodecs + un piccolo scrittore MP4).
// Rispetto a MediaRecorder non registra lo schermo in tempo reale: ogni fotogramma viene disegnato al suo
// istante esatto, quindi il file ha sempre la durata giusta (niente MP4 "a pezzi" che alcuni telefoni
// leggono come video di pochi secondi) ed è anche più veloce da creare.
// Uso: await encodeCanvasMp4({ width, height, fps, duration, draw: (canvas, t) => {...}, onProgress })
// Restituisce un Blob video/mp4, oppure null se il dispositivo non sa codificare H.264.

const STILL_MP4_CODECS = ['avc1.640028', 'avc1.4d0028', 'avc1.420028', 'avc1.42e028'];

const mp4Supported = () => typeof VideoEncoder !== 'undefined' && typeof VideoFrame !== 'undefined';

// --- Scrittura dei box MP4 ---
const mp4Str = (s) => Array.from(s).map(c => c.charCodeAt(0));
const mp4U32 = (v) => [(v >>> 24) & 255, (v >>> 16) & 255, (v >>> 8) & 255, v & 255];
const mp4U16 = (v) => [(v >>> 8) & 255, v & 255];
const mp4Concat = (parts) => {
  let len = 0;
  parts.forEach(p => { len += p.length; });
  const out = new Uint8Array(len);
  let o = 0;
  parts.forEach(p => { out.set(p, o); o += p.length; });
  return out;
};
const mp4Box = (type, ...payload) => {
  const body = mp4Concat(payload.map(p => (p instanceof Uint8Array ? p : new Uint8Array(p))));
  return mp4Concat([new Uint8Array([...mp4U32(body.length + 8), ...mp4Str(type)]), body]);
};
const mp4Full = (type, version, flags, ...payload) => mp4Box(type, [version, (flags >>> 16) & 255, (flags >>> 8) & 255, flags & 255], ...payload);
const MP4_MATRIX = [0x00010000, 0, 0, 0, 0x00010000, 0, 0, 0, 0x40000000].flatMap(mp4U32);

const buildMp4 = ({ width, height, timescale, sampleDelta, samples, avcC }) => {
  const n = samples.length;
  const mediaDuration = n * sampleDelta;
  const movieDuration = Math.round(mediaDuration * 1000 / timescale);
  const ftyp = mp4Box('ftyp', mp4Str('isom'), mp4U32(512), mp4Str('isomiso2avc1mp41'));

  const moov = (mdatOffset) => {
    const mvhd = mp4Full('mvhd', 0, 0, mp4U32(0), mp4U32(0), mp4U32(1000), mp4U32(movieDuration),
      mp4U32(0x00010000), mp4U16(0x0100), new Array(10).fill(0), MP4_MATRIX, new Array(24).fill(0), mp4U32(2));
    const tkhd = mp4Full('tkhd', 0, 3, mp4U32(0), mp4U32(0), mp4U32(1), mp4U32(0), mp4U32(movieDuration),
      new Array(8).fill(0), mp4U16(0), mp4U16(0), mp4U16(0), mp4U16(0), MP4_MATRIX, mp4U32(width << 16), mp4U32(height << 16));
    const mdhd = mp4Full('mdhd', 0, 0, mp4U32(0), mp4U32(0), mp4U32(timescale), mp4U32(mediaDuration), mp4U16(0x55c4), mp4U16(0));
    const hdlr = mp4Full('hdlr', 0, 0, mp4U32(0), mp4Str('vide'), new Array(12).fill(0), mp4Str('VideoHandler'), [0]);
    const vmhd = mp4Full('vmhd', 0, 1, new Array(8).fill(0));
    const dinf = mp4Box('dinf', mp4Full('dref', 0, 0, mp4U32(1), mp4Full('url ', 0, 1)));
    const avc1 = mp4Box('avc1', new Array(6).fill(0), mp4U16(1), new Array(16).fill(0), mp4U16(width), mp4U16(height),
      mp4U32(0x00480000), mp4U32(0x00480000), mp4U32(0), mp4U16(1), new Array(32).fill(0), mp4U16(0x0018), mp4U16(0xffff),
      mp4Box('avcC', avcC));
    const stsd = mp4Full('stsd', 0, 0, mp4U32(1), avc1);
    const stts = mp4Full('stts', 0, 0, mp4U32(1), mp4U32(n), mp4U32(sampleDelta));
    const keys = [];
    samples.forEach((s, i) => { if (s.key) keys.push(...mp4U32(i + 1)); });
    const stss = mp4Full('stss', 0, 0, mp4U32(keys.length / 4), keys);
    const stsc = mp4Full('stsc', 0, 0, mp4U32(1), mp4U32(1), mp4U32(n), mp4U32(1));
    const sizes = new Uint8Array(n * 4);
    samples.forEach((s, i) => sizes.set(mp4U32(s.data.length), i * 4));
    const stsz = mp4Full('stsz', 0, 0, mp4U32(0), mp4U32(n), sizes);
    const stco = mp4Full('stco', 0, 0, mp4U32(1), mp4U32(mdatOffset));
    const stbl = mp4Box('stbl', stsd, stts, stss, stsc, stsz, stco);
    const minf = mp4Box('minf', vmhd, dinf, stbl);
    const mdia = mp4Box('mdia', mdhd, hdlr, minf);
    return mp4Box('moov', mvhd, mp4Box('trak', tkhd, mdia));
  };

  // moov prima dei dati ("faststart"): la sua dimensione non dipende dall'offset, quindi si calcola due volte
  const moovSize = moov(0).length;
  const dataSize = samples.reduce((sum, s) => sum + s.data.length, 0);
  const mdatHeader = new Uint8Array([...mp4U32(dataSize + 8), ...mp4Str('mdat')]);
  return new Blob([ftyp, moov(ftyp.length + moovSize + 8), mdatHeader, ...samples.map(s => s.data)], { type: 'video/mp4' });
};

const pickMp4Config = async (width, height, fps, bitrate) => {
  for (const codec of STILL_MP4_CODECS) {
    const config = { codec, width, height, bitrate, framerate: fps, avc: { format: 'avc' } };
    try {
      const res = await VideoEncoder.isConfigSupported(config);
      if (res && res.supported) return config;
    } catch (e) { /* prova il prossimo */ }
  }
  return null;
};

const encodeCanvasMp4 = async ({ width, height, fps = 30, duration, draw, onProgress, bitrate = 8000000 }) => {
  if (!mp4Supported()) return null;
  const config = await pickMp4Config(width, height, fps, bitrate);
  if (!config) return null;

  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const samples = [];
  let avcC = null;
  let failure = null;
  const encoder = new VideoEncoder({
    output: (chunk, meta) => {
      if (meta && meta.decoderConfig && meta.decoderConfig.description && !avcC) {
        const d = meta.decoderConfig.description;
        avcC = d instanceof ArrayBuffer ? new Uint8Array(d.slice(0)) : new Uint8Array(d.buffer.slice(d.byteOffset, d.byteOffset + d.byteLength));
      }
      const data = new Uint8Array(chunk.byteLength);
      chunk.copyTo(data);
      samples.push({ data, key: chunk.type === 'key' });
    },
    error: (e) => { failure = e; }
  });
  encoder.configure(config);

  const total = Math.max(1, Math.round(duration * fps));
  const frameUs = 1e6 / fps;
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  try {
    for (let i = 0; i < total; i++) {
      if (failure) throw failure;
      draw(canvas, i / fps);
      const frame = new VideoFrame(canvas, { timestamp: Math.round(i * frameUs), duration: Math.round(frameUs) });
      encoder.encode(frame, { keyFrame: i % (fps * 2) === 0 });
      frame.close();
      // Non riempire troppo la coda del codificatore e lascia respirare l'interfaccia
      while (encoder.encodeQueueSize > 4 && !failure) await wait(4);
      if (i % 6 === 0) {
        if (onProgress) onProgress(Math.min(99, Math.round((i / total) * 100)));
        await wait(0);
      }
    }
    await encoder.flush();
  } finally {
    if (encoder.state !== 'closed') encoder.close();
  }
  if (failure) throw failure;
  if (!avcC || !samples.length || !samples[0].key) throw new Error('mp4-encode');
  if (onProgress) onProgress(100);
  return buildMp4({ width, height, timescale: fps * 1000, sampleDelta: 1000, samples, avcC });
};
