// GENERATO da scripts/build-template.js partendo da src/app-template.html: non modificare a mano.
// eslint-disable-next-line
var STILL_RENDER = (function () {
const { createElementVNode: _createElementVNode, createTextVNode: _createTextVNode, toDisplayString: _toDisplayString, openBlock: _openBlock, createElementBlock: _createElementBlock, createCommentVNode: _createCommentVNode, normalizeClass: _normalizeClass, vModelText: _vModelText, withDirectives: _withDirectives, renderList: _renderList, Fragment: _Fragment, normalizeStyle: _normalizeStyle, withModifiers: _withModifiers, withKeys: _withKeys, vModelCheckbox: _vModelCheckbox, vModelSelect: _vModelSelect, createStaticVNode: _createStaticVNode } = Vue

const _hoisted_1 = {
  key: 0,
  class: "flex-1 relative overflow-hidden bg-bianco flex flex-col"
}
const _hoisted_2 = {
  key: 0,
  class: "relative z-10 flex-1 flex flex-col items-center justify-center p-6 space-y-8 animate-fadeIn"
}
const _hoisted_3 = { class: "w-full pt-4 max-w-xs sm:max-w-none space-y-3" }
const _hoisted_4 = {
  key: 1,
  class: "text-[10px] font-bold text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-center"
}
const _hoisted_5 = {
  key: 1,
  class: "relative z-10 flex-1 overflow-y-auto px-6 py-8 flex flex-col animate-fadeIn"
}
const _hoisted_6 = { class: "flex items-center gap-2 mb-6" }
const _hoisted_7 = {
  key: 0,
  class: "space-y-5 animate-fadeIn"
}
const _hoisted_8 = { class: "space-y-3" }
const _hoisted_9 = { class: "grid grid-cols-2 gap-2" }
const _hoisted_10 = ["onClick"]
const _hoisted_11 = { class: "grid grid-cols-2 gap-3" }
const _hoisted_12 = ["max"]
const _hoisted_13 = {
  key: 1,
  class: "space-y-5 animate-fadeIn"
}
const _hoisted_14 = { class: "grid grid-cols-2 gap-3" }
const _hoisted_15 = {
  key: 2,
  class: "mt-4 text-[11px] font-bold text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2"
}
const _hoisted_16 = { class: "mt-auto pt-8 flex gap-3" }
const _hoisted_17 = {
  key: 1,
  class: "flex-1 flex items-center justify-center"
}
const _hoisted_18 = { class: "bg-bianco/90 backdrop-blur-md px-5 py-3 flex items-center justify-between border-b border-gray-200 z-20 sticky top-0" }
const _hoisted_19 = { class: "flex items-center gap-3" }
const _hoisted_20 = { class: "flex-1 overflow-y-auto px-5 py-5 space-y-6 pb-32 relative" }
const _hoisted_21 = {
  key: 0,
  class: "space-y-6 animate-fadeIn"
}
const _hoisted_22 = { class: "bg-antracite rounded-2xl p-5 shadow-lg relative overflow-hidden" }
const _hoisted_23 = { class: "relative z-10 flex items-center justify-between mb-2" }
const _hoisted_24 = { class: "relative z-10 text-sm font-semibold italic text-bianco leading-snug uppercase" }
const _hoisted_25 = { class: "text-salvia font-bold not-italic ml-1" }
const _hoisted_26 = {
  key: 0,
  class: "relative z-10 mt-2 text-[11px] font-bold text-white/50"
}
const _hoisted_27 = {
  key: 0,
  class: "bg-white border border-arancione/40 rounded-2xl p-4 shadow-soft flex items-start gap-3"
}
const _hoisted_28 = { class: "flex-1 min-w-0" }
const _hoisted_29 = { class: "text-[11px] font-medium text-gray-500 leading-snug mt-0.5" }
const _hoisted_30 = { class: "font-bold" }
const _hoisted_31 = { class: "flex gap-2 mt-3" }
const _hoisted_32 = {
  key: 1,
  class: "bg-white border border-viola/30 rounded-2xl p-4 shadow-soft flex items-start gap-3"
}
const _hoisted_33 = { class: "flex-1 min-w-0" }
const _hoisted_34 = { class: "text-[11px] font-medium text-gray-500 leading-snug mt-0.5" }
const _hoisted_35 = { class: "flex gap-2 mt-3" }
const _hoisted_36 = { class: "space-y-1" }
const _hoisted_37 = { class: "text-3xl font-bold tracking-tight text-antracite" }
const _hoisted_38 = {
  key: 2,
  class: "bg-antracite rounded-2xl p-4 shadow-lg flex items-center gap-3 text-white relative overflow-hidden"
}
const _hoisted_39 = { class: "min-w-0 flex-1" }
const _hoisted_40 = { class: "text-sm font-extrabold text-white" }
const _hoisted_41 = { class: "text-[11px] font-semibold text-white/85" }
const _hoisted_42 = { class: "min-w-0 flex-1" }
const _hoisted_43 = { class: "text-sm font-extrabold text-white" }
const _hoisted_44 = { class: "text-[11px] font-semibold text-white/85" }
const _hoisted_45 = { class: "min-w-0 flex-1" }
const _hoisted_46 = { class: "text-sm font-extrabold text-white" }
const _hoisted_47 = { class: "text-[11px] font-semibold text-white/85" }
const _hoisted_48 = { class: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100" }
const _hoisted_49 = { class: "flex items-center justify-between gap-3" }
const _hoisted_50 = ["innerHTML"]
const _hoisted_51 = { class: "min-w-0" }
const _hoisted_52 = { class: "text-2xl font-black text-antracite leading-none" }
const _hoisted_53 = { class: "text-sm font-bold text-gray-400" }
const _hoisted_54 = {
  key: 0,
  class: "font-bold text-gray-400"
}
const _hoisted_55 = { class: "text-[11px] font-medium text-gray-500 mt-0.5 leading-snug" }
const _hoisted_56 = { class: "grid grid-cols-7 gap-1.5 mt-3" }
const _hoisted_57 = { class: "flex items-center justify-between gap-2 mt-2" }
const _hoisted_58 = {
  key: 0,
  class: "text-[10px] font-bold text-gray-400 shrink-0"
}
const _hoisted_59 = { class: "text-lg leading-none" }
const _hoisted_60 = { class: "flex-1 min-w-0 text-[11px] font-bold text-antracite" }
const _hoisted_61 = {
  key: 2,
  class: "mt-3 rounded-2xl p-3 bg-arancione/10 border border-arancione/30 flex items-center gap-3"
}
const _hoisted_62 = { class: "min-w-0 flex-1" }
const _hoisted_63 = { class: "text-xs font-black text-antracite leading-tight" }
const _hoisted_64 = { class: "w-11 h-11 rounded-xl cangiante-btn flex flex-col items-center justify-center text-white shrink-0 leading-none" }
const _hoisted_65 = { class: "text-base font-black" }
const _hoisted_66 = { class: "flex-1 min-w-0" }
const _hoisted_67 = { class: "flex items-center justify-between gap-2" }
const _hoisted_68 = { class: "text-xs font-extrabold text-antracite truncate" }
const _hoisted_69 = { class: "text-[10px] font-bold text-gray-400 shrink-0" }
const _hoisted_70 = { class: "h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden" }
const _hoisted_71 = { class: "text-[9px] font-semibold text-gray-400 mt-1" }
const _hoisted_72 = {
  key: 6,
  class: "bg-sky-500/10 border border-sky-500/30 rounded-2xl p-4 flex gap-3 items-start shadow-sm mt-4 animate-fadeIn"
}
const _hoisted_73 = { class: "text-sm text-antracite font-medium leading-relaxed" }
const _hoisted_74 = { class: "flex-1" }
const _hoisted_75 = { class: "text-[11px] text-antracite font-medium mt-1 leading-snug" }
const _hoisted_76 = { class: "space-y-3" }
const _hoisted_77 = { class: "flex justify-between items-center px-1" }
const _hoisted_78 = { class: "text-lg font-bold text-antracite" }
const _hoisted_79 = {
  key: 0,
  class: "bg-white rounded-2xl px-4 py-3 border border-gray-100 shadow-sm mx-1"
}
const _hoisted_80 = { class: "flex justify-between items-baseline gap-2" }
const _hoisted_81 = { class: "text-sm font-extrabold text-antracite" }
const _hoisted_82 = { class: "text-[11px] font-bold text-gray-400" }
const _hoisted_83 = { class: "w-full bg-gray-100 h-2 rounded-full overflow-hidden mt-2" }
const _hoisted_84 = { class: "text-[10px] font-medium text-gray-400 mt-1.5 leading-snug" }
const _hoisted_85 = {
  key: 1,
  class: "bg-white rounded-3xl p-5 border border-gray-100 shadow-soft mx-1 space-y-3.5"
}
const _hoisted_86 = { class: "flex items-baseline justify-between gap-2" }
const _hoisted_87 = { class: "flex items-baseline gap-1" }
const _hoisted_88 = { class: "text-xs font-bold text-gray-400" }
const _hoisted_89 = { class: "text-[11px] font-semibold text-gray-500" }
const _hoisted_90 = { class: "w-full bg-gray-100 h-2.5 rounded-full overflow-hidden" }
const _hoisted_91 = { class: "grid grid-cols-3 gap-2" }
const _hoisted_92 = ["onClick"]
const _hoisted_93 = { class: "text-lg leading-none" }
const _hoisted_94 = { class: "text-[10px] font-bold text-antracite" }
const _hoisted_95 = { key: 0 }
const _hoisted_96 = {
  key: 2,
  ref: "mealsContainer",
  id: "meals-container",
  class: "flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-2 pt-1 px-1"
}
const _hoisted_97 = ["id"]
const _hoisted_98 = {
  key: 0,
  class: "absolute top-0 right-12 bg-salvia text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl"
}
const _hoisted_99 = { class: "flex-1 min-w-0 p-5 pr-2 flex flex-col justify-between" }
const _hoisted_100 = { class: "flex items-center gap-3 mb-3" }
const _hoisted_101 = { class: "w-12 h-12 rounded-2xl bg-salvia/10 flex items-center justify-center text-2xl border border-salvia/20" }
const _hoisted_102 = { class: "text-base font-extrabold text-antracite" }
const _hoisted_103 = { class: "text-[11px] font-bold text-salvia uppercase tracking-wider" }
const _hoisted_104 = { class: "text-sm text-gray-500 font-medium leading-relaxed" }
const _hoisted_105 = {
  key: 0,
  class: "mt-2 text-[11px] font-semibold text-viola bg-viola/10 rounded-xl px-2.5 py-1.5 leading-snug"
}
const _hoisted_106 = { key: 0 }
const _hoisted_107 = { class: "w-12 flex-shrink-0 flex flex-col items-center justify-center gap-2.5 border-l border-gray-100" }
const _hoisted_108 = ["onClick"]
const _hoisted_109 = ["onClick"]
const _hoisted_110 = {
  key: 8,
  class: "space-y-3"
}
const _hoisted_111 = {
  key: 0,
  class: "bg-white rounded-3xl p-4 border border-gray-100 shadow-soft mx-1"
}
const _hoisted_112 = { class: "flex items-center justify-between gap-2" }
const _hoisted_113 = { class: "text-[11px] font-bold text-gray-400" }
const _hoisted_114 = { class: "flex flex-wrap items-end gap-1.5 mt-3" }
const _hoisted_115 = ["onClick", "aria-label"]
const _hoisted_116 = { class: "text-[10px] font-medium text-gray-400 mt-2" }
const _hoisted_117 = {
  key: 1,
  class: "bg-white rounded-3xl p-4 border border-gray-100 shadow-soft mx-1 space-y-3"
}
const _hoisted_118 = { class: "flex items-center justify-between gap-2" }
const _hoisted_119 = {
  key: 1,
  class: "text-[10px] font-bold text-gray-400"
}
const _hoisted_120 = { class: "flex items-baseline justify-between gap-2" }
const _hoisted_121 = { class: "text-2xl font-extrabold text-antracite" }
const _hoisted_122 = { class: "text-[11px] font-semibold text-gray-500" }
const _hoisted_123 = { class: "w-full bg-gray-100 h-2.5 rounded-full overflow-hidden" }
const _hoisted_124 = { class: "grid grid-cols-4 gap-1.5" }
const _hoisted_125 = ["onClick"]
const _hoisted_126 = { class: "grid grid-cols-2 gap-4" }
const _hoisted_127 = { class: "flex items-baseline gap-1 mt-1" }
const _hoisted_128 = { class: "text-[10px] font-bold text-gray-400 mt-1" }
const _hoisted_129 = { class: "flex items-baseline gap-1" }
const _hoisted_130 = { class: "text-xl font-extrabold text-antracite" }
const _hoisted_131 = { class: "text-xs font-semibold text-gray-500" }
const _hoisted_132 = { class: "mt-2 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden" }
const _hoisted_133 = { class: "space-y-3" }
const _hoisted_134 = { class: "flex justify-between items-center px-1" }
const _hoisted_135 = {
  key: 0,
  class: "text-xs font-bold text-salvia bg-salvia/10 px-2 py-1 rounded-md"
}
const _hoisted_136 = {
  key: 1,
  class: "text-xs font-bold text-arancione bg-arancione/10 px-2 py-1 rounded-md"
}
const _hoisted_137 = {
  key: 0,
  class: "bg-white rounded-3xl p-5 border border-salvia/30 shadow-soft space-y-3"
}
const _hoisted_138 = { class: "flex items-center gap-4" }
const _hoisted_139 = { class: "min-w-0" }
const _hoisted_140 = { class: "text-xs text-gray-500 font-medium mt-0.5" }
const _hoisted_141 = { class: "min-w-0" }
const _hoisted_142 = { class: "text-sm font-bold text-antracite truncate" }
const _hoisted_143 = {
  key: 0,
  class: "text-gray-400 font-semibold"
}
const _hoisted_144 = { class: "text-[11px] text-gray-500 font-medium truncate" }
const _hoisted_145 = {
  key: 0,
  class: "text-xs font-extrabold text-salvia bg-salvia/10 px-2 py-1 rounded-md shrink-0"
}
const _hoisted_146 = {
  key: 0,
  class: "text-xs font-semibold text-gray-500"
}
const _hoisted_147 = { class: "font-bold text-antracite" }
const _hoisted_148 = { class: "font-bold text-arancione" }
const _hoisted_149 = ["onClick"]
const _hoisted_150 = { class: "font-bold text-antracite" }
const _hoisted_151 = { key: 0 }
const _hoisted_152 = {
  key: 1,
  class: "bg-white rounded-3xl p-5 border border-arancione/30 shadow-soft space-y-3"
}
const _hoisted_153 = ["onClick"]
const _hoisted_154 = { class: "min-w-0" }
const _hoisted_155 = { class: "text-sm font-bold text-antracite truncate" }
const _hoisted_156 = {
  key: 0,
  class: "text-gray-400 font-semibold"
}
const _hoisted_157 = { class: "text-[11px] text-gray-500 font-medium" }
const _hoisted_158 = { class: "text-xs font-bold text-white bg-arancione px-2.5 py-1.5 rounded-lg shrink-0" }
const _hoisted_159 = {
  key: 2,
  class: "bg-white rounded-3xl p-5 border border-arancione/30 shadow-soft space-y-3"
}
const _hoisted_160 = { class: "flex items-center gap-4" }
const _hoisted_161 = { class: "min-w-0" }
const _hoisted_162 = { class: "font-extrabold text-antracite truncate" }
const _hoisted_163 = { class: "text-xs text-gray-500 font-medium mt-0.5" }
const _hoisted_164 = { class: "min-w-0" }
const _hoisted_165 = { class: "text-sm font-bold text-antracite truncate" }
const _hoisted_166 = { class: "text-gray-400 font-semibold" }
const _hoisted_167 = {
  key: 3,
  class: "bg-white rounded-3xl p-4 border border-gray-100 shadow-soft space-y-2.5"
}
const _hoisted_168 = { class: "text-xs font-semibold text-gray-500 truncate" }
const _hoisted_169 = { class: "text-antracite" }
const _hoisted_170 = { class: "space-y-3" }
const _hoisted_171 = { class: "flex justify-between items-center px-1 gap-2" }
const _hoisted_172 = { class: "flex items-center gap-1.5 flex-shrink-0" }
const _hoisted_173 = { class: "text-xs font-bold text-antracite capitalize min-w-[92px] text-center" }
const _hoisted_174 = { class: "bg-white rounded-3xl p-4 border border-gray-100 shadow-soft" }
const _hoisted_175 = { class: "grid grid-cols-7 gap-1 mb-1.5" }
const _hoisted_176 = { class: "grid grid-cols-7 gap-1" }
const _hoisted_177 = ["onClick"]
const _hoisted_178 = {
  key: 0,
  class: "absolute bottom-1 w-1.5 h-1.5 bg-sky-500 rounded-full ring-1 ring-white/80 shadow-sm"
}
const _hoisted_179 = {
  key: 1,
  class: "space-y-6 animate-fadeIn"
}
const _hoisted_180 = {
  key: 0,
  class: "flex bg-white rounded-2xl p-1 border border-gray-100 shadow-sm"
}
const _hoisted_181 = {
  key: 1,
  class: "space-y-5 animate-fadeIn"
}
const _hoisted_182 = { class: "flex justify-between items-end gap-3" }
const _hoisted_183 = {
  key: 0,
  class: "bg-white rounded-3xl border border-gray-100 shadow-soft"
}
const _hoisted_184 = ["aria-expanded"]
const _hoisted_185 = { class: "min-w-0" }
const _hoisted_186 = { class: "text-sm font-bold text-antracite truncate mt-0.5" }
const _hoisted_187 = { class: "text-gray-400 font-semibold" }
const _hoisted_188 = {
  key: 0,
  class: "px-5 pb-5 space-y-4"
}
const _hoisted_189 = { class: "flex items-center justify-between gap-3" }
const _hoisted_190 = { class: "flex bg-gray-50 border border-gray-100 rounded-xl p-0.5 shrink-0" }
const _hoisted_191 = ["onClick"]
const _hoisted_192 = { class: "text-[11px] font-medium text-gray-500 leading-snug" }
const _hoisted_193 = { key: 0 }
const _hoisted_194 = { class: "grid grid-cols-[112px_1fr] gap-3 items-center" }
const _hoisted_195 = ["innerHTML"]
const _hoisted_196 = { class: "space-y-1.5 min-w-0" }
const _hoisted_197 = { class: "text-gray-400 font-extrabold" }
const _hoisted_198 = { class: "flex gap-2" }
const _hoisted_199 = { class: "bg-white rounded-3xl p-5 border border-gray-100 shadow-soft space-y-3" }
const _hoisted_200 = { class: "flex items-center justify-between gap-2" }
const _hoisted_201 = { class: "min-w-0" }
const _hoisted_202 = { class: "text-sm font-extrabold text-antracite mt-0.5" }
const _hoisted_203 = { class: "grid grid-cols-[124px_1fr] gap-3 items-center" }
const _hoisted_204 = ["innerHTML"]
const _hoisted_205 = {
  key: 0,
  class: "space-y-2 min-w-0"
}
const _hoisted_206 = { class: "flex items-center justify-between gap-2 text-[11px] font-bold" }
const _hoisted_207 = { class: "text-antracite truncate" }
const _hoisted_208 = { class: "text-gray-400 shrink-0" }
const _hoisted_209 = { class: "h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1" }
const _hoisted_210 = {
  key: 1,
  class: "text-[11px] font-medium text-gray-500 leading-snug"
}
const _hoisted_211 = { class: "relative z-10 text-[11px] font-medium text-white/60 mt-1 leading-snug pr-10" }
const _hoisted_212 = {
  key: 1,
  class: "bg-white rounded-3xl p-8 border border-gray-100 shadow-soft text-center flex flex-col items-center space-y-5"
}
const _hoisted_213 = {
  key: 2,
  class: "space-y-3"
}
const _hoisted_214 = ["onClick"]
const _hoisted_215 = { class: "flex items-center gap-4 min-w-0" }
const _hoisted_216 = { class: "min-w-0" }
const _hoisted_217 = {
  key: 0,
  class: "inline-block text-[9px] font-black uppercase tracking-widest text-white bg-arancione px-2 py-0.5 rounded-md mb-1"
}
const _hoisted_218 = {
  key: 1,
  class: "inline-block text-[9px] font-black uppercase tracking-widest text-arancione bg-arancione/10 px-2 py-0.5 rounded-md mb-1"
}
const _hoisted_219 = { class: "font-extrabold text-antracite text-base group-hover:text-arancione transition-colors truncate" }
const _hoisted_220 = { class: "text-xs text-gray-500 font-medium mt-0.5" }
const _hoisted_221 = { class: "text-[10px] font-bold text-gray-400 mt-1" }
const _hoisted_222 = {
  key: 2,
  class: "space-y-5 animate-fadeIn"
}
const _hoisted_223 = { class: "flex justify-between items-end gap-3" }
const _hoisted_224 = { class: "bg-white rounded-3xl p-4 border border-gray-100 shadow-soft" }
const _hoisted_225 = { class: "flex justify-between items-center mb-3" }
const _hoisted_226 = { class: "text-sm font-bold text-antracite capitalize" }
const _hoisted_227 = { class: "grid grid-cols-7 gap-1 mb-1.5" }
const _hoisted_228 = { class: "grid grid-cols-7 gap-1" }
const _hoisted_229 = ["onClick"]
const _hoisted_230 = {
  key: 0,
  class: "absolute bottom-1 flex items-center gap-0.5"
}
const _hoisted_231 = { class: "space-y-2" }
const _hoisted_232 = {
  key: 0,
  class: "bg-white border border-dashed border-gray-200 rounded-2xl p-4 text-center text-xs text-gray-400 font-medium"
}
const _hoisted_233 = {
  key: 0,
  class: "w-5 h-5",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  "stroke-width": "2"
}
const _hoisted_234 = {
  key: 1,
  class: "w-5 h-5",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  "stroke-width": "2"
}
const _hoisted_235 = ["onClick"]
const _hoisted_236 = { class: "text-xs font-extrabold text-antracite truncate" }
const _hoisted_237 = { class: "text-[10px] font-medium text-gray-400 truncate" }
const _hoisted_238 = { key: 0 }
const _hoisted_239 = {
  key: 1,
  class: "text-salvia font-bold"
}
const _hoisted_240 = {
  key: 2,
  class: "text-red-500 font-bold"
}
const _hoisted_241 = {
  key: 0,
  class: "text-[10px] font-medium text-sky-600 truncate mt-0.5"
}
const _hoisted_242 = ["onClick"]
const _hoisted_243 = ["onClick"]
const _hoisted_244 = {
  key: 3,
  class: "space-y-5 animate-fadeIn"
}
const _hoisted_245 = { class: "flex items-center gap-3 mb-2" }
const _hoisted_246 = { class: "text-[10px] font-bold text-arancione tracking-widest uppercase" }
const _hoisted_247 = { class: "text-2xl font-bold text-antracite leading-tight" }
const _hoisted_248 = { class: "bg-white rounded-3xl p-5 border border-gray-100 shadow-soft" }
const _hoisted_249 = { class: "flex items-center gap-2" }
const _hoisted_250 = { class: "w-8 h-8 rounded-xl bg-arancione/10 text-arancione border border-arancione/20 flex items-center justify-center text-xs font-extrabold flex-shrink-0" }
const _hoisted_251 = ["onUpdate:modelValue"]
const _hoisted_252 = ["onClick"]
const _hoisted_253 = { class: "flex items-center gap-2" }
const _hoisted_254 = { class: "flex bg-white rounded-lg border border-gray-200 p-0.5 flex-shrink-0" }
const _hoisted_255 = ["onClick"]
const _hoisted_256 = ["onClick"]
const _hoisted_257 = ["onUpdate:modelValue", "onChange"]
const _hoisted_258 = ["onClick"]
const _hoisted_259 = {
  key: 0,
  class: "flex items-center justify-between gap-2"
}
const _hoisted_260 = { class: "flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider cursor-pointer select-none" }
const _hoisted_261 = ["checked", "onChange"]
const _hoisted_262 = {
  key: 1,
  class: "space-y-2"
}
const _hoisted_263 = { class: "grid grid-cols-2 gap-2" }
const _hoisted_264 = ["onUpdate:modelValue"]
const _hoisted_265 = ["onClick"]
const _hoisted_266 = { class: "text-[10px] font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-2.5 py-2 leading-snug break-words" }
const _hoisted_267 = {
  key: 2,
  class: "grid grid-cols-3 gap-2"
}
const _hoisted_268 = ["onUpdate:modelValue"]
const _hoisted_269 = ["onUpdate:modelValue"]
const _hoisted_270 = { class: "flex gap-1" }
const _hoisted_271 = ["onUpdate:modelValue"]
const _hoisted_272 = ["onUpdate:modelValue"]
const _hoisted_273 = {
  key: 3,
  class: "grid grid-cols-2 gap-2"
}
const _hoisted_274 = ["onUpdate:modelValue"]
const _hoisted_275 = ["onUpdate:modelValue"]
const _hoisted_276 = { class: "flex items-center justify-between gap-2 pt-1.5 border-t border-gray-100" }
const _hoisted_277 = { class: "flex items-center gap-1.5 min-w-0" }
const _hoisted_278 = {
  key: 0,
  class: "text-[9px] font-black uppercase tracking-widest bg-amber-300 text-amber-900 px-1.5 py-0.5 rounded-md flex-shrink-0"
}
const _hoisted_279 = { class: "text-[10px] font-medium text-gray-400 truncate" }
const _hoisted_280 = ["onClick"]
const _hoisted_281 = ["onClick"]
const _hoisted_282 = ["onClick"]
const _hoisted_283 = { class: "flex flex-col gap-3 pt-2" }
const _hoisted_284 = {
  key: 4,
  class: "space-y-5 animate-fadeIn"
}
const _hoisted_285 = { class: "flex justify-between items-start gap-3" }
const _hoisted_286 = { class: "min-w-0" }
const _hoisted_287 = { class: "text-2xl font-bold text-antracite leading-tight truncate" }
const _hoisted_288 = { class: "text-[10px] font-bold text-gray-400 uppercase mt-1" }
const _hoisted_289 = { class: "flex items-center gap-2 flex-shrink-0" }
const _hoisted_290 = { class: "flex-1 min-w-0" }
const _hoisted_291 = { class: "block text-[11px] font-medium text-gray-500 leading-snug" }
const _hoisted_292 = { class: "bg-white rounded-3xl p-2 border border-gray-100 shadow-soft flex overflow-x-auto hide-scrollbar gap-1" }
const _hoisted_293 = ["onClick"]
const _hoisted_294 = { class: "grid grid-cols-2 gap-3" }
const _hoisted_295 = { class: "bg-white rounded-2xl p-4 border border-gray-100 shadow-sm" }
const _hoisted_296 = { class: "text-2xl font-extrabold text-antracite" }
const _hoisted_297 = { class: "text-[10px] font-bold text-gray-400 mt-1" }
const _hoisted_298 = { class: "space-y-3" }
const _hoisted_299 = { class: "flex justify-between items-center px-1" }
const _hoisted_300 = { class: "text-xs font-bold text-gray-500 uppercase tracking-widest" }
const _hoisted_301 = { class: "text-[10px] font-medium text-gray-400" }
const _hoisted_302 = {
  key: 0,
  class: "bg-white border border-dashed border-gray-200 rounded-2xl p-5 text-center text-xs text-gray-400 font-medium"
}
const _hoisted_303 = {
  key: 0,
  class: "flex items-center gap-2 px-1"
}
const _hoisted_304 = { class: "text-[9px] font-black uppercase tracking-widest bg-amber-300 text-amber-900 px-2 py-0.5 rounded-md" }
const _hoisted_305 = { class: "flex justify-between gap-2" }
const _hoisted_306 = { class: "min-w-0" }
const _hoisted_307 = { class: "flex items-center gap-1.5 flex-wrap" }
const _hoisted_308 = { class: "text-sm font-extrabold text-antracite" }
const _hoisted_309 = { class: "text-[10px] text-gray-400 font-medium mt-1" }
const _hoisted_310 = {
  key: 0,
  class: "text-[10px] text-amber-700 font-medium mt-1 leading-snug break-words"
}
const _hoisted_311 = {
  key: 1,
  class: "text-[10px] text-gray-500 font-medium mt-1 leading-snug"
}
const _hoisted_312 = ["onClick"]
const _hoisted_313 = ["onClick"]
const _hoisted_314 = { class: "mt-3 flex items-center justify-between gap-2 bg-gray-50 rounded-xl px-3 py-2" }
const _hoisted_315 = { class: "min-w-0" }
const _hoisted_316 = { class: "text-[9px] font-bold text-gray-400 uppercase tracking-widest" }
const _hoisted_317 = { class: "flex items-baseline gap-1.5 flex-wrap" }
const _hoisted_318 = { class: "text-sm font-bold text-gray-400 line-through" }
const _hoisted_319 = { class: "text-[9px] font-medium text-gray-400 mt-0.5" }
const _hoisted_320 = {
  key: 0,
  class: "font-semibold"
}
const _hoisted_321 = {
  key: 0,
  class: "text-[10px] font-semibold text-viola mt-1 leading-snug"
}
const _hoisted_322 = { class: "font-extrabold" }
const _hoisted_323 = { class: "font-extrabold" }
const _hoisted_324 = { class: "flex items-center gap-1.5 flex-shrink-0" }
const _hoisted_325 = ["onClick"]
const _hoisted_326 = ["onUpdate:modelValue", "placeholder", "onKeyup"]
const _hoisted_327 = ["onClick"]
const _hoisted_328 = {
  key: 2,
  class: "space-y-6 animate-fadeIn"
}
const _hoisted_329 = { class: "space-y-3" }
const _hoisted_330 = {
  key: 0,
  class: "grid grid-cols-3 gap-2"
}
const _hoisted_331 = { class: "bg-white rounded-3xl p-5 border border-gray-100 shadow-soft space-y-4" }
const _hoisted_332 = { class: "flex justify-between items-start gap-3" }
const _hoisted_333 = {
  key: 0,
  class: "text-sm font-bold text-antracite mt-1"
}
const _hoisted_334 = {
  key: 1,
  class: "text-sm font-bold text-antracite mt-1"
}
const _hoisted_335 = {
  key: 0,
  class: "grid grid-cols-4 gap-2"
}
const _hoisted_336 = ["onClick"]
const _hoisted_337 = ["src"]
const _hoisted_338 = { class: "absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent text-white text-[9px] font-bold px-1.5 pb-1 pt-3 text-left" }
const _hoisted_339 = {
  key: 1,
  class: "text-xs text-gray-500 font-medium leading-relaxed"
}
const _hoisted_340 = {
  key: 2,
  class: "text-[11px] font-bold text-arancione"
}
const _hoisted_341 = {
  key: 0,
  class: "bg-white rounded-3xl p-8 border border-gray-100 shadow-soft text-center flex flex-col items-center space-y-5"
}
const _hoisted_342 = { class: "flex justify-between items-end" }
const _hoisted_343 = { class: "text-3xl font-extrabold text-antracite mt-1" }
const _hoisted_344 = { class: "text-[10px] font-medium text-gray-400 mt-1" }
const _hoisted_345 = { class: "flex flex-col items-end gap-2" }
const _hoisted_346 = { class: "relative h-40 w-full pt-4" }
const _hoisted_347 = {
  class: "w-full h-full overflow-visible",
  viewBox: "0 0 300 150"
}
const _hoisted_348 = ["points"]
const _hoisted_349 = ["points"]
const _hoisted_350 = ["cx", "cy"]
const _hoisted_351 = ["x", "y"]
const _hoisted_352 = { class: "text-[11px] text-gray-400 font-medium text-center" }
const _hoisted_353 = { key: 0 }
const _hoisted_354 = { class: "space-y-3" }
const _hoisted_355 = { class: "flex-1 min-w-0 text-xs font-semibold text-antracite leading-snug" }
const _hoisted_356 = { class: "text-xs font-bold text-viola shrink-0" }
const _hoisted_357 = { class: "flex items-start justify-between gap-3" }
const _hoisted_358 = { class: "min-w-0" }
const _hoisted_359 = { class: "text-3xl font-extrabold text-antracite mt-1" }
const _hoisted_360 = { class: "text-[11px] font-medium text-gray-500 mt-0.5" }
const _hoisted_361 = { class: "text-[10px] font-bold text-arancione bg-arancione/10 px-2 py-1 rounded-md shrink-0" }
const _hoisted_362 = { class: "grid grid-cols-3 gap-2 mt-4" }
const _hoisted_363 = { class: "rounded-2xl bg-sky-500/10 px-2 py-2.5 text-center" }
const _hoisted_364 = { class: "text-sm font-extrabold text-antracite mt-0.5" }
const _hoisted_365 = { class: "rounded-2xl bg-salvia/10 px-2 py-2.5 text-center" }
const _hoisted_366 = { class: "text-sm font-extrabold text-antracite mt-0.5" }
const _hoisted_367 = { class: "rounded-2xl bg-arancione/10 px-2 py-2.5 text-center" }
const _hoisted_368 = { class: "text-sm font-extrabold text-antracite mt-0.5" }
const _hoisted_369 = {
  key: 0,
  class: "mt-3 rounded-2xl bg-gray-50 border border-gray-100 px-3 py-2.5"
}
const _hoisted_370 = { class: "text-[11px] font-semibold text-gray-600 leading-snug" }
const _hoisted_371 = { class: "text-antracite" }
const _hoisted_372 = { key: 0 }
const _hoisted_373 = { key: 1 }
const _hoisted_374 = { class: "text-[10px] font-medium text-gray-400 mt-0.5" }
const _hoisted_375 = {
  key: 0,
  class: "block text-arancione font-semibold mb-0.5"
}
const _hoisted_376 = { key: 1 }
const _hoisted_377 = {
  key: 1,
  class: "mt-3 text-[11px] font-medium text-gray-500 leading-relaxed"
}
const _hoisted_378 = { class: "flex items-start justify-between gap-3" }
const _hoisted_379 = { class: "min-w-0" }
const _hoisted_380 = { class: "text-3xl font-extrabold text-antracite mt-1" }
const _hoisted_381 = { class: "text-[11px] font-medium text-gray-500 mt-0.5" }
const _hoisted_382 = { class: "text-[11px] font-medium text-gray-500 mt-0.5 leading-snug" }
const _hoisted_383 = {
  key: 0,
  class: "w-full bg-gray-100 h-2 rounded-full overflow-hidden"
}
const _hoisted_384 = { class: "grid grid-cols-3 gap-2" }
const _hoisted_385 = { class: "rounded-2xl bg-sky-500/10 px-2 py-2.5 text-center" }
const _hoisted_386 = { class: "text-sm font-extrabold text-antracite mt-0.5" }
const _hoisted_387 = { class: "rounded-2xl bg-salvia/10 px-2 py-2.5 text-center" }
const _hoisted_388 = { class: "text-sm font-extrabold text-antracite mt-0.5" }
const _hoisted_389 = { class: "rounded-2xl bg-arancione/10 px-2 py-2.5 text-center" }
const _hoisted_390 = { class: "text-sm font-extrabold text-antracite mt-0.5" }
const _hoisted_391 = { class: "flex items-center gap-2" }
const _hoisted_392 = { class: "flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden" }
const _hoisted_393 = { class: "text-[10px] font-bold text-gray-400 shrink-0" }
const _hoisted_394 = {
  key: 0,
  class: "text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 leading-snug"
}
const _hoisted_395 = {
  key: 2,
  class: "text-[11px] font-medium text-gray-500 leading-relaxed"
}
const _hoisted_396 = { class: "grid grid-cols-2 gap-3" }
const _hoisted_397 = { class: "text-2xl font-extrabold text-antracite mt-1" }
const _hoisted_398 = { class: "relative h-2" }
const _hoisted_399 = {
  key: 0,
  class: "mt-2 text-[11px] font-medium text-gray-500 leading-relaxed"
}
const _hoisted_400 = { class: "text-2xl font-extrabold text-antracite mt-1" }
const _hoisted_401 = { class: "text-[10px] font-medium text-gray-400 mt-1" }
const _hoisted_402 = {
  key: 0,
  class: "mt-2 text-[11px] font-medium text-gray-500 leading-relaxed"
}
const _hoisted_403 = { class: "text-2xl font-extrabold text-antracite mt-1" }
const _hoisted_404 = {
  key: 0,
  class: "mt-2 text-[11px] font-medium text-gray-500 leading-relaxed"
}
const _hoisted_405 = { class: "text-lg font-extrabold text-antracite mt-1 leading-tight" }
const _hoisted_406 = {
  key: 0,
  class: "mt-2 text-[11px] font-medium text-gray-500 leading-relaxed"
}
const _hoisted_407 = { class: "text-2xl font-extrabold text-antracite mt-1" }
const _hoisted_408 = {
  key: 0,
  class: "mt-2 text-[11px] font-medium text-gray-500 leading-relaxed"
}
const _hoisted_409 = { class: "text-lg font-extrabold text-antracite mt-1 leading-tight" }
const _hoisted_410 = {
  key: 0,
  class: "mt-2 text-[11px] font-medium text-gray-500 leading-relaxed"
}
const _hoisted_411 = { class: "space-y-3" }
const _hoisted_412 = { class: "flex justify-between items-center px-1" }
const _hoisted_413 = {
  key: 0,
  class: "text-[10px] font-medium text-gray-400"
}
const _hoisted_414 = {
  key: 0,
  class: "bg-white border border-dashed border-gray-200 rounded-2xl p-4 text-center text-xs text-gray-400 font-medium"
}
const _hoisted_415 = { class: "space-y-2" }
const _hoisted_416 = ["onClick"]
const _hoisted_417 = { class: "flex items-center gap-3 min-w-0" }
const _hoisted_418 = { class: "w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg flex-shrink-0" }
const _hoisted_419 = { class: "min-w-0" }
const _hoisted_420 = { class: "text-sm font-bold text-antracite block truncate" }
const _hoisted_421 = { class: "text-[10px] font-medium text-gray-400" }
const _hoisted_422 = { class: "flex items-center gap-2 flex-shrink-0" }
const _hoisted_423 = { class: "text-right" }
const _hoisted_424 = { class: "flex items-baseline justify-end gap-1.5" }
const _hoisted_425 = { class: "text-xs font-bold text-gray-400" }
const _hoisted_426 = { key: 0 }
const _hoisted_427 = {
  key: 1,
  class: "text-[10px] font-medium text-gray-400 mt-0.5"
}
const _hoisted_428 = { class: "space-y-3" }
const _hoisted_429 = { class: "flex justify-between items-center px-1" }
const _hoisted_430 = {
  key: 0,
  class: "text-[10px] font-medium text-gray-400"
}
const _hoisted_431 = {
  key: 0,
  class: "bg-antracite rounded-3xl p-5 shadow-lg text-white relative overflow-hidden"
}
const _hoisted_432 = { class: "relative z-10 flex items-start justify-between gap-3" }
const _hoisted_433 = { class: "text-4xl font-black mt-1 cangiante-text" }
const _hoisted_434 = { class: "text-right space-y-1.5 shrink-0" }
const _hoisted_435 = { class: "text-sm font-extrabold" }
const _hoisted_436 = { class: "text-sm font-extrabold" }
const _hoisted_437 = {
  key: 0,
  class: "relative z-10 mt-4"
}
const _hoisted_438 = { class: "h-2 rounded-full bg-white/10 overflow-hidden flex" }
const _hoisted_439 = { class: "flex justify-between text-[10px] font-bold text-white/60 mt-1.5" }
const _hoisted_440 = {
  key: 1,
  class: "bg-white border border-dashed border-gray-200 rounded-2xl p-4 text-center text-xs text-gray-400 font-medium"
}
const _hoisted_441 = ["onClick"]
const _hoisted_442 = { class: "flex justify-between items-start gap-3" }
const _hoisted_443 = { class: "text-sm font-extrabold text-antracite" }
const _hoisted_444 = { class: "text-[10px] text-gray-400 font-medium mt-0.5" }
const _hoisted_445 = { class: "mt-3 flex items-end justify-between" }
const _hoisted_446 = { class: "flex items-baseline gap-1" }
const _hoisted_447 = { class: "text-xl font-extrabold text-arancione" }
const _hoisted_448 = {
  key: 0,
  class: "text-[10px] text-gray-400 font-medium"
}
const _hoisted_449 = { class: "text-[10px] font-bold text-gray-400 flex items-center gap-1" }
const _hoisted_450 = {
  key: 3,
  class: "space-y-6 animate-fadeIn"
}
const _hoisted_451 = { class: "flex justify-between items-end gap-3" }
const _hoisted_452 = { class: "text-xs font-bold text-gray-400 pb-1" }
const _hoisted_453 = { class: "relative z-10 text-xl font-extrabold text-white leading-tight mt-1" }
const _hoisted_454 = { class: "space-y-4" }
const _hoisted_455 = { class: "bg-antracite rounded-3xl p-5 shadow-lg text-white relative overflow-hidden" }
const _hoisted_456 = { class: "relative z-10 flex items-center gap-4" }
const _hoisted_457 = { class: "w-16 h-16 rounded-2xl cangiante-btn flex flex-col items-center justify-center shrink-0 leading-none shadow-lg" }
const _hoisted_458 = { class: "text-2xl font-black" }
const _hoisted_459 = { class: "flex-1 min-w-0" }
const _hoisted_460 = { class: "text-lg font-black cangiante-text" }
const _hoisted_461 = { class: "h-2 bg-white/10 rounded-full mt-1.5 overflow-hidden" }
const _hoisted_462 = { class: "flex justify-between text-[10px] font-bold text-white/50 mt-1" }
const _hoisted_463 = {
  key: 0,
  class: "bg-white rounded-3xl p-4 border border-gray-100 shadow-sm space-y-3"
}
const _hoisted_464 = ["onClick"]
const _hoisted_465 = { class: "flex-1 min-w-0" }
const _hoisted_466 = { class: "flex justify-between gap-2 text-xs font-extrabold text-antracite" }
const _hoisted_467 = { class: "truncate" }
const _hoisted_468 = { class: "shrink-0 text-gray-400 font-bold" }
const _hoisted_469 = { class: "h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden" }
const _hoisted_470 = { class: "text-[10px] font-semibold text-gray-400 mt-1" }
const _hoisted_471 = { class: "grid grid-cols-2 gap-3" }
const _hoisted_472 = ["onClick"]
const _hoisted_473 = { class: "flex items-center justify-between gap-2" }
const _hoisted_474 = {
  key: 1,
  class: "text-[9px] font-bold text-gray-400"
}
const _hoisted_475 = { class: "text-xs font-extrabold text-antracite mt-2 truncate" }
const _hoisted_476 = { class: "text-[10px] font-semibold text-gray-400 truncate" }
const _hoisted_477 = { class: "h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden" }
const _hoisted_478 = {
  key: 4,
  class: "space-y-6 animate-fadeIn"
}
const _hoisted_479 = {
  key: 0,
  class: "flex bg-white rounded-2xl p-1 border border-gray-100 shadow-sm"
}
const _hoisted_480 = {
  key: 1,
  class: "space-y-5 animate-fadeIn"
}
const _hoisted_481 = { class: "flex items-end justify-between gap-3" }
const _hoisted_482 = { class: "flex items-center gap-1 bg-white rounded-xl border border-gray-100 shadow-sm p-1" }
const _hoisted_483 = { class: "text-xs font-bold text-antracite capitalize px-1 min-w-[64px] text-center" }
const _hoisted_484 = ["disabled"]
const _hoisted_485 = { class: "bg-white rounded-3xl p-5 border border-gray-100 shadow-soft space-y-3" }
const _hoisted_486 = { class: "flex items-start justify-between gap-3" }
const _hoisted_487 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider" }
const _hoisted_488 = { class: "flex items-baseline gap-1 mt-0.5" }
const _hoisted_489 = { class: "text-sm font-bold text-gray-400" }
const _hoisted_490 = { class: "w-full bg-gray-100 h-3 rounded-full overflow-hidden" }
const _hoisted_491 = { class: "flex items-center justify-between gap-3 text-[11px] font-semibold text-gray-500" }
const _hoisted_492 = { key: 0 }
const _hoisted_493 = { class: "text-antracite" }
const _hoisted_494 = { key: 1 }
const _hoisted_495 = {
  key: 0,
  class: "text-gray-400"
}
const _hoisted_496 = {
  key: 0,
  class: "text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 leading-snug"
}
const _hoisted_497 = {
  key: 1,
  class: "text-[10px] font-medium text-gray-400 leading-snug"
}
const _hoisted_498 = {
  key: 0,
  class: "bg-salvia/5 border border-salvia/20 rounded-3xl p-4 space-y-2"
}
const _hoisted_499 = { class: "flex items-center justify-between gap-2" }
const _hoisted_500 = { class: "font-bold text-antracite truncate" }
const _hoisted_501 = { class: "space-y-2.5" }
const _hoisted_502 = ["onClick"]
const _hoisted_503 = { class: "flex-1 min-w-0" }
const _hoisted_504 = { class: "block text-sm font-extrabold text-antracite" }
const _hoisted_505 = {
  key: 0,
  class: "shrink-0 text-xs font-extrabold text-salvia"
}
const _hoisted_506 = {
  key: 1,
  class: "shrink-0 w-8 h-8 rounded-full bg-salvia/10 text-salvia flex items-center justify-center text-lg font-bold"
}
const _hoisted_507 = { key: 0 }
const _hoisted_508 = {
  key: 2,
  class: "bg-white rounded-3xl p-4 border border-gray-100 shadow-sm space-y-3"
}
const _hoisted_509 = { class: "flex items-center justify-between gap-2" }
const _hoisted_510 = { class: "text-xs font-extrabold text-antracite" }
const _hoisted_511 = {
  key: 0,
  class: "grid grid-cols-3 gap-1.5"
}
const _hoisted_512 = ["onClick"]
const _hoisted_513 = { class: "block text-[11px] font-bold" }
const _hoisted_514 = { class: "block text-[10px] font-semibold opacity-80" }
const _hoisted_515 = {
  key: 1,
  class: "text-[11px] font-medium text-gray-500 leading-snug"
}
const _hoisted_516 = { class: "min-w-0" }
const _hoisted_517 = { class: "text-[10px] font-medium text-gray-500 leading-snug" }
const _hoisted_518 = {
  key: 3,
  class: "text-[10px] font-medium text-gray-400 leading-snug"
}
const _hoisted_519 = { class: "flex items-center gap-2 text-[11px] font-semibold text-gray-500" }
const _hoisted_520 = ["value"]
const _hoisted_521 = { class: "bg-white rounded-3xl p-4 border border-gray-100 shadow-sm space-y-3" }
const _hoisted_522 = { class: "flex items-center justify-between gap-2" }
const _hoisted_523 = {
  key: 0,
  class: "text-[11px] font-semibold text-gray-500"
}
const _hoisted_524 = { class: "text-antracite" }
const _hoisted_525 = { class: "grid grid-cols-7 gap-1.5 items-end h-24" }
const _hoisted_526 = ["onClick"]
const _hoisted_527 = { class: "text-[9px] font-bold text-gray-400" }
const _hoisted_528 = {
  class: "w-full rounded-lg bg-gray-100 relative overflow-hidden",
  style: {"height":"56px"}
}
const _hoisted_529 = { class: "text-[11px] font-medium text-gray-500 leading-snug" }
const _hoisted_530 = { class: "space-y-2" }
const _hoisted_531 = { class: "flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-2xl p-3.5" }
const _hoisted_532 = { class: "flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-2xl p-3.5" }
const _hoisted_533 = {
  key: 2,
  class: "space-y-5 animate-fadeIn"
}
const _hoisted_534 = { class: "flex justify-between items-end gap-3" }
const _hoisted_535 = {
  key: 0,
  class: "bg-white rounded-3xl p-8 border border-gray-100 shadow-soft text-center flex flex-col items-center space-y-5"
}
const _hoisted_536 = {
  key: 1,
  class: "space-y-3"
}
const _hoisted_537 = ["onClick"]
const _hoisted_538 = { class: "flex items-center gap-4" }
const _hoisted_539 = { class: "flex items-center gap-2" }
const _hoisted_540 = { class: "font-extrabold text-antracite text-base group-hover:text-salvia transition-colors" }
const _hoisted_541 = {
  key: 0,
  class: "text-[9px] font-bold uppercase tracking-wider bg-salvia/10 text-salvia px-2 py-0.5 rounded-md"
}
const _hoisted_542 = { class: "text-xs text-gray-500 font-medium mt-0.5" }
const _hoisted_543 = {
  key: 3,
  class: "space-y-5 animate-fadeIn"
}
const _hoisted_544 = { class: "flex items-center gap-3 mb-2" }
const _hoisted_545 = { class: "text-[10px] font-bold text-viola tracking-widest uppercase" }
const _hoisted_546 = { class: "text-2xl font-bold text-antracite leading-tight" }
const _hoisted_547 = { class: "bg-white rounded-3xl p-5 border border-gray-100 shadow-soft" }
const _hoisted_548 = ["disabled"]
const _hoisted_549 = {
  key: 0,
  class: "w-4 h-4 animate-spin",
  fill: "none",
  viewBox: "0 0 24 24"
}
const _hoisted_550 = {
  key: 0,
  class: "mt-3 text-[11px] font-semibold text-red-500 leading-snug"
}
const _hoisted_551 = { class: "bg-white rounded-3xl p-5 border border-gray-100 shadow-soft space-y-5" }
const _hoisted_552 = { class: "grid grid-cols-2 gap-4" }
const _hoisted_553 = { class: "flex items-center gap-3 p-4 bg-viola/5 border border-viola/20 rounded-2xl cursor-pointer hover:bg-viola/10 transition-colors mt-2" }
const _hoisted_554 = { class: "flex flex-col gap-3 mt-4" }
const _hoisted_555 = {
  key: 4,
  class: "space-y-5 animate-fadeIn"
}
const _hoisted_556 = { class: "flex items-center justify-between mb-2" }
const _hoisted_557 = { class: "flex items-center gap-3" }
const _hoisted_558 = { class: "text-2xl font-bold text-antracite leading-tight" }
const _hoisted_559 = {
  key: 0,
  class: "bg-salvia/10 border border-salvia/30 rounded-2xl p-4 relative"
}
const _hoisted_560 = { class: "text-sm font-bold text-antracite pr-5" }
const _hoisted_561 = { key: 0 }
const _hoisted_562 = {
  key: 0,
  class: "text-[11px] font-semibold text-amber-600 leading-snug mt-1.5"
}
const _hoisted_563 = { class: "flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1" }
const _hoisted_564 = ["onClick"]
const _hoisted_565 = { class: "bg-white rounded-3xl p-2 border border-gray-100 shadow-soft flex overflow-x-auto hide-scrollbar gap-1" }
const _hoisted_566 = ["onClick"]
const _hoisted_567 = { class: "text-xs" }
const _hoisted_568 = { class: "space-y-4" }
const _hoisted_569 = { class: "flex justify-between items-center px-1" }
const _hoisted_570 = { class: "text-sm font-bold text-antracite" }
const _hoisted_571 = {
  key: 0,
  class: "text-center py-6 bg-white rounded-3xl border border-dashed border-gray-200"
}
const _hoisted_572 = ["onClick"]
const _hoisted_573 = { class: "pr-8" }
const _hoisted_574 = ["onUpdate:modelValue"]
const _hoisted_575 = ["value"]
const _hoisted_576 = { class: "flex items-center gap-2" }
const _hoisted_577 = ["onUpdate:modelValue", "placeholder"]
const _hoisted_578 = {
  key: 0,
  class: "text-gray-400"
}
const _hoisted_579 = { class: "space-y-2" }
const _hoisted_580 = ["onUpdate:modelValue"]
const _hoisted_581 = ["title"]
const _hoisted_582 = ["onClick"]
const _hoisted_583 = ["onClick"]
const _hoisted_584 = {
  key: 5,
  class: "space-y-5 animate-fadeIn"
}
const _hoisted_585 = { class: "flex justify-between items-start" }
const _hoisted_586 = { class: "text-2xl font-bold text-antracite leading-tight" }
const _hoisted_587 = { class: "text-[10px] font-bold text-gray-400 uppercase mt-1" }
const _hoisted_588 = { class: "flex items-center gap-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-1.5" }
const _hoisted_589 = ["onClick"]
const _hoisted_590 = {
  key: 0,
  class: "bg-sky-500/10 border border-sky-500/30 p-4 rounded-3xl relative shadow-sm animate-fadeIn"
}
const _hoisted_591 = { class: "flex items-start gap-3 relative z-10" }
const _hoisted_592 = { class: "space-y-1 w-full" }
const _hoisted_593 = { class: "text-xs text-antracite font-medium leading-relaxed" }
const _hoisted_594 = { class: "bg-white rounded-3xl p-5 border border-gray-100 shadow-soft" }
const _hoisted_595 = { class: "flex justify-between items-center mb-4" }
const _hoisted_596 = { class: "text-xs font-bold text-gray-500 uppercase" }
const _hoisted_597 = { class: "text-lg font-extrabold text-antracite" }
const _hoisted_598 = {
  key: 0,
  class: "flex justify-between items-center -mt-2 mb-4"
}
const _hoisted_599 = { class: "text-sm font-extrabold text-antracite" }
const _hoisted_600 = { class: "space-y-3" }
const _hoisted_601 = { class: "text-xs font-bold text-gray-500 uppercase tracking-widest pl-1" }
const _hoisted_602 = { class: "w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl flex-shrink-0 border border-gray-100" }
const _hoisted_603 = { class: "flex-1" }
const _hoisted_604 = { class: "flex justify-between items-center mb-1" }
const _hoisted_605 = { class: "text-sm font-bold text-antracite" }
const _hoisted_606 = { class: "text-[10px] font-bold text-salvia bg-salvia/10 px-2 py-0.5 rounded-md" }
const _hoisted_607 = { class: "text-xs text-gray-500 leading-relaxed" }
const _hoisted_608 = { class: "pt-6 pb-4 space-y-3" }
const _hoisted_609 = {
  key: 6,
  class: "space-y-5 animate-fadeIn"
}
const _hoisted_610 = { class: "flex justify-between items-center" }
const _hoisted_611 = {
  key: 1,
  class: "text-[10px] font-bold text-salvia tracking-widest uppercase"
}
const _hoisted_612 = { class: "flex items-center gap-2" }
const _hoisted_613 = { class: "flex justify-between items-center px-2 py-2" }
const _hoisted_614 = { class: "text-xl font-extrabold text-salvia capitalize" }
const _hoisted_615 = { class: "bg-white p-4 rounded-3xl border border-gray-100 shadow-soft" }
const _hoisted_616 = { class: "grid grid-cols-7 gap-1 text-center mb-2" }
const _hoisted_617 = { class: "grid grid-cols-7 gap-1 text-center" }
const _hoisted_618 = ["onClick"]
const _hoisted_619 = {
  key: 0,
  class: "absolute bottom-1 w-1.5 h-1.5 bg-sky-500 rounded-full ring-1 ring-white/80 shadow-sm"
}
const _hoisted_620 = {
  key: 7,
  class: "animate-fadeIn pt-4"
}
const _hoisted_621 = ["disabled"]
const _hoisted_622 = {
  key: 0,
  class: "fixed inset-0 z-[70] flex items-center justify-center p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_623 = { class: "bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4" }
const _hoisted_624 = { class: "text-xl font-bold text-antracite" }
const _hoisted_625 = { class: "text-sm text-gray-500 font-medium" }
const _hoisted_626 = {
  key: 0,
  class: "pt-2"
}
const _hoisted_627 = {
  key: 1,
  class: "pt-2 flex gap-3"
}
const _hoisted_628 = {
  key: 1,
  class: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_629 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-5 flex flex-col max-h-[90vh]" }
const _hoisted_630 = { class: "flex justify-between items-center shrink-0" }
const _hoisted_631 = { class: "overflow-y-auto flex-1 space-y-5 pr-1 hide-scrollbar" }
const _hoisted_632 = {
  key: 0,
  class: "flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-4"
}
const _hoisted_633 = { class: "w-14 h-14 rounded-full bg-salvia/20 text-salvia flex items-center justify-center font-black text-xl border border-salvia/30 flex-shrink-0" }
const _hoisted_634 = { class: "min-w-0 flex-1" }
const _hoisted_635 = { class: "text-base font-extrabold text-antracite truncate" }
const _hoisted_636 = { class: "text-[11px] font-medium text-gray-500" }
const _hoisted_637 = { key: 0 }
const _hoisted_638 = { key: 1 }
const _hoisted_639 = { key: 2 }
const _hoisted_640 = {
  key: 3,
  class: "text-gray-400"
}
const _hoisted_641 = {
  key: 1,
  class: "space-y-3 bg-gray-50 border border-gray-100 rounded-2xl p-4"
}
const _hoisted_642 = { class: "grid grid-cols-2 gap-2" }
const _hoisted_643 = ["max"]
const _hoisted_644 = { class: "grid grid-cols-2 gap-2" }
const _hoisted_645 = ["onClick"]
const _hoisted_646 = {
  key: 0,
  class: "text-[10px] font-bold text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2"
}
const _hoisted_647 = { class: "flex gap-2" }
const _hoisted_648 = { class: "space-y-3" }
const _hoisted_649 = { class: "grid grid-cols-3 gap-1.5 bg-gray-50 border border-gray-100 rounded-2xl p-1.5" }
const _hoisted_650 = ["onClick"]
const _hoisted_651 = { class: "text-base leading-none" }
const _hoisted_652 = {
  key: 0,
  class: "text-[10px] font-medium text-gray-400 -mt-1"
}
const _hoisted_653 = { class: "space-y-3" }
const _hoisted_654 = { class: "flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-2xl p-3.5" }
const _hoisted_655 = { class: "flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-2xl p-3.5" }
const _hoisted_656 = {
  key: 2,
  class: "space-y-3"
}
const _hoisted_657 = { class: "flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-2xl p-3.5" }
const _hoisted_658 = { class: "flex items-center gap-3 min-w-0" }
const _hoisted_659 = { class: "min-w-0" }
const _hoisted_660 = { class: "text-sm font-bold text-antracite" }
const _hoisted_661 = { class: "text-[10px] font-medium text-gray-400 leading-snug" }
const _hoisted_662 = {
  key: 1,
  class: "shrink-0 text-salvia text-lg"
}
const _hoisted_663 = { class: "space-y-3" }
const _hoisted_664 = { class: "flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-2xl p-3.5" }
const _hoisted_665 = ["disabled"]
const _hoisted_666 = {
  key: 0,
  class: "space-y-3 bg-gray-50 border border-gray-100 rounded-2xl p-3.5"
}
const _hoisted_667 = { class: "flex items-center justify-between gap-3 cursor-pointer" }
const _hoisted_668 = {
  key: 0,
  class: "grid grid-cols-1 gap-1.5"
}
const _hoisted_669 = { class: "text-[11px] font-bold text-gray-600 truncate" }
const _hoisted_670 = ["onUpdate:modelValue"]
const _hoisted_671 = {
  key: 1,
  class: "text-[10px] font-medium text-gray-400 -mt-1"
}
const _hoisted_672 = { class: "flex items-center justify-between gap-3 cursor-pointer pt-1 border-t border-gray-200" }
const _hoisted_673 = {
  key: 2,
  class: "flex items-center justify-between gap-2"
}
const _hoisted_674 = { class: "flex items-center justify-between gap-3 cursor-pointer" }
const _hoisted_675 = { class: "flex items-center justify-between gap-3 cursor-pointer pt-1 border-t border-gray-200" }
const _hoisted_676 = {
  key: 3,
  class: "flex items-center justify-between gap-2"
}
const _hoisted_677 = {
  key: 1,
  class: "text-[10px] font-medium text-gray-400 leading-snug"
}
const _hoisted_678 = { class: "space-y-2" }
const _hoisted_679 = { class: "bg-gray-50 border border-gray-100 rounded-2xl px-3 py-2.5 space-y-1 text-[11px] font-medium text-gray-500" }
const _hoisted_680 = { class: "flex justify-between gap-2" }
const _hoisted_681 = { class: "flex justify-between gap-2" }
const _hoisted_682 = { class: "font-bold text-antracite" }
const _hoisted_683 = {
  key: 0,
  class: "flex justify-between gap-2"
}
const _hoisted_684 = {
  key: 1,
  class: "flex justify-between gap-2"
}
const _hoisted_685 = { class: "font-bold text-antracite" }
const _hoisted_686 = {
  key: 2,
  class: "text-[10px] text-gray-400 leading-snug pt-1"
}
const _hoisted_687 = {
  key: 1,
  class: "text-[10px] font-bold text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2"
}
const _hoisted_688 = { class: "space-y-2" }
const _hoisted_689 = { class: "space-y-2 pt-1" }
const _hoisted_690 = { class: "text-center text-[10px] font-bold text-gray-300 uppercase tracking-widest" }
const _hoisted_691 = {
  key: 2,
  class: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_692 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 transition-transform transform flex flex-col max-h-[90vh]" }
const _hoisted_693 = { class: "flex justify-between items-center shrink-0" }
const _hoisted_694 = { class: "text-lg font-bold text-antracite leading-tight" }
const _hoisted_695 = { class: "overflow-y-auto flex-1 space-y-2 pr-1 hide-scrollbar" }
const _hoisted_696 = {
  key: 0,
  class: "bg-arancione/5 border border-arancione/30 rounded-2xl px-3 py-2.5 space-y-1.5"
}
const _hoisted_697 = { class: "text-sm flex-shrink-0" }
const _hoisted_698 = { class: "min-w-0" }
const _hoisted_699 = { class: "text-[11px] font-bold text-antracite truncate" }
const _hoisted_700 = {
  key: 0,
  class: "text-gray-400 font-medium"
}
const _hoisted_701 = {
  key: 0,
  class: "text-[10px] text-sky-600 font-medium leading-snug"
}
const _hoisted_702 = { class: "w-8 h-8 rounded-lg bg-white flex items-center justify-center text-sm shadow-sm" }
const _hoisted_703 = { class: "flex-1" }
const _hoisted_704 = { class: "text-xs font-bold text-antracite" }
const _hoisted_705 = { class: "text-[10px] text-gray-500 line-clamp-1" }
const _hoisted_706 = { class: "text-[10px] font-bold text-gray-400 whitespace-nowrap" }
const _hoisted_707 = { class: "shrink-0 space-y-3 pt-2 border-t border-gray-100" }
const _hoisted_708 = {
  key: 3,
  class: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_709 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 flex flex-col max-h-[90vh]" }
const _hoisted_710 = { class: "flex justify-between items-start shrink-0 gap-3" }
const _hoisted_711 = { class: "text-lg font-bold text-antracite capitalize leading-tight" }
const _hoisted_712 = {
  key: 0,
  class: "text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 leading-snug"
}
const _hoisted_713 = { class: "overflow-y-auto flex-1 space-y-2 pr-1 hide-scrollbar" }
const _hoisted_714 = {
  key: 0,
  class: "bg-arancione/5 border border-arancione/30 rounded-2xl px-3.5 py-3 space-y-2"
}
const _hoisted_715 = ["onClick"]
const _hoisted_716 = { class: "w-7 h-7 rounded-full bg-arancione/15 flex items-center justify-center text-sm flex-shrink-0" }
const _hoisted_717 = { class: "flex-1 min-w-0" }
const _hoisted_718 = { class: "text-[11px] font-bold text-antracite truncate" }
const _hoisted_719 = {
  key: 0,
  class: "text-gray-400 font-medium"
}
const _hoisted_720 = { class: "text-[9px] font-medium text-gray-400 truncate" }
const _hoisted_721 = {
  key: 0,
  class: "text-salvia font-bold"
}
const _hoisted_722 = {
  key: 1,
  class: "text-salvia font-bold"
}
const _hoisted_723 = {
  key: 2,
  class: "text-red-500 font-bold"
}
const _hoisted_724 = {
  key: 3,
  class: "text-sky-600 font-bold"
}
const _hoisted_725 = {
  key: 0,
  class: "text-[10px] text-sky-600 font-medium leading-snug mt-0.5"
}
const _hoisted_726 = {
  key: 1,
  class: "bg-sky-500/10 border border-sky-500/30 rounded-2xl px-3.5 py-3 flex items-start gap-2.5"
}
const _hoisted_727 = { class: "flex-1" }
const _hoisted_728 = { class: "text-[11px] text-antracite font-medium leading-snug" }
const _hoisted_729 = {
  key: 2,
  class: "text-center py-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 space-y-2"
}
const _hoisted_730 = {
  key: 3,
  class: "bg-salvia/5 border border-salvia/20 rounded-2xl px-3.5 py-3 space-y-1.5"
}
const _hoisted_731 = { class: "flex items-center justify-between gap-2" }
const _hoisted_732 = { class: "text-[10px] font-bold text-salvia uppercase tracking-widest" }
const _hoisted_733 = { class: "text-antracite font-medium leading-snug" }
const _hoisted_734 = { class: "shrink-0 font-bold text-gray-400" }
const _hoisted_735 = { class: "flex-1 min-w-0 space-y-2" }
const _hoisted_736 = { class: "flex items-center gap-3" }
const _hoisted_737 = { class: "w-9 h-9 rounded-xl bg-white flex items-center justify-center text-base shadow-sm flex-shrink-0" }
const _hoisted_738 = { class: "flex-1 min-w-0" }
const _hoisted_739 = { class: "text-xs font-bold text-antracite" }
const _hoisted_740 = { class: "text-[10px] text-gray-500 line-clamp-2 leading-snug" }
const _hoisted_741 = { class: "text-[10px] font-bold text-gray-400 whitespace-nowrap" }
const _hoisted_742 = {
  key: 0,
  class: "text-[10px] font-semibold text-viola bg-viola/10 border border-viola/20 rounded-lg px-2.5 py-1.5 leading-snug"
}
const _hoisted_743 = { key: 0 }
const _hoisted_744 = {
  key: 1,
  class: "text-[10px] font-medium text-red-500 bg-red-50 border border-red-100 rounded-lg px-2.5 py-1.5 leading-snug"
}
const _hoisted_745 = { class: "flex flex-col justify-center gap-2 border-l border-gray-200 pl-1.5 flex-shrink-0" }
const _hoisted_746 = ["onClick", "disabled"]
const _hoisted_747 = ["onClick", "disabled"]
const _hoisted_748 = { class: "shrink-0 pt-2 border-t border-gray-100" }
const _hoisted_749 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto" }
const _hoisted_750 = { class: "flex justify-between items-start gap-3" }
const _hoisted_751 = { class: "flex items-center gap-3" }
const _hoisted_752 = { class: "text-lg font-bold text-antracite leading-tight" }
const _hoisted_753 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }
const _hoisted_754 = { class: "capitalize" }
const _hoisted_755 = {
  key: 0,
  class: "space-y-2.5"
}
const _hoisted_756 = { class: "space-y-1.5" }
const _hoisted_757 = {
  key: 0,
  class: "rounded-2xl bg-gray-50 border border-gray-100 p-3 space-y-1"
}
const _hoisted_758 = { class: "font-semibold text-antracite truncate" }
const _hoisted_759 = {
  key: 0,
  class: "shrink-0 font-bold text-gray-500"
}
const _hoisted_760 = {
  key: 1,
  class: "shrink-0 text-[10px] font-bold text-amber-600"
}
const _hoisted_761 = { class: "flex items-center justify-between gap-3 text-[11px] font-semibold text-gray-500" }
const _hoisted_762 = ["placeholder"]
const _hoisted_763 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-5 w-full max-w-sm shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto" }
const _hoisted_764 = { class: "flex justify-between items-start gap-3" }
const _hoisted_765 = { class: "flex items-center gap-3" }
const _hoisted_766 = { class: "w-11 h-11 rounded-2xl bg-salvia/10 flex items-center justify-center text-xl" }
const _hoisted_767 = { class: "text-lg font-bold text-antracite leading-tight" }
const _hoisted_768 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }
const _hoisted_769 = { class: "flex gap-1.5 overflow-x-auto hide-scrollbar -mx-1 px-1" }
const _hoisted_770 = ["onClick"]
const _hoisted_771 = {
  key: 0,
  class: "space-y-1.5"
}
const _hoisted_772 = { class: "flex flex-wrap gap-1.5" }
const _hoisted_773 = ["onClick"]
const _hoisted_774 = {
  key: 0,
  class: "text-salvia font-bold"
}
const _hoisted_775 = { class: "space-y-1.5" }
const _hoisted_776 = {
  key: 1,
  class: "rounded-2xl bg-gray-50 border border-gray-100 p-3 space-y-1.5"
}
const _hoisted_777 = { class: "font-semibold text-antracite truncate" }
const _hoisted_778 = {
  key: 0,
  class: "shrink-0 font-bold text-gray-500"
}
const _hoisted_779 = {
  key: 0,
  class: "text-[9px] text-gray-400 font-semibold"
}
const _hoisted_780 = {
  key: 1,
  class: "shrink-0 text-[10px] font-bold text-amber-600"
}
const _hoisted_781 = { class: "flex items-center justify-between gap-2 pt-1.5 border-t border-gray-200 text-xs" }
const _hoisted_782 = { class: "font-extrabold text-salvia" }
const _hoisted_783 = {
  key: 0,
  class: "text-gray-400 font-bold"
}
const _hoisted_784 = { class: "flex items-center justify-between gap-3 text-[11px] font-semibold text-gray-500" }
const _hoisted_785 = ["placeholder"]
const _hoisted_786 = { class: "space-y-2" }
const _hoisted_787 = {
  key: 6,
  class: "fixed inset-0 z-[65] flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_788 = { class: "w-full max-w-sm bg-antracite text-white rounded-3xl p-6 text-center space-y-4 relative overflow-hidden shadow-2xl" }
const _hoisted_789 = { class: "relative z-10 mx-auto w-28 h-28 rounded-3xl cangiante-btn flex flex-col items-center justify-center shadow-lg leading-none" }
const _hoisted_790 = { class: "text-5xl font-black" }
const _hoisted_791 = { class: "relative z-10" }
const _hoisted_792 = { class: "text-2xl font-black" }
const _hoisted_793 = { class: "text-xs font-bold text-white/60 mt-1" }
const _hoisted_794 = { class: "relative z-10 space-y-2 pt-1" }
const _hoisted_795 = {
  key: 7,
  class: "fixed inset-0 z-[65] flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_796 = { class: "w-full max-w-sm bg-antracite text-white rounded-3xl p-6 text-center space-y-4 relative overflow-hidden shadow-2xl" }
const _hoisted_797 = { class: "relative z-10" }
const _hoisted_798 = { class: "text-3xl font-black mt-3" }
const _hoisted_799 = { class: "text-xs font-bold text-white/60 mt-1" }
const _hoisted_800 = {
  key: 0,
  class: "relative z-10 text-[11px] font-semibold text-white/60"
}
const _hoisted_801 = { class: "relative z-10 text-[11px] font-bold text-white/70" }
const _hoisted_802 = { class: "relative z-10 space-y-2 pt-1" }
const _hoisted_803 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 flex flex-col max-h-[90vh]" }
const _hoisted_804 = { class: "flex justify-between items-start shrink-0" }
const _hoisted_805 = { class: "flex items-center gap-3" }
const _hoisted_806 = { class: "w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl" }
const _hoisted_807 = { class: "text-lg font-extrabold text-antracite leading-tight" }
const _hoisted_808 = { class: "text-[11px] font-medium text-gray-500" }
const _hoisted_809 = { class: "text-xs font-bold text-gray-500 shrink-0" }
const _hoisted_810 = { class: "text-antracite font-extrabold" }
const _hoisted_811 = { class: "space-y-2 overflow-y-auto hide-scrollbar" }
const _hoisted_812 = { class: "flex-1 min-w-0" }
const _hoisted_813 = ["onClick"]
const _hoisted_814 = {
  key: 1,
  class: "text-[10px] font-bold text-gray-400 shrink-0"
}
const _hoisted_815 = {
  key: 9,
  class: "fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_816 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 flex flex-col max-h-[90vh]" }
const _hoisted_817 = { class: "flex justify-between items-start shrink-0" }
const _hoisted_818 = { class: "text-[11px] font-bold text-gray-400 mt-0.5" }
const _hoisted_819 = { key: 0 }
const _hoisted_820 = { class: "grid grid-cols-2 gap-2 shrink-0" }
const _hoisted_821 = { class: "overflow-y-auto flex-1 space-y-1.5 pr-1 hide-scrollbar" }
const _hoisted_822 = {
  key: 0,
  class: "text-xs text-gray-400 text-center py-4"
}
const _hoisted_823 = { class: "text-xs font-bold text-antracite capitalize truncate" }
const _hoisted_824 = { class: "flex gap-1 shrink-0" }
const _hoisted_825 = ["onClick"]
const _hoisted_826 = ["onClick"]
const _hoisted_827 = {
  key: 10,
  class: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_828 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-5 transition-transform transform flex flex-col max-h-[90vh]" }
const _hoisted_829 = { class: "flex justify-between items-center shrink-0" }
const _hoisted_830 = { class: "overflow-y-auto flex-1 space-y-2 pr-1 hide-scrollbar" }
const _hoisted_831 = ["onUpdate:modelValue"]
const _hoisted_832 = { class: "shrink-0 pt-2 border-t border-gray-100" }
const _hoisted_833 = {
  key: 11,
  class: "fixed inset-0 z-50 bg-bianco flex flex-col animate-fadeIn sm:max-w-[420px] sm:mx-auto"
}
const _hoisted_834 = { class: "px-5 pt-5 pb-3 flex items-center justify-between gap-3 border-b border-gray-200 bg-bianco" }
const _hoisted_835 = {
  key: 0,
  class: "px-5 py-3 flex gap-2 overflow-x-auto hide-scrollbar"
}
const _hoisted_836 = ["onClick"]
const _hoisted_837 = {
  key: 1,
  class: "mx-5 mb-2 bg-viola/10 border border-viola/20 rounded-2xl px-4 py-2.5 text-xs font-bold text-viola"
}
const _hoisted_838 = { class: "flex-1 overflow-y-auto px-5 pb-28 space-y-5 hide-scrollbar" }
const _hoisted_839 = {
  key: 0,
  class: "py-16 flex justify-center"
}
const _hoisted_840 = {
  key: 1,
  class: "py-16 text-center text-sm font-medium text-gray-500"
}
const _hoisted_841 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-1" }
const _hoisted_842 = { class: "grid grid-cols-3 gap-2" }
const _hoisted_843 = ["onClick"]
const _hoisted_844 = ["src"]
const _hoisted_845 = { class: "absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent text-white px-2 pb-1.5 pt-5 text-left leading-tight" }
const _hoisted_846 = { class: "block text-[10px] font-extrabold" }
const _hoisted_847 = { class: "block text-[9px] font-bold text-white/75" }
const _hoisted_848 = { class: "absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-bianco via-bianco to-transparent" }
const _hoisted_849 = ["disabled"]
const _hoisted_850 = {
  key: 12,
  class: "fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_851 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-5" }
const _hoisted_852 = { class: "flex justify-between items-center" }
const _hoisted_853 = { class: "text-lg font-bold text-antracite" }
const _hoisted_854 = ["disabled"]
const _hoisted_855 = { class: "flex gap-2 overflow-x-auto hide-scrollbar" }
const _hoisted_856 = ["src"]
const _hoisted_857 = {
  key: 0,
  class: "h-28 aspect-[3/4] rounded-xl bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 flex-shrink-0"
}
const _hoisted_858 = { class: "grid grid-cols-4 gap-1.5" }
const _hoisted_859 = ["onClick"]
const _hoisted_860 = { key: 0 }
const _hoisted_861 = ["max"]
const _hoisted_862 = {
  key: 1,
  class: "text-[11px] text-gray-500 font-medium"
}
const _hoisted_863 = {
  key: 2,
  class: "text-[11px] font-bold text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2"
}
const _hoisted_864 = ["disabled"]
const _hoisted_865 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 text-center" }
const _hoisted_866 = { class: "text-xs text-gray-500 font-medium mt-1" }
const _hoisted_867 = { class: "grid grid-cols-2 gap-2" }
const _hoisted_868 = ["src"]
const _hoisted_869 = { class: "absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent text-white text-[10px] font-bold px-2 pb-1.5 pt-4 text-left" }
const _hoisted_870 = ["disabled"]
const _hoisted_871 = { class: "grid grid-cols-2 gap-2" }
const _hoisted_872 = {
  key: 14,
  class: "fixed inset-0 z-[60] bg-black flex flex-col animate-fadeIn sm:max-w-[420px] sm:mx-auto"
}
const _hoisted_873 = { class: "flex items-center justify-between px-4 pt-4 pb-2 text-white" }
const _hoisted_874 = { class: "text-center" }
const _hoisted_875 = { class: "text-sm font-extrabold" }
const _hoisted_876 = { class: "text-[11px] font-bold text-white/60" }
const _hoisted_877 = { class: "flex-1 relative flex items-center justify-center min-h-0" }
const _hoisted_878 = ["src"]
const _hoisted_879 = { class: "p-4 space-y-3" }
const _hoisted_880 = {
  key: 0,
  class: "bg-white/10 rounded-2xl p-3 space-y-3"
}
const _hoisted_881 = ["max"]
const _hoisted_882 = { class: "grid grid-cols-4 gap-1.5" }
const _hoisted_883 = ["onClick"]
const _hoisted_884 = { class: "flex gap-2" }
const _hoisted_885 = {
  key: 1,
  class: "grid grid-cols-2 gap-2"
}
const _hoisted_886 = {
  key: 15,
  class: "fixed inset-0 z-[60] bg-black flex flex-col animate-fadeIn sm:max-w-[420px] sm:mx-auto text-white"
}
const _hoisted_887 = { class: "flex items-center justify-between px-4 pt-4 pb-2" }
const _hoisted_888 = { class: "text-center" }
const _hoisted_889 = {
  key: 0,
  class: "text-[11px] font-bold text-white/60"
}
const _hoisted_890 = { class: "flex bg-white/10 rounded-xl p-0.5" }
const _hoisted_891 = { class: "flex-1 min-h-0 flex items-center justify-center px-4" }
const _hoisted_892 = ["src"]
const _hoisted_893 = ["src"]
const _hoisted_894 = { class: "absolute top-3 left-3 text-[10px] font-black tracking-widest bg-black/50 rounded-full px-2.5 py-1" }
const _hoisted_895 = { class: "absolute top-3 right-3 text-[10px] font-black tracking-widest cangiante-btn rounded-full px-2.5 py-1" }
const _hoisted_896 = {
  key: 1,
  class: "grid grid-cols-2 gap-2 w-full"
}
const _hoisted_897 = { class: "relative aspect-[3/4] rounded-2xl overflow-hidden bg-white/5" }
const _hoisted_898 = ["src"]
const _hoisted_899 = { class: "text-center" }
const _hoisted_900 = { class: "text-xs font-extrabold" }
const _hoisted_901 = {
  key: 0,
  class: "text-[11px] font-bold text-white/60"
}
const _hoisted_902 = { class: "p-4 grid grid-cols-2 gap-2" }
const _hoisted_903 = ["disabled"]
const _hoisted_904 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 max-h-[88vh] flex flex-col" }
const _hoisted_905 = { class: "flex justify-between items-start gap-3" }
const _hoisted_906 = { class: "text-lg font-bold text-antracite leading-tight" }
const _hoisted_907 = { class: "flex-1 overflow-y-auto space-y-2 hide-scrollbar" }
const _hoisted_908 = {
  key: 0,
  class: "text-sm font-bold text-antracite"
}
const _hoisted_909 = { class: "text-sm font-bold text-antracite" }
const _hoisted_910 = { class: "text-[10px] font-semibold text-gray-500" }
const _hoisted_911 = {
  key: 2,
  class: "text-xs font-semibold text-gray-400"
}
const _hoisted_912 = ["disabled"]
const _hoisted_913 = {
  key: 17,
  class: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_914 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-5 flex flex-col max-h-[92vh]" }
const _hoisted_915 = { class: "flex justify-between items-center shrink-0" }
const _hoisted_916 = { class: "flex items-center gap-3" }
const _hoisted_917 = { class: "text-lg font-bold text-antracite leading-tight" }
const _hoisted_918 = { class: "overflow-y-auto flex-1 space-y-4 pr-1 hide-scrollbar" }
const _hoisted_919 = { class: "grid grid-cols-3 gap-2" }
const _hoisted_920 = { class: "grid grid-cols-2 gap-2 mt-2" }
const _hoisted_921 = { class: "shrink-0 space-y-2 pt-2 border-t border-gray-100" }
const _hoisted_922 = {
  key: 0,
  class: "text-xs font-bold text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2"
}
const _hoisted_923 = {
  key: 18,
  class: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_924 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 flex flex-col max-h-[90vh]" }
const _hoisted_925 = { class: "flex justify-between items-center shrink-0" }
const _hoisted_926 = { class: "flex items-center gap-3" }
const _hoisted_927 = { class: "w-10 h-10 rounded-xl bg-salvia/10 flex items-center justify-center text-xl border border-salvia/20" }
const _hoisted_928 = { class: "text-lg font-bold text-antracite leading-tight" }
const _hoisted_929 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }
const _hoisted_930 = {
  key: 0,
  class: "py-8 text-center text-sm text-gray-400 font-medium"
}
const _hoisted_931 = {
  key: 1,
  class: "overflow-y-auto flex-1 space-y-2 pr-1 hide-scrollbar"
}
const _hoisted_932 = { class: "min-w-0" }
const _hoisted_933 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider" }
const _hoisted_934 = { class: "text-base font-extrabold text-antracite" }
const _hoisted_935 = { class: "text-[10px] font-semibold text-gray-400" }
const _hoisted_936 = { class: "text-right flex-shrink-0" }
const _hoisted_937 = {
  key: 1,
  class: "text-[10px] font-medium text-gray-400"
}
const _hoisted_938 = { class: "flex items-center gap-1 flex-shrink-0" }
const _hoisted_939 = ["onClick"]
const _hoisted_940 = ["onClick"]
const _hoisted_941 = { class: "shrink-0 pt-2 border-t border-gray-100" }
const _hoisted_942 = {
  key: 19,
  class: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_943 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 flex flex-col max-h-[90vh]" }
const _hoisted_944 = { class: "flex justify-between items-center shrink-0 gap-3" }
const _hoisted_945 = { class: "flex items-center gap-3 min-w-0" }
const _hoisted_946 = { class: "min-w-0" }
const _hoisted_947 = { class: "text-lg font-bold text-antracite leading-tight truncate" }
const _hoisted_948 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate" }
const _hoisted_949 = {
  key: 0,
  class: "py-8 text-center text-sm text-gray-400 font-medium"
}
const _hoisted_950 = {
  key: 1,
  class: "overflow-y-auto flex-1 space-y-2 pr-1 hide-scrollbar"
}
const _hoisted_951 = { class: "text-[9px] font-bold text-gray-400 uppercase tracking-widest" }
const _hoisted_952 = { class: "text-2xl font-extrabold text-antracite leading-tight" }
const _hoisted_953 = { class: "text-[11px] font-medium text-gray-500 leading-snug mt-1" }
const _hoisted_954 = {
  key: 1,
  class: "bg-white border border-gray-100 rounded-2xl p-4 space-y-3 shadow-sm mb-2"
}
const _hoisted_955 = { class: "grid grid-cols-3 gap-2" }
const _hoisted_956 = { class: "text-lg font-extrabold text-antracite leading-tight" }
const _hoisted_957 = { class: "text-[10px] font-semibold text-gray-400" }
const _hoisted_958 = { class: "text-lg font-extrabold text-antracite leading-tight" }
const _hoisted_959 = { class: "text-[10px] font-semibold text-gray-400" }
const _hoisted_960 = { class: "text-[10px] font-semibold text-gray-400" }
const _hoisted_961 = { class: "relative" }
const _hoisted_962 = ["aria-label"]
const _hoisted_963 = {
  id: "exerciseAreaGrad",
  x1: "0",
  y1: "0",
  x2: "0",
  y2: "1"
}
const _hoisted_964 = ["stop-color"]
const _hoisted_965 = ["stop-color"]
const _hoisted_966 = ["y1", "y2"]
const _hoisted_967 = ["y"]
const _hoisted_968 = ["points"]
const _hoisted_969 = ["points", "stroke"]
const _hoisted_970 = ["x1", "x2"]
const _hoisted_971 = ["cx", "cy", "r", "stroke"]
const _hoisted_972 = ["x", "y"]
const _hoisted_973 = {
  x: "16",
  y: "138",
  fill: "#9CA3AF",
  "font-size": "8",
  "font-weight": "600"
}
const _hoisted_974 = {
  x: "284",
  y: "138",
  "text-anchor": "end",
  fill: "#9CA3AF",
  "font-size": "8",
  "font-weight": "600"
}
const _hoisted_975 = { class: "text-[9px] font-bold text-white/60" }
const _hoisted_976 = { class: "text-xs font-extrabold" }
const _hoisted_977 = {
  key: 0,
  class: "font-semibold text-white/70"
}
const _hoisted_978 = { class: "text-[9px] font-medium text-gray-400 text-center" }
const _hoisted_979 = {
  key: 2,
  class: "text-[10px] font-medium text-gray-400 text-center px-2 pb-1"
}
const _hoisted_980 = { class: "min-w-0" }
const _hoisted_981 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider" }
const _hoisted_982 = { class: "text-base font-extrabold text-antracite flex items-baseline gap-1 flex-wrap" }
const _hoisted_983 = {
  key: 0,
  class: "text-xs font-bold text-gray-400 line-through"
}
const _hoisted_984 = {
  key: 1,
  class: "text-[10px] text-gray-400"
}
const _hoisted_985 = { class: "text-[10px] font-semibold text-gray-400" }
const _hoisted_986 = {
  key: 2,
  class: "text-[10px] text-gray-400 font-medium"
}
const _hoisted_987 = {
  key: 0,
  class: "text-[10px] font-medium text-gray-400 mt-0.5"
}
const _hoisted_988 = {
  key: 1,
  class: "text-[10px] font-medium text-gray-500 mt-0.5"
}
const _hoisted_989 = {
  key: 2,
  class: "text-[9px] font-medium text-amber-700 mt-0.5 leading-snug break-words"
}
const _hoisted_990 = ["onClick"]
const _hoisted_991 = { class: "shrink-0 pt-2 border-t border-gray-100" }
const _hoisted_992 = {
  key: 20,
  class: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_993 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 flex flex-col max-h-[90vh]" }
const _hoisted_994 = { class: "flex justify-between items-center shrink-0 gap-3" }
const _hoisted_995 = { class: "flex items-center gap-3 min-w-0" }
const _hoisted_996 = { class: "min-w-0" }
const _hoisted_997 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate" }
const _hoisted_998 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0" }
const _hoisted_999 = {
  key: 0,
  class: "py-8 text-center text-sm text-gray-400 font-medium"
}
const _hoisted_1000 = {
  key: 1,
  class: "overflow-y-auto flex-1 space-y-3 pr-1 hide-scrollbar"
}
const _hoisted_1001 = { class: "flex items-center gap-3 p-3 bg-gradient-to-r from-arancione/10 to-transparent border-b border-gray-100" }
const _hoisted_1002 = { class: "w-12 h-12 rounded-2xl bg-arancione text-white flex flex-col items-center justify-center flex-shrink-0 shadow-sm" }
const _hoisted_1003 = { class: "text-base font-extrabold leading-none" }
const _hoisted_1004 = { class: "text-[8px] font-bold tracking-widest uppercase mt-0.5" }
const _hoisted_1005 = { class: "min-w-0 flex-1" }
const _hoisted_1006 = { class: "text-sm font-extrabold text-antracite truncate" }
const _hoisted_1007 = { class: "flex items-center gap-1.5 flex-wrap text-[10px] font-semibold text-gray-400" }
const _hoisted_1008 = { class: "text-[9px] font-bold text-arancione bg-arancione/10 px-2 py-1 rounded-lg flex-shrink-0" }
const _hoisted_1009 = { class: "p-2.5 space-y-2.5" }
const _hoisted_1010 = { class: "flex items-center gap-2 px-1" }
const _hoisted_1011 = { class: "text-[9px] font-black uppercase tracking-widest text-gray-400 truncate" }
const _hoisted_1012 = {
  key: 0,
  class: "w-4 h-4",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  "stroke-width": "2"
}
const _hoisted_1013 = {
  key: 1,
  class: "w-4 h-4",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  "stroke-width": "2"
}
const _hoisted_1014 = {
  key: 2,
  class: "w-4 h-4",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  "stroke-width": "2"
}
const _hoisted_1015 = { class: "min-w-0 flex-1" }
const _hoisted_1016 = { class: "text-[11px] font-bold text-antracite truncate" }
const _hoisted_1017 = { class: "text-[9px] font-medium text-gray-400 truncate" }
const _hoisted_1018 = { class: "text-right flex-shrink-0" }
const _hoisted_1019 = { class: "text-[9px] text-gray-400 font-semibold" }
const _hoisted_1020 = { class: "flex items-center justify-end gap-1 text-[9px] font-bold" }
const _hoisted_1021 = { class: "text-gray-400 line-through" }
const _hoisted_1022 = {
  key: 1,
  class: "text-gray-400 font-medium"
}
const _hoisted_1023 = { class: "shrink-0 pt-2 border-t border-gray-100" }
const _hoisted_1024 = {
  key: 21,
  class: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_1025 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 flex flex-col max-h-[90vh]" }
const _hoisted_1026 = { class: "flex justify-between items-center shrink-0 gap-3" }
const _hoisted_1027 = { class: "flex items-center gap-3 min-w-0" }
const _hoisted_1028 = { class: "min-w-0" }
const _hoisted_1029 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate" }
const _hoisted_1030 = { class: "overflow-y-auto flex-1 space-y-2 pr-1 hide-scrollbar" }
const _hoisted_1031 = {
  key: 0,
  class: "flex items-center gap-2"
}
const _hoisted_1032 = { class: "text-[9px] font-black uppercase tracking-widest bg-amber-300 text-amber-900 px-2 py-0.5 rounded-md" }
const _hoisted_1033 = { class: "w-9 h-9 rounded-xl bg-white flex items-center justify-center text-base shadow-sm flex-shrink-0" }
const _hoisted_1034 = { class: "flex-1 min-w-0" }
const _hoisted_1035 = { class: "text-xs font-bold text-antracite truncate" }
const _hoisted_1036 = { class: "text-[10px] text-gray-500 leading-snug" }
const _hoisted_1037 = { key: 0 }
const _hoisted_1038 = {
  key: 0,
  class: "text-gray-400 line-through"
}
const _hoisted_1039 = { key: 1 }
const _hoisted_1040 = { key: 2 }
const _hoisted_1041 = {
  key: 0,
  class: "text-gray-400 line-through"
}
const _hoisted_1042 = { key: 1 }
const _hoisted_1043 = { key: 2 }
const _hoisted_1044 = {
  key: 0,
  class: "text-[9px] text-amber-700 leading-snug mt-0.5 break-words"
}
const _hoisted_1045 = { class: "shrink-0 space-y-2 pt-2 border-t border-gray-100" }
const _hoisted_1046 = {
  key: 0,
  class: "text-[10px] font-bold text-arancione bg-arancione/5 border border-arancione/20 rounded-xl px-3 py-2"
}
const _hoisted_1047 = {
  key: 1,
  class: "text-[10px] font-bold text-arancione bg-arancione/5 border border-arancione/20 rounded-xl px-3 py-2 leading-snug"
}
const _hoisted_1048 = { class: "flex gap-2" }
const _hoisted_1049 = {
  key: 22,
  class: "fixed inset-0 z-[68] bg-antracite text-white flex justify-center animate-fadeIn"
}
const _hoisted_1050 = { class: "w-full max-w-[420px] h-full flex flex-col relative overflow-hidden" }
const _hoisted_1051 = { class: "relative z-10 px-5 pt-5 pb-3 flex items-center justify-between gap-3 shrink-0" }
const _hoisted_1052 = { class: "text-[10px] font-bold text-white/50 uppercase tracking-widest" }
const _hoisted_1053 = ["disabled"]
const _hoisted_1054 = { class: "relative z-10 flex-1 overflow-y-auto hide-scrollbar px-5 pb-6 space-y-5" }
const _hoisted_1055 = { class: "flex justify-center" }
const _hoisted_1056 = {
  ref: "sharePreviewCanvas",
  class: "w-full h-full block"
}
const _hoisted_1057 = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-antracite"
}
const _hoisted_1058 = {
  key: 1,
  class: "absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 rounded-full px-2.5 py-1"
}
const _hoisted_1059 = { class: "text-[10px] font-bold" }
const _hoisted_1060 = { class: "grid grid-cols-2 gap-1.5 bg-white/5 p-1 rounded-2xl" }
const _hoisted_1061 = ["disabled"]
const _hoisted_1062 = {
  key: 0,
  class: "text-[10px] font-medium text-white/45 -mt-3"
}
const _hoisted_1063 = {
  key: 1,
  class: "text-[10px] font-medium text-white/45 -mt-3"
}
const _hoisted_1064 = {
  key: 2,
  class: "text-[11px] font-bold text-arancione bg-arancione/10 border border-arancione/30 rounded-xl px-3 py-2 text-center"
}
const _hoisted_1065 = {
  key: 3,
  class: "text-[11px] font-bold text-arancione bg-arancione/10 border border-arancione/30 rounded-xl px-3 py-2 text-center"
}
const _hoisted_1066 = {
  key: 4,
  class: "space-y-2"
}
const _hoisted_1067 = { class: "grid grid-cols-4 gap-1.5" }
const _hoisted_1068 = ["onClick", "disabled"]
const _hoisted_1069 = {
  key: 5,
  class: "space-y-2"
}
const _hoisted_1070 = ["onClick"]
const _hoisted_1071 = { class: "grid grid-cols-2 gap-1.5" }
const _hoisted_1072 = ["onClick"]
const _hoisted_1073 = {
  key: 6,
  class: "text-[11px] font-bold text-arancione bg-arancione/10 border border-arancione/30 rounded-xl px-3 py-2 text-center"
}
const _hoisted_1074 = {
  key: 7,
  class: "space-y-2"
}
const _hoisted_1075 = { class: "text-[10px] font-bold text-white/50 uppercase tracking-widest" }
const _hoisted_1076 = { class: "grid grid-cols-4 gap-1.5" }
const _hoisted_1077 = ["onClick"]
const _hoisted_1078 = {
  key: 8,
  class: "space-y-2"
}
const _hoisted_1079 = { class: "flex flex-wrap gap-1.5" }
const _hoisted_1080 = ["onClick"]
const _hoisted_1081 = { class: "space-y-2" }
const _hoisted_1082 = { class: "grid grid-cols-5 gap-2" }
const _hoisted_1083 = ["onClick"]
const _hoisted_1084 = {
  key: 1,
  class: "text-[10px] font-medium text-white/50 leading-snug"
}
const _hoisted_1085 = {
  key: 2,
  class: "text-[10px] font-medium text-white/50 leading-snug"
}
const _hoisted_1086 = { class: "space-y-2" }
const _hoisted_1087 = { class: "grid grid-cols-2 gap-1.5" }
const _hoisted_1088 = {
  key: 9,
  class: "flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-2xl p-3"
}
const _hoisted_1089 = { class: "flex items-center gap-3 min-w-0" }
const _hoisted_1090 = ["innerHTML"]
const _hoisted_1091 = { class: "min-w-0" }
const _hoisted_1092 = { class: "text-xs font-bold text-white/80" }
const _hoisted_1093 = { class: "text-[10px] font-medium text-white/40" }
const _hoisted_1094 = { class: "space-y-3 bg-white/5 border border-white/10 rounded-2xl p-4" }
const _hoisted_1095 = { class: "flex items-center justify-between gap-3" }
const _hoisted_1096 = { class: "min-w-0" }
const _hoisted_1097 = { class: "text-[10px] font-medium text-white/40 truncate" }
const _hoisted_1098 = {
  key: 0,
  class: "flex items-center justify-between gap-3"
}
const _hoisted_1099 = { class: "flex bg-white/10 rounded-lg p-0.5" }
const _hoisted_1100 = ["onClick"]
const _hoisted_1101 = { class: "flex items-center justify-between gap-3" }
const _hoisted_1102 = { class: "flex bg-white/10 rounded-lg p-0.5" }
const _hoisted_1103 = ["onClick"]
const _hoisted_1104 = {
  key: 10,
  class: "text-[11px] font-bold text-red-300 bg-red-500/10 border border-red-400/30 rounded-xl px-3 py-2"
}
const _hoisted_1105 = { class: "relative z-10 shrink-0 px-5 pt-3 pb-6 border-t border-white/10 bg-antracite/80 backdrop-blur space-y-2" }
const _hoisted_1106 = { class: "flex gap-2" }
const _hoisted_1107 = ["disabled"]
const _hoisted_1108 = ["disabled"]
const _hoisted_1109 = {
  key: 23,
  class: "fixed inset-0 z-[60] bg-antracite text-white flex justify-center animate-fadeIn"
}
const _hoisted_1110 = { class: "w-full max-w-[420px] h-full flex flex-col relative overflow-hidden" }
const _hoisted_1111 = { class: "relative z-10 px-5 pt-5 pb-3 space-y-3 shrink-0" }
const _hoisted_1112 = { class: "flex items-center justify-between gap-3" }
const _hoisted_1113 = { class: "min-w-0" }
const _hoisted_1114 = { class: "text-[10px] font-bold text-white/50 uppercase tracking-widest truncate" }
const _hoisted_1115 = {
  key: 0,
  class: "text-sm font-extrabold tabular-nums"
}
const _hoisted_1116 = { class: "h-1.5 bg-white/10 rounded-full overflow-hidden" }
const _hoisted_1117 = {
  key: 0,
  class: "relative z-10 flex-1 flex flex-col items-center justify-center gap-4"
}
const _hoisted_1118 = { class: "text-sm font-bold text-white/70" }
const _hoisted_1119 = {
  key: 1,
  class: "relative z-10 flex-1 overflow-y-auto px-6 pb-8 flex flex-col items-center justify-center text-center gap-6"
}
const _hoisted_1120 = { class: "space-y-3" }
const _hoisted_1121 = { class: "text-3xl font-black tracking-tight" }
const _hoisted_1122 = { class: "text-sm font-medium text-white/70 leading-relaxed px-2" }
const _hoisted_1123 = {
  key: 0,
  class: "w-full bg-arancione/15 border border-arancione/40 rounded-2xl p-4 text-left space-y-2 animate-fadeIn"
}
const _hoisted_1124 = { class: "text-sm font-black" }
const _hoisted_1125 = { class: "truncate" }
const _hoisted_1126 = { class: "shrink-0 text-arancione" }
const _hoisted_1127 = { class: "text-white/50 font-semibold" }
const _hoisted_1128 = {
  key: 1,
  class: "w-full bg-white/5 rounded-2xl p-3 space-y-2"
}
const _hoisted_1129 = { class: "text-[11px] font-bold text-white/70" }
const _hoisted_1130 = { class: "grid grid-cols-3 gap-2" }
const _hoisted_1131 = ["onClick"]
const _hoisted_1132 = { class: "grid grid-cols-2 gap-3 w-full" }
const _hoisted_1133 = { class: "bg-white/10 rounded-2xl p-4" }
const _hoisted_1134 = { class: "text-xl font-extrabold tabular-nums" }
const _hoisted_1135 = { class: "bg-white/10 rounded-2xl p-4" }
const _hoisted_1136 = { class: "text-xl font-extrabold tabular-nums" }
const _hoisted_1137 = { class: "bg-white/10 rounded-2xl p-4" }
const _hoisted_1138 = { class: "text-xl font-extrabold" }
const _hoisted_1139 = { class: "bg-white/10 rounded-2xl p-4" }
const _hoisted_1140 = { class: "text-xl font-extrabold" }
const _hoisted_1141 = { class: "w-full space-y-2" }
const _hoisted_1142 = {
  key: 2,
  class: "relative z-10 flex-1 overflow-y-auto px-5 pb-6 flex flex-col gap-4"
}
const _hoisted_1143 = {
  key: 0,
  class: "bg-arancione rounded-2xl px-4 py-3 animate-fadeIn"
}
const _hoisted_1144 = { class: "text-sm font-extrabold" }
const _hoisted_1145 = {
  key: 0,
  class: "text-[11px] font-bold text-white/85 mt-0.5"
}
const _hoisted_1146 = { key: 0 }
const _hoisted_1147 = { class: "bg-white/[0.07] border border-white/10 rounded-3xl p-5 space-y-4" }
const _hoisted_1148 = { class: "flex items-center gap-1.5 flex-wrap" }
const _hoisted_1149 = {
  key: 0,
  class: "text-[9px] font-black uppercase tracking-widest bg-white/15 px-2 py-0.5 rounded-md"
}
const _hoisted_1150 = {
  key: 1,
  class: "text-[9px] font-black uppercase tracking-widest bg-amber-300 text-amber-900 px-2 py-0.5 rounded-md"
}
const _hoisted_1151 = { class: "text-2xl font-black leading-tight break-words" }
const _hoisted_1152 = {
  key: 0,
  class: "grid grid-cols-3 gap-2 text-center"
}
const _hoisted_1153 = { class: "bg-white/5 rounded-xl py-2.5" }
const _hoisted_1154 = { class: "text-lg font-extrabold" }
const _hoisted_1155 = { class: "text-white/40 text-sm" }
const _hoisted_1156 = { class: "bg-white/5 rounded-xl py-2.5" }
const _hoisted_1157 = { class: "text-lg font-extrabold" }
const _hoisted_1158 = { class: "bg-white/5 rounded-xl py-2.5" }
const _hoisted_1159 = { class: "text-lg font-extrabold" }
const _hoisted_1160 = {
  key: 1,
  class: "grid grid-cols-2 gap-2 text-center"
}
const _hoisted_1161 = { class: "bg-white/5 rounded-xl py-2.5" }
const _hoisted_1162 = { class: "text-lg font-extrabold" }
const _hoisted_1163 = { class: "bg-white/5 rounded-xl py-2.5 px-2" }
const _hoisted_1164 = { class: "text-sm font-extrabold break-words" }
const _hoisted_1165 = { class: "bg-white/5 rounded-2xl p-3 space-y-2" }
const _hoisted_1166 = { class: "flex items-center justify-between" }
const _hoisted_1167 = { class: "text-[9px] font-bold text-white/50 uppercase tracking-widest" }
const _hoisted_1168 = { class: "flex items-center gap-2" }
const _hoisted_1169 = { class: "text-[9px] font-medium text-white/40 text-center" }
const _hoisted_1170 = { class: "flex-1 min-w-0 text-[11px] font-medium text-white/80 leading-snug text-left" }
const _hoisted_1171 = { class: "text-white" }
const _hoisted_1172 = {
  key: 1,
  class: "mt-auto space-y-2"
}
const _hoisted_1173 = {
  key: 2,
  class: "mt-auto space-y-4"
}
const _hoisted_1174 = { class: "text-center" }
const _hoisted_1175 = { class: "text-7xl font-black tabular-nums text-arancione" }
const _hoisted_1176 = {
  key: 0,
  class: "text-xs font-bold text-white/60 mt-1"
}
const _hoisted_1177 = {
  key: 0,
  class: "text-salvia"
}
const _hoisted_1178 = {
  key: 3,
  class: "mt-auto space-y-4"
}
const _hoisted_1179 = { class: "flex flex-col items-center" }
const _hoisted_1180 = { class: "relative w-48 h-48" }
const _hoisted_1181 = {
  class: "w-full h-full -rotate-90",
  viewBox: "0 0 100 100"
}
const _hoisted_1182 = ["stroke-dashoffset"]
const _hoisted_1183 = { class: "absolute inset-0 flex items-center justify-center" }
const _hoisted_1184 = { class: "text-5xl font-black tabular-nums" }
const _hoisted_1185 = {
  key: 0,
  class: "text-xs font-bold text-white/60 mt-3"
}
const _hoisted_1186 = {
  key: 0,
  class: "bg-white/5 rounded-2xl p-3 space-y-2"
}
const _hoisted_1187 = { class: "text-[11px] font-bold text-white/70 text-center" }
const _hoisted_1188 = { class: "grid grid-cols-3 gap-2" }
const _hoisted_1189 = ["onClick"]
const _hoisted_1190 = { class: "flex gap-2" }
const _hoisted_1191 = {
  key: 24,
  class: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_1192 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 flex flex-col max-h-[90vh]" }
const _hoisted_1193 = { class: "flex justify-between items-center shrink-0 gap-3" }
const _hoisted_1194 = { class: "flex items-center gap-3 min-w-0" }
const _hoisted_1195 = { class: "min-w-0" }
const _hoisted_1196 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate" }
const _hoisted_1197 = { class: "overflow-y-auto flex-1 space-y-2 pr-1 hide-scrollbar" }
const _hoisted_1198 = { class: "w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-extrabold flex-shrink-0" }
const _hoisted_1199 = { class: "flex-1 min-w-0" }
const _hoisted_1200 = ["onUpdate:modelValue"]
const _hoisted_1201 = { class: "flex-1 min-w-0" }
const _hoisted_1202 = ["onUpdate:modelValue"]
const _hoisted_1203 = ["onClick", "disabled"]
const _hoisted_1204 = {
  key: 0,
  class: "text-[10px] font-bold text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2 shrink-0"
}
const _hoisted_1205 = { class: "shrink-0 flex gap-2 pt-2 border-t border-gray-100" }
const _hoisted_1206 = {
  key: 25,
  class: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_1207 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 flex flex-col max-h-[90vh]" }
const _hoisted_1208 = { class: "flex justify-between items-center shrink-0 gap-3" }
const _hoisted_1209 = { class: "flex items-center gap-3 min-w-0" }
const _hoisted_1210 = { class: "min-w-0" }
const _hoisted_1211 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate" }
const _hoisted_1212 = { class: "overflow-y-auto flex-1 space-y-2 pr-1 hide-scrollbar" }
const _hoisted_1213 = { class: "w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-extrabold flex-shrink-0" }
const _hoisted_1214 = { class: "flex-1 min-w-0" }
const _hoisted_1215 = ["onUpdate:modelValue"]
const _hoisted_1216 = { class: "w-20 flex-shrink-0" }
const _hoisted_1217 = ["onUpdate:modelValue"]
const _hoisted_1218 = { class: "shrink-0 flex items-center justify-between gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2" }
const _hoisted_1219 = { class: "text-sm font-extrabold text-amber-700" }
const _hoisted_1220 = {
  key: 0,
  class: "text-[10px] font-bold text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2 shrink-0"
}
const _hoisted_1221 = { class: "shrink-0 flex gap-2 pt-2 border-t border-gray-100" }
const _hoisted_1222 = {
  key: 26,
  class: "fixed inset-0 z-[70] flex items-center justify-center p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_1223 = { class: "bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 text-center" }
const _hoisted_1224 = { class: "text-lg font-bold text-antracite" }
const _hoisted_1225 = { class: "text-sm text-gray-500 font-medium mt-1 leading-relaxed" }
const _hoisted_1226 = { class: "text-antracite" }
const _hoisted_1227 = { class: "text-arancione" }
const _hoisted_1228 = {
  key: 0,
  class: "space-y-1.5"
}
const _hoisted_1229 = { class: "grid grid-cols-3 gap-2" }
const _hoisted_1230 = ["onClick"]
const _hoisted_1231 = { class: "flex gap-3 pt-1" }
const _hoisted_1232 = {
  class: "absolute top-0 inset-x-0 z-20 px-3 pt-3 space-y-3",
  style: {"padding-top":"max(12px, env(safe-area-inset-top))"}
}
const _hoisted_1233 = { class: "flex gap-1" }
const _hoisted_1234 = { class: "flex items-center justify-between" }
const _hoisted_1235 = { class: "text-[11px] font-black tracking-[0.3em] uppercase text-white/80" }
const _hoisted_1236 = { class: "text-7xl wrap-pop" }
const _hoisted_1237 = {
  class: "text-xs font-black uppercase tracking-[0.25em] text-white/75 wrap-up",
  style: {"animation-delay":".15s"}
}
const _hoisted_1238 = {
  class: "text-2xl font-extrabold leading-tight wrap-up",
  style: {"animation-delay":".5s"}
}
const _hoisted_1239 = {
  key: 0,
  class: "text-sm font-bold text-white/75 wrap-up",
  style: {"animation-delay":".6s"}
}
const _hoisted_1240 = {
  key: 1,
  class: "grid grid-cols-4 gap-2 pt-2"
}
const _hoisted_1241 = { class: "aspect-square rounded-2xl bg-white/15 p-1" }
const _hoisted_1242 = ["innerHTML"]
const _hoisted_1243 = { class: "text-[9px] font-bold text-white/80 mt-1 leading-tight" }
const _hoisted_1244 = {
  key: 2,
  class: "text-base font-semibold text-white/90 leading-snug pt-2 wrap-up",
  style: {"animation-delay":"1s"}
}
const _hoisted_1245 = {
  key: 1,
  class: "absolute inset-0 z-10 overflow-y-auto px-6 pt-20 pb-10 flex flex-col"
}
const _hoisted_1246 = { class: "pointer-events-none fixed inset-0 overflow-hidden" }
const _hoisted_1247 = { class: "relative flex items-end gap-3 wrap-up" }
const _hoisted_1248 = ["innerHTML"]
const _hoisted_1249 = {
  key: 1,
  class: "text-6xl shrink-0 wrap-pop"
}
const _hoisted_1250 = {
  class: "relative bg-white text-antracite rounded-2xl rounded-bl-sm px-3.5 py-2.5 mb-6 shadow-lg wrap-pop",
  style: {"animation-delay":".3s"}
}
const _hoisted_1251 = { class: "text-sm font-black leading-tight" }
const _hoisted_1252 = { class: "text-[11px] font-semibold text-gray-500 leading-snug" }
const _hoisted_1253 = {
  class: "relative mt-4 wrap-up",
  style: {"animation-delay":".15s"}
}
const _hoisted_1254 = { class: "text-xs font-black uppercase tracking-[0.25em] text-white/70" }
const _hoisted_1255 = { class: "text-5xl font-black leading-none mt-1" }
const _hoisted_1256 = {
  key: 0,
  class: "relative mt-5 rounded-3xl p-5 bg-white text-antracite shadow-xl wrap-pop",
  style: {"animation-delay":".25s"}
}
const _hoisted_1257 = { class: "text-2xl font-black mt-1" }
const _hoisted_1258 = { class: "text-sm font-medium text-gray-500 mt-1 leading-snug" }
const _hoisted_1259 = {
  key: 1,
  class: "relative grid grid-cols-2 gap-3 mt-4"
}
const _hoisted_1260 = { class: "flex items-center justify-between" }
const _hoisted_1261 = { class: "text-[9px] font-black uppercase tracking-widest text-white/80" }
const _hoisted_1262 = { class: "text-lg leading-none" }
const _hoisted_1263 = { class: "text-3xl font-black mt-1" }
const _hoisted_1264 = {
  key: 2,
  class: "relative mt-4 rounded-3xl p-4 bg-white/15 border border-white/20 wrap-up",
  style: {"animation-delay":".8s"}
}
const _hoisted_1265 = { class: "flex items-center justify-between" }
const _hoisted_1266 = { class: "text-[11px] font-black" }
const _hoisted_1267 = { class: "flex gap-2 mt-2 overflow-x-auto hide-scrollbar" }
const _hoisted_1268 = ["innerHTML"]
const _hoisted_1269 = {
  key: 3,
  class: "relative mt-6 text-sm text-white/80 font-medium"
}
const _hoisted_1270 = { class: "relative mt-auto pt-8 space-y-2" }
const _hoisted_1271 = { class: "bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 space-y-4 max-h-[85vh] flex flex-col" }
const _hoisted_1272 = { class: "flex items-start justify-between gap-3 shrink-0" }
const _hoisted_1273 = { class: "min-w-0" }
const _hoisted_1274 = { class: "text-lg font-extrabold text-antracite leading-tight" }
const _hoisted_1275 = { class: "text-[11px] font-medium text-gray-500" }
const _hoisted_1276 = { class: "overflow-y-auto space-y-1.5 -mx-1 px-1" }
const _hoisted_1277 = ["onClick"]
const _hoisted_1278 = { class: "text-sm font-bold text-antracite" }
const _hoisted_1279 = {
  key: 0,
  class: "text-[10px] font-bold text-gray-400 whitespace-nowrap"
}
const _hoisted_1280 = { key: 0 }
const _hoisted_1281 = {
  key: 0,
  class: "text-sm text-gray-500 font-medium text-center py-4"
}
const _hoisted_1282 = { class: "grid grid-cols-2 gap-2 shrink-0" }
const _hoisted_1283 = {
  key: 29,
  class: "fixed inset-0 z-50 bg-bianco flex flex-col animate-fadeIn"
}
const _hoisted_1284 = { class: "shrink-0 px-5 pt-5 pb-3 border-b border-gray-100 space-y-3" }
const _hoisted_1285 = { class: "flex items-center justify-between gap-3" }
const _hoisted_1286 = { class: "grid grid-cols-2 gap-1 bg-white rounded-2xl p-1 border border-gray-100" }
const _hoisted_1287 = { class: "flex-1 overflow-y-auto px-5 py-4 space-y-3 pb-10" }
const _hoisted_1288 = {
  key: 0,
  class: "bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-2"
}
const _hoisted_1289 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }
const _hoisted_1290 = { class: "w-10 h-10 rounded-xl bg-salvia/10 flex items-center justify-center text-xl flex-shrink-0" }
const _hoisted_1291 = { class: "min-w-0" }
const _hoisted_1292 = { class: "text-sm font-extrabold text-antracite" }
const _hoisted_1293 = { class: "text-[12px] font-medium text-gray-500 leading-snug mt-0.5" }
const _hoisted_1294 = {
  key: 0,
  class: "text-[11px] font-bold text-salvia mt-1"
}
const _hoisted_1295 = { class: "flex gap-2 overflow-x-auto hide-scrollbar -mx-5 px-5" }
const _hoisted_1296 = ["onClick"]
const _hoisted_1297 = { key: 0 }
const _hoisted_1298 = { class: "bg-salvia/10 border border-salvia/30 rounded-2xl p-4" }
const _hoisted_1299 = { class: "text-[10px] font-bold text-salvia uppercase tracking-widest" }
const _hoisted_1300 = { class: "text-sm font-bold text-antracite mt-1 leading-snug" }
const _hoisted_1301 = {
  key: 0,
  class: "text-[11px] font-medium text-gray-500 mt-1"
}
const _hoisted_1302 = {
  key: 1,
  class: "text-[11px] font-bold text-arancione mt-1"
}
const _hoisted_1303 = {
  key: 2,
  class: "text-[11px] font-medium text-gray-500 mt-1"
}
const _hoisted_1304 = { class: "bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-3" }
const _hoisted_1305 = { class: "flex flex-wrap gap-1.5" }
const _hoisted_1306 = ["onClick"]
const _hoisted_1307 = {
  key: 0,
  class: "flex flex-wrap items-center gap-1.5"
}
const _hoisted_1308 = ["onClick"]
const _hoisted_1309 = {
  key: 1,
  class: "text-[10px] font-bold text-salvia"
}
const _hoisted_1310 = { class: "flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100" }
const _hoisted_1311 = { class: "text-sm font-extrabold text-antracite" }
const _hoisted_1312 = { class: "text-[11px] font-bold text-salvia" }
const _hoisted_1313 = { class: "divide-y divide-gray-100" }
const _hoisted_1314 = { class: "text-lg" }
const _hoisted_1315 = { class: "min-w-0 flex-1" }
const _hoisted_1316 = { class: "flex justify-between gap-2" }
const _hoisted_1317 = { class: "text-xs font-bold text-antracite" }
const _hoisted_1318 = { class: "text-[10px] font-bold text-gray-400 whitespace-nowrap" }
const _hoisted_1319 = { class: "flex flex-wrap gap-1 mt-1" }
const _hoisted_1320 = ["onClick", "disabled"]
const _hoisted_1321 = {
  key: 0,
  class: "text-salvia font-black"
}
const _hoisted_1322 = { class: "bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 space-y-4 max-h-[92vh] overflow-y-auto" }
const _hoisted_1323 = { class: "flex items-start justify-between gap-3" }
const _hoisted_1324 = { class: "min-w-0" }
const _hoisted_1325 = { class: "text-lg font-extrabold text-antracite leading-tight" }
const _hoisted_1326 = {
  key: 0,
  class: "relative w-full rounded-2xl overflow-hidden bg-gray-100",
  style: {"aspect-ratio":"3 / 2"}
}
const _hoisted_1327 = ["src"]
const _hoisted_1328 = ["src"]
const _hoisted_1329 = ["innerHTML"]
const _hoisted_1330 = ["innerHTML"]
const _hoisted_1331 = {
  key: 1,
  class: "flex flex-wrap content-center gap-1.5 order-first"
}
const _hoisted_1332 = {
  key: 1,
  class: "flex flex-wrap gap-1.5"
}
const _hoisted_1333 = { class: "text-sm font-medium text-antracite leading-snug" }
const _hoisted_1334 = { class: "text-[10px] font-medium text-gray-400 leading-snug" }
const _hoisted_1335 = { class: "w-full max-w-md bg-bianco rounded-t-3xl sm:rounded-3xl p-5 space-y-4 max-h-[92vh] overflow-y-auto" }
const _hoisted_1336 = { class: "flex items-start justify-between gap-3" }
const _hoisted_1337 = { class: "space-y-1.5" }
const _hoisted_1338 = {
  key: 0,
  class: "text-xs font-bold text-red-500 bg-red-50 border border-red-100 rounded-xl p-3 leading-snug"
}
const _hoisted_1339 = ["disabled"]
const _hoisted_1340 = { id: "still-exercise-list" }
const _hoisted_1341 = ["value"]
const _hoisted_1342 = {
  key: 32,
  class: "fixed inset-0 z-50 bg-bianco flex flex-col animate-fadeIn"
}
const _hoisted_1343 = { class: "shrink-0 px-5 pt-5 pb-3 bg-bianco border-b border-gray-100 space-y-3" }
const _hoisted_1344 = { class: "flex items-center justify-between gap-3" }
const _hoisted_1345 = { class: "grid grid-cols-3 gap-1 bg-white rounded-2xl p-1 border border-gray-100" }
const _hoisted_1346 = ["onClick"]
const _hoisted_1347 = { class: "flex gap-2 overflow-x-auto hide-scrollbar -mx-5 px-5" }
const _hoisted_1348 = ["onClick"]
const _hoisted_1349 = { class: "grid grid-cols-2 gap-1 bg-white rounded-xl p-1 border border-gray-100" }
const _hoisted_1350 = { class: "flex gap-2 overflow-x-auto hide-scrollbar -mx-5 px-5" }
const _hoisted_1351 = ["onClick"]
const _hoisted_1352 = { key: 0 }
const _hoisted_1353 = { class: "grid grid-cols-2 gap-1 bg-white rounded-xl p-1 border border-gray-100" }
const _hoisted_1354 = {
  key: 0,
  class: "bg-arancione/10 border border-arancione/30 rounded-2xl p-4"
}
const _hoisted_1355 = { class: "text-[10px] font-bold text-arancione uppercase tracking-widest" }
const _hoisted_1356 = { class: "text-sm font-bold text-antracite mt-1 leading-snug" }
const _hoisted_1357 = { class: "text-[11px] font-medium text-gray-500 mt-1" }
const _hoisted_1358 = { class: "flex items-center justify-between px-1" }
const _hoisted_1359 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }
const _hoisted_1360 = ["onClick"]
const _hoisted_1361 = {
  key: 0,
  class: "w-3.5 h-3.5",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  "stroke-width": "3.5"
}
const _hoisted_1362 = { class: "min-w-0 flex-1" }
const _hoisted_1363 = { class: "flex items-center gap-1.5 flex-wrap" }
const _hoisted_1364 = { class: "text-sm font-extrabold text-antracite" }
const _hoisted_1365 = {
  key: 0,
  class: "text-[11px] font-bold text-antracite/80 mt-1 leading-snug"
}
const _hoisted_1366 = { class: "text-[11px] font-medium text-gray-500 mt-1 leading-snug" }
const _hoisted_1367 = ["onClick"]
const _hoisted_1368 = ["src"]
const _hoisted_1369 = ["innerHTML"]
const _hoisted_1370 = { class: "flex items-start gap-3" }
const _hoisted_1371 = { class: "w-11 h-11 rounded-xl bg-arancione/10 flex items-center justify-center text-xl flex-shrink-0" }
const _hoisted_1372 = { class: "min-w-0" }
const _hoisted_1373 = { class: "text-sm font-extrabold text-antracite" }
const _hoisted_1374 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider" }
const _hoisted_1375 = { class: "text-[11px] font-medium text-gray-500 mt-1 leading-snug" }
const _hoisted_1376 = { class: "space-y-1.5" }
const _hoisted_1377 = { class: "text-[10px] font-black text-antracite uppercase tracking-wider" }
const _hoisted_1378 = { class: "text-[11px] font-medium text-gray-500 leading-snug" }
const _hoisted_1379 = ["onClick"]
const _hoisted_1380 = {
  key: 0,
  class: "absolute bottom-0 inset-x-0 p-4 bg-bianco/95 backdrop-blur border-t border-gray-100"
}
const _hoisted_1381 = { class: "bg-white rounded-t-3xl p-6 w-full space-y-4 max-h-[80vh] overflow-y-auto" }
const _hoisted_1382 = { class: "flex items-center justify-between" }
const _hoisted_1383 = { class: "space-y-2" }
const _hoisted_1384 = ["onClick"]
const _hoisted_1385 = { key: 0 }
const _hoisted_1386 = {
  key: 1,
  class: "space-y-1.5"
}
const _hoisted_1387 = { class: "flex flex-wrap gap-2" }
const _hoisted_1388 = ["onClick"]
const _hoisted_1389 = { class: "bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md shadow-2xl max-h-[92vh] overflow-y-auto" }
const _hoisted_1390 = ["innerHTML"]
const _hoisted_1391 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1" }
const _hoisted_1392 = { key: 0 }
const _hoisted_1393 = { class: "text-2xl font-extrabold text-antracite leading-tight" }
const _hoisted_1394 = { class: "text-xs font-medium text-gray-500 mt-1" }
const _hoisted_1395 = {
  key: 0,
  class: "h-2 rounded-full bg-gray-100 mt-3 overflow-hidden max-w-[220px] mx-auto"
}
const _hoisted_1396 = {
  key: 1,
  class: "text-[11px] font-bold text-arancione mt-2"
}
const _hoisted_1397 = {
  key: 2,
  class: "text-[10px] font-bold text-gray-400 mt-2"
}
const _hoisted_1398 = { class: "px-5 pb-6 space-y-5" }
const _hoisted_1399 = { class: "flex gap-2 overflow-x-auto pb-1 -mx-1 px-1" }
const _hoisted_1400 = ["innerHTML"]
const _hoisted_1401 = { class: "text-[9px] font-bold text-gray-400" }
const _hoisted_1402 = { class: "flex gap-1.5 mb-3" }
const _hoisted_1403 = ["onClick"]
const _hoisted_1404 = { class: "grid grid-cols-4 gap-2" }
const _hoisted_1405 = ["onClick"]
const _hoisted_1406 = ["innerHTML"]
const _hoisted_1407 = {
  key: 0,
  class: "absolute top-1 right-1 text-[9px] font-black bg-white rounded-full px-1.5 py-0.5 shadow-sm text-gray-500"
}
const _hoisted_1408 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2" }
const _hoisted_1409 = { class: "grid grid-cols-4 gap-2" }
const _hoisted_1410 = ["innerHTML"]
const _hoisted_1411 = {
  key: 0,
  class: "absolute top-1 right-1 text-[10px] bg-white rounded-full w-5 h-5 flex items-center justify-center shadow-sm"
}
const _hoisted_1412 = { class: "bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden text-center" }
const _hoisted_1413 = ["innerHTML"]
const _hoisted_1414 = { class: "text-2xl font-extrabold text-antracite leading-tight mt-1" }
const _hoisted_1415 = { class: "text-sm text-gray-500 font-medium mt-2" }
const _hoisted_1416 = { class: "p-6 pt-2" }
const _hoisted_1417 = { class: "bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden text-center" }
const _hoisted_1418 = ["innerHTML"]
const _hoisted_1419 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2" }
const _hoisted_1420 = { class: "text-2xl font-extrabold text-antracite leading-tight mt-1" }
const _hoisted_1421 = { class: "text-sm text-gray-500 font-medium mt-2" }
const _hoisted_1422 = { key: 0 }
const _hoisted_1423 = { class: "p-6 pt-2 space-y-2" }
const _hoisted_1424 = {
  key: 36,
  class: "fixed inset-0 z-[67] flex items-center justify-center p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_1425 = { class: "bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden" }
const _hoisted_1426 = { class: "relative px-6 pt-8 pb-6 text-center bg-gradient-to-br from-salvia/15 via-arancione/10 to-viola/15" }
const _hoisted_1427 = { class: "mt-1 text-2xl font-extrabold text-antracite leading-tight" }
const _hoisted_1428 = { class: "p-6 space-y-4" }
const _hoisted_1429 = {
  key: 37,
  class: "fixed inset-0 z-[66] flex items-center justify-center p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_1430 = { class: "bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4" }
const _hoisted_1431 = { class: "flex items-center gap-3" }
const _hoisted_1432 = { class: "min-w-0" }
const _hoisted_1433 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate" }
const _hoisted_1434 = { class: "text-sm text-gray-500 font-medium leading-relaxed" }
const _hoisted_1435 = { class: "text-antracite" }
const _hoisted_1436 = { class: "flex gap-2" }
const _hoisted_1437 = {
  key: 38,
  class: "fixed inset-0 z-[65] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_1438 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 flex flex-col max-h-[90vh]" }
const _hoisted_1439 = { class: "flex justify-between items-start shrink-0 gap-3" }
const _hoisted_1440 = { class: "flex items-center gap-3 min-w-0" }
const _hoisted_1441 = { class: "min-w-0" }
const _hoisted_1442 = { class: "text-lg font-bold text-antracite leading-tight truncate" }
const _hoisted_1443 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate" }
const _hoisted_1444 = { class: "overflow-y-auto flex-1 space-y-4 pr-1 hide-scrollbar" }
const _hoisted_1445 = { class: "flex items-center gap-2 flex-wrap" }
const _hoisted_1446 = {
  key: 0,
  class: "text-[10px] font-black uppercase tracking-widest bg-salvia/10 text-salvia border border-salvia/30 px-2 py-1 rounded-lg"
}
const _hoisted_1447 = {
  key: 1,
  class: "text-[10px] font-black uppercase tracking-widest bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded-lg"
}
const _hoisted_1448 = {
  key: 2,
  class: "text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-500 border border-gray-200 px-2 py-1 rounded-lg"
}
const _hoisted_1449 = {
  key: 3,
  class: "text-[10px] font-black uppercase tracking-widest bg-arancione/10 text-arancione border border-arancione/30 px-2 py-1 rounded-lg"
}
const _hoisted_1450 = {
  key: 4,
  class: "text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-500 border border-gray-200 px-2 py-1 rounded-lg"
}
const _hoisted_1451 = {
  key: 5,
  class: "text-[10px] font-bold text-gray-400"
}
const _hoisted_1452 = {
  key: 0,
  class: "bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-5 text-center text-xs text-gray-500 font-medium leading-relaxed"
}
const _hoisted_1453 = {
  key: 0,
  class: "grid grid-cols-2 gap-2"
}
const _hoisted_1454 = { class: "bg-gray-50 border border-gray-100 rounded-2xl p-3" }
const _hoisted_1455 = { class: "text-lg font-extrabold text-antracite tabular-nums" }
const _hoisted_1456 = { class: "bg-gray-50 border border-gray-100 rounded-2xl p-3" }
const _hoisted_1457 = { class: "text-lg font-extrabold text-antracite tabular-nums" }
const _hoisted_1458 = { class: "bg-gray-50 border border-gray-100 rounded-2xl p-3" }
const _hoisted_1459 = { class: "text-lg font-extrabold text-antracite" }
const _hoisted_1460 = { class: "text-sm text-gray-400" }
const _hoisted_1461 = { class: "bg-gray-50 border border-gray-100 rounded-2xl p-3" }
const _hoisted_1462 = { class: "text-[9px] font-bold text-gray-400 uppercase tracking-widest" }
const _hoisted_1463 = { class: "text-lg font-extrabold text-antracite" }
const _hoisted_1464 = {
  key: 1,
  class: "bg-salvia/10 border border-salvia/30 rounded-2xl px-3 py-2.5 text-[11px] font-bold text-salvia"
}
const _hoisted_1465 = { class: "space-y-2" }
const _hoisted_1466 = { class: "flex items-start justify-between gap-2" }
const _hoisted_1467 = { class: "min-w-0" }
const _hoisted_1468 = { class: "flex items-center gap-1.5 flex-wrap" }
const _hoisted_1469 = { class: "text-sm font-extrabold text-antracite break-words" }
const _hoisted_1470 = {
  key: 0,
  class: "text-[9px] font-black uppercase bg-amber-300 text-amber-900 px-1.5 py-0.5 rounded-md"
}
const _hoisted_1471 = {
  key: 0,
  class: "text-[10px] font-medium text-gray-500 mt-0.5"
}
const _hoisted_1472 = { key: 0 }
const _hoisted_1473 = { key: 1 }
const _hoisted_1474 = {
  key: 1,
  class: "text-[10px] font-medium text-gray-500 mt-0.5"
}
const _hoisted_1475 = {
  key: 0,
  class: "text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-md flex-shrink-0"
}
const _hoisted_1476 = { class: "flex items-center justify-between gap-2 bg-white rounded-xl px-3 py-2 border border-gray-100" }
const _hoisted_1477 = { class: "flex items-baseline gap-1.5 flex-wrap" }
const _hoisted_1478 = { class: "text-xs font-bold text-gray-400 line-through" }
const _hoisted_1479 = {
  key: 0,
  class: "text-[10px] font-black px-2 py-0.5 rounded-md bg-viola/10 text-viola flex-shrink-0"
}
const _hoisted_1480 = {
  key: 2,
  class: "text-[10px] font-bold text-gray-400 flex-shrink-0"
}
const _hoisted_1481 = {
  key: 0,
  class: "text-[10px] font-medium text-amber-700 leading-snug break-words"
}
const _hoisted_1482 = {
  key: 1,
  class: "text-[10px] font-medium text-gray-500"
}
const _hoisted_1483 = {
  key: 2,
  class: "text-[10px] font-medium text-gray-500 leading-snug"
}
const _hoisted_1484 = { class: "font-bold text-antracite" }
const _hoisted_1485 = {
  key: 0,
  class: "text-gray-400"
}
const _hoisted_1486 = {
  key: 2,
  class: "text-[10px] font-medium text-gray-400 leading-snug px-1"
}
const _hoisted_1487 = { class: "shrink-0 flex gap-2 pt-2 border-t border-gray-100" }
const _hoisted_1488 = {
  key: 39,
  class: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_1489 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 flex flex-col max-h-[90vh]" }
const _hoisted_1490 = { class: "flex justify-between items-center shrink-0 gap-3" }
const _hoisted_1491 = { class: "flex items-center gap-3 min-w-0" }
const _hoisted_1492 = { class: "min-w-0" }
const _hoisted_1493 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate" }
const _hoisted_1494 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0" }
const _hoisted_1495 = {
  key: 0,
  class: "py-6 text-center text-sm text-gray-400 font-medium"
}
const _hoisted_1496 = {
  key: 1,
  class: "overflow-y-auto flex-1 space-y-2 pr-1 hide-scrollbar"
}
const _hoisted_1497 = {
  key: 0,
  class: "w-4 h-4",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  "stroke-width": "2"
}
const _hoisted_1498 = {
  key: 1,
  class: "w-4 h-4",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  "stroke-width": "2"
}
const _hoisted_1499 = ["onClick"]
const _hoisted_1500 = { class: "text-[11px] font-bold text-antracite truncate" }
const _hoisted_1501 = { class: "text-[9px] font-medium text-gray-400 truncate" }
const _hoisted_1502 = { key: 0 }
const _hoisted_1503 = {
  key: 1,
  class: "text-salvia font-bold"
}
const _hoisted_1504 = {
  key: 2,
  class: "text-salvia font-bold"
}
const _hoisted_1505 = {
  key: 3,
  class: "text-red-500 font-bold"
}
const _hoisted_1506 = {
  key: 4,
  class: "text-sky-600 font-bold"
}
const _hoisted_1507 = {
  key: 0,
  class: "text-[9px] font-medium text-sky-600 truncate mt-0.5"
}
const _hoisted_1508 = ["onClick"]
const _hoisted_1509 = ["onClick"]
const _hoisted_1510 = { class: "shrink-0 pt-2 border-t border-gray-100" }
const _hoisted_1511 = {
  key: 40,
  class: "fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_1512 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-5" }
const _hoisted_1513 = { class: "flex justify-between items-start gap-3" }
const _hoisted_1514 = { class: "flex items-center gap-3 min-w-0" }
const _hoisted_1515 = { class: "w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-200 flex items-center justify-center text-2xl flex-shrink-0" }
const _hoisted_1516 = { class: "min-w-0" }
const _hoisted_1517 = { class: "text-lg font-bold text-antracite leading-tight truncate" }
const _hoisted_1518 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate" }
const _hoisted_1519 = { key: 0 }
const _hoisted_1520 = { class: "text-center space-y-1" }
const _hoisted_1521 = {
  key: 0,
  class: "text-[10px] font-bold text-sky-600 uppercase tracking-widest pt-1"
}
const _hoisted_1522 = { class: "grid grid-cols-2 gap-3" }
const _hoisted_1523 = { class: "flex items-center justify-between gap-2 pt-1 border-t border-gray-100" }
const _hoisted_1524 = { class: "flex items-center gap-3" }
const _hoisted_1525 = {
  key: 41,
  class: "fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_1526 = { class: "bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 flex flex-col max-h-[92vh]" }
const _hoisted_1527 = { class: "flex justify-between items-center shrink-0 gap-3" }
const _hoisted_1528 = { class: "flex items-center gap-3 min-w-0" }
const _hoisted_1529 = { class: "min-w-0" }
const _hoisted_1530 = { class: "text-lg font-bold text-antracite leading-tight" }
const _hoisted_1531 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate" }
const _hoisted_1532 = { class: "grid grid-cols-2 gap-2 shrink-0" }
const _hoisted_1533 = { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1" }
const _hoisted_1534 = { class: "grid grid-cols-2 gap-1.5" }
const _hoisted_1535 = { class: "text-[10px] font-medium text-gray-400 -mt-1 shrink-0" }
const _hoisted_1536 = {
  key: 0,
  class: "shrink-0 space-y-1.5"
}
const _hoisted_1537 = { class: "grid grid-cols-2 gap-1.5" }
const _hoisted_1538 = {
  key: 1,
  class: "text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-200 rounded-xl px-3 py-2 shrink-0 leading-snug"
}
const _hoisted_1539 = {
  key: 2,
  class: "text-[10px] font-medium text-gray-500 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 shrink-0 leading-snug"
}
const _hoisted_1540 = { class: "font-bold" }
const _hoisted_1541 = { class: "flex bg-gray-100 rounded-xl p-1 shrink-0" }
const _hoisted_1542 = { class: "overflow-y-auto flex-1 space-y-3 pr-1 hide-scrollbar" }
const _hoisted_1543 = ["value"]
const _hoisted_1544 = {
  key: 1,
  class: "bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 text-[10px] font-medium text-amber-800 leading-relaxed"
}
const _hoisted_1545 = ["value"]
const _hoisted_1546 = { class: "flex items-center justify-between gap-2" }
const _hoisted_1547 = {
  key: 0,
  class: "space-y-1.5"
}
const _hoisted_1548 = { class: "flex gap-1.5" }
const _hoisted_1549 = ["onClick"]
const _hoisted_1550 = {
  key: 3,
  class: "text-[10px] font-bold text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2 shrink-0"
}
const _hoisted_1551 = { class: "shrink-0 flex gap-2 pt-2 border-t border-gray-100" }
const _hoisted_1552 = { class: "bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-5" }
const _hoisted_1553 = { class: "space-y-2" }
const _hoisted_1554 = { class: "grid grid-cols-4 gap-1.5" }
const _hoisted_1555 = ["onClick"]
const _hoisted_1556 = { class: "text-xl leading-none" }
const _hoisted_1557 = { class: "text-[10px] font-bold leading-tight text-center" }
const _hoisted_1558 = { class: "space-y-2" }
const _hoisted_1559 = { class: "grid grid-cols-5 gap-1.5" }
const _hoisted_1560 = ["onClick"]
const _hoisted_1561 = { class: "space-y-2" }
const _hoisted_1562 = {
  key: 43,
  class: "fixed inset-0 z-[75] flex items-center justify-center p-4 bg-antracite/60 backdrop-blur-sm animate-fadeIn"
}
const _hoisted_1563 = { class: "record-pop bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 text-center relative overflow-hidden" }
const _hoisted_1564 = {
  class: "record-confetti",
  "aria-hidden": "true"
}
const _hoisted_1565 = { class: "relative" }
const _hoisted_1566 = { class: "text-xl font-extrabold text-antracite mt-1 leading-tight" }
const _hoisted_1567 = { class: "text-4xl font-black text-antracite mt-2" }
const _hoisted_1568 = { class: "text-xs font-semibold text-gray-500 mt-1" }
const _hoisted_1569 = { class: "text-salvia" }
const _hoisted_1570 = { class: "space-y-2 relative" }
const _hoisted_1571 = { class: "bg-white/95 backdrop-blur-lg border-t border-gray-200 px-2 py-2.5 flex justify-between items-center z-20 absolute bottom-0 left-0 right-0 pb-6 sm:pb-2.5" }
const _hoisted_1572 = {
  key: 0,
  class: "w-1.5 h-1.5 bg-viola rounded-full absolute bottom-0"
}
const _hoisted_1573 = {
  key: 0,
  class: "w-1.5 h-1.5 bg-arancione rounded-full absolute bottom-0"
}
const _hoisted_1574 = {
  key: 0,
  class: "w-1.5 h-1.5 bg-salvia rounded-full absolute bottom-0"
}
const _hoisted_1575 = {
  key: 0,
  class: "w-1.5 h-1.5 bg-viola rounded-full absolute bottom-0"
}
const _hoisted_1576 = {
  key: 0,
  class: "w-1.5 h-1.5 bg-arancione rounded-full absolute bottom-0"
}

return function render(_ctx, _cache) {
  return (!_ctx.isAuthenticated && !_ctx.authLoading)
    ? (_openBlock(), _createElementBlock("div", _hoisted_1, [
        _cache[388] || (_cache[388] = _createElementVNode("div", { class: "absolute -top-10 -left-10 w-64 h-64 bg-salvia/15 rounded-full blur-[80px] animate-float-1 pointer-events-none" }, null, -1 /* CACHED */)),
        _cache[389] || (_cache[389] = _createElementVNode("div", { class: "absolute top-[35%] -right-10 w-64 h-64 bg-arancione/15 rounded-full blur-[80px] animate-float-2 pointer-events-none" }, null, -1 /* CACHED */)),
        _cache[390] || (_cache[390] = _createElementVNode("div", { class: "absolute -bottom-10 -left-10 w-72 h-72 bg-viola/15 rounded-full blur-[80px] animate-float-3 pointer-events-none" }, null, -1 /* CACHED */)),
        (_ctx.onboarding.step === 0)
          ? (_openBlock(), _createElementBlock("div", _hoisted_2, [
              _cache[371] || (_cache[371] = _createStaticVNode("<div class=\"flex flex-col items-center space-y-6 text-center w-full\"><div class=\"w-36 h-36 flex items-center justify-center relative drop-shadow-md\"><div class=\"w-full h-full cangiante-btn logo-mask\"></div></div><div class=\"space-y-4 text-center w-full flex flex-col items-center justify-center\"><h1 class=\"text-4xl sm:text-5xl font-black tracking-[0.2em] text-center cangiante-text uppercase translate-x-[0.1em]\">STILL</h1><div class=\"font-extrabold space-y-2 text-center w-full flex flex-col items-center justify-center\"><div class=\"text-xl tracking-wider text-center flex items-center justify-center gap-2 cangiante-text font-black\"><span>IERI.</span> <span>OGGI.</span> <span>DOMANI.</span></div><div class=\"text-[12px] font-black uppercase tracking-widest text-center flex items-center justify-center gap-2 mt-1 cangiante-text\"><span>ANCORA.</span> <span>ANCORA.</span> <span>ANCORA.</span></div></div></div></div>", 1)),
              _createElementVNode("div", _hoisted_3, [
                _createElementVNode("button", {
                  onClick: _cache[0] || (_cache[0] = $event => (_ctx.hasProfile ? _ctx.enterApp() : (_ctx.onboarding.step = 1))),
                  class: "w-full cangiante-btn text-white font-extrabold py-4 rounded-2xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-95"
                }, [
                  _createElementVNode("span", null, _toDisplayString(_ctx.hasProfile ? 'Entra' : 'Inizia'), 1 /* TEXT */),
                  _cache[368] || (_cache[368] = _createElementVNode("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    _createElementVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2.5",
                      d: "M14 5l7 7m0 0l-7 7m7-7H3"
                    })
                  ], -1 /* CACHED */))
                ]),
                (!_ctx.hasProfile)
                  ? (_openBlock(), _createElementBlock("button", {
                      key: 0,
                      onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.triggerOnboardingImport && _ctx.triggerOnboardingImport(...args))),
                      class: "w-full text-xs font-bold text-gray-500 hover:text-antracite py-2 transition-colors"
                    }, [...(_cache[369] || (_cache[369] = [
                      _createTextVNode("Hai già un backup? ", -1 /* CACHED */),
                      _createElementVNode("span", { class: "underline" }, "Ripristinalo", -1 /* CACHED */)
                    ]))]))
                  : _createCommentVNode("v-if", true),
                _createElementVNode("input", {
                  ref: "onboardingFileInput",
                  type: "file",
                  accept: "application/json,.json",
                  class: "hidden",
                  onChange: _cache[2] || (_cache[2] = (...args) => (_ctx.handleOnboardingBackup && _ctx.handleOnboardingBackup(...args)))
                }, null, 544 /* NEED_HYDRATION, NEED_PATCH */),
                (_ctx.onboarding.error)
                  ? (_openBlock(), _createElementBlock("p", _hoisted_4, _toDisplayString(_ctx.onboarding.error), 1 /* TEXT */))
                  : _createCommentVNode("v-if", true),
                _cache[370] || (_cache[370] = _createElementVNode("p", { class: "text-center text-[10px] font-bold text-gray-400 tracking-widest pt-2" }, "Powered by Pietro De Giglio", -1 /* CACHED */))
              ])
            ]))
          : (_openBlock(), _createElementBlock("div", _hoisted_5, [
              _createElementVNode("div", _hoisted_6, [
                _cache[372] || (_cache[372] = _createElementVNode("div", { class: "h-1.5 flex-1 rounded-full bg-salvia" }, null, -1 /* CACHED */)),
                _createElementVNode("div", {
                  class: _normalizeClass(["h-1.5 flex-1 rounded-full transition-colors", _ctx.onboarding.step === 2 ? 'bg-salvia' : 'bg-gray-200'])
                }, null, 2 /* CLASS */)
              ]),
              (_ctx.onboarding.step === 1)
                ? (_openBlock(), _createElementBlock("div", _hoisted_7, [
                    _cache[379] || (_cache[379] = _createElementVNode("div", null, [
                      _createElementVNode("div", { class: "text-[10px] font-bold text-salvia tracking-widest uppercase" }, "Passo 1 di 2"),
                      _createElementVNode("h2", { class: "text-2xl font-bold text-antracite" }, "Piacere, chi sei?"),
                      _createElementVNode("p", { class: "text-sm text-gray-500 font-medium mt-1" }, "Solo il nome è obbligatorio.")
                    ], -1 /* CACHED */)),
                    _createElementVNode("div", _hoisted_8, [
                      _createElementVNode("div", null, [
                        _cache[373] || (_cache[373] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Nome *", -1 /* CACHED */)),
                        _withDirectives(_createElementVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((_ctx.onboarding.firstName) = $event)),
                          placeholder: "Es. Marco",
                          autocomplete: "given-name",
                          class: "w-full bg-white border border-gray-200 focus:border-salvia focus:ring-2 focus:ring-salvia/20 rounded-xl p-3 text-sm font-bold text-antracite outline-none transition-all placeholder:text-gray-300 placeholder:font-medium"
                        }, null, 512 /* NEED_PATCH */), [
                          [_vModelText, _ctx.onboarding.firstName]
                        ])
                      ]),
                      _createElementVNode("div", null, [
                        _cache[374] || (_cache[374] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Cognome", -1 /* CACHED */)),
                        _withDirectives(_createElementVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((_ctx.onboarding.lastName) = $event)),
                          placeholder: "Facoltativo",
                          autocomplete: "family-name",
                          class: "w-full bg-white border border-gray-200 focus:border-salvia focus:ring-2 focus:ring-salvia/20 rounded-xl p-3 text-sm font-bold text-antracite outline-none transition-all placeholder:text-gray-300 placeholder:font-medium"
                        }, null, 512 /* NEED_PATCH */), [
                          [_vModelText, _ctx.onboarding.lastName]
                        ])
                      ]),
                      _createElementVNode("div", null, [
                        _cache[375] || (_cache[375] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Sesso", -1 /* CACHED */)),
                        _createElementVNode("div", _hoisted_9, [
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.sexOptions, (opt) => {
                            return (_openBlock(), _createElementBlock("button", {
                              key: 'ob-sex-' + opt.id,
                              type: "button",
                              onClick: $event => (_ctx.onboarding.sex = _ctx.onboarding.sex === opt.id ? '' : opt.id),
                              class: _normalizeClass(["py-3 rounded-xl text-sm font-bold border transition-all", _ctx.onboarding.sex === opt.id ? 'bg-salvia/10 border-salvia text-salvia' : 'bg-white border-gray-200 text-gray-500'])
                            }, _toDisplayString(opt.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_10))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]),
                        _cache[376] || (_cache[376] = _createElementVNode("p", { class: "text-[10px] font-medium text-gray-400 mt-1" }, "Serve solo per calcolare fabbisogno e massa grassa.", -1 /* CACHED */))
                      ]),
                      _createElementVNode("div", _hoisted_11, [
                        _createElementVNode("div", null, [
                          _cache[377] || (_cache[377] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Data di nascita", -1 /* CACHED */)),
                          _withDirectives(_createElementVNode("input", {
                            type: "date",
                            "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((_ctx.onboarding.birthDate) = $event)),
                            max: _ctx.todayDateKey,
                            class: "w-full bg-white border border-gray-200 focus:border-salvia focus:ring-2 focus:ring-salvia/20 rounded-xl p-3 text-sm font-bold text-antracite outline-none transition-all placeholder:text-gray-300 placeholder:font-medium"
                          }, null, 8 /* PROPS */, _hoisted_12), [
                            [_vModelText, _ctx.onboarding.birthDate]
                          ])
                        ]),
                        _createElementVNode("div", null, [
                          _cache[378] || (_cache[378] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Altezza (cm)", -1 /* CACHED */)),
                          _withDirectives(_createElementVNode("input", {
                            type: "text",
                            inputmode: "numeric",
                            "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((_ctx.onboarding.height) = $event)),
                            placeholder: "Es. 178",
                            class: "w-full bg-white border border-gray-200 focus:border-salvia focus:ring-2 focus:ring-salvia/20 rounded-xl p-3 text-sm font-bold text-antracite outline-none transition-all placeholder:text-gray-300 placeholder:font-medium text-center"
                          }, null, 512 /* NEED_PATCH */), [
                            [_vModelText, _ctx.onboarding.height]
                          ])
                        ])
                      ])
                    ])
                  ]))
                : (_openBlock(), _createElementBlock("div", _hoisted_13, [
                    _cache[387] || (_cache[387] = _createElementVNode("div", null, [
                      _createElementVNode("div", { class: "text-[10px] font-bold text-salvia tracking-widest uppercase" }, "Passo 2 di 2"),
                      _createElementVNode("h2", { class: "text-2xl font-bold text-antracite" }, "Da dove parti?"),
                      _createElementVNode("p", { class: "text-sm text-gray-500 font-medium mt-1" }, "Tutto facoltativo: diventerà la tua prima misurazione in Progressi. Puoi aggiungerla anche dopo.")
                    ], -1 /* CACHED */)),
                    _createElementVNode("div", null, [
                      _cache[380] || (_cache[380] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Peso (kg)", -1 /* CACHED */)),
                      _withDirectives(_createElementVNode("input", {
                        type: "text",
                        inputmode: "decimal",
                        "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((_ctx.onboarding.weight) = $event)),
                        placeholder: "Es. 78,5",
                        class: "w-full bg-white border border-gray-200 focus:border-salvia focus:ring-2 focus:ring-salvia/20 rounded-xl p-3 text-sm font-bold text-antracite outline-none transition-all placeholder:text-gray-300 placeholder:font-medium text-center text-lg"
                      }, null, 512 /* NEED_PATCH */), [
                        [_vModelText, _ctx.onboarding.weight]
                      ])
                    ]),
                    _createElementVNode("div", null, [
                      _cache[386] || (_cache[386] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2" }, "Circonferenze", -1 /* CACHED */)),
                      _createElementVNode("div", _hoisted_14, [
                        _createElementVNode("div", null, [
                          _cache[381] || (_cache[381] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Petto (cm)", -1 /* CACHED */)),
                          _withDirectives(_createElementVNode("input", {
                            type: "text",
                            inputmode: "decimal",
                            "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((_ctx.onboarding.chest) = $event)),
                            placeholder: "—",
                            class: "w-full bg-white border border-gray-200 focus:border-salvia focus:ring-2 focus:ring-salvia/20 rounded-xl p-3 text-sm font-bold text-antracite outline-none transition-all placeholder:text-gray-300 placeholder:font-medium text-center"
                          }, null, 512 /* NEED_PATCH */), [
                            [_vModelText, _ctx.onboarding.chest]
                          ])
                        ]),
                        _createElementVNode("div", null, [
                          _cache[382] || (_cache[382] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Braccia (cm)", -1 /* CACHED */)),
                          _withDirectives(_createElementVNode("input", {
                            type: "text",
                            inputmode: "decimal",
                            "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((_ctx.onboarding.arms) = $event)),
                            placeholder: "—",
                            class: "w-full bg-white border border-gray-200 focus:border-salvia focus:ring-2 focus:ring-salvia/20 rounded-xl p-3 text-sm font-bold text-antracite outline-none transition-all placeholder:text-gray-300 placeholder:font-medium text-center"
                          }, null, 512 /* NEED_PATCH */), [
                            [_vModelText, _ctx.onboarding.arms]
                          ])
                        ]),
                        _createElementVNode("div", null, [
                          _cache[383] || (_cache[383] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Vita (cm)", -1 /* CACHED */)),
                          _withDirectives(_createElementVNode("input", {
                            type: "text",
                            inputmode: "decimal",
                            "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((_ctx.onboarding.waist) = $event)),
                            placeholder: "—",
                            class: "w-full bg-white border border-gray-200 focus:border-salvia focus:ring-2 focus:ring-salvia/20 rounded-xl p-3 text-sm font-bold text-antracite outline-none transition-all placeholder:text-gray-300 placeholder:font-medium text-center"
                          }, null, 512 /* NEED_PATCH */), [
                            [_vModelText, _ctx.onboarding.waist]
                          ])
                        ]),
                        _createElementVNode("div", null, [
                          _cache[384] || (_cache[384] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Cosce (cm)", -1 /* CACHED */)),
                          _withDirectives(_createElementVNode("input", {
                            type: "text",
                            inputmode: "decimal",
                            "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => ((_ctx.onboarding.thighs) = $event)),
                            placeholder: "—",
                            class: "w-full bg-white border border-gray-200 focus:border-salvia focus:ring-2 focus:ring-salvia/20 rounded-xl p-3 text-sm font-bold text-antracite outline-none transition-all placeholder:text-gray-300 placeholder:font-medium text-center"
                          }, null, 512 /* NEED_PATCH */), [
                            [_vModelText, _ctx.onboarding.thighs]
                          ])
                        ]),
                        _createElementVNode("div", null, [
                          _cache[385] || (_cache[385] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Pancia (cm)", -1 /* CACHED */)),
                          _withDirectives(_createElementVNode("input", {
                            type: "text",
                            inputmode: "decimal",
                            "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((_ctx.onboarding.belly) = $event)),
                            placeholder: "—",
                            class: "w-full bg-white border border-gray-200 focus:border-salvia focus:ring-2 focus:ring-salvia/20 rounded-xl p-3 text-sm font-bold text-antracite outline-none transition-all placeholder:text-gray-300 placeholder:font-medium text-center"
                          }, null, 512 /* NEED_PATCH */), [
                            [_vModelText, _ctx.onboarding.belly]
                          ])
                        ])
                      ])
                    ])
                  ])),
              (_ctx.onboarding.error)
                ? (_openBlock(), _createElementBlock("p", _hoisted_15, _toDisplayString(_ctx.onboarding.error), 1 /* TEXT */))
                : _createCommentVNode("v-if", true),
              _createElementVNode("div", _hoisted_16, [
                _createElementVNode("button", {
                  onClick: _cache[13] || (_cache[13] = (...args) => (_ctx.onboardingBack && _ctx.onboardingBack(...args))),
                  class: "flex-1 bg-white border border-gray-200 text-gray-600 font-bold py-4 rounded-2xl hover:bg-gray-50 active:scale-95 transition-all"
                }, "Indietro"),
                (_ctx.onboarding.step === 1)
                  ? (_openBlock(), _createElementBlock("button", {
                      key: 0,
                      onClick: _cache[14] || (_cache[14] = (...args) => (_ctx.onboardingNext && _ctx.onboardingNext(...args))),
                      class: "flex-[2] bg-salvia text-white font-extrabold py-4 rounded-2xl shadow-lg hover:bg-salvia/90 active:scale-95 transition-all"
                    }, "Avanti"))
                  : (_openBlock(), _createElementBlock("button", {
                      key: 1,
                      onClick: _cache[15] || (_cache[15] = (...args) => (_ctx.completeOnboarding && _ctx.completeOnboarding(...args))),
                      class: "flex-[2] cangiante-btn text-white font-extrabold py-4 rounded-2xl shadow-lg active:scale-95 transition-all"
                    }, "Inizia il percorso"))
              ])
            ]))
      ]))
    : (_ctx.authLoading)
      ? (_openBlock(), _createElementBlock("div", _hoisted_17, [...(_cache[391] || (_cache[391] = [
          _createElementVNode("div", { class: "w-8 h-8 border-4 border-salvia border-t-transparent rounded-full animate-spin" }, null, -1 /* CACHED */)
        ]))]))
      : (_openBlock(), _createElementBlock(_Fragment, { key: 2 }, [
          _createElementVNode("header", _hoisted_18, [
            _createElementVNode("div", _hoisted_19, [
              _createElementVNode("button", {
                onClick: _cache[16] || (_cache[16] = (...args) => (_ctx.openBackupModal && _ctx.openBackupModal(...args))),
                class: "w-9 h-9 rounded-full bg-salvia/20 text-salvia flex items-center justify-center font-bold text-sm border border-salvia/30 hover:bg-salvia/30 active:scale-95 transition-all",
                "aria-label": "Profilo"
              }, _toDisplayString(_ctx.profileInitial), 1 /* TEXT */)
            ]),
            _cache[393] || (_cache[393] = _createElementVNode("div", { class: "flex items-center gap-2" }, [
              _createElementVNode("div", { class: "w-8 h-8 flex items-center justify-center" }, [
                _createElementVNode("div", { class: "w-full h-full cangiante-btn logo-mask" })
              ]),
              _createElementVNode("span", { class: "font-extrabold text-base tracking-[0.2em] cangiante-text" }, "STILL")
            ], -1 /* CACHED */)),
            _createElementVNode("button", {
              onClick: _cache[17] || (_cache[17] = (...args) => (_ctx.openBackupModal && _ctx.openBackupModal(...args))),
              class: "p-2 rounded-xl bg-white hover:bg-gray-100 text-gray-600 border border-gray-200 transition-all",
              "aria-label": "Impostazioni"
            }, [...(_cache[392] || (_cache[392] = [
              _createElementVNode("svg", {
                class: "w-4 h-4",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                "stroke-width": "2"
              }, [
                _createElementVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                }),
                _createElementVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                })
              ], -1 /* CACHED */)
            ]))])
          ]),
          _createElementVNode("main", _hoisted_20, [
            (_ctx.activeTab === 'dashboard')
              ? (_openBlock(), _createElementBlock("div", _hoisted_21, [
                  _createElementVNode("div", _hoisted_22, [
                    _cache[397] || (_cache[397] = _createElementVNode("svg", {
                      class: "absolute right-0 top-0 w-32 h-32 text-white/5",
                      fill: "currentColor",
                      viewBox: "0 0 100 100"
                    }, [
                      _createElementVNode("path", { d: "M 10 90 L 50 30 L 90 90 Z" })
                    ], -1 /* CACHED */)),
                    _createElementVNode("div", _hoisted_23, [
                      _cache[395] || (_cache[395] = _createElementVNode("span", { class: "text-[10px] font-black uppercase tracking-[0.2em] text-white/40" }, "🔥 Frase del giorno", -1 /* CACHED */)),
                      _createElementVNode("button", {
                        onClick: _cache[18] || (_cache[18] = $event => (_ctx.openShareStudio('quote'))),
                        class: "px-2.5 py-1 rounded-full cangiante-btn text-[11px] font-bold text-white flex items-center gap-1",
                        title: "Condividi nelle storie"
                      }, [...(_cache[394] || (_cache[394] = [
                        _createElementVNode("svg", {
                          class: "w-3 h-3",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2.5"
                        }, [
                          _createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4m0 0L8 6m4-4v13"
                          })
                        ], -1 /* CACHED */),
                        _createTextVNode(" Storia ", -1 /* CACHED */)
                      ]))])
                    ]),
                    _createElementVNode("p", _hoisted_24, [
                      _createTextVNode(" \"" + _toDisplayString(_ctx.dailyBar.pre) + " ", 1 /* TEXT */),
                      _createElementVNode("span", _hoisted_25, _toDisplayString(_ctx.dailyBar.hi), 1 /* TEXT */),
                      _cache[396] || (_cache[396] = _createTextVNode("\" ", -1 /* CACHED */))
                    ]),
                    (_ctx.dailyBar.by)
                      ? (_openBlock(), _createElementBlock("p", _hoisted_26, "— " + _toDisplayString(_ctx.dailyBar.by), 1 /* TEXT */))
                      : _createCommentVNode("v-if", true)
                  ]),
                  (_ctx.backupDue)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_27, [
                        _cache[401] || (_cache[401] = _createElementVNode("div", { class: "w-10 h-10 rounded-xl bg-arancione/15 flex items-center justify-center text-lg flex-shrink-0" }, "💾", -1 /* CACHED */)),
                        _createElementVNode("div", _hoisted_28, [
                          _cache[400] || (_cache[400] = _createElementVNode("div", { class: "text-sm font-extrabold text-antracite" }, "Salva una copia dei tuoi progressi", -1 /* CACHED */)),
                          _createElementVNode("p", _hoisted_29, [
                            _cache[398] || (_cache[398] = _createTextVNode("Sono solo su questo telefono. Ultimo backup: ", -1 /* CACHED */)),
                            _createElementVNode("span", _hoisted_30, _toDisplayString(_ctx.lastBackupLabel), 1 /* TEXT */),
                            _cache[399] || (_cache[399] = _createTextVNode(".", -1 /* CACHED */))
                          ]),
                          _createElementVNode("div", _hoisted_31, [
                            _createElementVNode("button", {
                              onClick: _cache[19] || (_cache[19] = (...args) => (_ctx.exportBackup && _ctx.exportBackup(...args))),
                              class: "flex-1 bg-salvia text-white font-bold py-2 rounded-xl text-xs active:scale-95 transition-all"
                            }, "Salva backup"),
                            _createElementVNode("button", {
                              onClick: _cache[20] || (_cache[20] = (...args) => (_ctx.snoozeBackup && _ctx.snoozeBackup(...args))),
                              class: "flex-1 bg-gray-100 text-gray-600 font-bold py-2 rounded-xl text-xs active:scale-95 transition-all"
                            }, "Più tardi")
                          ])
                        ])
                      ]))
                    : _createCommentVNode("v-if", true),
                  (_ctx.photoDue && !_ctx.backupDue)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_32, [
                        _cache[403] || (_cache[403] = _createElementVNode("div", { class: "w-10 h-10 rounded-xl bg-viola/10 flex items-center justify-center text-lg flex-shrink-0" }, "📸", -1 /* CACHED */)),
                        _createElementVNode("div", _hoisted_33, [
                          _cache[402] || (_cache[402] = _createElementVNode("div", { class: "text-sm font-extrabold text-antracite" }, "È il momento della foto del mese", -1 /* CACHED */)),
                          _createElementVNode("p", _hoisted_34, "L'ultima è di " + _toDisplayString(_ctx.photoDue) + " giorni fa. Stessa posa e stessa luce: poi ti preparo la storia \"Prima e dopo\".", 1 /* TEXT */),
                          _createElementVNode("div", _hoisted_35, [
                            _createElementVNode("button", {
                              onClick: _cache[21] || (_cache[21] = (...args) => (_ctx.triggerPhotoInput && _ctx.triggerPhotoInput(...args))),
                              class: "flex-1 cangiante-btn text-white font-bold py-2 rounded-xl text-xs active:scale-95 transition-all"
                            }, "Scatta la foto"),
                            _createElementVNode("button", {
                              onClick: _cache[22] || (_cache[22] = (...args) => (_ctx.snoozePhoto && _ctx.snoozePhoto(...args))),
                              class: "flex-1 bg-gray-100 text-gray-600 font-bold py-2 rounded-xl text-xs active:scale-95 transition-all"
                            }, "Più tardi")
                          ])
                        ])
                      ]))
                    : _createCommentVNode("v-if", true),
                  _createElementVNode("div", _hoisted_36, [
                    _createElementVNode("h1", _hoisted_37, "Ciao " + _toDisplayString(_ctx.profile ? _ctx.profile.firstName : '') + ",", 1 /* TEXT */),
                    _cache[404] || (_cache[404] = _createElementVNode("p", { class: "text-sm text-gray-500 font-medium" }, "Ogni giorno è un passo avanti verso la vetta.", -1 /* CACHED */))
                  ]),
                  (_ctx.installBanner)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_38, [
                        _cache[406] || (_cache[406] = _createStaticVNode("<div class=\"absolute -right-8 -top-8 w-28 h-28 bg-salvia/25 rounded-full blur-2xl pointer-events-none\"></div><img src=\"assets/icon-192.png\" alt=\"\" class=\"w-11 h-11 rounded-xl shrink-0 relative z-10\"><div class=\"min-w-0 flex-1 relative z-10\"><div class=\"text-sm font-extrabold\">Installa STILL sul telefono</div><div class=\"text-[11px] font-medium text-white/65 leading-snug\">Si apre come un&#39;app, a tutto schermo e anche senza internet.</div></div>", 3)),
                        _createElementVNode("button", {
                          onClick: _cache[23] || (_cache[23] = (...args) => (_ctx.installApp && _ctx.installApp(...args))),
                          class: "relative z-10 shrink-0 cangiante-btn text-white text-xs font-extrabold px-3.5 py-2 rounded-xl active:scale-95 transition-transform"
                        }, "Installa"),
                        _createElementVNode("button", {
                          onClick: _cache[24] || (_cache[24] = (...args) => (_ctx.dismissInstall && _ctx.dismissInstall(...args))),
                          class: "relative z-10 shrink-0 p-1 text-white/40 hover:text-white",
                          "aria-label": "Chiudi"
                        }, [...(_cache[405] || (_cache[405] = [
                          _createElementVNode("svg", {
                            class: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            "stroke-width": "2.5"
                          }, [
                            _createElementVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M6 18L18 6M6 6l12 12"
                            })
                          ], -1 /* CACHED */)
                        ]))])
                      ]))
                    : _createCommentVNode("v-if", true),
                  (_ctx.wrappedBanner)
                    ? (_openBlock(), _createElementBlock("button", {
                        key: 3,
                        onClick: _cache[25] || (_cache[25] = $event => (_ctx.openWrapped(_ctx.wrappedBanner.offset))),
                        class: "w-full rounded-2xl p-4 shadow-lg flex items-center gap-3 text-left active:scale-[0.98] transition-transform relative overflow-hidden",
                        style: {"background":"linear-gradient(120deg, #7A4DF1, #EC4899, #F5A623)"}
                      }, [
                        _cache[407] || (_cache[407] = _createElementVNode("div", { class: "w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-2xl shrink-0" }, "🎁", -1 /* CACHED */)),
                        _createElementVNode("div", _hoisted_39, [
                          _createElementVNode("div", _hoisted_40, "Il tuo " + _toDisplayString(_ctx.wrappedBanner.year) + " su STILL è pronto", 1 /* TEXT */),
                          _createElementVNode("div", _hoisted_41, _toDisplayString(_ctx.wrappedBanner.active) + " " + _toDisplayString((_ctx.wrappedBanner.active) === 1 ? 'giorno' : 'giorni') + " attivi, numeri pazzi e che atleta sei. Guardalo!", 1 /* TEXT */)
                        ]),
                        _cache[408] || (_cache[408] = _createElementVNode("svg", {
                          class: "w-5 h-5 text-white shrink-0",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2.5"
                        }, [
                          _createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M9 5l7 7-7 7"
                          })
                        ], -1 /* CACHED */))
                      ]))
                    : _createCommentVNode("v-if", true),
                  (_ctx.recapBanner)
                    ? (_openBlock(), _createElementBlock("button", {
                        key: 4,
                        onClick: _cache[26] || (_cache[26] = $event => (_ctx.openRecap(1))),
                        class: "w-full cangiante-btn rounded-2xl p-4 shadow-lg flex items-center gap-3 text-left active:scale-[0.98] transition-transform"
                      }, [
                        _cache[409] || (_cache[409] = _createElementVNode("div", { class: "w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-2xl shrink-0" }, "🎬", -1 /* CACHED */)),
                        _createElementVNode("div", _hoisted_42, [
                          _createElementVNode("div", _hoisted_43, "Il tuo " + _toDisplayString(_ctx.recapBanner.month.toLowerCase()) + " è pronto", 1 /* TEXT */),
                          _createElementVNode("div", _hoisted_44, _toDisplayString(_ctx.recapBanner.active) + " " + _toDisplayString((_ctx.recapBanner.active) === 1 ? 'giorno' : 'giorni') + " attivi. Guardalo e condividilo nelle storie.", 1 /* TEXT */)
                        ]),
                        _cache[410] || (_cache[410] = _createElementVNode("svg", {
                          class: "w-5 h-5 text-white shrink-0",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2.5"
                        }, [
                          _createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M9 5l7 7-7 7"
                          })
                        ], -1 /* CACHED */))
                      ]))
                    : (_ctx.weekBanner)
                      ? (_openBlock(), _createElementBlock("button", {
                          key: 5,
                          onClick: _cache[27] || (_cache[27] = $event => (_ctx.openRecap(_ctx.weekBanner.offset, 'week'))),
                          class: "w-full cangiante-btn rounded-2xl p-4 shadow-lg flex items-center gap-3 text-left active:scale-[0.98] transition-transform"
                        }, [
                          _cache[411] || (_cache[411] = _createElementVNode("div", { class: "w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-2xl shrink-0" }, "🎬", -1 /* CACHED */)),
                          _createElementVNode("div", _hoisted_45, [
                            _createElementVNode("div", _hoisted_46, _toDisplayString(_ctx.weekBanner.offset ? 'La tua settimana è pronta' : 'La tua settimana fin qui'), 1 /* TEXT */),
                            _createElementVNode("div", _hoisted_47, _toDisplayString(_ctx.weekBanner.active) + " " + _toDisplayString(_ctx.weekBanner.active === 1 ? 'giorno attivo' : 'giorni attivi') + " (" + _toDisplayString(_ctx.weekBanner.label) + "). Condividila nelle storie.", 1 /* TEXT */)
                          ]),
                          _cache[412] || (_cache[412] = _createElementVNode("svg", {
                            class: "w-5 h-5 text-white shrink-0",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            "stroke-width": "2.5"
                          }, [
                            _createElementVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M9 5l7 7-7 7"
                            })
                          ], -1 /* CACHED */))
                        ]))
                      : _createCommentVNode("v-if", true),
                  _createElementVNode("div", _hoisted_48, [
                    _createElementVNode("div", _hoisted_49, [
                      _createElementVNode("button", {
                        onClick: _cache[28] || (_cache[28] = (...args) => (_ctx.openPetModal && _ctx.openPetModal(...args))),
                        class: "flex items-center gap-3 min-w-0 text-left active:scale-[0.98] transition-transform"
                      }, [
                        _createElementVNode("div", {
                          class: "pet-stage w-16 h-16 rounded-2xl shrink-0 relative",
                          style: _normalizeStyle({ background: _ctx.petState.color + '22' })
                        }, [
                          _createElementVNode("div", {
                            class: _normalizeClass(["pet-bob w-full h-full", _ctx.petState.mood === 'sleepy' ? 'pet-sleep' : '']),
                            innerHTML: _ctx.petMainSvg
                          }, null, 10 /* CLASS, PROPS */, _hoisted_50)
                        ], 4 /* STYLE */),
                        _createElementVNode("div", _hoisted_51, [
                          _createElementVNode("div", _hoisted_52, [
                            _createTextVNode(_toDisplayString(_ctx.streakInfo.current) + " ", 1 /* TEXT */),
                            _createElementVNode("span", _hoisted_53, _toDisplayString(_ctx.streakInfo.current === 1 ? 'giorno' : 'giorni') + " di fila", 1 /* TEXT */)
                          ]),
                          _createElementVNode("div", {
                            class: "text-[11px] font-extrabold mt-1 leading-snug",
                            style: _normalizeStyle({ color: _ctx.petState.color })
                          }, [
                            _createTextVNode(_toDisplayString(_ctx.petState.name), 1 /* TEXT */),
                            (_ctx.petState.nextIn)
                              ? (_openBlock(), _createElementBlock("span", _hoisted_54, " · si evolve tra " + _toDisplayString(_ctx.petState.nextIn) + " " + _toDisplayString(_ctx.petState.nextIn === 1 ? 'giorno' : 'giorni'), 1 /* TEXT */))
                              : _createCommentVNode("v-if", true)
                          ], 4 /* STYLE */),
                          _createElementVNode("div", _hoisted_55, _toDisplayString(_ctx.streakInfo.message), 1 /* TEXT */)
                        ])
                      ]),
                      _createElementVNode("button", {
                        onClick: _cache[29] || (_cache[29] = $event => (_ctx.openRecap(0, 'week'))),
                        class: "shrink-0 flex flex-col items-center gap-0.5 cangiante-btn text-white px-3.5 py-2.5 rounded-2xl shadow-md active:scale-95 transition-transform"
                      }, [...(_cache[413] || (_cache[413] = [
                        _createElementVNode("span", { class: "text-lg leading-none" }, "🎬", -1 /* CACHED */),
                        _createElementVNode("span", { class: "text-[11px] font-extrabold" }, "Riepilogo", -1 /* CACHED */)
                      ]))])
                    ]),
                    _createElementVNode("div", _hoisted_56, [
                      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.streakInfo.week, (d) => {
                        return (_openBlock(), _createElementBlock("div", {
                          key: 'sk' + d.key,
                          class: "flex flex-col items-center gap-1"
                        }, [
                          _createElementVNode("div", {
                            class: _normalizeClass(["w-full h-2 rounded-full", d.active ? 'cangiante-btn' : (d.protected ? 'bg-sky-400' : (d.today ? 'bg-arancione/25' : 'bg-gray-100'))])
                          }, null, 2 /* CLASS */),
                          _createElementVNode("span", {
                            class: _normalizeClass(["text-[9px] font-bold", d.today ? 'text-antracite' : 'text-gray-400'])
                          }, _toDisplayString(d.protected ? '🛡️' : d.label), 3 /* TEXT, CLASS */)
                        ]))
                      }), 128 /* KEYED_FRAGMENT */))
                    ]),
                    _createElementVNode("div", _hoisted_57, [
                      _createElementVNode("span", {
                        class: _normalizeClass(["text-[10px] font-bold", _ctx.streakInfo.shieldReady ? 'text-sky-600' : 'text-gray-400'])
                      }, " 🛡️ " + _toDisplayString(_ctx.streakInfo.shieldReady ? 'Proteggi serie pronto: se salti un giorno la serie è salva' : 'Proteggi serie in ricarica: ' + _ctx.streakInfo.shieldIn + (_ctx.streakInfo.shieldIn === 1 ? ' giorno attivo' : ' giorni attivi')), 3 /* TEXT, CLASS */),
                      (_ctx.streakInfo.best > 1)
                        ? (_openBlock(), _createElementBlock("span", _hoisted_58, "Record: " + _toDisplayString(_ctx.streakInfo.best), 1 /* TEXT */))
                        : _createCommentVNode("v-if", true)
                    ]),
                    (_ctx.lightToday)
                      ? (_openBlock(), _createElementBlock("button", {
                          key: 0,
                          onClick: _cache[30] || (_cache[30] = (...args) => (_ctx.openLightDay && _ctx.openLightDay(...args))),
                          class: "mt-3 w-full rounded-2xl px-3 py-2.5 bg-salvia/10 border border-salvia/20 flex items-center gap-2.5 text-left active:scale-[0.99] transition-all"
                        }, [
                          _createElementVNode("span", _hoisted_59, _toDisplayString(_ctx.lightActivity(_ctx.lightToday.type).icon), 1 /* TEXT */),
                          _createElementVNode("span", _hoisted_60, "Giornata leggera: " + _toDisplayString(_ctx.lightToday.min) + " min di " + _toDisplayString(_ctx.lightActivity(_ctx.lightToday.type).label.toLowerCase()) + " ✓", 1 /* TEXT */),
                          _cache[414] || (_cache[414] = _createElementVNode("span", { class: "text-[10px] font-bold text-salvia shrink-0" }, "Modifica", -1 /* CACHED */))
                        ]))
                      : (!_ctx.streakInfo.todayDone)
                        ? (_openBlock(), _createElementBlock("button", {
                            key: 1,
                            onClick: _cache[31] || (_cache[31] = (...args) => (_ctx.openLightDay && _ctx.openLightDay(...args))),
                            class: "mt-3 w-full rounded-2xl px-3 py-2.5 bg-gray-50 border border-dashed border-gray-200 flex items-center gap-2.5 text-left active:scale-[0.99] transition-all"
                          }, [...(_cache[415] || (_cache[415] = [
                            _createStaticVNode("<span class=\"text-lg leading-none\">🌱</span><span class=\"flex-1 min-w-0\"><span class=\"block text-[11px] font-extrabold text-antracite\">Giornata no? Bastano 10 minuti</span><span class=\"block text-[10px] font-medium text-gray-500 leading-snug\">Una camminata o un po&#39; di stretching e la serie continua.</span></span><svg class=\"w-4 h-4 text-gray-300 shrink-0\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" stroke-width=\"2.5\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 5l7 7-7 7\"></path></svg>", 3)
                          ]))]))
                        : _createCommentVNode("v-if", true),
                    (_ctx.streakInfo.recoverable)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_61, [
                          _cache[417] || (_cache[417] = _createElementVNode("div", { class: "text-2xl shrink-0" }, "🆘", -1 /* CACHED */)),
                          _createElementVNode("div", _hoisted_62, [
                            _createElementVNode("div", _hoisted_63, "Hai perso una serie di " + _toDisplayString(_ctx.streakInfo.recoverable.length) + " " + _toDisplayString((_ctx.streakInfo.recoverable.length) === 1 ? 'giorno' : 'giorni'), 1 /* TEXT */),
                            _cache[416] || (_cache[416] = _createElementVNode("div", { class: "text-[11px] font-medium text-gray-500 leading-snug mt-0.5" }, "Condividi una storia con i tuoi risultati su STILL e la serie torna com'era.", -1 /* CACHED */))
                          ]),
                          _createElementVNode("button", {
                            onClick: _cache[32] || (_cache[32] = (...args) => (_ctx.shareStreakSave && _ctx.shareStreakSave(...args))),
                            class: "shrink-0 cangiante-btn text-white text-[11px] font-extrabold px-3 py-2 rounded-xl shadow-md active:scale-95 transition-transform"
                          }, "Salva la serie")
                        ]))
                      : _createCommentVNode("v-if", true)
                  ]),
                  _createElementVNode("button", {
                    onClick: _cache[33] || (_cache[33] = (...args) => (_ctx.openTrophies && _ctx.openTrophies(...args))),
                    class: "w-full bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 flex items-center gap-3 text-left active:scale-[0.99] transition-transform"
                  }, [
                    _createElementVNode("div", _hoisted_64, [
                      _cache[418] || (_cache[418] = _createElementVNode("span", { class: "text-[8px] font-bold opacity-80" }, "LV", -1 /* CACHED */)),
                      _createElementVNode("span", _hoisted_65, _toDisplayString(_ctx.playerLevel.level), 1 /* TEXT */)
                    ]),
                    _createElementVNode("div", _hoisted_66, [
                      _createElementVNode("div", _hoisted_67, [
                        _createElementVNode("span", _hoisted_68, "⭐ " + _toDisplayString(_ctx.playerLevel.title), 1 /* TEXT */),
                        _createElementVNode("span", _hoisted_69, "🏆 " + _toDisplayString(_ctx.playerLevel.trophies) + "/" + _toDisplayString(_ctx.playerLevel.trophyTotal) + " trofei", 1 /* TEXT */)
                      ]),
                      _createElementVNode("div", _hoisted_70, [
                        _createElementVNode("div", {
                          class: "h-full cangiante-btn rounded-full transition-all",
                          style: _normalizeStyle({ width: Math.round(_ctx.playerLevel.progress * 100) + '%' })
                        }, null, 4 /* STYLE */)
                      ]),
                      _createElementVNode("div", _hoisted_71, _toDisplayString(_ctx.playerLevel.need - _ctx.playerLevel.into) + " XP al livello " + _toDisplayString(_ctx.playerLevel.level + 1), 1 /* TEXT */)
                    ]),
                    _cache[419] || (_cache[419] = _createElementVNode("svg", {
                      class: "w-4 h-4 text-gray-300 shrink-0",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      "stroke-width": "2.5"
                    }, [
                      _createElementVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M9 5l7 7-7 7"
                      })
                    ], -1 /* CACHED */))
                  ]),
                  (_ctx.noteForToday)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_72, [
                        _cache[421] || (_cache[421] = _createElementVNode("div", { class: "text-sky-600 text-xl pt-0.5" }, "💡", -1 /* CACHED */)),
                        _createElementVNode("div", null, [
                          _cache[420] || (_cache[420] = _createElementVNode("div", { class: "text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-1" }, "La tua nota di oggi", -1 /* CACHED */)),
                          _createElementVNode("p", _hoisted_73, _toDisplayString(_ctx.noteForToday), 1 /* TEXT */)
                        ])
                      ]))
                    : _createCommentVNode("v-if", true),
                  (_ctx.activePlan)
                    ? (_openBlock(), _createElementBlock("div", {
                        key: 7,
                        onClick: _cache[34] || (_cache[34] = (...args) => (_ctx.openGroceryModal && _ctx.openGroceryModal(...args))),
                        class: _normalizeClass(["rounded-3xl p-4 flex gap-4 items-center shadow-sm cursor-pointer transition-all mt-4 animate-fadeIn border", _ctx.allGroceryChecked ? 'bg-salvia/10 border-salvia/30 hover:bg-salvia/15' : 'bg-viola/10 border-viola/30 hover:bg-viola/15'])
                      }, [
                        _createElementVNode("div", {
                          class: _normalizeClass(["w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0", _ctx.allGroceryChecked ? 'bg-salvia/20' : 'bg-viola/20'])
                        }, "🛒", 2 /* CLASS */),
                        _createElementVNode("div", _hoisted_74, [
                          _createElementVNode("h4", {
                            class: _normalizeClass(["text-sm font-extrabold leading-tight", _ctx.allGroceryChecked ? 'text-salvia' : 'text-viola'])
                          }, _toDisplayString(_ctx.allGroceryChecked ? 'Il tuo frigo è pronto!' : 'Il tuo frigo è pronto per domani?'), 3 /* TEXT, CLASS */),
                          _createElementVNode("p", _hoisted_75, _toDisplayString(_ctx.allGroceryChecked ? 'Tocca qui se hai dimenticato qualcosa o per correggere la checklist.' : 'Tocca qui per la checklist e condividi quello che ti manca.'), 1 /* TEXT */)
                        ]),
                        _createElementVNode("div", {
                          class: _normalizeClass(_ctx.allGroceryChecked ? 'text-salvia' : 'text-viola')
                        }, [...(_cache[422] || (_cache[422] = [
                          _createElementVNode("svg", {
                            class: "w-5 h-5",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            _createElementVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M9 5l7 7-7 7"
                            })
                          ], -1 /* CACHED */)
                        ]))], 2 /* CLASS */)
                      ], 2 /* CLASS */))
                    : _createCommentVNode("v-if", true),
                  _createElementVNode("div", _hoisted_76, [
                    _createElementVNode("div", _hoisted_77, [
                      _createElementVNode("h3", _hoisted_78, _toDisplayString(_ctx.todayActiveMeals.length ? 'Il tuo menù di oggi' : 'Cosa hai mangiato oggi'), 1 /* TEXT */),
                      (!_ctx.todayActiveMeals.length)
                        ? (_openBlock(), _createElementBlock("button", {
                            key: 0,
                            onClick: _cache[35] || (_cache[35] = $event => (_ctx.openDiary())),
                            class: "text-xs font-bold text-salvia"
                          }, "Diario ›"))
                        : (_openBlock(), _createElementBlock("button", {
                            key: 1,
                            onClick: _cache[36] || (_cache[36] = $event => (_ctx.openDiaryEditor(_ctx.todayDateKey, 'extra'))),
                            class: "text-xs font-bold text-salvia"
                          }, "+ Fuori pasto"))
                    ]),
                    (_ctx.todayProtein && _ctx.todayActiveMeals.length)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_79, [
                          _createElementVNode("div", _hoisted_80, [
                            _cache[423] || (_cache[423] = _createElementVNode("span", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, "🥩 Proteine di oggi", -1 /* CACHED */)),
                            _createElementVNode("span", _hoisted_81, [
                              _createTextVNode(_toDisplayString(_ctx.todayProtein.eaten) + " ", 1 /* TEXT */),
                              _createElementVNode("span", _hoisted_82, "/ " + _toDisplayString(_ctx.proteinGoal) + " g", 1 /* TEXT */)
                            ])
                          ]),
                          _createElementVNode("div", _hoisted_83, [
                            _createElementVNode("div", {
                              class: "h-full rounded-full bg-salvia transition-all duration-500",
                              style: _normalizeStyle({ width: Math.min(100, Math.round(_ctx.todayProtein.eaten / Math.max(1, _ctx.proteinGoal) * 100)) + '%' })
                            }, null, 4 /* STYLE */)
                          ]),
                          _createElementVNode("p", _hoisted_84, [
                            (_ctx.bodyStats.protein)
                              ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                  _createTextVNode("Obiettivo " + _toDisplayString(_ctx.bodyStats.protein.min) + "–" + _toDisplayString(_ctx.bodyStats.protein.max) + " g · il menù di oggi ne ha ", 1 /* TEXT */),
                                  _createElementVNode("b", {
                                    class: _normalizeClass(_ctx.todayProtein.planned < _ctx.bodyStats.protein.min ? 'text-arancione' : 'text-salvia')
                                  }, "≈ " + _toDisplayString(_ctx.todayProtein.planned) + " g", 3 /* TEXT, CLASS */),
                                  _cache[424] || (_cache[424] = _createTextVNode(".", -1 /* CACHED */))
                                ], 64 /* STABLE_FRAGMENT */))
                              : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                                  _createTextVNode("Il menù di oggi ne ha ≈ " + _toDisplayString(_ctx.todayProtein.planned) + " g. Aggiungi il peso in Progressi per il tuo obiettivo.", 1 /* TEXT */)
                                ], 64 /* STABLE_FRAGMENT */)),
                            _cache[425] || (_cache[425] = _createTextVNode(" Segna i pasti fatti per riempire la barra. ", -1 /* CACHED */))
                          ])
                        ]))
                      : _createCommentVNode("v-if", true),
                    (_ctx.todayActiveMeals.length === 0)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_85, [
                          _createElementVNode("div", _hoisted_86, [
                            _createElementVNode("div", _hoisted_87, [
                              _createElementVNode("span", {
                                class: _normalizeClass(["text-2xl font-extrabold", _ctx.todayIntake.kcal ? _ctx.intakeTextClass(_ctx.todayIntake.kcal, _ctx.todayIntake.target) : 'text-antracite'])
                              }, _toDisplayString(_ctx.formatNumber(_ctx.todayIntake.kcal)), 3 /* TEXT, CLASS */),
                              _createElementVNode("span", _hoisted_88, "/ " + _toDisplayString(_ctx.formatNumber(_ctx.todayIntake.target)) + " kcal", 1 /* TEXT */)
                            ]),
                            _createElementVNode("span", _hoisted_89, "🥩 " + _toDisplayString(_ctx.todayIntake.protein) + " g", 1 /* TEXT */)
                          ]),
                          _createElementVNode("div", _hoisted_90, [
                            _createElementVNode("div", {
                              class: _normalizeClass(["h-full rounded-full transition-all duration-500", _ctx.intakeBarClass(_ctx.todayIntake.kcal, _ctx.todayIntake.target)]),
                              style: _normalizeStyle({ width: Math.min(100, Math.round(_ctx.todayIntake.kcal / Math.max(1, _ctx.todayIntake.target) * 100)) + '%' })
                            }, null, 6 /* CLASS, STYLE */)
                          ]),
                          _createElementVNode("div", _hoisted_91, [
                            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.DIARY_MEALS, (m) => {
                              return (_openBlock(), _createElementBlock("button", {
                                key: 'hd' + m.id,
                                onClick: $event => (_ctx.openDiaryEditor(_ctx.todayDateKey, m.id)),
                                class: _normalizeClass(["rounded-2xl py-2.5 px-1 flex flex-col items-center gap-0.5 border transition-all active:scale-95", _ctx.todayIntake.diary[m.id] ? 'bg-salvia/10 border-salvia/20' : 'bg-gray-50 border-gray-100'])
                              }, [
                                _createElementVNode("span", _hoisted_93, _toDisplayString(m.icon), 1 /* TEXT */),
                                _createElementVNode("span", _hoisted_94, _toDisplayString(m.label), 1 /* TEXT */),
                                _createElementVNode("span", {
                                  class: _normalizeClass(["text-[10px] font-extrabold", _ctx.todayIntake.diary[m.id] ? 'text-salvia' : 'text-gray-300'])
                                }, _toDisplayString(_ctx.todayIntake.diary[m.id] ? (_ctx.todayIntake.diary[m.id].kcal ?? '?') + ' kcal' : '+'), 3 /* TEXT, CLASS */)
                              ], 10 /* CLASS, PROPS */, _hoisted_92))
                            }), 128 /* KEYED_FRAGMENT */))
                          ]),
                          (!_ctx.todayIntake.entries && _ctx.diaryCopySource(_ctx.todayDateKey))
                            ? (_openBlock(), _createElementBlock("button", {
                                key: 0,
                                onClick: _cache[37] || (_cache[37] = $event => (_ctx.copyDiaryFromPrev(_ctx.todayDateKey))),
                                class: "w-full bg-salvia/10 border border-salvia/20 text-salvia rounded-xl py-2.5 text-[11px] font-bold active:scale-[0.99] transition-all"
                              }, [
                                _cache[426] || (_cache[426] = _createTextVNode(" ↺ Mangi come ieri? Copia i pasti di ieri", -1 /* CACHED */)),
                                (_ctx.diaryCopySource(_ctx.todayDateKey).kcal)
                                  ? (_openBlock(), _createElementBlock("span", _hoisted_95, " (≈ " + _toDisplayString(_ctx.formatNumber(_ctx.diaryCopySource(_ctx.todayDateKey).kcal)) + " kcal)", 1 /* TEXT */))
                                  : _createCommentVNode("v-if", true)
                              ]))
                            : _createCommentVNode("v-if", true),
                          _cache[427] || (_cache[427] = _createElementVNode("p", { class: "text-[10px] font-medium text-gray-400 leading-snug text-center" }, "Non segui una dieta? Segna cosa mangi: ti dico se sei nelle tue calorie.", -1 /* CACHED */))
                        ]))
                      : (_openBlock(), _createElementBlock("div", _hoisted_96, [
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.todayActiveMeals, (meal) => {
                            return (_openBlock(), _createElementBlock("div", {
                              key: meal.id,
                              id: 'meal-' + meal.id,
                              class: _normalizeClass(["snap-center shrink-0 w-[85%] bg-white rounded-3xl border shadow-soft relative overflow-hidden flex items-stretch transition-all", _ctx.currentMealId === meal.id.split('_')[0] ? 'border-salvia ring-4 ring-salvia/10' : 'border-gray-100'])
                            }, [
                              (_ctx.currentMealId === meal.id.split('_')[0])
                                ? (_openBlock(), _createElementBlock("div", _hoisted_98, " Ora "))
                                : _createCommentVNode("v-if", true),
                              _createElementVNode("div", _hoisted_99, [
                                _createElementVNode("div", {
                                  class: _normalizeClass(_ctx.currentMealId === meal.id.split('_')[0] ? 'pt-4' : '')
                                }, [
                                  _createElementVNode("div", _hoisted_100, [
                                    _createElementVNode("div", _hoisted_101, _toDisplayString(meal.icon), 1 /* TEXT */),
                                    _createElementVNode("div", null, [
                                      _createElementVNode("h4", _hoisted_102, _toDisplayString(meal.name), 1 /* TEXT */),
                                      _createElementVNode("span", _hoisted_103, _toDisplayString(meal.calories !== null ? (meal.caloriesEstimated ? '≈ ' : '') + meal.calories + ' kcal' : 'Calorie n.d.') + _toDisplayString(_ctx.mealProteinLabel(meal)), 1 /* TEXT */)
                                    ])
                                  ]),
                                  _createElementVNode("p", _hoisted_104, _toDisplayString(meal.description), 1 /* TEXT */),
                                  (_ctx.todayMealLogs[meal.id]?.status === 'other')
                                    ? (_openBlock(), _createElementBlock("p", _hoisted_105, [
                                        _createTextVNode("🍕 Hai mangiato: " + _toDisplayString(_ctx.todayMealLogs[meal.id].text || 'altro'), 1 /* TEXT */),
                                        (_ctx.todayMealLogs[meal.id].kcal !== null)
                                          ? (_openBlock(), _createElementBlock("span", _hoisted_106, " · ≈ " + _toDisplayString(_ctx.todayMealLogs[meal.id].kcal) + " kcal", 1 /* TEXT */))
                                          : _createCommentVNode("v-if", true)
                                      ]))
                                    : _createCommentVNode("v-if", true)
                                ], 2 /* CLASS */)
                              ]),
                              _createElementVNode("div", _hoisted_107, [
                                _createElementVNode("button", {
                                  onClick: $event => (_ctx.setMealDone(_ctx.todayDateKey, meal)),
                                  "aria-label": "Pasto eseguito",
                                  class: _normalizeClass(["w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90", _ctx.todayMealLogs[meal.id]?.status === 'done' ? 'bg-salvia text-white shadow-sm' : 'bg-salvia/10 text-salvia/60 hover:bg-salvia/20 hover:text-salvia'])
                                }, [...(_cache[428] || (_cache[428] = [
                                  _createElementVNode("svg", {
                                    class: "w-5 h-5",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    "stroke-width": "3"
                                  }, [
                                    _createElementVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      d: "M5 13l4 4L19 7"
                                    })
                                  ], -1 /* CACHED */)
                                ]))], 10 /* CLASS, PROPS */, _hoisted_108),
                                _createElementVNode("button", {
                                  onClick: $event => (_ctx.promptSkipMeal(_ctx.todayDateKey, meal)),
                                  "aria-label": "Pasto saltato",
                                  class: _normalizeClass(["w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90", _ctx.todayMealLogs[meal.id]?.status === 'skipped' ? 'bg-red-500 text-white shadow-sm' : _ctx.todayMealLogs[meal.id]?.status === 'other' ? 'bg-viola text-white shadow-sm' : 'bg-red-50 text-red-300 hover:bg-red-100 hover:text-red-400'])
                                }, [...(_cache[429] || (_cache[429] = [
                                  _createElementVNode("svg", {
                                    class: "w-5 h-5",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    "stroke-width": "3"
                                  }, [
                                    _createElementVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      d: "M6 18L18 6M6 6l12 12"
                                    })
                                  ], -1 /* CACHED */)
                                ]))], 10 /* CLASS, PROPS */, _hoisted_109)
                              ])
                            ], 10 /* CLASS, PROPS */, _hoisted_97))
                          }), 128 /* KEYED_FRAGMENT */))
                        ], 512 /* NEED_PATCH */))
                  ]),
                  (_ctx.habitOn('water') || _ctx.habitOn('fasting'))
                    ? (_openBlock(), _createElementBlock("div", _hoisted_110, [
                        (_ctx.habitOn('water'))
                          ? (_openBlock(), _createElementBlock("div", _hoisted_111, [
                              _createElementVNode("div", _hoisted_112, [
                                _cache[430] || (_cache[430] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "💧 Acqua di oggi", -1 /* CACHED */)),
                                _createElementVNode("span", {
                                  class: _normalizeClass(["text-sm font-extrabold", _ctx.waterToday >= _ctx.waterGoal ? 'text-sky-600' : 'text-antracite'])
                                }, [
                                  _createTextVNode(_toDisplayString(_ctx.formatNumber(_ctx.waterToday * 0.25)) + " ", 1 /* TEXT */),
                                  _createElementVNode("span", _hoisted_113, "/ " + _toDisplayString(_ctx.formatNumber(_ctx.waterGoal * 0.25)) + " L", 1 /* TEXT */)
                                ], 2 /* CLASS */)
                              ]),
                              _createElementVNode("div", _hoisted_114, [
                                (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(Math.max(_ctx.waterGoal, _ctx.waterToday), (i) => {
                                  return (_openBlock(), _createElementBlock("button", {
                                    key: 'wg' + i,
                                    onClick: $event => (_ctx.tapWaterGlass(i - 1)),
                                    "aria-label": 'Bicchiere ' + i,
                                    class: _normalizeClass(["w-7 h-9 rounded-b-lg rounded-t-sm border-2 flex items-end overflow-hidden transition-all active:scale-90", i <= _ctx.waterToday ? 'border-sky-500' : 'border-gray-200'])
                                  }, [
                                    _createElementVNode("span", {
                                      class: _normalizeClass(["w-full transition-all duration-300", i <= _ctx.waterToday ? 'h-full bg-sky-400' : 'h-0'])
                                    }, null, 2 /* CLASS */)
                                  ], 10 /* CLASS, PROPS */, _hoisted_115))
                                }), 128 /* KEYED_FRAGMENT */)),
                                _createElementVNode("button", {
                                  onClick: _cache[38] || (_cache[38] = $event => (_ctx.setWater(_ctx.waterToday + 1))),
                                  class: "w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 font-bold text-lg active:scale-90 transition-all",
                                  "aria-label": "Aggiungi un bicchiere"
                                }, "+")
                              ]),
                              _createElementVNode("p", _hoisted_116, _toDisplayString(_ctx.waterToday >= _ctx.waterGoal ? 'Obiettivo raggiunto! 💙' : 'Un bicchiere = 250 ml. Tocca per segnarlo.'), 1 /* TEXT */)
                            ]))
                          : _createCommentVNode("v-if", true),
                        (_ctx.habitOn('fasting'))
                          ? (_openBlock(), _createElementBlock("div", _hoisted_117, [
                              _createElementVNode("div", _hoisted_118, [
                                _cache[431] || (_cache[431] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "⏱️ Digiuno intermittente", -1 /* CACHED */)),
                                (_ctx.fasting.running)
                                  ? (_openBlock(), _createElementBlock("span", {
                                      key: 0,
                                      class: _normalizeClass(["text-[10px] font-bold px-2 py-1 rounded-md", _ctx.fasting.done ? 'bg-salvia/10 text-salvia' : 'bg-viola/10 text-viola'])
                                    }, _toDisplayString(_ctx.fasting.done ? 'Obiettivo raggiunto' : 'In corso'), 3 /* TEXT, CLASS */))
                                  : (_ctx.fasting.last)
                                    ? (_openBlock(), _createElementBlock("span", _hoisted_119, "Ultimo: " + _toDisplayString(_ctx.formatNumber(_ctx.fasting.last.hours)) + " h" + _toDisplayString(_ctx.fasting.last.hours >= _ctx.fasting.last.goal ? ' ✓' : ''), 1 /* TEXT */))
                                    : _createCommentVNode("v-if", true)
                              ]),
                              (_ctx.fasting.running)
                                ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                    _createElementVNode("div", _hoisted_120, [
                                      _createElementVNode("span", _hoisted_121, _toDisplayString(_ctx.hoursLabel(_ctx.fasting.elapsed)), 1 /* TEXT */),
                                      _createElementVNode("span", _hoisted_122, "su " + _toDisplayString(_ctx.fasting.goal) + " h · fine alle " + _toDisplayString(_ctx.clockLabel(_ctx.fasting.endsAt)), 1 /* TEXT */)
                                    ]),
                                    _createElementVNode("div", _hoisted_123, [
                                      _createElementVNode("div", {
                                        class: _normalizeClass(["h-full rounded-full transition-all duration-500", _ctx.fasting.done ? 'bg-salvia' : 'bg-viola']),
                                        style: _normalizeStyle({ width: _ctx.fasting.pct + '%' })
                                      }, null, 6 /* CLASS, STYLE */)
                                    ]),
                                    _createElementVNode("button", {
                                      onClick: _cache[39] || (_cache[39] = (...args) => (_ctx.endFast && _ctx.endFast(...args))),
                                      class: _normalizeClass(["w-full py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all", _ctx.fasting.done ? 'bg-salvia text-white' : 'bg-gray-100 text-gray-600'])
                                    }, _toDisplayString(_ctx.fasting.done ? 'Ho mangiato: chiudi il digiuno' : 'Interrompi il digiuno'), 3 /* TEXT, CLASS */)
                                  ], 64 /* STABLE_FRAGMENT */))
                                : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                                    _createElementVNode("div", _hoisted_124, [
                                      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.FAST_GOALS, (g) => {
                                        return (_openBlock(), _createElementBlock("button", {
                                          key: 'fg' + g,
                                          onClick: $event => (_ctx.setFastGoal(g)),
                                          class: _normalizeClass(["py-2 rounded-xl text-xs font-bold border transition-all", _ctx.fasting.goal === g ? 'bg-viola text-white border-viola' : 'bg-gray-50 text-gray-500 border-gray-100'])
                                        }, _toDisplayString(g) + ":" + _toDisplayString(24 - g), 11 /* TEXT, CLASS, PROPS */, _hoisted_125))
                                      }), 128 /* KEYED_FRAGMENT */))
                                    ]),
                                    _createElementVNode("button", {
                                      onClick: _cache[40] || (_cache[40] = $event => (_ctx.startFast(_ctx.fasting.goal))),
                                      class: "w-full bg-viola text-white py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all"
                                    }, "Inizia ora · " + _toDisplayString(_ctx.fasting.goal) + " ore senza mangiare", 1 /* TEXT */)
                                  ], 64 /* STABLE_FRAGMENT */))
                            ]))
                          : _createCommentVNode("v-if", true)
                      ]))
                    : _createCommentVNode("v-if", true),
                  _createElementVNode("div", _hoisted_126, [
                    _createElementVNode("div", {
                      onClick: _cache[41] || (_cache[41] = $event => (_ctx.activeTab = 'progress')),
                      class: "bg-white p-4 rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:border-viola/50 transition-colors"
                    }, [
                      _cache[435] || (_cache[435] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 leading-tight" }, "Variazione Peso", -1 /* CACHED */)),
                      (_ctx.weightDelta)
                        ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                            _createElementVNode("div", _hoisted_127, [
                              _createElementVNode("span", {
                                class: _normalizeClass(["text-2xl font-extrabold", _ctx.weightDelta.value <= 0 ? 'text-salvia' : 'text-arancione'])
                              }, _toDisplayString(_ctx.formatNumber(_ctx.weightDelta.value)), 3 /* TEXT, CLASS */),
                              _cache[432] || (_cache[432] = _createElementVNode("span", { class: "text-sm font-semibold text-gray-500" }, "kg", -1 /* CACHED */))
                            ]),
                            _createElementVNode("p", _hoisted_128, _toDisplayString(_ctx.weightDelta.days) + " " + _toDisplayString(_ctx.weightDelta.days === 1 ? 'giorno' : 'giorni'), 1 /* TEXT */)
                          ], 64 /* STABLE_FRAGMENT */))
                        : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                            _cache[433] || (_cache[433] = _createElementVNode("div", { class: "text-sm font-bold text-gray-400 mt-2" }, "Dati insufficienti", -1 /* CACHED */)),
                            _cache[434] || (_cache[434] = _createElementVNode("p", { class: "text-[10px] font-bold text-gray-400 mt-1" }, "Servono 2 misurazioni", -1 /* CACHED */))
                          ], 64 /* STABLE_FRAGMENT */))
                    ]),
                    _createElementVNode("div", {
                      onClick: _cache[42] || (_cache[42] = $event => (_ctx.goToTodayNutrition())),
                      class: "bg-white p-4 rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:border-salvia/50 transition-colors flex flex-col justify-between"
                    }, [
                      _createElementVNode("div", null, [
                        _cache[436] || (_cache[436] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 leading-tight" }, "Calorie Oggi", -1 /* CACHED */)),
                        _createElementVNode("div", _hoisted_129, [
                          _createElementVNode("span", _hoisted_130, _toDisplayString(_ctx.todayConsumedCalories), 1 /* TEXT */),
                          _createElementVNode("span", _hoisted_131, "/ " + _toDisplayString(_ctx.todayTargetCalories), 1 /* TEXT */)
                        ])
                      ]),
                      _createElementVNode("div", _hoisted_132, [
                        _createElementVNode("div", {
                          class: _normalizeClass(["h-full rounded-full transition-all", _ctx.intakeBarClass(_ctx.todayConsumedCalories, _ctx.todayTargetCalories)]),
                          style: _normalizeStyle({ width: _ctx.todayCaloriesPct + '%' })
                        }, null, 6 /* CLASS, STYLE */)
                      ])
                    ])
                  ]),
                  _createElementVNode("div", _hoisted_133, [
                    _createElementVNode("div", _hoisted_134, [
                      _cache[437] || (_cache[437] = _createElementVNode("h3", { class: "text-lg font-bold text-antracite" }, "Allenamento di oggi", -1 /* CACHED */)),
                      (_ctx.todayWorkout.state === 'done')
                        ? (_openBlock(), _createElementBlock("span", _hoisted_135, "Fatto ✓"))
                        : (_ctx.todayWorkout.state === 'planned')
                          ? (_openBlock(), _createElementBlock("span", _hoisted_136, "In programma"))
                          : _createCommentVNode("v-if", true)
                    ]),
                    (_ctx.todayWorkout.state === 'done')
                      ? (_openBlock(), _createElementBlock("div", _hoisted_137, [
                          _createElementVNode("div", _hoisted_138, [
                            _cache[439] || (_cache[439] = _createElementVNode("div", { class: "w-12 h-12 rounded-2xl bg-salvia/10 flex items-center justify-center text-salvia border border-salvia/20 shrink-0" }, [
                              _createElementVNode("svg", {
                                class: "w-6 h-6",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                "stroke-width": "2.5"
                              }, [
                                _createElementVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M5 13l4 4L19 7"
                                })
                              ])
                            ], -1 /* CACHED */)),
                            _createElementVNode("div", _hoisted_139, [
                              _cache[438] || (_cache[438] = _createElementVNode("h4", { class: "font-extrabold text-antracite" }, "Ottimo lavoro oggi! 💪", -1 /* CACHED */)),
                              _createElementVNode("p", _hoisted_140, _toDisplayString(_ctx.todayWorkout.totalLabel ? _ctx.todayWorkout.totalLabel + ' di allenamento' : 'Allenamento registrato'), 1 /* TEXT */)
                            ])
                          ]),
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.todayWorkout.done, (item) => {
                            return (_openBlock(), _createElementBlock("div", {
                              key: 'tw-done-' + item.id,
                              class: "flex items-center justify-between gap-3 rounded-2xl bg-gray-50 border border-gray-100 px-3 py-2.5"
                            }, [
                              _createElementVNode("div", _hoisted_141, [
                                _createElementVNode("p", _hoisted_142, [
                                  _createTextVNode(_toDisplayString(item.title), 1 /* TEXT */),
                                  (item.dayName)
                                    ? (_openBlock(), _createElementBlock("span", _hoisted_143, " · " + _toDisplayString(item.dayName), 1 /* TEXT */))
                                    : _createCommentVNode("v-if", true)
                                ]),
                                _createElementVNode("p", _hoisted_144, _toDisplayString(item.detail), 1 /* TEXT */)
                              ]),
                              (item.duration)
                                ? (_openBlock(), _createElementBlock("span", _hoisted_145, _toDisplayString(item.duration), 1 /* TEXT */))
                                : _createCommentVNode("v-if", true)
                            ]))
                          }), 128 /* KEYED_FRAGMENT */)),
                          (_ctx.activeSheet && _ctx.activeSheetNext.upcoming && !_ctx.todayWorkout.planned.length)
                            ? (_openBlock(), _createElementBlock("p", _hoisted_146, [
                                _cache[440] || (_cache[440] = _createTextVNode(" Prossima volta con ", -1 /* CACHED */)),
                                _createElementVNode("span", _hoisted_147, _toDisplayString(_ctx.activeSheet.name), 1 /* TEXT */),
                                _cache[441] || (_cache[441] = _createTextVNode(": ", -1 /* CACHED */)),
                                _createElementVNode("span", _hoisted_148, _toDisplayString(_ctx.activeSheetNext.upcoming.name), 1 /* TEXT */)
                              ]))
                            : _createCommentVNode("v-if", true),
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.todayWorkout.planned, (item) => {
                            return (_openBlock(), _createElementBlock("button", {
                              key: 'tw-next-' + item.session.id,
                              onClick: $event => (_ctx.openTodayPlanned(item)),
                              class: "w-full text-left text-xs font-semibold text-gray-500 hover:text-arancione transition-colors"
                            }, [
                              _cache[442] || (_cache[442] = _createTextVNode(" Ancora in programma: ", -1 /* CACHED */)),
                              _createElementVNode("span", _hoisted_150, _toDisplayString(item.title), 1 /* TEXT */),
                              (item.time)
                                ? (_openBlock(), _createElementBlock("span", _hoisted_151, " alle " + _toDisplayString(item.time), 1 /* TEXT */))
                                : _createCommentVNode("v-if", true)
                            ], 8 /* PROPS */, _hoisted_149))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]))
                      : (_ctx.todayWorkout.state === 'planned')
                        ? (_openBlock(), _createElementBlock("div", _hoisted_152, [
                            _cache[443] || (_cache[443] = _createStaticVNode("<div class=\"flex items-center gap-4\"><div class=\"w-12 h-12 rounded-2xl bg-arancione/10 flex items-center justify-center text-arancione border border-arancione/20 shrink-0\"><svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 00-4-5.66V5a2 2 0 10-4 0v.34A6 6 0 006 11v3.2c0 .53-.21 1.04-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9\"></path></svg></div><div class=\"min-w-0\"><h4 class=\"font-extrabold text-antracite\">Oggi hai allenamento</h4><p class=\"text-xs text-gray-500 font-medium mt-0.5\">Non mancare, ogni sessione conta.</p></div></div>", 1)),
                            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.todayWorkout.planned, (item) => {
                              return (_openBlock(), _createElementBlock("button", {
                                key: 'tw-plan-' + item.session.id,
                                onClick: $event => (_ctx.openTodayPlanned(item)),
                                class: "w-full flex items-center justify-between gap-3 rounded-2xl bg-arancione/5 border border-arancione/15 px-3 py-2.5 text-left hover:border-arancione/40 transition-colors"
                              }, [
                                _createElementVNode("div", _hoisted_154, [
                                  _createElementVNode("p", _hoisted_155, [
                                    _createTextVNode(_toDisplayString(item.title), 1 /* TEXT */),
                                    (item.dayName)
                                      ? (_openBlock(), _createElementBlock("span", _hoisted_156, " · " + _toDisplayString(item.dayName), 1 /* TEXT */))
                                      : _createCommentVNode("v-if", true)
                                  ]),
                                  _createElementVNode("p", _hoisted_157, _toDisplayString(item.time ? 'Alle ' + item.time : 'Oggi'), 1 /* TEXT */)
                                ]),
                                _createElementVNode("span", _hoisted_158, _toDisplayString(item.kind === 'gym' ? (item.ended ? 'Ti sei allenato?' : 'Inizia') : (item.started ? 'Ti sei allenato?' : 'Dettagli')), 1 /* TEXT */)
                              ], 8 /* PROPS */, _hoisted_153))
                            }), 128 /* KEYED_FRAGMENT */))
                          ]))
                        : (_ctx.activeSheet && _ctx.activeSheetNext.day)
                          ? (_openBlock(), _createElementBlock("div", _hoisted_159, [
                              _createElementVNode("div", _hoisted_160, [
                                _cache[445] || (_cache[445] = _createElementVNode("div", { class: "w-12 h-12 rounded-2xl bg-arancione/10 flex items-center justify-center text-arancione border border-arancione/20 shrink-0" }, [
                                  _createElementVNode("svg", {
                                    class: "w-6 h-6",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    "stroke-width": "2"
                                  }, [
                                    _createElementVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      d: "M7 6v12M17 6v12M3 9v6h4V9H3zm14 0v6h4V9h-4zM7 12h10"
                                    })
                                  ])
                                ], -1 /* CACHED */)),
                                _createElementVNode("div", _hoisted_161, [
                                  _cache[444] || (_cache[444] = _createElementVNode("div", { class: "text-[10px] font-black uppercase tracking-widest text-arancione" }, "Scheda attiva", -1 /* CACHED */)),
                                  _createElementVNode("h4", _hoisted_162, _toDisplayString(_ctx.activeSheet.name), 1 /* TEXT */),
                                  _createElementVNode("p", _hoisted_163, _toDisplayString(_ctx.activeSheetNext.lastDate ? 'Ultima volta ' + _ctx.formatDate(_ctx.activeSheetNext.lastDate) : 'Non l\'hai ancora iniziata'), 1 /* TEXT */)
                                ])
                              ]),
                              _createElementVNode("button", {
                                onClick: _cache[43] || (_cache[43] = (...args) => (_ctx.startActiveSheet && _ctx.startActiveSheet(...args))),
                                class: "w-full flex items-center justify-between gap-3 rounded-2xl bg-arancione/5 border border-arancione/15 px-3 py-2.5 text-left hover:border-arancione/40 transition-colors"
                              }, [
                                _createElementVNode("div", _hoisted_164, [
                                  _cache[446] || (_cache[446] = _createElementVNode("p", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, "Oggi tocca a", -1 /* CACHED */)),
                                  _createElementVNode("p", _hoisted_165, [
                                    _createTextVNode(_toDisplayString(_ctx.activeSheetNext.day.name) + " ", 1 /* TEXT */),
                                    _createElementVNode("span", _hoisted_166, "· " + _toDisplayString(_ctx.activeSheetNext.day.exercises.length) + " " + _toDisplayString(_ctx.activeSheetNext.day.exercises.length === 1 ? 'esercizio' : 'esercizi'), 1 /* TEXT */)
                                  ])
                                ]),
                                _cache[447] || (_cache[447] = _createElementVNode("span", { class: "text-xs font-bold text-white bg-arancione px-2.5 py-1.5 rounded-lg shrink-0 flex items-center gap-1" }, [
                                  _createElementVNode("svg", {
                                    class: "w-3.5 h-3.5",
                                    fill: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    _createElementVNode("path", { d: "M8 5v14l11-7z" })
                                  ]),
                                  _createTextVNode("Inizia")
                                ], -1 /* CACHED */))
                              ])
                            ]))
                          : (_openBlock(), _createElementBlock("div", _hoisted_167, [
                              _cache[450] || (_cache[450] = _createStaticVNode("<div class=\"flex items-center gap-3\"><div class=\"w-10 h-10 rounded-2xl bg-salvia/10 border border-salvia/20 flex items-center justify-center text-lg shrink-0\">🌿</div><div class=\"min-w-0\"><h4 class=\"font-extrabold text-antracite text-sm\">Giornata libera</h4><p class=\"text-[11px] text-gray-500 font-medium leading-snug\">Anche il riposo fa parte del percorso.</p></div></div>", 1)),
                              _createElementVNode("button", {
                                onClick: _cache[44] || (_cache[44] = (...args) => (_ctx.openSuggestion && _ctx.openSuggestion(...args))),
                                class: "w-full flex items-center justify-between gap-2 rounded-xl bg-gray-50 border border-gray-100 px-3 py-2 text-left hover:border-arancione/30 transition-colors"
                              }, [
                                _createElementVNode("span", _hoisted_168, [
                                  _cache[448] || (_cache[448] = _createTextVNode("Se ti va: ", -1 /* CACHED */)),
                                  _createElementVNode("b", _hoisted_169, _toDisplayString(_ctx.todaySuggestion.title), 1 /* TEXT */),
                                  _createTextVNode(" · " + _toDisplayString(_ctx.todaySuggestion.minutes) + " min", 1 /* TEXT */)
                                ]),
                                _cache[449] || (_cache[449] = _createElementVNode("svg", {
                                  class: "w-4 h-4 text-gray-400 shrink-0",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24",
                                  "stroke-width": "2.5"
                                }, [
                                  _createElementVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M9 5l7 7-7 7"
                                  })
                                ], -1 /* CACHED */))
                              ])
                            ]))
                  ]),
                  _createElementVNode("div", _hoisted_170, [
                    _createElementVNode("div", _hoisted_171, [
                      _cache[453] || (_cache[453] = _createElementVNode("h3", { class: "text-lg font-bold text-antracite" }, "Calendario pasti", -1 /* CACHED */)),
                      _createElementVNode("div", _hoisted_172, [
                        _createElementVNode("button", {
                          onClick: _cache[45] || (_cache[45] = (...args) => (_ctx.dashPrevMonth && _ctx.dashPrevMonth(...args))),
                          class: "p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                        }, [...(_cache[451] || (_cache[451] = [
                          _createElementVNode("svg", {
                            class: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            "stroke-width": "2.5"
                          }, [
                            _createElementVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M15 19l-7-7 7-7"
                            })
                          ], -1 /* CACHED */)
                        ]))]),
                        _createElementVNode("span", _hoisted_173, _toDisplayString(_ctx.dashMonthName) + " " + _toDisplayString(_ctx.dashYear), 1 /* TEXT */),
                        _createElementVNode("button", {
                          onClick: _cache[46] || (_cache[46] = (...args) => (_ctx.dashNextMonth && _ctx.dashNextMonth(...args))),
                          class: "p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                        }, [...(_cache[452] || (_cache[452] = [
                          _createElementVNode("svg", {
                            class: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            "stroke-width": "2.5"
                          }, [
                            _createElementVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M9 5l7 7-7 7"
                            })
                          ], -1 /* CACHED */)
                        ]))])
                      ])
                    ]),
                    _createElementVNode("div", _hoisted_174, [
                      _createElementVNode("div", _hoisted_175, [
                        (_openBlock(), _createElementBlock(_Fragment, null, _renderList(['L','M','M','G','V','S','D'], (label, idx) => {
                          return _createElementVNode("div", {
                            key: 'dow-' + idx,
                            class: "text-center text-[10px] font-bold text-gray-400 uppercase"
                          }, _toDisplayString(label), 1 /* TEXT */)
                        }), 64 /* STABLE_FRAGMENT */))
                      ]),
                      _createElementVNode("div", _hoisted_176, [
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.dashFirstDayOfMonth, (n) => {
                          return (_openBlock(), _createElementBlock("div", {
                            key: 'empty-' + n
                          }))
                        }), 128 /* KEYED_FRAGMENT */)),
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.dashDaysInMonth, (day) => {
                          return (_openBlock(), _createElementBlock("button", {
                            key: day,
                            onClick: $event => (_ctx.openDayMenu(day)),
                            class: _normalizeClass(["aspect-square rounded-xl text-xs font-bold transition-all flex items-center justify-center relative", _ctx.dashboardDayClasses(day)])
                          }, [
                            _createTextVNode(_toDisplayString(day) + " ", 1 /* TEXT */),
                            (_ctx.dashHasComment(day))
                              ? (_openBlock(), _createElementBlock("div", _hoisted_178))
                              : _createCommentVNode("v-if", true)
                          ], 10 /* CLASS, PROPS */, _hoisted_177))
                        }), 128 /* KEYED_FRAGMENT */))
                      ]),
                      _cache[454] || (_cache[454] = _createStaticVNode("<div class=\"flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 pt-4 border-t border-gray-100\"><div class=\"flex items-center gap-1.5\"><span class=\"w-2.5 h-2.5 rounded-full bg-salvia\"></span><span class=\"text-[10px] font-bold text-gray-500\">Perfetta</span></div><div class=\"flex items-center gap-1.5\"><span class=\"w-2.5 h-2.5 rounded-full bg-red-500\"></span><span class=\"text-[10px] font-bold text-gray-500\">Sgarro</span></div><div class=\"flex items-center gap-1.5\"><span class=\"w-2.5 h-2.5 rounded-full bg-viola\"></span><span class=\"text-[10px] font-bold text-gray-500\">Piccolo sgarro</span></div><div class=\"flex items-center gap-1.5\"><span class=\"w-2.5 h-2.5 rounded-full bg-amber-300\"></span><span class=\"text-[10px] font-bold text-gray-500\">Poco</span></div><div class=\"flex items-center gap-1.5\"><span class=\"w-1.5 h-1.5 rounded-full bg-sky-500\"></span><span class=\"text-[10px] font-bold text-gray-500\">Nota</span></div><div class=\"flex items-center gap-1.5\"><span class=\"w-2.5 h-2.5 rounded-full border-2 border-arancione\"></span><span class=\"text-[10px] font-bold text-gray-500\">Allenamento</span></div></div>", 1))
                    ])
                  ])
                ]))
              : _createCommentVNode("v-if", true),
            (_ctx.activeTab === 'allenamento')
              ? (_openBlock(), _createElementBlock("div", _hoisted_179, [
                  (_ctx.workoutView === 'list' || _ctx.workoutView === 'calendar')
                    ? (_openBlock(), _createElementBlock("div", _hoisted_180, [
                        _createElementVNode("button", {
                          onClick: _cache[47] || (_cache[47] = $event => (_ctx.workoutView = 'list')),
                          class: _normalizeClass(["flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5", _ctx.workoutView === 'list' ? 'bg-arancione text-white shadow-sm' : 'text-gray-500 hover:text-antracite'])
                        }, [...(_cache[455] || (_cache[455] = [
                          _createElementVNode("svg", {
                            class: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            "stroke-width": "2"
                          }, [
                            _createElementVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M7 6v12M17 6v12M3 9v6h4V9H3zm14 0v6h4V9h-4zM7 12h10"
                            })
                          ], -1 /* CACHED */),
                          _createTextVNode(" Schede ", -1 /* CACHED */)
                        ]))], 2 /* CLASS */),
                        _createElementVNode("button", {
                          onClick: _cache[48] || (_cache[48] = $event => (_ctx.workoutView = 'calendar')),
                          class: _normalizeClass(["flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5", _ctx.workoutView === 'calendar' ? 'bg-arancione text-white shadow-sm' : 'text-gray-500 hover:text-antracite'])
                        }, [...(_cache[456] || (_cache[456] = [
                          _createElementVNode("svg", {
                            class: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            "stroke-width": "2"
                          }, [
                            _createElementVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
                            })
                          ], -1 /* CACHED */),
                          _createTextVNode(" Calendario ", -1 /* CACHED */)
                        ]))], 2 /* CLASS */)
                      ]))
                    : _createCommentVNode("v-if", true),
                  (_ctx.workoutView === 'list')
                    ? (_openBlock(), _createElementBlock("div", _hoisted_181, [
                        _createElementVNode("div", _hoisted_182, [
                          _cache[458] || (_cache[458] = _createElementVNode("div", null, [
                            _createElementVNode("div", { class: "text-[10px] font-bold text-arancione tracking-widest uppercase" }, "DISCIPLINA"),
                            _createElementVNode("h2", { class: "text-2xl font-bold text-antracite" }, "Le tue Schede")
                          ], -1 /* CACHED */)),
                          _createElementVNode("button", {
                            onClick: _cache[49] || (_cache[49] = (...args) => (_ctx.startNewSheet && _ctx.startNewSheet(...args))),
                            class: "bg-arancione text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-md hover:bg-arancione/90 transition-all active:scale-95 flex items-center gap-1.5 flex-shrink-0"
                          }, [...(_cache[457] || (_cache[457] = [
                            _createElementVNode("svg", {
                              class: "w-4 h-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              "stroke-width": "2.5"
                            }, [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M12 4v16m8-8H4"
                              })
                            ], -1 /* CACHED */),
                            _createTextVNode(" Nuova ", -1 /* CACHED */)
                          ]))])
                        ]),
                        (!_ctx.todayBusy)
                          ? (_openBlock(), _createElementBlock("div", _hoisted_183, [
                              _createElementVNode("button", {
                                onClick: _cache[50] || (_cache[50] = $event => (_ctx.suggestOpen = !_ctx.suggestOpen)),
                                class: "w-full flex items-center justify-between gap-3 px-4 py-3 text-left",
                                "aria-expanded": _ctx.suggestOpen
                              }, [
                                _createElementVNode("div", _hoisted_185, [
                                  _cache[459] || (_cache[459] = _createElementVNode("div", { class: "text-[10px] font-bold uppercase tracking-widest text-gray-400" }, "💡 Idea se oggi ti alleni", -1 /* CACHED */)),
                                  _createElementVNode("p", _hoisted_186, [
                                    _createTextVNode(_toDisplayString(_ctx.todaySuggestion.title) + " ", 1 /* TEXT */),
                                    _createElementVNode("span", _hoisted_187, "· " + _toDisplayString(_ctx.todaySuggestion.minutes) + " min", 1 /* TEXT */)
                                  ])
                                ]),
                                (_openBlock(), _createElementBlock("svg", {
                                  class: _normalizeClass(["w-4 h-4 text-gray-400 shrink-0 transition-transform", _ctx.suggestOpen ? 'rotate-90' : '']),
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24",
                                  "stroke-width": "2.5"
                                }, [...(_cache[460] || (_cache[460] = [
                                  _createElementVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M9 5l7 7-7 7"
                                  }, null, -1 /* CACHED */)
                                ]))], 2 /* CLASS */))
                              ], 8 /* PROPS */, _hoisted_184),
                              (_ctx.suggestOpen)
                                ? (_openBlock(), _createElementBlock("div", _hoisted_188, [
                                    _createElementVNode("div", _hoisted_189, [
                                      _cache[461] || (_cache[461] = _createElementVNode("span", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "Dove ti alleni", -1 /* CACHED */)),
                                      _createElementVNode("div", _hoisted_190, [
                                        (_openBlock(), _createElementBlock(_Fragment, null, _renderList([{ id: 'gym', l: 'Palestra' }, { id: 'home', l: 'Casa' }], (p) => {
                                          return _createElementVNode("button", {
                                            key: 'tp' + p.id,
                                            onClick: $event => (_ctx.setTrainPlace(p.id)),
                                            class: _normalizeClass(["px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all", _ctx.trainPlace === p.id ? 'bg-white text-antracite shadow-sm border border-gray-200' : 'text-gray-400 border border-transparent'])
                                          }, _toDisplayString(p.l), 11 /* TEXT, CLASS, PROPS */, _hoisted_191)
                                        }), 64 /* STABLE_FRAGMENT */))
                                      ])
                                    ]),
                                    _createElementVNode("p", _hoisted_192, [
                                      (_ctx.todaySuggestion.recovery)
                                        ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                            _cache[462] || (_cache[462] = _createTextVNode("I muscoli sono ancora stanchi", -1 /* CACHED */)),
                                            (_ctx.todaySuggestion.tired.length)
                                              ? (_openBlock(), _createElementBlock("span", _hoisted_193, " (" + _toDisplayString(_ctx.todaySuggestion.tired.join(', ').toLowerCase()) + ")", 1 /* TEXT */))
                                              : _createCommentVNode("v-if", true),
                                            _cache[463] || (_cache[463] = _createTextVNode(": oggi muoviti leggero, così recuperi meglio.", -1 /* CACHED */))
                                          ], 64 /* STABLE_FRAGMENT */))
                                        : (_ctx.todaySuggestion.beginner)
                                          ? (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                                              _createTextVNode("Tutto il corpo in un solo allenamento: perfetto per iniziare. Quando ti alleni più spesso alterno i muscoli in base al recupero.")
                                            ], 64 /* STABLE_FRAGMENT */))
                                          : (_openBlock(), _createElementBlock(_Fragment, { key: 2 }, [
                                              _createTextVNode("Scelto sui muscoli più riposati: " + _toDisplayString(_ctx.todaySuggestion.groups.map(g => g.name.toLowerCase() + ' ' + g.fresh + '%').join(', ')) + ".", 1 /* TEXT */)
                                            ], 64 /* STABLE_FRAGMENT */)),
                                      (_ctx.todaySuggestion.spared.length)
                                        ? (_openBlock(), _createElementBlock(_Fragment, { key: 3 }, [
                                            _createTextVNode(" Domani hai " + _toDisplayString(_ctx.todaySuggestion.spareFor.toLowerCase()) + ": lascio riposare " + _toDisplayString(_ctx.todaySuggestion.spared.join(' e ').toLowerCase()) + ".", 1 /* TEXT */)
                                          ], 64 /* STABLE_FRAGMENT */))
                                        : _createCommentVNode("v-if", true)
                                    ]),
                                    _createElementVNode("div", _hoisted_194, [
                                      _createElementVNode("div", {
                                        class: "rounded-2xl bg-gray-50 border border-gray-100 p-1.5",
                                        innerHTML: _ctx.muscleRecoverySvg
                                      }, null, 8 /* PROPS */, _hoisted_195),
                                      _createElementVNode("ol", _hoisted_196, [
                                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.todaySuggestion.items, (it, i) => {
                                          return (_openBlock(), _createElementBlock("li", {
                                            key: 'ts' + it.id,
                                            class: "text-xs font-bold text-antracite truncate"
                                          }, [
                                            _createElementVNode("span", _hoisted_197, _toDisplayString(i + 1) + ".", 1 /* TEXT */),
                                            _createTextVNode(" " + _toDisplayString(it.n), 1 /* TEXT */)
                                          ]))
                                        }), 128 /* KEYED_FRAGMENT */))
                                      ])
                                    ]),
                                    _cache[465] || (_cache[465] = _createStaticVNode("<div class=\"flex items-center gap-3 text-[10px] font-bold text-gray-400\"><span class=\"flex items-center gap-1\"><span class=\"w-2.5 h-2.5 rounded-full bg-[#20C997]\"></span>Pronto</span><span class=\"flex items-center gap-1\"><span class=\"w-2.5 h-2.5 rounded-full bg-[#F5C042]\"></span>In recupero</span><span class=\"flex items-center gap-1\"><span class=\"w-2.5 h-2.5 rounded-full bg-[#EF6B5B]\"></span>Stanco</span></div>", 1)),
                                    _createElementVNode("div", _hoisted_198, [
                                      _createElementVNode("button", {
                                        onClick: _cache[51] || (_cache[51] = (...args) => (_ctx.startTodaySuggestion && _ctx.startTodaySuggestion(...args))),
                                        class: "flex-1 bg-arancione text-white font-bold py-3 rounded-2xl text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
                                      }, [
                                        _cache[464] || (_cache[464] = _createElementVNode("svg", {
                                          class: "w-4 h-4",
                                          fill: "currentColor",
                                          viewBox: "0 0 24 24"
                                        }, [
                                          _createElementVNode("path", { d: "M8 5v14l11-7z" })
                                        ], -1 /* CACHED */)),
                                        _createTextVNode("Inizia · circa " + _toDisplayString(_ctx.todaySuggestion.minutes) + " min ", 1 /* TEXT */)
                                      ]),
                                      _createElementVNode("button", {
                                        onClick: _cache[52] || (_cache[52] = (...args) => (_ctx.shuffleTodayPlan && _ctx.shuffleTodayPlan(...args))),
                                        class: "px-4 rounded-2xl bg-gray-100 text-gray-600 font-bold text-xs active:scale-95 transition-all"
                                      }, "🔀 Cambia")
                                    ])
                                  ]))
                                : _createCommentVNode("v-if", true)
                            ]))
                          : _createCommentVNode("v-if", true),
                        _createElementVNode("div", _hoisted_199, [
                          _createElementVNode("div", _hoisted_200, [
                            _createElementVNode("div", _hoisted_201, [
                              _cache[466] || (_cache[466] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "💪 I tuoi muscoli in 7 giorni", -1 /* CACHED */)),
                              _createElementVNode("div", _hoisted_202, _toDisplayString(_ctx.weekMuscles.empty ? 'Ancora nessun allenamento' : _ctx.weekMuscles.sets + ' serie · ' + _ctx.weekMuscles.days + (_ctx.weekMuscles.days === 1 ? ' giorno' : ' giorni')), 1 /* TEXT */)
                            ]),
                            (!_ctx.weekMuscles.empty)
                              ? (_openBlock(), _createElementBlock("button", {
                                  key: 0,
                                  onClick: _cache[53] || (_cache[53] = (...args) => (_ctx.openMuscleShare && _ctx.openMuscleShare(...args))),
                                  class: "shrink-0 cangiante-btn text-white text-[11px] font-extrabold px-3 py-2 rounded-xl shadow-sm active:scale-95 transition-all"
                                }, "📸 Condividi"))
                              : _createCommentVNode("v-if", true)
                          ]),
                          _createElementVNode("div", _hoisted_203, [
                            _createElementVNode("div", {
                              class: "rounded-2xl bg-gray-50 border border-gray-100 p-1.5",
                              innerHTML: _ctx.weekMusclesSvg
                            }, null, 8 /* PROPS */, _hoisted_204),
                            (!_ctx.weekMuscles.empty)
                              ? (_openBlock(), _createElementBlock("div", _hoisted_205, [
                                  (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.weekMuscles.top.slice(0, 4), (t) => {
                                    return (_openBlock(), _createElementBlock("div", {
                                      key: 'wm' + t.id
                                    }, [
                                      _createElementVNode("div", _hoisted_206, [
                                        _createElementVNode("span", _hoisted_207, _toDisplayString(t.name), 1 /* TEXT */),
                                        _createElementVNode("span", _hoisted_208, _toDisplayString(t.sets) + " serie", 1 /* TEXT */)
                                      ]),
                                      _createElementVNode("div", _hoisted_209, [
                                        _createElementVNode("div", {
                                          class: "h-full rounded-full bg-arancione",
                                          style: _normalizeStyle({ width: Math.max(6, Math.round(t.k * 100)) + '%' })
                                        }, null, 4 /* STYLE */)
                                      ])
                                    ]))
                                  }), 128 /* KEYED_FRAGMENT */))
                                ]))
                              : (_openBlock(), _createElementBlock("p", _hoisted_210, "Segna i carichi o fai un allenamento guidato: qui si colorano i muscoli che hai lavorato, da condividere nelle storie."))
                          ])
                        ]),
                        _createElementVNode("button", {
                          onClick: _cache[54] || (_cache[54] = $event => (_ctx.openGuide(_ctx.userSports.length ? 'sport' : 'muscle'))),
                          class: "w-full text-left bg-antracite rounded-3xl p-5 shadow-lg relative overflow-hidden active:scale-[0.98] transition-all"
                        }, [
                          _cache[467] || (_cache[467] = _createElementVNode("div", { class: "absolute -right-6 -bottom-8 text-[90px] opacity-10 select-none" }, "🏋️", -1 /* CACHED */)),
                          _cache[468] || (_cache[468] = _createElementVNode("div", { class: "relative z-10 text-[10px] font-black uppercase tracking-[0.2em] text-arancione" }, "Non sai cosa fare?", -1 /* CACHED */)),
                          _cache[469] || (_cache[469] = _createElementVNode("div", { class: "relative z-10 text-lg font-extrabold text-white mt-1 leading-tight" }, "Allenamenti consigliati", -1 /* CACHED */)),
                          _createElementVNode("p", _hoisted_211, [
                            (_ctx.userSports.length)
                              ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                  _createTextVNode("Esercizi scelti per chi gioca a " + _toDisplayString(_ctx.userSports[0].toLowerCase()) + ", schede pronte e oltre 180 esercizi con le foto di come si fanno.", 1 /* TEXT */)
                                ], 64 /* STABLE_FRAGMENT */))
                              : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                                  _createTextVNode("Schede pronte, stretching e oltre 180 esercizi con le foto di come si fanno e i muscoli che lavorano.")
                                ], 64 /* STABLE_FRAGMENT */))
                          ])
                        ]),
                        _createElementVNode("button", {
                          onClick: _cache[55] || (_cache[55] = (...args) => (_ctx.openWorkoutImport && _ctx.openWorkoutImport(...args))),
                          class: "w-full text-left bg-white rounded-3xl p-4 border border-gray-100 shadow-soft flex items-center gap-3 active:scale-[0.98] transition-all"
                        }, [...(_cache[470] || (_cache[470] = [
                          _createStaticVNode("<span class=\"w-11 h-11 shrink-0 rounded-2xl bg-arancione/10 text-arancione flex items-center justify-center text-xl\">📄</span><span class=\"flex-1 min-w-0\"><span class=\"block text-sm font-extrabold text-antracite\">Hai già una scheda?</span><span class=\"block text-[11px] font-medium text-gray-500 leading-snug\">Importala da PDF, Word o testo, oppure incollala dalle Note.</span></span><svg class=\"w-4 h-4 text-gray-300 shrink-0\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" stroke-width=\"2.5\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 5l7 7-7 7\"></path></svg>", 3)
                        ]))]),
                        (_ctx.workoutSheets.length === 0)
                          ? (_openBlock(), _createElementBlock("div", _hoisted_212, [
                              _cache[472] || (_cache[472] = _createStaticVNode("<div class=\"w-16 h-16 bg-arancione/10 rounded-full flex items-center justify-center text-arancione border border-arancione/20\"><svg class=\"w-8 h-8\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M7 6v12M17 6v12M3 9v6h4V9H3zm14 0v6h4V9h-4zM7 12h10\"></path></svg></div><div><h3 class=\"font-bold text-antracite text-lg\">Ancora nessuna scheda</h3><p class=\"text-sm text-gray-500 mt-1.5 leading-relaxed\">Crea la tua prima scheda: puoi dividerla in più giorni, inserire superserie e registrare i carichi di ogni esercizio.</p></div>", 2)),
                              _createElementVNode("button", {
                                onClick: _cache[56] || (_cache[56] = (...args) => (_ctx.startNewSheet && _ctx.startNewSheet(...args))),
                                class: "w-full bg-arancione text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-arancione/90 transition-all active:scale-95 flex items-center justify-center gap-2"
                              }, [...(_cache[471] || (_cache[471] = [
                                _createElementVNode("svg", {
                                  class: "w-5 h-5",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24",
                                  "stroke-width": "2.5"
                                }, [
                                  _createElementVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M12 4v16m8-8H4"
                                  })
                                ], -1 /* CACHED */),
                                _createTextVNode(" Crea la prima scheda ", -1 /* CACHED */)
                              ]))])
                            ]))
                          : (_openBlock(), _createElementBlock("div", _hoisted_213, [
                              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.sortedWorkoutSheets, (sheet) => {
                                return (_openBlock(), _createElementBlock("div", {
                                  key: sheet.id,
                                  onClick: $event => (_ctx.openSheet(sheet)),
                                  class: _normalizeClass(["bg-white rounded-3xl p-5 border shadow-soft cursor-pointer hover:border-arancione/50 transition-all flex items-center justify-between gap-3 group", _ctx.isActiveSheet(sheet) ? 'border-arancione ring-2 ring-arancione/15' : 'border-gray-100'])
                                }, [
                                  _createElementVNode("div", _hoisted_215, [
                                    _cache[473] || (_cache[473] = _createElementVNode("div", { class: "w-12 h-12 rounded-2xl bg-arancione/10 text-arancione border border-arancione/20 flex items-center justify-center flex-shrink-0" }, [
                                      _createElementVNode("svg", {
                                        class: "w-6 h-6",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        "stroke-width": "2"
                                      }, [
                                        _createElementVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          d: "M7 6v12M17 6v12M3 9v6h4V9H3zm14 0v6h4V9h-4zM7 12h10"
                                        })
                                      ])
                                    ], -1 /* CACHED */)),
                                    _createElementVNode("div", _hoisted_216, [
                                      (_ctx.isActiveSheet(sheet))
                                        ? (_openBlock(), _createElementBlock("span", _hoisted_217, "Attiva · prossimo " + _toDisplayString(_ctx.activeSheetNext.day ? _ctx.activeSheetNext.day.name : ''), 1 /* TEXT */))
                                        : _createCommentVNode("v-if", true),
                                      (sheet.auto)
                                        ? (_openBlock(), _createElementBlock("span", _hoisted_218, "Preparata da STILL"))
                                        : _createCommentVNode("v-if", true),
                                      _createElementVNode("h4", _hoisted_219, _toDisplayString(sheet.name), 1 /* TEXT */),
                                      _createElementVNode("p", _hoisted_220, _toDisplayString(sheet.days.length) + " " + _toDisplayString(sheet.days.length === 1 ? 'giorno' : 'giorni') + " • " + _toDisplayString(_ctx.totalSheetExercises(sheet)) + " " + _toDisplayString(_ctx.totalSheetExercises(sheet) === 1 ? 'esercizio' : 'esercizi'), 1 /* TEXT */),
                                      _createElementVNode("p", _hoisted_221, _toDisplayString(_ctx.sheetLastSessionDate(sheet) ? 'Ultima sessione: ' + _ctx.formatDate(_ctx.sheetLastSessionDate(sheet)) : 'Mai allenata'), 1 /* TEXT */)
                                    ])
                                  ]),
                                  _cache[474] || (_cache[474] = _createElementVNode("div", { class: "text-gray-400 group-hover:text-arancione transition-colors flex-shrink-0" }, [
                                    _createElementVNode("svg", {
                                      class: "w-5 h-5",
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24"
                                    }, [
                                      _createElementVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M9 5l7 7-7 7"
                                      })
                                    ])
                                  ], -1 /* CACHED */))
                                ], 10 /* CLASS, PROPS */, _hoisted_214))
                              }), 128 /* KEYED_FRAGMENT */))
                            ]))
                      ]))
                    : _createCommentVNode("v-if", true),
                  (_ctx.workoutView === 'calendar')
                    ? (_openBlock(), _createElementBlock("div", _hoisted_222, [
                        _createElementVNode("div", _hoisted_223, [
                          _cache[476] || (_cache[476] = _createElementVNode("div", null, [
                            _createElementVNode("div", { class: "text-[10px] font-bold text-arancione tracking-widest uppercase" }, "AGENDA"),
                            _createElementVNode("h2", { class: "text-2xl font-bold text-antracite" }, "Calendario")
                          ], -1 /* CACHED */)),
                          _createElementVNode("button", {
                            onClick: _cache[57] || (_cache[57] = $event => (_ctx.openTrainingForm())),
                            class: "bg-arancione text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-md hover:bg-arancione/90 transition-all active:scale-95 flex items-center gap-1.5 flex-shrink-0"
                          }, [...(_cache[475] || (_cache[475] = [
                            _createElementVNode("svg", {
                              class: "w-4 h-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              "stroke-width": "2.5"
                            }, [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M12 4v16m8-8H4"
                              })
                            ], -1 /* CACHED */),
                            _createTextVNode(" Aggiungi ", -1 /* CACHED */)
                          ]))])
                        ]),
                        _createElementVNode("div", _hoisted_224, [
                          _createElementVNode("div", _hoisted_225, [
                            _createElementVNode("button", {
                              onClick: _cache[58] || (_cache[58] = (...args) => (_ctx.trainingPrevMonth && _ctx.trainingPrevMonth(...args))),
                              class: "p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                            }, [...(_cache[477] || (_cache[477] = [
                              _createElementVNode("svg", {
                                class: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                "stroke-width": "2.5"
                              }, [
                                _createElementVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M15 19l-7-7 7-7"
                                })
                              ], -1 /* CACHED */)
                            ]))]),
                            _createElementVNode("span", _hoisted_226, _toDisplayString(_ctx.trainingMonthName) + " " + _toDisplayString(_ctx.trainingYear), 1 /* TEXT */),
                            _createElementVNode("button", {
                              onClick: _cache[59] || (_cache[59] = (...args) => (_ctx.trainingNextMonth && _ctx.trainingNextMonth(...args))),
                              class: "p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                            }, [...(_cache[478] || (_cache[478] = [
                              _createElementVNode("svg", {
                                class: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                "stroke-width": "2.5"
                              }, [
                                _createElementVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M9 5l7 7-7 7"
                                })
                              ], -1 /* CACHED */)
                            ]))])
                          ]),
                          _createElementVNode("div", _hoisted_227, [
                            (_openBlock(), _createElementBlock(_Fragment, null, _renderList(['L','M','M','G','V','S','D'], (label, idx) => {
                              return _createElementVNode("div", {
                                key: 'tr-dow-' + idx,
                                class: "text-center text-[10px] font-bold text-gray-400 uppercase"
                              }, _toDisplayString(label), 1 /* TEXT */)
                            }), 64 /* STABLE_FRAGMENT */))
                          ]),
                          _createElementVNode("div", _hoisted_228, [
                            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.trainingFirstDayOfMonth, (n) => {
                              return (_openBlock(), _createElementBlock("div", {
                                key: 'tr-empty-' + n
                              }))
                            }), 128 /* KEYED_FRAGMENT */)),
                            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.trainingDaysInMonth, (day) => {
                              return (_openBlock(), _createElementBlock("button", {
                                key: 'tr-day-' + day,
                                onClick: $event => (_ctx.openTrainingDay(day)),
                                class: _normalizeClass(["aspect-square rounded-xl text-xs font-bold transition-all flex items-center justify-center relative", _ctx.trainingDayClasses(day)])
                              }, [
                                _createTextVNode(_toDisplayString(day) + " ", 1 /* TEXT */),
                                (_ctx.trainingSessionsForDay(day).length)
                                  ? (_openBlock(), _createElementBlock("div", _hoisted_230, [
                                      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.trainingSessionsForDay(day).slice(0, 3), (session, sIdx) => {
                                        return (_openBlock(), _createElementBlock("span", {
                                          key: 'tr-dot-' + sIdx,
                                          class: "w-1 h-1 rounded-full bg-white/90"
                                        }))
                                      }), 128 /* KEYED_FRAGMENT */))
                                    ]))
                                  : _createCommentVNode("v-if", true)
                              ], 10 /* CLASS, PROPS */, _hoisted_229))
                            }), 128 /* KEYED_FRAGMENT */))
                          ]),
                          _cache[479] || (_cache[479] = _createElementVNode("div", { class: "flex items-center gap-2 mt-4 pt-4 border-t border-gray-100" }, [
                            _createElementVNode("span", { class: "w-2.5 h-2.5 rounded-full bg-arancione" }),
                            _createElementVNode("span", { class: "text-[10px] font-bold text-gray-500" }, "Giorno di allenamento")
                          ], -1 /* CACHED */))
                        ]),
                        _createElementVNode("div", _hoisted_231, [
                          _cache[484] || (_cache[484] = _createElementVNode("h4", { class: "text-xs font-bold text-gray-500 uppercase tracking-widest px-1" }, "Prossimi allenamenti", -1 /* CACHED */)),
                          (_ctx.upcomingTrainingSessions.length === 0)
                            ? (_openBlock(), _createElementBlock("div", _hoisted_232, " Nessun allenamento in programma. Tocca un giorno del calendario per aggiungerne uno. "))
                            : _createCommentVNode("v-if", true),
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.upcomingTrainingSessions, (session) => {
                            return (_openBlock(), _createElementBlock("div", {
                              key: session.id + session.occurrenceDate,
                              class: "bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex items-center gap-2.5"
                            }, [
                              _createElementVNode("div", {
                                class: _normalizeClass(["w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border", session.kind === 'gym' ? 'bg-arancione/10 text-arancione border-arancione/20' : 'bg-sky-500/10 text-sky-600 border-sky-200'])
                              }, [
                                (session.kind === 'gym')
                                  ? (_openBlock(), _createElementBlock("svg", _hoisted_233, [...(_cache[480] || (_cache[480] = [
                                      _createElementVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        d: "M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12"
                                      }, null, -1 /* CACHED */)
                                    ]))]))
                                  : (_openBlock(), _createElementBlock("svg", _hoisted_234, [...(_cache[481] || (_cache[481] = [
                                      _createElementVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        d: "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"
                                      }, null, -1 /* CACHED */)
                                    ]))]))
                              ], 2 /* CLASS */),
                              _createElementVNode("div", {
                                class: "min-w-0 flex-1 cursor-pointer",
                                onClick: $event => (_ctx.openTrainingSessionItem(session, session.occurrenceDate))
                              }, [
                                _createElementVNode("div", _hoisted_236, _toDisplayString(_ctx.trainingSessionLabel(session)), 1 /* TEXT */),
                                _createElementVNode("div", _hoisted_237, [
                                  _createTextVNode(_toDisplayString(_ctx.formatDate(session.occurrenceDate)), 1 /* TEXT */),
                                  (session.time)
                                    ? (_openBlock(), _createElementBlock("span", _hoisted_238, " • " + _toDisplayString(_ctx.sessionTimeLabel(session)), 1 /* TEXT */))
                                    : _createCommentVNode("v-if", true),
                                  _createTextVNode(" • " + _toDisplayString(_ctx.trainingSessionSubtitle(session)), 1 /* TEXT */),
                                  (_ctx.sportStatus(session, session.occurrenceDate) === 'done')
                                    ? (_openBlock(), _createElementBlock("span", _hoisted_239, " • ✓ fatto"))
                                    : (_ctx.sportStatus(session, session.occurrenceDate) === 'skipped')
                                      ? (_openBlock(), _createElementBlock("span", _hoisted_240, " • ✗ non fatto"))
                                      : _createCommentVNode("v-if", true)
                                ]),
                                (session.note)
                                  ? (_openBlock(), _createElementBlock("div", _hoisted_241, "📝 " + _toDisplayString(session.note), 1 /* TEXT */))
                                  : _createCommentVNode("v-if", true)
                              ], 8 /* PROPS */, _hoisted_235),
                              _createElementVNode("button", {
                                onClick: $event => (_ctx.editTrainingSession(session, session.occurrenceDate)),
                                class: "p-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-400 hover:text-arancione hover:border-arancione/30 transition-colors flex-shrink-0",
                                "aria-label": "Modifica allenamento"
                              }, [...(_cache[482] || (_cache[482] = [
                                _createElementVNode("svg", {
                                  class: "w-4 h-4",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24",
                                  "stroke-width": "2"
                                }, [
                                  _createElementVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  })
                                ], -1 /* CACHED */)
                              ]))], 8 /* PROPS */, _hoisted_242),
                              _createElementVNode("button", {
                                onClick: $event => (_ctx.removeTrainingSession(session)),
                                class: "p-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors flex-shrink-0",
                                "aria-label": "Elimina allenamento"
                              }, [...(_cache[483] || (_cache[483] = [
                                _createElementVNode("svg", {
                                  class: "w-4 h-4",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24",
                                  "stroke-width": "2"
                                }, [
                                  _createElementVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  })
                                ], -1 /* CACHED */)
                              ]))], 8 /* PROPS */, _hoisted_243)
                            ]))
                          }), 128 /* KEYED_FRAGMENT */))
                        ])
                      ]))
                    : _createCommentVNode("v-if", true),
                  (_ctx.workoutView === 'builder')
                    ? (_openBlock(), _createElementBlock("div", _hoisted_244, [
                        _createElementVNode("div", _hoisted_245, [
                          _createElementVNode("button", {
                            onClick: _cache[60] || (_cache[60] = $event => (_ctx.workoutView = 'list')),
                            class: "p-2.5 bg-white border border-gray-100 shadow-sm rounded-xl text-gray-400 hover:text-arancione hover:border-arancione/30 transition-colors"
                          }, [...(_cache[485] || (_cache[485] = [
                            _createElementVNode("svg", {
                              class: "w-5 h-5",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M15 19l-7-7 7-7"
                              })
                            ], -1 /* CACHED */)
                          ]))]),
                          _createElementVNode("div", null, [
                            _createElementVNode("div", _hoisted_246, _toDisplayString(_ctx.editingSheetId ? 'MODIFICA' : 'NUOVA'), 1 /* TEXT */),
                            _createElementVNode("h2", _hoisted_247, _toDisplayString(_ctx.editingSheetId ? 'Modifica Scheda' : 'Crea Scheda'), 1 /* TEXT */)
                          ])
                        ]),
                        _createElementVNode("div", _hoisted_248, [
                          _cache[486] || (_cache[486] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 pl-1" }, "Nome della scheda", -1 /* CACHED */)),
                          _withDirectives(_createElementVNode("input", {
                            type: "text",
                            "onUpdate:modelValue": _cache[61] || (_cache[61] = $event => ((_ctx.newSheet.name) = $event)),
                            placeholder: "Es: Push Pull Legs, Full Body...",
                            class: "w-full bg-gray-50 border border-gray-200 focus:border-arancione focus:ring-2 focus:ring-arancione/20 rounded-2xl p-3.5 text-sm font-semibold text-antracite outline-none transition-all placeholder:font-medium"
                          }, null, 512 /* NEED_PATCH */), [
                            [_vModelText, _ctx.newSheet.name]
                          ])
                        ]),
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.newSheet.days, (day, dIdx) => {
                          return (_openBlock(), _createElementBlock("div", {
                            key: 'day-' + dIdx,
                            class: "bg-white rounded-3xl p-4 border border-gray-100 shadow-sm space-y-4"
                          }, [
                            _createElementVNode("div", _hoisted_249, [
                              _createElementVNode("div", _hoisted_250, _toDisplayString(dIdx + 1), 1 /* TEXT */),
                              _withDirectives(_createElementVNode("input", {
                                type: "text",
                                "onUpdate:modelValue": $event => ((day.name) = $event),
                                placeholder: "Es: Giorno A - Push",
                                class: "flex-1 min-w-0 bg-gray-50 border border-gray-200 focus:border-arancione rounded-xl p-2.5 text-sm font-extrabold text-antracite outline-none transition-all"
                              }, null, 8 /* PROPS */, _hoisted_251), [
                                [_vModelText, day.name]
                              ]),
                              (_ctx.newSheet.days.length > 1)
                                ? (_openBlock(), _createElementBlock("button", {
                                    key: 0,
                                    onClick: $event => (_ctx.removeSheetDay(dIdx)),
                                    class: "p-2 text-gray-400 hover:text-red-500 flex-shrink-0",
                                    "aria-label": "Rimuovi giorno"
                                  }, [...(_cache[487] || (_cache[487] = [
                                    _createElementVNode("svg", {
                                      class: "w-5 h-5",
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24",
                                      "stroke-width": "2"
                                    }, [
                                      _createElementVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      })
                                    ], -1 /* CACHED */)
                                  ]))], 8 /* PROPS */, _hoisted_252))
                                : _createCommentVNode("v-if", true)
                            ]),
                            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(day.exercises, (ex, eIdx) => {
                              return (_openBlock(), _createElementBlock("div", {
                                key: 'ex-' + dIdx + '-' + eIdx,
                                class: _normalizeClass(["rounded-2xl p-3 space-y-3 border transition-colors", ex.superset && _ctx.supersetPairCount(day, ex) >= 2 ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-100'])
                              }, [
                                _createElementVNode("div", _hoisted_253, [
                                  _createElementVNode("div", _hoisted_254, [
                                    _createElementVNode("button", {
                                      onClick: $event => (ex.type = 'strength'),
                                      class: _normalizeClass(["px-2.5 py-1 rounded-md text-[10px] font-bold transition-colors", ex.type === 'strength' ? 'bg-arancione text-white' : 'text-gray-400'])
                                    }, "Forza", 10 /* CLASS, PROPS */, _hoisted_255),
                                    _createElementVNode("button", {
                                      onClick: $event => (ex.type = 'cardio'),
                                      class: _normalizeClass(["px-2.5 py-1 rounded-md text-[10px] font-bold transition-colors", ex.type === 'cardio' ? 'bg-arancione text-white' : 'text-gray-400'])
                                    }, "Cardio", 10 /* CLASS, PROPS */, _hoisted_256)
                                  ]),
                                  _withDirectives(_createElementVNode("input", {
                                    type: "text",
                                    "onUpdate:modelValue": $event => ((ex.name) = $event),
                                    placeholder: "Nome esercizio",
                                    list: "still-exercise-list",
                                    onChange: $event => (_ctx.fillFromLibrary(ex)),
                                    class: "flex-1 min-w-0 bg-white border border-gray-200 focus:border-arancione rounded-xl p-2.5 text-xs font-bold text-antracite outline-none transition-all"
                                  }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_257), [
                                    [_vModelText, ex.name]
                                  ]),
                                  _createElementVNode("button", {
                                    onClick: $event => (_ctx.removeExercise(day, eIdx)),
                                    class: "p-1.5 text-gray-400 hover:text-red-500 flex-shrink-0",
                                    "aria-label": "Rimuovi esercizio"
                                  }, [...(_cache[488] || (_cache[488] = [
                                    _createElementVNode("svg", {
                                      class: "w-4 h-4",
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24",
                                      "stroke-width": "2"
                                    }, [
                                      _createElementVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        d: "M6 18L18 6M6 6l12 12"
                                      })
                                    ], -1 /* CACHED */)
                                  ]))], 8 /* PROPS */, _hoisted_258)
                                ]),
                                (ex.type === 'strength')
                                  ? (_openBlock(), _createElementBlock("div", _hoisted_259, [
                                      _createElementVNode("label", _hoisted_260, [
                                        _createElementVNode("input", {
                                          type: "checkbox",
                                          checked: ex.pyramid,
                                          onChange: $event => (_ctx.togglePyramid(ex, dIdx, eIdx)),
                                          class: "w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-400"
                                        }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_261),
                                        _cache[489] || (_cache[489] = _createTextVNode(" Piramidale ", -1 /* CACHED */))
                                      ]),
                                      _cache[490] || (_cache[490] = _createElementVNode("span", { class: "text-[9px] font-medium text-gray-400" }, "peso e rip. per serie", -1 /* CACHED */))
                                    ]))
                                  : _createCommentVNode("v-if", true),
                                (ex.type === 'strength' && ex.pyramid)
                                  ? (_openBlock(), _createElementBlock("div", _hoisted_262, [
                                      _createElementVNode("div", _hoisted_263, [
                                        _createElementVNode("div", null, [
                                          _cache[491] || (_cache[491] = _createElementVNode("label", { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1 text-center" }, "Recupero (s)", -1 /* CACHED */)),
                                          _withDirectives(_createElementVNode("input", {
                                            type: "text",
                                            inputmode: "numeric",
                                            "onUpdate:modelValue": $event => ((ex.rest) = $event),
                                            placeholder: "90",
                                            class: "w-full bg-white border border-gray-200 focus:border-amber-400 rounded-xl p-2.5 text-xs font-bold text-antracite text-center outline-none transition-all placeholder:text-gray-300"
                                          }, null, 8 /* PROPS */, _hoisted_264), [
                                            [_vModelText, ex.rest]
                                          ])
                                        ]),
                                        _createElementVNode("div", null, [
                                          _cache[492] || (_cache[492] = _createElementVNode("label", { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1 text-center" }, "Serie", -1 /* CACHED */)),
                                          _createElementVNode("button", {
                                            onClick: $event => (_ctx.openPyramidModal(dIdx, eIdx)),
                                            class: "w-full bg-white border border-amber-300 text-amber-700 rounded-xl p-2.5 text-xs font-bold text-center hover:bg-amber-50 transition-colors"
                                          }, _toDisplayString((ex.setsDetail || []).length) + " serie · Modifica ", 9 /* TEXT, PROPS */, _hoisted_265)
                                        ])
                                      ]),
                                      _createElementVNode("p", _hoisted_266, _toDisplayString(_ctx.pyramidSummary(ex)), 1 /* TEXT */)
                                    ]))
                                  : (ex.type === 'strength')
                                    ? (_openBlock(), _createElementBlock("div", _hoisted_267, [
                                        _createElementVNode("div", null, [
                                          _cache[493] || (_cache[493] = _createElementVNode("label", { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1 text-center" }, "Peso (kg)", -1 /* CACHED */)),
                                          _withDirectives(_createElementVNode("input", {
                                            type: "text",
                                            inputmode: "decimal",
                                            "onUpdate:modelValue": $event => ((ex.weight) = $event),
                                            placeholder: "60",
                                            class: "w-full bg-white border border-gray-200 focus:border-arancione rounded-xl p-2.5 text-xs font-bold text-antracite text-center outline-none transition-all placeholder:text-gray-300"
                                          }, null, 8 /* PROPS */, _hoisted_268), [
                                            [_vModelText, ex.weight]
                                          ])
                                        ]),
                                        _createElementVNode("div", null, [
                                          _cache[494] || (_cache[494] = _createElementVNode("label", { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1 text-center" }, "Recupero (s)", -1 /* CACHED */)),
                                          _withDirectives(_createElementVNode("input", {
                                            type: "text",
                                            inputmode: "numeric",
                                            "onUpdate:modelValue": $event => ((ex.rest) = $event),
                                            placeholder: "90",
                                            class: "w-full bg-white border border-gray-200 focus:border-arancione rounded-xl p-2.5 text-xs font-bold text-antracite text-center outline-none transition-all placeholder:text-gray-300"
                                          }, null, 8 /* PROPS */, _hoisted_269), [
                                            [_vModelText, ex.rest]
                                          ])
                                        ]),
                                        _createElementVNode("div", null, [
                                          _cache[495] || (_cache[495] = _createElementVNode("label", { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1 text-center" }, "Serie × Rip.", -1 /* CACHED */)),
                                          _createElementVNode("div", _hoisted_270, [
                                            _withDirectives(_createElementVNode("input", {
                                              type: "text",
                                              inputmode: "numeric",
                                              "onUpdate:modelValue": $event => ((ex.sets) = $event),
                                              placeholder: "4",
                                              class: "w-1/2 min-w-0 bg-white border border-gray-200 focus:border-arancione rounded-xl p-2.5 text-xs font-bold text-antracite text-center outline-none transition-all placeholder:text-gray-300"
                                            }, null, 8 /* PROPS */, _hoisted_271), [
                                              [_vModelText, ex.sets]
                                            ]),
                                            _withDirectives(_createElementVNode("input", {
                                              type: "text",
                                              "onUpdate:modelValue": $event => ((ex.reps) = $event),
                                              placeholder: "8-10",
                                              class: "w-1/2 min-w-0 bg-white border border-gray-200 focus:border-arancione rounded-xl p-2.5 text-xs font-bold text-antracite text-center outline-none transition-all placeholder:text-gray-300"
                                            }, null, 8 /* PROPS */, _hoisted_272), [
                                              [_vModelText, ex.reps]
                                            ])
                                          ])
                                        ])
                                      ]))
                                    : (_openBlock(), _createElementBlock("div", _hoisted_273, [
                                        _createElementVNode("div", null, [
                                          _cache[496] || (_cache[496] = _createElementVNode("label", { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1 text-center" }, "Durata (min)", -1 /* CACHED */)),
                                          _withDirectives(_createElementVNode("input", {
                                            type: "text",
                                            inputmode: "numeric",
                                            "onUpdate:modelValue": $event => ((ex.duration) = $event),
                                            placeholder: "20",
                                            class: "w-full bg-white border border-gray-200 focus:border-arancione rounded-xl p-2.5 text-xs font-bold text-antracite text-center outline-none transition-all placeholder:text-gray-300"
                                          }, null, 8 /* PROPS */, _hoisted_274), [
                                            [_vModelText, ex.duration]
                                          ])
                                        ]),
                                        _createElementVNode("div", null, [
                                          _cache[497] || (_cache[497] = _createElementVNode("label", { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1 text-center" }, "Intensità / Velocità", -1 /* CACHED */)),
                                          _withDirectives(_createElementVNode("input", {
                                            type: "text",
                                            "onUpdate:modelValue": $event => ((ex.intensity) = $event),
                                            placeholder: "Livello 8 / 10 km/h",
                                            class: "w-full bg-white border border-gray-200 focus:border-arancione rounded-xl p-2.5 text-xs font-bold text-antracite text-center outline-none transition-all placeholder:text-gray-300"
                                          }, null, 8 /* PROPS */, _hoisted_275), [
                                            [_vModelText, ex.intensity]
                                          ])
                                        ])
                                      ])),
                                _createElementVNode("div", _hoisted_276, [
                                  _createElementVNode("div", _hoisted_277, [
                                    (ex.superset && _ctx.supersetPairCount(day, ex) >= 2)
                                      ? (_openBlock(), _createElementBlock("span", _hoisted_278, "Superserie"))
                                      : _createCommentVNode("v-if", true),
                                    _createElementVNode("span", _hoisted_279, _toDisplayString(ex.superset && _ctx.supersetPairCount(day, ex) >= 2 ? "Senza pausa con l'altro esercizio" : 'Abbina un secondo esercizio'), 1 /* TEXT */)
                                  ]),
                                  (ex.superset && _ctx.supersetPairCount(day, ex) >= 2)
                                    ? (_openBlock(), _createElementBlock("button", {
                                        key: 0,
                                        onClick: $event => (_ctx.removeSuperset(day, eIdx)),
                                        class: "text-[10px] font-bold text-red-500 hover:text-red-600 flex-shrink-0"
                                      }, "Rimuovi", 8 /* PROPS */, _hoisted_280))
                                    : (_openBlock(), _createElementBlock("button", {
                                        key: 1,
                                        onClick: $event => (_ctx.addSupersetPair(day, eIdx)),
                                        class: "text-[10px] font-bold text-amber-700 hover:text-amber-800 flex-shrink-0 flex items-center gap-1"
                                      }, [...(_cache[498] || (_cache[498] = [
                                        _createElementVNode("svg", {
                                          class: "w-3.5 h-3.5",
                                          fill: "none",
                                          stroke: "currentColor",
                                          viewBox: "0 0 24 24",
                                          "stroke-width": "2.5"
                                        }, [
                                          _createElementVNode("path", {
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round",
                                            d: "M12 4v16m8-8H4"
                                          })
                                        ], -1 /* CACHED */),
                                        _createTextVNode(" Aggiungi superserie ", -1 /* CACHED */)
                                      ]))], 8 /* PROPS */, _hoisted_281))
                                ])
                              ], 2 /* CLASS */))
                            }), 128 /* KEYED_FRAGMENT */)),
                            _createElementVNode("button", {
                              onClick: $event => (_ctx.addExercise(day)),
                              class: "w-full py-2.5 border-2 border-dashed border-gray-200 bg-white rounded-xl text-gray-500 font-bold text-xs hover:border-arancione/40 hover:text-arancione transition-colors flex items-center justify-center gap-1.5"
                            }, [...(_cache[499] || (_cache[499] = [
                              _createElementVNode("svg", {
                                class: "w-3.5 h-3.5",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                "stroke-width": "2.5"
                              }, [
                                _createElementVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M12 4v16m8-8H4"
                                })
                              ], -1 /* CACHED */),
                              _createTextVNode(" Aggiungi esercizio ", -1 /* CACHED */)
                            ]))], 8 /* PROPS */, _hoisted_282)
                          ]))
                        }), 128 /* KEYED_FRAGMENT */)),
                        _cache[503] || (_cache[503] = _createElementVNode("p", { class: "text-[10px] font-medium text-gray-400 leading-relaxed px-1" }, [
                          _createTextVNode("💡 Tocca "),
                          _createElementVNode("b", null, "Aggiungi superserie"),
                          _createTextVNode(" su un esercizio: viene creato il secondo esercizio della coppia (in giallo) e i due si eseguono uno dietro l'altro, senza pausa.")
                        ], -1 /* CACHED */)),
                        _createElementVNode("button", {
                          onClick: _cache[62] || (_cache[62] = (...args) => (_ctx.addSheetDay && _ctx.addSheetDay(...args))),
                          class: "w-full py-3.5 border-2 border-dashed border-arancione/40 bg-arancione/5 rounded-2xl text-arancione font-bold text-xs hover:border-arancione hover:bg-arancione/10 transition-colors flex items-center justify-center gap-2"
                        }, [...(_cache[500] || (_cache[500] = [
                          _createElementVNode("svg", {
                            class: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            "stroke-width": "2.5"
                          }, [
                            _createElementVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M12 4v16m8-8H4"
                            })
                          ], -1 /* CACHED */),
                          _createTextVNode(" Aggiungi giorno ", -1 /* CACHED */)
                        ]))]),
                        _createElementVNode("div", _hoisted_283, [
                          _createElementVNode("button", {
                            onClick: _cache[63] || (_cache[63] = (...args) => (_ctx.saveSheet && _ctx.saveSheet(...args))),
                            class: "w-full bg-salvia text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-salvia/90 transition-all active:scale-95 flex items-center justify-center gap-2"
                          }, [
                            _cache[501] || (_cache[501] = _createElementVNode("svg", {
                              class: "w-5 h-5",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              "stroke-width": "2.5"
                            }, [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M5 13l4 4L19 7"
                              })
                            ], -1 /* CACHED */)),
                            _createTextVNode(" " + _toDisplayString(_ctx.editingSheetId ? 'Salva Modifiche' : 'Salva Scheda'), 1 /* TEXT */)
                          ]),
                          (_ctx.editingSheetId)
                            ? (_openBlock(), _createElementBlock("button", {
                                key: 0,
                                onClick: _cache[64] || (_cache[64] = (...args) => (_ctx.promptDeleteSheet && _ctx.promptDeleteSheet(...args))),
                                class: "w-full bg-white border border-red-200 text-red-500 font-bold py-3.5 rounded-2xl shadow-sm hover:bg-red-50 transition-all active:scale-95 flex items-center justify-center gap-2"
                              }, [...(_cache[502] || (_cache[502] = [
                                _createElementVNode("svg", {
                                  class: "w-5 h-5",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24",
                                  "stroke-width": "2"
                                }, [
                                  _createElementVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  })
                                ], -1 /* CACHED */),
                                _createTextVNode(" Elimina Scheda ", -1 /* CACHED */)
                              ]))]))
                            : _createCommentVNode("v-if", true)
                        ])
                      ]))
                    : _createCommentVNode("v-if", true),
                  (_ctx.workoutView === 'detail' && _ctx.selectedSheet)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_284, [
                        _createElementVNode("div", _hoisted_285, [
                          _createElementVNode("div", _hoisted_286, [
                            _createElementVNode("button", {
                              onClick: _cache[65] || (_cache[65] = $event => (_ctx.workoutView = 'list')),
                              class: "flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-antracite transition-colors mb-2"
                            }, [...(_cache[504] || (_cache[504] = [
                              _createElementVNode("svg", {
                                class: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                _createElementVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M15 19l-7-7 7-7"
                                })
                              ], -1 /* CACHED */),
                              _createTextVNode(" Torna alle schede ", -1 /* CACHED */)
                            ]))]),
                            _createElementVNode("h2", _hoisted_287, _toDisplayString(_ctx.selectedSheet.name), 1 /* TEXT */),
                            _createElementVNode("div", _hoisted_288, _toDisplayString(_ctx.selectedSheet.days.length) + " " + _toDisplayString(_ctx.selectedSheet.days.length === 1 ? 'giorno' : 'giorni') + " • " + _toDisplayString(_ctx.totalSheetExercises(_ctx.selectedSheet)) + " " + _toDisplayString((_ctx.totalSheetExercises(_ctx.selectedSheet)) === 1 ? 'esercizio' : 'esercizi'), 1 /* TEXT */)
                          ]),
                          _createElementVNode("div", _hoisted_289, [
                            _createElementVNode("button", {
                              onClick: _cache[66] || (_cache[66] = $event => (_ctx.editSheet(_ctx.selectedSheet))),
                              class: "p-2 bg-arancione/10 text-arancione rounded-xl hover:bg-arancione/20 transition-colors shadow-sm",
                              "aria-label": "Modifica scheda"
                            }, [...(_cache[505] || (_cache[505] = [
                              _createElementVNode("svg", {
                                class: "w-5 h-5",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                "stroke-width": "2"
                              }, [
                                _createElementVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                })
                              ], -1 /* CACHED */)
                            ]))]),
                            _createElementVNode("button", {
                              onClick: _cache[67] || (_cache[67] = (...args) => (_ctx.promptDeleteSelectedSheet && _ctx.promptDeleteSelectedSheet(...args))),
                              class: "p-2 bg-white border border-gray-200 text-gray-400 rounded-xl hover:text-red-500 hover:border-red-200 transition-colors shadow-sm",
                              "aria-label": "Elimina scheda"
                            }, [...(_cache[506] || (_cache[506] = [
                              _createElementVNode("svg", {
                                class: "w-5 h-5",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                "stroke-width": "2"
                              }, [
                                _createElementVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                })
                              ], -1 /* CACHED */)
                            ]))])
                          ])
                        ]),
                        _createElementVNode("button", {
                          onClick: _cache[68] || (_cache[68] = $event => (_ctx.toggleActiveSheet(_ctx.selectedSheet))),
                          class: _normalizeClass(["w-full rounded-2xl px-4 py-3 flex items-center gap-3 text-left transition-all active:scale-[0.98]", _ctx.isActiveSheet(_ctx.selectedSheet) ? 'bg-arancione/10 border border-arancione/30' : 'bg-white border border-dashed border-gray-300'])
                        }, [
                          _createElementVNode("span", {
                            class: _normalizeClass(["w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base", _ctx.isActiveSheet(_ctx.selectedSheet) ? 'bg-arancione text-white' : 'bg-gray-100 text-gray-400'])
                          }, _toDisplayString(_ctx.isActiveSheet(_ctx.selectedSheet) ? '✓' : '★'), 3 /* TEXT, CLASS */),
                          _createElementVNode("span", _hoisted_290, [
                            _createElementVNode("span", {
                              class: _normalizeClass(["block text-sm font-extrabold", _ctx.isActiveSheet(_ctx.selectedSheet) ? 'text-arancione' : 'text-antracite'])
                            }, _toDisplayString(_ctx.isActiveSheet(_ctx.selectedSheet) ? 'Scheda attiva' : 'Rendi attiva questa scheda'), 3 /* TEXT, CLASS */),
                            _createElementVNode("span", _hoisted_291, _toDisplayString(_ctx.isActiveSheet(_ctx.selectedSheet) ? 'In home ti dico quale giorno tocca. Tocca per disattivarla.' : 'È quella che segui ora: la trovi in home con il giorno da fare.'), 1 /* TEXT */)
                          ])
                        ], 2 /* CLASS */),
                        _createElementVNode("div", _hoisted_292, [
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.selectedSheet.days, (day, idx) => {
                            return (_openBlock(), _createElementBlock("button", {
                              key: 'sheet-day-' + idx,
                              onClick: $event => (_ctx.selectedSheetDayIdx = idx),
                              class: _normalizeClass(["flex-1 min-w-[80px] py-3 px-2 rounded-2xl text-[11px] font-bold transition-all truncate", _ctx.selectedSheetDayIdx === idx ? 'bg-arancione/10 text-arancione' : 'text-gray-400 hover:bg-gray-50'])
                            }, [
                              _createTextVNode(_toDisplayString(day.name), 1 /* TEXT */),
                              (_ctx.isActiveSheet(_ctx.selectedSheet) && _ctx.activeSheetNext.idx === idx)
                                ? (_openBlock(), _createElementBlock("span", {
                                    key: 0,
                                    class: _normalizeClass(["block text-[9px] font-black uppercase tracking-wider", _ctx.activeSheetNext.doneToday ? 'text-salvia' : 'text-arancione'])
                                  }, _toDisplayString(_ctx.activeSheetNext.doneToday ? 'Fatto oggi' : 'Tocca a te'), 3 /* TEXT, CLASS */))
                                : _createCommentVNode("v-if", true)
                            ], 10 /* CLASS, PROPS */, _hoisted_293))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]),
                        _createElementVNode("div", _hoisted_294, [
                          _createElementVNode("div", _hoisted_295, [
                            _cache[507] || (_cache[507] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Sessioni", -1 /* CACHED */)),
                            _createElementVNode("div", _hoisted_296, _toDisplayString(_ctx.sheetSessionDates.length), 1 /* TEXT */),
                            _createElementVNode("p", _hoisted_297, _toDisplayString(_ctx.sheetLastSessionDate(_ctx.selectedSheet) ? 'Ultima: ' + _ctx.formatDate(_ctx.sheetLastSessionDate(_ctx.selectedSheet)) : 'Nessuna ancora'), 1 /* TEXT */)
                          ]),
                          _createElementVNode("button", {
                            onClick: _cache[69] || (_cache[69] = $event => (_ctx.sheetHistoryModal.isOpen = true)),
                            class: "bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-left hover:border-arancione/40 transition-colors flex flex-col justify-between"
                          }, [...(_cache[508] || (_cache[508] = [
                            _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, "Storico scheda", -1 /* CACHED */),
                            _createElementVNode("div", { class: "flex items-center gap-1 text-arancione text-xs font-bold mt-2" }, [
                              _createTextVNode(" Consulta i progressi "),
                              _createElementVNode("svg", {
                                class: "w-3.5 h-3.5",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                "stroke-width": "2.5"
                              }, [
                                _createElementVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M9 5l7 7-7 7"
                                })
                              ])
                            ], -1 /* CACHED */)
                          ]))])
                        ]),
                        _createElementVNode("button", {
                          onClick: _cache[70] || (_cache[70] = (...args) => (_ctx.openSessionPreview && _ctx.openSessionPreview(...args))),
                          class: "w-full bg-arancione text-white font-bold py-3.5 rounded-2xl shadow-lg hover:bg-arancione/90 transition-all active:scale-95 flex items-center justify-center gap-2"
                        }, [
                          _cache[509] || (_cache[509] = _createElementVNode("svg", {
                            class: "w-5 h-5",
                            fill: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            _createElementVNode("path", { d: "M8 5v14l11-7z" })
                          ], -1 /* CACHED */)),
                          _createTextVNode(" Avvia sessione" + _toDisplayString(_ctx.currentSheetDay ? ' · ' + _ctx.currentSheetDay.name : ''), 1 /* TEXT */)
                        ]),
                        (_ctx.homeDayPlan && _ctx.selectedSheet && _ctx.selectedSheet.auto !== 'today')
                          ? (_openBlock(), _createElementBlock("button", {
                              key: 0,
                              onClick: _cache[71] || (_cache[71] = (...args) => (_ctx.openHomeSwap && _ctx.openHomeSwap(...args))),
                              class: "w-full -mt-1 text-xs font-bold text-gray-500 py-2 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                            }, [...(_cache[510] || (_cache[510] = [
                              _createTextVNode(" 🏠 Oggi niente palestra? ", -1 /* CACHED */),
                              _createElementVNode("span", { class: "text-arancione" }, "Fallo a casa", -1 /* CACHED */)
                            ]))]))
                          : _createCommentVNode("v-if", true),
                        _createElementVNode("div", _hoisted_298, [
                          _createElementVNode("div", _hoisted_299, [
                            _createElementVNode("h4", _hoisted_300, _toDisplayString(_ctx.currentSheetDay ? _ctx.currentSheetDay.name : 'Esercizi'), 1 /* TEXT */),
                            _createElementVNode("span", _hoisted_301, _toDisplayString(_ctx.currentSheetDay ? _ctx.currentSheetDay.exercises.length : 0) + " " + _toDisplayString((_ctx.currentSheetDay ? _ctx.currentSheetDay.exercises.length : 0) === 1 ? 'esercizio' : 'esercizi'), 1 /* TEXT */)
                          ]),
                          (!_ctx.currentSheetDay || _ctx.currentSheetDay.exercises.length === 0)
                            ? (_openBlock(), _createElementBlock("div", _hoisted_302, " Nessun esercizio in questo giorno. Modifica la scheda per aggiungerne. "))
                            : _createCommentVNode("v-if", true),
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.selectedDayGroups, (group) => {
                            return (_openBlock(), _createElementBlock("div", {
                              key: group.key,
                              class: "space-y-2"
                            }, [
                              (group.label)
                                ? (_openBlock(), _createElementBlock("div", _hoisted_303, [
                                    _createElementVNode("span", _hoisted_304, _toDisplayString(group.label), 1 /* TEXT */),
                                    _cache[511] || (_cache[511] = _createElementVNode("span", { class: "text-[10px] font-medium text-gray-400" }, "senza pausa tra gli esercizi", -1 /* CACHED */))
                                  ]))
                                : _createCommentVNode("v-if", true),
                              _createElementVNode("div", {
                                class: _normalizeClass(["space-y-2", group.label ? 'border-l-2 border-amber-300 pl-2.5' : ''])
                              }, [
                                (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(group.exercises, (ex) => {
                                  return (_openBlock(), _createElementBlock("div", {
                                    key: ex.id,
                                    class: "bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
                                  }, [
                                    _createElementVNode("div", _hoisted_305, [
                                      _createElementVNode("div", _hoisted_306, [
                                        _createElementVNode("div", _hoisted_307, [
                                          _createElementVNode("span", _hoisted_308, _toDisplayString(ex.name), 1 /* TEXT */),
                                          _createElementVNode("span", {
                                            class: _normalizeClass(["text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md", ex.type === 'cardio' ? 'bg-sky-500/10 text-sky-600' : 'bg-arancione/10 text-arancione'])
                                          }, _toDisplayString(ex.type === 'cardio' ? 'Cardio' : 'Forza'), 3 /* TEXT, CLASS */)
                                        ]),
                                        _createElementVNode("p", _hoisted_309, [
                                          (ex.type === 'cardio')
                                            ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                                _createTextVNode(_toDisplayString(ex.duration || '—') + " min • " + _toDisplayString(ex.intensity || 'intensità n.d.'), 1 /* TEXT */)
                                              ], 64 /* STABLE_FRAGMENT */))
                                            : (ex.pyramid)
                                              ? (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                                                  _createTextVNode("Piramidale • " + _toDisplayString((ex.setsDetail || []).length) + " serie • rec. " + _toDisplayString(ex.rest ? ex.rest + 's' : '—'), 1 /* TEXT */)
                                                ], 64 /* STABLE_FRAGMENT */))
                                              : (_openBlock(), _createElementBlock(_Fragment, { key: 2 }, [
                                                  _createTextVNode(_toDisplayString(ex.sets ? ex.sets + '×' + (ex.reps || '—') + ' • ' : '') + "rec. " + _toDisplayString(ex.rest ? ex.rest + 's' : '—'), 1 /* TEXT */)
                                                ], 64 /* STABLE_FRAGMENT */))
                                        ]),
                                        (ex.type === 'strength' && ex.pyramid)
                                          ? (_openBlock(), _createElementBlock("p", _hoisted_310, _toDisplayString(_ctx.pyramidSummary(ex)), 1 /* TEXT */))
                                          : _createCommentVNode("v-if", true),
                                        (_ctx.libraryTip(ex.name))
                                          ? (_openBlock(), _createElementBlock("p", _hoisted_311, [
                                              _createTextVNode("💡 " + _toDisplayString(_ctx.libraryTip(ex.name)) + " ", 1 /* TEXT */),
                                              _createElementVNode("button", {
                                                onClick: _withModifiers($event => (_ctx.openExerciseInfo(_ctx.libraryItem(ex.name))), ["stop"]),
                                                class: "font-bold text-arancione whitespace-nowrap"
                                              }, "Come si fa →", 8 /* PROPS */, _hoisted_312)
                                            ]))
                                          : _createCommentVNode("v-if", true)
                                      ]),
                                      _createElementVNode("button", {
                                        onClick: $event => (_ctx.openExerciseHistory(ex)),
                                        class: "p-1.5 text-gray-400 hover:text-arancione flex-shrink-0",
                                        "aria-label": "Storico esercizio"
                                      }, [...(_cache[512] || (_cache[512] = [
                                        _createElementVNode("svg", {
                                          class: "w-5 h-5",
                                          fill: "none",
                                          stroke: "currentColor",
                                          viewBox: "0 0 24 24",
                                          "stroke-width": "2"
                                        }, [
                                          _createElementVNode("path", {
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round",
                                            d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                          })
                                        ], -1 /* CACHED */)
                                      ]))], 8 /* PROPS */, _hoisted_313)
                                    ]),
                                    _createElementVNode("div", _hoisted_314, [
                                      _createElementVNode("div", _hoisted_315, [
                                        _createElementVNode("div", _hoisted_316, _toDisplayString(ex.type === 'cardio' ? 'Durata attuale' : 'Peso attuale'), 1 /* TEXT */),
                                        _createElementVNode("div", _hoisted_317, [
                                          (_ctx.exerciseDeltaValue(ex) !== null && _ctx.exerciseDeltaValue(ex) !== 0)
                                            ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                                _createElementVNode("span", _hoisted_318, _toDisplayString(_ctx.formatNumber(_ctx.exerciseStartValue(ex))), 1 /* TEXT */),
                                                _cache[513] || (_cache[513] = _createElementVNode("span", { class: "text-[10px] text-gray-400" }, "→", -1 /* CACHED */))
                                              ], 64 /* STABLE_FRAGMENT */))
                                            : _createCommentVNode("v-if", true),
                                          _createElementVNode("span", {
                                            class: _normalizeClass(["text-lg font-extrabold", ex.type === 'cardio' ? 'text-sky-600' : 'text-arancione'])
                                          }, _toDisplayString(_ctx.formatNumber(_ctx.exerciseCurrentValue(ex))) + " " + _toDisplayString(_ctx.exerciseUnit(ex)), 3 /* TEXT, CLASS */),
                                          (_ctx.exerciseDeltaValue(ex) !== null && _ctx.exerciseDeltaValue(ex) !== 0)
                                            ? (_openBlock(), _createElementBlock("span", {
                                                key: 1,
                                                class: _normalizeClass(["text-[10px] font-bold", _ctx.exerciseDeltaValue(ex) > 0 ? 'text-salvia' : 'text-red-500'])
                                              }, _toDisplayString(_ctx.exerciseDeltaValue(ex) > 0 ? '+' : '') + _toDisplayString(_ctx.formatNumber(_ctx.exerciseDeltaValue(ex))) + " " + _toDisplayString(_ctx.exerciseUnit(ex)), 3 /* TEXT, CLASS */))
                                            : _createCommentVNode("v-if", true)
                                        ]),
                                        _createElementVNode("p", _hoisted_319, _toDisplayString(_ctx.lastExerciseLog(ex) ? 'Ultima: ' + _ctx.formatDate(_ctx.lastExerciseLog(ex).date) : 'Nessun dato registrato'), 1 /* TEXT */),
                                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList([_ctx.exerciseSuggestion(ex)], (sg) => {
                                          return (_openBlock(), _createElementBlock(_Fragment, {
                                            key: 'sg' + ex.id
                                          }, [
                                            sg
                                              ? (_openBlock(), _createElementBlock("p", {
                                                  key: 0,
                                                  class: _normalizeClass(["text-[10px] font-bold mt-1", sg.kind === 'up' ? 'text-salvia' : (sg.kind === 'down' ? 'text-sky-600' : 'text-gray-500')])
                                                }, [
                                                  _createTextVNode(_toDisplayString(sg.kind === 'up' ? '⬆️' : (sg.kind === 'down' ? '⬇️' : '🎯')) + " Prossima volta: " + _toDisplayString(_ctx.formatNumber(sg.value)) + " kg", 1 /* TEXT */),
                                                  (sg.delta)
                                                    ? (_openBlock(), _createElementBlock("span", _hoisted_320, " (" + _toDisplayString(sg.delta > 0 ? '+' : '') + _toDisplayString(_ctx.formatNumber(sg.delta)) + ")", 1 /* TEXT */))
                                                    : _createCommentVNode("v-if", true)
                                                ], 2 /* CLASS */))
                                              : _createCommentVNode("v-if", true)
                                          ], 64 /* STABLE_FRAGMENT */))
                                        }), 128 /* KEYED_FRAGMENT */)),
                                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList([_ctx.exerciseStall(ex)], (stl) => {
                                          return (_openBlock(), _createElementBlock(_Fragment, {
                                            key: 'stl' + ex.id
                                          }, [
                                            stl
                                              ? (_openBlock(), _createElementBlock("p", _hoisted_321, [
                                                  _createTextVNode(" 🔄 " + _toDisplayString(stl.hard ? 'Duro due volte di fila' : 'Fermo da ' + stl.sessions + ' sessioni') + ": cambia stimolo con ", 1 /* TEXT */),
                                                  _createElementVNode("span", _hoisted_322, _toDisplayString((stl.gym || stl.home).n), 1 /* TEXT */),
                                                  (stl.gym && stl.home)
                                                    ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                                        _cache[514] || (_cache[514] = _createTextVNode(" o, a casa, ", -1 /* CACHED */)),
                                                        _createElementVNode("span", _hoisted_323, _toDisplayString(stl.home.n), 1 /* TEXT */)
                                                      ], 64 /* STABLE_FRAGMENT */))
                                                    : _createCommentVNode("v-if", true),
                                                  _cache[515] || (_cache[515] = _createTextVNode(". ", -1 /* CACHED */))
                                                ]))
                                              : _createCommentVNode("v-if", true)
                                          ], 64 /* STABLE_FRAGMENT */))
                                        }), 128 /* KEYED_FRAGMENT */))
                                      ]),
                                      _createElementVNode("div", _hoisted_324, [
                                        (ex.type === 'strength' && ex.pyramid)
                                          ? (_openBlock(), _createElementBlock("button", {
                                              key: 0,
                                              onClick: $event => (_ctx.openPyramidLogModal(ex)),
                                              class: "h-9 px-3 rounded-xl bg-amber-500 text-white text-[10px] font-bold shadow-sm flex items-center gap-1 active:scale-95 transition-all"
                                            }, [...(_cache[516] || (_cache[516] = [
                                              _createElementVNode("svg", {
                                                class: "w-3.5 h-3.5",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                "stroke-width": "2.5"
                                              }, [
                                                _createElementVNode("path", {
                                                  "stroke-linecap": "round",
                                                  "stroke-linejoin": "round",
                                                  d: "M12 4l8 16H4L12 4z"
                                                })
                                              ], -1 /* CACHED */),
                                              _createTextVNode(" Registra serie ", -1 /* CACHED */)
                                            ]))], 8 /* PROPS */, _hoisted_325))
                                          : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                                              _withDirectives(_createElementVNode("input", {
                                                type: "text",
                                                inputmode: "decimal",
                                                "onUpdate:modelValue": $event => ((_ctx.exerciseInputs[ex.id]) = $event),
                                                placeholder: _ctx.exerciseUnit(ex),
                                                onKeyup: _withKeys($event => (_ctx.setExerciseValue(ex)), ["enter"]),
                                                class: "w-16 bg-white border border-gray-200 focus:border-arancione focus:ring-2 focus:ring-arancione/20 rounded-xl px-2 py-2 text-xs font-bold text-antracite text-center outline-none transition-all placeholder:text-gray-300"
                                              }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_326), [
                                                [_vModelText, _ctx.exerciseInputs[ex.id]]
                                              ]),
                                              _createElementVNode("button", {
                                                onClick: $event => (_ctx.setExerciseValue(ex)),
                                                class: "w-9 h-9 rounded-full bg-arancione text-white shadow-sm flex items-center justify-center active:scale-90 transition-all",
                                                "aria-label": "Conferma e registra nuovo valore",
                                                title: "Conferma e registra"
                                              }, [...(_cache[517] || (_cache[517] = [
                                                _createElementVNode("svg", {
                                                  class: "w-4 h-4",
                                                  fill: "none",
                                                  stroke: "currentColor",
                                                  viewBox: "0 0 24 24",
                                                  "stroke-width": "3"
                                                }, [
                                                  _createElementVNode("path", {
                                                    "stroke-linecap": "round",
                                                    "stroke-linejoin": "round",
                                                    d: "M5 13l4 4L19 7"
                                                  })
                                                ], -1 /* CACHED */)
                                              ]))], 8 /* PROPS */, _hoisted_327)
                                            ], 64 /* STABLE_FRAGMENT */))
                                      ])
                                    ])
                                  ]))
                                }), 128 /* KEYED_FRAGMENT */))
                              ], 2 /* CLASS */)
                            ]))
                          }), 128 /* KEYED_FRAGMENT */)),
                          _cache[518] || (_cache[518] = _createElementVNode("p", { class: "text-[10px] font-medium text-gray-400 text-center px-4" }, [
                            _createTextVNode("Scrivi il nuovo peso (o la nuova durata) e tocca ✓ per confermare. Per i piramidali usa "),
                            _createElementVNode("b", null, "Registra serie"),
                            _createTextVNode(": inserisci il peso di ogni serie, nei progressi conta quello maggiore.")
                          ], -1 /* CACHED */))
                        ])
                      ]))
                    : _createCommentVNode("v-if", true)
                ]))
              : _createCommentVNode("v-if", true),
            (_ctx.activeTab === 'progress')
              ? (_openBlock(), _createElementBlock("div", _hoisted_328, [
                  _createElementVNode("div", _hoisted_329, [
                    _cache[521] || (_cache[521] = _createElementVNode("div", null, [
                      _createElementVNode("div", { class: "text-[10px] font-bold text-salvia tracking-widest uppercase" }, "RISULTATI"),
                      _createElementVNode("h2", { class: "text-2xl font-bold text-antracite" }, "I tuoi Progressi")
                    ], -1 /* CACHED */)),
                    (_ctx.measurements.length > 0 || _ctx.workoutGroups.length > 0)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_330, [
                          _createElementVNode("button", {
                            onClick: _cache[72] || (_cache[72] = $event => (_ctx.openRecap(0, 'week'))),
                            class: "bg-antracite text-white font-bold text-xs px-3 py-2.5 rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-1",
                            title: "Riepilogo della settimana o del mese"
                          }, "🎬 Riepilogo"),
                          _createElementVNode("button", {
                            onClick: _cache[73] || (_cache[73] = $event => (_ctx.openShareStudio('progress'))),
                            class: "cangiante-btn text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
                          }, [...(_cache[519] || (_cache[519] = [
                            _createElementVNode("svg", {
                              class: "w-4 h-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              "stroke-width": "2.2"
                            }, [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                              })
                            ], -1 /* CACHED */),
                            _createTextVNode(" Condividi ", -1 /* CACHED */)
                          ]))]),
                          _createElementVNode("button", {
                            onClick: _cache[74] || (_cache[74] = $event => (_ctx.openMeasurementModal())),
                            class: "bg-salvia text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-md hover:bg-salvia/90 transition-all active:scale-95 flex items-center justify-center gap-1.5"
                          }, [...(_cache[520] || (_cache[520] = [
                            _createElementVNode("svg", {
                              class: "w-4 h-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              "stroke-width": "2.5"
                            }, [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M12 4v16m8-8H4"
                              })
                            ], -1 /* CACHED */),
                            _createTextVNode(" Aggiungi ", -1 /* CACHED */)
                          ]))])
                        ]))
                      : _createCommentVNode("v-if", true)
                  ]),
                  _createElementVNode("div", _hoisted_331, [
                    _createElementVNode("div", _hoisted_332, [
                      _createElementVNode("div", null, [
                        _cache[522] || (_cache[522] = _createElementVNode("span", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "FOTO DEI PROGRESSI", -1 /* CACHED */)),
                        (_ctx.photos.length)
                          ? (_openBlock(), _createElementBlock("p", _hoisted_333, _toDisplayString(_ctx.photos.length) + " foto · dal " + _toDisplayString(_ctx.photoDateLabel(_ctx.photos[_ctx.photos.length - 1].date)), 1 /* TEXT */))
                          : (_openBlock(), _createElementBlock("p", _hoisted_334, "Guarda il tuo corpo cambiare"))
                      ]),
                      (_ctx.photos.length)
                        ? (_openBlock(), _createElementBlock("button", {
                            key: 0,
                            onClick: _cache[75] || (_cache[75] = $event => (_ctx.openGallery())),
                            class: "text-[10px] font-bold text-salvia flex items-center gap-0.5 flex-shrink-0 pt-0.5"
                          }, [...(_cache[523] || (_cache[523] = [
                            _createTextVNode(" Galleria ", -1 /* CACHED */),
                            _createElementVNode("svg", {
                              class: "w-3.5 h-3.5",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              "stroke-width": "2.5"
                            }, [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M9 5l7 7-7 7"
                              })
                            ], -1 /* CACHED */)
                          ]))]))
                        : _createCommentVNode("v-if", true)
                    ]),
                    (_ctx.photos.length)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_335, [
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.recentPhotos, (p) => {
                            return (_openBlock(), _createElementBlock("button", {
                              key: 'rp-' + p.id,
                              onClick: $event => {_ctx.openGallery(); _ctx.openPhoto(p)},
                              class: "relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 active:scale-95 transition-all"
                            }, [
                              _createElementVNode("img", {
                                src: p.thumbUrl,
                                alt: "",
                                class: "w-full h-full object-cover",
                                loading: "lazy"
                              }, null, 8 /* PROPS */, _hoisted_337),
                              _createElementVNode("span", _hoisted_338, _toDisplayString(_ctx.photoDateLabel(p.date).replace(/ \d{4}$/, '')), 1 /* TEXT */)
                            ], 8 /* PROPS */, _hoisted_336))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]))
                      : (_openBlock(), _createElementBlock("p", _hoisted_339, "Una foto ogni 2-4 settimane, stessa luce e stessa posa: tra qualche mese vedrai la differenza meglio di qualsiasi bilancia. Le foto restano solo su questo telefono 🔒")),
                    (_ctx.daysSinceLastPhoto !== null && _ctx.daysSinceLastPhoto >= 21)
                      ? (_openBlock(), _createElementBlock("p", _hoisted_340, "Ultima foto " + _toDisplayString(_ctx.daysSinceLastPhoto) + " giorni fa: è il momento di scattarne una nuova 📸", 1 /* TEXT */))
                      : _createCommentVNode("v-if", true),
                    _createElementVNode("div", {
                      class: _normalizeClass(["grid gap-2", _ctx.quickCompare ? 'grid-cols-2' : 'grid-cols-1'])
                    }, [
                      _createElementVNode("button", {
                        onClick: _cache[76] || (_cache[76] = (...args) => (_ctx.triggerPhotoInput && _ctx.triggerPhotoInput(...args))),
                        class: "bg-salvia text-white font-bold text-xs py-3 rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
                      }, [...(_cache[524] || (_cache[524] = [
                        _createElementVNode("svg", {
                          class: "w-4 h-4",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2.2"
                        }, [
                          _createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M3 9a2 2 0 012-2h.93a2 2 0 001.66-.9l.82-1.2A2 2 0 0110.07 4h3.86a2 2 0 011.66.9l.82 1.2a2 2 0 001.66.9H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          }),
                          _createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          })
                        ], -1 /* CACHED */),
                        _createTextVNode(" Aggiungi foto ", -1 /* CACHED */)
                      ]))]),
                      (_ctx.quickCompare)
                        ? (_openBlock(), _createElementBlock("button", {
                            key: 0,
                            onClick: _cache[77] || (_cache[77] = (...args) => (_ctx.openQuickCompare && _ctx.openQuickCompare(...args))),
                            class: "cangiante-btn text-white font-bold text-xs py-3 rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
                          }, [...(_cache[525] || (_cache[525] = [
                            _createElementVNode("svg", {
                              class: "w-4 h-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              "stroke-width": "2.2"
                            }, [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M12 4v16M5 7h4v10H5zM15 7h4v10h-4z"
                              })
                            ], -1 /* CACHED */),
                            _createTextVNode(" Prima e dopo ", -1 /* CACHED */)
                          ]))]))
                        : _createCommentVNode("v-if", true)
                    ], 2 /* CLASS */)
                  ]),
                  (_ctx.measurements.length === 0 && _ctx.workoutGroups.length === 0 && _ctx.trainingTimeSummary.total === 0)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_341, [
                        _cache[527] || (_cache[527] = _createStaticVNode("<div class=\"w-16 h-16 rounded-full bg-salvia/10 border border-salvia/20 flex items-center justify-center text-salvia\"><svg class=\"w-8 h-8\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z\"></path></svg></div><div><h3 class=\"font-bold text-antracite text-lg\">Ancora nessun progresso</h3><p class=\"text-sm text-gray-500 mt-1.5 leading-relaxed\">Registra peso e circonferenze per vedere i tuoi miglioramenti. I carichi arrivano automaticamente dalle schede di allenamento.</p></div>", 2)),
                        _createElementVNode("button", {
                          onClick: _cache[78] || (_cache[78] = $event => (_ctx.openMeasurementModal())),
                          class: "w-full bg-salvia text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-salvia/90 transition-all active:scale-95 flex items-center justify-center gap-2"
                        }, [...(_cache[526] || (_cache[526] = [
                          _createElementVNode("svg", {
                            class: "w-5 h-5",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            "stroke-width": "2.5"
                          }, [
                            _createElementVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M12 4v16m8-8H4"
                            })
                          ], -1 /* CACHED */),
                          _createTextVNode(" Aggiungi la prima misurazione ", -1 /* CACHED */)
                        ]))])
                      ]))
                    : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                        (_ctx.weightEntries.length > 0)
                          ? (_openBlock(), _createElementBlock("div", {
                              key: 0,
                              onClick: _cache[79] || (_cache[79] = $event => (_ctx.openHistory('weight'))),
                              role: "button",
                              class: "bg-white rounded-3xl p-5 border border-gray-100 shadow-soft space-y-4 cursor-pointer hover:border-salvia/40 transition-colors active:scale-[0.995]"
                            }, [
                              _createElementVNode("div", _hoisted_342, [
                                _createElementVNode("div", null, [
                                  _cache[529] || (_cache[529] = _createElementVNode("span", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "PESO ATTUALE", -1 /* CACHED */)),
                                  _createElementVNode("div", _hoisted_343, [
                                    _createTextVNode(_toDisplayString(_ctx.formatNumber(_ctx.latestWeight.weight)) + " ", 1 /* TEXT */),
                                    _cache[528] || (_cache[528] = _createElementVNode("span", { class: "text-sm font-semibold text-gray-400" }, "kg", -1 /* CACHED */))
                                  ]),
                                  _createElementVNode("p", _hoisted_344, "Ultima misurazione: " + _toDisplayString(_ctx.formatDate(_ctx.latestWeight.date)), 1 /* TEXT */)
                                ]),
                                _createElementVNode("div", _hoisted_345, [
                                  (_ctx.weightDelta)
                                    ? (_openBlock(), _createElementBlock("span", {
                                        key: 0,
                                        class: _normalizeClass(["px-2 py-1 text-xs font-bold rounded-lg", _ctx.weightDelta.classes])
                                      }, _toDisplayString(_ctx.weightDelta.text), 3 /* TEXT, CLASS */))
                                    : _createCommentVNode("v-if", true),
                                  _cache[530] || (_cache[530] = _createElementVNode("span", { class: "text-[10px] font-bold text-salvia flex items-center gap-0.5" }, [
                                    _createTextVNode(" Storico "),
                                    _createElementVNode("svg", {
                                      class: "w-3.5 h-3.5",
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24",
                                      "stroke-width": "2.5"
                                    }, [
                                      _createElementVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        d: "M9 5l7 7-7 7"
                                      })
                                    ])
                                  ], -1 /* CACHED */))
                                ])
                              ]),
                              _createElementVNode("div", _hoisted_346, [
                                (_openBlock(), _createElementBlock("svg", _hoisted_347, [
                                  _cache[531] || (_cache[531] = _createStaticVNode("<line x1=\"0\" y1=\"30\" x2=\"300\" y2=\"30\" class=\"chart-grid\" stroke=\"#E5E7EB\" stroke-dasharray=\"3,3\"></line><line x1=\"0\" y1=\"75\" x2=\"300\" y2=\"75\" class=\"chart-grid\" stroke=\"#E5E7EB\" stroke-dasharray=\"3,3\"></line><line x1=\"0\" y1=\"120\" x2=\"300\" y2=\"120\" class=\"chart-grid\" stroke=\"#E5E7EB\" stroke-dasharray=\"3,3\"></line><defs><linearGradient id=\"lightAreaGrad\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0%\" stop-color=\"#10B981\" stop-opacity=\"0.3\"></stop><stop offset=\"100%\" stop-color=\"#10B981\" stop-opacity=\"0\"></stop></linearGradient></defs>", 4)),
                                  _createElementVNode("polygon", {
                                    points: _ctx.weightChart.area,
                                    fill: "url(#lightAreaGrad)"
                                  }, null, 8 /* PROPS */, _hoisted_348),
                                  _createElementVNode("polyline", {
                                    points: _ctx.weightChart.line,
                                    fill: "none",
                                    stroke: "#10B981",
                                    "stroke-width": "4",
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round"
                                  }, null, 8 /* PROPS */, _hoisted_349),
                                  (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.weightChart.points, (pt, index) => {
                                    return (_openBlock(), _createElementBlock("g", { key: index }, [
                                      _createElementVNode("circle", {
                                        cx: pt.x,
                                        cy: pt.y,
                                        class: "chart-dot",
                                        r: "5",
                                        fill: "#FFFFFF",
                                        stroke: "#10B981",
                                        "stroke-width": "3"
                                      }, null, 8 /* PROPS */, _hoisted_350),
                                      (pt.showLabel)
                                        ? (_openBlock(), _createElementBlock("text", {
                                            key: 0,
                                            x: pt.x,
                                            y: pt.y - 12,
                                            "text-anchor": "middle",
                                            class: "chart-label",
                                            fill: "#1D1D1D",
                                            "font-size": "10",
                                            "font-weight": "bold"
                                          }, _toDisplayString(pt.label), 9 /* TEXT, PROPS */, _hoisted_351))
                                        : _createCommentVNode("v-if", true)
                                    ]))
                                  }), 128 /* KEYED_FRAGMENT */))
                                ]))
                              ]),
                              _createElementVNode("p", _hoisted_352, [
                                _createTextVNode(" Dal " + _toDisplayString(_ctx.formatDate(_ctx.weightEntries[0].date)) + " al " + _toDisplayString(_ctx.formatDate(_ctx.weightEntries[_ctx.weightEntries.length - 1].date)) + " ", 1 /* TEXT */),
                                (_ctx.weightDelta && _ctx.weightDelta.days > 0)
                                  ? (_openBlock(), _createElementBlock("span", _hoisted_353, " • " + _toDisplayString(_ctx.weightDelta.days) + " " + _toDisplayString(_ctx.weightDelta.days === 1 ? 'giorno' : 'giorni'), 1 /* TEXT */))
                                  : _createCommentVNode("v-if", true)
                              ])
                            ]))
                          : _createCommentVNode("v-if", true),
                        _createElementVNode("div", _hoisted_354, [
                          _cache[565] || (_cache[565] = _createElementVNode("div", { class: "flex justify-between items-center px-1" }, [
                            _createElementVNode("h4", { class: "text-xs font-bold text-gray-500 uppercase tracking-widest" }, "Il tuo corpo"),
                            _createElementVNode("span", { class: "text-[10px] font-medium text-gray-400" }, "Tocca per sapere cos'è")
                          ], -1 /* CACHED */)),
                          (_ctx.bodyStats.missing.length)
                            ? (_openBlock(), _createElementBlock("button", {
                                key: 0,
                                onClick: _cache[80] || (_cache[80] = (...args) => (_ctx.openProfileCompletion && _ctx.openProfileCompletion(...args))),
                                class: "w-full text-left bg-viola/10 border border-viola/20 rounded-2xl p-3.5 flex items-center gap-3 active:scale-[0.99] transition-transform"
                              }, [
                                _cache[534] || (_cache[534] = _createElementVNode("span", { class: "text-xl" }, "🧬", -1 /* CACHED */)),
                                _createElementVNode("span", _hoisted_355, [
                                  _cache[532] || (_cache[532] = _createTextVNode("Aggiungi ", -1 /* CACHED */)),
                                  _createElementVNode("b", null, _toDisplayString(_ctx.bodyStats.missing.filter(x => x !== 'peso').join(', ') || 'una pesata'), 1 /* TEXT */),
                                  _cache[533] || (_cache[533] = _createTextVNode(" per sbloccare fabbisogno e massa grassa.", -1 /* CACHED */))
                                ]),
                                _createElementVNode("span", _hoisted_356, _toDisplayString(_ctx.bodyStats.missing.length === 1 && _ctx.bodyStats.missing[0] === 'peso' ? '' : 'Completa'), 1 /* TEXT */)
                              ]))
                            : _createCommentVNode("v-if", true),
                          (_ctx.bodyStats.energy)
                            ? (_openBlock(), _createElementBlock("div", {
                                key: 1,
                                onClick: _cache[81] || (_cache[81] = $event => (_ctx.toggleBodyInfo('energy'))),
                                role: "button",
                                class: "bg-white rounded-3xl p-5 border border-gray-100 shadow-soft cursor-pointer"
                              }, [
                                _createElementVNode("div", _hoisted_357, [
                                  _createElementVNode("div", _hoisted_358, [
                                    _cache[536] || (_cache[536] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "🔥 Fabbisogno giornaliero", -1 /* CACHED */)),
                                    _createElementVNode("div", _hoisted_359, [
                                      _createTextVNode(_toDisplayString(_ctx.bodyStats.energy.tdee) + " ", 1 /* TEXT */),
                                      _cache[535] || (_cache[535] = _createElementVNode("span", { class: "text-sm font-bold text-gray-400" }, "kcal", -1 /* CACHED */))
                                    ]),
                                    _createElementVNode("div", _hoisted_360, "Metabolismo basale " + _toDisplayString(_ctx.bodyStats.energy.bmr) + " kcal · " + _toDisplayString(_ctx.bodyStats.activity.label), 1 /* TEXT */)
                                  ]),
                                  _createElementVNode("span", _hoisted_361, _toDisplayString(_ctx.formatNumber(Math.round(_ctx.bodyStats.activity.weeklyHours * 10) / 10)) + " h/sett", 1 /* TEXT */)
                                ]),
                                _createElementVNode("div", _hoisted_362, [
                                  _createElementVNode("div", _hoisted_363, [
                                    _cache[537] || (_cache[537] = _createElementVNode("div", { class: "text-[9px] font-bold text-sky-600 uppercase tracking-wider" }, "Dimagrire", -1 /* CACHED */)),
                                    _createElementVNode("div", _hoisted_364, _toDisplayString(_ctx.bodyStats.energy.lose), 1 /* TEXT */)
                                  ]),
                                  _createElementVNode("div", _hoisted_365, [
                                    _cache[538] || (_cache[538] = _createElementVNode("div", { class: "text-[9px] font-bold text-salvia uppercase tracking-wider" }, "Mantenere", -1 /* CACHED */)),
                                    _createElementVNode("div", _hoisted_366, _toDisplayString(_ctx.bodyStats.energy.tdee), 1 /* TEXT */)
                                  ]),
                                  _createElementVNode("div", _hoisted_367, [
                                    _cache[539] || (_cache[539] = _createElementVNode("div", { class: "text-[9px] font-bold text-arancione uppercase tracking-wider" }, "Aumentare", -1 /* CACHED */)),
                                    _createElementVNode("div", _hoisted_368, _toDisplayString(_ctx.bodyStats.energy.gain), 1 /* TEXT */)
                                  ])
                                ]),
                                (_ctx.bodyStats.plan)
                                  ? (_openBlock(), _createElementBlock("div", _hoisted_369, [
                                      _createElementVNode("div", _hoisted_370, [
                                        _cache[542] || (_cache[542] = _createTextVNode(" Il tuo piano: circa ", -1 /* CACHED */)),
                                        _createElementVNode("b", _hoisted_371, _toDisplayString(_ctx.bodyStats.plan.kcal) + " kcal", 1 /* TEXT */),
                                        (Math.abs(_ctx.bodyStats.plan.balance) < 100)
                                          ? (_openBlock(), _createElementBlock("span", _hoisted_372, " · in linea col fabbisogno"))
                                          : (_openBlock(), _createElementBlock("span", _hoisted_373, [
                                              _cache[540] || (_cache[540] = _createTextVNode(" · ", -1 /* CACHED */)),
                                              _createElementVNode("b", {
                                                class: _normalizeClass(_ctx.bodyStats.plan.balance < 0 ? 'text-sky-600' : 'text-arancione')
                                              }, _toDisplayString(_ctx.bodyStats.plan.balance > 0 ? '+' : '') + _toDisplayString(_ctx.bodyStats.plan.balance) + " kcal", 3 /* TEXT, CLASS */),
                                              _cache[541] || (_cache[541] = _createTextVNode(" al giorno", -1 /* CACHED */))
                                            ]))
                                      ]),
                                      _createElementVNode("div", _hoisted_374, [
                                        (_ctx.bodyStats.plan.balance < -900)
                                          ? (_openBlock(), _createElementBlock("span", _hoisted_375, "Molto sotto il fabbisogno: controlla che tutti i pasti abbiano le calorie stimate."))
                                          : _createCommentVNode("v-if", true),
                                        _createTextVNode(" Previsto " + _toDisplayString(_ctx.bodyStats.plan.perWeek > 0 ? '+' : '') + _toDisplayString(_ctx.formatNumber(Math.round(_ctx.bodyStats.plan.perWeek * 10) / 10)) + " kg/sett", 1 /* TEXT */),
                                        (_ctx.bodyStats.trend)
                                          ? (_openBlock(), _createElementBlock("span", _hoisted_376, " · reale " + _toDisplayString(_ctx.bodyStats.trend.perWeek > 0 ? '+' : '') + _toDisplayString(_ctx.formatNumber(Math.round(_ctx.bodyStats.trend.perWeek * 10) / 10)) + " kg/sett", 1 /* TEXT */))
                                          : _createCommentVNode("v-if", true)
                                      ])
                                    ]))
                                  : _createCommentVNode("v-if", true),
                                (_ctx.bodyInfoOpen === 'energy')
                                  ? (_openBlock(), _createElementBlock("p", _hoisted_377, [...(_cache[543] || (_cache[543] = [
                                      _createTextVNode(" Le calorie che bruci in un giorno. Il ", -1 /* CACHED */),
                                      _createElementVNode("b", null, "metabolismo basale", -1 /* CACHED */),
                                      _createTextVNode(" è quello che consumi a riposo (formula Mifflin-St Jeor da peso, altezza, età e sesso); poi si moltiplica per il tuo livello di attività, calcolato dalle ore di allenamento e sport segnate nelle ultime 4 settimane. Per dimagrire si tolgono ~500 kcal (circa mezzo chilo a settimana), per aumentare si aggiungono ~300 kcal. È una stima: se il peso reale va diversamente, conta quello. ", -1 /* CACHED */)
                                    ]))]))
                                  : _createCommentVNode("v-if", true)
                              ]))
                            : _createCommentVNode("v-if", true),
                          (_ctx.bodyStats.energy || _ctx.realExpenditure.ready)
                            ? (_openBlock(), _createElementBlock("div", {
                                key: 2,
                                onClick: _cache[82] || (_cache[82] = $event => (_ctx.toggleBodyInfo('real'))),
                                role: "button",
                                class: "bg-white rounded-3xl p-5 border border-gray-100 shadow-soft cursor-pointer space-y-3"
                              }, [
                                _createElementVNode("div", _hoisted_378, [
                                  _createElementVNode("div", _hoisted_379, [
                                    _cache[546] || (_cache[546] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "📈 Consumo reale", -1 /* CACHED */)),
                                    (_ctx.realExpenditure.ready)
                                      ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                          _createElementVNode("div", _hoisted_380, [
                                            _createTextVNode(_toDisplayString(_ctx.formatNumber(_ctx.realExpenditure.tdee)) + " ", 1 /* TEXT */),
                                            _cache[544] || (_cache[544] = _createElementVNode("span", { class: "text-sm font-bold text-gray-400" }, "kcal", -1 /* CACHED */))
                                          ]),
                                          _createElementVNode("div", _hoisted_381, "Mangi in media " + _toDisplayString(_ctx.formatNumber(_ctx.realExpenditure.avgIntake)) + " kcal · peso " + _toDisplayString(_ctx.realExpenditure.perWeek > 0 ? '+' : '') + _toDisplayString(_ctx.formatNumber(Math.round(_ctx.realExpenditure.perWeek * 10) / 10)) + " kg/sett", 1 /* TEXT */)
                                        ], 64 /* STABLE_FRAGMENT */))
                                      : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                                          _cache[545] || (_cache[545] = _createElementVNode("div", { class: "text-sm font-extrabold text-antracite mt-1" }, "Lo calcolo dai tuoi dati veri", -1 /* CACHED */)),
                                          _createElementVNode("div", _hoisted_382, _toDisplayString(_ctx.realExpNeedText), 1 /* TEXT */)
                                        ], 64 /* STABLE_FRAGMENT */))
                                  ]),
                                  (_ctx.realExpenditure.ready && _ctx.bodyStats.energy)
                                    ? (_openBlock(), _createElementBlock("span", {
                                        key: 0,
                                        class: _normalizeClass(["text-[10px] font-bold px-2 py-1 rounded-md shrink-0", Math.abs(_ctx.realExpenditure.diff) < 100 ? 'bg-salvia/10 text-salvia' : 'bg-viola/10 text-viola'])
                                      }, _toDisplayString(Math.abs(_ctx.realExpenditure.diff) < 100 ? 'come la stima' : (_ctx.realExpenditure.diff > 0 ? '+' : '') + _ctx.realExpenditure.diff + ' sulla stima'), 3 /* TEXT, CLASS */))
                                    : _createCommentVNode("v-if", true)
                                ]),
                                (!_ctx.realExpenditure.ready)
                                  ? (_openBlock(), _createElementBlock("div", _hoisted_383, [
                                      _createElementVNode("div", {
                                        class: "h-full cangiante-btn rounded-full transition-all",
                                        style: _normalizeStyle({ width: Math.max(4, _ctx.realExpenditure.progress) + '%' })
                                      }, null, 4 /* STYLE */)
                                    ]))
                                  : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                                      _createElementVNode("div", _hoisted_384, [
                                        _createElementVNode("div", _hoisted_385, [
                                          _cache[547] || (_cache[547] = _createElementVNode("div", { class: "text-[9px] font-bold text-sky-600 uppercase tracking-wider" }, "Dimagrire", -1 /* CACHED */)),
                                          _createElementVNode("div", _hoisted_386, _toDisplayString(_ctx.formatNumber(_ctx.realExpenditure.lose)), 1 /* TEXT */)
                                        ]),
                                        _createElementVNode("div", _hoisted_387, [
                                          _cache[548] || (_cache[548] = _createElementVNode("div", { class: "text-[9px] font-bold text-salvia uppercase tracking-wider" }, "Mantenere", -1 /* CACHED */)),
                                          _createElementVNode("div", _hoisted_388, _toDisplayString(_ctx.formatNumber(_ctx.realExpenditure.tdee)), 1 /* TEXT */)
                                        ]),
                                        _createElementVNode("div", _hoisted_389, [
                                          _cache[549] || (_cache[549] = _createElementVNode("div", { class: "text-[9px] font-bold text-arancione uppercase tracking-wider" }, "Aumentare", -1 /* CACHED */)),
                                          _createElementVNode("div", _hoisted_390, _toDisplayString(_ctx.formatNumber(_ctx.realExpenditure.gain)), 1 /* TEXT */)
                                        ])
                                      ]),
                                      _createElementVNode("div", _hoisted_391, [
                                        _cache[550] || (_cache[550] = _createElementVNode("span", { class: "text-[10px] font-bold text-gray-400 shrink-0" }, "Precisione", -1 /* CACHED */)),
                                        _createElementVNode("div", _hoisted_392, [
                                          _createElementVNode("div", {
                                            class: "h-full bg-salvia rounded-full",
                                            style: _normalizeStyle({ width: Math.round(_ctx.realExpenditure.confidence * 100) + '%' })
                                          }, null, 4 /* STYLE */)
                                        ]),
                                        _createElementVNode("span", _hoisted_393, _toDisplayString(_ctx.realExpenditure.days) + " giorni · " + _toDisplayString(_ctx.realExpenditure.weighIns) + " pesate", 1 /* TEXT */)
                                      ]),
                                      (_ctx.realExpenditure.suspicious)
                                        ? (_openBlock(), _createElementBlock("p", _hoisted_394, "Risulta che mangi molto meno di quanto servirebbe per il tuo peso: forse non segni proprio tutto (condimenti, bevande, assaggi). Il calcolo è preciso solo se segni tutto."))
                                        : _createCommentVNode("v-if", true)
                                    ], 64 /* STABLE_FRAGMENT */)),
                                (_ctx.bodyInfoOpen === 'real')
                                  ? (_openBlock(), _createElementBlock("p", _hoisted_395, [...(_cache[551] || (_cache[551] = [
                                      _createTextVNode(" Il fabbisogno qui sopra è una formula uguale per tutti. Questo invece è il ", -1 /* CACHED */),
                                      _createElementVNode("b", null, "tuo", -1 /* CACHED */),
                                      _createTextVNode(": guardo le giornate segnate per intero delle ultime 4 settimane (tutti i pasti del piano, oppure almeno pranzo e cena nel diario) e come cambia il peso. Se mangi 2.000 kcal e perdi mezzo chilo a settimana, in realtà ne consumi circa 2.550. Più giorni segni, più è preciso. Pesati sempre nelle stesse condizioni (mattina, a digiuno). ", -1 /* CACHED */)
                                    ]))]))
                                  : _createCommentVNode("v-if", true)
                              ]))
                            : _createCommentVNode("v-if", true),
                          _createElementVNode("div", _hoisted_396, [
                            (_ctx.bodyStats.bmi)
                              ? (_openBlock(), _createElementBlock("div", {
                                  key: 0,
                                  onClick: _cache[83] || (_cache[83] = $event => (_ctx.toggleBodyInfo('bmi'))),
                                  role: "button",
                                  class: _normalizeClass(["bg-white rounded-2xl p-4 border border-gray-100 shadow-sm cursor-pointer", _ctx.bodyInfoOpen === 'bmi' ? 'col-span-2' : ''])
                                }, [
                                  _cache[552] || (_cache[552] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, "BMI", -1 /* CACHED */)),
                                  _createElementVNode("div", _hoisted_397, _toDisplayString(_ctx.formatNumber(Math.round(_ctx.bodyStats.bmi.value * 10) / 10)), 1 /* TEXT */),
                                  _createElementVNode("div", {
                                    class: _normalizeClass(["text-[11px] font-bold", _ctx.bodyStats.bmi.color])
                                  }, _toDisplayString(_ctx.bodyStats.bmi.label), 3 /* TEXT, CLASS */),
                                  _cache[553] || (_cache[553] = _createStaticVNode("<div class=\"relative mt-2 h-1.5 rounded-full overflow-hidden flex\"><div class=\"h-full bg-sky-400\" style=\"width:17.5%;\"></div><div class=\"h-full bg-salvia\" style=\"width:32.5%;\"></div><div class=\"h-full bg-arancione\" style=\"width:25%;\"></div><div class=\"h-full bg-red-500\" style=\"width:25%;\"></div></div>", 1)),
                                  _createElementVNode("div", _hoisted_398, [
                                    _createElementVNode("div", {
                                      class: "absolute -top-0.5 w-1.5 h-2.5 rounded-full bg-antracite ring-2 ring-white",
                                      style: _normalizeStyle({ left: 'calc(' + _ctx.bodyStats.bmi.pos + '% - 3px)' })
                                    }, null, 4 /* STYLE */)
                                  ]),
                                  (_ctx.bodyInfoOpen === 'bmi')
                                    ? (_openBlock(), _createElementBlock("p", _hoisted_399, "Peso diviso altezza al quadrato. Normopeso tra 18,5 e 25. Non distingue muscoli e grasso: chi ha tanta massa muscolare può risultare \"sovrappeso\" pur essendo in forma, per questo guarda anche la massa grassa."))
                                    : _createCommentVNode("v-if", true)
                                ], 2 /* CLASS */))
                              : _createCommentVNode("v-if", true),
                            (_ctx.bodyStats.bodyFat)
                              ? (_openBlock(), _createElementBlock("div", {
                                  key: 1,
                                  onClick: _cache[84] || (_cache[84] = $event => (_ctx.toggleBodyInfo('fat'))),
                                  role: "button",
                                  class: _normalizeClass(["bg-white rounded-2xl p-4 border border-gray-100 shadow-sm cursor-pointer", _ctx.bodyInfoOpen === 'fat' ? 'col-span-2' : ''])
                                }, [
                                  _cache[555] || (_cache[555] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, "Massa grassa", -1 /* CACHED */)),
                                  _createElementVNode("div", _hoisted_400, [
                                    _createTextVNode(_toDisplayString(_ctx.formatNumber(Math.round(_ctx.bodyStats.bodyFat.value * 10) / 10)), 1 /* TEXT */),
                                    _cache[554] || (_cache[554] = _createElementVNode("span", { class: "text-sm font-bold text-gray-400" }, "%", -1 /* CACHED */))
                                  ]),
                                  _createElementVNode("div", {
                                    class: _normalizeClass(["text-[11px] font-bold", _ctx.bodyStats.bodyFat.color])
                                  }, _toDisplayString(_ctx.bodyStats.bodyFat.label), 3 /* TEXT, CLASS */),
                                  _createElementVNode("div", _hoisted_401, _toDisplayString(_ctx.formatNumber(Math.round(_ctx.bodyStats.bodyFat.leanKg * 10) / 10)) + " kg magri · " + _toDisplayString(_ctx.formatNumber(Math.round(_ctx.bodyStats.bodyFat.fatKg * 10) / 10)) + " kg grasso", 1 /* TEXT */),
                                  (_ctx.bodyInfoOpen === 'fat')
                                    ? (_openBlock(), _createElementBlock("p", _hoisted_402, "Stima " + _toDisplayString(_ctx.bodyStats.bodyFat.method) + " (formula " + _toDisplayString(_ctx.bodyStats.waist ? 'RFM' : 'Deurenberg') + "). Non è precisa come una plicometria o una bioimpedenza, ma è ottima per vedere la tendenza nel tempo: " + _toDisplayString(_ctx.bodyStats.waist ? 'misura la vita sempre allo stesso modo, all\'altezza dell\'ombelico.' : 'aggiungi la circonferenza vita per una stima migliore.'), 1 /* TEXT */))
                                    : _createCommentVNode("v-if", true)
                                ], 2 /* CLASS */))
                              : _createCommentVNode("v-if", true),
                            (_ctx.bodyStats.whtr)
                              ? (_openBlock(), _createElementBlock("div", {
                                  key: 2,
                                  onClick: _cache[85] || (_cache[85] = $event => (_ctx.toggleBodyInfo('whtr'))),
                                  role: "button",
                                  class: _normalizeClass(["bg-white rounded-2xl p-4 border border-gray-100 shadow-sm cursor-pointer", _ctx.bodyInfoOpen === 'whtr' ? 'col-span-2' : ''])
                                }, [
                                  _cache[556] || (_cache[556] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, "Vita / altezza", -1 /* CACHED */)),
                                  _createElementVNode("div", _hoisted_403, _toDisplayString(_ctx.bodyStats.whtr.value.toFixed(2).replace('.', ',')), 1 /* TEXT */),
                                  _createElementVNode("div", {
                                    class: _normalizeClass(["text-[11px] font-bold", _ctx.bodyStats.whtr.color])
                                  }, _toDisplayString(_ctx.bodyStats.whtr.label), 3 /* TEXT, CLASS */),
                                  (_ctx.bodyInfoOpen === 'whtr')
                                    ? (_openBlock(), _createElementBlock("p", _hoisted_404, "Circonferenza vita divisa per l'altezza. Sotto 0,5 è il valore consigliato: la regola è \"la vita sotto la metà della tua altezza\". Indica il grasso addominale meglio del BMI."))
                                    : _createCommentVNode("v-if", true)
                                ], 2 /* CLASS */))
                              : _createCommentVNode("v-if", true),
                            (_ctx.bodyStats.idealWeight)
                              ? (_openBlock(), _createElementBlock("div", {
                                  key: 3,
                                  onClick: _cache[86] || (_cache[86] = $event => (_ctx.toggleBodyInfo('ideal'))),
                                  role: "button",
                                  class: _normalizeClass(["bg-white rounded-2xl p-4 border border-gray-100 shadow-sm cursor-pointer", _ctx.bodyInfoOpen === 'ideal' ? 'col-span-2' : ''])
                                }, [
                                  _cache[558] || (_cache[558] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, "Peso forma", -1 /* CACHED */)),
                                  _createElementVNode("div", _hoisted_405, [
                                    _createTextVNode(_toDisplayString(Math.round(_ctx.bodyStats.idealWeight.min)) + "–" + _toDisplayString(Math.round(_ctx.bodyStats.idealWeight.max)) + " ", 1 /* TEXT */),
                                    _cache[557] || (_cache[557] = _createElementVNode("span", { class: "text-xs font-bold text-gray-400" }, "kg", -1 /* CACHED */))
                                  ]),
                                  _createElementVNode("div", {
                                    class: _normalizeClass(["text-[11px] font-bold", _ctx.bodyStats.idealWeight.delta === 0 ? 'text-salvia' : 'text-arancione'])
                                  }, _toDisplayString(_ctx.bodyStats.idealWeight.delta === 0 ? 'Ci sei dentro' : (_ctx.bodyStats.idealWeight.delta > 0 ? '+' : '') + _ctx.formatNumber(Math.round(_ctx.bodyStats.idealWeight.delta * 10) / 10) + ' kg'), 3 /* TEXT, CLASS */),
                                  (_ctx.bodyInfoOpen === 'ideal')
                                    ? (_openBlock(), _createElementBlock("p", _hoisted_406, "L'intervallo di peso con BMI tra 18,5 e 25 per la tua altezza. È un riferimento generale: con molta massa muscolare il tuo peso ideale può essere più alto."))
                                    : _createCommentVNode("v-if", true)
                                ], 2 /* CLASS */))
                              : _createCommentVNode("v-if", true),
                            (_ctx.bodyStats.water)
                              ? (_openBlock(), _createElementBlock("div", {
                                  key: 4,
                                  onClick: _cache[87] || (_cache[87] = $event => (_ctx.toggleBodyInfo('water'))),
                                  role: "button",
                                  class: _normalizeClass(["bg-white rounded-2xl p-4 border border-gray-100 shadow-sm cursor-pointer", _ctx.bodyInfoOpen === 'water' ? 'col-span-2' : ''])
                                }, [
                                  _cache[560] || (_cache[560] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, "💧 Acqua", -1 /* CACHED */)),
                                  _createElementVNode("div", _hoisted_407, [
                                    _createTextVNode(_toDisplayString(_ctx.formatNumber(_ctx.bodyStats.water)) + " ", 1 /* TEXT */),
                                    _cache[559] || (_cache[559] = _createElementVNode("span", { class: "text-sm font-bold text-gray-400" }, "L", -1 /* CACHED */))
                                  ]),
                                  _cache[561] || (_cache[561] = _createElementVNode("div", { class: "text-[11px] font-bold text-sky-600" }, "al giorno", -1 /* CACHED */)),
                                  (_ctx.bodyInfoOpen === 'water')
                                    ? (_openBlock(), _createElementBlock("p", _hoisted_408, "Circa 35 ml per ogni kg di peso, più mezzo litro per ogni ora di allenamento (in media sulla settimana). Con il caldo o se sudi molto bevi di più."))
                                    : _createCommentVNode("v-if", true)
                                ], 2 /* CLASS */))
                              : _createCommentVNode("v-if", true),
                            (_ctx.bodyStats.protein)
                              ? (_openBlock(), _createElementBlock("div", {
                                  key: 5,
                                  onClick: _cache[88] || (_cache[88] = $event => (_ctx.toggleBodyInfo('protein'))),
                                  role: "button",
                                  class: _normalizeClass(["bg-white rounded-2xl p-4 border border-gray-100 shadow-sm cursor-pointer", _ctx.bodyInfoOpen === 'protein' ? 'col-span-2' : ''])
                                }, [
                                  _cache[563] || (_cache[563] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, "🥩 Proteine", -1 /* CACHED */)),
                                  _createElementVNode("div", _hoisted_409, [
                                    _createTextVNode(_toDisplayString(_ctx.bodyStats.protein.min) + "–" + _toDisplayString(_ctx.bodyStats.protein.max) + " ", 1 /* TEXT */),
                                    _cache[562] || (_cache[562] = _createElementVNode("span", { class: "text-xs font-bold text-gray-400" }, "g", -1 /* CACHED */))
                                  ]),
                                  _cache[564] || (_cache[564] = _createElementVNode("div", { class: "text-[11px] font-bold text-viola" }, "al giorno", -1 /* CACHED */)),
                                  (_ctx.bodyInfoOpen === 'protein')
                                    ? (_openBlock(), _createElementBlock("p", _hoisted_410, _toDisplayString(_ctx.bodyStats.protein.active ? 'Ti alleni con costanza: 1,6–2 g per kg di peso aiutano a costruire e mantenere i muscoli.' : '1–1,2 g per kg di peso. Se inizi ad allenarti spesso, il fabbisogno sale fino a 1,6–2 g/kg.'), 1 /* TEXT */))
                                    : _createCommentVNode("v-if", true)
                                ], 2 /* CLASS */))
                              : _createCommentVNode("v-if", true)
                          ]),
                          _cache[566] || (_cache[566] = _createElementVNode("p", { class: "text-[10px] font-medium text-gray-400 px-1 leading-snug" }, "Stime calcolate con formule scientifiche standard: utili per orientarti, non sostituiscono il parere del tuo nutrizionista o medico.", -1 /* CACHED */))
                        ]),
                        _createElementVNode("div", _hoisted_411, [
                          _createElementVNode("div", _hoisted_412, [
                            _cache[567] || (_cache[567] = _createElementVNode("h4", { class: "text-xs font-bold text-gray-500 uppercase tracking-widest" }, "Circonferenze", -1 /* CACHED */)),
                            (_ctx.circumferenceRows.length === 0)
                              ? (_openBlock(), _createElementBlock("span", _hoisted_413, "Nessuna misura"))
                              : _createCommentVNode("v-if", true)
                          ]),
                          (_ctx.circumferenceRows.length === 0)
                            ? (_openBlock(), _createElementBlock("div", _hoisted_414, " Aggiungi petto, braccia e vita dalla scheda di misurazione. "))
                            : _createCommentVNode("v-if", true),
                          _createElementVNode("div", _hoisted_415, [
                            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.circumferenceRows, (row) => {
                              return (_openBlock(), _createElementBlock("div", {
                                key: row.key,
                                onClick: $event => (_ctx.openHistory(row.key)),
                                role: "button",
                                class: "flex items-center justify-between gap-2 p-4 bg-white border border-gray-100 shadow-sm rounded-2xl cursor-pointer hover:border-salvia/40 transition-colors active:scale-[0.99]"
                              }, [
                                _createElementVNode("div", _hoisted_417, [
                                  _createElementVNode("div", _hoisted_418, _toDisplayString(row.icon), 1 /* TEXT */),
                                  _createElementVNode("div", _hoisted_419, [
                                    _createElementVNode("span", _hoisted_420, _toDisplayString(row.label), 1 /* TEXT */),
                                    _createElementVNode("span", _hoisted_421, _toDisplayString(row.count) + " misur" + _toDisplayString(row.count === 1 ? 'azione' : 'azioni'), 1 /* TEXT */)
                                  ])
                                ]),
                                _createElementVNode("div", _hoisted_422, [
                                  _createElementVNode("div", _hoisted_423, [
                                    _createElementVNode("div", _hoisted_424, [
                                      _createElementVNode("span", _hoisted_425, _toDisplayString(_ctx.formatNumber(row.initial)) + " cm", 1 /* TEXT */),
                                      _cache[568] || (_cache[568] = _createElementVNode("svg", {
                                        class: "w-3 h-3 text-gray-300",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        "stroke-width": "2.5"
                                      }, [
                                        _createElementVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          d: "M9 5l7 7-7 7"
                                        })
                                      ], -1 /* CACHED */)),
                                      _createElementVNode("span", {
                                        class: _normalizeClass(["text-sm font-extrabold", row.currentColor])
                                      }, _toDisplayString(_ctx.formatNumber(row.current)) + " cm", 3 /* TEXT, CLASS */)
                                    ]),
                                    (row.count > 1)
                                      ? (_openBlock(), _createElementBlock("div", {
                                          key: 0,
                                          class: _normalizeClass(["text-[10px] font-bold mt-0.5", row.deltaColor])
                                        }, [
                                          _createTextVNode(_toDisplayString(row.deltaText), 1 /* TEXT */),
                                          (row.days > 0)
                                            ? (_openBlock(), _createElementBlock("span", _hoisted_426, " in " + _toDisplayString(row.days) + " gg", 1 /* TEXT */))
                                            : _createCommentVNode("v-if", true)
                                        ], 2 /* CLASS */))
                                      : (_openBlock(), _createElementBlock("div", _hoisted_427, "Prima misurazione"))
                                  ]),
                                  _cache[569] || (_cache[569] = _createElementVNode("svg", {
                                    class: "w-4 h-4 text-gray-300 flex-shrink-0",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    "stroke-width": "2.5"
                                  }, [
                                    _createElementVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      d: "M9 5l7 7-7 7"
                                    })
                                  ], -1 /* CACHED */))
                                ])
                              ], 8 /* PROPS */, _hoisted_416))
                            }), 128 /* KEYED_FRAGMENT */))
                          ])
                        ]),
                        _createElementVNode("div", _hoisted_428, [
                          _createElementVNode("div", _hoisted_429, [
                            _cache[570] || (_cache[570] = _createElementVNode("h4", { class: "text-xs font-bold text-gray-500 uppercase tracking-widest" }, "Progressi Allenamento", -1 /* CACHED */)),
                            (_ctx.workoutGroups.length === 0)
                              ? (_openBlock(), _createElementBlock("span", _hoisted_430, "Nessun carico"))
                              : _createCommentVNode("v-if", true)
                          ]),
                          (_ctx.trainingTimeSummary.total > 0)
                            ? (_openBlock(), _createElementBlock("div", _hoisted_431, [
                                _cache[575] || (_cache[575] = _createElementVNode("div", { class: "absolute -top-10 -right-10 w-40 h-40 bg-arancione/25 rounded-full blur-3xl pointer-events-none" }, null, -1 /* CACHED */)),
                                _createElementVNode("div", _hoisted_432, [
                                  _createElementVNode("div", null, [
                                    _cache[571] || (_cache[571] = _createElementVNode("div", { class: "text-[10px] font-bold text-white/50 uppercase tracking-widest" }, "⏱️ Ore di allenamento", -1 /* CACHED */)),
                                    _createElementVNode("div", _hoisted_433, _toDisplayString(_ctx.shortDuration(_ctx.trainingTimeSummary.total)), 1 /* TEXT */),
                                    _cache[572] || (_cache[572] = _createElementVNode("div", { class: "text-[11px] font-medium text-white/60 mt-0.5" }, "da quando usi STILL", -1 /* CACHED */))
                                  ]),
                                  _createElementVNode("div", _hoisted_434, [
                                    _createElementVNode("div", null, [
                                      _cache[573] || (_cache[573] = _createElementVNode("div", { class: "text-[9px] font-bold text-white/40 uppercase tracking-wider" }, "Settimana", -1 /* CACHED */)),
                                      _createElementVNode("div", _hoisted_435, _toDisplayString(_ctx.shortDuration(_ctx.trainingTimeSummary.week)), 1 /* TEXT */)
                                    ]),
                                    _createElementVNode("div", null, [
                                      _cache[574] || (_cache[574] = _createElementVNode("div", { class: "text-[9px] font-bold text-white/40 uppercase tracking-wider" }, "Mese", -1 /* CACHED */)),
                                      _createElementVNode("div", _hoisted_436, _toDisplayString(_ctx.shortDuration(_ctx.trainingTimeSummary.month)), 1 /* TEXT */)
                                    ])
                                  ])
                                ]),
                                (_ctx.trainingTimeSummary.gym && _ctx.trainingTimeSummary.sport)
                                  ? (_openBlock(), _createElementBlock("div", _hoisted_437, [
                                      _createElementVNode("div", _hoisted_438, [
                                        _createElementVNode("div", {
                                          class: "h-full bg-arancione",
                                          style: _normalizeStyle({ width: (_ctx.trainingTimeSummary.gym / _ctx.trainingTimeSummary.total * 100) + '%' })
                                        }, null, 4 /* STYLE */),
                                        _createElementVNode("div", {
                                          class: "h-full bg-viola",
                                          style: _normalizeStyle({ width: (_ctx.trainingTimeSummary.sport / _ctx.trainingTimeSummary.total * 100) + '%' })
                                        }, null, 4 /* STYLE */)
                                      ]),
                                      _createElementVNode("div", _hoisted_439, [
                                        _createElementVNode("span", null, "💪 Palestra " + _toDisplayString(_ctx.shortDuration(_ctx.trainingTimeSummary.gym)), 1 /* TEXT */),
                                        _createElementVNode("span", null, "🏅 Sport " + _toDisplayString(_ctx.shortDuration(_ctx.trainingTimeSummary.sport)), 1 /* TEXT */)
                                      ])
                                    ]))
                                  : _createCommentVNode("v-if", true)
                              ]))
                            : _createCommentVNode("v-if", true),
                          (_ctx.workoutGroups.length === 0)
                            ? (_openBlock(), _createElementBlock("div", _hoisted_440, " I progressi appariranno qui automaticamente quando registrerai le tue schede nella sezione Allenamento. "))
                            : _createCommentVNode("v-if", true),
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.workoutGroups, (group) => {
                            return (_openBlock(), _createElementBlock("div", {
                              key: group.key,
                              onClick: $event => (_ctx.openExerciseHistoryFromGroup(group)),
                              role: "button",
                              class: "bg-white rounded-2xl p-4 border border-gray-100 shadow-sm cursor-pointer hover:border-arancione/40 transition-colors active:scale-[0.995]"
                            }, [
                              _createElementVNode("div", _hoisted_442, [
                                _createElementVNode("div", null, [
                                  _createElementVNode("h5", _hoisted_443, _toDisplayString(group.label), 1 /* TEXT */),
                                  _createElementVNode("p", _hoisted_444, _toDisplayString(group.sessions) + " session" + _toDisplayString(group.sessions === 1 ? 'e' : 'i') + " • ultima " + _toDisplayString(_ctx.formatDate(group.lastDate)), 1 /* TEXT */)
                                ]),
                                _createElementVNode("span", {
                                  class: _normalizeClass(["text-[10px] font-bold px-2 py-1 rounded-lg whitespace-nowrap", group.classes])
                                }, _toDisplayString(group.deltaText), 3 /* TEXT, CLASS */)
                              ]),
                              _createElementVNode("div", _hoisted_445, [
                                _createElementVNode("div", _hoisted_446, [
                                  _createElementVNode("span", _hoisted_447, _toDisplayString(_ctx.formatNumber(group.lastLoad)), 1 /* TEXT */),
                                  _cache[576] || (_cache[576] = _createElementVNode("span", { class: "text-xs font-semibold text-gray-400" }, "kg", -1 /* CACHED */)),
                                  (group.lastReps)
                                    ? (_openBlock(), _createElementBlock("span", _hoisted_448, "× " + _toDisplayString(_ctx.formatNumber(group.lastReps)), 1 /* TEXT */))
                                    : _createCommentVNode("v-if", true)
                                ]),
                                _createElementVNode("span", _hoisted_449, [
                                  _createTextVNode("da " + _toDisplayString(_ctx.formatNumber(group.firstLoad)) + " kg ", 1 /* TEXT */),
                                  _cache[577] || (_cache[577] = _createElementVNode("svg", {
                                    class: "w-3.5 h-3.5 text-arancione",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    "stroke-width": "2.5"
                                  }, [
                                    _createElementVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      d: "M9 5l7 7-7 7"
                                    })
                                  ], -1 /* CACHED */))
                                ])
                              ])
                            ], 8 /* PROPS */, _hoisted_441))
                          }), 128 /* KEYED_FRAGMENT */))
                        ])
                      ], 64 /* STABLE_FRAGMENT */))
                ]))
              : _createCommentVNode("v-if", true),
            (_ctx.activeTab === 'trophies')
              ? (_openBlock(), _createElementBlock("div", _hoisted_450, [
                  _createElementVNode("div", _hoisted_451, [
                    _cache[578] || (_cache[578] = _createElementVNode("div", null, [
                      _createElementVNode("div", { class: "text-[10px] font-bold text-arancione tracking-widest uppercase" }, "SFIDE E TRAGUARDI"),
                      _createElementVNode("h2", { class: "text-2xl font-bold text-antracite" }, "I tuoi Trofei")
                    ], -1 /* CACHED */)),
                    _createElementVNode("span", _hoisted_452, "🏆 " + _toDisplayString(_ctx.playerLevel.trophies) + " su " + _toDisplayString(_ctx.playerLevel.trophyTotal), 1 /* TEXT */)
                  ]),
                  (_ctx.wrappedSeason)
                    ? (_openBlock(), _createElementBlock("button", {
                        key: 0,
                        onClick: _cache[89] || (_cache[89] = $event => (_ctx.openWrapped(_ctx.wrappedSeason.offset))),
                        class: "w-full rounded-3xl p-5 shadow-lg text-left relative overflow-hidden active:scale-[0.98] transition-transform",
                        style: {"background":"linear-gradient(135deg, #7A4DF1, #EC4899 60%, #F5A623)"}
                      }, [
                        _cache[579] || (_cache[579] = _createElementVNode("div", { class: "absolute -right-3 -bottom-6 text-[90px] opacity-25 select-none" }, "🎁", -1 /* CACHED */)),
                        _cache[580] || (_cache[580] = _createElementVNode("div", { class: "relative z-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/80" }, "Stile wrapped", -1 /* CACHED */)),
                        _createElementVNode("div", _hoisted_453, "Il tuo " + _toDisplayString(_ctx.wrappedSeason.year) + " su STILL", 1 /* TEXT */),
                        _cache[581] || (_cache[581] = _createElementVNode("p", { class: "relative z-10 text-[11px] font-medium text-white/85 mt-1 pr-12" }, "Pizze bruciate, salti da canguro, che atleta sei. Guardalo e condividilo nelle storie.", -1 /* CACHED */))
                      ]))
                    : _createCommentVNode("v-if", true),
                  _createElementVNode("div", _hoisted_454, [
                    _createElementVNode("div", _hoisted_455, [
                      _cache[583] || (_cache[583] = _createElementVNode("div", { class: "absolute -top-10 -left-10 w-40 h-40 bg-viola/30 rounded-full blur-3xl pointer-events-none" }, null, -1 /* CACHED */)),
                      _createElementVNode("div", _hoisted_456, [
                        _createElementVNode("div", _hoisted_457, [
                          _cache[582] || (_cache[582] = _createElementVNode("span", { class: "text-[9px] font-bold opacity-80" }, "LIVELLO", -1 /* CACHED */)),
                          _createElementVNode("span", _hoisted_458, _toDisplayString(_ctx.playerLevel.level), 1 /* TEXT */)
                        ]),
                        _createElementVNode("div", _hoisted_459, [
                          _createElementVNode("div", _hoisted_460, _toDisplayString(_ctx.playerLevel.title), 1 /* TEXT */),
                          _createElementVNode("div", _hoisted_461, [
                            _createElementVNode("div", {
                              class: "h-full cangiante-btn rounded-full transition-all",
                              style: _normalizeStyle({ width: Math.round(_ctx.playerLevel.progress * 100) + '%' })
                            }, null, 4 /* STYLE */)
                          ]),
                          _createElementVNode("div", _hoisted_462, [
                            _createElementVNode("span", null, _toDisplayString(_ctx.playerLevel.into) + " / " + _toDisplayString(_ctx.playerLevel.need) + " XP", 1 /* TEXT */),
                            _createElementVNode("span", null, _toDisplayString(_ctx.formatNumber(_ctx.playerLevel.xp)) + " XP totali", 1 /* TEXT */)
                          ])
                        ])
                      ]),
                      _cache[584] || (_cache[584] = _createElementVNode("p", { class: "relative z-10 text-[10px] font-medium text-white/45 mt-3 leading-snug" }, "Guadagni XP allenandoti, segnando i pasti, battendo i tuoi record, sbloccando trofei e condividendo le tue storie.", -1 /* CACHED */))
                    ]),
                    (_ctx.nextChallenges.length)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_463, [
                          _cache[585] || (_cache[585] = _createElementVNode("div", { class: "text-[10px] font-bold text-arancione uppercase tracking-widest" }, "🎯 Ci sei quasi", -1 /* CACHED */)),
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.nextChallenges, (g) => {
                            return (_openBlock(), _createElementBlock("button", {
                              key: 'nc' + g.id,
                              onClick: $event => (_ctx.openTrophyDetail(g)),
                              class: "w-full flex items-center gap-3 text-left"
                            }, [
                              _createElementVNode("div", {
                                class: "w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0",
                                style: _normalizeStyle({ background: g.next.tier.color + '22' })
                              }, _toDisplayString(g.icon), 5 /* TEXT, STYLE */),
                              _createElementVNode("div", _hoisted_465, [
                                _createElementVNode("div", _hoisted_466, [
                                  _createElementVNode("span", _hoisted_467, _toDisplayString(g.name) + " · " + _toDisplayString(g.next.tier.name), 1 /* TEXT */),
                                  _createElementVNode("span", _hoisted_468, _toDisplayString(Math.round(g.progress * 100)) + "%", 1 /* TEXT */)
                                ]),
                                _createElementVNode("div", _hoisted_469, [
                                  _createElementVNode("div", {
                                    class: "h-full rounded-full",
                                    style: _normalizeStyle({ width: Math.round(g.progress * 100) + '%', background: g.next.tier.color })
                                  }, null, 4 /* STYLE */)
                                ]),
                                _createElementVNode("div", _hoisted_470, _toDisplayString(g.next.target - g.value === 1 ? 'Manca' : 'Mancano') + " " + _toDisplayString(_ctx.formatNumber(g.next.target - g.value)) + " " + _toDisplayString(g.next.target - g.value === 1 ? g.one : g.unit), 1 /* TEXT */)
                              ])
                            ], 8 /* PROPS */, _hoisted_464))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]))
                      : _createCommentVNode("v-if", true),
                    _cache[586] || (_cache[586] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1" }, "Tutte le sfide", -1 /* CACHED */)),
                    _createElementVNode("div", _hoisted_471, [
                      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.trophyGroups, (g) => {
                        return (_openBlock(), _createElementBlock("button", {
                          key: 'tg' + g.id,
                          onClick: $event => (_ctx.openTrophyDetail(g)),
                          class: "bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm text-left active:scale-[0.98] transition-transform"
                        }, [
                          _createElementVNode("div", _hoisted_473, [
                            _createElementVNode("div", {
                              class: _normalizeClass(["w-10 h-10 rounded-xl flex items-center justify-center text-xl", g.current ? '' : 'bg-gray-100 grayscale opacity-60']),
                              style: _normalizeStyle(g.current ? { background: g.current.tier.color + '22' } : {})
                            }, _toDisplayString(g.icon), 7 /* TEXT, CLASS, STYLE */),
                            (g.current)
                              ? (_openBlock(), _createElementBlock("span", {
                                  key: 0,
                                  class: "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white",
                                  style: _normalizeStyle({ background: g.current.tier.color })
                                }, _toDisplayString(g.current.tier.name), 5 /* TEXT, STYLE */))
                              : (_openBlock(), _createElementBlock("span", _hoisted_474, "🔒 Da sbloccare"))
                          ]),
                          _createElementVNode("div", _hoisted_475, _toDisplayString(g.name), 1 /* TEXT */),
                          _createElementVNode("div", _hoisted_476, _toDisplayString(g.next ? _ctx.formatNumber(g.value) + ' / ' + _ctx.formatNumber(g.next.target) + ' ' + g.unit : 'Tutti sbloccati! 👑'), 1 /* TEXT */),
                          _createElementVNode("div", _hoisted_477, [
                            _createElementVNode("div", {
                              class: "h-full rounded-full transition-all",
                              style: _normalizeStyle({ width: Math.round(g.progress * 100) + '%', background: g.next ? g.next.tier.color : '#20C997' })
                            }, null, 4 /* STYLE */)
                          ])
                        ], 8 /* PROPS */, _hoisted_472))
                      }), 128 /* KEYED_FRAGMENT */))
                    ])
                  ])
                ]))
              : _createCommentVNode("v-if", true),
            (_ctx.activeTab === 'nutrition')
              ? (_openBlock(), _createElementBlock("div", _hoisted_478, [
                  (_ctx.nutritionView === 'list' || _ctx.nutritionView === 'calendar' || _ctx.nutritionView === 'diary')
                    ? (_openBlock(), _createElementBlock("div", _hoisted_479, [
                        _createElementVNode("button", {
                          onClick: _cache[90] || (_cache[90] = $event => {_ctx.nutritionView = 'list'; _ctx.exportMode = false}),
                          class: _normalizeClass(["flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5", _ctx.nutritionView === 'list' ? 'bg-salvia text-white shadow-sm' : 'text-gray-500 hover:text-antracite'])
                        }, [...(_cache[587] || (_cache[587] = [
                          _createElementVNode("svg", {
                            class: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            "stroke-width": "2"
                          }, [
                            _createElementVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M5 16h14M4 12h16c0-3.314-3.582-6-8-6S4 8.686 4 12zm0 4h16c0 1.657-1.343 3-3 3H7c-1.657 0-3-1.343-3-3z"
                            })
                          ], -1 /* CACHED */),
                          _createTextVNode(" Piani ", -1 /* CACHED */)
                        ]))], 2 /* CLASS */),
                        _createElementVNode("button", {
                          onClick: _cache[91] || (_cache[91] = $event => (_ctx.openDiary())),
                          class: _normalizeClass(["flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5", _ctx.nutritionView === 'diary' ? 'bg-salvia text-white shadow-sm' : 'text-gray-500 hover:text-antracite'])
                        }, [...(_cache[588] || (_cache[588] = [
                          _createElementVNode("svg", {
                            class: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            "stroke-width": "2"
                          }, [
                            _createElementVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M12 6.25v13m0-13C10.8 5.5 9.2 5 7.5 5S4.2 5.5 3 6.25v13C4.2 18.5 5.8 18 7.5 18s3.3.5 4.5 1.25m0-13C13.2 5.5 14.8 5 16.5 5s3.3.5 4.5 1.25v13C19.8 18.5 18.2 18 16.5 18s-3.3.5-4.5 1.25"
                            })
                          ], -1 /* CACHED */),
                          _createTextVNode(" Diario ", -1 /* CACHED */)
                        ]))], 2 /* CLASS */),
                        _createElementVNode("button", {
                          onClick: _cache[92] || (_cache[92] = $event => (_ctx.nutritionView = 'calendar')),
                          class: _normalizeClass(["flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5", _ctx.nutritionView === 'calendar' ? 'bg-salvia text-white shadow-sm' : 'text-gray-500 hover:text-antracite'])
                        }, [...(_cache[589] || (_cache[589] = [
                          _createElementVNode("svg", {
                            class: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            "stroke-width": "2"
                          }, [
                            _createElementVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
                            })
                          ], -1 /* CACHED */),
                          _createTextVNode(" Calendario ", -1 /* CACHED */)
                        ]))], 2 /* CLASS */)
                      ]))
                    : _createCommentVNode("v-if", true),
                  (_ctx.nutritionView === 'diary')
                    ? (_openBlock(), _createElementBlock("div", _hoisted_480, [
                        _createElementVNode("div", _hoisted_481, [
                          _cache[592] || (_cache[592] = _createElementVNode("div", null, [
                            _createElementVNode("div", { class: "text-[10px] font-bold text-salvia tracking-widest uppercase" }, "ALIMENTAZIONE"),
                            _createElementVNode("h2", { class: "text-2xl font-bold text-antracite" }, "Il tuo diario")
                          ], -1 /* CACHED */)),
                          _createElementVNode("div", _hoisted_482, [
                            _createElementVNode("button", {
                              onClick: _cache[93] || (_cache[93] = $event => (_ctx.diaryShift(-1))),
                              class: "w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 flex items-center justify-center",
                              "aria-label": "Giorno prima"
                            }, [...(_cache[590] || (_cache[590] = [
                              _createElementVNode("svg", {
                                class: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                "stroke-width": "2.5"
                              }, [
                                _createElementVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M15 19l-7-7 7-7"
                                })
                              ], -1 /* CACHED */)
                            ]))]),
                            _createElementVNode("span", _hoisted_483, _toDisplayString(_ctx.diaryDate === _ctx.todayDateKey ? 'Oggi' : _ctx.formatDate(_ctx.diaryDate)), 1 /* TEXT */),
                            _createElementVNode("button", {
                              onClick: _cache[94] || (_cache[94] = $event => (_ctx.diaryShift(1))),
                              disabled: _ctx.diaryDate >= _ctx.todayDateKey,
                              class: "w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 flex items-center justify-center disabled:opacity-30",
                              "aria-label": "Giorno dopo"
                            }, [...(_cache[591] || (_cache[591] = [
                              _createElementVNode("svg", {
                                class: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                "stroke-width": "2.5"
                              }, [
                                _createElementVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M9 5l7 7-7 7"
                                })
                              ], -1 /* CACHED */)
                            ]))], 8 /* PROPS */, _hoisted_484)
                          ])
                        ]),
                        _createElementVNode("div", _hoisted_485, [
                          _createElementVNode("div", _hoisted_486, [
                            _createElementVNode("div", null, [
                              _createElementVNode("div", _hoisted_487, _toDisplayString(_ctx.diaryDay.label), 1 /* TEXT */),
                              _createElementVNode("div", _hoisted_488, [
                                _createElementVNode("span", {
                                  class: _normalizeClass(["text-3xl font-extrabold", _ctx.diaryDay.kcal ? _ctx.intakeTextClass(_ctx.diaryDay.kcal, _ctx.diaryDay.target) : 'text-antracite'])
                                }, _toDisplayString(_ctx.formatNumber(_ctx.diaryDay.kcal)), 3 /* TEXT, CLASS */),
                                _createElementVNode("span", _hoisted_489, "/ " + _toDisplayString(_ctx.formatNumber(_ctx.diaryDay.target)) + " kcal", 1 /* TEXT */)
                              ])
                            ]),
                            (_ctx.diaryDay.status !== 'empty' && _ctx.diaryDay.status !== 'partial')
                              ? (_openBlock(), _createElementBlock("span", {
                                  key: 0,
                                  class: _normalizeClass(["shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold", _ctx.dayStatusClasses(_ctx.diaryDay.status)])
                                }, _toDisplayString(_ctx.dayStatusLabel(_ctx.diaryDay.status)), 3 /* TEXT, CLASS */))
                              : _createCommentVNode("v-if", true)
                          ]),
                          _createElementVNode("div", _hoisted_490, [
                            _createElementVNode("div", {
                              class: _normalizeClass(["h-full rounded-full transition-all duration-500", _ctx.intakeBarClass(_ctx.diaryDay.kcal, _ctx.diaryDay.target)]),
                              style: _normalizeStyle({ width: Math.min(100, Math.round(_ctx.diaryDay.kcal / Math.max(1, _ctx.diaryDay.target) * 100)) + '%' })
                            }, null, 6 /* CLASS, STYLE */)
                          ]),
                          _createElementVNode("div", _hoisted_491, [
                            (_ctx.diaryDay.kcal <= _ctx.diaryDay.target)
                              ? (_openBlock(), _createElementBlock("span", _hoisted_492, [
                                  _cache[593] || (_cache[593] = _createTextVNode("Ti restano ", -1 /* CACHED */)),
                                  _createElementVNode("b", _hoisted_493, "≈ " + _toDisplayString(_ctx.formatNumber(_ctx.diaryDay.target - _ctx.diaryDay.kcal)) + " kcal", 1 /* TEXT */)
                                ]))
                              : (_openBlock(), _createElementBlock("span", _hoisted_494, [
                                  _createElementVNode("b", {
                                    class: _normalizeClass(_ctx.intakeTextClass(_ctx.diaryDay.kcal, _ctx.diaryDay.target))
                                  }, "≈ " + _toDisplayString(_ctx.formatNumber(_ctx.diaryDay.kcal - _ctx.diaryDay.target)) + " kcal", 3 /* TEXT, CLASS */),
                                  _cache[594] || (_cache[594] = _createTextVNode(" oltre l'obiettivo", -1 /* CACHED */))
                                ])),
                            _createElementVNode("span", null, [
                              _createTextVNode("🥩 " + _toDisplayString(_ctx.diaryDay.protein) + " g", 1 /* TEXT */),
                              (_ctx.bodyStats.protein)
                                ? (_openBlock(), _createElementBlock("span", _hoisted_495, " / " + _toDisplayString(_ctx.bodyStats.protein.min) + " g", 1 /* TEXT */))
                                : _createCommentVNode("v-if", true)
                            ])
                          ]),
                          (_ctx.diaryDay.status === 'under')
                            ? (_openBlock(), _createElementBlock("p", _hoisted_496, "Hai mangiato molto meno del tuo fabbisogno. Ogni tanto capita, ma se succede spesso rallenta i risultati e ti toglie energie."))
                            : _createCommentVNode("v-if", true),
                          (_ctx.diaryDay.unknown)
                            ? (_openBlock(), _createElementBlock("p", _hoisted_497, "⚠️ " + _toDisplayString(_ctx.diaryDay.unknown) + " " + _toDisplayString(_ctx.diaryDay.unknown === 1 ? 'pasto ha' : 'pasti hanno') + " alimenti che non conosco: aggiungi le calorie a mano per un totale preciso.", 1 /* TEXT */))
                            : _createCommentVNode("v-if", true)
                        ]),
                        (_ctx.diaryDay.plan)
                          ? (_openBlock(), _createElementBlock("div", _hoisted_498, [
                              _createElementVNode("div", _hoisted_499, [
                                _cache[595] || (_cache[595] = _createElementVNode("div", { class: "text-[10px] font-black uppercase tracking-widest text-salvia" }, "📋 Il tuo piano", -1 /* CACHED */)),
                                _createElementVNode("button", {
                                  onClick: _cache[95] || (_cache[95] = $event => (_ctx.openDayMenuForDate(new Date(_ctx.diaryDate + 'T00:00:00')))),
                                  class: "text-[11px] font-bold text-salvia"
                                }, "Segna i pasti ›")
                              ]),
                              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.diaryDay.meals, (meal) => {
                                return (_openBlock(), _createElementBlock("div", {
                                  key: 'dp' + meal.id,
                                  class: "flex items-center justify-between gap-2 text-xs"
                                }, [
                                  _createElementVNode("span", _hoisted_500, _toDisplayString(meal.icon) + " " + _toDisplayString(meal.name), 1 /* TEXT */),
                                  _createElementVNode("span", {
                                    class: _normalizeClass(["shrink-0 font-bold", { done: 'text-salvia', other: 'text-viola', skipped: 'text-red-500' }[(_ctx.diaryDay.logs[meal.id] || {}).status] || 'text-gray-300'])
                                  }, [
                                    ((_ctx.diaryDay.logs[meal.id] || {}).status === 'done')
                                      ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                          _createTextVNode("✓ " + _toDisplayString(meal.calories || 0) + " kcal", 1 /* TEXT */)
                                        ], 64 /* STABLE_FRAGMENT */))
                                      : ((_ctx.diaryDay.logs[meal.id] || {}).status === 'other')
                                        ? (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                                            _createTextVNode("altro · " + _toDisplayString(_ctx.diaryDay.logs[meal.id].kcal ?? '?') + " kcal", 1 /* TEXT */)
                                          ], 64 /* STABLE_FRAGMENT */))
                                        : ((_ctx.diaryDay.logs[meal.id] || {}).status === 'skipped')
                                          ? (_openBlock(), _createElementBlock(_Fragment, { key: 2 }, [
                                              _createTextVNode("✕ saltato")
                                            ], 64 /* STABLE_FRAGMENT */))
                                          : (_openBlock(), _createElementBlock(_Fragment, { key: 3 }, [
                                              _createTextVNode("da segnare")
                                            ], 64 /* STABLE_FRAGMENT */))
                                  ], 2 /* CLASS */)
                                ]))
                              }), 128 /* KEYED_FRAGMENT */)),
                              _cache[596] || (_cache[596] = _createElementVNode("p", { class: "text-[10px] font-medium text-gray-500 leading-snug pt-1" }, [
                                _createTextVNode("Se mangi qualcosa di diverso tocca ✕ → "),
                                _createElementVNode("b", null, "Ho mangiato altro"),
                                _createTextVNode(": se rientra nelle calorie non è uno sgarro. Qui sotto puoi segnare i fuori pasto.")
                              ], -1 /* CACHED */))
                            ]))
                          : _createCommentVNode("v-if", true),
                        _createElementVNode("div", _hoisted_501, [
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList((_ctx.diaryDay.plan ? _ctx.DIARY_MEALS.filter(m => m.id === 'extra') : _ctx.DIARY_MEALS), (slot) => {
                            return (_openBlock(), _createElementBlock("button", {
                              key: 'ds' + slot.id,
                              onClick: $event => (_ctx.openDiaryEditor(_ctx.diaryDate, slot.id)),
                              class: _normalizeClass(["w-full bg-white rounded-2xl p-3.5 border shadow-sm flex items-center gap-3 text-left active:scale-[0.99] transition-all", _ctx.diaryDay.diary[slot.id] ? 'border-salvia/30' : 'border-gray-100'])
                            }, [
                              _createElementVNode("span", {
                                class: _normalizeClass(["w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0", _ctx.diaryDay.diary[slot.id] ? 'bg-salvia/10' : 'bg-gray-50'])
                              }, _toDisplayString(slot.icon), 3 /* TEXT, CLASS */),
                              _createElementVNode("span", _hoisted_503, [
                                _createElementVNode("span", _hoisted_504, _toDisplayString(slot.label), 1 /* TEXT */),
                                _createElementVNode("span", {
                                  class: _normalizeClass(["block text-[11px] font-medium leading-snug line-clamp-2", _ctx.diaryDay.diary[slot.id] ? 'text-gray-500' : 'text-gray-400'])
                                }, _toDisplayString(_ctx.diaryDay.diary[slot.id] ? _ctx.diaryDay.diary[slot.id].text || 'Calorie scritte a mano' : 'Aggiungi cosa hai mangiato'), 3 /* TEXT, CLASS */)
                              ]),
                              (_ctx.diaryDay.diary[slot.id])
                                ? (_openBlock(), _createElementBlock("span", _hoisted_505, _toDisplayString(_ctx.diaryDay.diary[slot.id].kcal !== null && _ctx.diaryDay.diary[slot.id].kcal !== undefined ? '≈ ' + _ctx.diaryDay.diary[slot.id].kcal : '?'), 1 /* TEXT */))
                                : (_openBlock(), _createElementBlock("span", _hoisted_506, "+"))
                            ], 10 /* CLASS, PROPS */, _hoisted_502))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]),
                        (!_ctx.diaryDay.plan && _ctx.diaryCopySource(_ctx.diaryDate))
                          ? (_openBlock(), _createElementBlock("button", {
                              key: 1,
                              onClick: _cache[96] || (_cache[96] = $event => (_ctx.copyDiaryFromPrev(_ctx.diaryDate))),
                              class: "w-full bg-salvia/10 border border-salvia/20 text-salvia rounded-2xl py-3 text-xs font-bold active:scale-[0.99] transition-all"
                            }, [
                              _createTextVNode(" ↺ Copia dal giorno prima: " + _toDisplayString(_ctx.diaryCopySource(_ctx.diaryDate).slots.length) + " " + _toDisplayString(_ctx.diaryCopySource(_ctx.diaryDate).slots.length === 1 ? 'pasto' : 'pasti'), 1 /* TEXT */),
                              (_ctx.diaryCopySource(_ctx.diaryDate).kcal)
                                ? (_openBlock(), _createElementBlock("span", _hoisted_507, " · ≈ " + _toDisplayString(_ctx.formatNumber(_ctx.diaryCopySource(_ctx.diaryDate).kcal)) + " kcal", 1 /* TEXT */))
                                : _createCommentVNode("v-if", true)
                            ]))
                          : _createCommentVNode("v-if", true),
                        (!_ctx.diaryDay.plan)
                          ? (_openBlock(), _createElementBlock("div", _hoisted_508, [
                              _createElementVNode("div", _hoisted_509, [
                                _cache[597] || (_cache[597] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "🎯 Il tuo obiettivo", -1 /* CACHED */)),
                                _createElementVNode("span", _hoisted_510, _toDisplayString(_ctx.formatNumber(_ctx.diaryTarget.kcal)) + " kcal al giorno", 1 /* TEXT */)
                              ]),
                              (_ctx.bodyStats.energy)
                                ? (_openBlock(), _createElementBlock("div", _hoisted_511, [
                                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList((_ctx.diaryTarget.adaptive ? [{ id: 'lose', l: 'Dimagrire', k: _ctx.realExpenditure.lose }, { id: 'keep', l: 'Mantenere', k: _ctx.realExpenditure.tdee }, { id: 'gain', l: 'Crescere', k: _ctx.realExpenditure.gain }] : [{ id: 'lose', l: 'Dimagrire', k: _ctx.bodyStats.energy.lose }, { id: 'keep', l: 'Mantenere', k: _ctx.bodyStats.energy.tdee }, { id: 'gain', l: 'Crescere', k: _ctx.bodyStats.energy.gain }]), (g) => {
                                      return (_openBlock(), _createElementBlock("button", {
                                        key: 'dg' + g.id,
                                        onClick: $event => (_ctx.setDiaryGoal(g.id)),
                                        class: _normalizeClass(["rounded-xl py-2 px-1 text-center border transition-all", !_ctx.diaryTarget.custom && _ctx.diaryGoal === g.id ? 'bg-salvia text-white border-salvia' : 'bg-gray-50 text-gray-500 border-gray-100'])
                                      }, [
                                        _createElementVNode("span", _hoisted_513, _toDisplayString(g.l), 1 /* TEXT */),
                                        _createElementVNode("span", _hoisted_514, _toDisplayString(_ctx.formatNumber(g.k)), 1 /* TEXT */)
                                      ], 10 /* CLASS, PROPS */, _hoisted_512))
                                    }), 128 /* KEYED_FRAGMENT */))
                                  ]))
                                : (_openBlock(), _createElementBlock("p", _hoisted_515, "Per ora uso 2000 kcal. Aggiungi età, altezza e peso nel profilo e in Progressi: calcolo il tuo fabbisogno.")),
                              (_ctx.realExpenditure.ready)
                                ? (_openBlock(), _createElementBlock("div", {
                                    key: 2,
                                    class: _normalizeClass(["rounded-2xl border px-3 py-2.5 flex items-center justify-between gap-3 transition-all", _ctx.diaryTarget.adaptive ? 'bg-salvia/10 border-salvia/30' : 'bg-gray-50 border-gray-100'])
                                  }, [
                                    _createElementVNode("div", _hoisted_516, [
                                      _cache[598] || (_cache[598] = _createElementVNode("div", { class: "text-xs font-bold text-antracite" }, "📈 Segui il consumo reale", -1 /* CACHED */)),
                                      _createElementVNode("p", _hoisted_517, "Dai tuoi pasti e dal peso consumi ≈ " + _toDisplayString(_ctx.formatNumber(_ctx.realExpenditure.tdee)) + " kcal. L'obiettivo si aggiorna da solo.", 1 /* TEXT */)
                                    ]),
                                    _createElementVNode("button", {
                                      onClick: _cache[97] || (_cache[97] = (...args) => (_ctx.toggleDiaryAdaptive && _ctx.toggleDiaryAdaptive(...args))),
                                      class: _normalizeClass(["w-11 h-6 rounded-full relative transition-colors flex-shrink-0", _ctx.diaryTarget.adaptive ? 'bg-salvia' : 'bg-gray-300']),
                                      "aria-label": "Segui il consumo reale"
                                    }, [
                                      _createElementVNode("div", {
                                        class: _normalizeClass(["w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform shadow", _ctx.diaryTarget.adaptive ? 'translate-x-5' : ''])
                                      }, null, 2 /* CLASS */)
                                    ], 2 /* CLASS */)
                                  ], 2 /* CLASS */))
                                : (_ctx.bodyStats.energy)
                                  ? (_openBlock(), _createElementBlock("p", _hoisted_518, "📈 " + _toDisplayString(_ctx.realExpNeedText) + " Poi calcolo il tuo consumo reale e l'obiettivo si regola da solo.", 1 /* TEXT */))
                                  : _createCommentVNode("v-if", true),
                              _createElementVNode("label", _hoisted_519, [
                                _cache[599] || (_cache[599] = _createTextVNode(" Oppure scrivi il tuo: ", -1 /* CACHED */)),
                                _createElementVNode("input", {
                                  type: "text",
                                  inputmode: "numeric",
                                  value: _ctx.diaryTarget.custom ? _ctx.diaryTarget.kcal : '',
                                  onChange: _cache[98] || (_cache[98] = $event => (_ctx.setDiaryKcal($event.target.value))),
                                  placeholder: "es. 2200",
                                  class: "w-24 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-bold text-antracite outline-none focus:border-salvia"
                                }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_520),
                                _cache[600] || (_cache[600] = _createTextVNode(" kcal ", -1 /* CACHED */))
                              ])
                            ]))
                          : _createCommentVNode("v-if", true),
                        _createElementVNode("div", _hoisted_521, [
                          _createElementVNode("div", _hoisted_522, [
                            _cache[602] || (_cache[602] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "Ultimi 7 giorni", -1 /* CACHED */)),
                            (_ctx.diaryWeek.avg)
                              ? (_openBlock(), _createElementBlock("span", _hoisted_523, [
                                  _cache[601] || (_cache[601] = _createTextVNode("media ", -1 /* CACHED */)),
                                  _createElementVNode("b", _hoisted_524, "≈ " + _toDisplayString(_ctx.formatNumber(_ctx.diaryWeek.avg)) + " kcal", 1 /* TEXT */)
                                ]))
                              : _createCommentVNode("v-if", true)
                          ]),
                          _createElementVNode("div", _hoisted_525, [
                            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.diaryWeek.days, (d) => {
                              return (_openBlock(), _createElementBlock("button", {
                                key: 'dw' + d.key,
                                onClick: $event => (_ctx.diaryDate = d.key),
                                class: "flex flex-col items-center gap-1 h-full justify-end"
                              }, [
                                _createElementVNode("span", _hoisted_527, _toDisplayString(d.tracked ? Math.round(d.kcal / 100) / 10 + 'k' : ''), 1 /* TEXT */),
                                _createElementVNode("span", _hoisted_528, [
                                  _createElementVNode("span", {
                                    class: _normalizeClass(["absolute bottom-0 left-0 right-0 rounded-lg transition-all", ({ perfect: 'bg-salvia', small_cheat: 'bg-viola', cheat: 'bg-red-500', under: 'bg-amber-400', partial: 'bg-gray-300' })[d.status] || 'bg-gray-200']),
                                    style: _normalizeStyle({ height: d.pct + '%' })
                                  }, null, 6 /* CLASS, STYLE */)
                                ]),
                                _createElementVNode("span", {
                                  class: _normalizeClass(["text-[10px] font-extrabold", d.key === _ctx.diaryDate ? 'text-salvia' : 'text-gray-400'])
                                }, _toDisplayString(d.letter), 3 /* TEXT, CLASS */)
                              ], 8 /* PROPS */, _hoisted_526))
                            }), 128 /* KEYED_FRAGMENT */))
                          ]),
                          _createElementVNode("p", _hoisted_529, [
                            (_ctx.diaryWeek.tracked)
                              ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                  _createTextVNode(_toDisplayString(_ctx.diaryWeek.good) + " " + _toDisplayString(_ctx.diaryWeek.good === 1 ? 'giorno' : 'giorni') + " su " + _toDisplayString(_ctx.diaryWeek.tracked) + " nelle tue calorie. ", 1 /* TEXT */),
                                  _cache[603] || (_cache[603] = _createElementVNode("span", { class: "text-gray-400" }, "Verde: entro l'obiettivo · viola: un po' sopra · rosso: molto sopra · grigio: mancano pranzo o cena.", -1 /* CACHED */))
                                ], 64 /* STABLE_FRAGMENT */))
                              : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                                  _createTextVNode("Segna cosa mangi per qualche giorno: qui vedrai come va la settimana.")
                                ], 64 /* STABLE_FRAGMENT */))
                          ])
                        ]),
                        _createElementVNode("div", _hoisted_530, [
                          _cache[606] || (_cache[606] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1" }, "Altro da tracciare", -1 /* CACHED */)),
                          _createElementVNode("div", _hoisted_531, [
                            _cache[604] || (_cache[604] = _createElementVNode("div", { class: "min-w-0" }, [
                              _createElementVNode("div", { class: "text-sm font-bold text-antracite" }, "💧 Acqua"),
                              _createElementVNode("p", { class: "text-[10px] font-medium text-gray-500 leading-snug" }, "Bicchieri bevuti ogni giorno, nella home.")
                            ], -1 /* CACHED */)),
                            _createElementVNode("button", {
                              onClick: _cache[99] || (_cache[99] = $event => (_ctx.toggleHabit('water'))),
                              class: _normalizeClass(["w-11 h-6 rounded-full relative transition-colors flex-shrink-0", _ctx.habitOn('water') ? 'bg-salvia' : 'bg-gray-300']),
                              "aria-label": "Traccia l'acqua"
                            }, [
                              _createElementVNode("div", {
                                class: _normalizeClass(["w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform shadow", _ctx.habitOn('water') ? 'translate-x-5' : ''])
                              }, null, 2 /* CLASS */)
                            ], 2 /* CLASS */)
                          ]),
                          _createElementVNode("div", _hoisted_532, [
                            _cache[605] || (_cache[605] = _createElementVNode("div", { class: "min-w-0" }, [
                              _createElementVNode("div", { class: "text-sm font-bold text-antracite" }, "⏱️ Digiuno intermittente"),
                              _createElementVNode("p", { class: "text-[10px] font-medium text-gray-500 leading-snug" }, "Timer 12, 14, 16 o 18 ore, nella home.")
                            ], -1 /* CACHED */)),
                            _createElementVNode("button", {
                              onClick: _cache[100] || (_cache[100] = $event => (_ctx.toggleHabit('fasting'))),
                              class: _normalizeClass(["w-11 h-6 rounded-full relative transition-colors flex-shrink-0", _ctx.habitOn('fasting') ? 'bg-salvia' : 'bg-gray-300']),
                              "aria-label": "Traccia il digiuno"
                            }, [
                              _createElementVNode("div", {
                                class: _normalizeClass(["w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform shadow", _ctx.habitOn('fasting') ? 'translate-x-5' : ''])
                              }, null, 2 /* CLASS */)
                            ], 2 /* CLASS */)
                          ])
                        ]),
                        _cache[607] || (_cache[607] = _createElementVNode("p", { class: "text-[10px] font-medium text-gray-400 text-center leading-snug px-4" }, "Stime da valori medi: servono a regolarti, non a contare ogni caloria. Per una dieta su misura chiedi a un nutrizionista.", -1 /* CACHED */))
                      ]))
                    : _createCommentVNode("v-if", true),
                  (_ctx.nutritionView === 'list')
                    ? (_openBlock(), _createElementBlock("div", _hoisted_533, [
                        _createElementVNode("div", _hoisted_534, [
                          _cache[609] || (_cache[609] = _createElementVNode("div", null, [
                            _createElementVNode("div", { class: "text-[10px] font-bold text-salvia tracking-widest uppercase" }, "ALIMENTAZIONE"),
                            _createElementVNode("h2", { class: "text-2xl font-bold text-antracite" }, "I tuoi Piani")
                          ], -1 /* CACHED */)),
                          (_ctx.plans.length > 0)
                            ? (_openBlock(), _createElementBlock("button", {
                                key: 0,
                                onClick: _cache[101] || (_cache[101] = (...args) => (_ctx.startNewPlan && _ctx.startNewPlan(...args))),
                                class: "bg-salvia text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-md hover:bg-salvia/90 transition-all active:scale-95 flex items-center gap-1.5 flex-shrink-0"
                              }, [...(_cache[608] || (_cache[608] = [
                                _createElementVNode("svg", {
                                  class: "w-4 h-4",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24",
                                  "stroke-width": "2.5"
                                }, [
                                  _createElementVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M12 4v16m8-8H4"
                                  })
                                ], -1 /* CACHED */),
                                _createTextVNode(" Nuovo ", -1 /* CACHED */)
                              ]))]))
                            : _createCommentVNode("v-if", true)
                        ]),
                        _createElementVNode("button", {
                          onClick: _cache[102] || (_cache[102] = $event => (_ctx.openEatGuide())),
                          class: "w-full text-left bg-salvia rounded-3xl p-5 shadow-lg relative overflow-hidden active:scale-[0.98] transition-all"
                        }, [...(_cache[610] || (_cache[610] = [
                          _createElementVNode("div", { class: "absolute -right-4 -bottom-8 text-[90px] opacity-20 select-none" }, "🥗", -1 /* CACHED */),
                          _createElementVNode("div", { class: "relative z-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/70" }, "Vuoi mangiare meglio?", -1 /* CACHED */),
                          _createElementVNode("div", { class: "relative z-10 text-lg font-extrabold text-white mt-1 leading-tight" }, "Consigli e giornate tipo", -1 /* CACHED */),
                          _createElementVNode("p", { class: "relative z-10 text-[11px] font-medium text-white/80 mt-1 leading-snug pr-10" }, "Abitudini semplici e menù di esempio da provare per una settimana. Un aiuto per iniziare, poi il nutrizionista.", -1 /* CACHED */)
                        ]))]),
                        (_ctx.plans.length === 0)
                          ? (_openBlock(), _createElementBlock("div", _hoisted_535, [
                              _cache[612] || (_cache[612] = _createStaticVNode("<div class=\"w-16 h-16 bg-salvia/10 rounded-full flex items-center justify-center text-salvia border border-salvia/20\"><svg class=\"w-8 h-8\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M5 16h14M4 12h16c0-3.314-3.582-6-8-6S4 8.686 4 12zm0 4h16c0 1.657-1.343 3-3 3H7c-1.657 0-3-1.343-3-3z\"></path></svg></div><div><h3 class=\"font-bold text-antracite text-lg\">Ancora nessun piano alimentare</h3><p class=\"text-sm text-gray-500 mt-1.5 leading-relaxed\">Crea il tuo primo piano: organizza i pasti per settimana, la lista della spesa si genera da sola e il menù del giorno comparirà in Dashboard.</p></div>", 2)),
                              _createElementVNode("button", {
                                onClick: _cache[103] || (_cache[103] = (...args) => (_ctx.startNewPlan && _ctx.startNewPlan(...args))),
                                class: "w-full bg-salvia text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-salvia/90 transition-all active:scale-95 flex items-center justify-center gap-2"
                              }, [...(_cache[611] || (_cache[611] = [
                                _createElementVNode("svg", {
                                  class: "w-5 h-5",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24",
                                  "stroke-width": "2.5"
                                }, [
                                  _createElementVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M12 4v16m8-8H4"
                                  })
                                ], -1 /* CACHED */),
                                _createTextVNode(" Crea il primo piano ", -1 /* CACHED */)
                              ]))])
                            ]))
                          : (_openBlock(), _createElementBlock("div", _hoisted_536, [
                              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.sortedPlans, (plan) => {
                                return (_openBlock(), _createElementBlock("div", {
                                  key: plan.id,
                                  onClick: $event => (_ctx.openPlan(plan)),
                                  class: "bg-white rounded-3xl p-5 border border-gray-100 shadow-soft cursor-pointer hover:border-salvia/50 transition-all flex items-center justify-between group"
                                }, [
                                  _createElementVNode("div", _hoisted_538, [
                                    _createElementVNode("div", {
                                      class: _normalizeClass(["w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold shadow-sm", plan.status === 'active' ? 'bg-salvia/10 text-salvia border border-salvia/20' : 'bg-gray-100 text-gray-400'])
                                    }, " 🍽️ ", 2 /* CLASS */),
                                    _createElementVNode("div", null, [
                                      _createElementVNode("div", _hoisted_539, [
                                        _createElementVNode("h4", _hoisted_540, _toDisplayString(plan.name), 1 /* TEXT */),
                                        (plan.status === 'active')
                                          ? (_openBlock(), _createElementBlock("span", _hoisted_541, "Attivo"))
                                          : _createCommentVNode("v-if", true)
                                      ]),
                                      _createElementVNode("p", _hoisted_542, "Dal " + _toDisplayString(_ctx.formatDate(plan.startDate)) + " al " + _toDisplayString(_ctx.formatDate(plan.endDate)), 1 /* TEXT */)
                                    ])
                                  ]),
                                  _cache[613] || (_cache[613] = _createElementVNode("div", { class: "text-gray-400 group-hover:text-salvia transition-colors" }, [
                                    _createElementVNode("svg", {
                                      class: "w-5 h-5",
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24"
                                    }, [
                                      _createElementVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M9 5l7 7-7 7"
                                      })
                                    ])
                                  ], -1 /* CACHED */))
                                ], 8 /* PROPS */, _hoisted_537))
                              }), 128 /* KEYED_FRAGMENT */))
                            ]))
                      ]))
                    : _createCommentVNode("v-if", true),
                  (_ctx.nutritionView === 'create')
                    ? (_openBlock(), _createElementBlock("div", _hoisted_543, [
                        _createElementVNode("div", _hoisted_544, [
                          _createElementVNode("button", {
                            onClick: _cache[104] || (_cache[104] = $event => (_ctx.nutritionView = 'list')),
                            class: "p-2.5 bg-white border border-gray-100 shadow-sm rounded-xl text-gray-400 hover:text-viola hover:border-viola/30 transition-colors"
                          }, [...(_cache[614] || (_cache[614] = [
                            _createElementVNode("svg", {
                              class: "w-5 h-5",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M15 19l-7-7 7-7"
                              })
                            ], -1 /* CACHED */)
                          ]))]),
                          _createElementVNode("div", null, [
                            _createElementVNode("div", _hoisted_545, _toDisplayString(_ctx.editingPlanId ? 'MODIFICA' : 'NUOVO INIZIO'), 1 /* TEXT */),
                            _createElementVNode("h2", _hoisted_546, _toDisplayString(_ctx.editingPlanId ? 'Modifica Piano' : 'Crea Piano'), 1 /* TEXT */)
                          ])
                        ]),
                        _createElementVNode("div", _hoisted_547, [
                          _cache[616] || (_cache[616] = _createStaticVNode("<div class=\"flex items-center gap-3\"><div class=\"w-11 h-11 shrink-0 rounded-2xl bg-viola/10 flex items-center justify-center text-xl\">📄</div><div class=\"flex-1 min-w-0\"><div class=\"text-sm font-bold text-antracite\">Hai la dieta in PDF o Word?</div><div class=\"text-[11px] font-medium text-gray-400 leading-snug\">La leggo io e compilo il menù: tu controlli e salvi.</div></div></div>", 1)),
                          _createElementVNode("label", {
                            class: _normalizeClass(["mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95", _ctx.pdfImport.busy ? 'bg-gray-100 text-gray-400 cursor-wait' : 'bg-viola/10 text-viola hover:bg-viola/15 cursor-pointer'])
                          }, [
                            _createElementVNode("input", {
                              type: "file",
                              accept: "application/pdf,.pdf,.docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword",
                              class: "hidden",
                              disabled: _ctx.pdfImport.busy,
                              onChange: _cache[105] || (_cache[105] = (...args) => (_ctx.importPlanPdf && _ctx.importPlanPdf(...args)))
                            }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_548),
                            (_ctx.pdfImport.busy)
                              ? (_openBlock(), _createElementBlock("svg", _hoisted_549, [...(_cache[615] || (_cache[615] = [
                                  _createElementVNode("circle", {
                                    cx: "12",
                                    cy: "12",
                                    r: "9",
                                    stroke: "currentColor",
                                    "stroke-width": "3",
                                    "stroke-dasharray": "40 20"
                                  }, null, -1 /* CACHED */)
                                ]))]))
                              : _createCommentVNode("v-if", true),
                            _createTextVNode(" " + _toDisplayString(_ctx.pdfImport.busy ? 'Sto leggendo la dieta…' : (_ctx.editingPlanId ? 'Sostituisci menù da file' : 'Carica PDF o Word')), 1 /* TEXT */)
                          ], 2 /* CLASS */),
                          (_ctx.pdfImport.error)
                            ? (_openBlock(), _createElementBlock("p", _hoisted_550, _toDisplayString(_ctx.pdfImport.error), 1 /* TEXT */))
                            : _createCommentVNode("v-if", true)
                        ]),
                        _cache[623] || (_cache[623] = _createElementVNode("div", { class: "flex items-center gap-3 text-[10px] font-bold text-gray-300 uppercase tracking-widest" }, [
                          _createElementVNode("div", { class: "flex-1 h-px bg-gray-200" }),
                          _createTextVNode("oppure a mano"),
                          _createElementVNode("div", { class: "flex-1 h-px bg-gray-200" })
                        ], -1 /* CACHED */)),
                        _createElementVNode("div", _hoisted_551, [
                          _createElementVNode("div", null, [
                            _cache[617] || (_cache[617] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 pl-1" }, "Nome del Piano", -1 /* CACHED */)),
                            _withDirectives(_createElementVNode("input", {
                              type: "text",
                              "onUpdate:modelValue": _cache[106] || (_cache[106] = $event => ((_ctx.newPlanData.name) = $event)),
                              placeholder: "Es: Definizione Estiva, Massa...",
                              class: "w-full bg-gray-50 border border-gray-200 focus:border-viola focus:ring-2 focus:ring-viola/20 rounded-2xl p-3.5 text-sm font-semibold text-antracite outline-none transition-all placeholder:font-medium"
                            }, null, 512 /* NEED_PATCH */), [
                              [_vModelText, _ctx.newPlanData.name]
                            ])
                          ]),
                          _createElementVNode("div", _hoisted_552, [
                            _createElementVNode("div", null, [
                              _cache[618] || (_cache[618] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 pl-1" }, "Data Inizio", -1 /* CACHED */)),
                              _withDirectives(_createElementVNode("input", {
                                type: "date",
                                "onUpdate:modelValue": _cache[107] || (_cache[107] = $event => ((_ctx.newPlanData.startDate) = $event)),
                                class: "w-full bg-gray-50 border border-gray-200 focus:border-viola focus:ring-2 focus:ring-viola/20 rounded-2xl p-3 text-sm font-semibold text-antracite outline-none transition-all"
                              }, null, 512 /* NEED_PATCH */), [
                                [_vModelText, _ctx.newPlanData.startDate]
                              ])
                            ]),
                            _createElementVNode("div", null, [
                              _cache[619] || (_cache[619] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 pl-1" }, "Data Fine", -1 /* CACHED */)),
                              _withDirectives(_createElementVNode("input", {
                                type: "date",
                                "onUpdate:modelValue": _cache[108] || (_cache[108] = $event => ((_ctx.newPlanData.endDate) = $event)),
                                class: "w-full bg-gray-50 border border-gray-200 focus:border-viola focus:ring-2 focus:ring-viola/20 rounded-2xl p-3 text-sm font-semibold text-antracite outline-none transition-all"
                              }, null, 512 /* NEED_PATCH */), [
                                [_vModelText, _ctx.newPlanData.endDate]
                              ])
                            ])
                          ]),
                          _createElementVNode("label", _hoisted_553, [
                            _withDirectives(_createElementVNode("input", {
                              type: "checkbox",
                              "onUpdate:modelValue": _cache[109] || (_cache[109] = $event => ((_ctx.newPlanData.makeActive) = $event)),
                              class: "w-5 h-5 text-viola rounded focus:ring-viola border-viola/30 accent-viola"
                            }, null, 512 /* NEED_PATCH */), [
                              [_vModelCheckbox, _ctx.newPlanData.makeActive]
                            ]),
                            _cache[620] || (_cache[620] = _createElementVNode("span", { class: "text-sm font-bold text-viola" }, "Imposta come piano attivo", -1 /* CACHED */))
                          ])
                        ]),
                        _createElementVNode("div", _hoisted_554, [
                          _createElementVNode("button", {
                            onClick: _cache[110] || (_cache[110] = (...args) => (_ctx.goToBuilder && _ctx.goToBuilder(...args))),
                            class: "w-full bg-viola text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-viola/90 transition-all active:scale-95 flex items-center justify-center gap-2"
                          }, [...(_cache[621] || (_cache[621] = [
                            _createTextVNode(" Avanti ", -1 /* CACHED */),
                            _createElementVNode("svg", {
                              class: "w-5 h-5",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 5l7 7-7 7"
                              })
                            ], -1 /* CACHED */)
                          ]))]),
                          (_ctx.editingPlanId)
                            ? (_openBlock(), _createElementBlock("button", {
                                key: 0,
                                onClick: _cache[111] || (_cache[111] = (...args) => (_ctx.promptDeletePlan && _ctx.promptDeletePlan(...args))),
                                class: "w-full bg-white border border-red-200 text-red-500 font-bold py-3.5 rounded-2xl shadow-sm hover:bg-red-50 transition-all active:scale-95 flex items-center justify-center gap-2"
                              }, [...(_cache[622] || (_cache[622] = [
                                _createElementVNode("svg", {
                                  class: "w-5 h-5",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  _createElementVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  })
                                ], -1 /* CACHED */),
                                _createTextVNode(" Elimina Piano ", -1 /* CACHED */)
                              ]))]))
                            : _createCommentVNode("v-if", true)
                        ])
                      ]))
                    : _createCommentVNode("v-if", true),
                  (_ctx.nutritionView === 'builder')
                    ? (_openBlock(), _createElementBlock("div", _hoisted_555, [
                        _createElementVNode("div", _hoisted_556, [
                          _createElementVNode("div", _hoisted_557, [
                            _createElementVNode("button", {
                              onClick: _cache[112] || (_cache[112] = $event => (_ctx.nutritionView = 'create')),
                              class: "p-2.5 bg-white border border-gray-100 shadow-sm rounded-xl text-gray-400 hover:text-viola hover:border-viola/30 transition-colors"
                            }, [...(_cache[624] || (_cache[624] = [
                              _createElementVNode("svg", {
                                class: "w-5 h-5",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                _createElementVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M15 19l-7-7 7-7"
                                })
                              ], -1 /* CACHED */)
                            ]))]),
                            _createElementVNode("div", null, [
                              _cache[625] || (_cache[625] = _createElementVNode("div", { class: "text-[10px] font-bold text-viola tracking-widest uppercase" }, "FASE 2", -1 /* CACHED */)),
                              _createElementVNode("h2", _hoisted_558, _toDisplayString(_ctx.editingPlanId ? 'Modifica Menù' : 'Costruisci Menù'), 1 /* TEXT */)
                            ])
                          ])
                        ]),
                        (_ctx.pdfImport.summary)
                          ? (_openBlock(), _createElementBlock("div", _hoisted_559, [
                              _createElementVNode("button", {
                                onClick: _cache[113] || (_cache[113] = $event => (_ctx.pdfImport.summary = null)),
                                class: "absolute top-2 right-3 text-gray-400 text-lg leading-none",
                                "aria-label": "Chiudi"
                              }, "×"),
                              _createElementVNode("div", _hoisted_560, [
                                _createTextVNode("✨ Letti dal file: " + _toDisplayString(_ctx.pdfImport.summary.meals) + " pasti, " + _toDisplayString(_ctx.pdfImport.summary.foods) + " alimenti", 1 /* TEXT */),
                                (_ctx.pdfImport.summary.weeks > 1)
                                  ? (_openBlock(), _createElementBlock("span", _hoisted_561, " in " + _toDisplayString(_ctx.pdfImport.summary.weeks) + " settimane", 1 /* TEXT */))
                                  : _createCommentVNode("v-if", true)
                              ]),
                              _cache[626] || (_cache[626] = _createElementVNode("p", { class: "text-[11px] font-medium text-gray-500 leading-snug mt-1" }, "Controlla giorno per giorno e correggi se serve, poi salva. Le calorie si calcolano da sole.", -1 /* CACHED */)),
                              (_ctx.pdfImport.summary.missing.length)
                                ? (_openBlock(), _createElementBlock("p", _hoisted_562, "Giorni vuoti: " + _toDisplayString(_ctx.pdfImport.summary.missing.join(', ')), 1 /* TEXT */))
                                : _createCommentVNode("v-if", true)
                            ]))
                          : _createCommentVNode("v-if", true),
                        _createElementVNode("div", _hoisted_563, [
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.newPlanBuilder.weeks, (week, wIdx) => {
                            return (_openBlock(), _createElementBlock("button", {
                              key: wIdx,
                              onClick: $event => (_ctx.newPlanBuilder.currentWeekIdx = wIdx),
                              class: _normalizeClass(["px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors", _ctx.newPlanBuilder.currentWeekIdx === wIdx ? 'bg-viola text-white shadow-md' : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'])
                            }, " Settimana " + _toDisplayString(wIdx + 1), 11 /* TEXT, CLASS, PROPS */, _hoisted_564))
                          }), 128 /* KEYED_FRAGMENT */)),
                          _createElementVNode("button", {
                            onClick: _cache[114] || (_cache[114] = (...args) => (_ctx.addWeekToBuilder && _ctx.addWeekToBuilder(...args))),
                            class: "px-3 py-2 rounded-xl text-xs font-bold bg-viola/10 text-viola whitespace-nowrap hover:bg-viola/20 transition-colors flex items-center gap-1"
                          }, [...(_cache[627] || (_cache[627] = [
                            _createElementVNode("svg", {
                              class: "w-4 h-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M12 4v16m8-8H4"
                              })
                            ], -1 /* CACHED */),
                            _createTextVNode(" Settimana ", -1 /* CACHED */)
                          ]))])
                        ]),
                        _createElementVNode("div", _hoisted_565, [
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.weekDays, (day) => {
                            return (_openBlock(), _createElementBlock("button", {
                              key: day,
                              onClick: $event => (_ctx.newPlanBuilder.currentDay = day),
                              class: _normalizeClass(["flex-1 min-w-[45px] py-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all", _ctx.newPlanBuilder.currentDay === day ? 'bg-viola/10 text-viola font-extrabold' : 'text-gray-400 font-bold hover:bg-gray-50'])
                            }, [
                              _createElementVNode("span", _hoisted_567, _toDisplayString(day.substring(0,3)), 1 /* TEXT */)
                            ], 10 /* CLASS, PROPS */, _hoisted_566))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]),
                        _createElementVNode("div", _hoisted_568, [
                          _createElementVNode("div", _hoisted_569, [
                            _createElementVNode("h3", _hoisted_570, "Pasti di " + _toDisplayString(_ctx.newPlanBuilder.currentDay), 1 /* TEXT */)
                          ]),
                          (_ctx.currentBuilderMeals.length === 0)
                            ? (_openBlock(), _createElementBlock("div", _hoisted_571, [...(_cache[628] || (_cache[628] = [
                                _createElementVNode("p", { class: "text-xs text-gray-400 font-medium" }, [
                                  _createTextVNode("Nessun pasto inserito."),
                                  _createElementVNode("br"),
                                  _createTextVNode("Inizia ad aggiungere i pasti per questa giornata.")
                                ], -1 /* CACHED */)
                              ]))]))
                            : _createCommentVNode("v-if", true),
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.currentBuilderMeals, (meal, mIdx) => {
                            return (_openBlock(), _createElementBlock("div", {
                              key: mIdx,
                              class: "bg-white rounded-3xl p-4 border border-gray-100 shadow-sm space-y-3 relative"
                            }, [
                              _createElementVNode("button", {
                                onClick: $event => (_ctx.removeMealFromBuilder(mIdx)),
                                class: "absolute top-4 right-4 text-red-400 hover:text-red-500"
                              }, [...(_cache[629] || (_cache[629] = [
                                _createElementVNode("svg", {
                                  class: "w-5 h-5",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  _createElementVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  })
                                ], -1 /* CACHED */)
                              ]))], 8 /* PROPS */, _hoisted_572),
                              _createElementVNode("div", _hoisted_573, [
                                _withDirectives(_createElementVNode("select", {
                                  "onUpdate:modelValue": $event => ((meal.type) = $event),
                                  class: "w-full bg-gray-50 border border-gray-200 focus:border-viola rounded-xl p-2.5 text-sm font-bold text-antracite outline-none appearance-none"
                                }, [
                                  (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.mealTypes, (t) => {
                                    return (_openBlock(), _createElementBlock("option", {
                                      key: t.id,
                                      value: t.id
                                    }, _toDisplayString(t.icon) + " " + _toDisplayString(t.label), 9 /* TEXT, PROPS */, _hoisted_575))
                                  }), 128 /* KEYED_FRAGMENT */))
                                ], 8 /* PROPS */, _hoisted_574), [
                                  [_vModelSelect, meal.type]
                                ])
                              ]),
                              _createElementVNode("div", _hoisted_576, [
                                _cache[630] || (_cache[630] = _createElementVNode("span", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1" }, "Calorie", -1 /* CACHED */)),
                                _withDirectives(_createElementVNode("input", {
                                  type: "text",
                                  inputmode: "numeric",
                                  "onUpdate:modelValue": $event => ((meal.calories) = $event),
                                  placeholder: _ctx.builderMealEstimate(meal).kcal !== null ? 'Auto ≈ ' + _ctx.builderMealEstimate(meal).kcal : 'Automatiche',
                                  class: "flex-1 bg-white border border-gray-200 focus:border-viola focus:ring-1 focus:ring-viola/20 rounded-xl p-2.5 text-xs font-bold text-antracite text-center outline-none transition-all placeholder:font-medium"
                                }, null, 8 /* PROPS */, _hoisted_577), [
                                  [_vModelText, meal.calories]
                                ]),
                                _cache[631] || (_cache[631] = _createElementVNode("span", { class: "text-[10px] font-bold text-gray-400" }, "kcal", -1 /* CACHED */))
                              ]),
                              (!meal.calories && _ctx.builderMealEstimate(meal).total)
                                ? (_openBlock(), _createElementBlock("p", {
                                    key: 0,
                                    class: _normalizeClass(["text-[10px] font-medium leading-snug -mt-1 pl-1", _ctx.builderMealEstimate(meal).kcal !== null ? 'text-salvia' : 'text-gray-400'])
                                  }, [
                                    (_ctx.builderMealEstimate(meal).kcal !== null)
                                      ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                          _createTextVNode("✨ Calcolate in automatico: ≈ " + _toDisplayString(_ctx.builderMealEstimate(meal).kcal) + " kcal · " + _toDisplayString(_ctx.builderMealEstimate(meal).protein) + " g proteine", 1 /* TEXT */),
                                          (_ctx.builderMealEstimate(meal).found < _ctx.builderMealEstimate(meal).total)
                                            ? (_openBlock(), _createElementBlock("span", _hoisted_578, " (" + _toDisplayString(_ctx.builderMealEstimate(meal).total - _ctx.builderMealEstimate(meal).found) + " " + _toDisplayString(_ctx.builderMealEstimate(meal).total - _ctx.builderMealEstimate(meal).found === 1 ? 'alimento non riconosciuto' : 'alimenti non riconosciuti') + ")", 1 /* TEXT */))
                                            : _createCommentVNode("v-if", true),
                                          _cache[632] || (_cache[632] = _createTextVNode(".", -1 /* CACHED */))
                                        ], 64 /* STABLE_FRAGMENT */))
                                      : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                                          _createTextVNode("Scrivi gli alimenti con la quantità (es. \"80g pasta\", \"2 uova\") e le calorie si calcolano da sole.")
                                        ], 64 /* STABLE_FRAGMENT */))
                                  ], 2 /* CLASS */))
                                : _createCommentVNode("v-if", true),
                              _createElementVNode("div", _hoisted_579, [
                                (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(meal.items, (item, iIdx) => {
                                  return (_openBlock(), _createElementBlock("div", {
                                    key: iIdx,
                                    class: "flex gap-2 items-center"
                                  }, [
                                    _withDirectives(_createElementVNode("input", {
                                      type: "text",
                                      "onUpdate:modelValue": $event => ((meal.items[iIdx]) = $event),
                                      placeholder: "Es: 50g Riso Basmati",
                                      class: "flex-1 bg-white border border-gray-200 focus:border-viola focus:ring-1 focus:ring-viola/20 rounded-xl p-2.5 text-xs font-medium text-antracite outline-none transition-all"
                                    }, null, 8 /* PROPS */, _hoisted_580), [
                                      [_vModelText, meal.items[iIdx]]
                                    ]),
                                    (_ctx.itemKcalLabel(item))
                                      ? (_openBlock(), _createElementBlock("span", {
                                          key: 0,
                                          class: _normalizeClass(["w-11 shrink-0 text-right text-[10px] font-bold", _ctx.itemKcalLabel(item) === '?' ? 'text-gray-300' : 'text-salvia']),
                                          title: _ctx.itemKcalLabel(item) === '?' ? 'Alimento o quantità non riconosciuti' : 'Calorie stimate'
                                        }, _toDisplayString(_ctx.itemKcalLabel(item)), 11 /* TEXT, CLASS, PROPS */, _hoisted_581))
                                      : _createCommentVNode("v-if", true),
                                    (meal.items.length > 1)
                                      ? (_openBlock(), _createElementBlock("button", {
                                          key: 1,
                                          onClick: $event => (_ctx.removeSlotFromMeal(meal, iIdx)),
                                          class: "p-2 text-gray-400 hover:text-red-400"
                                        }, [...(_cache[633] || (_cache[633] = [
                                          _createElementVNode("svg", {
                                            class: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24"
                                          }, [
                                            _createElementVNode("path", {
                                              "stroke-linecap": "round",
                                              "stroke-linejoin": "round",
                                              "stroke-width": "2",
                                              d: "M6 18L18 6M6 6l12 12"
                                            })
                                          ], -1 /* CACHED */)
                                        ]))], 8 /* PROPS */, _hoisted_582))
                                      : _createCommentVNode("v-if", true)
                                  ]))
                                }), 128 /* KEYED_FRAGMENT */))
                              ]),
                              _createElementVNode("button", {
                                onClick: $event => (_ctx.addSlotToMeal(meal)),
                                class: "text-[10px] font-bold text-viola uppercase tracking-widest flex items-center gap-1 hover:opacity-80"
                              }, [...(_cache[634] || (_cache[634] = [
                                _createElementVNode("svg", {
                                  class: "w-3 h-3",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  _createElementVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M12 4v16m8-8H4"
                                  })
                                ], -1 /* CACHED */),
                                _createTextVNode(" Aggiungi Alimento ", -1 /* CACHED */)
                              ]))], 8 /* PROPS */, _hoisted_583)
                            ]))
                          }), 128 /* KEYED_FRAGMENT */)),
                          _createElementVNode("button", {
                            onClick: _cache[115] || (_cache[115] = (...args) => (_ctx.addMealToBuilder && _ctx.addMealToBuilder(...args))),
                            class: "w-full py-3.5 border-2 border-dashed border-gray-200 bg-gray-50 rounded-2xl text-gray-500 font-bold text-xs hover:border-viola/40 hover:text-viola hover:bg-viola/5 transition-colors flex items-center justify-center gap-2"
                          }, [...(_cache[635] || (_cache[635] = [
                            _createElementVNode("svg", {
                              class: "w-4 h-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M12 4v16m8-8H4"
                              })
                            ], -1 /* CACHED */),
                            _createTextVNode(" Nuovo Pasto ", -1 /* CACHED */)
                          ]))])
                        ]),
                        _createElementVNode("button", {
                          onClick: _cache[116] || (_cache[116] = (...args) => (_ctx.finalizeNewPlan && _ctx.finalizeNewPlan(...args))),
                          class: _normalizeClass([_ctx.isPlanBuilderComplete ? 'bg-salvia text-white shadow-lg hover:bg-salvia/90' : 'bg-transparent text-salvia border-2 border-salvia hover:bg-salvia/5', "w-full font-bold py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 mt-6"])
                        }, [
                          _cache[636] || (_cache[636] = _createElementVNode("svg", {
                            class: "w-5 h-5",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            _createElementVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M5 13l4 4L19 7"
                            })
                          ], -1 /* CACHED */)),
                          _createTextVNode(" " + _toDisplayString(_ctx.editingPlanId ? 'Salva Modifiche' : 'Salva Piano Definitivo'), 1 /* TEXT */)
                        ], 2 /* CLASS */)
                      ]))
                    : _createCommentVNode("v-if", true),
                  (_ctx.nutritionView === 'detail' && _ctx.selectedPlan)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_584, [
                        _createElementVNode("div", _hoisted_585, [
                          _createElementVNode("div", null, [
                            _createElementVNode("button", {
                              onClick: _cache[117] || (_cache[117] = $event => (_ctx.nutritionView = 'list')),
                              class: "flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-antracite transition-colors mb-2"
                            }, [...(_cache[637] || (_cache[637] = [
                              _createElementVNode("svg", {
                                class: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                _createElementVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M15 19l-7-7 7-7"
                                })
                              ], -1 /* CACHED */),
                              _createTextVNode(" Torna ai piani ", -1 /* CACHED */)
                            ]))]),
                            _createElementVNode("h2", _hoisted_586, _toDisplayString(_ctx.selectedPlan.name), 1 /* TEXT */),
                            _createElementVNode("div", _hoisted_587, _toDisplayString(_ctx.selectedPlan.status === 'active' ? 'Piano Attivo' : 'Piano Terminato'), 1 /* TEXT */)
                          ]),
                          _createElementVNode("button", {
                            onClick: _cache[118] || (_cache[118] = $event => (_ctx.nutritionView = 'calendar')),
                            class: "p-2 bg-salvia/10 text-salvia rounded-xl hover:bg-salvia/20 transition-colors shadow-sm"
                          }, [...(_cache[638] || (_cache[638] = [
                            _createElementVNode("svg", {
                              class: "w-6 h-6",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              })
                            ], -1 /* CACHED */)
                          ]))])
                        ]),
                        _createElementVNode("div", _hoisted_588, [
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.weekDays, (dayName, idx) => {
                            return (_openBlock(), _createElementBlock("button", {
                              key: 'nutri-day-' + idx,
                              onClick: $event => (_ctx.selectedNutritionDay = dayName),
                              class: _normalizeClass(["flex-1 py-2 rounded-xl text-[11px] font-bold transition-all", _ctx.selectedNutritionDay === dayName ? 'bg-salvia text-white shadow-sm' : (dayName === _ctx.todayWeekDay ? 'bg-salvia/10 text-salvia hover:bg-salvia/20' : 'text-gray-400 hover:bg-gray-50')])
                            }, _toDisplayString(_ctx.shortDayLabels[idx]), 11 /* TEXT, CLASS, PROPS */, _hoisted_589))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]),
                        (_ctx.noteForToday)
                          ? (_openBlock(), _createElementBlock("div", _hoisted_590, [
                              _createElementVNode("div", _hoisted_591, [
                                _cache[640] || (_cache[640] = _createElementVNode("div", { class: "w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center text-xl flex-shrink-0" }, "📝", -1 /* CACHED */)),
                                _createElementVNode("div", _hoisted_592, [
                                  _cache[639] || (_cache[639] = _createElementVNode("h4", { class: "text-sm font-extrabold text-sky-600" }, "La tua nota di oggi", -1 /* CACHED */)),
                                  _createElementVNode("p", _hoisted_593, _toDisplayString(_ctx.noteForToday), 1 /* TEXT */)
                                ])
                              ])
                            ]))
                          : _createCommentVNode("v-if", true),
                        _createElementVNode("div", _hoisted_594, [
                          _createElementVNode("div", _hoisted_595, [
                            _createElementVNode("span", _hoisted_596, "Obiettivo " + _toDisplayString(_ctx.selectedNutritionDay), 1 /* TEXT */),
                            _createElementVNode("span", _hoisted_597, [
                              _createTextVNode(_toDisplayString(_ctx.selectedPlanDayCalories) + " ", 1 /* TEXT */),
                              _cache[641] || (_cache[641] = _createElementVNode("span", { class: "text-xs font-medium text-gray-400" }, "kcal totali", -1 /* CACHED */))
                            ])
                          ]),
                          (_ctx.selectedPlanDayProtein !== null)
                            ? (_openBlock(), _createElementBlock("div", _hoisted_598, [
                                _cache[642] || (_cache[642] = _createElementVNode("span", { class: "text-xs font-bold text-gray-500 uppercase" }, "🥩 Proteine", -1 /* CACHED */)),
                                _createElementVNode("span", _hoisted_599, [
                                  _createTextVNode("≈ " + _toDisplayString(_ctx.selectedPlanDayProtein) + " g ", 1 /* TEXT */),
                                  (_ctx.bodyStats.protein)
                                    ? (_openBlock(), _createElementBlock("span", {
                                        key: 0,
                                        class: _normalizeClass(["text-[11px] font-medium", _ctx.selectedPlanDayProtein >= _ctx.bodyStats.protein.min ? 'text-salvia' : 'text-arancione'])
                                      }, "· obiettivo " + _toDisplayString(_ctx.bodyStats.protein.min) + "–" + _toDisplayString(_ctx.bodyStats.protein.max) + " g", 3 /* TEXT, CLASS */))
                                    : _createCommentVNode("v-if", true)
                                ])
                              ]))
                            : _createCommentVNode("v-if", true),
                          _cache[643] || (_cache[643] = _createElementVNode("div", { class: "w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-4" }, [
                            _createElementVNode("div", {
                              class: "bg-salvia h-full rounded-full",
                              style: {"width":"100%"}
                            })
                          ], -1 /* CACHED */))
                        ]),
                        _createElementVNode("div", _hoisted_600, [
                          _createElementVNode("h4", _hoisted_601, "Pasti di " + _toDisplayString(_ctx.selectedNutritionDay), 1 /* TEXT */),
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.selectedPlanDayMeals, (meal) => {
                            return (_openBlock(), _createElementBlock("div", {
                              key: meal.id,
                              class: "bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex gap-4"
                            }, [
                              _createElementVNode("div", _hoisted_602, _toDisplayString(meal.icon), 1 /* TEXT */),
                              _createElementVNode("div", _hoisted_603, [
                                _createElementVNode("div", _hoisted_604, [
                                  _createElementVNode("h5", _hoisted_605, _toDisplayString(meal.name), 1 /* TEXT */),
                                  _createElementVNode("span", _hoisted_606, _toDisplayString(meal.calories !== null && meal.calories !== undefined && meal.calories !== '-' ? (meal.caloriesEstimated ? '≈ ' : '') + meal.calories + ' kcal' : 'kcal n.d.') + _toDisplayString(_ctx.mealProteinLabel(meal)), 1 /* TEXT */)
                                ]),
                                _createElementVNode("p", _hoisted_607, _toDisplayString(meal.description), 1 /* TEXT */)
                              ])
                            ]))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]),
                        _createElementVNode("div", _hoisted_608, [
                          _createElementVNode("button", {
                            onClick: _cache[119] || (_cache[119] = $event => (_ctx.editPlan(_ctx.selectedPlan))),
                            class: "w-full bg-white border-2 border-viola text-viola font-bold py-3.5 rounded-2xl shadow-sm hover:bg-viola/5 transition-all active:scale-95 flex justify-center items-center gap-2"
                          }, [...(_cache[644] || (_cache[644] = [
                            _createElementVNode("svg", {
                              class: "w-5 h-5",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              })
                            ], -1 /* CACHED */),
                            _createTextVNode(" Modifica Piano ", -1 /* CACHED */)
                          ]))]),
                          (_ctx.selectedPlan.status === 'active')
                            ? (_openBlock(), _createElementBlock("button", {
                                key: 0,
                                onClick: _cache[120] || (_cache[120] = (...args) => (_ctx.promptTerminatePlan && _ctx.promptTerminatePlan(...args))),
                                class: "w-full bg-viola text-white font-bold py-3.5 rounded-2xl shadow-sm hover:bg-viola/90 transition-all active:scale-95"
                              }, " Termina Piano Attivo "))
                            : (_openBlock(), _createElementBlock("button", {
                                key: 1,
                                onClick: _cache[121] || (_cache[121] = $event => (_ctx.reactivatePlan(_ctx.selectedPlan))),
                                class: "w-full bg-salvia text-white font-bold py-3.5 rounded-2xl shadow-lg hover:bg-salvia/90 transition-all active:scale-95"
                              }, " Riattiva Piano "))
                        ])
                      ]))
                    : _createCommentVNode("v-if", true),
                  (_ctx.nutritionView === 'calendar')
                    ? (_openBlock(), _createElementBlock("div", _hoisted_609, [
                        _createElementVNode("div", _hoisted_610, [
                          (_ctx.selectedPlan)
                            ? (_openBlock(), _createElementBlock("button", {
                                key: 0,
                                onClick: _cache[122] || (_cache[122] = $event => {_ctx.nutritionView = 'detail'; _ctx.exportMode = false}),
                                class: "flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-antracite transition-colors"
                              }, [
                                _cache[645] || (_cache[645] = _createElementVNode("svg", {
                                  class: "w-4 h-4",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  _createElementVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M15 19l-7-7 7-7"
                                  })
                                ], -1 /* CACHED */)),
                                _createTextVNode(" " + _toDisplayString(_ctx.selectedPlan.name), 1 /* TEXT */)
                              ]))
                            : (_openBlock(), _createElementBlock("div", _hoisted_611, "I tuoi giorni")),
                          _createElementVNode("div", _hoisted_612, [
                            _cache[646] || (_cache[646] = _createElementVNode("span", { class: "text-xs font-bold text-antracite uppercase tracking-widest" }, "Esporta Menù", -1 /* CACHED */)),
                            _createElementVNode("div", {
                              onClick: _cache[123] || (_cache[123] = $event => {_ctx.exportMode = !_ctx.exportMode; _ctx.exportSelectedDates = []}),
                              class: _normalizeClass(["w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer transition-colors", _ctx.exportMode ? 'bg-salvia' : 'bg-gray-300'])
                            }, [
                              _createElementVNode("div", {
                                class: _normalizeClass(["w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform", _ctx.exportMode ? 'translate-x-5' : ''])
                              }, null, 2 /* CLASS */)
                            ], 2 /* CLASS */)
                          ])
                        ]),
                        _createElementVNode("div", _hoisted_613, [
                          _createElementVNode("button", {
                            onClick: _cache[124] || (_cache[124] = (...args) => (_ctx.prevMonth && _ctx.prevMonth(...args))),
                            class: "p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-400 hover:text-salvia transition-colors"
                          }, [...(_cache[647] || (_cache[647] = [
                            _createElementVNode("svg", {
                              class: "w-5 h-5",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M15 19l-7-7 7-7"
                              })
                            ], -1 /* CACHED */)
                          ]))]),
                          _createElementVNode("h3", _hoisted_614, _toDisplayString(_ctx.currentMonthName) + " " + _toDisplayString(_ctx.currentYear), 1 /* TEXT */),
                          _createElementVNode("button", {
                            onClick: _cache[125] || (_cache[125] = (...args) => (_ctx.nextMonth && _ctx.nextMonth(...args))),
                            class: "p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-400 hover:text-salvia transition-colors"
                          }, [...(_cache[648] || (_cache[648] = [
                            _createElementVNode("svg", {
                              class: "w-5 h-5",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 5l7 7-7 7"
                              })
                            ], -1 /* CACHED */)
                          ]))])
                        ]),
                        _createElementVNode("div", _hoisted_615, [
                          _createElementVNode("div", _hoisted_616, [
                            (_openBlock(), _createElementBlock(_Fragment, null, _renderList(['L','M','M','G','V','S','D'], (day) => {
                              return _createElementVNode("div", {
                                key: day,
                                class: _normalizeClass([day === 'D' ? 'text-salvia' : 'text-gray-400', "text-[10px] font-bold"])
                              }, _toDisplayString(day), 3 /* TEXT, CLASS */)
                            }), 64 /* STABLE_FRAGMENT */))
                          ]),
                          _createElementVNode("div", _hoisted_617, [
                            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.firstDayOfMonth, (empty) => {
                              return (_openBlock(), _createElementBlock("div", {
                                key: 'empty-'+empty,
                                class: "p-2"
                              }))
                            }), 128 /* KEYED_FRAGMENT */)),
                            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.daysInMonth, (date) => {
                              return (_openBlock(), _createElementBlock("div", {
                                key: date,
                                onClick: $event => (_ctx.handleDayClick(date)),
                                class: "aspect-square p-1 flex items-center justify-center relative"
                              }, [
                                _createElementVNode("div", {
                                  class: _normalizeClass(["w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer transition-all", [
                     _ctx.exportMode && _ctx.exportSelectedDates.includes(date) ? 'bg-salvia text-white shadow-md' : '',
                     !_ctx.exportMode && _ctx.nutritionDayClasses(date)
                   ]])
                                }, _toDisplayString(date), 3 /* TEXT, CLASS */),
                                (_ctx.hasComment(date) && !_ctx.exportMode)
                                  ? (_openBlock(), _createElementBlock("div", _hoisted_619))
                                  : _createCommentVNode("v-if", true)
                              ], 8 /* PROPS */, _hoisted_618))
                            }), 128 /* KEYED_FRAGMENT */))
                          ])
                        ]),
                        _cache[649] || (_cache[649] = _createStaticVNode("<div class=\"flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 pt-4 border-t border-gray-100\"><div class=\"flex items-center gap-1.5\"><span class=\"w-2.5 h-2.5 rounded-full bg-salvia\"></span><span class=\"text-[10px] font-bold text-gray-500\">Perfetta</span></div><div class=\"flex items-center gap-1.5\"><span class=\"w-2.5 h-2.5 rounded-full bg-red-500\"></span><span class=\"text-[10px] font-bold text-gray-500\">Sgarro</span></div><div class=\"flex items-center gap-1.5\"><span class=\"w-2.5 h-2.5 rounded-full bg-viola\"></span><span class=\"text-[10px] font-bold text-gray-500\">Piccolo sgarro</span></div><div class=\"flex items-center gap-1.5\"><span class=\"w-2.5 h-2.5 rounded-full bg-amber-300\"></span><span class=\"text-[10px] font-bold text-gray-500\">Poco</span></div><div class=\"flex items-center gap-1.5\"><span class=\"w-1.5 h-1.5 rounded-full bg-sky-500\"></span><span class=\"text-[10px] font-bold text-gray-500\">Nota</span></div><div class=\"flex items-center gap-1.5\"><span class=\"w-2.5 h-2.5 rounded-full border-2 border-arancione\"></span><span class=\"text-[10px] font-bold text-gray-500\">Allenamento</span></div></div>", 1))
                      ]))
                    : _createCommentVNode("v-if", true),
                  (_ctx.exportMode)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_620, [
                        _createElementVNode("button", {
                          onClick: _cache[126] || (_cache[126] = (...args) => (_ctx.exportSelectedMenu && _ctx.exportSelectedMenu(...args))),
                          disabled: _ctx.exportSelectedDates.length === 0,
                          class: "w-full bg-salvia text-white font-bold py-3.5 rounded-2xl shadow-lg hover:bg-salvia/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        }, [
                          _cache[650] || (_cache[650] = _createElementVNode("svg", {
                            class: "w-5 h-5",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            _createElementVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            })
                          ], -1 /* CACHED */)),
                          _createTextVNode(" Condividi " + _toDisplayString(_ctx.exportSelectedDates.length) + " giorni ", 1 /* TEXT */)
                        ], 8 /* PROPS */, _hoisted_621)
                      ]))
                    : _createCommentVNode("v-if", true)
                ]))
              : _createCommentVNode("v-if", true)
          ]),
          (_ctx.customModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_622, [
                _createElementVNode("div", _hoisted_623, [
                  _createElementVNode("h3", _hoisted_624, _toDisplayString(_ctx.customModal.title), 1 /* TEXT */),
                  _createElementVNode("p", _hoisted_625, _toDisplayString(_ctx.customModal.message), 1 /* TEXT */),
                  (_ctx.customModal.type === 'alert')
                    ? (_openBlock(), _createElementBlock("div", _hoisted_626, [
                        _createElementVNode("button", {
                          onClick: _cache[127] || (_cache[127] = $event => (_ctx.customModal.isOpen = false)),
                          class: "w-full bg-viola text-white font-bold py-3 rounded-xl hover:bg-viola/90"
                        }, "Ho capito")
                      ]))
                    : _createCommentVNode("v-if", true),
                  (_ctx.customModal.type === 'confirm')
                    ? (_openBlock(), _createElementBlock("div", _hoisted_627, [
                        _createElementVNode("button", {
                          onClick: _cache[128] || (_cache[128] = $event => (_ctx.customModal.isOpen = false)),
                          class: "flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200"
                        }, "Annulla"),
                        _createElementVNode("button", {
                          onClick: _cache[129] || (_cache[129] = (...args) => (_ctx.executeConfirm && _ctx.executeConfirm(...args))),
                          class: "flex-1 bg-viola text-white font-bold py-3 rounded-xl hover:bg-viola/90"
                        }, "Conferma")
                      ]))
                    : _createCommentVNode("v-if", true)
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.backupModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_628, [
                _createElementVNode("div", _hoisted_629, [
                  _createElementVNode("div", _hoisted_630, [
                    _cache[652] || (_cache[652] = _createElementVNode("h3", { class: "text-lg font-bold text-antracite" }, "Profilo", -1 /* CACHED */)),
                    _createElementVNode("button", {
                      onClick: _cache[130] || (_cache[130] = (...args) => (_ctx.closeBackupModal && _ctx.closeBackupModal(...args))),
                      class: "p-1 text-gray-400 hover:text-antracite",
                      "aria-label": "Chiudi"
                    }, [...(_cache[651] || (_cache[651] = [
                      _createElementVNode("svg", {
                        class: "w-6 h-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  _createElementVNode("div", _hoisted_631, [
                    (!_ctx.profileEdit.isOpen)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_632, [
                          _createElementVNode("div", _hoisted_633, _toDisplayString(_ctx.profileInitial), 1 /* TEXT */),
                          _createElementVNode("div", _hoisted_634, [
                            _createElementVNode("div", _hoisted_635, _toDisplayString(_ctx.profileFullName), 1 /* TEXT */),
                            _createElementVNode("div", _hoisted_636, [
                              (_ctx.profileAge !== null)
                                ? (_openBlock(), _createElementBlock("span", _hoisted_637, _toDisplayString(_ctx.profileAge) + " anni", 1 /* TEXT */))
                                : _createCommentVNode("v-if", true),
                              (_ctx.profileAge !== null && _ctx.profile && _ctx.profile.height)
                                ? (_openBlock(), _createElementBlock("span", _hoisted_638, " · "))
                                : _createCommentVNode("v-if", true),
                              (_ctx.profile && _ctx.profile.height)
                                ? (_openBlock(), _createElementBlock("span", _hoisted_639, _toDisplayString(_ctx.formatNumber(_ctx.profile.height)) + " cm", 1 /* TEXT */))
                                : _createCommentVNode("v-if", true),
                              (_ctx.profileAge === null && !(_ctx.profile && _ctx.profile.height))
                                ? (_openBlock(), _createElementBlock("span", _hoisted_640, "Completa il profilo"))
                                : _createCommentVNode("v-if", true)
                            ])
                          ]),
                          _createElementVNode("button", {
                            onClick: _cache[131] || (_cache[131] = (...args) => (_ctx.openProfileEdit && _ctx.openProfileEdit(...args))),
                            class: "text-xs font-bold text-salvia hover:text-salvia/80 flex-shrink-0"
                          }, "Modifica")
                        ]))
                      : (_openBlock(), _createElementBlock("div", _hoisted_641, [
                          _createElementVNode("div", _hoisted_642, [
                            _createElementVNode("div", null, [
                              _cache[653] || (_cache[653] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Nome *", -1 /* CACHED */)),
                              _withDirectives(_createElementVNode("input", {
                                type: "text",
                                "onUpdate:modelValue": _cache[132] || (_cache[132] = $event => ((_ctx.profileEdit.firstName) = $event)),
                                class: "w-full bg-gray-50 border border-gray-200 focus:border-salvia rounded-xl p-2.5 text-sm font-bold text-antracite outline-none transition-all placeholder:text-gray-300 placeholder:font-medium bg-white"
                              }, null, 512 /* NEED_PATCH */), [
                                [_vModelText, _ctx.profileEdit.firstName]
                              ])
                            ]),
                            _createElementVNode("div", null, [
                              _cache[654] || (_cache[654] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Cognome", -1 /* CACHED */)),
                              _withDirectives(_createElementVNode("input", {
                                type: "text",
                                "onUpdate:modelValue": _cache[133] || (_cache[133] = $event => ((_ctx.profileEdit.lastName) = $event)),
                                class: "w-full bg-gray-50 border border-gray-200 focus:border-salvia rounded-xl p-2.5 text-sm font-bold text-antracite outline-none transition-all placeholder:text-gray-300 placeholder:font-medium bg-white"
                              }, null, 512 /* NEED_PATCH */), [
                                [_vModelText, _ctx.profileEdit.lastName]
                              ])
                            ]),
                            _createElementVNode("div", null, [
                              _cache[655] || (_cache[655] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Nascita", -1 /* CACHED */)),
                              _withDirectives(_createElementVNode("input", {
                                type: "date",
                                "onUpdate:modelValue": _cache[134] || (_cache[134] = $event => ((_ctx.profileEdit.birthDate) = $event)),
                                max: _ctx.todayDateKey,
                                class: "w-full bg-gray-50 border border-gray-200 focus:border-salvia rounded-xl p-2.5 text-sm font-bold text-antracite outline-none transition-all placeholder:text-gray-300 placeholder:font-medium bg-white"
                              }, null, 8 /* PROPS */, _hoisted_643), [
                                [_vModelText, _ctx.profileEdit.birthDate]
                              ])
                            ]),
                            _createElementVNode("div", null, [
                              _cache[656] || (_cache[656] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Altezza (cm)", -1 /* CACHED */)),
                              _withDirectives(_createElementVNode("input", {
                                type: "text",
                                inputmode: "numeric",
                                "onUpdate:modelValue": _cache[135] || (_cache[135] = $event => ((_ctx.profileEdit.height) = $event)),
                                class: "w-full bg-gray-50 border border-gray-200 focus:border-salvia rounded-xl p-2.5 text-sm font-bold text-antracite outline-none transition-all placeholder:text-gray-300 placeholder:font-medium bg-white text-center"
                              }, null, 512 /* NEED_PATCH */), [
                                [_vModelText, _ctx.profileEdit.height]
                              ])
                            ])
                          ]),
                          _createElementVNode("div", null, [
                            _cache[657] || (_cache[657] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Sesso", -1 /* CACHED */)),
                            _createElementVNode("div", _hoisted_644, [
                              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.sexOptions, (opt) => {
                                return (_openBlock(), _createElementBlock("button", {
                                  key: 'pe-sex-' + opt.id,
                                  type: "button",
                                  onClick: $event => (_ctx.profileEdit.sex = _ctx.profileEdit.sex === opt.id ? '' : opt.id),
                                  class: _normalizeClass(["py-2.5 rounded-xl text-sm font-bold border transition-all", _ctx.profileEdit.sex === opt.id ? 'bg-salvia/10 border-salvia text-salvia' : 'bg-white border-gray-200 text-gray-500'])
                                }, _toDisplayString(opt.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_645))
                              }), 128 /* KEYED_FRAGMENT */))
                            ])
                          ]),
                          (_ctx.profileEdit.error)
                            ? (_openBlock(), _createElementBlock("p", _hoisted_646, _toDisplayString(_ctx.profileEdit.error), 1 /* TEXT */))
                            : _createCommentVNode("v-if", true),
                          _createElementVNode("div", _hoisted_647, [
                            _createElementVNode("button", {
                              onClick: _cache[136] || (_cache[136] = $event => (_ctx.profileEdit.isOpen = false)),
                              class: "flex-1 bg-white border border-gray-200 text-gray-600 font-bold py-2.5 rounded-xl text-sm"
                            }, "Annulla"),
                            _createElementVNode("button", {
                              onClick: _cache[137] || (_cache[137] = (...args) => (_ctx.saveProfileEdit && _ctx.saveProfileEdit(...args))),
                              class: "flex-1 bg-salvia text-white font-bold py-2.5 rounded-xl text-sm"
                            }, "Salva")
                          ]),
                          _cache[658] || (_cache[658] = _createElementVNode("p", { class: "text-[10px] font-medium text-gray-400" }, "Peso e circonferenze si aggiornano dalla sezione Progressi.", -1 /* CACHED */))
                        ])),
                    _createElementVNode("div", _hoisted_648, [
                      _cache[659] || (_cache[659] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "Aspetto", -1 /* CACHED */)),
                      _createElementVNode("div", _hoisted_649, [
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.themeOptions, (opt) => {
                          return (_openBlock(), _createElementBlock("button", {
                            key: 'th-' + opt.id,
                            onClick: $event => (_ctx.settings.theme = opt.id),
                            class: _normalizeClass(["py-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1", _ctx.settings.theme === opt.id ? 'bg-white text-antracite shadow-sm border border-gray-200' : 'text-gray-400 hover:text-antracite border border-transparent'])
                          }, [
                            _createElementVNode("span", _hoisted_651, _toDisplayString(opt.icon), 1 /* TEXT */),
                            _createTextVNode(_toDisplayString(opt.label), 1 /* TEXT */)
                          ], 10 /* CLASS, PROPS */, _hoisted_650))
                        }), 128 /* KEYED_FRAGMENT */))
                      ]),
                      (_ctx.settings.theme === 'system')
                        ? (_openBlock(), _createElementBlock("p", _hoisted_652, "Segue il tema del telefono: scuro di sera se l'hai impostato così."))
                        : _createCommentVNode("v-if", true)
                    ]),
                    _createElementVNode("div", _hoisted_653, [
                      _cache[662] || (_cache[662] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "Da tracciare", -1 /* CACHED */)),
                      _createElementVNode("div", _hoisted_654, [
                        _cache[660] || (_cache[660] = _createElementVNode("div", { class: "min-w-0" }, [
                          _createElementVNode("div", { class: "text-sm font-bold text-antracite" }, "💧 Acqua"),
                          _createElementVNode("p", { class: "text-[10px] font-medium text-gray-500 leading-snug" }, "Bicchieri bevuti ogni giorno, nella home.")
                        ], -1 /* CACHED */)),
                        _createElementVNode("button", {
                          onClick: _cache[138] || (_cache[138] = $event => (_ctx.toggleHabit('water'))),
                          class: _normalizeClass(["w-11 h-6 rounded-full relative transition-colors flex-shrink-0", _ctx.habitOn('water') ? 'bg-salvia' : 'bg-gray-300']),
                          "aria-label": "Traccia l'acqua"
                        }, [
                          _createElementVNode("div", {
                            class: _normalizeClass(["w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform shadow", _ctx.habitOn('water') ? 'translate-x-5' : ''])
                          }, null, 2 /* CLASS */)
                        ], 2 /* CLASS */)
                      ]),
                      _createElementVNode("div", _hoisted_655, [
                        _cache[661] || (_cache[661] = _createElementVNode("div", { class: "min-w-0" }, [
                          _createElementVNode("div", { class: "text-sm font-bold text-antracite" }, "⏱️ Digiuno intermittente"),
                          _createElementVNode("p", { class: "text-[10px] font-medium text-gray-500 leading-snug" }, "Timer 12, 14, 16 o 18 ore, nella home.")
                        ], -1 /* CACHED */)),
                        _createElementVNode("button", {
                          onClick: _cache[139] || (_cache[139] = $event => (_ctx.toggleHabit('fasting'))),
                          class: _normalizeClass(["w-11 h-6 rounded-full relative transition-colors flex-shrink-0", _ctx.habitOn('fasting') ? 'bg-salvia' : 'bg-gray-300']),
                          "aria-label": "Traccia il digiuno"
                        }, [
                          _createElementVNode("div", {
                            class: _normalizeClass(["w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform shadow", _ctx.habitOn('fasting') ? 'translate-x-5' : ''])
                          }, null, 2 /* CLASS */)
                        ], 2 /* CLASS */)
                      ])
                    ]),
                    (_ctx.canInstall || _ctx.isStandalone)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_656, [
                          _cache[664] || (_cache[664] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "App sul telefono", -1 /* CACHED */)),
                          _createElementVNode("div", _hoisted_657, [
                            _createElementVNode("div", _hoisted_658, [
                              _cache[663] || (_cache[663] = _createElementVNode("img", {
                                src: "assets/icon-192.png",
                                alt: "",
                                class: "w-9 h-9 rounded-lg shrink-0"
                              }, null, -1 /* CACHED */)),
                              _createElementVNode("div", _hoisted_659, [
                                _createElementVNode("div", _hoisted_660, _toDisplayString(_ctx.isStandalone ? 'STILL è installata' : 'Installa STILL'), 1 /* TEXT */),
                                _createElementVNode("p", _hoisted_661, _toDisplayString(_ctx.isStandalone ? 'La apri dalla schermata Home, anche offline.' : 'Icona nella Home, schermo intero e uso offline.'), 1 /* TEXT */)
                              ])
                            ]),
                            (!_ctx.isStandalone)
                              ? (_openBlock(), _createElementBlock("button", {
                                  key: 0,
                                  onClick: _cache[140] || (_cache[140] = (...args) => (_ctx.installApp && _ctx.installApp(...args))),
                                  class: "shrink-0 cangiante-btn text-white text-xs font-bold px-3.5 py-2 rounded-xl active:scale-95 transition-transform"
                                }, "Installa"))
                              : (_openBlock(), _createElementBlock("span", _hoisted_662, "✓"))
                          ])
                        ]))
                      : _createCommentVNode("v-if", true),
                    _createElementVNode("div", _hoisted_663, [
                      _cache[673] || (_cache[673] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "Promemoria", -1 /* CACHED */)),
                      _createElementVNode("div", _hoisted_664, [
                        _cache[665] || (_cache[665] = _createElementVNode("div", { class: "min-w-0" }, [
                          _createElementVNode("div", { class: "text-sm font-bold text-antracite" }, "🔔 Notifiche"),
                          _createElementVNode("p", { class: "text-[10px] font-medium text-gray-500 leading-snug" }, "Pasti, allenamenti e serie in pericolo.")
                        ], -1 /* CACHED */)),
                        _createElementVNode("button", {
                          onClick: _cache[141] || (_cache[141] = (...args) => (_ctx.toggleReminders && _ctx.toggleReminders(...args))),
                          disabled: !_ctx.remindersSupported,
                          class: _normalizeClass(["w-11 h-6 rounded-full relative transition-colors flex-shrink-0 disabled:opacity-40", _ctx.settings.reminders.enabled ? 'bg-salvia' : 'bg-gray-300']),
                          "aria-label": "Attiva promemoria"
                        }, [
                          _createElementVNode("div", {
                            class: _normalizeClass(["w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform shadow", _ctx.settings.reminders.enabled ? 'translate-x-5' : ''])
                          }, null, 2 /* CLASS */)
                        ], 10 /* CLASS, PROPS */, _hoisted_665)
                      ]),
                      (_ctx.settings.reminders.enabled)
                        ? (_openBlock(), _createElementBlock("div", _hoisted_666, [
                            _createElementVNode("label", _hoisted_667, [
                              _cache[666] || (_cache[666] = _createElementVNode("span", { class: "text-xs font-bold text-antracite" }, "🍽️ Pasti del piano", -1 /* CACHED */)),
                              _withDirectives(_createElementVNode("input", {
                                type: "checkbox",
                                "onUpdate:modelValue": _cache[142] || (_cache[142] = $event => ((_ctx.settings.reminders.meals) = $event)),
                                class: "w-4 h-4 accent-[#10B981]"
                              }, null, 512 /* NEED_PATCH */), [
                                [_vModelCheckbox, _ctx.settings.reminders.meals]
                              ])
                            ]),
                            (_ctx.settings.reminders.meals)
                              ? (_openBlock(), _createElementBlock("div", _hoisted_668, [
                                  (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.reminderMealTypes, (t) => {
                                    return (_openBlock(), _createElementBlock("div", {
                                      key: 'rt' + t.id,
                                      class: "flex items-center justify-between gap-2 bg-white border border-gray-200 rounded-xl px-2.5 py-1.5"
                                    }, [
                                      _createElementVNode("span", _hoisted_669, _toDisplayString(t.icon) + " " + _toDisplayString(t.label), 1 /* TEXT */),
                                      _withDirectives(_createElementVNode("input", {
                                        type: "time",
                                        "onUpdate:modelValue": $event => ((_ctx.settings.reminders.mealTimes[t.id]) = $event),
                                        class: "text-[11px] font-bold text-antracite bg-transparent outline-none w-[84px] text-right"
                                      }, null, 8 /* PROPS */, _hoisted_670), [
                                        [_vModelText, _ctx.settings.reminders.mealTimes[t.id]]
                                      ])
                                    ]))
                                  }), 128 /* KEYED_FRAGMENT */))
                                ]))
                              : _createCommentVNode("v-if", true),
                            (_ctx.settings.reminders.meals)
                              ? (_openBlock(), _createElementBlock("p", _hoisted_671, "Lascia vuoto l'orario per non ricevere quel promemoria. Se hai già segnato il pasto non arriva."))
                              : _createCommentVNode("v-if", true),
                            _createElementVNode("label", _hoisted_672, [
                              _cache[667] || (_cache[667] = _createElementVNode("span", { class: "text-xs font-bold text-antracite pt-2" }, "💪 Allenamenti e sport", -1 /* CACHED */)),
                              _withDirectives(_createElementVNode("input", {
                                type: "checkbox",
                                "onUpdate:modelValue": _cache[143] || (_cache[143] = $event => ((_ctx.settings.reminders.workouts) = $event)),
                                class: "w-4 h-4 accent-[#10B981] mt-2"
                              }, null, 512 /* NEED_PATCH */), [
                                [_vModelCheckbox, _ctx.settings.reminders.workouts]
                              ])
                            ]),
                            (_ctx.settings.reminders.workouts)
                              ? (_openBlock(), _createElementBlock("div", _hoisted_673, [
                                  _cache[669] || (_cache[669] = _createElementVNode("span", { class: "text-[11px] font-medium text-gray-500" }, "Avvisami", -1 /* CACHED */)),
                                  _withDirectives(_createElementVNode("select", {
                                    "onUpdate:modelValue": _cache[144] || (_cache[144] = $event => ((_ctx.settings.reminders.workoutLead) = $event)),
                                    class: "text-[11px] font-bold text-antracite bg-white border border-gray-200 rounded-xl px-2 py-1.5 outline-none"
                                  }, [...(_cache[668] || (_cache[668] = [
                                    _createElementVNode("option", { value: 0 }, "all'orario", -1 /* CACHED */),
                                    _createElementVNode("option", { value: 15 }, "15 min prima", -1 /* CACHED */),
                                    _createElementVNode("option", { value: 30 }, "30 min prima", -1 /* CACHED */),
                                    _createElementVNode("option", { value: 60 }, "1 ora prima", -1 /* CACHED */),
                                    _createElementVNode("option", { value: 120 }, "2 ore prima", -1 /* CACHED */)
                                  ]))], 512 /* NEED_PATCH */), [
                                    [
                                      _vModelSelect,
                                      _ctx.settings.reminders.workoutLead,
                                      void 0,
                                      { number: true }
                                    ]
                                  ])
                                ]))
                              : _createCommentVNode("v-if", true),
                            _createElementVNode("label", _hoisted_674, [
                              _cache[670] || (_cache[670] = _createElementVNode("span", { class: "text-[11px] font-medium text-gray-500" }, "Dopo, chiedimi com'è andata", -1 /* CACHED */)),
                              _withDirectives(_createElementVNode("input", {
                                type: "checkbox",
                                "onUpdate:modelValue": _cache[145] || (_cache[145] = $event => ((_ctx.settings.reminders.checkins) = $event)),
                                class: "w-4 h-4 accent-[#10B981]"
                              }, null, 512 /* NEED_PATCH */), [
                                [_vModelCheckbox, _ctx.settings.reminders.checkins]
                              ])
                            ]),
                            _createElementVNode("label", _hoisted_675, [
                              _cache[671] || (_cache[671] = _createElementVNode("span", { class: "text-xs font-bold text-antracite pt-2" }, "🔥 Serie e proteggi serie", -1 /* CACHED */)),
                              _withDirectives(_createElementVNode("input", {
                                type: "checkbox",
                                "onUpdate:modelValue": _cache[146] || (_cache[146] = $event => ((_ctx.settings.reminders.streak) = $event)),
                                class: "w-4 h-4 accent-[#10B981] mt-2"
                              }, null, 512 /* NEED_PATCH */), [
                                [_vModelCheckbox, _ctx.settings.reminders.streak]
                              ])
                            ]),
                            (_ctx.settings.reminders.streak)
                              ? (_openBlock(), _createElementBlock("div", _hoisted_676, [
                                  _cache[672] || (_cache[672] = _createElementVNode("span", { class: "text-[11px] font-medium text-gray-500" }, "Se oggi non hai segnato nulla, alle", -1 /* CACHED */)),
                                  _withDirectives(_createElementVNode("input", {
                                    type: "time",
                                    "onUpdate:modelValue": _cache[147] || (_cache[147] = $event => ((_ctx.settings.reminders.streakTime) = $event)),
                                    class: "text-[11px] font-bold text-antracite bg-white border border-gray-200 rounded-xl px-2 py-1.5 outline-none"
                                  }, null, 512 /* NEED_PATCH */), [
                                    [_vModelText, _ctx.settings.reminders.streakTime]
                                  ])
                                ]))
                              : _createCommentVNode("v-if", true)
                          ]))
                        : _createCommentVNode("v-if", true),
                      (!_ctx.remindersNative)
                        ? (_openBlock(), _createElementBlock("p", _hoisted_677, "Dal sito i promemoria arrivano solo mentre STILL è aperto. Con l'app installata arriveranno anche a telefono bloccato."))
                        : _createCommentVNode("v-if", true)
                    ]),
                    _createElementVNode("div", _hoisted_678, [
                      _cache[682] || (_cache[682] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "Backup", -1 /* CACHED */)),
                      _cache[683] || (_cache[683] = _createElementVNode("p", { class: "text-xs text-gray-500 font-medium leading-relaxed" }, "I tuoi dati sono salvati solo su questo dispositivo. Scarica un backup per non perderli o per trasferirli su un altro telefono.", -1 /* CACHED */)),
                      _createElementVNode("div", _hoisted_679, [
                        _createElementVNode("div", _hoisted_680, [
                          _cache[674] || (_cache[674] = _createElementVNode("span", null, "Ultimo backup", -1 /* CACHED */)),
                          _createElementVNode("span", {
                            class: _normalizeClass(["font-bold", _ctx.backupDue || _ctx.lastBackupLabel === 'mai' ? 'text-arancione' : 'text-antracite'])
                          }, _toDisplayString(_ctx.lastBackupLabel), 3 /* TEXT, CLASS */)
                        ]),
                        _createElementVNode("div", _hoisted_681, [
                          _cache[675] || (_cache[675] = _createElementVNode("span", null, "Spazio usato", -1 /* CACHED */)),
                          _createElementVNode("span", _hoisted_682, _toDisplayString(_ctx.backupModal.sizeKB) + " KB di ~5000", 1 /* TEXT */)
                        ]),
                        (_ctx.storagePersisted !== null)
                          ? (_openBlock(), _createElementBlock("div", _hoisted_683, [
                              _cache[676] || (_cache[676] = _createElementVNode("span", null, "Memoria protetta", -1 /* CACHED */)),
                              _createElementVNode("span", {
                                class: _normalizeClass(["font-bold", _ctx.storagePersisted ? 'text-salvia' : 'text-arancione'])
                              }, _toDisplayString(_ctx.storagePersisted ? 'Sì' : 'No'), 3 /* TEXT, CLASS */)
                            ]))
                          : _createCommentVNode("v-if", true),
                        (_ctx.photos.length)
                          ? (_openBlock(), _createElementBlock("div", _hoisted_684, [
                              _cache[677] || (_cache[677] = _createElementVNode("span", null, "Foto dei progressi", -1 /* CACHED */)),
                              _createElementVNode("span", _hoisted_685, _toDisplayString(_ctx.photos.length), 1 /* TEXT */)
                            ]))
                          : _createCommentVNode("v-if", true),
                        (_ctx.storagePersisted === false)
                          ? (_openBlock(), _createElementBlock("p", _hoisted_686, "Il browser potrebbe cancellare i dati se non apri STILL per un po'. Installa l'app sulla schermata Home e fai backup spesso."))
                          : _createCommentVNode("v-if", true)
                      ]),
                      _createElementVNode("button", {
                        onClick: _cache[148] || (_cache[148] = (...args) => (_ctx.exportBackup && _ctx.exportBackup(...args))),
                        class: "w-full bg-salvia text-white font-bold py-3.5 rounded-2xl shadow-lg hover:bg-salvia/90 transition-all active:scale-95 flex items-center justify-center gap-2"
                      }, [...(_cache[678] || (_cache[678] = [
                        _createElementVNode("svg", {
                          class: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2"
                        }, [
                          _createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                          })
                        ], -1 /* CACHED */),
                        _createTextVNode(" Esporta backup ", -1 /* CACHED */)
                      ]))]),
                      _createElementVNode("button", {
                        onClick: _cache[149] || (_cache[149] = (...args) => (_ctx.triggerImportBackup && _ctx.triggerImportBackup(...args))),
                        class: "w-full bg-gray-100 text-antracite font-bold py-3.5 rounded-2xl hover:bg-gray-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                      }, [...(_cache[679] || (_cache[679] = [
                        _createElementVNode("svg", {
                          class: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2"
                        }, [
                          _createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M17 9l-5-5m0 0L7 9m5-5v12"
                          })
                        ], -1 /* CACHED */),
                        _createTextVNode(" Importa backup ", -1 /* CACHED */)
                      ]))]),
                      (_ctx.photos.length)
                        ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                            _createElementVNode("button", {
                              onClick: _cache[150] || (_cache[150] = (...args) => (_ctx.exportPhotos && _ctx.exportPhotos(...args))),
                              class: "w-full bg-gray-100 text-antracite font-bold py-3.5 rounded-2xl hover:bg-gray-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                            }, [...(_cache[680] || (_cache[680] = [
                              _createElementVNode("svg", {
                                class: "w-5 h-5",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                "stroke-width": "2"
                              }, [
                                _createElementVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M4 16l4.6-4.6a2 2 0 012.8 0L16 16m-2-2l1.6-1.6a2 2 0 012.8 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                })
                              ], -1 /* CACHED */),
                              _createTextVNode(" Salva le foto ", -1 /* CACHED */)
                            ]))]),
                            _cache[681] || (_cache[681] = _createElementVNode("p", { class: "text-[10px] text-gray-400 leading-snug px-1" }, "Le foto non sono nel file di backup (sarebbe enorme): salvale a parte nella galleria del telefono.", -1 /* CACHED */))
                          ], 64 /* STABLE_FRAGMENT */))
                        : _createCommentVNode("v-if", true),
                      _createElementVNode("input", {
                        ref: "backupFileInput",
                        type: "file",
                        accept: "application/json,.json",
                        class: "hidden",
                        onChange: _cache[151] || (_cache[151] = (...args) => (_ctx.handleBackupFile && _ctx.handleBackupFile(...args)))
                      }, null, 544 /* NEED_HYDRATION, NEED_PATCH */),
                      (_ctx.backupModal.error)
                        ? (_openBlock(), _createElementBlock("p", _hoisted_687, _toDisplayString(_ctx.backupModal.error), 1 /* TEXT */))
                        : _createCommentVNode("v-if", true)
                    ]),
                    _createElementVNode("div", _hoisted_688, [
                      _cache[685] || (_cache[685] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "Aiutaci a migliorare", -1 /* CACHED */)),
                      _createElementVNode("button", {
                        onClick: _cache[152] || (_cache[152] = (...args) => (_ctx.sendFeedback && _ctx.sendFeedback(...args))),
                        class: "w-full bg-viola/10 text-viola font-bold py-3.5 rounded-2xl hover:bg-viola/15 transition-all active:scale-95 flex items-center justify-center gap-2"
                      }, [...(_cache[684] || (_cache[684] = [
                        _createElementVNode("svg", {
                          class: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2"
                        }, [
                          _createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M8 10h8M8 14h5M21 12c0 4.4-4 8-9 8-1.5 0-2.9-.3-4.1-.9L3 20l1.3-3.9C3.5 14.9 3 13.5 3 12c0-4.4 4-8 9-8s9 3.6 9 8z"
                          })
                        ], -1 /* CACHED */),
                        _createTextVNode(" Segnala un problema o un'idea ", -1 /* CACHED */)
                      ]))]),
                      _cache[686] || (_cache[686] = _createElementVNode("p", { class: "text-[10px] text-gray-400 leading-snug" }, "Si apre un messaggio già pronto con la versione dell'app: scrivi cosa è successo e mandalo a chi ti ha fatto provare STILL.", -1 /* CACHED */))
                    ]),
                    _createElementVNode("div", _hoisted_689, [
                      _cache[687] || (_cache[687] = _createElementVNode("div", { class: "text-[10px] font-bold text-red-400 uppercase tracking-widest" }, "Zona pericolosa", -1 /* CACHED */)),
                      _createElementVNode("button", {
                        onClick: _cache[153] || (_cache[153] = (...args) => (_ctx.promptResetAllData && _ctx.promptResetAllData(...args))),
                        class: "w-full bg-white border border-red-200 text-red-500 font-bold py-3 rounded-2xl hover:bg-red-50 transition-all active:scale-95 text-sm"
                      }, "Elimina tutti i dati")
                    ]),
                    _createElementVNode("p", _hoisted_690, "STILL · " + _toDisplayString(_ctx.APP_VERSION), 1 /* TEXT */)
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.commentModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_691, [
                _createElementVNode("div", _hoisted_692, [
                  _createElementVNode("div", _hoisted_693, [
                    _createElementVNode("div", null, [
                      _createElementVNode("h3", _hoisted_694, "Dettaglio " + _toDisplayString(_ctx.commentModal.date) + " " + _toDisplayString(_ctx.currentMonthName), 1 /* TEXT */),
                      _createElementVNode("span", {
                        class: _normalizeClass(["inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold", _ctx.dayStatusClasses(_ctx.commentModalStatus)])
                      }, _toDisplayString(_ctx.dayStatusLabel(_ctx.commentModalStatus)), 3 /* TEXT, CLASS */)
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[154] || (_cache[154] = (...args) => (_ctx.closeCommentModal && _ctx.closeCommentModal(...args))),
                      class: "p-1 text-gray-400 hover:text-antracite"
                    }, [...(_cache[688] || (_cache[688] = [
                      _createElementVNode("svg", {
                        class: "w-5 h-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  _createElementVNode("div", _hoisted_695, [
                    (_ctx.commentModalTrainingSessions.length)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_696, [
                          _cache[689] || (_cache[689] = _createElementVNode("div", { class: "text-[10px] font-bold text-arancione uppercase tracking-widest" }, "Allenamento", -1 /* CACHED */)),
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.commentModalTrainingSessions, (session) => {
                            return (_openBlock(), _createElementBlock("div", {
                              key: 'cm-tr-' + session.id,
                              class: "flex items-start gap-2"
                            }, [
                              _createElementVNode("span", _hoisted_697, _toDisplayString(session.kind === 'gym' ? '🏋️' : '🏅'), 1 /* TEXT */),
                              _createElementVNode("div", _hoisted_698, [
                                _createElementVNode("div", _hoisted_699, [
                                  _createTextVNode(_toDisplayString(_ctx.trainingSessionLabel(session)), 1 /* TEXT */),
                                  (session.time)
                                    ? (_openBlock(), _createElementBlock("span", _hoisted_700, " • " + _toDisplayString(_ctx.sessionTimeLabel(session)), 1 /* TEXT */))
                                    : _createCommentVNode("v-if", true)
                                ]),
                                (session.note)
                                  ? (_openBlock(), _createElementBlock("p", _hoisted_701, "📝 " + _toDisplayString(session.note), 1 /* TEXT */))
                                  : _createCommentVNode("v-if", true)
                              ])
                            ]))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]))
                      : _createCommentVNode("v-if", true),
                    _cache[690] || (_cache[690] = _createElementVNode("div", { class: "text-[10px] font-bold text-salvia uppercase tracking-widest mb-1" }, "Menù Previsto", -1 /* CACHED */)),
                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.commentModalMeals, (meal) => {
                      return (_openBlock(), _createElementBlock("div", {
                        key: meal.id,
                        class: "flex items-center gap-3 bg-gray-50 p-2.5 rounded-2xl border border-gray-100"
                      }, [
                        _createElementVNode("div", _hoisted_702, _toDisplayString(meal.icon), 1 /* TEXT */),
                        _createElementVNode("div", _hoisted_703, [
                          _createElementVNode("h5", _hoisted_704, _toDisplayString(meal.name), 1 /* TEXT */),
                          _createElementVNode("p", _hoisted_705, _toDisplayString(meal.description), 1 /* TEXT */)
                        ]),
                        _createElementVNode("span", _hoisted_706, _toDisplayString(meal.calories !== null && meal.calories !== undefined && meal.calories !== '-' ? (meal.caloriesEstimated ? '≈ ' : '') + meal.calories + ' kcal' : 'kcal n.d.') + _toDisplayString(_ctx.mealProteinLabel(meal)), 1 /* TEXT */)
                      ]))
                    }), 128 /* KEYED_FRAGMENT */))
                  ]),
                  _createElementVNode("div", _hoisted_707, [
                    _cache[691] || (_cache[691] = _createElementVNode("div", { class: "text-[10px] font-bold text-salvia uppercase tracking-widest" }, "I Tuoi Appunti", -1 /* CACHED */)),
                    _withDirectives(_createElementVNode("textarea", {
                      "onUpdate:modelValue": _cache[155] || (_cache[155] = $event => ((_ctx.commentModal.text) = $event)),
                      rows: "3",
                      placeholder: "Es: ho saltato lo spuntino, o mi sentivo debole...",
                      class: "w-full bg-gray-50 border border-gray-200 rounded-2xl p-3 text-sm text-antracite focus:ring-2 focus:ring-salvia focus:border-salvia outline-none resize-none"
                    }, null, 512 /* NEED_PATCH */), [
                      [_vModelText, _ctx.commentModal.text]
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[156] || (_cache[156] = (...args) => (_ctx.saveComment && _ctx.saveComment(...args))),
                      class: "w-full bg-salvia text-white font-bold py-3 rounded-xl shadow-md hover:bg-salvia/90 active:scale-95 transition-all"
                    }, "Salva")
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.dayMenuModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_708, [
                _createElementVNode("div", _hoisted_709, [
                  _createElementVNode("div", _hoisted_710, [
                    _createElementVNode("div", null, [
                      _createElementVNode("h3", _hoisted_711, _toDisplayString(_ctx.formatDayLabel(_ctx.dayMenuModal.dateKey)), 1 /* TEXT */),
                      _createElementVNode("span", {
                        class: _normalizeClass(["inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold", _ctx.dayStatusClasses(_ctx.dayMenuStatus)])
                      }, _toDisplayString(_ctx.dayStatusLabel(_ctx.dayMenuStatus)), 3 /* TEXT, CLASS */)
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[157] || (_cache[157] = (...args) => (_ctx.closeDayMenu && _ctx.closeDayMenu(...args))),
                      class: "p-1 text-gray-400 hover:text-antracite flex-shrink-0"
                    }, [...(_cache[692] || (_cache[692] = [
                      _createElementVNode("svg", {
                        class: "w-5 h-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  (_ctx.isFutureDateKey(_ctx.dayMenuModal.dateKey))
                    ? (_openBlock(), _createElementBlock("p", _hoisted_712, " Puoi segnare i pasti solo per oggi e per i giorni passati. "))
                    : _createCommentVNode("v-if", true),
                  _createElementVNode("div", _hoisted_713, [
                    (_ctx.dayMenuTrainingSessions.length)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_714, [
                          _cache[693] || (_cache[693] = _createElementVNode("div", { class: "text-[10px] font-bold text-arancione uppercase tracking-widest" }, "Allenamento", -1 /* CACHED */)),
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.dayMenuTrainingSessions, (session) => {
                            return (_openBlock(), _createElementBlock("div", {
                              key: 'dm-tr-' + session.id,
                              class: _normalizeClass(["flex items-start gap-2.5", session.kind === 'gym' || _ctx.sportCanCheck(session, _ctx.dayMenuModal.dateKey) ? 'cursor-pointer rounded-xl hover:bg-arancione/10 -mx-1.5 px-1.5 py-1 transition-colors' : '']),
                              onClick: $event => (session.kind === 'gym' ? _ctx.openSessionStats(session, _ctx.dayMenuModal.dateKey) : (_ctx.sportCanCheck(session, _ctx.dayMenuModal.dateKey) && _ctx.openSportCheck(session, _ctx.dayMenuModal.dateKey)))
                            }, [
                              _createElementVNode("div", _hoisted_716, _toDisplayString(session.kind === 'gym' ? '🏋️' : '🏅'), 1 /* TEXT */),
                              _createElementVNode("div", _hoisted_717, [
                                _createElementVNode("div", _hoisted_718, [
                                  _createTextVNode(_toDisplayString(_ctx.trainingSessionLabel(session)), 1 /* TEXT */),
                                  (session.time)
                                    ? (_openBlock(), _createElementBlock("span", _hoisted_719, " • " + _toDisplayString(_ctx.sessionTimeLabel(session)), 1 /* TEXT */))
                                    : _createCommentVNode("v-if", true)
                                ]),
                                _createElementVNode("div", _hoisted_720, [
                                  _createTextVNode(_toDisplayString(_ctx.trainingSessionSubtitle(session)), 1 /* TEXT */),
                                  (session.kind === 'gym' && session.report)
                                    ? (_openBlock(), _createElementBlock("span", _hoisted_721, " • " + _toDisplayString(session.completed ? '✓ completato' : 'interrotto') + " · statistiche ›", 1 /* TEXT */))
                                    : _createCommentVNode("v-if", true),
                                  (_ctx.sportStatus(session, _ctx.dayMenuModal.dateKey) === 'done')
                                    ? (_openBlock(), _createElementBlock("span", _hoisted_722, " • ✓ fatto"))
                                    : (_ctx.sportStatus(session, _ctx.dayMenuModal.dateKey) === 'skipped')
                                      ? (_openBlock(), _createElementBlock("span", _hoisted_723, " • ✗ non fatto"))
                                      : (_ctx.sportCanCheck(session, _ctx.dayMenuModal.dateKey))
                                        ? (_openBlock(), _createElementBlock("span", _hoisted_724, " • fatto? ›"))
                                        : _createCommentVNode("v-if", true)
                                ]),
                                (session.note)
                                  ? (_openBlock(), _createElementBlock("p", _hoisted_725, "📝 " + _toDisplayString(session.note), 1 /* TEXT */))
                                  : _createCommentVNode("v-if", true)
                              ])
                            ], 10 /* CLASS, PROPS */, _hoisted_715))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]))
                      : _createCommentVNode("v-if", true),
                    (_ctx.dayMenuNote)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_726, [
                          _cache[695] || (_cache[695] = _createElementVNode("div", { class: "w-7 h-7 rounded-full bg-sky-500/20 flex items-center justify-center text-sm flex-shrink-0" }, "📝", -1 /* CACHED */)),
                          _createElementVNode("div", _hoisted_727, [
                            _cache[694] || (_cache[694] = _createElementVNode("div", { class: "text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-1" }, "Nota del giorno", -1 /* CACHED */)),
                            _createElementVNode("p", _hoisted_728, _toDisplayString(_ctx.dayMenuNote), 1 /* TEXT */)
                          ])
                        ]))
                      : _createCommentVNode("v-if", true),
                    (_ctx.dayMenuMeals.length === 0 && !_ctx.dayIntake(_ctx.dayMenuModal.dateKey).entries)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_729, [
                          _cache[696] || (_cache[696] = _createElementVNode("p", { class: "text-sm font-medium text-gray-400" }, "Niente di segnato per questo giorno.", -1 /* CACHED */)),
                          (!_ctx.isFutureDateKey(_ctx.dayMenuModal.dateKey))
                            ? (_openBlock(), _createElementBlock("button", {
                                key: 0,
                                onClick: _cache[158] || (_cache[158] = $event => {_ctx.closeDayMenu(); _ctx.openDiary(_ctx.dayMenuModal.dateKey)}),
                                class: "text-xs font-bold text-salvia"
                              }, "Scrivi cosa hai mangiato ›"))
                            : _createCommentVNode("v-if", true)
                        ]))
                      : _createCommentVNode("v-if", true),
                    (_ctx.dayIntake(_ctx.dayMenuModal.dateKey).entries)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_730, [
                          _createElementVNode("div", _hoisted_731, [
                            _createElementVNode("div", _hoisted_732, "Diario · ≈ " + _toDisplayString(_ctx.formatNumber(_ctx.dayIntake(_ctx.dayMenuModal.dateKey).kcal)) + " kcal", 1 /* TEXT */),
                            _createElementVNode("button", {
                              onClick: _cache[159] || (_cache[159] = $event => {_ctx.closeDayMenu(); _ctx.openDiary(_ctx.dayMenuModal.dateKey)}),
                              class: "text-[10px] font-bold text-salvia"
                            }, "Modifica ›")
                          ]),
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.DIARY_MEALS.filter(x => _ctx.dayIntake(_ctx.dayMenuModal.dateKey).diary[x.id]), (m) => {
                            return (_openBlock(), _createElementBlock("div", {
                              key: 'dmd' + m.id,
                              class: "flex items-start justify-between gap-2 text-[11px]"
                            }, [
                              _createElementVNode("span", _hoisted_733, [
                                _createElementVNode("b", null, _toDisplayString(m.icon) + " " + _toDisplayString(m.label) + ":", 1 /* TEXT */),
                                _createTextVNode(" " + _toDisplayString(_ctx.dayIntake(_ctx.dayMenuModal.dateKey).diary[m.id].text), 1 /* TEXT */)
                              ]),
                              _createElementVNode("span", _hoisted_734, _toDisplayString(_ctx.dayIntake(_ctx.dayMenuModal.dateKey).diary[m.id].kcal ?? '?'), 1 /* TEXT */)
                            ]))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]))
                      : _createCommentVNode("v-if", true),
                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.dayMenuMeals, (meal) => {
                      return (_openBlock(), _createElementBlock("div", {
                        key: meal.id,
                        class: "bg-gray-50 rounded-2xl border border-gray-100 p-3 flex items-stretch gap-2.5"
                      }, [
                        _createElementVNode("div", _hoisted_735, [
                          _createElementVNode("div", _hoisted_736, [
                            _createElementVNode("div", _hoisted_737, _toDisplayString(meal.icon), 1 /* TEXT */),
                            _createElementVNode("div", _hoisted_738, [
                              _createElementVNode("h5", _hoisted_739, _toDisplayString(meal.name), 1 /* TEXT */),
                              _createElementVNode("p", _hoisted_740, _toDisplayString(meal.description), 1 /* TEXT */)
                            ]),
                            _createElementVNode("span", _hoisted_741, _toDisplayString(meal.calories !== null ? (meal.caloriesEstimated ? '≈ ' : '') + meal.calories + ' kcal' : '—') + _toDisplayString(_ctx.mealProteinLabel(meal)), 1 /* TEXT */)
                          ]),
                          (_ctx.dayMenuLogs[meal.id]?.status === 'other')
                            ? (_openBlock(), _createElementBlock("p", _hoisted_742, [
                                _createTextVNode(" 🍕 " + _toDisplayString(_ctx.dayMenuLogs[meal.id].text || 'Altro'), 1 /* TEXT */),
                                (_ctx.dayMenuLogs[meal.id].kcal !== null)
                                  ? (_openBlock(), _createElementBlock("span", _hoisted_743, " · ≈ " + _toDisplayString(_ctx.dayMenuLogs[meal.id].kcal) + " kcal", 1 /* TEXT */))
                                  : _createCommentVNode("v-if", true)
                              ]))
                            : _createCommentVNode("v-if", true),
                          (_ctx.dayMenuLogs[meal.id]?.status === 'skipped' && _ctx.dayMenuLogs[meal.id]?.comment)
                            ? (_openBlock(), _createElementBlock("p", _hoisted_744, " 💬 " + _toDisplayString(_ctx.dayMenuLogs[meal.id].comment), 1 /* TEXT */))
                            : _createCommentVNode("v-if", true)
                        ]),
                        _createElementVNode("div", _hoisted_745, [
                          _createElementVNode("button", {
                            onClick: $event => (_ctx.setMealDone(_ctx.dayMenuModal.dateKey, meal)),
                            "aria-label": "Pasto eseguito",
                            disabled: _ctx.isFutureDateKey(_ctx.dayMenuModal.dateKey),
                            class: _normalizeClass(["w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100", _ctx.dayMenuLogs[meal.id]?.status === 'done' ? 'bg-salvia text-white shadow-sm' : 'bg-salvia/10 text-salvia/60 hover:bg-salvia/20 hover:text-salvia'])
                          }, [...(_cache[697] || (_cache[697] = [
                            _createElementVNode("svg", {
                              class: "w-4 h-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              "stroke-width": "3"
                            }, [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M5 13l4 4L19 7"
                              })
                            ], -1 /* CACHED */)
                          ]))], 10 /* CLASS, PROPS */, _hoisted_746),
                          _createElementVNode("button", {
                            onClick: $event => (_ctx.promptSkipMeal(_ctx.dayMenuModal.dateKey, meal)),
                            "aria-label": "Pasto saltato",
                            disabled: _ctx.isFutureDateKey(_ctx.dayMenuModal.dateKey),
                            class: _normalizeClass(["w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100", _ctx.dayMenuLogs[meal.id]?.status === 'skipped' ? 'bg-red-500 text-white shadow-sm' : _ctx.dayMenuLogs[meal.id]?.status === 'other' ? 'bg-viola text-white shadow-sm' : 'bg-red-50 text-red-300 hover:bg-red-100 hover:text-red-400'])
                          }, [...(_cache[698] || (_cache[698] = [
                            _createElementVNode("svg", {
                              class: "w-4 h-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              "stroke-width": "3"
                            }, [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M6 18L18 6M6 6l12 12"
                              })
                            ], -1 /* CACHED */)
                          ]))], 10 /* CLASS, PROPS */, _hoisted_747)
                        ])
                      ]))
                    }), 128 /* KEYED_FRAGMENT */))
                  ]),
                  _createElementVNode("div", _hoisted_748, [
                    _createElementVNode("button", {
                      onClick: _cache[160] || (_cache[160] = (...args) => (_ctx.closeDayMenu && _ctx.closeDayMenu(...args))),
                      class: "w-full bg-antracite text-white font-bold py-3 rounded-xl hover:bg-antracite/90 active:scale-95 transition-all"
                    }, "Chiudi")
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.mealCommentModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", {
                key: 4,
                class: "fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn",
                onClick: _cache[171] || (_cache[171] = _withModifiers($event => (_ctx.mealCommentModal.isOpen = false), ["self"]))
              }, [
                _createElementVNode("div", _hoisted_749, [
                  _createElementVNode("div", _hoisted_750, [
                    _createElementVNode("div", _hoisted_751, [
                      (_ctx.mealCommentModal.mode !== 'choose')
                        ? (_openBlock(), _createElementBlock("button", {
                            key: 0,
                            onClick: _cache[161] || (_cache[161] = $event => (_ctx.mealCommentModal.mode = 'choose')),
                            class: "w-10 h-10 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center flex-shrink-0",
                            "aria-label": "Indietro"
                          }, [...(_cache[699] || (_cache[699] = [
                            _createElementVNode("svg", {
                              class: "w-5 h-5",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              "stroke-width": "2.5"
                            }, [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M15 19l-7-7 7-7"
                              })
                            ], -1 /* CACHED */)
                          ]))]))
                        : _createCommentVNode("v-if", true),
                      _createElementVNode("div", null, [
                        _createElementVNode("h3", _hoisted_752, _toDisplayString(({ choose: 'Non hai seguito il pasto?', skipped: 'Pasto saltato', other: 'Hai mangiato altro' })[_ctx.mealCommentModal.mode]), 1 /* TEXT */),
                        _createElementVNode("p", _hoisted_753, [
                          _createTextVNode(_toDisplayString(_ctx.mealCommentModal.mealName) + " · ", 1 /* TEXT */),
                          _createElementVNode("span", _hoisted_754, _toDisplayString(_ctx.mealCommentModal.dateLabel), 1 /* TEXT */)
                        ])
                      ])
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[162] || (_cache[162] = $event => (_ctx.mealCommentModal.isOpen = false)),
                      class: "p-1 text-gray-400 hover:text-antracite flex-shrink-0",
                      "aria-label": "Chiudi"
                    }, [...(_cache[700] || (_cache[700] = [
                      _createElementVNode("svg", {
                        class: "w-5 h-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  (_ctx.mealCommentModal.mode === 'choose')
                    ? (_openBlock(), _createElementBlock("div", _hoisted_755, [
                        _createElementVNode("button", {
                          onClick: _cache[163] || (_cache[163] = $event => (_ctx.mealCommentModal.mode = 'other')),
                          class: "w-full rounded-2xl p-4 bg-viola/5 border border-viola/20 flex items-center gap-3 text-left active:scale-[0.98] transition-all"
                        }, [...(_cache[701] || (_cache[701] = [
                          _createElementVNode("span", { class: "w-11 h-11 rounded-2xl bg-viola/10 flex items-center justify-center text-xl shrink-0" }, "🍕", -1 /* CACHED */),
                          _createElementVNode("span", null, [
                            _createElementVNode("span", { class: "block text-sm font-extrabold text-antracite" }, "Ho mangiato altro"),
                            _createElementVNode("span", { class: "block text-[11px] font-medium text-gray-500 leading-snug" }, "Scrivi cosa: se rientra nelle calorie del pasto non è uno sgarro.")
                          ], -1 /* CACHED */)
                        ]))]),
                        _createElementVNode("button", {
                          onClick: _cache[164] || (_cache[164] = $event => (_ctx.mealCommentModal.mode = 'skipped')),
                          class: "w-full rounded-2xl p-4 bg-red-50 border border-red-100 flex items-center gap-3 text-left active:scale-[0.98] transition-all"
                        }, [...(_cache[702] || (_cache[702] = [
                          _createElementVNode("span", { class: "w-11 h-11 rounded-2xl bg-red-100 flex items-center justify-center text-xl shrink-0" }, "🚫", -1 /* CACHED */),
                          _createElementVNode("span", null, [
                            _createElementVNode("span", { class: "block text-sm font-extrabold text-antracite" }, "Non l'ho mangiato"),
                            _createElementVNode("span", { class: "block text-[11px] font-medium text-gray-500 leading-snug" }, "Pasto saltato: conta come uno sgarro dal piano.")
                          ], -1 /* CACHED */)
                        ]))]),
                        (_ctx.mealCommentModal.hasExisting)
                          ? (_openBlock(), _createElementBlock("button", {
                              key: 0,
                              onClick: _cache[165] || (_cache[165] = (...args) => (_ctx.clearMealStatus && _ctx.clearMealStatus(...args))),
                              class: "w-full bg-gray-100 text-gray-500 font-bold py-3 rounded-xl hover:bg-gray-200 active:scale-95 transition-all"
                            }, "Rimuovi stato"))
                          : _createCommentVNode("v-if", true)
                      ]))
                    : _createCommentVNode("v-if", true),
                  (_ctx.mealCommentModal.mode === 'skipped')
                    ? (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                        _createElementVNode("div", null, [
                          _cache[703] || (_cache[703] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 pl-1" }, "Perché l'hai saltato? (facoltativo)", -1 /* CACHED */)),
                          _withDirectives(_createElementVNode("textarea", {
                            "onUpdate:modelValue": _cache[166] || (_cache[166] = $event => ((_ctx.mealCommentModal.text) = $event)),
                            rows: "3",
                            placeholder: "Es: ero fuori casa, non avevo fame...",
                            class: "w-full bg-gray-50 border border-gray-200 focus:border-salvia focus:ring-2 focus:ring-salvia/20 rounded-2xl p-3 text-sm text-antracite outline-none resize-none transition-all"
                          }, null, 512 /* NEED_PATCH */), [
                            [_vModelText, _ctx.mealCommentModal.text]
                          ])
                        ]),
                        _createElementVNode("button", {
                          onClick: _cache[167] || (_cache[167] = (...args) => (_ctx.saveMealSkip && _ctx.saveMealSkip(...args))),
                          class: "w-full bg-red-500 text-white font-bold py-3 rounded-xl shadow-md hover:bg-red-600 active:scale-95 transition-all"
                        }, "Salva")
                      ], 64 /* STABLE_FRAGMENT */))
                    : _createCommentVNode("v-if", true),
                  (_ctx.mealCommentModal.mode === 'other')
                    ? (_openBlock(), _createElementBlock(_Fragment, { key: 2 }, [
                        _createElementVNode("div", _hoisted_756, [
                          _cache[704] || (_cache[704] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1" }, "Cosa hai mangiato?", -1 /* CACHED */)),
                          _withDirectives(_createElementVNode("textarea", {
                            "onUpdate:modelValue": _cache[168] || (_cache[168] = $event => ((_ctx.mealCommentModal.food) = $event)),
                            rows: "3",
                            placeholder: "Es: pizza margherita e una birra",
                            class: "w-full bg-gray-50 border border-gray-200 focus:border-viola focus:ring-2 focus:ring-viola/20 rounded-2xl p-3 text-sm text-antracite outline-none resize-none"
                          }, null, 512 /* NEED_PATCH */), [
                            [_vModelText, _ctx.mealCommentModal.food]
                          ])
                        ]),
                        (_ctx.mealOffEstimate.items.length)
                          ? (_openBlock(), _createElementBlock("div", _hoisted_757, [
                              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.mealOffEstimate.items, (it, i) => {
                                return (_openBlock(), _createElementBlock("div", {
                                  key: 'moi' + i,
                                  class: "flex items-center justify-between gap-2 text-xs"
                                }, [
                                  _createElementVNode("span", _hoisted_758, _toDisplayString(it.text), 1 /* TEXT */),
                                  (it.known)
                                    ? (_openBlock(), _createElementBlock("span", _hoisted_759, "≈ " + _toDisplayString(it.kcal) + " kcal", 1 /* TEXT */))
                                    : (_openBlock(), _createElementBlock("span", _hoisted_760, "non lo conosco"))
                                ]))
                              }), 128 /* KEYED_FRAGMENT */))
                            ]))
                          : _createCommentVNode("v-if", true),
                        _createElementVNode("label", _hoisted_761, [
                          _cache[705] || (_cache[705] = _createElementVNode("span", null, "Calorie (se le sai)", -1 /* CACHED */)),
                          _withDirectives(_createElementVNode("input", {
                            type: "text",
                            inputmode: "numeric",
                            "onUpdate:modelValue": _cache[169] || (_cache[169] = $event => ((_ctx.mealCommentModal.manualKcal) = $event)),
                            placeholder: _ctx.mealOffEstimate.kcal !== null ? String(_ctx.mealOffEstimate.kcal) : 'kcal',
                            class: "w-20 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-bold text-antracite outline-none focus:border-viola text-right"
                          }, null, 8 /* PROPS */, _hoisted_762), [
                            [_vModelText, _ctx.mealCommentModal.manualKcal]
                          ])
                        ]),
                        _createElementVNode("p", {
                          class: _normalizeClass(["text-xs font-semibold rounded-2xl px-3.5 py-3 leading-snug border", ({ ok: 'bg-salvia/10 text-salvia border-salvia/20', over: 'bg-viola/10 text-viola border-viola/20' })[_ctx.mealOffVerdict.tone] || 'bg-gray-50 text-gray-500 border-gray-100'])
                        }, _toDisplayString(_ctx.mealOffVerdict.text), 3 /* TEXT, CLASS */),
                        _createElementVNode("button", {
                          onClick: _cache[170] || (_cache[170] = (...args) => (_ctx.saveMealOther && _ctx.saveMealOther(...args))),
                          class: "w-full bg-viola text-white font-bold py-3 rounded-xl shadow-md active:scale-95 transition-all"
                        }, "Salva")
                      ], 64 /* STABLE_FRAGMENT */))
                    : _createCommentVNode("v-if", true)
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.diaryEditor.isOpen)
            ? (_openBlock(), _createElementBlock("div", {
                key: 5,
                class: "fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn",
                onClick: _cache[177] || (_cache[177] = _withModifiers($event => (_ctx.diaryEditor.isOpen = false), ["self"]))
              }, [
                _createElementVNode("div", _hoisted_763, [
                  _createElementVNode("div", _hoisted_764, [
                    _createElementVNode("div", _hoisted_765, [
                      _createElementVNode("div", _hoisted_766, _toDisplayString(_ctx.diaryMealInfo(_ctx.diaryEditor.slot).icon), 1 /* TEXT */),
                      _createElementVNode("div", null, [
                        _createElementVNode("h3", _hoisted_767, _toDisplayString(_ctx.diaryMealInfo(_ctx.diaryEditor.slot).label), 1 /* TEXT */),
                        _createElementVNode("p", _hoisted_768, _toDisplayString(_ctx.diaryEditor.dateKey === _ctx.todayDateKey ? 'Oggi' : _ctx.formatDayLabel(_ctx.diaryEditor.dateKey)), 1 /* TEXT */)
                      ])
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[172] || (_cache[172] = $event => (_ctx.diaryEditor.isOpen = false)),
                      class: "p-1 text-gray-400 hover:text-antracite",
                      "aria-label": "Chiudi"
                    }, [...(_cache[706] || (_cache[706] = [
                      _createElementVNode("svg", {
                        class: "w-5 h-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  _createElementVNode("div", _hoisted_769, [
                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.DIARY_MEALS, (m) => {
                      return (_openBlock(), _createElementBlock("button", {
                        key: 'dem' + m.id,
                        onClick: $event => (_ctx.diaryEditor.slot = m.id),
                        class: _normalizeClass(["shrink-0 px-2.5 py-1.5 rounded-full text-[11px] font-bold border transition-all", _ctx.diaryEditor.slot === m.id ? 'bg-salvia text-white border-salvia' : 'bg-white text-gray-500 border-gray-200'])
                      }, _toDisplayString(m.icon) + " " + _toDisplayString(m.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_770))
                    }), 128 /* KEYED_FRAGMENT */))
                  ]),
                  (_ctx.diaryFrequent.length)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_771, [
                        _cache[707] || (_cache[707] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "I tuoi soliti", -1 /* CACHED */)),
                        _createElementVNode("div", _hoisted_772, [
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.diaryFrequent, (f) => {
                            return (_openBlock(), _createElementBlock("button", {
                              key: 'df' + f.text,
                              onClick: $event => (_ctx.useDiaryFrequent(f)),
                              class: "max-w-full text-left px-2.5 py-1.5 rounded-xl bg-salvia/5 border border-salvia/20 text-[11px] font-semibold text-antracite truncate"
                            }, [
                              _createTextVNode(_toDisplayString(f.text), 1 /* TEXT */),
                              (f.kcal)
                                ? (_openBlock(), _createElementBlock("span", _hoisted_774, " · " + _toDisplayString(f.kcal), 1 /* TEXT */))
                                : _createCommentVNode("v-if", true)
                            ], 8 /* PROPS */, _hoisted_773))
                          }), 128 /* KEYED_FRAGMENT */))
                        ])
                      ]))
                    : _createCommentVNode("v-if", true),
                  _createElementVNode("div", _hoisted_775, [
                    _cache[708] || (_cache[708] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "Cosa hai mangiato?", -1 /* CACHED */)),
                    _withDirectives(_createElementVNode("textarea", {
                      "onUpdate:modelValue": _cache[173] || (_cache[173] = $event => ((_ctx.diaryEditor.text) = $event)),
                      rows: "3",
                      placeholder: "Es: pasta al pomodoro, insalata e una mela",
                      class: "w-full bg-gray-50 border border-gray-200 focus:border-salvia focus:ring-2 focus:ring-salvia/20 rounded-2xl p-3 text-sm text-antracite outline-none resize-none"
                    }, null, 512 /* NEED_PATCH */), [
                      [_vModelText, _ctx.diaryEditor.text]
                    ]),
                    _cache[709] || (_cache[709] = _createElementVNode("p", { class: "text-[10px] font-medium text-gray-400 leading-snug" }, "Separa con virgole o \"e\". Se sai le quantità scrivile (80g pasta, 2 uova): la stima è più precisa.", -1 /* CACHED */))
                  ]),
                  (_ctx.diaryEstimate.items.length)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_776, [
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.diaryEstimate.items, (it, i) => {
                          return (_openBlock(), _createElementBlock("div", {
                            key: 'dei' + i,
                            class: "flex items-center justify-between gap-2 text-xs"
                          }, [
                            _createElementVNode("span", _hoisted_777, _toDisplayString(it.text), 1 /* TEXT */),
                            (it.known)
                              ? (_openBlock(), _createElementBlock("span", _hoisted_778, [
                                  _createTextVNode("≈ " + _toDisplayString(it.kcal) + " kcal", 1 /* TEXT */),
                                  (it.guessed)
                                    ? (_openBlock(), _createElementBlock("span", _hoisted_779, " porz. media"))
                                    : _createCommentVNode("v-if", true)
                                ]))
                              : (_openBlock(), _createElementBlock("span", _hoisted_780, "non lo conosco"))
                          ]))
                        }), 128 /* KEYED_FRAGMENT */)),
                        _createElementVNode("div", _hoisted_781, [
                          _cache[710] || (_cache[710] = _createElementVNode("span", { class: "font-bold text-gray-400 uppercase tracking-wider text-[10px]" }, "Totale", -1 /* CACHED */)),
                          _createElementVNode("span", _hoisted_782, [
                            _createTextVNode(_toDisplayString(_ctx.diaryEstimate.kcal !== null ? '≈ ' + _ctx.diaryEstimate.kcal + ' kcal' : '—'), 1 /* TEXT */),
                            (_ctx.diaryEstimate.protein)
                              ? (_openBlock(), _createElementBlock("span", _hoisted_783, " · " + _toDisplayString(_ctx.diaryEstimate.protein) + " g prot", 1 /* TEXT */))
                              : _createCommentVNode("v-if", true)
                          ])
                        ])
                      ]))
                    : _createCommentVNode("v-if", true),
                  _createElementVNode("label", _hoisted_784, [
                    _cache[711] || (_cache[711] = _createElementVNode("span", null, "Calorie (se le sai, sostituiscono la stima)", -1 /* CACHED */)),
                    _withDirectives(_createElementVNode("input", {
                      type: "text",
                      inputmode: "numeric",
                      "onUpdate:modelValue": _cache[174] || (_cache[174] = $event => ((_ctx.diaryEditor.manualKcal) = $event)),
                      placeholder: _ctx.diaryEstimate.kcal !== null ? String(_ctx.diaryEstimate.kcal) : 'kcal',
                      class: "w-20 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-bold text-antracite outline-none focus:border-salvia text-right"
                    }, null, 8 /* PROPS */, _hoisted_785), [
                      [_vModelText, _ctx.diaryEditor.manualKcal]
                    ])
                  ]),
                  _createElementVNode("div", _hoisted_786, [
                    _createElementVNode("button", {
                      onClick: _cache[175] || (_cache[175] = (...args) => (_ctx.saveDiaryEntry && _ctx.saveDiaryEntry(...args))),
                      class: "w-full bg-salvia text-white font-bold py-3.5 rounded-2xl shadow-md active:scale-95 transition-all"
                    }, "Salva" + _toDisplayString(_ctx.diaryEditorKcal !== null ? ' · ≈ ' + _ctx.diaryEditorKcal + ' kcal' : ''), 1 /* TEXT */),
                    (_ctx.diaryEditor.existing)
                      ? (_openBlock(), _createElementBlock("button", {
                          key: 0,
                          onClick: _cache[176] || (_cache[176] = (...args) => (_ctx.deleteDiaryEntry && _ctx.deleteDiaryEntry(...args))),
                          class: "w-full bg-gray-100 text-gray-500 font-bold py-3 rounded-2xl active:scale-95 transition-all"
                        }, "Elimina"))
                      : _createCommentVNode("v-if", true)
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.trophyModal.isOpen && !_ctx.trophyModalItems.length && _ctx.trophyModal.levelUp)
            ? (_openBlock(), _createElementBlock("div", _hoisted_787, [
                _createElementVNode("div", _hoisted_788, [
                  _cache[713] || (_cache[713] = _createElementVNode("div", { class: "absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none bg-viola/40" }, null, -1 /* CACHED */)),
                  _cache[714] || (_cache[714] = _createElementVNode("div", { class: "relative z-10 text-[10px] font-black uppercase tracking-[0.3em] cangiante-text" }, "Nuovo livello", -1 /* CACHED */)),
                  _createElementVNode("div", _hoisted_789, [
                    _cache[712] || (_cache[712] = _createElementVNode("span", { class: "text-[10px] font-bold opacity-80" }, "LIVELLO", -1 /* CACHED */)),
                    _createElementVNode("span", _hoisted_790, _toDisplayString(_ctx.playerLevel.level), 1 /* TEXT */)
                  ]),
                  _createElementVNode("div", _hoisted_791, [
                    _createElementVNode("div", _hoisted_792, "⭐ " + _toDisplayString(_ctx.playerLevel.title), 1 /* TEXT */),
                    _createElementVNode("div", _hoisted_793, _toDisplayString(_ctx.formatNumber(_ctx.playerLevel.xp)) + " XP · continua così!", 1 /* TEXT */)
                  ]),
                  _createElementVNode("div", _hoisted_794, [
                    _createElementVNode("button", {
                      onClick: _cache[178] || (_cache[178] = $event => (_ctx.openAchievementShare({ type: 'level' }))),
                      class: "w-full cangiante-btn text-white font-extrabold py-3.5 rounded-2xl shadow-lg active:scale-95 transition-all"
                    }, "📲 Condividi nella storia"),
                    _createElementVNode("button", {
                      onClick: _cache[179] || (_cache[179] = (...args) => (_ctx.closeTrophyModal && _ctx.closeTrophyModal(...args))),
                      class: "w-full bg-white/10 hover:bg-white/20 font-bold py-3 rounded-2xl transition-colors"
                    }, "Continua")
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.trophyModal.isOpen && _ctx.trophyModalItems.length)
            ? (_openBlock(), _createElementBlock("div", _hoisted_795, [
                _createElementVNode("div", _hoisted_796, [
                  _createElementVNode("div", {
                    class: "absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none",
                    style: _normalizeStyle({ background: _ctx.trophyModalItems[0].tier.color + '40' })
                  }, null, 4 /* STYLE */),
                  _cache[715] || (_cache[715] = _createElementVNode("div", { class: "relative z-10 text-[10px] font-black uppercase tracking-[0.3em] cangiante-text" }, "Trofeo sbloccato", -1 /* CACHED */)),
                  _createElementVNode("div", {
                    class: "relative z-10 mx-auto w-28 h-28 rounded-full flex items-center justify-center text-6xl border-4 shadow-lg",
                    style: _normalizeStyle({ borderColor: _ctx.trophyModalItems[0].tier.color, background: _ctx.trophyModalItems[0].tier.color + '26' })
                  }, _toDisplayString(_ctx.trophyModalItems[0].group.icon), 5 /* TEXT, STYLE */),
                  _createElementVNode("div", _hoisted_797, [
                    _createElementVNode("span", {
                      class: "text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-white",
                      style: _normalizeStyle({ background: _ctx.trophyModalItems[0].tier.color })
                    }, _toDisplayString(_ctx.trophyModalItems[0].tier.name), 5 /* TEXT, STYLE */),
                    _createElementVNode("div", _hoisted_798, _toDisplayString(_ctx.formatNumber(_ctx.trophyModalItems[0].target)) + " " + _toDisplayString(_ctx.trophyModalItems[0].target === 1 ? _ctx.trophyModalItems[0].group.one : _ctx.trophyModalItems[0].group.unit), 1 /* TEXT */),
                    _createElementVNode("div", _hoisted_799, _toDisplayString(_ctx.trophyModalItems[0].group.name), 1 /* TEXT */)
                  ]),
                  (_ctx.trophyModalItems.length > 1)
                    ? (_openBlock(), _createElementBlock("p", _hoisted_800, "e " + _toDisplayString(_ctx.trophyModalItems.length === 2 ? 'un altro trofeo' : 'altri ' + (_ctx.trophyModalItems.length - 1) + ' trofei') + " sbloccati 🎉", 1 /* TEXT */))
                    : _createCommentVNode("v-if", true),
                  _createElementVNode("p", _hoisted_801, _toDisplayString(_ctx.trophyModal.levelUp ? '🎉 Sei salito al livello ' + _ctx.playerLevel.level + ': ' + _ctx.playerLevel.title + '!' : '⭐ Livello ' + _ctx.playerLevel.level + ' · ' + _ctx.playerLevel.title), 1 /* TEXT */),
                  _createElementVNode("div", _hoisted_802, [
                    _createElementVNode("button", {
                      onClick: _cache[180] || (_cache[180] = $event => (_ctx.openAchievementShare({ type: 'trophy', id: _ctx.trophyModalItems[0].id }))),
                      class: "w-full cangiante-btn text-white font-extrabold py-3.5 rounded-2xl shadow-lg active:scale-95 transition-all"
                    }, "📲 Condividi nella storia"),
                    _createElementVNode("button", {
                      onClick: _cache[181] || (_cache[181] = (...args) => (_ctx.closeTrophyModal && _ctx.closeTrophyModal(...args))),
                      class: "w-full bg-white/10 hover:bg-white/20 font-bold py-3 rounded-2xl transition-colors"
                    }, "Continua")
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.trophyDetail.isOpen && _ctx.trophyDetailGroup)
            ? (_openBlock(), _createElementBlock("div", {
                key: 8,
                class: "fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn",
                onClick: _cache[183] || (_cache[183] = _withModifiers((...args) => (_ctx.closeTrophyDetail && _ctx.closeTrophyDetail(...args)), ["self"]))
              }, [
                _createElementVNode("div", _hoisted_803, [
                  _createElementVNode("div", _hoisted_804, [
                    _createElementVNode("div", _hoisted_805, [
                      _createElementVNode("div", _hoisted_806, _toDisplayString(_ctx.trophyDetailGroup.icon), 1 /* TEXT */),
                      _createElementVNode("div", null, [
                        _createElementVNode("h3", _hoisted_807, _toDisplayString(_ctx.trophyDetailGroup.name), 1 /* TEXT */),
                        _createElementVNode("p", _hoisted_808, _toDisplayString(_ctx.trophyDetailGroup.hint), 1 /* TEXT */)
                      ])
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[182] || (_cache[182] = (...args) => (_ctx.closeTrophyDetail && _ctx.closeTrophyDetail(...args))),
                      class: "p-1 text-gray-400 hover:text-antracite",
                      "aria-label": "Chiudi"
                    }, [...(_cache[716] || (_cache[716] = [
                      _createElementVNode("svg", {
                        class: "w-6 h-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  _createElementVNode("div", _hoisted_809, [
                    _cache[717] || (_cache[717] = _createTextVNode("Ora: ", -1 /* CACHED */)),
                    _createElementVNode("span", _hoisted_810, _toDisplayString(_ctx.formatNumber(_ctx.trophyDetailGroup.value)) + " " + _toDisplayString(_ctx.trophyDetailGroup.value === 1 ? _ctx.trophyDetailGroup.one : _ctx.trophyDetailGroup.unit), 1 /* TEXT */)
                  ]),
                  _createElementVNode("div", _hoisted_811, [
                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.trophyDetailGroup.tiers, (t) => {
                      return (_openBlock(), _createElementBlock("div", {
                        key: t.id,
                        class: _normalizeClass(["flex items-center gap-3 rounded-2xl border p-3", t.unlocked ? 'border-gray-100 bg-white' : 'border-dashed border-gray-200 bg-gray-50'])
                      }, [
                        _createElementVNode("div", {
                          class: _normalizeClass(["w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 shrink-0", t.unlocked ? '' : 'grayscale opacity-40']),
                          style: _normalizeStyle({ borderColor: t.tier.color, background: t.tier.color + '1F' })
                        }, _toDisplayString(t.unlocked ? _ctx.trophyDetailGroup.icon : '🔒'), 7 /* TEXT, CLASS, STYLE */),
                        _createElementVNode("div", _hoisted_812, [
                          _createElementVNode("div", {
                            class: _normalizeClass(["text-xs font-extrabold", t.unlocked ? 'text-antracite' : 'text-gray-400'])
                          }, _toDisplayString(_ctx.formatNumber(t.target)) + " " + _toDisplayString(t.target === 1 ? _ctx.trophyDetailGroup.one : _ctx.trophyDetailGroup.unit), 3 /* TEXT, CLASS */),
                          _createElementVNode("div", {
                            class: "text-[10px] font-bold",
                            style: _normalizeStyle({ color: t.tier.color })
                          }, _toDisplayString(t.tier.name), 5 /* TEXT, STYLE */)
                        ]),
                        (t.unlocked)
                          ? (_openBlock(), _createElementBlock("button", {
                              key: 0,
                              onClick: $event => (_ctx.openAchievementShare({ type: 'trophy', id: t.id })),
                              class: "text-[10px] font-bold text-white cangiante-btn px-3 py-1.5 rounded-xl shrink-0"
                            }, "Condividi", 8 /* PROPS */, _hoisted_813))
                          : (_openBlock(), _createElementBlock("span", _hoisted_814, "−" + _toDisplayString(_ctx.formatNumber(t.target - _ctx.trophyDetailGroup.value)), 1 /* TEXT */))
                      ], 2 /* CLASS */))
                    }), 128 /* KEYED_FRAGMENT */))
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.pastChecksModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_815, [
                _createElementVNode("div", _hoisted_816, [
                  _createElementVNode("div", _hoisted_817, [
                    _createElementVNode("div", null, [
                      _cache[718] || (_cache[718] = _createElementVNode("h3", { class: "text-lg font-bold text-antracite leading-tight" }, "Giorni passati", -1 /* CACHED */)),
                      _createElementVNode("p", _hoisted_818, [
                        _createTextVNode(_toDisplayString(_ctx.pastChecksSession ? _ctx.trainingSessionLabel(_ctx.pastChecksSession) : ''), 1 /* TEXT */),
                        (_ctx.pastChecksSession && _ctx.pastChecksSession.time)
                          ? (_openBlock(), _createElementBlock("span", _hoisted_819, " • " + _toDisplayString(_ctx.sessionTimeLabel(_ctx.pastChecksSession)), 1 /* TEXT */))
                          : _createCommentVNode("v-if", true)
                      ])
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[184] || (_cache[184] = $event => (_ctx.pastChecksModal.isOpen = false)),
                      class: "p-1 text-gray-400 hover:text-antracite",
                      "aria-label": "Chiudi"
                    }, [...(_cache[719] || (_cache[719] = [
                      _createElementVNode("svg", {
                        class: "w-6 h-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  _cache[720] || (_cache[720] = _createElementVNode("p", { class: "text-xs text-gray-500 font-medium leading-relaxed shrink-0" }, "Segna com'è andata nei giorni già trascorsi: contano nei progressi, nelle ore di allenamento e nella serie.", -1 /* CACHED */)),
                  _createElementVNode("div", _hoisted_820, [
                    _createElementVNode("button", {
                      onClick: _cache[185] || (_cache[185] = $event => (_ctx.setAllPastChecks('done'))),
                      class: "py-2 rounded-xl text-[11px] font-bold bg-salvia/10 text-salvia border border-salvia/30"
                    }, "✓ Tutti gli altri fatti"),
                    _createElementVNode("button", {
                      onClick: _cache[186] || (_cache[186] = $event => (_ctx.setAllPastChecks('skipped'))),
                      class: "py-2 rounded-xl text-[11px] font-bold bg-gray-50 text-gray-500 border border-gray-200"
                    }, "✗ Tutti gli altri no")
                  ]),
                  _createElementVNode("div", _hoisted_821, [
                    (!_ctx.pastChecksModal.items.length)
                      ? (_openBlock(), _createElementBlock("p", _hoisted_822, "Nessun giorno passato in calendario."))
                      : _createCommentVNode("v-if", true),
                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.pastChecksModal.items, (item) => {
                      return (_openBlock(), _createElementBlock("div", {
                        key: 'pc' + item.dateKey,
                        class: "flex items-center justify-between gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2"
                      }, [
                        _createElementVNode("span", _hoisted_823, _toDisplayString(_ctx.formatDateLong(item.dateKey)), 1 /* TEXT */),
                        _createElementVNode("div", _hoisted_824, [
                          _createElementVNode("button", {
                            onClick: $event => (_ctx.setPastCheck(item, 'done')),
                            class: _normalizeClass(["w-9 h-8 rounded-lg text-sm font-black border transition-colors", item.status === 'done' ? 'bg-salvia text-white border-salvia' : 'bg-white text-gray-300 border-gray-200']),
                            "aria-label": "Fatto"
                          }, "✓", 10 /* CLASS, PROPS */, _hoisted_825),
                          _createElementVNode("button", {
                            onClick: $event => (_ctx.setPastCheck(item, 'skipped')),
                            class: _normalizeClass(["w-9 h-8 rounded-lg text-sm font-black border transition-colors", item.status === 'skipped' ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-300 border-gray-200']),
                            "aria-label": "Non fatto"
                          }, "✗", 10 /* CLASS, PROPS */, _hoisted_826)
                        ])
                      ]))
                    }), 128 /* KEYED_FRAGMENT */))
                  ]),
                  _createElementVNode("button", {
                    onClick: _cache[187] || (_cache[187] = (...args) => (_ctx.savePastChecks && _ctx.savePastChecks(...args))),
                    class: "w-full py-3.5 rounded-2xl bg-salvia text-white font-bold shadow-lg active:scale-95 transition-all shrink-0"
                  }, "Salva")
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.groceryModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_827, [
                _createElementVNode("div", _hoisted_828, [
                  _createElementVNode("div", _hoisted_829, [
                    _cache[722] || (_cache[722] = _createElementVNode("div", { class: "flex items-center gap-3" }, [
                      _createElementVNode("div", { class: "w-10 h-10 rounded-xl bg-viola/10 flex items-center justify-center text-xl border border-viola/20" }, "🛒"),
                      _createElementVNode("h3", { class: "text-lg font-bold text-antracite" }, "Checklist Spesa")
                    ], -1 /* CACHED */)),
                    _createElementVNode("button", {
                      onClick: _cache[188] || (_cache[188] = $event => (_ctx.groceryModal.isOpen = false)),
                      class: "p-1 text-gray-400 hover:text-antracite"
                    }, [...(_cache[721] || (_cache[721] = [
                      _createElementVNode("svg", {
                        class: "w-6 h-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  _cache[725] || (_cache[725] = _createElementVNode("p", { class: "text-sm text-gray-500 font-medium leading-relaxed" }, "Spunta quello che hai già in frigo o in dispensa. Condividi con un tap gli ingredienti mancanti!", -1 /* CACHED */)),
                  _createElementVNode("div", _hoisted_830, [
                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.checklistItems, (item, idx) => {
                      return (_openBlock(), _createElementBlock("label", {
                        key: idx,
                        class: _normalizeClass(["flex items-center gap-3 p-3.5 bg-gray-50 rounded-2xl border cursor-pointer hover:bg-gray-100 transition-colors", item.checked ? 'border-viola/30 bg-viola/5' : 'border-gray-100'])
                      }, [
                        _withDirectives(_createElementVNode("input", {
                          type: "checkbox",
                          "onUpdate:modelValue": $event => ((item.checked) = $event),
                          class: "w-5 h-5 text-viola rounded focus:ring-viola border-gray-300 accent-viola"
                        }, null, 8 /* PROPS */, _hoisted_831), [
                          [_vModelCheckbox, item.checked]
                        ]),
                        _createElementVNode("span", {
                          class: _normalizeClass(["text-sm font-bold transition-all", item.checked ? 'text-gray-400 line-through' : 'text-antracite'])
                        }, _toDisplayString(item.name), 3 /* TEXT, CLASS */)
                      ], 2 /* CLASS */))
                    }), 128 /* KEYED_FRAGMENT */))
                  ]),
                  _createElementVNode("div", _hoisted_832, [
                    (_ctx.allGroceryChecked)
                      ? (_openBlock(), _createElementBlock("button", {
                          key: 0,
                          onClick: _cache[189] || (_cache[189] = (...args) => (_ctx.shareGroceryReady && _ctx.shareGroceryReady(...args))),
                          class: "w-full bg-salvia text-white font-bold py-3.5 rounded-2xl shadow-lg hover:bg-salvia/90 transition-all active:scale-95 flex items-center justify-center gap-2"
                        }, [...(_cache[723] || (_cache[723] = [
                          _createElementVNode("svg", {
                            class: "w-5 h-5",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            "stroke-width": "2.5"
                          }, [
                            _createElementVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M5 13l4 4L19 7"
                            })
                          ], -1 /* CACHED */),
                          _createTextVNode(" Il frigo è pronto ", -1 /* CACHED */)
                        ]))]))
                      : (_openBlock(), _createElementBlock("button", {
                          key: 1,
                          onClick: _cache[190] || (_cache[190] = (...args) => (_ctx.sharePendingGrocery && _ctx.sharePendingGrocery(...args))),
                          class: "w-full bg-viola text-white font-bold py-3.5 rounded-2xl shadow-lg hover:bg-viola/90 transition-all active:scale-95 flex items-center justify-center gap-2"
                        }, [...(_cache[724] || (_cache[724] = [
                          _createElementVNode("svg", {
                            class: "w-5 h-5",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            "stroke-width": "2"
                          }, [
                            _createElementVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                            })
                          ], -1 /* CACHED */),
                          _createTextVNode(" Condividi cosa manca ", -1 /* CACHED */)
                        ]))]))
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          _createElementVNode("input", {
            ref: "photoInput",
            type: "file",
            accept: "image/*",
            multiple: "",
            class: "hidden",
            onChange: _cache[191] || (_cache[191] = (...args) => (_ctx.onPhotoFiles && _ctx.onPhotoFiles(...args)))
          }, null, 544 /* NEED_HYDRATION, NEED_PATCH */),
          (_ctx.gallery.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_833, [
                _createElementVNode("div", _hoisted_834, [
                  _createElementVNode("button", {
                    onClick: _cache[192] || (_cache[192] = (...args) => (_ctx.closeGallery && _ctx.closeGallery(...args))),
                    class: "p-1 -ml-1 text-gray-500 hover:text-antracite",
                    "aria-label": "Chiudi"
                  }, [...(_cache[726] || (_cache[726] = [
                    _createElementVNode("svg", {
                      class: "w-6 h-6",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      "stroke-width": "2"
                    }, [
                      _createElementVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M15 19l-7-7 7-7"
                      })
                    ], -1 /* CACHED */)
                  ]))]),
                  _cache[727] || (_cache[727] = _createElementVNode("div", { class: "flex-1 min-w-0" }, [
                    _createElementVNode("h3", { class: "text-lg font-bold text-antracite leading-tight" }, "Le tue foto"),
                    _createElementVNode("p", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "Solo su questo telefono 🔒")
                  ], -1 /* CACHED */)),
                  (_ctx.photos.length >= 2 && !_ctx.gallery.selecting)
                    ? (_openBlock(), _createElementBlock("button", {
                        key: 0,
                        onClick: _cache[193] || (_cache[193] = (...args) => (_ctx.startCompareSelect && _ctx.startCompareSelect(...args))),
                        class: "text-xs font-bold text-viola bg-viola/10 px-3 py-2 rounded-xl active:scale-95 transition-all"
                      }, "Confronta"))
                    : _createCommentVNode("v-if", true),
                  (_ctx.gallery.selecting)
                    ? (_openBlock(), _createElementBlock("button", {
                        key: 1,
                        onClick: _cache[194] || (_cache[194] = (...args) => (_ctx.cancelCompareSelect && _ctx.cancelCompareSelect(...args))),
                        class: "text-xs font-bold text-gray-500 px-2 py-2"
                      }, "Annulla"))
                    : _createCommentVNode("v-if", true)
                ]),
                (_ctx.galleryPoses.length > 1)
                  ? (_openBlock(), _createElementBlock("div", _hoisted_835, [
                      _createElementVNode("button", {
                        onClick: _cache[195] || (_cache[195] = $event => (_ctx.gallery.pose = 'tutte')),
                        class: _normalizeClass(["px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex-shrink-0", _ctx.gallery.pose === 'tutte' ? 'bg-antracite text-white border-antracite' : 'bg-white text-gray-500 border-gray-200'])
                      }, "Tutte", 2 /* CLASS */),
                      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.galleryPoses, (pose) => {
                        return (_openBlock(), _createElementBlock("button", {
                          key: 'gp-' + pose.id,
                          onClick: $event => (_ctx.gallery.pose = pose.id),
                          class: _normalizeClass(["px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex-shrink-0", _ctx.gallery.pose === pose.id ? 'bg-antracite text-white border-antracite' : 'bg-white text-gray-500 border-gray-200'])
                        }, _toDisplayString(pose.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_836))
                      }), 128 /* KEYED_FRAGMENT */))
                    ]))
                  : _createCommentVNode("v-if", true),
                (_ctx.gallery.selecting)
                  ? (_openBlock(), _createElementBlock("div", _hoisted_837, " Scegli due foto da confrontare (" + _toDisplayString(_ctx.gallery.selected.length) + "/2) ", 1 /* TEXT */))
                  : _createCommentVNode("v-if", true),
                _createElementVNode("div", _hoisted_838, [
                  (!_ctx.photosReady)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_839, [...(_cache[728] || (_cache[728] = [
                        _createElementVNode("div", { class: "w-7 h-7 border-4 border-salvia border-t-transparent rounded-full animate-spin" }, null, -1 /* CACHED */)
                      ]))]))
                    : (!_ctx.galleryPhotos.length)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_840, "Nessuna foto qui. Aggiungine una!"))
                      : _createCommentVNode("v-if", true),
                  (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.galleryMonths, (month) => {
                    return (_openBlock(), _createElementBlock("div", {
                      key: 'gm-' + month.key,
                      class: "space-y-2"
                    }, [
                      _createElementVNode("div", _hoisted_841, _toDisplayString(month.label), 1 /* TEXT */),
                      _createElementVNode("div", _hoisted_842, [
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(month.items, (p) => {
                          return (_openBlock(), _createElementBlock("button", {
                            key: 'gi-' + p.id,
                            onClick: $event => (_ctx.openPhoto(p)),
                            class: _normalizeClass(["relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 active:scale-95 transition-all", _ctx.gallery.selected.includes(p.id) ? 'ring-4 ring-viola' : ''])
                          }, [
                            _createElementVNode("img", {
                              src: p.thumbUrl,
                              alt: "",
                              class: "w-full h-full object-cover",
                              loading: "lazy"
                            }, null, 8 /* PROPS */, _hoisted_844),
                            _createElementVNode("span", _hoisted_845, [
                              _createElementVNode("span", _hoisted_846, _toDisplayString(_ctx.photoDateLabel(p.date).replace(/ \d{4}$/, '')), 1 /* TEXT */),
                              _createElementVNode("span", _hoisted_847, [
                                _createTextVNode(_toDisplayString(_ctx.poseLabel(p.pose)), 1 /* TEXT */),
                                (_ctx.photoWeight(p.date) !== null)
                                  ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                      _createTextVNode(" · " + _toDisplayString(_ctx.formatNumber(_ctx.photoWeight(p.date))) + " kg", 1 /* TEXT */)
                                    ], 64 /* STABLE_FRAGMENT */))
                                  : _createCommentVNode("v-if", true)
                              ])
                            ]),
                            (_ctx.gallery.selecting)
                              ? (_openBlock(), _createElementBlock("span", {
                                  key: 0,
                                  class: _normalizeClass(["absolute top-1.5 right-1.5 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[11px] font-black text-white", _ctx.gallery.selected.includes(p.id) ? 'bg-viola' : 'bg-black/30'])
                                }, _toDisplayString(_ctx.gallery.selected.includes(p.id) ? (_ctx.gallery.selected.indexOf(p.id) + 1) : ''), 3 /* TEXT, CLASS */))
                              : _createCommentVNode("v-if", true)
                          ], 10 /* CLASS, PROPS */, _hoisted_843))
                        }), 128 /* KEYED_FRAGMENT */))
                      ])
                    ]))
                  }), 128 /* KEYED_FRAGMENT */))
                ]),
                _createElementVNode("div", _hoisted_848, [
                  (_ctx.gallery.selecting)
                    ? (_openBlock(), _createElementBlock("button", {
                        key: 0,
                        onClick: _cache[196] || (_cache[196] = (...args) => (_ctx.confirmCompareSelect && _ctx.confirmCompareSelect(...args))),
                        disabled: _ctx.gallery.selected.length < 2,
                        class: "w-full cangiante-btn text-white font-bold py-3.5 rounded-2xl shadow-lg active:scale-95 transition-all disabled:opacity-40"
                      }, "Confronta le due foto", 8 /* PROPS */, _hoisted_849))
                    : (_openBlock(), _createElementBlock("button", {
                        key: 1,
                        onClick: _cache[197] || (_cache[197] = (...args) => (_ctx.triggerPhotoInput && _ctx.triggerPhotoInput(...args))),
                        class: "w-full bg-salvia text-white font-bold py-3.5 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                      }, [...(_cache[729] || (_cache[729] = [
                        _createElementVNode("svg", {
                          class: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2.5"
                        }, [
                          _createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M12 4v16m8-8H4"
                          })
                        ], -1 /* CACHED */),
                        _createTextVNode(" Aggiungi foto ", -1 /* CACHED */)
                      ]))]))
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.photoAdd.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_850, [
                _createElementVNode("div", _hoisted_851, [
                  _createElementVNode("div", _hoisted_852, [
                    _createElementVNode("h3", _hoisted_853, _toDisplayString(_ctx.photoAdd.files.length === 1 ? 'Nuova foto' : _ctx.photoAdd.files.length + ' nuove foto'), 1 /* TEXT */),
                    _createElementVNode("button", {
                      onClick: _cache[198] || (_cache[198] = (...args) => (_ctx.closePhotoAdd && _ctx.closePhotoAdd(...args))),
                      disabled: _ctx.photoAdd.busy,
                      class: "p-1 text-gray-400 hover:text-antracite",
                      "aria-label": "Chiudi"
                    }, [...(_cache[730] || (_cache[730] = [
                      _createElementVNode("svg", {
                        class: "w-6 h-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))], 8 /* PROPS */, _hoisted_854)
                  ]),
                  _createElementVNode("div", _hoisted_855, [
                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.photoAdd.previews, (u, i) => {
                      return (_openBlock(), _createElementBlock("img", {
                        key: 'pa-' + i,
                        src: u,
                        alt: "",
                        class: "h-28 aspect-[3/4] object-cover rounded-xl bg-gray-100 flex-shrink-0"
                      }, null, 8 /* PROPS */, _hoisted_856))
                    }), 128 /* KEYED_FRAGMENT */)),
                    (_ctx.photoAdd.files.length > _ctx.photoAdd.previews.length)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_857, "+" + _toDisplayString(_ctx.photoAdd.files.length - _ctx.photoAdd.previews.length), 1 /* TEXT */))
                      : _createCommentVNode("v-if", true)
                  ]),
                  _createElementVNode("div", null, [
                    _cache[731] || (_cache[731] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 pl-1" }, "Posa", -1 /* CACHED */)),
                    _createElementVNode("div", _hoisted_858, [
                      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.PHOTO_POSES, (pose) => {
                        return (_openBlock(), _createElementBlock("button", {
                          key: 'pap-' + pose.id,
                          type: "button",
                          onClick: $event => (_ctx.photoAdd.pose = pose.id),
                          class: _normalizeClass(["py-2.5 rounded-xl text-xs font-bold border transition-all", _ctx.photoAdd.pose === pose.id ? 'bg-salvia/10 border-salvia text-salvia' : 'bg-white border-gray-200 text-gray-500'])
                        }, _toDisplayString(pose.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_859))
                      }), 128 /* KEYED_FRAGMENT */))
                    ]),
                    _cache[732] || (_cache[732] = _createElementVNode("p", { class: "text-[10px] text-gray-400 font-medium mt-1.5 pl-1" }, "Confronti più belli se usi sempre la stessa posa, la stessa luce e lo stesso posto.", -1 /* CACHED */))
                  ]),
                  (_ctx.photoAdd.files.length === 1)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_860, [
                        _cache[733] || (_cache[733] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 pl-1" }, "Data", -1 /* CACHED */)),
                        _withDirectives(_createElementVNode("input", {
                          type: "date",
                          "onUpdate:modelValue": _cache[199] || (_cache[199] = $event => ((_ctx.photoAdd.date) = $event)),
                          max: _ctx.todayDateKey,
                          class: "w-full bg-gray-50 border border-gray-200 focus:border-salvia focus:ring-2 focus:ring-salvia/20 rounded-2xl p-3 text-sm font-semibold text-antracite outline-none transition-all"
                        }, null, 8 /* PROPS */, _hoisted_861), [
                          [_vModelText, _ctx.photoAdd.date]
                        ])
                      ]))
                    : (_openBlock(), _createElementBlock("p", _hoisted_862, "Ogni foto prende la data in cui è stata scattata. Potrai cambiarla aprendo la foto.")),
                  (_ctx.photoAdd.error)
                    ? (_openBlock(), _createElementBlock("p", _hoisted_863, _toDisplayString(_ctx.photoAdd.error), 1 /* TEXT */))
                    : _createCommentVNode("v-if", true),
                  _createElementVNode("button", {
                    onClick: _cache[200] || (_cache[200] = (...args) => (_ctx.savePhotoAdd && _ctx.savePhotoAdd(...args))),
                    disabled: _ctx.photoAdd.busy,
                    class: "w-full bg-salvia text-white font-bold py-3.5 rounded-2xl shadow-lg active:scale-95 transition-all disabled:opacity-60"
                  }, _toDisplayString(_ctx.photoAdd.busy ? 'Salvo… ' + _ctx.photoAdd.done + '/' + _ctx.photoAdd.files.length : 'Salva'), 9 /* TEXT, PROPS */, _hoisted_864)
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.photoStory.isOpen && _ctx.photoStoryPair)
            ? (_openBlock(), _createElementBlock("div", {
                key: 13,
                class: "fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/50 backdrop-blur-sm animate-fadeIn",
                onClick: _cache[204] || (_cache[204] = _withModifiers($event => (_ctx.photoStory.isOpen = false), ["self"]))
              }, [
                _createElementVNode("div", _hoisted_865, [
                  _createElementVNode("div", null, [
                    _cache[734] || (_cache[734] = _createElementVNode("p", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "Foto salvata", -1 /* CACHED */)),
                    _cache[735] || (_cache[735] = _createElementVNode("h3", { class: "text-xl font-extrabold text-antracite leading-tight mt-1" }, "La tua storia è pronta ✨", -1 /* CACHED */)),
                    _createElementVNode("p", _hoisted_866, [
                      _createTextVNode(_toDisplayString(_ctx.photoStoryPair.days) + " giorni dalla prima foto", 1 /* TEXT */),
                      (_ctx.photoStoryPair.diffText)
                        ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                            _createTextVNode(" · " + _toDisplayString(_ctx.photoStoryPair.diffText), 1 /* TEXT */)
                          ], 64 /* STABLE_FRAGMENT */))
                        : _createCommentVNode("v-if", true)
                    ])
                  ]),
                  _createElementVNode("div", _hoisted_867, [
                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList([{ p: _ctx.photoStoryPair.before, label: 'PRIMA' }, { p: _ctx.photoStoryPair.after, label: 'DOPO' }], (side) => {
                      return (_openBlock(), _createElementBlock("div", {
                        key: 'pst' + side.label,
                        class: "relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100"
                      }, [
                        _createElementVNode("img", {
                          src: side.p.thumbUrl,
                          alt: "",
                          class: "w-full h-full object-cover object-[50%_30%]"
                        }, null, 8 /* PROPS */, _hoisted_868),
                        _createElementVNode("span", {
                          class: _normalizeClass(["absolute top-2 left-2 text-[9px] font-black tracking-widest text-white rounded-full px-2 py-0.5", side.label === 'DOPO' ? 'cangiante-btn' : 'bg-black/50'])
                        }, _toDisplayString(side.label), 3 /* TEXT, CLASS */),
                        _createElementVNode("span", _hoisted_869, _toDisplayString(_ctx.photoDateLabel(side.p.date)), 1 /* TEXT */)
                      ]))
                    }), 128 /* KEYED_FRAGMENT */))
                  ]),
                  _createElementVNode("button", {
                    onClick: _cache[201] || (_cache[201] = (...args) => (_ctx.sharePhotoStory && _ctx.sharePhotoStory(...args))),
                    disabled: _ctx.photoCompare.busy,
                    class: "w-full cangiante-btn text-white font-bold py-3.5 rounded-2xl shadow-lg active:scale-95 transition-all disabled:opacity-60"
                  }, _toDisplayString(_ctx.photoCompare.busy ? 'Preparo…' : 'Condividi nelle storie'), 9 /* TEXT, PROPS */, _hoisted_870),
                  _createElementVNode("div", _hoisted_871, [
                    _createElementVNode("button", {
                      onClick: _cache[202] || (_cache[202] = (...args) => (_ctx.viewPhotoStory && _ctx.viewPhotoStory(...args))),
                      class: "py-3 rounded-xl text-sm font-bold text-antracite bg-gray-100 active:scale-95 transition-all"
                    }, "Guarda il confronto"),
                    _createElementVNode("button", {
                      onClick: _cache[203] || (_cache[203] = $event => (_ctx.photoStory.isOpen = false)),
                      class: "py-3 rounded-xl text-sm font-bold text-gray-500 bg-gray-50 active:scale-95 transition-all"
                    }, "Più tardi")
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.photoViewer.isOpen && _ctx.viewerPhoto)
            ? (_openBlock(), _createElementBlock("div", _hoisted_872, [
                _createElementVNode("div", _hoisted_873, [
                  _createElementVNode("button", {
                    onClick: _cache[205] || (_cache[205] = (...args) => (_ctx.closePhotoViewer && _ctx.closePhotoViewer(...args))),
                    class: "p-2 -ml-2",
                    "aria-label": "Chiudi"
                  }, [...(_cache[736] || (_cache[736] = [
                    _createElementVNode("svg", {
                      class: "w-6 h-6",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      "stroke-width": "2"
                    }, [
                      _createElementVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M6 18L18 6M6 6l12 12"
                      })
                    ], -1 /* CACHED */)
                  ]))]),
                  _createElementVNode("div", _hoisted_874, [
                    _createElementVNode("div", _hoisted_875, _toDisplayString(_ctx.photoDateLabel(_ctx.viewerPhoto.date)), 1 /* TEXT */),
                    _createElementVNode("div", _hoisted_876, [
                      _createTextVNode(_toDisplayString(_ctx.poseLabel(_ctx.viewerPhoto.pose)), 1 /* TEXT */),
                      (_ctx.photoWeight(_ctx.viewerPhoto.date) !== null)
                        ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                            _createTextVNode(" · " + _toDisplayString(_ctx.formatNumber(_ctx.photoWeight(_ctx.viewerPhoto.date))) + " kg", 1 /* TEXT */)
                          ], 64 /* STABLE_FRAGMENT */))
                        : _createCommentVNode("v-if", true)
                    ])
                  ]),
                  _createElementVNode("button", {
                    onClick: _cache[206] || (_cache[206] = $event => (_ctx.deletePhoto(_ctx.viewerPhoto))),
                    class: "p-2 -mr-2 text-white/70 hover:text-red-400",
                    "aria-label": "Elimina"
                  }, [...(_cache[737] || (_cache[737] = [
                    _createElementVNode("svg", {
                      class: "w-5 h-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      "stroke-width": "2"
                    }, [
                      _createElementVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M19 7l-.87 12.14A2 2 0 0116.14 21H7.86a2 2 0 01-1.99-1.86L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      })
                    ], -1 /* CACHED */)
                  ]))])
                ]),
                _createElementVNode("div", _hoisted_877, [
                  _createElementVNode("img", {
                    src: _ctx.photoViewer.url,
                    alt: "",
                    class: "max-w-full max-h-full object-contain"
                  }, null, 8 /* PROPS */, _hoisted_878),
                  (_ctx.viewerIndex > 0)
                    ? (_openBlock(), _createElementBlock("button", {
                        key: 0,
                        onClick: _cache[207] || (_cache[207] = $event => (_ctx.stepPhoto(-1))),
                        class: "absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center",
                        "aria-label": "Più recente"
                      }, [...(_cache[738] || (_cache[738] = [
                        _createElementVNode("svg", {
                          class: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2.5"
                        }, [
                          _createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M15 19l-7-7 7-7"
                          })
                        ], -1 /* CACHED */)
                      ]))]))
                    : _createCommentVNode("v-if", true),
                  (_ctx.viewerIndex > -1 && _ctx.viewerIndex < _ctx.galleryPhotos.length - 1)
                    ? (_openBlock(), _createElementBlock("button", {
                        key: 1,
                        onClick: _cache[208] || (_cache[208] = $event => (_ctx.stepPhoto(1))),
                        class: "absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center",
                        "aria-label": "Più vecchia"
                      }, [...(_cache[739] || (_cache[739] = [
                        _createElementVNode("svg", {
                          class: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2.5"
                        }, [
                          _createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M9 5l7 7-7 7"
                          })
                        ], -1 /* CACHED */)
                      ]))]))
                    : _createCommentVNode("v-if", true)
                ]),
                _createElementVNode("div", _hoisted_879, [
                  (_ctx.photoViewer.editing)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_880, [
                        _withDirectives(_createElementVNode("input", {
                          type: "date",
                          "onUpdate:modelValue": _cache[209] || (_cache[209] = $event => ((_ctx.photoViewer.date) = $event)),
                          max: _ctx.todayDateKey,
                          class: "w-full bg-white/10 border border-white/20 rounded-xl p-2.5 text-sm font-bold text-white outline-none [color-scheme:dark]"
                        }, null, 8 /* PROPS */, _hoisted_881), [
                          [_vModelText, _ctx.photoViewer.date]
                        ]),
                        _createElementVNode("div", _hoisted_882, [
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.PHOTO_POSES, (pose) => {
                            return (_openBlock(), _createElementBlock("button", {
                              key: 'pvp-' + pose.id,
                              onClick: $event => (_ctx.photoViewer.pose = pose.id),
                              class: _normalizeClass(["py-2 rounded-xl text-xs font-bold border transition-all", _ctx.photoViewer.pose === pose.id ? 'bg-white text-antracite border-white' : 'border-white/20 text-white/70'])
                            }, _toDisplayString(pose.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_883))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]),
                        _createElementVNode("div", _hoisted_884, [
                          _createElementVNode("button", {
                            onClick: _cache[210] || (_cache[210] = $event => (_ctx.photoViewer.editing = false)),
                            class: "flex-1 py-2.5 rounded-xl text-sm font-bold text-white/70 border border-white/20"
                          }, "Annulla"),
                          _createElementVNode("button", {
                            onClick: _cache[211] || (_cache[211] = (...args) => (_ctx.savePhotoEdit && _ctx.savePhotoEdit(...args))),
                            class: "flex-1 py-2.5 rounded-xl text-sm font-bold bg-salvia text-white"
                          }, "Salva")
                        ])
                      ]))
                    : (_openBlock(), _createElementBlock("div", _hoisted_885, [
                        _createElementVNode("button", {
                          onClick: _cache[212] || (_cache[212] = $event => {_ctx.photoViewer.editing = true; _ctx.photoViewer.date = _ctx.viewerPhoto.date; _ctx.photoViewer.pose = _ctx.viewerPhoto.pose}),
                          class: "py-3 rounded-xl text-sm font-bold text-white border border-white/20 active:scale-95 transition-all"
                        }, "Data e posa"),
                        (_ctx.photos.length >= 2)
                          ? (_openBlock(), _createElementBlock("button", {
                              key: 0,
                              onClick: _cache[213] || (_cache[213] = $event => {_ctx.startCompareSelect(); _ctx.togglePhotoSelect(_ctx.viewerPhoto); _ctx.closePhotoViewer()}),
                              class: "py-3 rounded-xl text-sm font-bold text-white cangiante-btn active:scale-95 transition-all"
                            }, "Confronta"))
                          : _createCommentVNode("v-if", true)
                      ]))
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.photoCompare.isOpen && _ctx.compareBefore && _ctx.compareAfter)
            ? (_openBlock(), _createElementBlock("div", _hoisted_886, [
                _createElementVNode("div", _hoisted_887, [
                  _createElementVNode("button", {
                    onClick: _cache[214] || (_cache[214] = (...args) => (_ctx.closeCompare && _ctx.closeCompare(...args))),
                    class: "p-2 -ml-2",
                    "aria-label": "Chiudi"
                  }, [...(_cache[740] || (_cache[740] = [
                    _createElementVNode("svg", {
                      class: "w-6 h-6",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      "stroke-width": "2"
                    }, [
                      _createElementVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M6 18L18 6M6 6l12 12"
                      })
                    ], -1 /* CACHED */)
                  ]))]),
                  _createElementVNode("div", _hoisted_888, [
                    _cache[741] || (_cache[741] = _createElementVNode("div", { class: "text-sm font-extrabold" }, "Prima e dopo", -1 /* CACHED */)),
                    (_ctx.compareStats)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_889, [
                          _createTextVNode(_toDisplayString(_ctx.compareStats.days) + " " + _toDisplayString(_ctx.compareStats.days === 1 ? 'giorno' : 'giorni'), 1 /* TEXT */),
                          (_ctx.compareStats.diffText)
                            ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                _createTextVNode(" · " + _toDisplayString(_ctx.compareStats.diffText), 1 /* TEXT */)
                              ], 64 /* STABLE_FRAGMENT */))
                            : _createCommentVNode("v-if", true)
                        ]))
                      : _createCommentVNode("v-if", true)
                  ]),
                  _createElementVNode("div", _hoisted_890, [
                    _createElementVNode("button", {
                      onClick: _cache[215] || (_cache[215] = $event => (_ctx.photoCompare.mode = 'slider')),
                      class: _normalizeClass(["px-2.5 py-1.5 rounded-lg text-[11px] font-bold", _ctx.photoCompare.mode === 'slider' ? 'bg-white text-antracite' : 'text-white/70'])
                    }, "Cursore", 2 /* CLASS */),
                    _createElementVNode("button", {
                      onClick: _cache[216] || (_cache[216] = $event => (_ctx.photoCompare.mode = 'side')),
                      class: _normalizeClass(["px-2.5 py-1.5 rounded-lg text-[11px] font-bold", _ctx.photoCompare.mode === 'side' ? 'bg-white text-antracite' : 'text-white/70'])
                    }, "Affiancate", 2 /* CLASS */)
                  ])
                ]),
                _createElementVNode("div", _hoisted_891, [
                  (_ctx.photoCompare.mode === 'slider')
                    ? (_openBlock(), _createElementBlock("div", {
                        key: 0,
                        class: "relative w-full max-h-full aspect-[3/4] rounded-2xl overflow-hidden bg-white/5 touch-none select-none",
                        onPointerdown: _cache[217] || (_cache[217] = (...args) => (_ctx.dragCompare && _ctx.dragCompare(...args))),
                        onPointermove: _cache[218] || (_cache[218] = $event => (($event.buttons || $event.pointerType === 'touch') && _ctx.dragCompare($event)))
                      }, [
                        _createElementVNode("img", {
                          src: _ctx.photoCompare.afterUrl,
                          alt: "",
                          class: "absolute inset-0 w-full h-full object-cover object-[50%_30%] pointer-events-none",
                          draggable: "false"
                        }, null, 8 /* PROPS */, _hoisted_892),
                        _createElementVNode("img", {
                          src: _ctx.photoCompare.beforeUrl,
                          alt: "",
                          class: "absolute inset-0 w-full h-full object-cover object-[50%_30%] pointer-events-none",
                          draggable: "false",
                          style: _normalizeStyle({ clipPath: 'inset(0 ' + (100 - _ctx.photoCompare.split) + '% 0 0)' })
                        }, null, 12 /* STYLE, PROPS */, _hoisted_893),
                        _createElementVNode("div", {
                          class: "absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.6)] pointer-events-none",
                          style: _normalizeStyle({ left: _ctx.photoCompare.split + '%' })
                        }, [...(_cache[742] || (_cache[742] = [
                          _createElementVNode("div", { class: "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-9 h-9 rounded-full bg-white text-antracite flex items-center justify-center shadow-lg" }, [
                            _createElementVNode("svg", {
                              class: "w-5 h-5",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              "stroke-width": "2.5"
                            }, [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M8 9l-3 3 3 3M16 9l3 3-3 3"
                              })
                            ])
                          ], -1 /* CACHED */)
                        ]))], 4 /* STYLE */),
                        _createElementVNode("span", _hoisted_894, "PRIMA · " + _toDisplayString(_ctx.photoDateLabel(_ctx.compareBefore.date)), 1 /* TEXT */),
                        _createElementVNode("span", _hoisted_895, "DOPO · " + _toDisplayString(_ctx.photoDateLabel(_ctx.compareAfter.date)), 1 /* TEXT */)
                      ], 32 /* NEED_HYDRATION */))
                    : (_openBlock(), _createElementBlock("div", _hoisted_896, [
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList([{ p: _ctx.compareBefore, url: _ctx.photoCompare.beforeUrl, label: 'PRIMA' }, { p: _ctx.compareAfter, url: _ctx.photoCompare.afterUrl, label: 'DOPO' }], (side) => {
                          return (_openBlock(), _createElementBlock("div", {
                            key: 'cs-' + side.label,
                            class: "space-y-1.5"
                          }, [
                            _createElementVNode("div", _hoisted_897, [
                              _createElementVNode("img", {
                                src: side.url,
                                alt: "",
                                class: "w-full h-full object-cover object-[50%_30%]"
                              }, null, 8 /* PROPS */, _hoisted_898),
                              _createElementVNode("span", {
                                class: _normalizeClass(["absolute top-2 left-2 text-[9px] font-black tracking-widest rounded-full px-2 py-0.5", side.label === 'DOPO' ? 'cangiante-btn' : 'bg-black/50'])
                              }, _toDisplayString(side.label), 3 /* TEXT, CLASS */)
                            ]),
                            _createElementVNode("div", _hoisted_899, [
                              _createElementVNode("div", _hoisted_900, _toDisplayString(_ctx.photoDateLabel(side.p.date)), 1 /* TEXT */),
                              (_ctx.photoWeight(side.p.date) !== null)
                                ? (_openBlock(), _createElementBlock("div", _hoisted_901, _toDisplayString(_ctx.formatNumber(_ctx.photoWeight(side.p.date))) + " kg", 1 /* TEXT */))
                                : _createCommentVNode("v-if", true)
                            ])
                          ]))
                        }), 128 /* KEYED_FRAGMENT */))
                      ]))
                ]),
                _createElementVNode("div", _hoisted_902, [
                  _createElementVNode("button", {
                    onClick: _cache[219] || (_cache[219] = $event => {_ctx.closeCompare(); _ctx.openGallery(); _ctx.startCompareSelect()}),
                    class: "py-3 rounded-xl text-sm font-bold text-white border border-white/20 active:scale-95 transition-all"
                  }, "Cambia foto"),
                  _createElementVNode("button", {
                    onClick: _cache[220] || (_cache[220] = (...args) => (_ctx.shareCompare && _ctx.shareCompare(...args))),
                    disabled: _ctx.photoCompare.busy,
                    class: "py-3 rounded-xl text-sm font-bold text-white cangiante-btn active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-1.5"
                  }, [
                    _cache[743] || (_cache[743] = _createElementVNode("svg", {
                      class: "w-4 h-4",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      "stroke-width": "2.2"
                    }, [
                      _createElementVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      })
                    ], -1 /* CACHED */)),
                    _createTextVNode(" " + _toDisplayString(_ctx.photoCompare.busy ? 'Preparo…' : 'Condividi storia'), 1 /* TEXT */)
                  ], 8 /* PROPS */, _hoisted_903)
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.homeSwap.isOpen && _ctx.homeDayPlan)
            ? (_openBlock(), _createElementBlock("div", {
                key: 16,
                class: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn",
                onClick: _cache[223] || (_cache[223] = _withModifiers($event => (_ctx.homeSwap.isOpen = false), ["self"]))
              }, [
                _createElementVNode("div", _hoisted_904, [
                  _createElementVNode("div", _hoisted_905, [
                    _createElementVNode("div", null, [
                      _cache[744] || (_cache[744] = _createElementVNode("p", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "Oggi niente palestra", -1 /* CACHED */)),
                      _createElementVNode("h3", _hoisted_906, _toDisplayString(_ctx.homeDayPlan.name) + " · a casa", 1 /* TEXT */),
                      _cache[745] || (_cache[745] = _createElementVNode("p", { class: "text-xs text-gray-500 font-medium mt-1" }, "Stessi muscoli, esercizi da fare a casa o a corpo libero.", -1 /* CACHED */))
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[221] || (_cache[221] = $event => (_ctx.homeSwap.isOpen = false)),
                      class: "p-1 text-gray-400 hover:text-antracite",
                      "aria-label": "Chiudi"
                    }, [...(_cache[746] || (_cache[746] = [
                      _createElementVNode("svg", {
                        class: "w-6 h-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  _createElementVNode("div", _hoisted_907, [
                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.homeDayPlan.rows, (row, i) => {
                      return (_openBlock(), _createElementBlock("div", {
                        key: 'hs' + i,
                        class: _normalizeClass(["rounded-2xl border px-3.5 py-2.5", row.alt ? 'border-gray-100 bg-gray-50' : 'border-dashed border-gray-200'])
                      }, [
                        _createElementVNode("p", {
                          class: _normalizeClass(["text-[10px] font-bold text-gray-400 truncate", row.same ? '' : 'line-through'])
                        }, _toDisplayString(row.ex.name), 3 /* TEXT, CLASS */),
                        (row.same)
                          ? (_openBlock(), _createElementBlock("p", _hoisted_908, "Va bene anche a casa ✓"))
                          : (row.alt)
                            ? (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                                _createElementVNode("p", _hoisted_909, "→ " + _toDisplayString(row.alt.n), 1 /* TEXT */),
                                _createElementVNode("p", _hoisted_910, _toDisplayString(row.alt.t === 'cardio' ? (row.alt.d || 15) + ' min' : (row.alt.s || 3) + ' × ' + row.alt.r), 1 /* TEXT */)
                              ], 64 /* STABLE_FRAGMENT */))
                            : (_openBlock(), _createElementBlock("p", _hoisted_911, "Nessuna alternativa a casa: oggi lo salti."))
                      ], 2 /* CLASS */))
                    }), 128 /* KEYED_FRAGMENT */))
                  ]),
                  _createElementVNode("button", {
                    onClick: _cache[222] || (_cache[222] = (...args) => (_ctx.startHomeDay && _ctx.startHomeDay(...args))),
                    disabled: !_ctx.homeDayPlan.count,
                    class: "w-full bg-arancione text-white font-bold py-3.5 rounded-2xl shadow-lg active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  }, [...(_cache[747] || (_cache[747] = [
                    _createElementVNode("svg", {
                      class: "w-5 h-5",
                      fill: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      _createElementVNode("path", { d: "M8 5v14l11-7z" })
                    ], -1 /* CACHED */),
                    _createTextVNode(" Avvia la versione a casa ", -1 /* CACHED */)
                  ]))], 8 /* PROPS */, _hoisted_912)
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.measurementModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_913, [
                _createElementVNode("div", _hoisted_914, [
                  _createElementVNode("div", _hoisted_915, [
                    _createElementVNode("div", _hoisted_916, [
                      _cache[749] || (_cache[749] = _createElementVNode("div", { class: "w-10 h-10 rounded-xl bg-salvia/10 flex items-center justify-center text-salvia border border-salvia/20" }, [
                        _createElementVNode("svg", {
                          class: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2"
                        }, [
                          _createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          })
                        ])
                      ], -1 /* CACHED */)),
                      _createElementVNode("div", null, [
                        _createElementVNode("h3", _hoisted_917, _toDisplayString(_ctx.editingMeasurementId !== null ? 'Modifica misurazione' : 'Nuova misurazione'), 1 /* TEXT */),
                        _cache[748] || (_cache[748] = _createElementVNode("p", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "Progressi", -1 /* CACHED */))
                      ])
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[224] || (_cache[224] = $event => (_ctx.measurementModal.isOpen = false)),
                      class: "p-1 text-gray-400 hover:text-antracite"
                    }, [...(_cache[750] || (_cache[750] = [
                      _createElementVNode("svg", {
                        class: "w-6 h-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  _createElementVNode("div", _hoisted_918, [
                    _createElementVNode("div", null, [
                      _cache[751] || (_cache[751] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 pl-1" }, "Data", -1 /* CACHED */)),
                      _withDirectives(_createElementVNode("input", {
                        type: "date",
                        "onUpdate:modelValue": _cache[225] || (_cache[225] = $event => ((_ctx.newMeasurement.date) = $event)),
                        class: "w-full bg-gray-50 border border-gray-200 focus:border-salvia focus:ring-2 focus:ring-salvia/20 rounded-2xl p-3 text-sm font-semibold text-antracite outline-none transition-all"
                      }, null, 512 /* NEED_PATCH */), [
                        [_vModelText, _ctx.newMeasurement.date]
                      ])
                    ]),
                    _createElementVNode("div", null, [
                      _cache[752] || (_cache[752] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 pl-1" }, "Peso (kg)", -1 /* CACHED */)),
                      _withDirectives(_createElementVNode("input", {
                        type: "text",
                        inputmode: "decimal",
                        "onUpdate:modelValue": _cache[226] || (_cache[226] = $event => ((_ctx.newMeasurement.weight) = $event)),
                        placeholder: "Es: 79,4",
                        class: "w-full bg-gray-50 border border-gray-200 focus:border-salvia focus:ring-2 focus:ring-salvia/20 rounded-2xl p-3 text-sm font-semibold text-antracite outline-none transition-all placeholder:font-medium"
                      }, null, 512 /* NEED_PATCH */), [
                        [_vModelText, _ctx.newMeasurement.weight]
                      ])
                    ]),
                    _createElementVNode("div", null, [
                      _cache[758] || (_cache[758] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 pl-1" }, "Circonferenze (cm)", -1 /* CACHED */)),
                      _createElementVNode("div", _hoisted_919, [
                        _createElementVNode("div", null, [
                          _cache[753] || (_cache[753] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-500 mb-1 text-center" }, "Petto", -1 /* CACHED */)),
                          _withDirectives(_createElementVNode("input", {
                            type: "text",
                            inputmode: "decimal",
                            "onUpdate:modelValue": _cache[227] || (_cache[227] = $event => ((_ctx.newMeasurement.chest) = $event)),
                            placeholder: "—",
                            class: "w-full bg-gray-50 border border-gray-200 focus:border-salvia focus:ring-2 focus:ring-salvia/20 rounded-xl p-3 text-sm font-semibold text-antracite text-center outline-none transition-all placeholder:text-gray-300"
                          }, null, 512 /* NEED_PATCH */), [
                            [_vModelText, _ctx.newMeasurement.chest]
                          ])
                        ]),
                        _createElementVNode("div", null, [
                          _cache[754] || (_cache[754] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-500 mb-1 text-center" }, "Braccia", -1 /* CACHED */)),
                          _withDirectives(_createElementVNode("input", {
                            type: "text",
                            inputmode: "decimal",
                            "onUpdate:modelValue": _cache[228] || (_cache[228] = $event => ((_ctx.newMeasurement.arms) = $event)),
                            placeholder: "—",
                            class: "w-full bg-gray-50 border border-gray-200 focus:border-salvia focus:ring-2 focus:ring-salvia/20 rounded-xl p-3 text-sm font-semibold text-antracite text-center outline-none transition-all placeholder:text-gray-300"
                          }, null, 512 /* NEED_PATCH */), [
                            [_vModelText, _ctx.newMeasurement.arms]
                          ])
                        ]),
                        _createElementVNode("div", null, [
                          _cache[755] || (_cache[755] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-500 mb-1 text-center" }, "Vita", -1 /* CACHED */)),
                          _withDirectives(_createElementVNode("input", {
                            type: "text",
                            inputmode: "decimal",
                            "onUpdate:modelValue": _cache[229] || (_cache[229] = $event => ((_ctx.newMeasurement.waist) = $event)),
                            placeholder: "—",
                            class: "w-full bg-gray-50 border border-gray-200 focus:border-salvia focus:ring-2 focus:ring-salvia/20 rounded-xl p-3 text-sm font-semibold text-antracite text-center outline-none transition-all placeholder:text-gray-300"
                          }, null, 512 /* NEED_PATCH */), [
                            [_vModelText, _ctx.newMeasurement.waist]
                          ])
                        ])
                      ]),
                      _createElementVNode("div", _hoisted_920, [
                        _createElementVNode("div", null, [
                          _cache[756] || (_cache[756] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-500 mb-1 text-center" }, "Cosce", -1 /* CACHED */)),
                          _withDirectives(_createElementVNode("input", {
                            type: "text",
                            inputmode: "decimal",
                            "onUpdate:modelValue": _cache[230] || (_cache[230] = $event => ((_ctx.newMeasurement.thighs) = $event)),
                            placeholder: "—",
                            class: "w-full bg-gray-50 border border-gray-200 focus:border-salvia focus:ring-2 focus:ring-salvia/20 rounded-xl p-3 text-sm font-semibold text-antracite text-center outline-none transition-all placeholder:text-gray-300"
                          }, null, 512 /* NEED_PATCH */), [
                            [_vModelText, _ctx.newMeasurement.thighs]
                          ])
                        ]),
                        _createElementVNode("div", null, [
                          _cache[757] || (_cache[757] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-500 mb-1 text-center" }, "Pancia", -1 /* CACHED */)),
                          _withDirectives(_createElementVNode("input", {
                            type: "text",
                            inputmode: "decimal",
                            "onUpdate:modelValue": _cache[231] || (_cache[231] = $event => ((_ctx.newMeasurement.belly) = $event)),
                            placeholder: "—",
                            class: "w-full bg-gray-50 border border-gray-200 focus:border-salvia focus:ring-2 focus:ring-salvia/20 rounded-xl p-3 text-sm font-semibold text-antracite text-center outline-none transition-all placeholder:text-gray-300"
                          }, null, 512 /* NEED_PATCH */), [
                            [_vModelText, _ctx.newMeasurement.belly]
                          ])
                        ])
                      ])
                    ])
                  ]),
                  _createElementVNode("div", _hoisted_921, [
                    (_ctx.measurementModal.error)
                      ? (_openBlock(), _createElementBlock("p", _hoisted_922, _toDisplayString(_ctx.measurementModal.error), 1 /* TEXT */))
                      : _createCommentVNode("v-if", true),
                    _createElementVNode("button", {
                      onClick: _cache[232] || (_cache[232] = (...args) => (_ctx.saveMeasurement && _ctx.saveMeasurement(...args))),
                      class: "w-full bg-salvia text-white font-bold py-3.5 rounded-2xl shadow-lg hover:bg-salvia/90 active:scale-95 transition-all flex items-center justify-center gap-2"
                    }, [
                      _cache[759] || (_cache[759] = _createElementVNode("svg", {
                        class: "w-5 h-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2.5"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M5 13l4 4L19 7"
                        })
                      ], -1 /* CACHED */)),
                      _createTextVNode(" " + _toDisplayString(_ctx.editingMeasurementId !== null ? 'Aggiorna misurazione' : 'Salva misurazione'), 1 /* TEXT */)
                    ]),
                    (_ctx.editingMeasurementId !== null)
                      ? (_openBlock(), _createElementBlock("button", {
                          key: 1,
                          onClick: _cache[233] || (_cache[233] = (...args) => (_ctx.promptDeleteEditingMeasurement && _ctx.promptDeleteEditingMeasurement(...args))),
                          class: "w-full bg-white border border-red-200 text-red-500 font-bold py-3 rounded-2xl hover:bg-red-50 active:scale-95 transition-all flex items-center justify-center gap-2"
                        }, [...(_cache[760] || (_cache[760] = [
                          _createElementVNode("svg", {
                            class: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            "stroke-width": "2"
                          }, [
                            _createElementVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            })
                          ], -1 /* CACHED */),
                          _createTextVNode(" Elimina misurazione ", -1 /* CACHED */)
                        ]))]))
                      : _createCommentVNode("v-if", true)
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.historyModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_923, [
                _createElementVNode("div", _hoisted_924, [
                  _createElementVNode("div", _hoisted_925, [
                    _createElementVNode("div", _hoisted_926, [
                      _createElementVNode("div", _hoisted_927, _toDisplayString(_ctx.historyIcon), 1 /* TEXT */),
                      _createElementVNode("div", null, [
                        _createElementVNode("h3", _hoisted_928, "Storico " + _toDisplayString(_ctx.historyLabel), 1 /* TEXT */),
                        _createElementVNode("p", _hoisted_929, _toDisplayString(_ctx.historyRows.length) + " misurazion" + _toDisplayString(_ctx.historyRows.length === 1 ? 'e' : 'i'), 1 /* TEXT */)
                      ])
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[234] || (_cache[234] = (...args) => (_ctx.closeHistory && _ctx.closeHistory(...args))),
                      class: "p-1 text-gray-400 hover:text-antracite"
                    }, [...(_cache[761] || (_cache[761] = [
                      _createElementVNode("svg", {
                        class: "w-6 h-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  (_ctx.historyRows.length === 0)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_930, " Nessuna misurazione registrata. "))
                    : (_openBlock(), _createElementBlock("div", _hoisted_931, [
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.historyRows, (row) => {
                          return (_openBlock(), _createElementBlock("div", {
                            key: row.entry.id,
                            class: "flex items-center justify-between gap-2 p-3 bg-gray-50 border border-gray-100 rounded-2xl"
                          }, [
                            _createElementVNode("div", _hoisted_932, [
                              _createElementVNode("div", _hoisted_933, _toDisplayString(_ctx.formatDate(row.entry.date)), 1 /* TEXT */),
                              _createElementVNode("div", _hoisted_934, [
                                _createTextVNode(_toDisplayString(_ctx.formatNumber(row.value)) + " ", 1 /* TEXT */),
                                _createElementVNode("span", _hoisted_935, _toDisplayString(_ctx.historyUnit), 1 /* TEXT */)
                              ])
                            ]),
                            _createElementVNode("div", _hoisted_936, [
                              (row.delta !== null)
                                ? (_openBlock(), _createElementBlock("div", {
                                    key: 0,
                                    class: _normalizeClass(["text-xs font-bold", row.deltaColor])
                                  }, _toDisplayString(row.deltaText), 3 /* TEXT, CLASS */))
                                : (_openBlock(), _createElementBlock("div", _hoisted_937, "Inizio"))
                            ]),
                            _createElementVNode("div", _hoisted_938, [
                              _createElementVNode("button", {
                                onClick: _withModifiers($event => (_ctx.editMeasurement(row.entry)), ["stop"]),
                                class: "p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-viola hover:border-viola/30 transition-colors",
                                "aria-label": "Modifica misurazione"
                              }, [...(_cache[762] || (_cache[762] = [
                                _createElementVNode("svg", {
                                  class: "w-4 h-4",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24",
                                  "stroke-width": "2"
                                }, [
                                  _createElementVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  })
                                ], -1 /* CACHED */)
                              ]))], 8 /* PROPS */, _hoisted_939),
                              _createElementVNode("button", {
                                onClick: _withModifiers($event => (_ctx.confirmDeleteMeasurement(row.entry)), ["stop"]),
                                class: "p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 transition-colors",
                                "aria-label": "Elimina misurazione"
                              }, [...(_cache[763] || (_cache[763] = [
                                _createElementVNode("svg", {
                                  class: "w-4 h-4",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24",
                                  "stroke-width": "2"
                                }, [
                                  _createElementVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  })
                                ], -1 /* CACHED */)
                              ]))], 8 /* PROPS */, _hoisted_940)
                            ])
                          ]))
                        }), 128 /* KEYED_FRAGMENT */))
                      ])),
                  _createElementVNode("div", _hoisted_941, [
                    _createElementVNode("button", {
                      onClick: _cache[235] || (_cache[235] = $event => {_ctx.closeHistory(); _ctx.openMeasurementModal()}),
                      class: "w-full bg-salvia text-white font-bold py-3.5 rounded-2xl shadow-lg hover:bg-salvia/90 active:scale-95 transition-all flex items-center justify-center gap-2"
                    }, [...(_cache[764] || (_cache[764] = [
                      _createElementVNode("svg", {
                        class: "w-5 h-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2.5"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M12 4v16m8-8H4"
                        })
                      ], -1 /* CACHED */),
                      _createTextVNode(" Aggiungi misurazione ", -1 /* CACHED */)
                    ]))])
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.exerciseHistoryModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_942, [
                _createElementVNode("div", _hoisted_943, [
                  _createElementVNode("div", _hoisted_944, [
                    _createElementVNode("div", _hoisted_945, [
                      _cache[765] || (_cache[765] = _createElementVNode("div", { class: "w-10 h-10 rounded-xl bg-arancione/10 flex items-center justify-center text-arancione border border-arancione/20 flex-shrink-0" }, [
                        _createElementVNode("svg", {
                          class: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2"
                        }, [
                          _createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          })
                        ])
                      ], -1 /* CACHED */)),
                      _createElementVNode("div", _hoisted_946, [
                        _createElementVNode("h3", _hoisted_947, _toDisplayString(_ctx.exerciseHistoryModal.exerciseName), 1 /* TEXT */),
                        _createElementVNode("p", _hoisted_948, _toDisplayString(_ctx.exerciseHistoryModal.sheetName), 1 /* TEXT */)
                      ])
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[236] || (_cache[236] = $event => (_ctx.exerciseHistoryModal.isOpen = false)),
                      class: "p-1 text-gray-400 hover:text-antracite flex-shrink-0"
                    }, [...(_cache[766] || (_cache[766] = [
                      _createElementVNode("svg", {
                        class: "w-6 h-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  (_ctx.exerciseHistoryLogs.length === 0)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_949, " Nessuna registrazione: scrivi il valore nella scheda e tocca ✓ per iniziare a tracciare i carichi. "))
                    : (_openBlock(), _createElementBlock("div", _hoisted_950, [
                        (_ctx.exerciseHistorySuggestion)
                          ? (_openBlock(), _createElementBlock("div", {
                              key: 0,
                              class: _normalizeClass(["rounded-2xl p-4 border mb-2", _ctx.exerciseHistorySuggestion.kind === 'up' ? 'bg-salvia/10 border-salvia/30' : (_ctx.exerciseHistorySuggestion.kind === 'down' ? 'bg-sky-500/10 border-sky-500/30' : 'bg-gray-50 border-gray-100')])
                            }, [
                              _createElementVNode("div", _hoisted_951, "Prossima volta" + _toDisplayString(_ctx.exerciseHistorySuggestion.top), 1 /* TEXT */),
                              _createElementVNode("div", _hoisted_952, [
                                _createTextVNode(_toDisplayString(_ctx.formatNumber(_ctx.exerciseHistorySuggestion.value)) + " ", 1 /* TEXT */),
                                _cache[767] || (_cache[767] = _createElementVNode("span", { class: "text-xs font-bold text-gray-400" }, "kg", -1 /* CACHED */)),
                                (_ctx.exerciseHistorySuggestion.delta)
                                  ? (_openBlock(), _createElementBlock("span", {
                                      key: 0,
                                      class: _normalizeClass(["text-sm font-bold ml-1", _ctx.exerciseHistorySuggestion.delta > 0 ? 'text-salvia' : 'text-sky-600'])
                                    }, _toDisplayString(_ctx.exerciseHistorySuggestion.delta > 0 ? '+' : '') + _toDisplayString(_ctx.formatNumber(_ctx.exerciseHistorySuggestion.delta)), 3 /* TEXT, CLASS */))
                                  : _createCommentVNode("v-if", true)
                              ]),
                              _createElementVNode("p", _hoisted_953, _toDisplayString(_ctx.exerciseHistorySuggestion.reason), 1 /* TEXT */)
                            ], 2 /* CLASS */))
                          : _createCommentVNode("v-if", true),
                        (_ctx.exerciseChart)
                          ? (_openBlock(), _createElementBlock("div", _hoisted_954, [
                              _createElementVNode("div", _hoisted_955, [
                                _createElementVNode("div", null, [
                                  _cache[768] || (_cache[768] = _createElementVNode("div", { class: "text-[9px] font-bold text-gray-400 uppercase tracking-widest" }, "Attuale", -1 /* CACHED */)),
                                  _createElementVNode("div", _hoisted_956, [
                                    _createTextVNode(_toDisplayString(_ctx.formatNumber(_ctx.exerciseChart.last)), 1 /* TEXT */),
                                    _createElementVNode("span", _hoisted_957, _toDisplayString(_ctx.exerciseChart.unit), 1 /* TEXT */)
                                  ])
                                ]),
                                _createElementVNode("div", null, [
                                  _cache[769] || (_cache[769] = _createElementVNode("div", { class: "text-[9px] font-bold text-gray-400 uppercase tracking-widest" }, "Record", -1 /* CACHED */)),
                                  _createElementVNode("div", _hoisted_958, [
                                    _createTextVNode(_toDisplayString(_ctx.formatNumber(_ctx.exerciseChart.best)), 1 /* TEXT */),
                                    _createElementVNode("span", _hoisted_959, _toDisplayString(_ctx.exerciseChart.unit), 1 /* TEXT */)
                                  ])
                                ]),
                                _createElementVNode("div", null, [
                                  _cache[770] || (_cache[770] = _createElementVNode("div", { class: "text-[9px] font-bold text-gray-400 uppercase tracking-widest" }, "Dall'inizio", -1 /* CACHED */)),
                                  _createElementVNode("div", {
                                    class: _normalizeClass(["text-lg font-extrabold leading-tight", _ctx.exerciseChart.delta > 0 ? 'text-salvia' : (_ctx.exerciseChart.delta < 0 ? 'text-red-500' : 'text-gray-400')])
                                  }, [
                                    _createTextVNode(_toDisplayString(_ctx.exerciseChart.delta > 0 ? '+' : '') + _toDisplayString(_ctx.exerciseChart.delta === 0 ? '=' : _ctx.formatNumber(_ctx.exerciseChart.delta)), 1 /* TEXT */),
                                    _createElementVNode("span", _hoisted_960, _toDisplayString(_ctx.exerciseChart.delta === 0 ? '' : _ctx.exerciseChart.unit), 1 /* TEXT */)
                                  ], 2 /* CLASS */)
                                ])
                              ]),
                              _createElementVNode("div", _hoisted_961, [
                                (_openBlock(), _createElementBlock("svg", {
                                  class: "w-full h-auto overflow-visible touch-none select-none",
                                  viewBox: "0 0 300 140",
                                  role: "img",
                                  "aria-label": 'Andamento: da ' + _ctx.formatNumber(_ctx.exerciseChart.first) + ' a ' + _ctx.formatNumber(_ctx.exerciseChart.last) + ' ' + _ctx.exerciseChart.unit + ' in ' + _ctx.exerciseChart.sessions + ' sessioni',
                                  onPointerdown: _cache[237] || (_cache[237] = (...args) => (_ctx.onExerciseChartPointer && _ctx.onExerciseChartPointer(...args))),
                                  onPointermove: _cache[238] || (_cache[238] = (...args) => (_ctx.onExerciseChartPointer && _ctx.onExerciseChartPointer(...args))),
                                  onPointerleave: _cache[239] || (_cache[239] = (...args) => (_ctx.onExerciseChartLeave && _ctx.onExerciseChartLeave(...args)))
                                }, [
                                  _createElementVNode("defs", null, [
                                    _createElementVNode("linearGradient", _hoisted_963, [
                                      _createElementVNode("stop", {
                                        offset: "0%",
                                        "stop-color": _ctx.exerciseChart.color,
                                        "stop-opacity": "0.22"
                                      }, null, 8 /* PROPS */, _hoisted_964),
                                      _createElementVNode("stop", {
                                        offset: "100%",
                                        "stop-color": _ctx.exerciseChart.color,
                                        "stop-opacity": "0"
                                      }, null, 8 /* PROPS */, _hoisted_965)
                                    ])
                                  ]),
                                  (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.exerciseChart.grid, (g) => {
                                    return (_openBlock(), _createElementBlock("g", {
                                      key: 'g' + g.y
                                    }, [
                                      _createElementVNode("line", {
                                        x1: "16",
                                        y1: g.y,
                                        x2: "284",
                                        y2: g.y,
                                        class: "chart-grid",
                                        stroke: "#E5E7EB",
                                        "stroke-dasharray": "3,3"
                                      }, null, 8 /* PROPS */, _hoisted_966),
                                      _createElementVNode("text", {
                                        x: "0",
                                        y: g.y + 3,
                                        fill: "#9CA3AF",
                                        "font-size": "8",
                                        "font-weight": "600"
                                      }, _toDisplayString(g.label), 9 /* TEXT, PROPS */, _hoisted_967)
                                    ]))
                                  }), 128 /* KEYED_FRAGMENT */)),
                                  _createElementVNode("polygon", {
                                    points: _ctx.exerciseChart.area,
                                    fill: "url(#exerciseAreaGrad)"
                                  }, null, 8 /* PROPS */, _hoisted_968),
                                  _createElementVNode("polyline", {
                                    points: _ctx.exerciseChart.line,
                                    fill: "none",
                                    stroke: _ctx.exerciseChart.color,
                                    "stroke-width": "2",
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round"
                                  }, null, 8 /* PROPS */, _hoisted_969),
                                  (_ctx.exerciseChartActive !== null && _ctx.exerciseChart.points[_ctx.exerciseChartActive])
                                    ? (_openBlock(), _createElementBlock("line", {
                                        key: 0,
                                        x1: _ctx.exerciseChart.points[_ctx.exerciseChartActive].x,
                                        y1: "14",
                                        x2: _ctx.exerciseChart.points[_ctx.exerciseChartActive].x,
                                        y2: "122",
                                        stroke: "#9CA3AF",
                                        "stroke-width": "1"
                                      }, null, 8 /* PROPS */, _hoisted_970))
                                    : _createCommentVNode("v-if", true),
                                  (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.exerciseChart.points, (pt, i) => {
                                    return (_openBlock(), _createElementBlock("g", {
                                      key: 'p' + i
                                    }, [
                                      _createElementVNode("circle", {
                                        cx: pt.x,
                                        cy: pt.y,
                                        r: _ctx.exerciseChartActive === i ? 5.5 : 4,
                                        class: "chart-dot",
                                        fill: "#FFFFFF",
                                        stroke: _ctx.exerciseChart.color,
                                        "stroke-width": "2"
                                      }, null, 8 /* PROPS */, _hoisted_971),
                                      (pt.label && _ctx.exerciseChartActive === null)
                                        ? (_openBlock(), _createElementBlock("text", {
                                            key: 0,
                                            x: Math.min(Math.max(pt.x, 14), 286),
                                            y: pt.y - 9,
                                            "text-anchor": "middle",
                                            class: "chart-label",
                                            fill: "#1D1D1D",
                                            "font-size": "9",
                                            "font-weight": "800"
                                          }, _toDisplayString(_ctx.formatNumber(pt.value)), 9 /* TEXT, PROPS */, _hoisted_972))
                                        : _createCommentVNode("v-if", true)
                                    ]))
                                  }), 128 /* KEYED_FRAGMENT */)),
                                  _createElementVNode("text", _hoisted_973, _toDisplayString(_ctx.formatDate(_ctx.exerciseChart.firstDate)), 1 /* TEXT */),
                                  _createElementVNode("text", _hoisted_974, _toDisplayString(_ctx.formatDate(_ctx.exerciseChart.lastDate)), 1 /* TEXT */)
                                ], 40 /* PROPS, NEED_HYDRATION */, _hoisted_962)),
                                (_ctx.exerciseChartActive !== null && _ctx.exerciseChart.points[_ctx.exerciseChartActive])
                                  ? (_openBlock(), _createElementBlock("div", {
                                      key: 0,
                                      class: "absolute -top-2 pointer-events-none bg-antracite text-white rounded-lg px-2 py-1 shadow-lg whitespace-nowrap -translate-x-1/2 -translate-y-full",
                                      style: _normalizeStyle({ left: Math.min(Math.max(_ctx.exerciseChart.points[_ctx.exerciseChartActive].x / 300 * 100, 14), 86) + '%' })
                                    }, [
                                      _createElementVNode("div", _hoisted_975, _toDisplayString(_ctx.formatDate(_ctx.exerciseChart.points[_ctx.exerciseChartActive].date)), 1 /* TEXT */),
                                      _createElementVNode("div", _hoisted_976, [
                                        _createTextVNode(_toDisplayString(_ctx.formatNumber(_ctx.exerciseChart.points[_ctx.exerciseChartActive].value)) + " " + _toDisplayString(_ctx.exerciseChart.unit), 1 /* TEXT */),
                                        (_ctx.exerciseChart.points[_ctx.exerciseChartActive].reps)
                                          ? (_openBlock(), _createElementBlock("span", _hoisted_977, " × " + _toDisplayString(_ctx.exerciseChart.points[_ctx.exerciseChartActive].reps), 1 /* TEXT */))
                                          : _createCommentVNode("v-if", true)
                                      ])
                                    ], 4 /* STYLE */))
                                  : _createCommentVNode("v-if", true)
                              ]),
                              _createElementVNode("p", _hoisted_978, _toDisplayString(_ctx.exerciseChart.sessions) + " " + _toDisplayString((_ctx.exerciseChart.sessions) === 1 ? 'sessione' : 'sessioni') + " · tocca il grafico per i dettagli", 1 /* TEXT */)
                            ]))
                          : (_openBlock(), _createElementBlock("p", _hoisted_979, "Il grafico comparirà dalla seconda sessione registrata.")),
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.exerciseHistoryLogs, (log) => {
                          return (_openBlock(), _createElementBlock("div", {
                            key: log.id,
                            class: "flex items-center justify-between gap-2 p-3 bg-gray-50 border border-gray-100 rounded-2xl"
                          }, [
                            _createElementVNode("div", _hoisted_980, [
                              _createElementVNode("div", _hoisted_981, _toDisplayString(_ctx.formatDate(log.date)), 1 /* TEXT */),
                              _createElementVNode("div", _hoisted_982, [
                                (log.displayDelta !== null && log.displayDelta !== 0)
                                  ? (_openBlock(), _createElementBlock("span", _hoisted_983, _toDisplayString(_ctx.formatNumber(log.displayStart)), 1 /* TEXT */))
                                  : _createCommentVNode("v-if", true),
                                (log.displayDelta !== null && log.displayDelta !== 0)
                                  ? (_openBlock(), _createElementBlock("span", _hoisted_984, "→"))
                                  : _createCommentVNode("v-if", true),
                                _createElementVNode("span", null, [
                                  _createTextVNode(_toDisplayString(_ctx.formatNumber(log.displayCurrent)) + " ", 1 /* TEXT */),
                                  _createElementVNode("span", _hoisted_985, _toDisplayString(log.unit), 1 /* TEXT */)
                                ]),
                                (log.reps)
                                  ? (_openBlock(), _createElementBlock("span", _hoisted_986, " × " + _toDisplayString(log.reps), 1 /* TEXT */))
                                  : _createCommentVNode("v-if", true),
                                (log.displayDelta !== null && log.displayDelta !== 0)
                                  ? (_openBlock(), _createElementBlock("span", {
                                      key: 3,
                                      class: _normalizeClass(["text-[10px] font-bold", log.displayDelta > 0 ? 'text-salvia' : 'text-red-500'])
                                    }, _toDisplayString(log.displayDelta > 0 ? '+' : '') + _toDisplayString(_ctx.formatNumber(log.displayDelta)) + " " + _toDisplayString(log.unit), 3 /* TEXT, CLASS */))
                                  : _createCommentVNode("v-if", true)
                              ]),
                              (log.intensity)
                                ? (_openBlock(), _createElementBlock("p", _hoisted_987, _toDisplayString(log.intensity), 1 /* TEXT */))
                                : _createCommentVNode("v-if", true),
                              (log.feel)
                                ? (_openBlock(), _createElementBlock("p", _hoisted_988, _toDisplayString((_ctx.EXERCISE_FEELS.find(f => f.id === log.feel) || {}).icon) + " " + _toDisplayString((_ctx.EXERCISE_FEELS.find(f => f.id === log.feel) || {}).label), 1 /* TEXT */))
                                : _createCommentVNode("v-if", true),
                              (log.logSets && log.logSets.length)
                                ? (_openBlock(), _createElementBlock("p", _hoisted_989, _toDisplayString(log.logSets.map(set => _ctx.formatNumber(set.weight) + '×' + (set.reps || '—')).join(' · ')), 1 /* TEXT */))
                                : _createCommentVNode("v-if", true)
                            ]),
                            _createElementVNode("button", {
                              onClick: $event => (_ctx.deleteWorkoutLog(log)),
                              class: "p-2 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors flex-shrink-0",
                              "aria-label": "Elimina registrazione"
                            }, [...(_cache[771] || (_cache[771] = [
                              _createElementVNode("svg", {
                                class: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                "stroke-width": "2"
                              }, [
                                _createElementVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                })
                              ], -1 /* CACHED */)
                            ]))], 8 /* PROPS */, _hoisted_990)
                          ]))
                        }), 128 /* KEYED_FRAGMENT */))
                      ])),
                  _createElementVNode("div", _hoisted_991, [
                    _createElementVNode("button", {
                      onClick: _cache[240] || (_cache[240] = $event => (_ctx.exerciseHistoryModal.isOpen = false)),
                      class: "w-full bg-antracite text-white font-bold py-3 rounded-xl hover:bg-antracite/90 active:scale-95 transition-all"
                    }, "Chiudi")
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.sheetHistoryModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_992, [
                _createElementVNode("div", _hoisted_993, [
                  _createElementVNode("div", _hoisted_994, [
                    _createElementVNode("div", _hoisted_995, [
                      _cache[773] || (_cache[773] = _createElementVNode("div", { class: "w-10 h-10 rounded-xl bg-arancione/10 flex items-center justify-center text-arancione border border-arancione/20 flex-shrink-0" }, [
                        _createElementVNode("svg", {
                          class: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2"
                        }, [
                          _createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                          })
                        ])
                      ], -1 /* CACHED */)),
                      _createElementVNode("div", _hoisted_996, [
                        _cache[772] || (_cache[772] = _createElementVNode("h3", { class: "text-lg font-bold text-antracite leading-tight" }, "Storico scheda", -1 /* CACHED */)),
                        _createElementVNode("p", _hoisted_997, _toDisplayString(_ctx.selectedSheet ? _ctx.selectedSheet.name : ''), 1 /* TEXT */)
                      ])
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[241] || (_cache[241] = $event => (_ctx.sheetHistoryModal.isOpen = false)),
                      class: "p-1 text-gray-400 hover:text-antracite flex-shrink-0"
                    }, [...(_cache[774] || (_cache[774] = [
                      _createElementVNode("svg", {
                        class: "w-6 h-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  _createElementVNode("p", _hoisted_998, _toDisplayString(_ctx.sheetHistorySessions.length) + " session" + _toDisplayString(_ctx.sheetHistorySessions.length === 1 ? 'e' : 'i') + " registrate", 1 /* TEXT */),
                  (_ctx.sheetHistorySessions.length === 0)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_999, " Ancora nessuna sessione. Registra i carichi dalla scheda per iniziare a costruire lo storico. "))
                    : (_openBlock(), _createElementBlock("div", _hoisted_1000, [
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.sheetHistorySessions, (session) => {
                          return (_openBlock(), _createElementBlock("div", {
                            key: session.date,
                            class: "bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden"
                          }, [
                            _createElementVNode("div", _hoisted_1001, [
                              _createElementVNode("div", _hoisted_1002, [
                                _createElementVNode("span", _hoisted_1003, _toDisplayString(session.day), 1 /* TEXT */),
                                _createElementVNode("span", _hoisted_1004, _toDisplayString(session.month), 1 /* TEXT */)
                              ]),
                              _createElementVNode("div", _hoisted_1005, [
                                _createElementVNode("div", _hoisted_1006, _toDisplayString(session.weekday), 1 /* TEXT */),
                                _createElementVNode("div", _hoisted_1007, [
                                  _createElementVNode("span", null, _toDisplayString(session.logs.length) + " " + _toDisplayString(session.logs.length === 1 ? 'esercizio' : 'esercizi'), 1 /* TEXT */),
                                  _cache[776] || (_cache[776] = _createElementVNode("span", { class: "w-1 h-1 rounded-full bg-gray-300" }, null, -1 /* CACHED */)),
                                  _createElementVNode("span", null, _toDisplayString(session.strengthCount) + " forza", 1 /* TEXT */),
                                  (session.cardioCount)
                                    ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                        _cache[775] || (_cache[775] = _createElementVNode("span", { class: "w-1 h-1 rounded-full bg-gray-300" }, null, -1 /* CACHED */)),
                                        _createElementVNode("span", null, _toDisplayString(session.cardioCount) + " cardio", 1 /* TEXT */)
                                      ], 64 /* STABLE_FRAGMENT */))
                                    : _createCommentVNode("v-if", true)
                                ])
                              ]),
                              _createElementVNode("span", _hoisted_1008, _toDisplayString(session.year), 1 /* TEXT */)
                            ]),
                            _createElementVNode("div", _hoisted_1009, [
                              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(session.dayGroups, (dayGroup) => {
                                return (_openBlock(), _createElementBlock("div", {
                                  key: dayGroup.name,
                                  class: "space-y-1.5"
                                }, [
                                  _createElementVNode("div", _hoisted_1010, [
                                    _createElementVNode("span", _hoisted_1011, _toDisplayString(dayGroup.name), 1 /* TEXT */),
                                    _cache[777] || (_cache[777] = _createElementVNode("span", { class: "h-px flex-1 bg-gray-100" }, null, -1 /* CACHED */))
                                  ]),
                                  (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(dayGroup.logs, (log) => {
                                    return (_openBlock(), _createElementBlock("div", {
                                      key: log.id,
                                      class: "flex items-center gap-2.5 rounded-2xl bg-gray-50 border border-gray-100 px-2.5 py-2"
                                    }, [
                                      _createElementVNode("div", {
                                        class: _normalizeClass(["w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border", log.isCardio ? 'bg-sky-500/10 text-sky-600 border-sky-200' : (log.isPyramid ? 'bg-amber-100 text-amber-600 border-amber-200' : 'bg-arancione/10 text-arancione border-arancione/20')])
                                      }, [
                                        (log.isCardio)
                                          ? (_openBlock(), _createElementBlock("svg", _hoisted_1012, [...(_cache[778] || (_cache[778] = [
                                              _createElementVNode("path", {
                                                "stroke-linecap": "round",
                                                "stroke-linejoin": "round",
                                                d: "M3 12h4l2-5 4 10 2-5h6"
                                              }, null, -1 /* CACHED */)
                                            ]))]))
                                          : (log.isPyramid)
                                            ? (_openBlock(), _createElementBlock("svg", _hoisted_1013, [...(_cache[779] || (_cache[779] = [
                                                _createElementVNode("path", {
                                                  "stroke-linecap": "round",
                                                  "stroke-linejoin": "round",
                                                  d: "M12 4l8 16H4L12 4zM12 12h.01"
                                                }, null, -1 /* CACHED */)
                                              ]))]))
                                            : (_openBlock(), _createElementBlock("svg", _hoisted_1014, [...(_cache[780] || (_cache[780] = [
                                                _createElementVNode("path", {
                                                  "stroke-linecap": "round",
                                                  "stroke-linejoin": "round",
                                                  d: "M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12"
                                                }, null, -1 /* CACHED */)
                                              ]))]))
                                      ], 2 /* CLASS */),
                                      _createElementVNode("div", _hoisted_1015, [
                                        _createElementVNode("div", _hoisted_1016, _toDisplayString(log.exerciseName), 1 /* TEXT */),
                                        _createElementVNode("div", _hoisted_1017, [
                                          (log.logSets.length)
                                            ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                                _createTextVNode(_toDisplayString(log.logSets.map(set => _ctx.formatNumber(set.weight) + '×' + (set.reps || '—')).join(' · ')), 1 /* TEXT */)
                                              ], 64 /* STABLE_FRAGMENT */))
                                            : (log.isCardio)
                                              ? (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                                                  _createTextVNode(_toDisplayString(log.intensity || 'Cardio'), 1 /* TEXT */)
                                                ], 64 /* STABLE_FRAGMENT */))
                                              : (log.reps)
                                                ? (_openBlock(), _createElementBlock(_Fragment, { key: 2 }, [
                                                    _createTextVNode("× " + _toDisplayString(log.reps) + " rip.", 1 /* TEXT */)
                                                  ], 64 /* STABLE_FRAGMENT */))
                                                : (_openBlock(), _createElementBlock(_Fragment, { key: 3 }, [
                                                    _createTextVNode("Serie registrate")
                                                  ], 64 /* STABLE_FRAGMENT */))
                                        ])
                                      ]),
                                      _createElementVNode("div", _hoisted_1018, [
                                        _createElementVNode("div", {
                                          class: _normalizeClass(["text-sm font-extrabold", log.isCardio ? 'text-sky-600' : (log.isPyramid ? 'text-amber-600' : 'text-arancione')])
                                        }, [
                                          _createTextVNode(_toDisplayString(_ctx.formatNumber(log.displayCurrent)), 1 /* TEXT */),
                                          _createElementVNode("span", _hoisted_1019, _toDisplayString(log.unit), 1 /* TEXT */)
                                        ], 2 /* CLASS */),
                                        _createElementVNode("div", _hoisted_1020, [
                                          (log.displayDelta !== null && log.displayDelta !== 0)
                                            ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                                _createElementVNode("span", _hoisted_1021, _toDisplayString(_ctx.formatNumber(log.displayStart)), 1 /* TEXT */),
                                                _cache[781] || (_cache[781] = _createElementVNode("span", { class: "text-gray-300" }, "→", -1 /* CACHED */)),
                                                _createElementVNode("span", {
                                                  class: _normalizeClass(log.displayDelta > 0 ? 'text-salvia' : 'text-red-500')
                                                }, _toDisplayString(log.displayDelta > 0 ? '+' : '') + _toDisplayString(_ctx.formatNumber(log.displayDelta)), 3 /* TEXT, CLASS */)
                                              ], 64 /* STABLE_FRAGMENT */))
                                            : (_openBlock(), _createElementBlock("span", _hoisted_1022, "Partenza"))
                                        ])
                                      ])
                                    ]))
                                  }), 128 /* KEYED_FRAGMENT */))
                                ]))
                              }), 128 /* KEYED_FRAGMENT */))
                            ])
                          ]))
                        }), 128 /* KEYED_FRAGMENT */))
                      ])),
                  _createElementVNode("div", _hoisted_1023, [
                    _createElementVNode("button", {
                      onClick: _cache[242] || (_cache[242] = $event => (_ctx.sheetHistoryModal.isOpen = false)),
                      class: "w-full bg-antracite text-white font-bold py-3 rounded-xl hover:bg-antracite/90 active:scale-95 transition-all"
                    }, "Chiudi")
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.sessionPreviewModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_1024, [
                _createElementVNode("div", _hoisted_1025, [
                  _createElementVNode("div", _hoisted_1026, [
                    _createElementVNode("div", _hoisted_1027, [
                      _cache[783] || (_cache[783] = _createElementVNode("div", { class: "w-10 h-10 rounded-xl bg-arancione/10 flex items-center justify-center text-arancione border border-arancione/20 flex-shrink-0" }, [
                        _createElementVNode("svg", {
                          class: "w-5 h-5",
                          fill: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          _createElementVNode("path", { d: "M8 5v14l11-7z" })
                        ])
                      ], -1 /* CACHED */)),
                      _createElementVNode("div", _hoisted_1028, [
                        _cache[782] || (_cache[782] = _createElementVNode("h3", { class: "text-lg font-bold text-antracite leading-tight" }, "Avvia allenamento", -1 /* CACHED */)),
                        _createElementVNode("p", _hoisted_1029, _toDisplayString(_ctx.selectedSheet ? _ctx.selectedSheet.name : '') + _toDisplayString(_ctx.currentSheetDay ? ' · ' + _ctx.currentSheetDay.name : ''), 1 /* TEXT */)
                      ])
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[243] || (_cache[243] = (...args) => (_ctx.closeSessionPreview && _ctx.closeSessionPreview(...args))),
                      class: "p-1 text-gray-400 hover:text-antracite flex-shrink-0"
                    }, [...(_cache[784] || (_cache[784] = [
                      _createElementVNode("svg", {
                        class: "w-6 h-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  _createElementVNode("div", _hoisted_1030, [
                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.selectedDayGroups, (group) => {
                      return (_openBlock(), _createElementBlock("div", {
                        key: 'preview-' + group.key,
                        class: "space-y-2"
                      }, [
                        (group.label)
                          ? (_openBlock(), _createElementBlock("div", _hoisted_1031, [
                              _createElementVNode("span", _hoisted_1032, _toDisplayString(group.label), 1 /* TEXT */),
                              _cache[785] || (_cache[785] = _createElementVNode("span", { class: "text-[10px] font-medium text-gray-400" }, "senza pausa", -1 /* CACHED */))
                            ]))
                          : _createCommentVNode("v-if", true),
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(group.exercises, (ex) => {
                          return (_openBlock(), _createElementBlock("div", {
                            key: 'preview-ex-' + ex.id,
                            class: "flex items-center gap-3 bg-gray-50 rounded-2xl border border-gray-100 p-3"
                          }, [
                            _createElementVNode("div", _hoisted_1033, _toDisplayString(ex.type === 'cardio' ? '🏃' : '🏋️'), 1 /* TEXT */),
                            _createElementVNode("div", _hoisted_1034, [
                              _createElementVNode("h5", _hoisted_1035, _toDisplayString(ex.name), 1 /* TEXT */),
                              _createElementVNode("p", _hoisted_1036, [
                                (ex.type === 'cardio')
                                  ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                      _createTextVNode(_toDisplayString(_ctx.formatNumber(_ctx.exerciseCurrentValue(ex))) + " min", 1 /* TEXT */),
                                      (_ctx.exerciseDeltaValue(ex))
                                        ? (_openBlock(), _createElementBlock("span", _hoisted_1037, " (" + _toDisplayString(_ctx.exerciseDeltaValue(ex) > 0 ? '+' : '') + _toDisplayString(_ctx.formatNumber(_ctx.exerciseDeltaValue(ex))) + " min)", 1 /* TEXT */))
                                        : _createCommentVNode("v-if", true),
                                      _createTextVNode(" • " + _toDisplayString(ex.intensity || 'intensità n.d.'), 1 /* TEXT */)
                                    ], 64 /* STABLE_FRAGMENT */))
                                  : (ex.pyramid)
                                    ? (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                                        _cache[786] || (_cache[786] = _createTextVNode("Piramidale • ", -1 /* CACHED */)),
                                        (_ctx.exerciseDeltaValue(ex))
                                          ? (_openBlock(), _createElementBlock("span", _hoisted_1038, _toDisplayString(_ctx.formatNumber(_ctx.exerciseStartValue(ex))), 1 /* TEXT */))
                                          : _createCommentVNode("v-if", true),
                                        (_ctx.exerciseDeltaValue(ex))
                                          ? (_openBlock(), _createElementBlock("span", _hoisted_1039, " → "))
                                          : _createCommentVNode("v-if", true),
                                        _createTextVNode(_toDisplayString(_ctx.formatNumber(_ctx.exerciseCurrentValue(ex))) + " kg", 1 /* TEXT */),
                                        (_ctx.exerciseDeltaValue(ex))
                                          ? (_openBlock(), _createElementBlock("span", _hoisted_1040, " (" + _toDisplayString(_ctx.exerciseDeltaValue(ex) > 0 ? '+' : '') + _toDisplayString(_ctx.formatNumber(_ctx.exerciseDeltaValue(ex))) + ")", 1 /* TEXT */))
                                          : _createCommentVNode("v-if", true),
                                        _createTextVNode(" • rec. " + _toDisplayString(ex.rest ? ex.rest + 's' : '—'), 1 /* TEXT */)
                                      ], 64 /* STABLE_FRAGMENT */))
                                    : (_openBlock(), _createElementBlock(_Fragment, { key: 2 }, [
                                        _createTextVNode(_toDisplayString(ex.sets ? ex.sets + '×' + (ex.reps || '—') + ' • ' : ''), 1 /* TEXT */),
                                        (_ctx.exerciseDeltaValue(ex))
                                          ? (_openBlock(), _createElementBlock("span", _hoisted_1041, _toDisplayString(_ctx.formatNumber(_ctx.exerciseStartValue(ex))), 1 /* TEXT */))
                                          : _createCommentVNode("v-if", true),
                                        (_ctx.exerciseDeltaValue(ex))
                                          ? (_openBlock(), _createElementBlock("span", _hoisted_1042, " → "))
                                          : _createCommentVNode("v-if", true),
                                        _createTextVNode(_toDisplayString(_ctx.formatNumber(_ctx.exerciseCurrentValue(ex))) + " kg", 1 /* TEXT */),
                                        (_ctx.exerciseDeltaValue(ex))
                                          ? (_openBlock(), _createElementBlock("span", _hoisted_1043, " (" + _toDisplayString(_ctx.exerciseDeltaValue(ex) > 0 ? '+' : '') + _toDisplayString(_ctx.formatNumber(_ctx.exerciseDeltaValue(ex))) + ")", 1 /* TEXT */))
                                          : _createCommentVNode("v-if", true),
                                        _createTextVNode(" • rec. " + _toDisplayString(ex.rest ? ex.rest + 's' : '—'), 1 /* TEXT */)
                                      ], 64 /* STABLE_FRAGMENT */))
                              ]),
                              (ex.type === 'strength' && ex.pyramid)
                                ? (_openBlock(), _createElementBlock("p", _hoisted_1044, _toDisplayString(_ctx.pyramidSummary(ex)), 1 /* TEXT */))
                                : _createCommentVNode("v-if", true)
                            ])
                          ]))
                        }), 128 /* KEYED_FRAGMENT */))
                      ]))
                    }), 128 /* KEYED_FRAGMENT */))
                  ]),
                  _createElementVNode("div", _hoisted_1045, [
                    (_ctx.sessionPreviewModal.sessionId)
                      ? (_openBlock(), _createElementBlock("p", _hoisted_1046, "🗓️ Sessione già presente nel calendario di oggi."))
                      : (_openBlock(), _createElementBlock("p", _hoisted_1047, "🗓️ Sicuro di voler iniziare l'allenamento di questa scheda? Verrà aggiunto al calendario di oggi.")),
                    _cache[788] || (_cache[788] = _createElementVNode("p", { class: "text-[10px] font-medium text-gray-400 leading-snug px-1" }, "Ti guiderò serie per serie con cronometro e recupero. I pesi che registri o modifichi vengono salvati subito.", -1 /* CACHED */)),
                    _createElementVNode("div", _hoisted_1048, [
                      _createElementVNode("button", {
                        onClick: _cache[244] || (_cache[244] = (...args) => (_ctx.closeSessionPreview && _ctx.closeSessionPreview(...args))),
                        class: "flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 active:scale-95 transition-all"
                      }, "Annulla"),
                      _createElementVNode("button", {
                        onClick: _cache[245] || (_cache[245] = (...args) => (_ctx.startGuidedWorkout && _ctx.startGuidedWorkout(...args))),
                        class: "flex-[2] bg-arancione text-white font-bold py-3 rounded-xl hover:bg-arancione/90 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                      }, [...(_cache[787] || (_cache[787] = [
                        _createElementVNode("svg", {
                          class: "w-4 h-4",
                          fill: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          _createElementVNode("path", { d: "M8 5v14l11-7z" })
                        ], -1 /* CACHED */),
                        _createTextVNode(" Inizia allenamento ", -1 /* CACHED */)
                      ]))])
                    ])
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.shareStudio.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_1049, [
                _createElementVNode("div", _hoisted_1050, [
                  _cache[807] || (_cache[807] = _createElementVNode("div", { class: "absolute -top-24 -left-20 w-72 h-72 bg-salvia/15 rounded-full blur-[90px] pointer-events-none" }, null, -1 /* CACHED */)),
                  _cache[808] || (_cache[808] = _createElementVNode("div", { class: "absolute -bottom-24 -right-20 w-72 h-72 bg-viola/20 rounded-full blur-[90px] pointer-events-none" }, null, -1 /* CACHED */)),
                  _createElementVNode("div", _hoisted_1051, [
                    _createElementVNode("div", null, [
                      _createElementVNode("p", _hoisted_1052, _toDisplayString(_ctx.shareStudio.kind === 'recap' && _ctx.shareStudio.recapType === 'year' ? 'Il tuo anno' : _ctx.shareStudio.kind === 'recap' && _ctx.shareStudio.recapType === 'week' ? 'La tua settimana' : (({ workout: 'Allenamento', quote: 'Frase del giorno', recap: 'Il tuo mese', achievement: 'Traguardo', muscles: 'Muscoli della settimana' })[_ctx.shareStudio.kind] || 'Progressi')), 1 /* TEXT */),
                      _cache[789] || (_cache[789] = _createElementVNode("h3", { class: "text-lg font-extrabold leading-tight" }, "Condividi", -1 /* CACHED */))
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[246] || (_cache[246] = (...args) => (_ctx.closeShareStudio && _ctx.closeShareStudio(...args))),
                      disabled: _ctx.shareStudio.recording,
                      class: "p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-30",
                      "aria-label": "Chiudi"
                    }, [...(_cache[790] || (_cache[790] = [
                      _createElementVNode("svg", {
                        class: "w-5 h-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))], 8 /* PROPS */, _hoisted_1053)
                  ]),
                  _createElementVNode("div", _hoisted_1054, [
                    _createElementVNode("div", _hoisted_1055, [
                      _createElementVNode("div", {
                        class: _normalizeClass(["relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10", _ctx.shareStudio.format === 'story' ? 'h-[46vh] aspect-[9/16]' : 'h-[40vh] aspect-[4/5]']),
                        style: _normalizeStyle(_ctx.shareStudio.theme === 'sticker' ? 'background-image: repeating-conic-gradient(#3a3a3a 0 25%, #2a2a2a 0 50%); background-size: 22px 22px;' : '')
                      }, [
                        _createElementVNode("canvas", _hoisted_1056, null, 512 /* NEED_PATCH */),
                        (!_ctx.shareStudio.ready)
                          ? (_openBlock(), _createElementBlock("div", _hoisted_1057, [...(_cache[791] || (_cache[791] = [
                              _createElementVNode("div", { class: "w-8 h-8 border-4 border-white/70 border-t-transparent rounded-full animate-spin" }, null, -1 /* CACHED */)
                            ]))]))
                          : _createCommentVNode("v-if", true),
                        (_ctx.shareStudio.recording)
                          ? (_openBlock(), _createElementBlock("div", _hoisted_1058, [
                              _cache[792] || (_cache[792] = _createElementVNode("span", { class: "w-2 h-2 rounded-full bg-red-500 animate-pulse" }, null, -1 /* CACHED */)),
                              _createElementVNode("span", _hoisted_1059, "REC " + _toDisplayString(_ctx.shareStudio.recordProgress) + "%", 1 /* TEXT */)
                            ]))
                          : _createCommentVNode("v-if", true)
                      ], 6 /* CLASS, STYLE */)
                    ]),
                    _createElementVNode("div", _hoisted_1060, [
                      _createElementVNode("button", {
                        onClick: _cache[247] || (_cache[247] = $event => (_ctx.shareStudio.output = 'video')),
                        disabled: !_ctx.shareVideoSupported || _ctx.shareStudio.theme === 'sticker',
                        class: _normalizeClass(["py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 disabled:opacity-30", _ctx.shareWantsVideo ? 'bg-white text-antracite' : 'text-white/70'])
                      }, "🎬 Video", 10 /* CLASS, PROPS */, _hoisted_1061),
                      _createElementVNode("button", {
                        onClick: _cache[248] || (_cache[248] = $event => (_ctx.shareStudio.output = 'image')),
                        class: _normalizeClass(["py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5", !_ctx.shareWantsVideo ? 'bg-white text-antracite' : 'text-white/70'])
                      }, "🖼️ Immagine", 2 /* CLASS */)
                    ]),
                    (!_ctx.shareVideoSupported)
                      ? (_openBlock(), _createElementBlock("p", _hoisted_1062, "Questo browser non può registrare video: disponibile solo l'immagine."))
                      : (_ctx.shareStudio.theme === 'sticker')
                        ? (_openBlock(), _createElementBlock("p", _hoisted_1063, "Lo sticker ha lo sfondo trasparente: si esporta come immagine."))
                        : _createCommentVNode("v-if", true),
                    (_ctx.shareData && _ctx.shareData.empty && _ctx.shareStudio.kind === 'progress')
                      ? (_openBlock(), _createElementBlock("p", _hoisted_1064, " Ancora pochi dati: allenati, registra il peso o segna i pasti per riempire la card. "))
                      : _createCommentVNode("v-if", true),
                    (_ctx.shareStudio.kind === 'quote' && _ctx.shareData && !_ctx.shareData.stats.length)
                      ? (_openBlock(), _createElementBlock("p", _hoisted_1065, " Ancora nessun risultato in questo periodo: allenati o segna i pasti e qui compariranno i tuoi numeri. "))
                      : _createCommentVNode("v-if", true),
                    (_ctx.shareStudio.kind === 'progress' && _ctx.shareData)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_1066, [
                          _cache[793] || (_cache[793] = _createElementVNode("div", { class: "text-[10px] font-bold text-white/50 uppercase tracking-widest" }, "Cosa vuoi condividere", -1 /* CACHED */)),
                          _createElementVNode("div", _hoisted_1067, [
                            (_openBlock(), _createElementBlock(_Fragment, null, _renderList(['total', 'training', 'nutrition', 'body'], (f) => {
                              return _createElementVNode("button", {
                                key: 'focus' + f,
                                onClick: $event => (_ctx.setShareFocus(f)),
                                disabled: !_ctx.shareData.focusAvailable.includes(f),
                                class: _normalizeClass(["py-2.5 rounded-xl text-[10px] font-bold transition-all disabled:opacity-25", _ctx.shareData.focus === f ? 'bg-white text-antracite' : 'bg-white/10 text-white/70 hover:bg-white/15'])
                              }, _toDisplayString(_ctx.shareFocusLabels[f]), 11 /* TEXT, CLASS, PROPS */, _hoisted_1068)
                            }), 64 /* STABLE_FRAGMENT */))
                          ])
                        ]))
                      : _createCommentVNode("v-if", true),
                    (_ctx.shareStudio.kind === 'recap')
                      ? (_openBlock(), _createElementBlock("div", _hoisted_1069, [
                          _cache[794] || (_cache[794] = _createElementVNode("div", { class: "text-[10px] font-bold text-white/50 uppercase tracking-widest" }, "Riepilogo", -1 /* CACHED */)),
                          _createElementVNode("div", {
                            class: _normalizeClass(["grid gap-1.5 bg-white/5 p-1 rounded-2xl", _ctx.wrappedSeason || _ctx.shareStudio.recapType === 'year' ? 'grid-cols-3' : 'grid-cols-2'])
                          }, [
                            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList([{ v: 'week', l: '📅 Settimana' }, { v: 'month', l: '🗓️ Mese' }, { v: 'year', l: '🎁 Anno' }].filter(t => t.v !== 'year' || _ctx.wrappedSeason || _ctx.shareStudio.recapType === 'year'), (t) => {
                              return (_openBlock(), _createElementBlock("button", {
                                key: 'rt' + t.v,
                                onClick: $event => {_ctx.shareStudio.recapType = t.v; _ctx.shareStudio.recapMonth = 0},
                                class: _normalizeClass(["py-2 rounded-xl text-[11px] font-bold transition-colors", _ctx.shareStudio.recapType === t.v ? 'bg-white text-antracite' : 'text-white/70'])
                              }, _toDisplayString(t.l), 11 /* TEXT, CLASS, PROPS */, _hoisted_1070))
                            }), 128 /* KEYED_FRAGMENT */))
                          ], 2 /* CLASS */),
                          _createElementVNode("div", _hoisted_1071, [
                            (_openBlock(), _createElementBlock(_Fragment, null, _renderList([0, 1], (m) => {
                              return _createElementVNode("button", {
                                key: 'rm' + m,
                                onClick: $event => (_ctx.shareStudio.recapMonth = m),
                                class: _normalizeClass(["py-2.5 rounded-xl text-[11px] font-bold transition-colors", _ctx.shareStudio.recapMonth === m ? 'bg-white text-antracite' : 'bg-white/10 text-white/70 hover:bg-white/15'])
                              }, _toDisplayString(_ctx.recapPeriodName(_ctx.shareStudio.recapType, m)), 11 /* TEXT, CLASS, PROPS */, _hoisted_1072)
                            }), 64 /* STABLE_FRAGMENT */))
                          ])
                        ]))
                      : _createCommentVNode("v-if", true),
                    (_ctx.shareStudio.kind === 'recap' && _ctx.shareData && _ctx.shareData.empty)
                      ? (_openBlock(), _createElementBlock("p", _hoisted_1073, " Nessun giorno attivo in questo periodo: segna pasti e allenamenti per riempire il tuo riepilogo. "))
                      : _createCommentVNode("v-if", true),
                    (_ctx.shareStudio.kind === 'progress' || _ctx.shareStudio.kind === 'quote')
                      ? (_openBlock(), _createElementBlock("div", _hoisted_1074, [
                          _createElementVNode("div", _hoisted_1075, _toDisplayString(_ctx.shareStudio.kind === 'quote' ? 'Risultati da mostrare' : 'Periodo'), 1 /* TEXT */),
                          _createElementVNode("div", _hoisted_1076, [
                            (_openBlock(), _createElementBlock(_Fragment, null, _renderList([{v:7,l:'7 giorni'},{v:30,l:'30 giorni'},{v:90,l:'3 mesi'},{v:0,l:'Sempre'}], (p) => {
                              return _createElementVNode("button", {
                                key: 'per' + p.v,
                                onClick: $event => {_ctx.shareStudio.period = p.v; _ctx.shareStudio.hero = 'auto'},
                                class: _normalizeClass(["py-2.5 rounded-xl text-[11px] font-bold transition-colors", _ctx.shareStudio.period === p.v ? 'bg-white text-antracite' : 'bg-white/10 text-white/70 hover:bg-white/15'])
                              }, _toDisplayString(p.l), 11 /* TEXT, CLASS, PROPS */, _hoisted_1077)
                            }), 64 /* STABLE_FRAGMENT */))
                          ])
                        ]))
                      : _createCommentVNode("v-if", true),
                    (_ctx.shareStudio.kind === 'progress' && _ctx.shareData && _ctx.shareData.available.length > 1)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_1078, [
                          _cache[795] || (_cache[795] = _createElementVNode("div", { class: "text-[10px] font-bold text-white/50 uppercase tracking-widest" }, "Numero in evidenza", -1 /* CACHED */)),
                          _createElementVNode("div", _hoisted_1079, [
                            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.shareData.available, (k) => {
                              return (_openBlock(), _createElementBlock("button", {
                                key: 'hero' + k,
                                onClick: $event => (_ctx.shareStudio.hero = k),
                                class: _normalizeClass(["px-3 py-2 rounded-xl text-[11px] font-bold transition-colors", _ctx.shareData.heroKey === k ? 'bg-arancione text-white' : 'bg-white/10 text-white/70 hover:bg-white/15'])
                              }, _toDisplayString(_ctx.shareHeroLabels[k]), 11 /* TEXT, CLASS, PROPS */, _hoisted_1080))
                            }), 128 /* KEYED_FRAGMENT */))
                          ])
                        ]))
                      : _createCommentVNode("v-if", true),
                    _createElementVNode("div", _hoisted_1081, [
                      _cache[796] || (_cache[796] = _createElementVNode("div", { class: "text-[10px] font-bold text-white/50 uppercase tracking-widest" }, "Stile", -1 /* CACHED */)),
                      _createElementVNode("div", _hoisted_1082, [
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.shareThemeOptions, (th) => {
                          return (_openBlock(), _createElementBlock("button", {
                            key: 'th' + th.id,
                            onClick: $event => (_ctx.setShareTheme(th.id)),
                            class: "flex flex-col items-center gap-1.5"
                          }, [
                            _createElementVNode("span", {
                              class: _normalizeClass(["w-full aspect-square rounded-xl ring-2 transition-all flex items-center justify-center text-base", _ctx.shareStudio.theme === th.id ? 'ring-white scale-105' : 'ring-white/10']),
                              style: _normalizeStyle(th.swatch)
                            }, _toDisplayString(th.icon), 7 /* TEXT, CLASS, STYLE */),
                            _createElementVNode("span", {
                              class: _normalizeClass(["text-[10px] font-bold", _ctx.shareStudio.theme === th.id ? 'text-white' : 'text-white/50'])
                            }, _toDisplayString(th.label), 3 /* TEXT, CLASS */)
                          ], 8 /* PROPS */, _hoisted_1083))
                        }), 128 /* KEYED_FRAGMENT */))
                      ]),
                      _createElementVNode("input", {
                        ref: "sharePhotoInput",
                        type: "file",
                        accept: "image/*",
                        class: "hidden",
                        onChange: _cache[249] || (_cache[249] = (...args) => (_ctx.handleSharePhoto && _ctx.handleSharePhoto(...args)))
                      }, null, 544 /* NEED_HYDRATION, NEED_PATCH */),
                      (_ctx.shareStudio.theme === 'photo')
                        ? (_openBlock(), _createElementBlock("button", {
                            key: 0,
                            onClick: _cache[250] || (_cache[250] = (...args) => (_ctx.pickSharePhoto && _ctx.pickSharePhoto(...args))),
                            class: "text-[11px] font-bold text-white/70 underline"
                          }, "Cambia foto"))
                        : _createCommentVNode("v-if", true),
                      (_ctx.shareStudio.theme === 'sticker')
                        ? (_openBlock(), _createElementBlock("p", _hoisted_1084, "Sfondo trasparente: salvalo e aggiungilo come sticker sopra una tua foto nelle storie."))
                        : _createCommentVNode("v-if", true),
                      (_ctx.shareStudio.theme === 'photo')
                        ? (_openBlock(), _createElementBlock("p", _hoisted_1085, "🔒 La foto resta sul tuo telefono: viene usata solo per creare la card."))
                        : _createCommentVNode("v-if", true)
                    ]),
                    _createElementVNode("div", _hoisted_1086, [
                      _cache[797] || (_cache[797] = _createElementVNode("div", { class: "text-[10px] font-bold text-white/50 uppercase tracking-widest" }, "Formato", -1 /* CACHED */)),
                      _createElementVNode("div", _hoisted_1087, [
                        _createElementVNode("button", {
                          onClick: _cache[251] || (_cache[251] = $event => (_ctx.shareStudio.format = 'story')),
                          class: _normalizeClass(["py-2.5 rounded-xl text-[11px] font-bold transition-colors", _ctx.shareStudio.format === 'story' ? 'bg-white text-antracite' : 'bg-white/10 text-white/70'])
                        }, "Storia 9:16", 2 /* CLASS */),
                        _createElementVNode("button", {
                          onClick: _cache[252] || (_cache[252] = $event => (_ctx.shareStudio.format = 'post')),
                          class: _normalizeClass(["py-2.5 rounded-xl text-[11px] font-bold transition-colors", _ctx.shareStudio.format === 'post' ? 'bg-white text-antracite' : 'bg-white/10 text-white/70'])
                        }, "Post 4:5", 2 /* CLASS */)
                      ])
                    ]),
                    (_ctx.petState.stage > 0 && !(_ctx.shareStudio.kind === 'achievement' && _ctx.shareStudio.achievement && (_ctx.shareStudio.achievement.type === 'pet' || _ctx.shareStudio.achievement.type === 'streakSave')))
                      ? (_openBlock(), _createElementBlock("div", _hoisted_1088, [
                          _createElementVNode("div", _hoisted_1089, [
                            _createElementVNode("div", {
                              class: "w-11 h-11 shrink-0 pet-bob",
                              innerHTML: _ctx.petMainSvg
                            }, null, 8 /* PROPS */, _hoisted_1090),
                            _createElementVNode("div", _hoisted_1091, [
                              _createElementVNode("span", _hoisted_1092, "Mostra " + _toDisplayString(_ctx.petState.name), 1 /* TEXT */),
                              _createElementVNode("p", _hoisted_1093, _toDisplayString(_ctx.shareWantsVideo ? 'Nel video fa il suo balletto' : 'Compare nella storia'), 1 /* TEXT */)
                            ])
                          ]),
                          _createElementVNode("button", {
                            onClick: _cache[253] || (_cache[253] = (...args) => (_ctx.toggleSharePet && _ctx.toggleSharePet(...args))),
                            class: _normalizeClass(["w-10 h-5 rounded-full relative transition-colors flex-shrink-0", _ctx.shareStudio.showPet ? 'bg-salvia' : 'bg-white/20']),
                            "aria-label": "Mostra il compagno"
                          }, [
                            _createElementVNode("div", {
                              class: _normalizeClass(["w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform", _ctx.shareStudio.showPet ? 'translate-x-5' : ''])
                            }, null, 2 /* CLASS */)
                          ], 2 /* CLASS */)
                        ]))
                      : _createCommentVNode("v-if", true),
                    _createElementVNode("div", _hoisted_1094, [
                      _cache[801] || (_cache[801] = _createElementVNode("div", { class: "flex items-center gap-2" }, [
                        _createElementVNode("span", { class: "text-base" }, "🔒"),
                        _createElementVNode("div", { class: "text-[10px] font-bold text-white/70 uppercase tracking-widest" }, "Privacy")
                      ], -1 /* CACHED */)),
                      _createElementVNode("div", _hoisted_1095, [
                        _createElementVNode("div", _hoisted_1096, [
                          _cache[798] || (_cache[798] = _createElementVNode("span", { class: "text-xs font-bold text-white/80" }, "Mostra il mio nome", -1 /* CACHED */)),
                          _createElementVNode("p", _hoisted_1097, _toDisplayString(_ctx.shareStudio.showName && _ctx.profile ? '“' + (_ctx.shareData ? _ctx.shareData.kicker : '') + '”' : 'Nascosto'), 1 /* TEXT */)
                        ]),
                        _createElementVNode("button", {
                          onClick: _cache[254] || (_cache[254] = $event => (_ctx.shareStudio.showName = !_ctx.shareStudio.showName)),
                          class: _normalizeClass(["w-10 h-5 rounded-full relative transition-colors flex-shrink-0", _ctx.shareStudio.showName ? 'bg-salvia' : 'bg-white/20']),
                          "aria-label": "Mostra il nome"
                        }, [
                          _createElementVNode("div", {
                            class: _normalizeClass(["w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform", _ctx.shareStudio.showName ? 'translate-x-5' : ''])
                          }, null, 2 /* CLASS */)
                        ], 2 /* CLASS */)
                      ]),
                      (_ctx.shareStudio.kind === 'progress' || _ctx.shareStudio.kind === 'quote')
                        ? (_openBlock(), _createElementBlock("div", _hoisted_1098, [
                            _cache[799] || (_cache[799] = _createElementVNode("span", { class: "text-xs font-bold text-white/80" }, "Peso corporeo", -1 /* CACHED */)),
                            _createElementVNode("div", _hoisted_1099, [
                              (_openBlock(), _createElementBlock(_Fragment, null, _renderList([{v:'percent',l:'%'},{v:'kg',l:'kg'},{v:'off',l:'Nascondi'}], (m) => {
                                return _createElementVNode("button", {
                                  key: 'wm' + m.v,
                                  onClick: $event => (_ctx.shareStudio.weightMode = m.v),
                                  class: _normalizeClass(["px-2.5 py-1 rounded-md text-[10px] font-bold transition-colors", _ctx.shareStudio.weightMode === m.v ? 'bg-white text-antracite' : 'text-white/60'])
                                }, _toDisplayString(m.l), 11 /* TEXT, CLASS, PROPS */, _hoisted_1100)
                              }), 64 /* STABLE_FRAGMENT */))
                            ])
                          ]))
                        : _createCommentVNode("v-if", true),
                      _createElementVNode("div", _hoisted_1101, [
                        _cache[800] || (_cache[800] = _createElementVNode("span", { class: "text-xs font-bold text-white/80" }, "Carichi", -1 /* CACHED */)),
                        _createElementVNode("div", _hoisted_1102, [
                          (_openBlock(), _createElementBlock(_Fragment, null, _renderList([{v:'percent',l:'%'},{v:'kg',l:'kg'}], (m) => {
                            return _createElementVNode("button", {
                              key: 'lm' + m.v,
                              onClick: $event => (_ctx.shareStudio.loadMode = m.v),
                              class: _normalizeClass(["px-2.5 py-1 rounded-md text-[10px] font-bold transition-colors", _ctx.shareStudio.loadMode === m.v ? 'bg-white text-antracite' : 'text-white/60'])
                            }, _toDisplayString(m.l), 11 /* TEXT, CLASS, PROPS */, _hoisted_1103)
                          }), 64 /* STABLE_FRAGMENT */))
                        ])
                      ]),
                      _cache[802] || (_cache[802] = _createElementVNode("p", { class: "text-[10px] font-medium text-white/45 leading-snug" }, "Non mostriamo mai il tuo peso attuale, le misure del corpo, il cognome o l'età: solo i tuoi miglioramenti.", -1 /* CACHED */))
                    ]),
                    (_ctx.shareStudio.error)
                      ? (_openBlock(), _createElementBlock("p", _hoisted_1104, _toDisplayString(_ctx.shareStudio.error), 1 /* TEXT */))
                      : _createCommentVNode("v-if", true)
                  ]),
                  _createElementVNode("div", _hoisted_1105, [
                    _cache[806] || (_cache[806] = _createElementVNode("p", { class: "text-[10px] font-medium text-white/50 text-center leading-snug" }, [
                      _createTextVNode("🔗 Condividendo copio il link di STILL: su Instagram aggiungilo con lo sticker "),
                      _createElementVNode("span", { class: "font-bold text-white/70" }, "Link"),
                      _createTextVNode(".")
                    ], -1 /* CACHED */)),
                    _createElementVNode("div", _hoisted_1106, [
                      _createElementVNode("button", {
                        onClick: _cache[255] || (_cache[255] = (...args) => (_ctx.downloadShareImage && _ctx.downloadShareImage(...args))),
                        disabled: !_ctx.shareStudio.ready || _ctx.shareStudio.busy,
                        class: "flex-1 bg-white/10 hover:bg-white/20 font-bold py-4 rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-40"
                      }, [...(_cache[803] || (_cache[803] = [
                        _createElementVNode("svg", {
                          class: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2"
                        }, [
                          _createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                          })
                        ], -1 /* CACHED */),
                        _createTextVNode(" Salva ", -1 /* CACHED */)
                      ]))], 8 /* PROPS */, _hoisted_1107),
                      _createElementVNode("button", {
                        onClick: _cache[256] || (_cache[256] = (...args) => (_ctx.shareImage && _ctx.shareImage(...args))),
                        disabled: !_ctx.shareStudio.ready || _ctx.shareStudio.busy,
                        class: "flex-[1.6] cangiante-btn text-white font-extrabold py-4 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                      }, [
                        (_ctx.shareStudio.recording)
                          ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                              _cache[804] || (_cache[804] = _createElementVNode("div", { class: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }, null, -1 /* CACHED */)),
                              _createTextVNode(" Creo il video… " + _toDisplayString(_ctx.shareStudio.recordProgress) + "% ", 1 /* TEXT */)
                            ], 64 /* STABLE_FRAGMENT */))
                          : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                              _cache[805] || (_cache[805] = _createElementVNode("svg", {
                                class: "w-5 h-5",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                "stroke-width": "2.2"
                              }, [
                                _createElementVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                })
                              ], -1 /* CACHED */)),
                              _createTextVNode(" " + _toDisplayString(_ctx.shareWantsVideo ? 'Condividi video' : 'Condividi'), 1 /* TEXT */)
                            ], 64 /* STABLE_FRAGMENT */))
                      ], 8 /* PROPS */, _hoisted_1108)
                    ])
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.workoutPlayer.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_1109, [
                _createElementVNode("div", _hoisted_1110, [
                  _cache[831] || (_cache[831] = _createElementVNode("div", { class: "absolute -top-20 -right-20 w-72 h-72 bg-arancione/20 rounded-full blur-[90px] pointer-events-none" }, null, -1 /* CACHED */)),
                  _cache[832] || (_cache[832] = _createElementVNode("div", { class: "absolute -bottom-24 -left-20 w-72 h-72 bg-viola/20 rounded-full blur-[90px] pointer-events-none" }, null, -1 /* CACHED */)),
                  _createElementVNode("div", _hoisted_1111, [
                    _createElementVNode("div", _hoisted_1112, [
                      _createElementVNode("div", _hoisted_1113, [
                        _createElementVNode("p", _hoisted_1114, _toDisplayString(_ctx.workoutPlayer.sheetName) + _toDisplayString(_ctx.workoutPlayer.dayName ? ' · ' + _ctx.workoutPlayer.dayName : ''), 1 /* TEXT */),
                        (_ctx.workoutPlayer.phase !== 'done')
                          ? (_openBlock(), _createElementBlock("p", _hoisted_1115, _toDisplayString(_ctx.formatClock(_ctx.playerSessionElapsed)), 1 /* TEXT */))
                          : _createCommentVNode("v-if", true)
                      ]),
                      _createElementVNode("button", {
                        onClick: _cache[257] || (_cache[257] = (...args) => (_ctx.promptQuitGuidedWorkout && _ctx.promptQuitGuidedWorkout(...args))),
                        class: "p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors",
                        "aria-label": "Esci dall'allenamento"
                      }, [...(_cache[809] || (_cache[809] = [
                        _createElementVNode("svg", {
                          class: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2"
                        }, [
                          _createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M6 18L18 6M6 6l12 12"
                          })
                        ], -1 /* CACHED */)
                      ]))])
                    ]),
                    _createElementVNode("div", _hoisted_1116, [
                      _createElementVNode("div", {
                        class: "h-full bg-arancione rounded-full transition-all duration-500",
                        style: _normalizeStyle({ width: _ctx.playerProgressPct + '%' })
                      }, null, 4 /* STYLE */)
                    ])
                  ]),
                  (_ctx.workoutPlayer.phase === 'countdown')
                    ? (_openBlock(), _createElementBlock("div", _hoisted_1117, [
                        _cache[810] || (_cache[810] = _createElementVNode("p", { class: "text-xs font-bold text-white/60 uppercase tracking-[0.3em]" }, "Preparati", -1 /* CACHED */)),
                        (_openBlock(), _createElementBlock("div", {
                          key: _ctx.playerCountdown,
                          class: "text-[9rem] leading-none font-black text-arancione animate-fadeIn tabular-nums"
                        }, _toDisplayString(_ctx.playerCountdown), 1 /* TEXT */)),
                        _createElementVNode("p", _hoisted_1118, "Primo esercizio: " + _toDisplayString(_ctx.playerExercise ? _ctx.playerExercise.name : ''), 1 /* TEXT */)
                      ]))
                    : (_ctx.workoutPlayer.phase === 'done' && _ctx.workoutPlayer.summary)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_1119, [
                          _cache[816] || (_cache[816] = _createElementVNode("div", { class: "w-24 h-24 rounded-full bg-arancione/20 border-2 border-arancione flex items-center justify-center text-5xl" }, "🏆", -1 /* CACHED */)),
                          _createElementVNode("div", _hoisted_1120, [
                            _createElementVNode("h2", _hoisted_1121, _toDisplayString(_ctx.workoutPlayer.summary.quote.title), 1 /* TEXT */),
                            _createElementVNode("p", _hoisted_1122, _toDisplayString(_ctx.workoutPlayer.summary.quote.text), 1 /* TEXT */)
                          ]),
                          (_ctx.workoutPlayer.summary.records && _ctx.workoutPlayer.summary.records.length)
                            ? (_openBlock(), _createElementBlock("div", _hoisted_1123, [
                                _createElementVNode("div", _hoisted_1124, "🔥 " + _toDisplayString(_ctx.workoutPlayer.summary.records.length === 1 ? 'Nuovo record personale!' : _ctx.workoutPlayer.summary.records.length + ' nuovi record personali!'), 1 /* TEXT */),
                                (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.workoutPlayer.summary.records.slice(0, 3), (r) => {
                                  return (_openBlock(), _createElementBlock("div", {
                                    key: 'pr' + r.name,
                                    class: "flex items-center justify-between gap-2 text-xs font-bold"
                                  }, [
                                    _createElementVNode("span", _hoisted_1125, _toDisplayString(r.name), 1 /* TEXT */),
                                    _createElementVNode("span", _hoisted_1126, [
                                      _createTextVNode(_toDisplayString(_ctx.formatNumber(r.value)) + " kg ", 1 /* TEXT */),
                                      _createElementVNode("span", _hoisted_1127, "(prima " + _toDisplayString(_ctx.formatNumber(r.prev)) + ")", 1 /* TEXT */)
                                    ])
                                  ]))
                                }), 128 /* KEYED_FRAGMENT */)),
                                _createElementVNode("button", {
                                  onClick: _cache[258] || (_cache[258] = $event => (_ctx.openAchievementShare(_ctx.workoutPlayer.summary.records[0]))),
                                  class: "w-full bg-arancione text-white font-extrabold py-2.5 rounded-xl text-xs active:scale-95 transition-all"
                                }, "🏆 Condividi il record nella storia")
                              ]))
                            : _createCommentVNode("v-if", true),
                          (_ctx.playerFeelExercise)
                            ? (_openBlock(), _createElementBlock("div", _hoisted_1128, [
                                _createElementVNode("p", _hoisted_1129, "Com'era " + _toDisplayString(_ctx.playerFeelExercise.name) + "?", 1 /* TEXT */),
                                _createElementVNode("div", _hoisted_1130, [
                                  (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.EXERCISE_FEELS, (f) => {
                                    return (_openBlock(), _createElementBlock("button", {
                                      key: 'df' + f.id,
                                      onClick: $event => (_ctx.setExerciseFeel(_ctx.playerFeelExercise, f.id)),
                                      class: _normalizeClass(["py-2 rounded-xl text-xs font-bold transition-all active:scale-95", _ctx.todayExerciseFeel(_ctx.playerFeelExercise) === f.id ? 'bg-arancione text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'])
                                    }, _toDisplayString(f.icon) + " " + _toDisplayString(f.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_1131))
                                  }), 128 /* KEYED_FRAGMENT */))
                                ])
                              ]))
                            : _createCommentVNode("v-if", true),
                          _createElementVNode("div", _hoisted_1132, [
                            _createElementVNode("div", _hoisted_1133, [
                              _cache[811] || (_cache[811] = _createElementVNode("div", { class: "text-[9px] font-bold text-white/50 uppercase tracking-widest" }, "Durata", -1 /* CACHED */)),
                              _createElementVNode("div", _hoisted_1134, _toDisplayString(_ctx.formatClock(_ctx.workoutPlayer.summary.totalSeconds)), 1 /* TEXT */)
                            ]),
                            _createElementVNode("div", _hoisted_1135, [
                              _cache[812] || (_cache[812] = _createElementVNode("div", { class: "text-[9px] font-bold text-white/50 uppercase tracking-widest" }, "Sotto sforzo", -1 /* CACHED */)),
                              _createElementVNode("div", _hoisted_1136, _toDisplayString(_ctx.formatClock(_ctx.workoutPlayer.summary.workSeconds)), 1 /* TEXT */)
                            ]),
                            _createElementVNode("div", _hoisted_1137, [
                              _cache[813] || (_cache[813] = _createElementVNode("div", { class: "text-[9px] font-bold text-white/50 uppercase tracking-widest" }, "Esercizi", -1 /* CACHED */)),
                              _createElementVNode("div", _hoisted_1138, _toDisplayString(_ctx.workoutPlayer.summary.exercises), 1 /* TEXT */)
                            ]),
                            _createElementVNode("div", _hoisted_1139, [
                              _cache[814] || (_cache[814] = _createElementVNode("div", { class: "text-[9px] font-bold text-white/50 uppercase tracking-widest" }, "Serie", -1 /* CACHED */)),
                              _createElementVNode("div", _hoisted_1140, _toDisplayString(_ctx.workoutPlayer.summary.sets), 1 /* TEXT */)
                            ])
                          ]),
                          _cache[817] || (_cache[817] = _createElementVNode("p", { class: "text-[11px] font-black uppercase tracking-[0.25em] cangiante-text" }, "Ieri. Oggi. Domani. Ancora.", -1 /* CACHED */)),
                          _createElementVNode("div", _hoisted_1141, [
                            _createElementVNode("button", {
                              onClick: _cache[259] || (_cache[259] = $event => (_ctx.openShareStudio('workout', _ctx.workoutPlayer.sessionId))),
                              class: "w-full cangiante-btn text-white font-extrabold py-4 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                            }, [...(_cache[815] || (_cache[815] = [
                              _createElementVNode("svg", {
                                class: "w-5 h-5",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                "stroke-width": "2.2"
                              }, [
                                _createElementVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                })
                              ], -1 /* CACHED */),
                              _createTextVNode(" Condividi il tuo allenamento ", -1 /* CACHED */)
                            ]))]),
                            _createElementVNode("button", {
                              onClick: _cache[260] || (_cache[260] = (...args) => (_ctx.closeGuidedWorkout && _ctx.closeGuidedWorkout(...args))),
                              class: "w-full bg-white/10 text-white font-bold py-3.5 rounded-2xl hover:bg-white/20 active:scale-95 transition-all"
                            }, "Chiudi")
                          ])
                        ]))
                      : (_ctx.playerStep && _ctx.playerExercise)
                        ? (_openBlock(), _createElementBlock("div", _hoisted_1142, [
                            (_ctx.workoutPlayer.phase === 'ready' && _ctx.workoutPlayer.restJustEnded)
                              ? (_openBlock(), _createElementBlock("div", _hoisted_1143, [
                                  _createElementVNode("p", _hoisted_1144, "⏱️ Recupero finito: " + _toDisplayString(_ctx.playerStep.setIdx === 0 ? 'tocca al prossimo esercizio!' : 'ricomincia la serie!'), 1 /* TEXT */),
                                  (_ctx.playerExercise.type !== 'cardio')
                                    ? (_openBlock(), _createElementBlock("p", _hoisted_1145, [
                                        _createTextVNode(" Ti " + _toDisplayString(_ctx.playerRemaining.sets === 1 ? 'resta' : 'restano') + " " + _toDisplayString(_ctx.playerRemaining.sets) + " serie", 1 /* TEXT */),
                                        (_ctx.playerRemaining.reps !== null)
                                          ? (_openBlock(), _createElementBlock("span", _hoisted_1146, " (" + _toDisplayString(_ctx.playerRemaining.reps) + " ripetizioni in tutto)", 1 /* TEXT */))
                                          : _createCommentVNode("v-if", true)
                                      ]))
                                    : _createCommentVNode("v-if", true)
                                ]))
                              : _createCommentVNode("v-if", true),
                            _createElementVNode("div", _hoisted_1147, [
                              _createElementVNode("div", _hoisted_1148, [
                                (_ctx.workoutPlayer.phase === 'rest')
                                  ? (_openBlock(), _createElementBlock("span", _hoisted_1149, "Prossimo"))
                                  : _createCommentVNode("v-if", true),
                                _createElementVNode("span", {
                                  class: _normalizeClass(["text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md", _ctx.playerTargetExercise && _ctx.playerTargetExercise.type === 'cardio' ? 'bg-sky-500/25 text-sky-300' : 'bg-arancione/25 text-arancione'])
                                }, _toDisplayString(_ctx.playerTargetExercise && _ctx.playerTargetExercise.type === 'cardio' ? 'Cardio' : (_ctx.playerTargetExercise && _ctx.playerTargetExercise.pyramid ? 'Forza · Piramidale' : 'Forza')), 3 /* TEXT, CLASS */),
                                (_ctx.playerTargetStep && _ctx.playerTargetStep.superset)
                                  ? (_openBlock(), _createElementBlock("span", _hoisted_1150, "Superserie"))
                                  : _createCommentVNode("v-if", true)
                              ]),
                              _createElementVNode("h2", _hoisted_1151, _toDisplayString(_ctx.playerTargetExercise ? _ctx.playerTargetExercise.name : ''), 1 /* TEXT */),
                              (_ctx.playerTargetExercise && _ctx.playerTargetExercise.type !== 'cardio')
                                ? (_openBlock(), _createElementBlock("div", _hoisted_1152, [
                                    _createElementVNode("div", _hoisted_1153, [
                                      _cache[818] || (_cache[818] = _createElementVNode("div", { class: "text-[9px] font-bold text-white/50 uppercase tracking-widest" }, "Serie", -1 /* CACHED */)),
                                      _createElementVNode("div", _hoisted_1154, [
                                        _createTextVNode(_toDisplayString(_ctx.playerTargetStep.setIdx + 1), 1 /* TEXT */),
                                        _createElementVNode("span", _hoisted_1155, "/" + _toDisplayString(_ctx.playerTargetStep.setsTotal), 1 /* TEXT */)
                                      ])
                                    ]),
                                    _createElementVNode("div", _hoisted_1156, [
                                      _cache[819] || (_cache[819] = _createElementVNode("div", { class: "text-[9px] font-bold text-white/50 uppercase tracking-widest" }, "Ripetizioni", -1 /* CACHED */)),
                                      _createElementVNode("div", _hoisted_1157, _toDisplayString(_ctx.playerTargetStep.reps || '—'), 1 /* TEXT */)
                                    ]),
                                    _createElementVNode("div", _hoisted_1158, [
                                      _cache[821] || (_cache[821] = _createElementVNode("div", { class: "text-[9px] font-bold text-white/50 uppercase tracking-widest" }, "Recupero", -1 /* CACHED */)),
                                      _createElementVNode("div", _hoisted_1159, [
                                        _createTextVNode(_toDisplayString(_ctx.exerciseRest(_ctx.playerTargetExercise)), 1 /* TEXT */),
                                        _cache[820] || (_cache[820] = _createElementVNode("span", { class: "text-white/40 text-sm" }, "s", -1 /* CACHED */))
                                      ])
                                    ])
                                  ]))
                                : (_ctx.playerTargetExercise)
                                  ? (_openBlock(), _createElementBlock("div", _hoisted_1160, [
                                      _createElementVNode("div", _hoisted_1161, [
                                        _cache[823] || (_cache[823] = _createElementVNode("div", { class: "text-[9px] font-bold text-white/50 uppercase tracking-widest" }, "Durata", -1 /* CACHED */)),
                                        _createElementVNode("div", _hoisted_1162, [
                                          _createTextVNode(_toDisplayString(_ctx.playerCurrentValue !== null ? _ctx.formatNumber(_ctx.playerCurrentValue) : '—'), 1 /* TEXT */),
                                          _cache[822] || (_cache[822] = _createElementVNode("span", { class: "text-white/40 text-sm" }, " min", -1 /* CACHED */))
                                        ])
                                      ]),
                                      _createElementVNode("div", _hoisted_1163, [
                                        _cache[824] || (_cache[824] = _createElementVNode("div", { class: "text-[9px] font-bold text-white/50 uppercase tracking-widest" }, "Intensità / Velocità", -1 /* CACHED */)),
                                        _createElementVNode("div", _hoisted_1164, _toDisplayString(_ctx.playerTargetExercise.intensity || '—'), 1 /* TEXT */)
                                      ])
                                    ]))
                                  : _createCommentVNode("v-if", true),
                              _createElementVNode("div", _hoisted_1165, [
                                _createElementVNode("div", _hoisted_1166, [
                                  _createElementVNode("span", _hoisted_1167, _toDisplayString(_ctx.playerUnit === 'min' ? 'Durata (min)' : 'Peso (kg)'), 1 /* TEXT */),
                                  _cache[825] || (_cache[825] = _createElementVNode("span", { class: "text-[9px] font-medium text-white/40" }, "si aggiorna ovunque", -1 /* CACHED */))
                                ]),
                                _createElementVNode("div", _hoisted_1168, [
                                  _createElementVNode("button", {
                                    onClick: _cache[261] || (_cache[261] = $event => (_ctx.playerAdjustValue(-1))),
                                    class: "w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 text-xl font-bold active:scale-90 transition-all flex-shrink-0",
                                    "aria-label": "Diminuisci"
                                  }, "−"),
                                  _withDirectives(_createElementVNode("input", {
                                    type: "text",
                                    inputmode: "decimal",
                                    "onUpdate:modelValue": _cache[262] || (_cache[262] = $event => ((_ctx.playerValueDraft) = $event)),
                                    onChange: _cache[263] || (_cache[263] = $event => (_ctx.playerSetValue(_ctx.playerValueDraft))),
                                    onKeyup: _cache[264] || (_cache[264] = _withKeys($event => ($event.target.blur()), ["enter"])),
                                    placeholder: "—",
                                    class: "flex-1 min-w-0 bg-white/10 border border-white/10 focus:border-arancione rounded-xl py-2 text-center text-2xl font-black text-white outline-none transition-all placeholder:text-white/30"
                                  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [
                                    [_vModelText, _ctx.playerValueDraft]
                                  ]),
                                  _createElementVNode("button", {
                                    onClick: _cache[265] || (_cache[265] = $event => (_ctx.playerAdjustValue(1))),
                                    class: "w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 text-xl font-bold active:scale-90 transition-all flex-shrink-0",
                                    "aria-label": "Aumenta"
                                  }, "+")
                                ]),
                                _createElementVNode("p", _hoisted_1169, _toDisplayString(_ctx.playerUnit === 'min' ? '± 1 min' : '± 2,5 kg') + " · oppure scrivi il valore", 1 /* TEXT */),
                                (_ctx.playerSuggestion)
                                  ? (_openBlock(), _createElementBlock("div", {
                                      key: 0,
                                      class: _normalizeClass(["flex items-center gap-2 rounded-xl px-3 py-2", _ctx.playerSuggestion.kind === 'down' ? 'bg-sky-500/15' : 'bg-salvia/15'])
                                    }, [
                                      _createElementVNode("p", _hoisted_1170, [
                                        _createElementVNode("b", _hoisted_1171, _toDisplayString(_ctx.playerSuggestion.kind === 'down' ? '⬇️' : '⬆️') + " Consiglio: " + _toDisplayString(_ctx.formatNumber(_ctx.playerSuggestion.value)) + " kg.", 1 /* TEXT */),
                                        _createTextVNode(" " + _toDisplayString(_ctx.playerSuggestion.reason), 1 /* TEXT */)
                                      ]),
                                      _createElementVNode("button", {
                                        onClick: _cache[266] || (_cache[266] = $event => (_ctx.playerSetValue(_ctx.playerSuggestion.value))),
                                        class: "shrink-0 bg-white text-antracite text-[11px] font-extrabold px-3 py-1.5 rounded-lg active:scale-95 transition-all"
                                      }, "Usa")
                                    ], 2 /* CLASS */))
                                  : _createCommentVNode("v-if", true)
                              ])
                            ]),
                            (_ctx.workoutPlayer.phase === 'ready')
                              ? (_openBlock(), _createElementBlock("div", _hoisted_1172, [
                                  _createElementVNode("button", {
                                    onClick: _cache[267] || (_cache[267] = (...args) => (_ctx.playerStartSet && _ctx.playerStartSet(...args))),
                                    class: "w-full bg-arancione text-white font-extrabold py-5 rounded-2xl shadow-lg hover:bg-arancione/90 active:scale-95 transition-all flex items-center justify-center gap-2 text-lg"
                                  }, [
                                    _cache[826] || (_cache[826] = _createElementVNode("svg", {
                                      class: "w-6 h-6",
                                      fill: "currentColor",
                                      viewBox: "0 0 24 24"
                                    }, [
                                      _createElementVNode("path", { d: "M8 5v14l11-7z" })
                                    ], -1 /* CACHED */)),
                                    _createTextVNode(" " + _toDisplayString(_ctx.playerExercise.type === 'cardio' ? 'Inizia cardio' : (_ctx.playerStep.setIdx === 0 ? 'Inizia esercizio' : (_ctx.workoutPlayer.restJustEnded ? 'Ho iniziato la serie' : 'Inizia serie'))), 1 /* TEXT */)
                                  ])
                                ]))
                              : (_ctx.workoutPlayer.phase === 'working')
                                ? (_openBlock(), _createElementBlock("div", _hoisted_1173, [
                                    _createElementVNode("div", _hoisted_1174, [
                                      _cache[827] || (_cache[827] = _createElementVNode("p", { class: "text-[10px] font-bold text-white/50 uppercase tracking-[0.3em]" }, "In esecuzione", -1 /* CACHED */)),
                                      _createElementVNode("p", _hoisted_1175, _toDisplayString(_ctx.formatClock(_ctx.playerElapsed)), 1 /* TEXT */),
                                      (_ctx.playerExercise.type === 'cardio' && _ctx.playerCurrentValue)
                                        ? (_openBlock(), _createElementBlock("p", _hoisted_1176, [
                                            _createTextVNode(" Obiettivo " + _toDisplayString(_ctx.formatNumber(_ctx.playerCurrentValue)) + " min ", 1 /* TEXT */),
                                            (_ctx.playerElapsed >= _ctx.playerCurrentValue * 60)
                                              ? (_openBlock(), _createElementBlock("span", _hoisted_1177, " · raggiunto! ✓"))
                                              : _createCommentVNode("v-if", true)
                                          ]))
                                        : _createCommentVNode("v-if", true)
                                    ]),
                                    _createElementVNode("button", {
                                      onClick: _cache[268] || (_cache[268] = (...args) => (_ctx.playerCompleteSet && _ctx.playerCompleteSet(...args))),
                                      class: "w-full bg-salvia text-white font-extrabold py-5 rounded-2xl shadow-lg hover:bg-salvia/90 active:scale-95 transition-all flex items-center justify-center gap-2 text-lg"
                                    }, [
                                      _cache[828] || (_cache[828] = _createElementVNode("svg", {
                                        class: "w-6 h-6",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        "stroke-width": "3"
                                      }, [
                                        _createElementVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          d: "M5 13l4 4L19 7"
                                        })
                                      ], -1 /* CACHED */)),
                                      _createTextVNode(" " + _toDisplayString(_ctx.playerExercise.type === 'cardio' ? 'Fine cardio' : 'Serie completata'), 1 /* TEXT */)
                                    ])
                                  ]))
                                : (_ctx.workoutPlayer.phase === 'rest')
                                  ? (_openBlock(), _createElementBlock("div", _hoisted_1178, [
                                      _createElementVNode("div", _hoisted_1179, [
                                        _cache[830] || (_cache[830] = _createElementVNode("p", { class: "text-[10px] font-bold text-white/50 uppercase tracking-[0.3em] mb-2" }, "Recupero", -1 /* CACHED */)),
                                        _createElementVNode("div", _hoisted_1180, [
                                          (_openBlock(), _createElementBlock("svg", _hoisted_1181, [
                                            _cache[829] || (_cache[829] = _createElementVNode("circle", {
                                              cx: "50",
                                              cy: "50",
                                              r: "44",
                                              fill: "none",
                                              stroke: "rgba(255,255,255,0.1)",
                                              "stroke-width": "7"
                                            }, null, -1 /* CACHED */)),
                                            _createElementVNode("circle", {
                                              cx: "50",
                                              cy: "50",
                                              r: "44",
                                              fill: "none",
                                              stroke: "#8B5CF6",
                                              "stroke-width": "7",
                                              "stroke-linecap": "round",
                                              "stroke-dasharray": 276.46,
                                              "stroke-dashoffset": 276.46 * (1 - _ctx.playerRestPct / 100),
                                              class: "transition-all duration-300"
                                            }, null, 8 /* PROPS */, _hoisted_1182)
                                          ])),
                                          _createElementVNode("div", _hoisted_1183, [
                                            _createElementVNode("span", _hoisted_1184, _toDisplayString(_ctx.formatClock(Math.ceil(_ctx.playerRestLeft))), 1 /* TEXT */)
                                          ])
                                        ]),
                                        (_ctx.playerNextExercise && _ctx.playerNextStep.exId !== _ctx.playerStep.exId)
                                          ? (_openBlock(), _createElementBlock("p", _hoisted_1185, "Esercizio completato! Prepara il prossimo."))
                                          : _createCommentVNode("v-if", true)
                                      ]),
                                      (_ctx.playerFeelExercise)
                                        ? (_openBlock(), _createElementBlock("div", _hoisted_1186, [
                                            _createElementVNode("p", _hoisted_1187, "Com'era " + _toDisplayString(_ctx.playerFeelExercise.name) + "?", 1 /* TEXT */),
                                            _createElementVNode("div", _hoisted_1188, [
                                              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.EXERCISE_FEELS, (f) => {
                                                return (_openBlock(), _createElementBlock("button", {
                                                  key: 'rf' + f.id,
                                                  onClick: $event => (_ctx.setExerciseFeel(_ctx.playerFeelExercise, f.id)),
                                                  class: _normalizeClass(["py-2 rounded-xl text-xs font-bold transition-all active:scale-95", _ctx.todayExerciseFeel(_ctx.playerFeelExercise) === f.id ? 'bg-arancione text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'])
                                                }, _toDisplayString(f.icon) + " " + _toDisplayString(f.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_1189))
                                              }), 128 /* KEYED_FRAGMENT */))
                                            ])
                                          ]))
                                        : _createCommentVNode("v-if", true),
                                      _createElementVNode("div", _hoisted_1190, [
                                        _createElementVNode("button", {
                                          onClick: _cache[269] || (_cache[269] = $event => (_ctx.playerAddRest(15))),
                                          class: "flex-1 bg-white/10 hover:bg-white/20 font-bold py-3.5 rounded-2xl active:scale-95 transition-all"
                                        }, "+15s"),
                                        _createElementVNode("button", {
                                          onClick: _cache[270] || (_cache[270] = (...args) => (_ctx.playerSkipRest && _ctx.playerSkipRest(...args))),
                                          class: "flex-1 bg-viola hover:bg-viola/90 font-bold py-3.5 rounded-2xl active:scale-95 transition-all"
                                        }, "Salta recupero")
                                      ])
                                    ]))
                                  : _createCommentVNode("v-if", true)
                          ]))
                        : _createCommentVNode("v-if", true)
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.pyramidModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_1191, [
                _createElementVNode("div", _hoisted_1192, [
                  _createElementVNode("div", _hoisted_1193, [
                    _createElementVNode("div", _hoisted_1194, [
                      _cache[834] || (_cache[834] = _createElementVNode("div", { class: "w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 border border-amber-200 flex-shrink-0" }, [
                        _createElementVNode("svg", {
                          class: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2"
                        }, [
                          _createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M4 20h16M6 16l4-8 4 5 4-9"
                          })
                        ])
                      ], -1 /* CACHED */)),
                      _createElementVNode("div", _hoisted_1195, [
                        _cache[833] || (_cache[833] = _createElementVNode("h3", { class: "text-lg font-bold text-antracite leading-tight" }, "Serie piramidali", -1 /* CACHED */)),
                        _createElementVNode("p", _hoisted_1196, _toDisplayString(_ctx.pyramidExerciseName), 1 /* TEXT */)
                      ])
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[271] || (_cache[271] = $event => (_ctx.pyramidModal.isOpen = false)),
                      class: "p-1 text-gray-400 hover:text-antracite flex-shrink-0"
                    }, [...(_cache[835] || (_cache[835] = [
                      _createElementVNode("svg", {
                        class: "w-6 h-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  _createElementVNode("div", _hoisted_1197, [
                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.pyramidModal.sets, (set, sIdx) => {
                      return (_openBlock(), _createElementBlock("div", {
                        key: 'pyramid-set-' + sIdx,
                        class: "flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-2xl p-2.5"
                      }, [
                        _createElementVNode("div", _hoisted_1198, _toDisplayString(sIdx + 1), 1 /* TEXT */),
                        _createElementVNode("div", _hoisted_1199, [
                          _cache[836] || (_cache[836] = _createElementVNode("label", { class: "block text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5" }, "Peso (kg)", -1 /* CACHED */)),
                          _withDirectives(_createElementVNode("input", {
                            type: "text",
                            inputmode: "decimal",
                            "onUpdate:modelValue": $event => ((set.weight) = $event),
                            placeholder: "kg",
                            class: "w-full bg-white border border-gray-200 focus:border-amber-400 rounded-lg px-2 py-1.5 text-xs font-bold text-antracite text-center outline-none transition-all placeholder:text-gray-300"
                          }, null, 8 /* PROPS */, _hoisted_1200), [
                            [_vModelText, set.weight]
                          ])
                        ]),
                        _createElementVNode("div", _hoisted_1201, [
                          _cache[837] || (_cache[837] = _createElementVNode("label", { class: "block text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5" }, "Ripetizioni", -1 /* CACHED */)),
                          _withDirectives(_createElementVNode("input", {
                            type: "text",
                            "onUpdate:modelValue": $event => ((set.reps) = $event),
                            placeholder: "rip",
                            class: "w-full bg-white border border-gray-200 focus:border-amber-400 rounded-lg px-2 py-1.5 text-xs font-bold text-antracite text-center outline-none transition-all placeholder:text-gray-300"
                          }, null, 8 /* PROPS */, _hoisted_1202), [
                            [_vModelText, set.reps]
                          ])
                        ]),
                        _createElementVNode("button", {
                          onClick: $event => (_ctx.removePyramidSet(sIdx)),
                          disabled: _ctx.pyramidModal.sets.length <= 1,
                          class: "p-1.5 text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:hover:text-gray-400 flex-shrink-0",
                          "aria-label": "Rimuovi serie"
                        }, [...(_cache[838] || (_cache[838] = [
                          _createElementVNode("svg", {
                            class: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            "stroke-width": "2"
                          }, [
                            _createElementVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            })
                          ], -1 /* CACHED */)
                        ]))], 8 /* PROPS */, _hoisted_1203)
                      ]))
                    }), 128 /* KEYED_FRAGMENT */))
                  ]),
                  (_ctx.pyramidModal.error)
                    ? (_openBlock(), _createElementBlock("p", _hoisted_1204, _toDisplayString(_ctx.pyramidModal.error), 1 /* TEXT */))
                    : _createCommentVNode("v-if", true),
                  _createElementVNode("button", {
                    onClick: _cache[272] || (_cache[272] = (...args) => (_ctx.addPyramidSet && _ctx.addPyramidSet(...args))),
                    class: "w-full py-2.5 border-2 border-dashed border-amber-300 bg-amber-50 rounded-xl text-amber-700 font-bold text-xs hover:bg-amber-100 transition-colors flex items-center justify-center gap-1.5 shrink-0"
                  }, [...(_cache[839] || (_cache[839] = [
                    _createElementVNode("svg", {
                      class: "w-3.5 h-3.5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      "stroke-width": "2.5"
                    }, [
                      _createElementVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M12 4v16m8-8H4"
                      })
                    ], -1 /* CACHED */),
                    _createTextVNode(" Aggiungi serie ", -1 /* CACHED */)
                  ]))]),
                  _createElementVNode("div", _hoisted_1205, [
                    _createElementVNode("button", {
                      onClick: _cache[273] || (_cache[273] = $event => (_ctx.pyramidModal.isOpen = false)),
                      class: "flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 active:scale-95 transition-all"
                    }, "Annulla"),
                    _createElementVNode("button", {
                      onClick: _cache[274] || (_cache[274] = (...args) => (_ctx.savePyramidModal && _ctx.savePyramidModal(...args))),
                      class: "flex-1 bg-amber-500 text-white font-bold py-3 rounded-xl shadow-md hover:bg-amber-600 active:scale-95 transition-all"
                    }, "Salva")
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.pyramidLogModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_1206, [
                _createElementVNode("div", _hoisted_1207, [
                  _createElementVNode("div", _hoisted_1208, [
                    _createElementVNode("div", _hoisted_1209, [
                      _cache[841] || (_cache[841] = _createElementVNode("div", { class: "w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 border border-amber-200 flex-shrink-0" }, [
                        _createElementVNode("svg", {
                          class: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2"
                        }, [
                          _createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M12 4l8 16H4L12 4z"
                          })
                        ])
                      ], -1 /* CACHED */)),
                      _createElementVNode("div", _hoisted_1210, [
                        _cache[840] || (_cache[840] = _createElementVNode("h3", { class: "text-lg font-bold text-antracite leading-tight" }, "Registra serie", -1 /* CACHED */)),
                        _createElementVNode("p", _hoisted_1211, _toDisplayString(_ctx.pyramidLogModal.exerciseName), 1 /* TEXT */)
                      ])
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[275] || (_cache[275] = $event => (_ctx.pyramidLogModal.isOpen = false)),
                      class: "p-1 text-gray-400 hover:text-antracite flex-shrink-0"
                    }, [...(_cache[842] || (_cache[842] = [
                      _createElementVNode("svg", {
                        class: "w-6 h-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  _cache[847] || (_cache[847] = _createElementVNode("p", { class: "text-[10px] font-medium text-gray-500 leading-relaxed shrink-0" }, [
                    _createTextVNode("Inserisci il peso di "),
                    _createElementVNode("b", null, "ogni serie"),
                    _createTextVNode(". Nei progressi conta solo il peso maggiore.")
                  ], -1 /* CACHED */)),
                  _createElementVNode("div", _hoisted_1212, [
                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.pyramidLogModal.sets, (set, sIdx) => {
                      return (_openBlock(), _createElementBlock("div", {
                        key: 'pyramid-log-set-' + sIdx,
                        class: "flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-2xl p-2.5"
                      }, [
                        _createElementVNode("div", _hoisted_1213, _toDisplayString(sIdx + 1), 1 /* TEXT */),
                        _createElementVNode("div", _hoisted_1214, [
                          _cache[843] || (_cache[843] = _createElementVNode("label", { class: "block text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5" }, "Peso (kg)", -1 /* CACHED */)),
                          _withDirectives(_createElementVNode("input", {
                            type: "text",
                            inputmode: "decimal",
                            "onUpdate:modelValue": $event => ((set.weight) = $event),
                            placeholder: "kg",
                            onKeyup: _cache[276] || (_cache[276] = _withKeys((...args) => (_ctx.confirmPyramidLog && _ctx.confirmPyramidLog(...args)), ["enter"])),
                            class: "w-full bg-white border border-gray-200 focus:border-amber-400 rounded-lg px-2 py-1.5 text-xs font-bold text-antracite text-center outline-none transition-all placeholder:text-gray-300"
                          }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_1215), [
                            [_vModelText, set.weight]
                          ])
                        ]),
                        _createElementVNode("div", _hoisted_1216, [
                          _cache[844] || (_cache[844] = _createElementVNode("label", { class: "block text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5" }, "Rip.", -1 /* CACHED */)),
                          _withDirectives(_createElementVNode("input", {
                            type: "text",
                            inputmode: "numeric",
                            "onUpdate:modelValue": $event => ((set.reps) = $event),
                            placeholder: "rip",
                            class: "w-full bg-white border border-gray-200 focus:border-amber-400 rounded-lg px-2 py-1.5 text-xs font-bold text-antracite text-center outline-none transition-all placeholder:text-gray-300"
                          }, null, 8 /* PROPS */, _hoisted_1217), [
                            [_vModelText, set.reps]
                          ])
                        ])
                      ]))
                    }), 128 /* KEYED_FRAGMENT */)),
                    _createElementVNode("button", {
                      onClick: _cache[277] || (_cache[277] = (...args) => (_ctx.addPyramidLogSet && _ctx.addPyramidLogSet(...args))),
                      class: "w-full py-2 border-2 border-dashed border-amber-300 bg-amber-50 rounded-xl text-amber-700 font-bold text-[10px] hover:bg-amber-100 transition-colors flex items-center justify-center gap-1.5"
                    }, [...(_cache[845] || (_cache[845] = [
                      _createElementVNode("svg", {
                        class: "w-3 h-3",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2.5"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M12 4v16m8-8H4"
                        })
                      ], -1 /* CACHED */),
                      _createTextVNode(" Aggiungi serie ", -1 /* CACHED */)
                    ]))])
                  ]),
                  _createElementVNode("div", _hoisted_1218, [
                    _cache[846] || (_cache[846] = _createElementVNode("span", { class: "text-[10px] font-bold text-amber-800 uppercase tracking-wider" }, "Peso massimo", -1 /* CACHED */)),
                    _createElementVNode("span", _hoisted_1219, _toDisplayString(_ctx.pyramidLogTopWeight !== null ? _ctx.formatNumber(_ctx.pyramidLogTopWeight) + ' kg' : '—'), 1 /* TEXT */)
                  ]),
                  (_ctx.pyramidLogModal.error)
                    ? (_openBlock(), _createElementBlock("p", _hoisted_1220, _toDisplayString(_ctx.pyramidLogModal.error), 1 /* TEXT */))
                    : _createCommentVNode("v-if", true),
                  _createElementVNode("div", _hoisted_1221, [
                    _createElementVNode("button", {
                      onClick: _cache[278] || (_cache[278] = $event => (_ctx.pyramidLogModal.isOpen = false)),
                      class: "flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 active:scale-95 transition-all"
                    }, "Annulla"),
                    _createElementVNode("button", {
                      onClick: _cache[279] || (_cache[279] = (...args) => (_ctx.confirmPyramidLog && _ctx.confirmPyramidLog(...args))),
                      class: "flex-1 bg-amber-500 text-white font-bold py-3 rounded-xl shadow-md hover:bg-amber-600 active:scale-95 transition-all"
                    }, "Conferma")
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.weightConfirmModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_1222, [
                _createElementVNode("div", _hoisted_1223, [
                  _cache[853] || (_cache[853] = _createElementVNode("div", { class: "w-12 h-12 mx-auto rounded-2xl bg-arancione/10 border border-arancione/20 text-arancione flex items-center justify-center" }, [
                    _createElementVNode("svg", {
                      class: "w-6 h-6",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      "stroke-width": "2"
                    }, [
                      _createElementVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                      })
                    ])
                  ], -1 /* CACHED */)),
                  _createElementVNode("div", null, [
                    _createElementVNode("h3", _hoisted_1224, "Aggiorna " + _toDisplayString(_ctx.weightConfirmModal.isCardio ? 'durata' : 'peso'), 1 /* TEXT */),
                    _createElementVNode("p", _hoisted_1225, [
                      _cache[848] || (_cache[848] = _createTextVNode(" Sei sicuro di voler aggiornare ", -1 /* CACHED */)),
                      _createElementVNode("b", _hoisted_1226, _toDisplayString(_ctx.weightConfirmModal.exerciseName), 1 /* TEXT */),
                      _cache[849] || (_cache[849] = _createTextVNode(" a ", -1 /* CACHED */)),
                      _createElementVNode("b", _hoisted_1227, _toDisplayString(_ctx.formatNumber(_ctx.weightConfirmModal.value)) + " " + _toDisplayString(_ctx.weightConfirmModal.unit), 1 /* TEXT */),
                      _cache[850] || (_cache[850] = _createTextVNode("? ", -1 /* CACHED */))
                    ])
                  ]),
                  (!_ctx.weightConfirmModal.isCardio)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_1228, [
                        _cache[851] || (_cache[851] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "Com'è andata?", -1 /* CACHED */)),
                        _createElementVNode("div", _hoisted_1229, [
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.EXERCISE_FEELS, (f) => {
                            return (_openBlock(), _createElementBlock("button", {
                              key: 'wf' + f.id,
                              type: "button",
                              onClick: $event => (_ctx.weightConfirmModal.feel = _ctx.weightConfirmModal.feel === f.id ? '' : f.id),
                              class: _normalizeClass(["py-2 rounded-xl text-xs font-bold border transition-all", _ctx.weightConfirmModal.feel === f.id ? 'bg-arancione/10 border-arancione text-arancione' : 'bg-white border-gray-200 text-gray-500'])
                            }, _toDisplayString(f.icon) + " " + _toDisplayString(f.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_1230))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]),
                        _cache[852] || (_cache[852] = _createElementVNode("p", { class: "text-[10px] font-medium text-gray-400" }, "Facoltativo: serve per il consiglio della prossima volta.", -1 /* CACHED */))
                      ]))
                    : _createCommentVNode("v-if", true),
                  _createElementVNode("div", _hoisted_1231, [
                    _createElementVNode("button", {
                      onClick: _cache[280] || (_cache[280] = (...args) => (_ctx.cancelExerciseValue && _ctx.cancelExerciseValue(...args))),
                      class: "flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 active:scale-95 transition-all"
                    }, "No"),
                    _createElementVNode("button", {
                      onClick: _cache[281] || (_cache[281] = (...args) => (_ctx.confirmExerciseValue && _ctx.confirmExerciseValue(...args))),
                      class: "flex-1 bg-arancione text-white font-bold py-3 rounded-xl shadow-md hover:bg-arancione/90 active:scale-95 transition-all"
                    }, "Sì, aggiorna")
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.wrapped.isOpen && _ctx.wrapped.data)
            ? (_openBlock(), _createElementBlock("div", {
                key: 27,
                class: "fixed inset-0 z-[80] text-white select-none overflow-hidden",
                style: _normalizeStyle([{ background: _ctx.wrapped.idx < _ctx.wrapped.data.slides.length ? _ctx.wrapped.data.slides[_ctx.wrapped.idx].bg : 'linear-gradient(160deg, #7A4DF1 0%, #EC4899 55%, #F5A623 100%)' }, {"transition":"background 0.6s ease"}])
              }, [
                _cache[860] || (_cache[860] = _createElementVNode("div", { class: "absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl wrap-float" }, null, -1 /* CACHED */)),
                _cache[861] || (_cache[861] = _createElementVNode("div", {
                  class: "absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-black/20 blur-3xl wrap-float",
                  style: {"animation-delay":"-3s"}
                }, null, -1 /* CACHED */)),
                _createElementVNode("div", _hoisted_1232, [
                  _createElementVNode("div", _hoisted_1233, [
                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.wrapped.data.slides, (s, i) => {
                      return (_openBlock(), _createElementBlock("div", {
                        key: 'wb' + i,
                        class: "h-1 flex-1 rounded-full bg-white/25 overflow-hidden"
                      }, [
                        _createElementVNode("div", {
                          class: "h-full bg-white rounded-full",
                          style: _normalizeStyle({ width: (_ctx.wrappedProgress(i) * 100) + '%' })
                        }, null, 4 /* STYLE */)
                      ]))
                    }), 128 /* KEYED_FRAGMENT */))
                  ]),
                  _createElementVNode("div", _hoisted_1234, [
                    _createElementVNode("span", _hoisted_1235, "STILL · " + _toDisplayString(_ctx.wrapped.data.year), 1 /* TEXT */),
                    _createElementVNode("button", {
                      onClick: _cache[282] || (_cache[282] = _withModifiers((...args) => (_ctx.closeWrapped && _ctx.closeWrapped(...args)), ["stop"])),
                      class: "w-9 h-9 rounded-full bg-black/20 flex items-center justify-center",
                      "aria-label": "Chiudi"
                    }, [...(_cache[854] || (_cache[854] = [
                      _createElementVNode("svg", {
                        class: "w-5 h-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2.5"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ])
                ]),
                (_ctx.wrapped.idx < _ctx.wrapped.data.slides.length)
                  ? (_openBlock(), _createElementBlock("div", {
                      key: 0,
                      class: "absolute inset-0 z-10 flex flex-col justify-center px-8",
                      onClick: _cache[283] || (_cache[283] = (...args) => (_ctx.wrappedTap && _ctx.wrappedTap(...args)))
                    }, [
                      (_openBlock(), _createElementBlock("div", {
                        key: 'ws' + _ctx.wrapped.idx,
                        class: "space-y-4"
                      }, [
                        _createElementVNode("div", _hoisted_1236, _toDisplayString(_ctx.wrapped.data.slides[_ctx.wrapped.idx].emoji), 1 /* TEXT */),
                        _createElementVNode("div", _hoisted_1237, _toDisplayString(_ctx.wrapped.data.slides[_ctx.wrapped.idx].kicker), 1 /* TEXT */),
                        _createElementVNode("div", {
                          class: _normalizeClass(["font-black leading-[0.95] break-words wrap-pop", String(_ctx.wrapped.data.slides[_ctx.wrapped.idx].big).length > 10 ? 'text-5xl' : 'text-7xl']),
                          style: {"animation-delay":".3s"}
                        }, _toDisplayString(_ctx.wrapped.data.slides[_ctx.wrapped.idx].big), 3 /* TEXT, CLASS */),
                        _createElementVNode("div", _hoisted_1238, _toDisplayString(_ctx.wrapped.data.slides[_ctx.wrapped.idx].caption), 1 /* TEXT */),
                        (_ctx.wrapped.data.slides[_ctx.wrapped.idx].sub)
                          ? (_openBlock(), _createElementBlock("div", _hoisted_1239, _toDisplayString(_ctx.wrapped.data.slides[_ctx.wrapped.idx].sub), 1 /* TEXT */))
                          : _createCommentVNode("v-if", true),
                        (_ctx.wrapped.data.slides[_ctx.wrapped.idx].pets)
                          ? (_openBlock(), _createElementBlock("div", _hoisted_1240, [
                              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.wrapped.data.slides[_ctx.wrapped.idx].pets, (p, i) => {
                                return (_openBlock(), _createElementBlock("div", {
                                  key: 'wpet' + p.id,
                                  class: "text-center wrap-pop",
                                  style: _normalizeStyle({ animationDelay: (0.7 + i * 0.12) + 's' })
                                }, [
                                  _createElementVNode("div", _hoisted_1241, [
                                    _createElementVNode("div", {
                                      class: "w-full h-full pet-bob",
                                      innerHTML: p.svg
                                    }, null, 8 /* PROPS */, _hoisted_1242)
                                  ]),
                                  _createElementVNode("div", _hoisted_1243, _toDisplayString(p.name), 1 /* TEXT */)
                                ], 4 /* STYLE */))
                              }), 128 /* KEYED_FRAGMENT */))
                            ]))
                          : _createCommentVNode("v-if", true),
                        (_ctx.wrapped.data.slides[_ctx.wrapped.idx].fun)
                          ? (_openBlock(), _createElementBlock("p", _hoisted_1244, _toDisplayString(_ctx.wrapped.data.slides[_ctx.wrapped.idx].fun), 1 /* TEXT */))
                          : _createCommentVNode("v-if", true)
                      ])),
                      _cache[855] || (_cache[855] = _createElementVNode("div", {
                        class: "absolute bottom-8 inset-x-0 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-white/50",
                        style: {"padding-bottom":"env(safe-area-inset-bottom)"}
                      }, "Tocca per continuare", -1 /* CACHED */))
                    ]))
                  : (_openBlock(), _createElementBlock("div", _hoisted_1245, [
                      _createElementVNode("div", _hoisted_1246, [
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.wrappedConfetti, (c, i) => {
                          return (_openBlock(), _createElementBlock("span", {
                            key: 'cf' + i,
                            class: "wrap-confetti",
                            style: _normalizeStyle({ left: c.left + '%', background: c.color, animationDelay: c.delay + 's', animationDuration: c.duration + 's', borderRadius: c.round ? '50%' : '2px' })
                          }, null, 4 /* STYLE */))
                        }), 128 /* KEYED_FRAGMENT */))
                      ]),
                      _createElementVNode("div", _hoisted_1247, [
                        (_ctx.petState.stage)
                          ? (_openBlock(), _createElementBlock("div", {
                              key: 0,
                              class: "w-24 h-24 shrink-0 pet-bob",
                              innerHTML: _ctx.petMainSvg
                            }, null, 8 /* PROPS */, _hoisted_1248))
                          : (_openBlock(), _createElementBlock("div", _hoisted_1249, "🎉")),
                        _createElementVNode("div", _hoisted_1250, [
                          _createElementVNode("div", _hoisted_1251, "Che anno" + _toDisplayString(_ctx.wrapped.data.name ? ', ' + _ctx.wrapped.data.name : '') + "! 🎉", 1 /* TEXT */),
                          _createElementVNode("div", _hoisted_1252, _toDisplayString(_ctx.wrapped.data.activeDays ? 'Grazie per averlo passato con me.' : 'Il prossimo lo riempiamo insieme.'), 1 /* TEXT */)
                        ])
                      ]),
                      _createElementVNode("div", _hoisted_1253, [
                        _createElementVNode("div", _hoisted_1254, "Il tuo " + _toDisplayString(_ctx.wrapped.data.year) + " su STILL", 1 /* TEXT */),
                        _createElementVNode("div", _hoisted_1255, [
                          _createTextVNode(_toDisplayString(_ctx.wrapped.data.activeDays) + " ", 1 /* TEXT */),
                          _cache[856] || (_cache[856] = _createElementVNode("span", { class: "text-lg font-bold text-white/80" }, "giorni in movimento", -1 /* CACHED */))
                        ])
                      ]),
                      (_ctx.wrapped.data.activeDays)
                        ? (_openBlock(), _createElementBlock("div", _hoisted_1256, [
                            _cache[857] || (_cache[857] = _createElementVNode("div", { class: "text-[10px] font-black uppercase tracking-[0.2em] text-viola" }, "Che atleta sei", -1 /* CACHED */)),
                            _createElementVNode("div", _hoisted_1257, _toDisplayString(_ctx.wrapped.data.type.emoji) + " " + _toDisplayString(_ctx.wrapped.data.type.name), 1 /* TEXT */),
                            _createElementVNode("p", _hoisted_1258, _toDisplayString(_ctx.wrapped.data.type.text), 1 /* TEXT */)
                          ]))
                        : _createCommentVNode("v-if", true),
                      (_ctx.wrapped.data.tiles.length)
                        ? (_openBlock(), _createElementBlock("div", _hoisted_1259, [
                            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.wrapped.data.tiles, (t, i) => {
                              return (_openBlock(), _createElementBlock("div", {
                                key: 'wt' + i,
                                class: "rounded-2xl p-4 shadow-lg wrap-pop",
                                style: _normalizeStyle({ background: t.color, animationDelay: (0.35 + i * 0.09) + 's' })
                              }, [
                                _createElementVNode("div", _hoisted_1260, [
                                  _createElementVNode("div", _hoisted_1261, _toDisplayString(t.label), 1 /* TEXT */),
                                  _createElementVNode("span", _hoisted_1262, _toDisplayString(t.emoji), 1 /* TEXT */)
                                ]),
                                _createElementVNode("div", _hoisted_1263, _toDisplayString(t.value), 1 /* TEXT */)
                              ], 4 /* STYLE */))
                            }), 128 /* KEYED_FRAGMENT */))
                          ]))
                        : _createCommentVNode("v-if", true),
                      (_ctx.wrapped.data.pets.length)
                        ? (_openBlock(), _createElementBlock("div", _hoisted_1264, [
                            _createElementVNode("div", _hoisted_1265, [
                              _cache[858] || (_cache[858] = _createElementVNode("div", { class: "text-[10px] font-black uppercase tracking-[0.2em] text-white/80" }, "La tua collezione", -1 /* CACHED */)),
                              _createElementVNode("div", _hoisted_1266, _toDisplayString(_ctx.wrapped.data.pets.length) + " / " + _toDisplayString(_ctx.PET_SPECIES.length), 1 /* TEXT */)
                            ]),
                            _createElementVNode("div", _hoisted_1267, [
                              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.wrapped.data.pets, (p) => {
                                return (_openBlock(), _createElementBlock("div", {
                                  key: 'wfp' + p.id,
                                  class: "w-14 h-14 shrink-0 rounded-xl bg-white/15 p-0.5 pet-bob",
                                  innerHTML: p.svg
                                }, null, 8 /* PROPS */, _hoisted_1268))
                              }), 128 /* KEYED_FRAGMENT */))
                            ])
                          ]))
                        : _createCommentVNode("v-if", true),
                      (!_ctx.wrapped.data.activeDays)
                        ? (_openBlock(), _createElementBlock("p", _hoisted_1269, "Segna allenamenti e pasti: il prossimo racconto sarà pieno di numeri da condividere."))
                        : _createCommentVNode("v-if", true),
                      _createElementVNode("div", _hoisted_1270, [
                        (_ctx.wrapped.data.activeDays)
                          ? (_openBlock(), _createElementBlock("button", {
                              key: 0,
                              onClick: _cache[284] || (_cache[284] = (...args) => (_ctx.shareWrapped && _ctx.shareWrapped(...args))),
                              class: "w-full bg-white text-antracite font-black py-4 rounded-2xl shadow-xl active:scale-95 transition-all"
                            }, "🎬 Condividi nelle storie"))
                          : _createCommentVNode("v-if", true),
                        _createElementVNode("button", {
                          onClick: _cache[285] || (_cache[285] = $event => (_ctx.wrappedGo(-_ctx.wrapped.data.slides.length))),
                          class: "w-full bg-white/15 text-white font-bold py-3.5 rounded-2xl active:scale-95 transition-all"
                        }, "🔁 Rivedi da capo"),
                        _cache[859] || (_cache[859] = _createElementVNode("p", { class: "text-[10px] font-medium text-white/60 text-center pt-2" }, "Salti, km e calorie sono stime per divertirsi, non misure.", -1 /* CACHED */))
                      ])
                    ]))
              ], 4 /* STYLE */))
            : _createCommentVNode("v-if", true),
          (_ctx.eatSwap.isOpen && _ctx.eatSwap.food)
            ? (_openBlock(), _createElementBlock("div", {
                key: 28,
                class: "fixed inset-0 z-[60] bg-antracite/50 backdrop-blur-sm flex items-end sm:items-center justify-center animate-fadeIn",
                onClick: _cache[289] || (_cache[289] = _withModifiers($event => (_ctx.eatSwap.isOpen = false), ["self"]))
              }, [
                _createElementVNode("div", _hoisted_1271, [
                  _createElementVNode("div", _hoisted_1272, [
                    _createElementVNode("div", _hoisted_1273, [
                      _cache[862] || (_cache[862] = _createElementVNode("div", { class: "text-[10px] font-bold text-salvia uppercase tracking-widest" }, "Cambia alimento", -1 /* CACHED */)),
                      _createElementVNode("h3", _hoisted_1274, _toDisplayString(_ctx.eatSwap.food.text), 1 /* TEXT */),
                      _createElementVNode("p", _hoisted_1275, "Scegli con cosa sostituirlo: la porzione è già ricalcolata " + _toDisplayString(['secondo', 'affettato', 'colazione', 'proteine'].includes(_ctx.eatSwap.food.group) ? 'per darti le stesse proteine' : 'per le stesse calorie') + ".", 1 /* TEXT */)
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[286] || (_cache[286] = $event => (_ctx.eatSwap.isOpen = false)),
                      class: "p-1 text-gray-400",
                      "aria-label": "Chiudi"
                    }, [...(_cache[863] || (_cache[863] = [
                      _createElementVNode("svg", {
                        class: "w-6 h-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  _createElementVNode("div", _hoisted_1276, [
                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.eatSwap.options, (o) => {
                      return (_openBlock(), _createElementBlock("button", {
                        key: 'so' + o.t,
                        onClick: $event => (_ctx.chooseEatSwap(o.t)),
                        class: "w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border border-gray-200 text-left active:scale-[0.98] transition-all hover:border-salvia"
                      }, [
                        _createElementVNode("span", _hoisted_1278, _toDisplayString(o.text), 1 /* TEXT */),
                        (o.kcal !== null)
                          ? (_openBlock(), _createElementBlock("span", _hoisted_1279, [
                              _createTextVNode("≈ " + _toDisplayString(o.kcal) + " kcal", 1 /* TEXT */),
                              (o.protein)
                                ? (_openBlock(), _createElementBlock("span", _hoisted_1280, " · " + _toDisplayString(o.protein) + " g prot", 1 /* TEXT */))
                                : _createCommentVNode("v-if", true)
                            ]))
                          : _createCommentVNode("v-if", true)
                      ], 8 /* PROPS */, _hoisted_1277))
                    }), 128 /* KEYED_FRAGMENT */)),
                    (!_ctx.eatSwap.options.length)
                      ? (_openBlock(), _createElementBlock("p", _hoisted_1281, "Con i gusti che hai scelto non ci sono alternative per questo alimento."))
                      : _createCommentVNode("v-if", true)
                  ]),
                  _createElementVNode("div", _hoisted_1282, [
                    (_ctx.eatSwap.food.swapped && !_ctx.eatSwap.food.auto)
                      ? (_openBlock(), _createElementBlock("button", {
                          key: 0,
                          onClick: _cache[287] || (_cache[287] = (...args) => (_ctx.resetEatSwap && _ctx.resetEatSwap(...args))),
                          class: "bg-gray-100 text-gray-600 font-bold py-3 rounded-xl text-sm"
                        }, "↺ Originale"))
                      : _createCommentVNode("v-if", true),
                    _createElementVNode("button", {
                      onClick: _cache[288] || (_cache[288] = (...args) => (_ctx.dislikeEatFood && _ctx.dislikeEatFood(...args))),
                      class: _normalizeClass(["bg-red-50 text-red-500 font-bold py-3 rounded-xl text-sm", _ctx.eatSwap.food.swapped && !_ctx.eatSwap.food.auto ? '' : 'col-span-2'])
                    }, "👎 Non mi piace " + _toDisplayString(_ctx.eatSwap.food.current), 3 /* TEXT, CLASS */)
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.eatGuide.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_1283, [
                _createElementVNode("div", _hoisted_1284, [
                  _createElementVNode("div", _hoisted_1285, [
                    _cache[865] || (_cache[865] = _createElementVNode("div", null, [
                      _createElementVNode("div", { class: "text-[10px] font-bold text-salvia tracking-widest uppercase" }, "Guida"),
                      _createElementVNode("h2", { class: "text-xl font-extrabold text-antracite leading-tight" }, "Mangiare meglio")
                    ], -1 /* CACHED */)),
                    _createElementVNode("button", {
                      onClick: _cache[290] || (_cache[290] = $event => (_ctx.eatGuide.isOpen = false)),
                      class: "w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center",
                      "aria-label": "Chiudi"
                    }, [...(_cache[864] || (_cache[864] = [
                      _createElementVNode("svg", {
                        class: "w-5 h-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  _createElementVNode("div", _hoisted_1286, [
                    _createElementVNode("button", {
                      onClick: _cache[291] || (_cache[291] = $event => (_ctx.eatGuide.tab = 'tips')),
                      class: _normalizeClass(["py-2 rounded-xl text-xs font-bold transition-all", _ctx.eatGuide.tab === 'tips' ? 'bg-salvia text-white shadow-sm' : 'text-gray-500'])
                    }, "Consigli", 2 /* CLASS */),
                    _createElementVNode("button", {
                      onClick: _cache[292] || (_cache[292] = $event => (_ctx.eatGuide.tab = 'days')),
                      class: _normalizeClass(["py-2 rounded-xl text-xs font-bold transition-all", _ctx.eatGuide.tab === 'days' ? 'bg-salvia text-white shadow-sm' : 'text-gray-500'])
                    }, "Giornate tipo", 2 /* CLASS */)
                  ])
                ]),
                _createElementVNode("div", _hoisted_1287, [
                  (_ctx.eatGuide.tab === 'tips')
                    ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                        (_ctx.menuCheck)
                          ? (_openBlock(), _createElementBlock("div", _hoisted_1288, [
                              _createElementVNode("div", _hoisted_1289, "Il tuo piano: " + _toDisplayString(_ctx.menuCheck.name), 1 /* TEXT */),
                              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.menuCheck.notes, (n, i) => {
                                return (_openBlock(), _createElementBlock("p", {
                                  key: 'mc' + i,
                                  class: _normalizeClass(["text-[12px] font-medium leading-snug flex gap-2", n.ok ? 'text-antracite' : 'text-arancione'])
                                }, [
                                  _createElementVNode("span", null, _toDisplayString(n.ok ? '✅' : '⚠️'), 1 /* TEXT */),
                                  _createElementVNode("span", null, _toDisplayString(n.text), 1 /* TEXT */)
                                ], 2 /* CLASS */))
                              }), 128 /* KEYED_FRAGMENT */))
                            ]))
                          : _createCommentVNode("v-if", true),
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.NUTRITION_TIPS, (tip) => {
                          return (_openBlock(), _createElementBlock("div", {
                            key: tip.title,
                            class: "bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex gap-3"
                          }, [
                            _createElementVNode("div", _hoisted_1290, _toDisplayString(tip.icon), 1 /* TEXT */),
                            _createElementVNode("div", _hoisted_1291, [
                              _createElementVNode("div", _hoisted_1292, _toDisplayString(tip.title), 1 /* TEXT */),
                              _createElementVNode("p", _hoisted_1293, _toDisplayString(tip.text), 1 /* TEXT */),
                              (_ctx.eatTipStat(tip))
                                ? (_openBlock(), _createElementBlock("p", _hoisted_1294, _toDisplayString(_ctx.eatTipStat(tip)), 1 /* TEXT */))
                                : _createCommentVNode("v-if", true)
                            ])
                          ]))
                        }), 128 /* KEYED_FRAGMENT */)),
                        _createElementVNode("button", {
                          onClick: _cache[293] || (_cache[293] = $event => (_ctx.eatGuide.tab = 'days')),
                          class: "w-full bg-salvia text-white font-bold py-3.5 rounded-2xl active:scale-95 transition-all"
                        }, "Guarda le giornate tipo →")
                      ], 64 /* STABLE_FRAGMENT */))
                    : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                        _createElementVNode("div", _hoisted_1295, [
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.NUTRITION_GOALS, (g) => {
                            return (_openBlock(), _createElementBlock("button", {
                              key: 'eg' + g.id,
                              onClick: $event => (_ctx.eatGuide.goal = g.id),
                              class: _normalizeClass(["shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-all", _ctx.eatGuide.goal === g.id ? 'bg-antracite text-white border-antracite' : 'bg-white text-gray-500 border-gray-200'])
                            }, [
                              _createTextVNode(_toDisplayString(g.icon) + " " + _toDisplayString(g.name), 1 /* TEXT */),
                              (_ctx.suggestedEatGoal === g.id)
                                ? (_openBlock(), _createElementBlock("span", _hoisted_1297, " ⭐"))
                                : _createCommentVNode("v-if", true)
                            ], 10 /* CLASS, PROPS */, _hoisted_1296))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]),
                        _createElementVNode("div", _hoisted_1298, [
                          _createElementVNode("div", _hoisted_1299, _toDisplayString(_ctx.eatTarget ? 'Su misura per te · ≈ ' + _ctx.eatTarget + ' kcal al giorno' : _ctx.NUTRITION_GOALS.find(g => g.id === _ctx.eatGuide.goal).range) + " · 3 giornate da alternare", 1 /* TEXT */),
                          _createElementVNode("p", _hoisted_1300, _toDisplayString(_ctx.NUTRITION_GOALS.find(g => g.id === _ctx.eatGuide.goal).desc), 1 /* TEXT */),
                          (_ctx.bodyStats.energy)
                            ? (_openBlock(), _createElementBlock("p", _hoisted_1301, "Porzioni calcolate dal tuo fabbisogno (≈ " + _toDisplayString(_ctx.bodyStats.energy.tdee) + " kcal per mantenerti, ≈ " + _toDisplayString(_ctx.bodyStats.energy.lose) + " per dimagrire, ≈ " + _toDisplayString(_ctx.bodyStats.energy.gain) + " per crescere). ⭐ = l'obiettivo che ti suggeriamo.", 1 /* TEXT */))
                            : (_openBlock(), _createElementBlock("p", _hoisted_1302, "Porzioni medie: completa il profilo (altezza, data di nascita, sesso) e pesati in Progressi, così le giornate si adattano a te.")),
                          (_ctx.eatTarget && (_ctx.eatFactor >= 1.4 || _ctx.eatFactor <= 0.75))
                            ? (_openBlock(), _createElementBlock("p", _hoisted_1303, "Il tuo fabbisogno è lontano dalla media: abbiamo adattato le porzioni fin dove ha senso, per numeri precisi chiedi a un nutrizionista."))
                            : _createCommentVNode("v-if", true)
                        ]),
                        _createElementVNode("div", _hoisted_1304, [
                          _cache[867] || (_cache[867] = _createElementVNode("div", null, [
                            _createElementVNode("div", { class: "text-sm font-extrabold text-antracite" }, "😋 I tuoi gusti"),
                            _createElementVNode("p", { class: "text-[11px] font-medium text-gray-500 leading-snug" }, "Tocca un alimento ⇄ per cambiarlo con un altro dello stesso tipo: la porzione si ricalcola. Quello che escludi qui viene sostituito da solo.")
                          ], -1 /* CACHED */)),
                          _createElementVNode("div", _hoisted_1305, [
                            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.EAT_EXCLUDES, (x) => {
                              return (_openBlock(), _createElementBlock("button", {
                                key: 'ex' + x.id,
                                onClick: $event => (_ctx.toggleEatExclude(x.id)),
                                class: _normalizeClass(["px-2.5 py-1.5 rounded-full text-[11px] font-bold border transition-all", _ctx.eatPrefs.exclude.includes(x.id) ? 'bg-salvia text-white border-salvia' : 'bg-white text-gray-500 border-gray-200'])
                              }, _toDisplayString(x.icon) + " " + _toDisplayString(x.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_1306))
                            }), 128 /* KEYED_FRAGMENT */))
                          ]),
                          (_ctx.eatPrefs.dislikes.length)
                            ? (_openBlock(), _createElementBlock("div", _hoisted_1307, [
                                _cache[866] || (_cache[866] = _createElementVNode("span", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, "Non ti piace:", -1 /* CACHED */)),
                                (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.eatPrefs.dislikes, (d) => {
                                  return (_openBlock(), _createElementBlock("button", {
                                    key: 'dl' + d,
                                    onClick: $event => (_ctx.removeEatDislike(d)),
                                    class: "px-2 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-500 border border-red-100"
                                  }, _toDisplayString(d) + " ✕", 9 /* TEXT, PROPS */, _hoisted_1308))
                                }), 128 /* KEYED_FRAGMENT */))
                              ]))
                            : _createCommentVNode("v-if", true),
                          (_ctx.eatSwapCount)
                            ? (_openBlock(), _createElementBlock("p", _hoisted_1309, _toDisplayString(_ctx.eatSwapCount) + " " + _toDisplayString(_ctx.eatSwapCount === 1 ? 'alimento cambiato' : 'alimenti cambiati') + " secondo i tuoi gusti", 1 /* TEXT */))
                            : _createCommentVNode("v-if", true)
                        ]),
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.eatGoalDays, (day) => {
                          return (_openBlock(), _createElementBlock("div", {
                            key: 'ed' + day.name,
                            class: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                          }, [
                            _createElementVNode("div", _hoisted_1310, [
                              _createElementVNode("span", _hoisted_1311, _toDisplayString(day.name), 1 /* TEXT */),
                              _createElementVNode("span", _hoisted_1312, "≈ " + _toDisplayString(day.kcal) + " kcal · " + _toDisplayString(day.protein) + " g prot", 1 /* TEXT */)
                            ]),
                            _createElementVNode("div", _hoisted_1313, [
                              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(day.meals, (m) => {
                                return (_openBlock(), _createElementBlock("div", {
                                  key: day.name + m.type,
                                  class: "px-4 py-2.5 flex gap-3"
                                }, [
                                  _createElementVNode("span", _hoisted_1314, _toDisplayString(m.icon), 1 /* TEXT */),
                                  _createElementVNode("div", _hoisted_1315, [
                                    _createElementVNode("div", _hoisted_1316, [
                                      _createElementVNode("span", _hoisted_1317, _toDisplayString(m.label), 1 /* TEXT */),
                                      _createElementVNode("span", _hoisted_1318, "≈ " + _toDisplayString(m.kcal) + " kcal", 1 /* TEXT */)
                                    ]),
                                    _createElementVNode("div", _hoisted_1319, [
                                      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(m.foods, (f) => {
                                        return (_openBlock(), _createElementBlock("button", {
                                          key: f.key,
                                          onClick: $event => (_ctx.openEatSwap(f)),
                                          disabled: !f.swappable,
                                          class: _normalizeClass(["text-[11px] font-semibold leading-tight px-2 py-1 rounded-lg border text-left transition-all", f.swapped ? 'bg-salvia/10 border-salvia/40 text-antracite' : f.swappable ? 'bg-gray-50 border-gray-200 text-gray-600 active:scale-95' : 'border-transparent text-gray-500 px-0.5'])
                                        }, [
                                          _createTextVNode(_toDisplayString(f.text), 1 /* TEXT */),
                                          (f.swappable)
                                            ? (_openBlock(), _createElementBlock("span", _hoisted_1321, " ⇄"))
                                            : _createCommentVNode("v-if", true)
                                        ], 10 /* CLASS, PROPS */, _hoisted_1320))
                                      }), 128 /* KEYED_FRAGMENT */))
                                    ])
                                  ])
                                ]))
                              }), 128 /* KEYED_FRAGMENT */))
                            ])
                          ]))
                        }), 128 /* KEYED_FRAGMENT */)),
                        _createElementVNode("button", {
                          onClick: _cache[294] || (_cache[294] = (...args) => (_ctx.createTrialPlan && _ctx.createTrialPlan(...args))),
                          class: "w-full bg-salvia text-white font-extrabold py-4 rounded-2xl shadow-lg active:scale-95 transition-all"
                        }, "Prova per una settimana"),
                        _cache[868] || (_cache[868] = _createElementVNode("p", { class: "text-[10px] font-medium text-gray-400 leading-relaxed text-center px-2" }, "Esempi generici, non una dieta personalizzata. Se hai patologie, allergie, sei in gravidanza o segui terapie, chiedi prima al medico. Per un piano su misura vai da un nutrizionista.", -1 /* CACHED */))
                      ], 64 /* STABLE_FRAGMENT */))
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.exerciseInfo.isOpen && _ctx.exerciseInfo.item)
            ? (_openBlock(), _createElementBlock("div", {
                key: 30,
                class: "fixed inset-0 z-[60] bg-antracite/50 backdrop-blur-sm flex items-end sm:items-center justify-center animate-fadeIn",
                onClick: _cache[296] || (_cache[296] = _withModifiers($event => (_ctx.exerciseInfo.isOpen = false), ["self"]))
              }, [
                _createElementVNode("div", _hoisted_1322, [
                  _createElementVNode("div", _hoisted_1323, [
                    _createElementVNode("div", _hoisted_1324, [
                      _cache[869] || (_cache[869] = _createElementVNode("div", { class: "text-[10px] font-bold text-arancione uppercase tracking-widest" }, "Come si fa", -1 /* CACHED */)),
                      _createElementVNode("h3", _hoisted_1325, _toDisplayString(_ctx.exerciseInfo.item.n), 1 /* TEXT */),
                      _createElementVNode("div", {
                        class: _normalizeClass(["text-[11px] font-bold mt-0.5", _ctx.exerciseInfo.item.t === 'cardio' ? 'text-sky-600' : 'text-arancione'])
                      }, _toDisplayString(_ctx.guidePrescription(_ctx.exerciseInfo.item)) + " · " + _toDisplayString(_ctx.exerciseInfo.item.w === 'gym' ? 'in palestra' : 'a casa'), 3 /* TEXT, CLASS */)
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[295] || (_cache[295] = $event => (_ctx.exerciseInfo.isOpen = false)),
                      class: "p-1 text-gray-400",
                      "aria-label": "Chiudi"
                    }, [...(_cache[870] || (_cache[870] = [
                      _createElementVNode("svg", {
                        class: "w-6 h-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  (_ctx.exerciseInfo.photos)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_1326, [
                        _createElementVNode("img", {
                          src: _ctx.exerciseInfo.photos[0],
                          alt: "Inizio del movimento",
                          class: "absolute inset-0 w-full h-full object-cover"
                        }, null, 8 /* PROPS */, _hoisted_1327),
                        _createElementVNode("img", {
                          src: _ctx.exerciseInfo.photos[1],
                          alt: "Fine del movimento",
                          class: "absolute inset-0 w-full h-full object-cover ex-frame2"
                        }, null, 8 /* PROPS */, _hoisted_1328)
                      ]))
                    : _createCommentVNode("v-if", true),
                  _createElementVNode("div", {
                    class: _normalizeClass(["grid gap-3", _ctx.exerciseInfo.photos ? 'grid-cols-[1fr_auto]' : 'grid-cols-2'])
                  }, [
                    (!_ctx.exerciseInfo.photos)
                      ? (_openBlock(), _createElementBlock("div", {
                          key: 0,
                          class: "rounded-2xl bg-gray-50 border border-gray-100 p-2 aspect-square",
                          innerHTML: _ctx.exerciseInfo.pose
                        }, null, 8 /* PROPS */, _hoisted_1329))
                      : _createCommentVNode("v-if", true),
                    _createElementVNode("div", {
                      class: _normalizeClass(["rounded-2xl bg-gray-50 border border-gray-100 p-2 flex items-center", _ctx.exerciseInfo.photos ? 'w-36 h-32' : 'aspect-square']),
                      innerHTML: _ctx.exerciseInfo.map
                    }, null, 10 /* CLASS, PROPS */, _hoisted_1330),
                    (_ctx.exerciseInfo.photos)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_1331, [
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.exerciseInfo.primary, (m) => {
                            return (_openBlock(), _createElementBlock("span", {
                              key: 'mpp' + m,
                              class: "text-[11px] font-bold px-2.5 py-1 rounded-full bg-arancione text-white"
                            }, _toDisplayString(m), 1 /* TEXT */))
                          }), 128 /* KEYED_FRAGMENT */)),
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.exerciseInfo.secondary, (m) => {
                            return (_openBlock(), _createElementBlock("span", {
                              key: 'msp' + m,
                              class: "text-[11px] font-bold px-2.5 py-1 rounded-full bg-arancione/15 text-arancione"
                            }, _toDisplayString(m), 1 /* TEXT */))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]))
                      : _createCommentVNode("v-if", true)
                  ], 2 /* CLASS */),
                  (!_ctx.exerciseInfo.photos)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_1332, [
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.exerciseInfo.primary, (m) => {
                          return (_openBlock(), _createElementBlock("span", {
                            key: 'mp' + m,
                            class: "text-[11px] font-bold px-2.5 py-1 rounded-full bg-arancione text-white"
                          }, _toDisplayString(m), 1 /* TEXT */))
                        }), 128 /* KEYED_FRAGMENT */)),
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.exerciseInfo.secondary, (m) => {
                          return (_openBlock(), _createElementBlock("span", {
                            key: 'ms' + m,
                            class: "text-[11px] font-bold px-2.5 py-1 rounded-full bg-arancione/15 text-arancione"
                          }, _toDisplayString(m), 1 /* TEXT */))
                        }), 128 /* KEYED_FRAGMENT */))
                      ]))
                    : _createCommentVNode("v-if", true),
                  _createElementVNode("p", _hoisted_1333, "💡 " + _toDisplayString(_ctx.exerciseInfo.item.tip), 1 /* TEXT */),
                  _createElementVNode("p", _hoisted_1334, _toDisplayString(_ctx.exerciseInfo.photos ? 'Foto: Free Exercise DB (pubblico dominio).' : 'Disegno indicativo del movimento.') + " Arancione pieno: muscoli principali; chiaro: quelli che aiutano.", 1 /* TEXT */)
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.workoutImport.isOpen)
            ? (_openBlock(), _createElementBlock("div", {
                key: 31,
                class: "fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn",
                onClick: _cache[301] || (_cache[301] = _withModifiers((...args) => (_ctx.closeWorkoutImport && _ctx.closeWorkoutImport(...args)), ["self"]))
              }, [
                _createElementVNode("div", _hoisted_1335, [
                  _createElementVNode("div", _hoisted_1336, [
                    _cache[872] || (_cache[872] = _createElementVNode("div", null, [
                      _createElementVNode("div", { class: "text-[10px] font-bold text-arancione tracking-widest uppercase" }, "Importa"),
                      _createElementVNode("h3", { class: "text-lg font-extrabold text-antracite leading-tight" }, "La tua scheda")
                    ], -1 /* CACHED */)),
                    _createElementVNode("button", {
                      onClick: _cache[297] || (_cache[297] = (...args) => (_ctx.closeWorkoutImport && _ctx.closeWorkoutImport(...args))),
                      class: "w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center",
                      "aria-label": "Chiudi"
                    }, [...(_cache[871] || (_cache[871] = [
                      _createElementVNode("svg", {
                        class: "w-5 h-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  _createElementVNode("label", {
                    class: _normalizeClass(["w-full bg-arancione text-white font-bold py-3.5 rounded-2xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer", _ctx.workoutImport.busy ? 'opacity-60 pointer-events-none' : ''])
                  }, [
                    _createElementVNode("input", {
                      type: "file",
                      class: "hidden",
                      accept: ".pdf,.docx,.doc,.txt,.md,.rtf,text/plain,application/pdf",
                      onChange: _cache[298] || (_cache[298] = (...args) => (_ctx.importWorkoutFile && _ctx.importWorkoutFile(...args)))
                    }, null, 32 /* NEED_HYDRATION */),
                    _cache[873] || (_cache[873] = _createElementVNode("svg", {
                      class: "w-5 h-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      "stroke-width": "2"
                    }, [
                      _createElementVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0-12l-4 4m4-4l4 4"
                      })
                    ], -1 /* CACHED */)),
                    _createTextVNode(" " + _toDisplayString(_ctx.workoutImport.busy ? 'Sto leggendo…' : 'Scegli un file (PDF, Word, testo)'), 1 /* TEXT */)
                  ], 2 /* CLASS */),
                  _cache[875] || (_cache[875] = _createElementVNode("div", { class: "flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-400" }, [
                    _createElementVNode("span", { class: "flex-1 h-px bg-gray-200" }),
                    _createTextVNode("oppure incollala"),
                    _createElementVNode("span", { class: "flex-1 h-px bg-gray-200" })
                  ], -1 /* CACHED */)),
                  _createElementVNode("div", _hoisted_1337, [
                    _cache[874] || (_cache[874] = _createElementVNode("p", { class: "text-[11px] font-medium text-gray-500 leading-snug" }, [
                      _createTextVNode("Dalle Note: apri la nota, "),
                      _createElementVNode("b", null, "Seleziona tutto → Copia"),
                      _createTextVNode(" e incolla qui. Un esercizio per riga; i giorni come titoli.")
                    ], -1 /* CACHED */)),
                    _withDirectives(_createElementVNode("textarea", {
                      "onUpdate:modelValue": _cache[299] || (_cache[299] = $event => ((_ctx.workoutImport.text) = $event)),
                      rows: "8",
                      class: "w-full rounded-2xl border border-gray-200 bg-white p-3 text-sm text-antracite font-medium focus:outline-none focus:border-arancione",
                      placeholder: "Giorno A - Petto e tricipiti\nPanca piana 4x8 60kg rec 90\nCroci ai cavi 3x12-15\nPushdown 3x12\n\nGiorno B - Schiena\nLat machine 4x10 50kg\nCurl bilanciere + curl martello 3x12"
                    }, null, 512 /* NEED_PATCH */), [
                      [_vModelText, _ctx.workoutImport.text]
                    ])
                  ]),
                  (_ctx.workoutImport.error)
                    ? (_openBlock(), _createElementBlock("p", _hoisted_1338, _toDisplayString(_ctx.workoutImport.error), 1 /* TEXT */))
                    : _createCommentVNode("v-if", true),
                  _createElementVNode("button", {
                    onClick: _cache[300] || (_cache[300] = (...args) => (_ctx.importWorkoutText && _ctx.importWorkoutText(...args))),
                    disabled: !_ctx.workoutImport.text.trim(),
                    class: "w-full bg-antracite text-white font-bold py-3.5 rounded-2xl active:scale-95 transition-all disabled:opacity-40"
                  }, "Leggi scheda", 8 /* PROPS */, _hoisted_1339),
                  _cache[876] || (_cache[876] = _createElementVNode("p", { class: "text-[10px] font-medium text-gray-400 leading-snug" }, "Riconosco serie e ripetizioni (4x8, 4 serie da 12, 12/10/8), carichi (60kg), recuperi (rec 90, 2 min) e superserie (A + B). Prima di salvare puoi correggere tutto.", -1 /* CACHED */))
                ])
              ]))
            : _createCommentVNode("v-if", true),
          _createElementVNode("datalist", _hoisted_1340, [
            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.EXERCISE_LIBRARY, (item) => {
              return (_openBlock(), _createElementBlock("option", {
                key: 'dl' + item.id,
                value: item.n
              }, null, 8 /* PROPS */, _hoisted_1341))
            }), 128 /* KEYED_FRAGMENT */))
          ]),
          (_ctx.guide.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_1342, [
                _createElementVNode("div", _hoisted_1343, [
                  _createElementVNode("div", _hoisted_1344, [
                    _cache[878] || (_cache[878] = _createElementVNode("div", null, [
                      _createElementVNode("div", { class: "text-[10px] font-bold text-arancione tracking-widest uppercase" }, "Guida"),
                      _createElementVNode("h2", { class: "text-xl font-extrabold text-antracite leading-tight" }, "Allenamenti consigliati")
                    ], -1 /* CACHED */)),
                    _createElementVNode("button", {
                      onClick: _cache[302] || (_cache[302] = (...args) => (_ctx.closeGuide && _ctx.closeGuide(...args))),
                      class: "w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center",
                      "aria-label": "Chiudi"
                    }, [...(_cache[877] || (_cache[877] = [
                      _createElementVNode("svg", {
                        class: "w-5 h-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  _createElementVNode("div", _hoisted_1345, [
                    (_openBlock(), _createElementBlock(_Fragment, null, _renderList([{ id: 'muscle', label: 'Per muscolo' }, { id: 'sport', label: 'Per sport' }, { id: 'programs', label: 'Programmi' }], (t) => {
                      return _createElementVNode("button", {
                        key: 'gt' + t.id,
                        onClick: $event => (_ctx.setGuideTab(t.id)),
                        class: _normalizeClass(["py-2 rounded-xl text-xs font-bold transition-all", _ctx.guide.tab === t.id ? 'bg-arancione text-white shadow-sm' : 'text-gray-500'])
                      }, _toDisplayString(t.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_1346)
                    }), 64 /* STABLE_FRAGMENT */))
                  ]),
                  (_ctx.guide.tab === 'muscle')
                    ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                        _createElementVNode("div", _hoisted_1347, [
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.MUSCLE_GROUPS, (m) => {
                            return (_openBlock(), _createElementBlock("button", {
                              key: 'gm' + m.id,
                              onClick: $event => {_ctx.guide.muscle = m.id; _ctx.guide.selected = []},
                              class: _normalizeClass(["shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-all", _ctx.guide.muscle === m.id ? 'bg-antracite text-white border-antracite' : 'bg-white text-gray-500 border-gray-200'])
                            }, _toDisplayString(m.icon) + " " + _toDisplayString(m.name), 11 /* TEXT, CLASS, PROPS */, _hoisted_1348))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]),
                        _createElementVNode("div", _hoisted_1349, [
                          _createElementVNode("button", {
                            onClick: _cache[303] || (_cache[303] = $event => {_ctx.guide.place = 'gym'; _ctx.guide.selected = []}),
                            class: _normalizeClass(["py-1.5 rounded-lg text-[11px] font-bold transition-all", _ctx.guide.place === 'gym' ? 'bg-arancione/10 text-arancione' : 'text-gray-400'])
                          }, "🏋️ In palestra", 2 /* CLASS */),
                          _createElementVNode("button", {
                            onClick: _cache[304] || (_cache[304] = $event => {_ctx.guide.place = 'home'; _ctx.guide.selected = []}),
                            class: _normalizeClass(["py-1.5 rounded-lg text-[11px] font-bold transition-all", _ctx.guide.place === 'home' ? 'bg-arancione/10 text-arancione' : 'text-gray-400'])
                          }, "🏠 A casa", 2 /* CLASS */)
                        ])
                      ], 64 /* STABLE_FRAGMENT */))
                    : _createCommentVNode("v-if", true),
                  (_ctx.guide.tab === 'sport')
                    ? (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                        _createElementVNode("div", _hoisted_1350, [
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.guideSports, (sp) => {
                            return (_openBlock(), _createElementBlock("button", {
                              key: 'gs' + sp,
                              onClick: $event => {_ctx.guide.sport = sp; _ctx.guide.selected = []},
                              class: _normalizeClass(["shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-all", _ctx.guide.sport === sp ? 'bg-antracite text-white border-antracite' : 'bg-white text-gray-500 border-gray-200'])
                            }, [
                              _createTextVNode(_toDisplayString(sp), 1 /* TEXT */),
                              (_ctx.userSports.includes(sp))
                                ? (_openBlock(), _createElementBlock("span", _hoisted_1352, " ⭐"))
                                : _createCommentVNode("v-if", true)
                            ], 10 /* CLASS, PROPS */, _hoisted_1351))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]),
                        _createElementVNode("div", _hoisted_1353, [
                          _createElementVNode("button", {
                            onClick: _cache[305] || (_cache[305] = $event => {_ctx.guide.place = 'gym'; _ctx.guide.selected = []}),
                            class: _normalizeClass(["py-1.5 rounded-lg text-[11px] font-bold transition-all", _ctx.guide.place === 'gym' ? 'bg-arancione/10 text-arancione' : 'text-gray-400'])
                          }, "🏋️ In palestra", 2 /* CLASS */),
                          _createElementVNode("button", {
                            onClick: _cache[306] || (_cache[306] = $event => {_ctx.guide.place = 'home'; _ctx.guide.selected = []}),
                            class: _normalizeClass(["py-1.5 rounded-lg text-[11px] font-bold transition-all", _ctx.guide.place === 'home' ? 'bg-arancione/10 text-arancione' : 'text-gray-400'])
                          }, "🏠 A casa", 2 /* CLASS */)
                        ])
                      ], 64 /* STABLE_FRAGMENT */))
                    : _createCommentVNode("v-if", true)
                ]),
                _createElementVNode("div", {
                  class: _normalizeClass(["flex-1 overflow-y-auto px-5 py-4 space-y-3", _ctx.guide.selected.length ? 'pb-28' : 'pb-8'])
                }, [
                  (_ctx.guide.tab === 'sport' && _ctx.SPORT_PROGRAMS[_ctx.guide.sport])
                    ? (_openBlock(), _createElementBlock("div", _hoisted_1354, [
                        _createElementVNode("div", _hoisted_1355, "Per migliorare a " + _toDisplayString(_ctx.guide.sport), 1 /* TEXT */),
                        _createElementVNode("p", _hoisted_1356, _toDisplayString(_ctx.SPORT_PROGRAMS[_ctx.guide.sport].focus), 1 /* TEXT */),
                        _createElementVNode("p", _hoisted_1357, _toDisplayString(_ctx.guide.place === 'gym' ? 'In palestra, con pesi e macchine' : 'A casa, senza attrezzi o quasi') + " · 2 volte a settimana, lontano dalla partita.", 1 /* TEXT */)
                      ]))
                    : _createCommentVNode("v-if", true),
                  (_ctx.guide.tab !== 'programs')
                    ? (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                        _createElementVNode("div", _hoisted_1358, [
                          _createElementVNode("span", _hoisted_1359, _toDisplayString(_ctx.guideExercises.length) + " " + _toDisplayString((_ctx.guideExercises.length) === 1 ? 'esercizio' : 'esercizi') + " · tocca per sceglierli", 1 /* TEXT */),
                          _createElementVNode("button", {
                            onClick: _cache[307] || (_cache[307] = (...args) => (_ctx.selectAllGuide && _ctx.selectAllGuide(...args))),
                            class: "text-[11px] font-bold text-arancione"
                          }, _toDisplayString(_ctx.guide.selected.length === _ctx.guideExercises.length ? 'Nessuno' : 'Tutti'), 1 /* TEXT */)
                        ]),
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.guideExercises, (item) => {
                          return (_openBlock(), _createElementBlock("button", {
                            key: 'ge' + item.id,
                            onClick: $event => (_ctx.toggleGuideSelect(item.id)),
                            class: _normalizeClass(["w-full text-left bg-white rounded-2xl p-4 border shadow-sm flex gap-3 items-start transition-all", _ctx.guide.selected.includes(item.id) ? 'border-arancione ring-2 ring-arancione/20' : 'border-gray-100'])
                          }, [
                            _createElementVNode("div", {
                              class: _normalizeClass(["w-6 h-6 mt-0.5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all", _ctx.guide.selected.includes(item.id) ? 'bg-arancione border-arancione text-white' : 'border-gray-300'])
                            }, [
                              (_ctx.guide.selected.includes(item.id))
                                ? (_openBlock(), _createElementBlock("svg", _hoisted_1361, [...(_cache[879] || (_cache[879] = [
                                    _createElementVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      d: "M5 13l4 4L19 7"
                                    }, null, -1 /* CACHED */)
                                  ]))]))
                                : _createCommentVNode("v-if", true)
                            ], 2 /* CLASS */),
                            _createElementVNode("div", _hoisted_1362, [
                              _createElementVNode("div", _hoisted_1363, [
                                _createElementVNode("span", _hoisted_1364, _toDisplayString(item.n), 1 /* TEXT */)
                              ]),
                              _createElementVNode("div", {
                                class: _normalizeClass(["text-[11px] font-bold mt-0.5", item.t === 'cardio' ? 'text-sky-600' : 'text-arancione'])
                              }, _toDisplayString(_ctx.guidePrescription(item)), 3 /* TEXT, CLASS */),
                              (item.why)
                                ? (_openBlock(), _createElementBlock("p", _hoisted_1365, "🎯 " + _toDisplayString(item.why), 1 /* TEXT */))
                                : _createCommentVNode("v-if", true),
                              _createElementVNode("p", _hoisted_1366, _toDisplayString(item.tip), 1 /* TEXT */)
                            ]),
                            (_ctx.exerciseThumb(item))
                              ? (_openBlock(), _createElementBlock("span", {
                                  key: 0,
                                  onClick: _withModifiers($event => (_ctx.openExerciseInfo(item)), ["stop"]),
                                  role: "button",
                                  "aria-label": "Come si fa",
                                  class: "w-16 shrink-0 rounded-xl bg-gray-50 border border-gray-100 p-1 flex flex-col items-center active:scale-95 transition-transform"
                                }, [
                                  (_ctx.exercisePhoto(item))
                                    ? (_openBlock(), _createElementBlock("img", {
                                        key: 0,
                                        src: _ctx.exercisePhoto(item),
                                        alt: "",
                                        loading: "lazy",
                                        class: "block w-full aspect-square object-cover rounded-lg"
                                      }, null, 8 /* PROPS */, _hoisted_1368))
                                    : (_openBlock(), _createElementBlock("span", {
                                        key: 1,
                                        class: "block w-full aspect-square",
                                        innerHTML: _ctx.exerciseThumb(item)
                                      }, null, 8 /* PROPS */, _hoisted_1369)),
                                  _cache[880] || (_cache[880] = _createElementVNode("span", { class: "text-[8px] font-black uppercase tracking-wider text-arancione mt-0.5" }, "Come si fa", -1 /* CACHED */))
                                ], 8 /* PROPS */, _hoisted_1367))
                              : _createCommentVNode("v-if", true)
                          ], 10 /* CLASS, PROPS */, _hoisted_1360))
                        }), 128 /* KEYED_FRAGMENT */))
                      ], 64 /* STABLE_FRAGMENT */))
                    : (_openBlock(true), _createElementBlock(_Fragment, { key: 2 }, _renderList(_ctx.WORKOUT_PROGRAMS, (program) => {
                        return (_openBlock(), _createElementBlock("div", {
                          key: 'gp' + program.id,
                          class: "bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-3"
                        }, [
                          _createElementVNode("div", _hoisted_1370, [
                            _createElementVNode("div", _hoisted_1371, _toDisplayString(program.icon), 1 /* TEXT */),
                            _createElementVNode("div", _hoisted_1372, [
                              _createElementVNode("div", _hoisted_1373, _toDisplayString(program.name), 1 /* TEXT */),
                              _createElementVNode("div", _hoisted_1374, _toDisplayString(program.level) + " · " + _toDisplayString(program.place === 'home' ? 'A casa' : 'In palestra') + " · " + _toDisplayString(program.days.length) + " " + _toDisplayString(program.days.length === 1 ? 'giorno' : 'giorni'), 1 /* TEXT */),
                              _createElementVNode("p", _hoisted_1375, _toDisplayString(program.desc), 1 /* TEXT */)
                            ])
                          ]),
                          _createElementVNode("div", _hoisted_1376, [
                            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(program.days, (day) => {
                              return (_openBlock(), _createElementBlock("div", {
                                key: program.id + day.name,
                                class: "bg-gray-50 rounded-xl px-3 py-2"
                              }, [
                                _createElementVNode("div", _hoisted_1377, _toDisplayString(day.name), 1 /* TEXT */),
                                _createElementVNode("div", _hoisted_1378, _toDisplayString(_ctx.programExerciseNames(day)), 1 /* TEXT */)
                              ]))
                            }), 128 /* KEYED_FRAGMENT */))
                          ]),
                          _createElementVNode("button", {
                            onClick: $event => (_ctx.createProgramSheet(program)),
                            class: "w-full bg-arancione text-white font-bold py-3 rounded-xl text-sm active:scale-95 transition-all"
                          }, "Crea questa scheda", 8 /* PROPS */, _hoisted_1379)
                        ]))
                      }), 128 /* KEYED_FRAGMENT */)),
                  _cache[881] || (_cache[881] = _createElementVNode("p", { class: "text-[10px] font-medium text-gray-400 leading-relaxed text-center px-4 pt-2" }, "Consigli generali per chi si allena da solo. Se hai dolori, infortuni o problemi di salute, chiedi prima a un medico o a un personal trainer.", -1 /* CACHED */))
                ], 2 /* CLASS */),
                (_ctx.guide.selected.length && !_ctx.guide.picker)
                  ? (_openBlock(), _createElementBlock("div", _hoisted_1380, [
                      _createElementVNode("button", {
                        onClick: _cache[308] || (_cache[308] = (...args) => (_ctx.openGuidePicker && _ctx.openGuidePicker(...args))),
                        class: "w-full bg-arancione text-white font-extrabold py-4 rounded-2xl shadow-lg active:scale-95 transition-all"
                      }, " Aggiungi " + _toDisplayString(_ctx.guide.selected.length) + " " + _toDisplayString(_ctx.guide.selected.length === 1 ? 'esercizio' : 'esercizi') + " alla scheda ", 1 /* TEXT */)
                    ]))
                  : _createCommentVNode("v-if", true),
                (_ctx.guide.picker)
                  ? (_openBlock(), _createElementBlock("div", {
                      key: 1,
                      class: "absolute inset-0 bg-antracite/40 backdrop-blur-sm flex items-end",
                      onClick: _cache[314] || (_cache[314] = _withModifiers($event => (_ctx.guide.picker = false), ["self"]))
                    }, [
                      _createElementVNode("div", _hoisted_1381, [
                        _createElementVNode("div", _hoisted_1382, [
                          _cache[883] || (_cache[883] = _createElementVNode("h3", { class: "text-lg font-bold text-antracite" }, "Dove li aggiungo?", -1 /* CACHED */)),
                          _createElementVNode("button", {
                            onClick: _cache[309] || (_cache[309] = $event => (_ctx.guide.picker = false)),
                            class: "p-1 text-gray-400",
                            "aria-label": "Chiudi"
                          }, [...(_cache[882] || (_cache[882] = [
                            _createElementVNode("svg", {
                              class: "w-6 h-6",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              "stroke-width": "2"
                            }, [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M6 18L18 6M6 6l12 12"
                              })
                            ], -1 /* CACHED */)
                          ]))])
                        ]),
                        _createElementVNode("div", _hoisted_1383, [
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.workoutSheets, (sheet) => {
                            return (_openBlock(), _createElementBlock("button", {
                              key: 'gps' + sheet.id,
                              onClick: $event => {_ctx.guide.sheetId = sheet.id; _ctx.guide.dayIdx = 0},
                              class: _normalizeClass(["w-full text-left px-4 py-3 rounded-2xl border text-sm font-bold transition-all", _ctx.guide.sheetId === sheet.id ? 'border-arancione bg-arancione/10 text-antracite' : 'border-gray-200 text-gray-600'])
                            }, _toDisplayString(sheet.name), 11 /* TEXT, CLASS, PROPS */, _hoisted_1384))
                          }), 128 /* KEYED_FRAGMENT */)),
                          _createElementVNode("button", {
                            onClick: _cache[310] || (_cache[310] = $event => (_ctx.guide.sheetId = 'new')),
                            class: _normalizeClass(["w-full text-left px-4 py-3 rounded-2xl border text-sm font-bold transition-all", _ctx.guide.sheetId === 'new' ? 'border-arancione bg-arancione/10 text-antracite' : 'border-gray-200 text-gray-600'])
                          }, "＋ Nuova scheda", 2 /* CLASS */)
                        ]),
                        (_ctx.guide.sheetId === 'new')
                          ? (_openBlock(), _createElementBlock("div", _hoisted_1385, [
                              _cache[884] || (_cache[884] = _createElementVNode("label", { class: "block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Nome della scheda", -1 /* CACHED */)),
                              _withDirectives(_createElementVNode("input", {
                                type: "text",
                                "onUpdate:modelValue": _cache[311] || (_cache[311] = $event => ((_ctx.guide.newName) = $event)),
                                class: "w-full bg-gray-50 border border-gray-200 focus:border-arancione rounded-xl p-3 text-sm font-bold text-antracite outline-none"
                              }, null, 512 /* NEED_PATCH */), [
                                [_vModelText, _ctx.guide.newName]
                              ])
                            ]))
                          : (_ctx.guidePickerSheet)
                            ? (_openBlock(), _createElementBlock("div", _hoisted_1386, [
                                _cache[885] || (_cache[885] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, "In quale giorno?", -1 /* CACHED */)),
                                _createElementVNode("div", _hoisted_1387, [
                                  (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.guidePickerSheet.days, (day, i) => {
                                    return (_openBlock(), _createElementBlock("button", {
                                      key: 'gpd' + i,
                                      onClick: $event => (_ctx.guide.dayIdx = i),
                                      class: _normalizeClass(["px-3 py-1.5 rounded-full text-xs font-bold border transition-all", _ctx.guide.dayIdx === i ? 'bg-antracite text-white border-antracite' : 'bg-white text-gray-500 border-gray-200'])
                                    }, _toDisplayString(day.name), 11 /* TEXT, CLASS, PROPS */, _hoisted_1388))
                                  }), 128 /* KEYED_FRAGMENT */)),
                                  _createElementVNode("button", {
                                    onClick: _cache[312] || (_cache[312] = $event => (_ctx.guide.dayIdx = 'new')),
                                    class: _normalizeClass(["px-3 py-1.5 rounded-full text-xs font-bold border transition-all", _ctx.guide.dayIdx === 'new' ? 'bg-antracite text-white border-antracite' : 'bg-white text-gray-500 border-gray-200'])
                                  }, "＋ Nuovo giorno", 2 /* CLASS */)
                                ])
                              ]))
                            : _createCommentVNode("v-if", true),
                        _createElementVNode("button", {
                          onClick: _cache[313] || (_cache[313] = (...args) => (_ctx.confirmGuideAdd && _ctx.confirmGuideAdd(...args))),
                          class: "w-full bg-arancione text-white font-extrabold py-4 rounded-2xl shadow-lg active:scale-95 transition-all"
                        }, "Aggiungi")
                      ])
                    ]))
                  : _createCommentVNode("v-if", true)
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.petModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", {
                key: 33,
                class: "fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-antracite/40 backdrop-blur-sm animate-fadeIn",
                onClick: _cache[318] || (_cache[318] = _withModifiers($event => (_ctx.petModal.isOpen = false), ["self"]))
              }, [
                _createElementVNode("div", _hoisted_1389, [
                  _createElementVNode("div", {
                    class: "relative px-6 pt-6 pb-5 text-center",
                    style: _normalizeStyle({ background: 'linear-gradient(160deg, ' + _ctx.petState.color + '33, transparent 75%)' })
                  }, [
                    _createElementVNode("button", {
                      onClick: _cache[315] || (_cache[315] = $event => (_ctx.petModal.isOpen = false)),
                      class: "absolute top-4 right-4 w-8 h-8 rounded-full bg-white/70 text-gray-500 flex items-center justify-center text-lg font-bold"
                    }, "×"),
                    _createElementVNode("button", {
                      onClick: _cache[316] || (_cache[316] = (...args) => (_ctx.petDance && _ctx.petDance(...args))),
                      class: "block w-36 h-36 mx-auto",
                      "aria-label": "Fai ballare il compagno"
                    }, [
                      _createElementVNode("div", {
                        ref: "petMainBox",
                        class: _normalizeClass(["w-full h-full", _ctx.petDanceClass || ('pet-bob' + (_ctx.petState.mood === 'sleepy' ? ' pet-sleep' : ''))]),
                        innerHTML: _ctx.petMainSvg
                      }, null, 10 /* CLASS, PROPS */, _hoisted_1390)
                    ]),
                    _createElementVNode("p", _hoisted_1391, [
                      _createTextVNode(_toDisplayString(_ctx.petState.speciesName), 1 /* TEXT */),
                      (_ctx.petState.legendary)
                        ? (_openBlock(), _createElementBlock("span", _hoisted_1392, " · leggendario ✨"))
                        : _createCommentVNode("v-if", true)
                    ]),
                    _createElementVNode("h3", _hoisted_1393, _toDisplayString(_ctx.petState.name), 1 /* TEXT */),
                    _createElementVNode("p", _hoisted_1394, [
                      (_ctx.petState.stage === 0)
                        ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                            _createTextVNode("Fai qualcosa oggi (un allenamento o un pasto) e l'uovo si schiude. Chissà chi c'è dentro…")
                          ], 64 /* STABLE_FRAGMENT */))
                        : (_ctx.petState.nextIn)
                          ? (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                              _createTextVNode("Ancora " + _toDisplayString(_ctx.petState.nextIn) + " " + _toDisplayString(_ctx.petState.nextIn === 1 ? 'giorno' : 'giorni') + " di fila e diventa ", 1 /* TEXT */),
                              _createElementVNode("b", null, _toDisplayString(_ctx.petState.nextName), 1 /* TEXT */)
                            ], 64 /* STABLE_FRAGMENT */))
                          : (_openBlock(), _createElementBlock(_Fragment, { key: 2 }, [
                              _createTextVNode("Forma finale raggiunta. Che spettacolo! 🌈")
                            ], 64 /* STABLE_FRAGMENT */))
                    ]),
                    (_ctx.petState.nextIn)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_1395, [
                          _createElementVNode("div", {
                            class: "h-full rounded-full transition-all",
                            style: _normalizeStyle({ width: _ctx.petState.progress + '%', background: _ctx.petState.color })
                          }, null, 4 /* STYLE */)
                        ]))
                      : _createCommentVNode("v-if", true),
                    (_ctx.petState.mood === 'worried')
                      ? (_openBlock(), _createElementBlock("p", _hoisted_1396, "Ha un po' di ansia: oggi non hai ancora fatto niente 😬"))
                      : (_openBlock(), _createElementBlock("p", _hoisted_1397, "Toccalo per farlo ballare 💃"))
                  ], 4 /* STYLE */),
                  _createElementVNode("div", _hoisted_1398, [
                    _createElementVNode("div", null, [
                      _cache[886] || (_cache[886] = _createElementVNode("h4", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Evoluzioni", -1 /* CACHED */)),
                      _createElementVNode("div", _hoisted_1399, [
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.petEvolutionPath, (e) => {
                          return (_openBlock(), _createElementBlock("div", {
                            key: 'pe' + e.stage,
                            class: "shrink-0 w-[72px] text-center"
                          }, [
                            _createElementVNode("div", {
                              class: _normalizeClass(["w-[72px] h-[72px] rounded-2xl p-1 border-2", e.current ? 'border-arancione bg-arancione/10' : (e.reached ? 'border-transparent bg-gray-50' : 'border-transparent bg-gray-100')]),
                              innerHTML: e.svg
                            }, null, 10 /* CLASS, PROPS */, _hoisted_1400),
                            _createElementVNode("div", {
                              class: _normalizeClass(["text-[9px] font-extrabold mt-1 leading-tight", e.reached ? 'text-antracite' : 'text-gray-400'])
                            }, _toDisplayString(e.name), 3 /* TEXT, CLASS */),
                            _createElementVNode("div", _hoisted_1401, _toDisplayString(e.days === 0 ? 'inizio' : e.days + (e.days === 1 ? ' giorno' : ' gg')), 1 /* TEXT */)
                          ]))
                        }), 128 /* KEYED_FRAGMENT */))
                      ])
                    ]),
                    _createElementVNode("div", null, [
                      _cache[887] || (_cache[887] = _createElementVNode("h4", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Guardaroba", -1 /* CACHED */)),
                      _createElementVNode("div", _hoisted_1402, [
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.PET_SLOTS, (slot) => {
                          return (_openBlock(), _createElementBlock("button", {
                            key: 'ps' + slot.id,
                            onClick: $event => (_ctx.petModal.tab = slot.id),
                            class: _normalizeClass(["flex-1 py-2 rounded-xl text-xs font-extrabold transition-colors", _ctx.petModal.tab === slot.id ? 'bg-antracite text-white' : 'bg-gray-100 text-gray-500'])
                          }, _toDisplayString(slot.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_1403))
                        }), 128 /* KEYED_FRAGMENT */))
                      ]),
                      _createElementVNode("div", _hoisted_1404, [
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.petItems.filter(i => i.slot === _ctx.petModal.tab), (item) => {
                          return (_openBlock(), _createElementBlock("button", {
                            key: 'pi' + item.id,
                            onClick: $event => (_ctx.togglePetItem(item)),
                            class: _normalizeClass(["relative rounded-2xl p-1 border-2 text-center active:scale-95 transition-transform", item.worn ? 'border-arancione bg-arancione/10' : 'border-transparent bg-gray-50'])
                          }, [
                            _createElementVNode("div", {
                              class: _normalizeClass(["w-full aspect-square", item.unlocked ? '' : 'opacity-30 grayscale']),
                              innerHTML: _ctx.petItemPreview(item)
                            }, null, 10 /* CLASS, PROPS */, _hoisted_1406),
                            _createElementVNode("div", {
                              class: _normalizeClass(["text-[9px] font-extrabold leading-tight pb-1", item.unlocked ? 'text-antracite' : 'text-gray-400'])
                            }, _toDisplayString(item.name), 3 /* TEXT, CLASS */),
                            (!item.unlocked)
                              ? (_openBlock(), _createElementBlock("div", _hoisted_1407, "🔒 " + _toDisplayString(item.unlock) + "g", 1 /* TEXT */))
                              : _createCommentVNode("v-if", true)
                          ], 10 /* CLASS, PROPS */, _hoisted_1405))
                        }), 128 /* KEYED_FRAGMENT */))
                      ]),
                      _cache[888] || (_cache[888] = _createElementVNode("p", { class: "text-[10px] font-medium text-gray-400 mt-2" }, "I vestiti si sbloccano con la tua serie migliore e restano tuoi per sempre.", -1 /* CACHED */))
                    ]),
                    _createElementVNode("div", null, [
                      _createElementVNode("h4", _hoisted_1408, "Album dei compagni · " + _toDisplayString(_ctx.petAlbumFound) + " su " + _toDisplayString(_ctx.petAlbum.length), 1 /* TEXT */),
                      _createElementVNode("div", _hoisted_1409, [
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.petAlbum, (a) => {
                          return (_openBlock(), _createElementBlock("div", {
                            key: 'pa' + a.id,
                            class: "text-center relative"
                          }, [
                            _createElementVNode("div", {
                              class: _normalizeClass(["w-full aspect-square rounded-2xl bg-gray-50 p-1", a.locked ? 'opacity-60' : '']),
                              innerHTML: a.svg
                            }, null, 10 /* CLASS, PROPS */, _hoisted_1410),
                            (a.locked)
                              ? (_openBlock(), _createElementBlock("div", _hoisted_1411, "🔒"))
                              : _createCommentVNode("v-if", true),
                            _createElementVNode("div", {
                              class: _normalizeClass(["text-[9px] font-extrabold mt-1", a.max ? 'text-antracite' : 'text-gray-400'])
                            }, _toDisplayString(a.name), 3 /* TEXT, CLASS */)
                          ]))
                        }), 128 /* KEYED_FRAGMENT */))
                      ]),
                      _cache[889] || (_cache[889] = _createElementVNode("p", { class: "text-[10px] font-medium text-gray-400 mt-2" }, "Ogni nuova serie fa nascere un compagno a sorpresa. Porta un compagno alla forma finale (60 giorni di fila) e ne sblocchi uno nuovo.", -1 /* CACHED */))
                    ]),
                    (_ctx.petState.stage > 0)
                      ? (_openBlock(), _createElementBlock("button", {
                          key: 0,
                          onClick: _cache[317] || (_cache[317] = (...args) => (_ctx.sharePet && _ctx.sharePet(...args))),
                          class: "w-full bg-gradient-to-r from-salvia via-arancione to-viola text-white font-bold py-3.5 rounded-xl active:scale-95 transition-all text-sm flex items-center justify-center gap-2 shadow-sm"
                        }, [...(_cache[890] || (_cache[890] = [
                          _createElementVNode("svg", {
                            class: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            "stroke-width": "2.5"
                          }, [
                            _createElementVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4-4 4M12 2v13"
                            })
                          ], -1 /* CACHED */),
                          _createTextVNode(" Mostralo nelle storie ", -1 /* CACHED */)
                        ]))]))
                      : _createCommentVNode("v-if", true)
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.petUnlockModal.isOpen && !_ctx.petEvolveModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", {
                key: 34,
                class: "fixed inset-0 z-[68] flex items-center justify-center p-4 bg-antracite/50 backdrop-blur-sm animate-fadeIn",
                onClick: _cache[320] || (_cache[320] = _withModifiers($event => (_ctx.petUnlockModal.isOpen = false), ["self"]))
              }, [
                _createElementVNode("div", _hoisted_1412, [
                  _createElementVNode("div", {
                    class: "px-6 pt-8 pb-5",
                    style: _normalizeStyle({ background: 'radial-gradient(circle at 50% 45%, ' + _ctx.PET_SPECIES[_ctx.petUnlockModal.species].color + '55, transparent 70%)' })
                  }, [
                    _createElementVNode("div", {
                      class: "pet-pop w-36 h-36 mx-auto",
                      innerHTML: _ctx.petUnlockSvg
                    }, null, 8 /* PROPS */, _hoisted_1413),
                    _cache[891] || (_cache[891] = _createElementVNode("p", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2" }, "Nuovo compagno sbloccato!", -1 /* CACHED */)),
                    _createElementVNode("h3", _hoisted_1414, _toDisplayString(_ctx.PET_SPECIES[_ctx.petUnlockModal.species].name), 1 /* TEXT */),
                    _createElementVNode("p", _hoisted_1415, "Hai portato " + _toDisplayString(_ctx.petState.speciesName) + " alla forma finale. Da ora " + _toDisplayString(_ctx.PET_SPECIES[_ctx.petUnlockModal.species].name) + " può uscire dalle tue prossime uova.", 1 /* TEXT */)
                  ], 4 /* STYLE */),
                  _createElementVNode("div", _hoisted_1416, [
                    _createElementVNode("button", {
                      onClick: _cache[319] || (_cache[319] = $event => (_ctx.petUnlockModal.isOpen = false)),
                      class: "w-full bg-gradient-to-r from-salvia via-arancione to-viola text-white font-bold py-3.5 rounded-xl active:scale-95 transition-all text-sm shadow-sm"
                    }, "Fantastico!")
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.petEvolveModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", {
                key: 35,
                class: "fixed inset-0 z-[68] flex items-center justify-center p-4 bg-antracite/50 backdrop-blur-sm animate-fadeIn",
                onClick: _cache[323] || (_cache[323] = _withModifiers($event => (_ctx.petEvolveModal.isOpen = false), ["self"]))
              }, [
                _createElementVNode("div", _hoisted_1417, [
                  _createElementVNode("div", {
                    class: "px-6 pt-8 pb-5 pet-glow",
                    style: _normalizeStyle({ background: 'radial-gradient(circle at 50% 45%, ' + _ctx.petState.color + '55, transparent 70%)' })
                  }, [
                    _createElementVNode("div", {
                      class: "pet-pop w-40 h-40 mx-auto",
                      innerHTML: _ctx.petMainSvg
                    }, null, 8 /* PROPS */, _hoisted_1418),
                    _createElementVNode("p", _hoisted_1419, _toDisplayString(_ctx.petEvolveModal.hatched ? 'L\'uovo si è schiuso!' : 'Evoluzione!'), 1 /* TEXT */),
                    _createElementVNode("h3", _hoisted_1420, _toDisplayString(_ctx.petEvolveModal.hatched ? 'È nato ' + _ctx.petState.name : 'È diventato ' + _ctx.petState.name), 1 /* TEXT */),
                    _createElementVNode("p", _hoisted_1421, [
                      _createTextVNode(_toDisplayString(_ctx.streakInfo.current) + " " + _toDisplayString(_ctx.streakInfo.current === 1 ? 'giorno' : 'giorni') + " di fila", 1 /* TEXT */),
                      (_ctx.petState.nextIn)
                        ? (_openBlock(), _createElementBlock("span", _hoisted_1422, ". Prossima forma tra " + _toDisplayString(_ctx.petState.nextIn) + " " + _toDisplayString(_ctx.petState.nextIn === 1 ? 'giorno' : 'giorni'), 1 /* TEXT */))
                        : _createCommentVNode("v-if", true),
                      _cache[892] || (_cache[892] = _createTextVNode(".", -1 /* CACHED */))
                    ])
                  ], 4 /* STYLE */),
                  _createElementVNode("div", _hoisted_1423, [
                    _createElementVNode("button", {
                      onClick: _cache[321] || (_cache[321] = (...args) => (_ctx.sharePetEvolution && _ctx.sharePetEvolution(...args))),
                      class: "w-full bg-gradient-to-r from-salvia via-arancione to-viola text-white font-bold py-3.5 rounded-xl active:scale-95 transition-all text-sm shadow-sm"
                    }, "Condividi l'evoluzione"),
                    _createElementVNode("button", {
                      onClick: _cache[322] || (_cache[322] = $event => (_ctx.petEvolveModal.isOpen = false)),
                      class: "w-full bg-gray-100 text-gray-600 font-bold py-3 rounded-xl active:scale-95 transition-all text-sm"
                    }, "Evvai!")
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.welcomeModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_1424, [
                _createElementVNode("div", _hoisted_1425, [
                  _createElementVNode("div", _hoisted_1426, [
                    _cache[893] || (_cache[893] = _createElementVNode("div", { class: "w-20 h-20 mx-auto rounded-full bg-white shadow-soft flex items-center justify-center text-4xl border-4 border-salvia/30" }, "🌱", -1 /* CACHED */)),
                    _cache[894] || (_cache[894] = _createElementVNode("p", { class: "mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "Giorno 1", -1 /* CACHED */)),
                    _createElementVNode("h3", _hoisted_1427, "Ciao " + _toDisplayString(_ctx.profile && _ctx.profile.firstName) + ", il tuo percorso inizia oggi", 1 /* TEXT */)
                  ]),
                  _createElementVNode("div", _hoisted_1428, [
                    _cache[896] || (_cache[896] = _createElementVNode("p", { class: "text-sm text-gray-500 font-medium leading-relaxed text-center" }, " Ti diamo il benvenuto su STILL. Non serve essere perfetti, serve esserci: un allenamento, un pasto, un giorno alla volta. ", -1 /* CACHED */)),
                    _cache[897] || (_cache[897] = _createElementVNode("p", { class: "text-sm text-antracite font-bold text-center" }, "Rendilo ufficiale: condividi l'inizio nelle tue storie e fatti tenere d'occhio da chi ti segue.", -1 /* CACHED */)),
                    _createElementVNode("button", {
                      onClick: _cache[324] || (_cache[324] = (...args) => (_ctx.shareWelcome && _ctx.shareWelcome(...args))),
                      class: "w-full bg-gradient-to-r from-salvia via-arancione to-viola text-white font-bold py-3.5 rounded-xl active:scale-95 transition-all text-sm flex items-center justify-center gap-2 shadow-sm"
                    }, [...(_cache[895] || (_cache[895] = [
                      _createElementVNode("svg", {
                        class: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2.5"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4-4 4M12 2v13"
                        })
                      ], -1 /* CACHED */),
                      _createTextVNode(" Condividi nelle storie ", -1 /* CACHED */)
                    ]))]),
                    _createElementVNode("button", {
                      onClick: _cache[325] || (_cache[325] = (...args) => (_ctx.closeWelcome && _ctx.closeWelcome(...args))),
                      class: "w-full bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 active:scale-95 transition-all text-sm"
                    }, "Inizia subito")
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.resumeModal.isOpen && _ctx.resumeInfo)
            ? (_openBlock(), _createElementBlock("div", _hoisted_1429, [
                _createElementVNode("div", _hoisted_1430, [
                  _createElementVNode("div", _hoisted_1431, [
                    _cache[899] || (_cache[899] = _createElementVNode("div", { class: "w-11 h-11 rounded-xl bg-arancione/10 flex items-center justify-center text-xl border border-arancione/20 flex-shrink-0" }, "⏸️", -1 /* CACHED */)),
                    _createElementVNode("div", _hoisted_1432, [
                      _cache[898] || (_cache[898] = _createElementVNode("h3", { class: "text-lg font-bold text-antracite leading-tight" }, "Allenamento in corso", -1 /* CACHED */)),
                      _createElementVNode("p", _hoisted_1433, _toDisplayString(_ctx.resumeInfo.title), 1 /* TEXT */)
                    ])
                  ]),
                  _createElementVNode("p", _hoisted_1434, [
                    _createTextVNode(" Hai lasciato un allenamento a metà, iniziato " + _toDisplayString(_ctx.resumeInfo.when) + ". Hai completato ", 1 /* TEXT */),
                    _createElementVNode("b", _hoisted_1435, _toDisplayString(_ctx.resumeInfo.done) + " serie su " + _toDisplayString(_ctx.resumeInfo.total), 1 /* TEXT */),
                    _cache[900] || (_cache[900] = _createTextVNode(". ", -1 /* CACHED */))
                  ]),
                  _createElementVNode("div", _hoisted_1436, [
                    _createElementVNode("button", {
                      onClick: _cache[326] || (_cache[326] = (...args) => (_ctx.discardSavedWorkout && _ctx.discardSavedWorkout(...args))),
                      class: "flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 active:scale-95 transition-all text-sm"
                    }, "Termina qui"),
                    _createElementVNode("button", {
                      onClick: _cache[327] || (_cache[327] = (...args) => (_ctx.resumeSavedWorkout && _ctx.resumeSavedWorkout(...args))),
                      class: "flex-[1.4] bg-arancione text-white font-bold py-3 rounded-xl hover:bg-arancione/90 active:scale-95 transition-all text-sm flex items-center justify-center gap-1.5"
                    }, [...(_cache[901] || (_cache[901] = [
                      _createElementVNode("svg", {
                        class: "w-4 h-4",
                        fill: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        _createElementVNode("path", { d: "M8 5v14l11-7z" })
                      ], -1 /* CACHED */),
                      _createTextVNode(" Riprendi ", -1 /* CACHED */)
                    ]))])
                  ]),
                  _cache[902] || (_cache[902] = _createElementVNode("p", { class: "text-[10px] font-medium text-gray-400 text-center" }, "\"Termina qui\" salva le statistiche delle serie già fatte.", -1 /* CACHED */))
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.sessionStatsModal.isOpen && _ctx.sessionStats)
            ? (_openBlock(), _createElementBlock("div", _hoisted_1437, [
                _createElementVNode("div", _hoisted_1438, [
                  _createElementVNode("div", _hoisted_1439, [
                    _createElementVNode("div", _hoisted_1440, [
                      _cache[903] || (_cache[903] = _createElementVNode("div", { class: "w-10 h-10 rounded-xl bg-arancione/10 flex items-center justify-center text-xl border border-arancione/20 flex-shrink-0" }, "📊", -1 /* CACHED */)),
                      _createElementVNode("div", _hoisted_1441, [
                        _createElementVNode("h3", _hoisted_1442, _toDisplayString(_ctx.sessionStats.session.sheetName || 'Allenamento'), 1 /* TEXT */),
                        _createElementVNode("p", _hoisted_1443, _toDisplayString(_ctx.sessionStats.session.dayName ? _ctx.sessionStats.session.dayName + ' · ' : '') + _toDisplayString(_ctx.sessionStats.dateLabel), 1 /* TEXT */)
                      ])
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[328] || (_cache[328] = (...args) => (_ctx.closeSessionStats && _ctx.closeSessionStats(...args))),
                      class: "p-1 text-gray-400 hover:text-antracite flex-shrink-0",
                      "aria-label": "Chiudi"
                    }, [...(_cache[904] || (_cache[904] = [
                      _createElementVNode("svg", {
                        class: "w-6 h-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  _createElementVNode("div", _hoisted_1444, [
                    _createElementVNode("div", _hoisted_1445, [
                      (_ctx.sessionStats.status === 'completed')
                        ? (_openBlock(), _createElementBlock("span", _hoisted_1446, "✓ Completato"))
                        : (_ctx.sessionStats.status === 'stopped')
                          ? (_openBlock(), _createElementBlock("span", _hoisted_1447, "Interrotto"))
                          : (_ctx.sessionStats.status === 'logs')
                            ? (_openBlock(), _createElementBlock("span", _hoisted_1448, "Pesi registrati"))
                            : (_ctx.sessionStats.status === 'planned')
                              ? (_openBlock(), _createElementBlock("span", _hoisted_1449, "In programma"))
                              : (_openBlock(), _createElementBlock("span", _hoisted_1450, "Nessun dato")),
                      (_ctx.sessionStats.session.time)
                        ? (_openBlock(), _createElementBlock("span", _hoisted_1451, "ore " + _toDisplayString(_ctx.sessionTimeLabel(_ctx.sessionStats.session)), 1 /* TEXT */))
                        : _createCommentVNode("v-if", true)
                    ]),
                    (!_ctx.sessionStats.exercises.length)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_1452, [
                          (_ctx.sessionStats.status === 'planned')
                            ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                _createTextVNode("Questo allenamento non è ancora stato svolto. Le statistiche compariranno qui dopo la sessione guidata.")
                              ], 64 /* STABLE_FRAGMENT */))
                            : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                                _createTextVNode("Nessuna statistica per questo allenamento. Avvia la sessione guidata dalla scheda per registrare tempi, serie e pesi.")
                              ], 64 /* STABLE_FRAGMENT */))
                        ]))
                      : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                          (_ctx.sessionStats.totalSeconds !== undefined)
                            ? (_openBlock(), _createElementBlock("div", _hoisted_1453, [
                                _createElementVNode("div", _hoisted_1454, [
                                  _cache[905] || (_cache[905] = _createElementVNode("div", { class: "text-[9px] font-bold text-gray-400 uppercase tracking-widest" }, "Durata", -1 /* CACHED */)),
                                  _createElementVNode("div", _hoisted_1455, _toDisplayString(_ctx.formatClock(_ctx.sessionStats.totalSeconds)), 1 /* TEXT */)
                                ]),
                                _createElementVNode("div", _hoisted_1456, [
                                  _cache[906] || (_cache[906] = _createElementVNode("div", { class: "text-[9px] font-bold text-gray-400 uppercase tracking-widest" }, "Sotto sforzo", -1 /* CACHED */)),
                                  _createElementVNode("div", _hoisted_1457, _toDisplayString(_ctx.formatClock(_ctx.sessionStats.workSeconds)), 1 /* TEXT */)
                                ]),
                                _createElementVNode("div", _hoisted_1458, [
                                  _cache[907] || (_cache[907] = _createElementVNode("div", { class: "text-[9px] font-bold text-gray-400 uppercase tracking-widest" }, "Serie", -1 /* CACHED */)),
                                  _createElementVNode("div", _hoisted_1459, [
                                    _createTextVNode(_toDisplayString(_ctx.sessionStats.sets), 1 /* TEXT */),
                                    _createElementVNode("span", _hoisted_1460, "/" + _toDisplayString(_ctx.sessionStats.setsPlanned), 1 /* TEXT */)
                                  ])
                                ]),
                                _createElementVNode("div", _hoisted_1461, [
                                  _createElementVNode("div", _hoisted_1462, _toDisplayString(_ctx.sessionStats.volume ? 'Volume' : 'Esercizi'), 1 /* TEXT */),
                                  _createElementVNode("div", _hoisted_1463, [
                                    (_ctx.sessionStats.volume)
                                      ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                          _createTextVNode(_toDisplayString(_ctx.formatNumber(_ctx.sessionStats.volume)), 1 /* TEXT */),
                                          _cache[908] || (_cache[908] = _createElementVNode("span", { class: "text-sm text-gray-400" }, " kg", -1 /* CACHED */))
                                        ], 64 /* STABLE_FRAGMENT */))
                                      : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                                          _createTextVNode(_toDisplayString(_ctx.sessionStats.exercises.length), 1 /* TEXT */)
                                        ], 64 /* STABLE_FRAGMENT */))
                                  ])
                                ])
                              ]))
                            : _createCommentVNode("v-if", true),
                          (_ctx.statsImproved > 0)
                            ? (_openBlock(), _createElementBlock("div", _hoisted_1464, " 📈 Hai aumentato il carico in " + _toDisplayString(_ctx.statsImproved) + " " + _toDisplayString(_ctx.statsImproved === 1 ? 'esercizio' : 'esercizi') + " rispetto alla volta precedente. ", 1 /* TEXT */))
                            : _createCommentVNode("v-if", true),
                          _createElementVNode("div", _hoisted_1465, [
                            _cache[911] || (_cache[911] = _createElementVNode("h4", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1" }, "Esercizi", -1 /* CACHED */)),
                            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.sessionStats.exercises, (ex) => {
                              return (_openBlock(), _createElementBlock("div", {
                                key: 'st-' + ex.id,
                                class: "bg-gray-50 border border-gray-100 rounded-2xl p-3.5 space-y-2"
                              }, [
                                _createElementVNode("div", _hoisted_1466, [
                                  _createElementVNode("div", _hoisted_1467, [
                                    _createElementVNode("div", _hoisted_1468, [
                                      _createElementVNode("span", _hoisted_1469, _toDisplayString(ex.name), 1 /* TEXT */),
                                      _createElementVNode("span", {
                                        class: _normalizeClass(["text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md", ex.type === 'cardio' ? 'bg-sky-500/10 text-sky-600' : 'bg-arancione/10 text-arancione'])
                                      }, _toDisplayString(ex.type === 'cardio' ? 'Cardio' : (ex.pyramid ? 'Piramidale' : 'Forza')), 3 /* TEXT, CLASS */),
                                      (ex.superset)
                                        ? (_openBlock(), _createElementBlock("span", _hoisted_1470, "SS"))
                                        : _createCommentVNode("v-if", true)
                                    ]),
                                    (ex.setsPlanned)
                                      ? (_openBlock(), _createElementBlock("p", _hoisted_1471, [
                                          _createTextVNode(_toDisplayString(ex.setsDone) + "/" + _toDisplayString(ex.setsPlanned) + " " + _toDisplayString(ex.type === 'cardio' ? 'completato' : 'serie'), 1 /* TEXT */),
                                          (_ctx.statsRepsLabel(ex))
                                            ? (_openBlock(), _createElementBlock("span", _hoisted_1472, " • " + _toDisplayString(_ctx.statsRepsLabel(ex)) + " rip.", 1 /* TEXT */))
                                            : _createCommentVNode("v-if", true),
                                          (ex.type === 'cardio' && ex.intensity)
                                            ? (_openBlock(), _createElementBlock("span", _hoisted_1473, " • " + _toDisplayString(ex.intensity), 1 /* TEXT */))
                                            : _createCommentVNode("v-if", true)
                                        ]))
                                      : (ex.type === 'cardio' && ex.intensity)
                                        ? (_openBlock(), _createElementBlock("p", _hoisted_1474, _toDisplayString(ex.intensity), 1 /* TEXT */))
                                        : _createCommentVNode("v-if", true)
                                  ]),
                                  (ex.setsPlanned && ex.setsDone < ex.setsPlanned)
                                    ? (_openBlock(), _createElementBlock("span", _hoisted_1475, "incompleto"))
                                    : _createCommentVNode("v-if", true)
                                ]),
                                _createElementVNode("div", _hoisted_1476, [
                                  _createElementVNode("div", _hoisted_1477, [
                                    (!ex.firstTime && _ctx.statsDelta(ex) !== null && _ctx.statsDelta(ex) !== 0)
                                      ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                          _createElementVNode("span", _hoisted_1478, _toDisplayString(_ctx.formatNumber(ex.startValue)), 1 /* TEXT */),
                                          _cache[909] || (_cache[909] = _createElementVNode("span", { class: "text-[10px] text-gray-400" }, "→", -1 /* CACHED */))
                                        ], 64 /* STABLE_FRAGMENT */))
                                      : _createCommentVNode("v-if", true),
                                    _createElementVNode("span", {
                                      class: _normalizeClass(["text-base font-extrabold", ex.type === 'cardio' ? 'text-sky-600' : 'text-arancione'])
                                    }, _toDisplayString(ex.endValue !== null && ex.endValue !== undefined ? _ctx.formatNumber(ex.endValue) : '—') + " " + _toDisplayString(ex.unit), 3 /* TEXT, CLASS */)
                                  ]),
                                  (ex.firstTime)
                                    ? (_openBlock(), _createElementBlock("span", _hoisted_1479, "prima volta"))
                                    : (_ctx.statsDelta(ex) !== null)
                                      ? (_openBlock(), _createElementBlock("span", {
                                          key: 1,
                                          class: _normalizeClass(["text-[10px] font-black px-2 py-0.5 rounded-md flex-shrink-0", _ctx.statsDelta(ex) > 0 ? 'bg-salvia/10 text-salvia' : (_ctx.statsDelta(ex) < 0 ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-400')])
                                        }, _toDisplayString(_ctx.statsDelta(ex) > 0 ? '+' : '') + _toDisplayString(_ctx.statsDelta(ex) === 0 ? 'invariato' : _ctx.formatNumber(_ctx.statsDelta(ex)) + ' ' + ex.unit), 3 /* TEXT, CLASS */))
                                      : (_openBlock(), _createElementBlock("span", _hoisted_1480, "prima volta"))
                                ]),
                                (ex.setsWeights && ex.setsWeights.length)
                                  ? (_openBlock(), _createElementBlock("p", _hoisted_1481, " Serie: " + _toDisplayString(ex.setsWeights.map(w => (w === null || w === undefined) ? '—' : _ctx.formatNumber(w)).join(' · ')) + " kg ", 1 /* TEXT */))
                                  : _createCommentVNode("v-if", true),
                                (_ctx.statsBaseDelta(ex) !== null && _ctx.statsBaseDelta(ex) !== 0)
                                  ? (_openBlock(), _createElementBlock("p", _hoisted_1482, [
                                      _cache[910] || (_cache[910] = _createTextVNode(" Dalla partenza della scheda: ", -1 /* CACHED */)),
                                      _createElementVNode("span", {
                                        class: _normalizeClass(["font-bold", _ctx.statsBaseDelta(ex) > 0 ? 'text-salvia' : 'text-red-500'])
                                      }, _toDisplayString(_ctx.statsBaseDelta(ex) > 0 ? '+' : '') + _toDisplayString(_ctx.formatNumber(_ctx.statsBaseDelta(ex))) + " " + _toDisplayString(ex.unit), 3 /* TEXT, CLASS */)
                                    ]))
                                  : _createCommentVNode("v-if", true),
                                (ex.setDurations && ex.setDurations.length)
                                  ? (_openBlock(), _createElementBlock("p", _hoisted_1483, [
                                      _createTextVNode(" ⏱️ " + _toDisplayString(ex.type === 'cardio' ? 'Tempo' : 'Tempo medio serie') + " ", 1 /* TEXT */),
                                      _createElementVNode("span", _hoisted_1484, _toDisplayString(_ctx.formatClock(_ctx.statsAvgSet(ex))), 1 /* TEXT */),
                                      (ex.setDurations.length > 1)
                                        ? (_openBlock(), _createElementBlock("span", _hoisted_1485, " (" + _toDisplayString(ex.setDurations.map(sec => _ctx.formatClock(sec)).join(' · ')) + ")", 1 /* TEXT */))
                                        : _createCommentVNode("v-if", true)
                                    ]))
                                  : _createCommentVNode("v-if", true)
                              ]))
                            }), 128 /* KEYED_FRAGMENT */))
                          ]),
                          (_ctx.sessionStats.status === 'logs')
                            ? (_openBlock(), _createElementBlock("p", _hoisted_1486, "Questo allenamento è stato registrato prima della sessione guidata: sono disponibili solo i pesi."))
                            : _createCommentVNode("v-if", true)
                        ], 64 /* STABLE_FRAGMENT */))
                  ]),
                  _createElementVNode("div", _hoisted_1487, [
                    _createElementVNode("button", {
                      onClick: _cache[329] || (_cache[329] = (...args) => (_ctx.openSheetFromStats && _ctx.openSheetFromStats(...args))),
                      class: "flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 active:scale-95 transition-all text-sm"
                    }, "Apri scheda"),
                    (_ctx.sessionStats.session.report && _ctx.sessionStats.session.date === _ctx.sessionStats.dateKey)
                      ? (_openBlock(), _createElementBlock("button", {
                          key: 0,
                          onClick: _cache[330] || (_cache[330] = $event => (_ctx.openShareStudio('workout', _ctx.sessionStats.session.id))),
                          class: "w-12 flex-shrink-0 cangiante-btn text-white rounded-xl active:scale-95 transition-all flex items-center justify-center",
                          "aria-label": "Condividi allenamento"
                        }, [...(_cache[912] || (_cache[912] = [
                          _createElementVNode("svg", {
                            class: "w-5 h-5",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            "stroke-width": "2.2"
                          }, [
                            _createElementVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                            })
                          ], -1 /* CACHED */)
                        ]))]))
                      : _createCommentVNode("v-if", true),
                    _createElementVNode("button", {
                      onClick: _cache[331] || (_cache[331] = (...args) => (_ctx.closeSessionStats && _ctx.closeSessionStats(...args))),
                      class: "flex-1 bg-arancione text-white font-bold py-3 rounded-xl hover:bg-arancione/90 active:scale-95 transition-all text-sm"
                    }, "Chiudi")
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.trainingDayModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_1488, [
                _createElementVNode("div", _hoisted_1489, [
                  _createElementVNode("div", _hoisted_1490, [
                    _createElementVNode("div", _hoisted_1491, [
                      _cache[914] || (_cache[914] = _createElementVNode("div", { class: "w-10 h-10 rounded-xl bg-arancione/10 flex items-center justify-center text-arancione border border-arancione/20 flex-shrink-0" }, [
                        _createElementVNode("svg", {
                          class: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2"
                        }, [
                          _createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
                          })
                        ])
                      ], -1 /* CACHED */)),
                      _createElementVNode("div", _hoisted_1492, [
                        _cache[913] || (_cache[913] = _createElementVNode("h3", { class: "text-lg font-bold text-antracite leading-tight" }, "Allenamenti", -1 /* CACHED */)),
                        _createElementVNode("p", _hoisted_1493, _toDisplayString(_ctx.trainingDayModal.dateLabel), 1 /* TEXT */)
                      ])
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[332] || (_cache[332] = (...args) => (_ctx.closeTrainingDay && _ctx.closeTrainingDay(...args))),
                      class: "p-1 text-gray-400 hover:text-antracite flex-shrink-0"
                    }, [...(_cache[915] || (_cache[915] = [
                      _createElementVNode("svg", {
                        class: "w-6 h-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  _createElementVNode("p", _hoisted_1494, _toDisplayString(_ctx.trainingDaySessions.length) + " " + _toDisplayString(_ctx.trainingDaySessions.length === 1 ? 'allenamento' : 'allenamenti'), 1 /* TEXT */),
                  (_ctx.trainingDaySessions.length === 0)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_1495, " Nessun allenamento in questo giorno. "))
                    : (_openBlock(), _createElementBlock("div", _hoisted_1496, [
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.trainingDaySessions, (session) => {
                          return (_openBlock(), _createElementBlock("div", {
                            key: session.id,
                            class: "flex items-center gap-2.5 rounded-2xl bg-gray-50 border border-gray-100 px-2.5 py-2"
                          }, [
                            _createElementVNode("div", {
                              class: _normalizeClass(["w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border", session.kind === 'gym' ? 'bg-arancione/10 text-arancione border-arancione/20' : 'bg-sky-500/10 text-sky-600 border-sky-200'])
                            }, [
                              (session.kind === 'gym')
                                ? (_openBlock(), _createElementBlock("svg", _hoisted_1497, [...(_cache[916] || (_cache[916] = [
                                    _createElementVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      d: "M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12"
                                    }, null, -1 /* CACHED */)
                                  ]))]))
                                : (_openBlock(), _createElementBlock("svg", _hoisted_1498, [...(_cache[917] || (_cache[917] = [
                                    _createElementVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      d: "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"
                                    }, null, -1 /* CACHED */)
                                  ]))]))
                            ], 2 /* CLASS */),
                            _createElementVNode("div", {
                              class: _normalizeClass(["min-w-0 flex-1", session.kind === 'gym' || _ctx.sportCanCheck(session, _ctx.trainingDayModal.dateKey) ? 'cursor-pointer' : '']),
                              onClick: $event => (_ctx.openTrainingSessionItem(session, _ctx.trainingDayModal.dateKey))
                            }, [
                              _createElementVNode("div", _hoisted_1500, _toDisplayString(_ctx.trainingSessionLabel(session)), 1 /* TEXT */),
                              _createElementVNode("div", _hoisted_1501, [
                                (session.time)
                                  ? (_openBlock(), _createElementBlock("span", _hoisted_1502, _toDisplayString(_ctx.sessionTimeLabel(session)) + " • ", 1 /* TEXT */))
                                  : _createCommentVNode("v-if", true),
                                _createTextVNode(_toDisplayString(_ctx.trainingSessionSubtitle(session)), 1 /* TEXT */),
                                (session.kind === 'gym' && session.report)
                                  ? (_openBlock(), _createElementBlock("span", _hoisted_1503, " • " + _toDisplayString(session.completed ? '✓ completato' : 'interrotto'), 1 /* TEXT */))
                                  : _createCommentVNode("v-if", true),
                                (_ctx.sportStatus(session, _ctx.trainingDayModal.dateKey) === 'done')
                                  ? (_openBlock(), _createElementBlock("span", _hoisted_1504, " • ✓ fatto"))
                                  : (_ctx.sportStatus(session, _ctx.trainingDayModal.dateKey) === 'skipped')
                                    ? (_openBlock(), _createElementBlock("span", _hoisted_1505, " • ✗ non fatto"))
                                    : (_ctx.sportCanCheck(session, _ctx.trainingDayModal.dateKey))
                                      ? (_openBlock(), _createElementBlock("span", _hoisted_1506, " • fatto? ›"))
                                      : _createCommentVNode("v-if", true)
                              ]),
                              (session.note)
                                ? (_openBlock(), _createElementBlock("div", _hoisted_1507, "📝 " + _toDisplayString(session.note), 1 /* TEXT */))
                                : _createCommentVNode("v-if", true)
                            ], 10 /* CLASS, PROPS */, _hoisted_1499),
                            _createElementVNode("button", {
                              onClick: $event => (_ctx.editTrainingSession(session, _ctx.trainingDayModal.dateKey)),
                              class: "p-2 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-arancione hover:border-arancione/30 transition-colors flex-shrink-0",
                              "aria-label": "Modifica allenamento"
                            }, [...(_cache[918] || (_cache[918] = [
                              _createElementVNode("svg", {
                                class: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                "stroke-width": "2"
                              }, [
                                _createElementVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                })
                              ], -1 /* CACHED */)
                            ]))], 8 /* PROPS */, _hoisted_1508),
                            _createElementVNode("button", {
                              onClick: $event => (_ctx.removeTrainingSession(session)),
                              class: "p-2 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors flex-shrink-0",
                              "aria-label": "Elimina allenamento"
                            }, [...(_cache[919] || (_cache[919] = [
                              _createElementVNode("svg", {
                                class: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                "stroke-width": "2"
                              }, [
                                _createElementVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                })
                              ], -1 /* CACHED */)
                            ]))], 8 /* PROPS */, _hoisted_1509)
                          ]))
                        }), 128 /* KEYED_FRAGMENT */))
                      ])),
                  _createElementVNode("button", {
                    onClick: _cache[333] || (_cache[333] = $event => (_ctx.openTrainingForm(_ctx.trainingDayModal.dateKey))),
                    class: "w-full py-2.5 border-2 border-dashed border-arancione/40 bg-arancione/5 rounded-xl text-arancione font-bold text-xs hover:bg-arancione/10 transition-colors flex items-center justify-center gap-1.5 shrink-0"
                  }, [...(_cache[920] || (_cache[920] = [
                    _createElementVNode("svg", {
                      class: "w-4 h-4",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      "stroke-width": "2.5"
                    }, [
                      _createElementVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M12 4v16m8-8H4"
                      })
                    ], -1 /* CACHED */),
                    _createTextVNode(" Aggiungi allenamento ", -1 /* CACHED */)
                  ]))]),
                  _createElementVNode("div", _hoisted_1510, [
                    _createElementVNode("button", {
                      onClick: _cache[334] || (_cache[334] = (...args) => (_ctx.closeTrainingDay && _ctx.closeTrainingDay(...args))),
                      class: "w-full bg-antracite text-white font-bold py-3 rounded-xl hover:bg-antracite/90 active:scale-95 transition-all"
                    }, "Chiudi")
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.sportCheckModal.isOpen && _ctx.sportCheckSession)
            ? (_openBlock(), _createElementBlock("div", _hoisted_1511, [
                _createElementVNode("div", _hoisted_1512, [
                  _createElementVNode("div", _hoisted_1513, [
                    _createElementVNode("div", _hoisted_1514, [
                      _createElementVNode("div", _hoisted_1515, _toDisplayString(_ctx.sportCheckSession.kind === 'gym' ? '💪' : '🏅'), 1 /* TEXT */),
                      _createElementVNode("div", _hoisted_1516, [
                        _createElementVNode("h3", _hoisted_1517, _toDisplayString(_ctx.trainingSessionLabel(_ctx.sportCheckSession)), 1 /* TEXT */),
                        _createElementVNode("p", _hoisted_1518, [
                          _createTextVNode(_toDisplayString(_ctx.formatDateLong(_ctx.sportCheckModal.dateKey)), 1 /* TEXT */),
                          (_ctx.sportCheckSession.time)
                            ? (_openBlock(), _createElementBlock("span", _hoisted_1519, " • " + _toDisplayString(_ctx.sessionTimeLabel(_ctx.sportCheckSession)), 1 /* TEXT */))
                            : _createCommentVNode("v-if", true)
                        ])
                      ])
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[335] || (_cache[335] = (...args) => (_ctx.closeSportCheck && _ctx.closeSportCheck(...args))),
                      class: "p-1 text-gray-400 hover:text-antracite flex-shrink-0",
                      "aria-label": "Chiudi"
                    }, [...(_cache[921] || (_cache[921] = [
                      _createElementVNode("svg", {
                        class: "w-6 h-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  _createElementVNode("div", _hoisted_1520, [
                    _cache[922] || (_cache[922] = _createElementVNode("p", { class: "text-base font-extrabold text-antracite" }, "Ti sei allenato?", -1 /* CACHED */)),
                    _cache[923] || (_cache[923] = _createElementVNode("p", { class: "text-[11px] font-medium text-gray-400" }, "Solo gli allenamenti fatti contano nei tuoi progressi e nella serie.", -1 /* CACHED */)),
                    (_ctx.sportCheckModal.total > 1)
                      ? (_openBlock(), _createElementBlock("p", _hoisted_1521, _toDisplayString(_ctx.sportCheckModal.index) + " di " + _toDisplayString(_ctx.sportCheckModal.total), 1 /* TEXT */))
                      : _createCommentVNode("v-if", true)
                  ]),
                  _createElementVNode("div", _hoisted_1522, [
                    _createElementVNode("button", {
                      onClick: _cache[336] || (_cache[336] = $event => (_ctx.setSportStatus('done'))),
                      class: _normalizeClass(["py-4 rounded-2xl font-extrabold text-sm flex flex-col items-center gap-1.5 border-2 transition-all active:scale-95", _ctx.sportStatus(_ctx.sportCheckSession, _ctx.sportCheckModal.dateKey) === 'done' ? 'bg-salvia text-white border-salvia shadow-lg' : 'bg-salvia/10 text-salvia border-salvia/30 hover:bg-salvia/15'])
                    }, [...(_cache[924] || (_cache[924] = [
                      _createElementVNode("svg", {
                        class: "w-7 h-7",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "3"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M5 13l4 4L19 7"
                        })
                      ], -1 /* CACHED */),
                      _createTextVNode(" Fatto ", -1 /* CACHED */)
                    ]))], 2 /* CLASS */),
                    _createElementVNode("button", {
                      onClick: _cache[337] || (_cache[337] = $event => (_ctx.setSportStatus('skipped'))),
                      class: _normalizeClass(["py-4 rounded-2xl font-extrabold text-sm flex flex-col items-center gap-1.5 border-2 transition-all active:scale-95", _ctx.sportStatus(_ctx.sportCheckSession, _ctx.sportCheckModal.dateKey) === 'skipped' ? 'bg-red-500 text-white border-red-500 shadow-lg' : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-red-200 hover:text-red-500'])
                    }, [...(_cache[925] || (_cache[925] = [
                      _createElementVNode("svg", {
                        class: "w-7 h-7",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "3"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */),
                      _createTextVNode(" Non fatto ", -1 /* CACHED */)
                    ]))], 2 /* CLASS */)
                  ]),
                  _createElementVNode("div", _hoisted_1523, [
                    _createElementVNode("div", _hoisted_1524, [
                      _createElementVNode("button", {
                        onClick: _cache[338] || (_cache[338] = (...args) => (_ctx.editFromSportCheck && _ctx.editFromSportCheck(...args))),
                        class: "text-[11px] font-bold text-gray-400 hover:text-arancione py-2"
                      }, "Modifica sessione"),
                      (_ctx.sportCheckSession && _ctx.sportCheckSession.recurring)
                        ? (_openBlock(), _createElementBlock("button", {
                            key: 0,
                            onClick: _cache[339] || (_cache[339] = (...args) => (_ctx.openPastFromCheck && _ctx.openPastFromCheck(...args))),
                            class: "text-[11px] font-bold text-sky-600 hover:text-sky-700 py-2"
                          }, "🗓️ Giorni passati"))
                        : _createCommentVNode("v-if", true)
                    ]),
                    (_ctx.sportStatus(_ctx.sportCheckSession, _ctx.sportCheckModal.dateKey))
                      ? (_openBlock(), _createElementBlock("button", {
                          key: 0,
                          onClick: _cache[340] || (_cache[340] = $event => (_ctx.setSportStatus(null))),
                          class: "text-[11px] font-bold text-gray-400 hover:text-antracite py-2"
                        }, "Annulla scelta"))
                      : (_ctx.sportCheckModal.total > 1)
                        ? (_openBlock(), _createElementBlock("button", {
                            key: 1,
                            onClick: _cache[341] || (_cache[341] = (...args) => (_ctx.snoozeSportChecks && _ctx.snoozeSportChecks(...args))),
                            class: "text-[11px] font-bold text-gray-400 hover:text-antracite py-2"
                          }, "Più tardi"))
                        : _createCommentVNode("v-if", true)
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.trainingFormModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", _hoisted_1525, [
                _createElementVNode("div", _hoisted_1526, [
                  _createElementVNode("div", _hoisted_1527, [
                    _createElementVNode("div", _hoisted_1528, [
                      _cache[926] || (_cache[926] = _createElementVNode("div", { class: "w-10 h-10 rounded-xl bg-arancione/10 flex items-center justify-center text-arancione border border-arancione/20 flex-shrink-0" }, [
                        _createElementVNode("svg", {
                          class: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2.5"
                        }, [
                          _createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M12 4v16m8-8H4"
                          })
                        ])
                      ], -1 /* CACHED */)),
                      _createElementVNode("div", _hoisted_1529, [
                        _createElementVNode("h3", _hoisted_1530, _toDisplayString(_ctx.trainingFormModal.editingId ? 'Modifica allenamento' : 'Nuovo allenamento'), 1 /* TEXT */),
                        _createElementVNode("p", _hoisted_1531, _toDisplayString(_ctx.trainingFormModal.editingId ? 'Aggiorna i dettagli' : 'Sport o palestra'), 1 /* TEXT */)
                      ])
                    ]),
                    _createElementVNode("button", {
                      onClick: _cache[342] || (_cache[342] = (...args) => (_ctx.closeTrainingForm && _ctx.closeTrainingForm(...args))),
                      class: "p-1 text-gray-400 hover:text-antracite flex-shrink-0"
                    }, [...(_cache[927] || (_cache[927] = [
                      _createElementVNode("svg", {
                        class: "w-6 h-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1 /* CACHED */)
                    ]))])
                  ]),
                  _createElementVNode("div", _hoisted_1532, [
                    _createElementVNode("div", null, [
                      _createElementVNode("label", _hoisted_1533, _toDisplayString(_ctx.trainingFormModal.kind === 'sport' && _ctx.trainingFormModal.recurring ? 'Dal' : 'Data'), 1 /* TEXT */),
                      _withDirectives(_createElementVNode("input", {
                        type: "date",
                        "onUpdate:modelValue": _cache[343] || (_cache[343] = $event => ((_ctx.trainingFormModal.date) = $event)),
                        class: "w-full bg-gray-50 border border-gray-200 focus:border-arancione rounded-xl p-2.5 text-xs font-bold text-antracite outline-none transition-all"
                      }, null, 512 /* NEED_PATCH */), [
                        [_vModelText, _ctx.trainingFormModal.date]
                      ])
                    ]),
                    _createElementVNode("div", _hoisted_1534, [
                      _createElementVNode("div", null, [
                        _cache[928] || (_cache[928] = _createElementVNode("label", { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Inizio", -1 /* CACHED */)),
                        _withDirectives(_createElementVNode("input", {
                          type: "time",
                          "onUpdate:modelValue": _cache[344] || (_cache[344] = $event => ((_ctx.trainingFormModal.time) = $event)),
                          class: "w-full bg-gray-50 border border-gray-200 focus:border-arancione rounded-xl px-1.5 py-2.5 text-xs font-bold text-antracite outline-none transition-all"
                        }, null, 512 /* NEED_PATCH */), [
                          [_vModelText, _ctx.trainingFormModal.time]
                        ])
                      ]),
                      _createElementVNode("div", null, [
                        _cache[929] || (_cache[929] = _createElementVNode("label", { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Fine", -1 /* CACHED */)),
                        _withDirectives(_createElementVNode("input", {
                          type: "time",
                          "onUpdate:modelValue": _cache[345] || (_cache[345] = $event => ((_ctx.trainingFormModal.endTime) = $event)),
                          class: "w-full bg-gray-50 border border-gray-200 focus:border-arancione rounded-xl px-1.5 py-2.5 text-xs font-bold text-antracite outline-none transition-all"
                        }, null, 512 /* NEED_PATCH */), [
                          [_vModelText, _ctx.trainingFormModal.endTime]
                        ])
                      ])
                    ])
                  ]),
                  _createElementVNode("p", _hoisted_1535, "⏱️ " + _toDisplayString(_ctx.trainingFormModal.kind === 'sport' ? 'Il tempo si aggiunge alle tue ore di allenamento quando segni lo sport come fatto.' : "Se usi l'allenamento guidato la durata si misura da sola; altrimenti contano inizio e fine."), 1 /* TEXT */),
                  (!(_ctx.trainingFormModal.kind === 'sport' && _ctx.trainingFormModal.recurring) && _ctx.trainingFormModal.date && _ctx.trainingFormModal.date <= _ctx.todayDateKey && !(_ctx.trainingFormModal.date === _ctx.todayDateKey && _ctx.timeIsAhead(_ctx.trainingFormModal.time)))
                    ? (_openBlock(), _createElementBlock("div", _hoisted_1536, [
                        _cache[930] || (_cache[930] = _createElementVNode("label", { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-wider" }, "Com'è andata?", -1 /* CACHED */)),
                        _createElementVNode("div", _hoisted_1537, [
                          _createElementVNode("button", {
                            onClick: _cache[346] || (_cache[346] = $event => (_ctx.trainingFormModal.pastStatus = _ctx.trainingFormModal.pastStatus === 'done' ? '' : 'done')),
                            class: _normalizeClass(["py-2 rounded-xl text-xs font-bold border transition-colors", _ctx.trainingFormModal.pastStatus === 'done' ? 'bg-salvia text-white border-salvia' : 'bg-gray-50 text-gray-500 border-gray-200'])
                          }, "✓ Fatto", 2 /* CLASS */),
                          _createElementVNode("button", {
                            onClick: _cache[347] || (_cache[347] = $event => (_ctx.trainingFormModal.pastStatus = _ctx.trainingFormModal.pastStatus === 'skipped' ? '' : 'skipped')),
                            class: _normalizeClass(["py-2 rounded-xl text-xs font-bold border transition-colors", _ctx.trainingFormModal.pastStatus === 'skipped' ? 'bg-red-500 text-white border-red-500' : 'bg-gray-50 text-gray-500 border-gray-200'])
                          }, "✗ Non fatto", 2 /* CLASS */)
                        ])
                      ]))
                    : _createCommentVNode("v-if", true),
                  (_ctx.trainingFormModal.kind === 'sport' && _ctx.trainingFormModal.recurring && _ctx.trainingFormModal.date && _ctx.trainingFormModal.date < _ctx.todayDateKey && !_ctx.trainingFormModal.editingId)
                    ? (_openBlock(), _createElementBlock("p", _hoisted_1538, " 🗓️ Parte nel passato: dopo il salvataggio potrai segnare i giorni già trascorsi come fatti o non fatti. "))
                    : _createCommentVNode("v-if", true),
                  (_ctx.trainingFormModal.editingId && _ctx.trainingFormModal.kind === 'sport' && _ctx.trainingFormModal.recurring && (_ctx.trainingFormModal.date < _ctx.todayDateKey || _ctx.trainingFormModal.fromDate > _ctx.trainingFormModal.date))
                    ? (_openBlock(), _createElementBlock("p", _hoisted_1539, [
                        _cache[931] || (_cache[931] = _createTextVNode(" Se cambi giorni o orari, le modifiche valgono ", -1 /* CACHED */)),
                        _createElementVNode("span", _hoisted_1540, _toDisplayString(_ctx.trainingFormModal.fromDate > _ctx.todayDateKey ? 'dal ' + _ctx.formatDate(_ctx.trainingFormModal.fromDate) : 'da oggi'), 1 /* TEXT */),
                        _cache[932] || (_cache[932] = _createTextVNode(": i giorni prima restano come sono. ", -1 /* CACHED */)),
                        _createElementVNode("button", {
                          onClick: _cache[348] || (_cache[348] = (...args) => (_ctx.openPastFromForm && _ctx.openPastFromForm(...args))),
                          class: "block mt-1 font-bold text-sky-600"
                        }, "🗓️ Segna i giorni passati ›")
                      ]))
                    : _createCommentVNode("v-if", true),
                  _createElementVNode("div", _hoisted_1541, [
                    _createElementVNode("button", {
                      onClick: _cache[349] || (_cache[349] = $event => (_ctx.setTrainingKind('gym'))),
                      class: _normalizeClass(["flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5", _ctx.trainingFormModal.kind === 'gym' ? 'bg-white text-arancione shadow-sm' : 'text-gray-500'])
                    }, [...(_cache[933] || (_cache[933] = [
                      _createElementVNode("svg", {
                        class: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12"
                        })
                      ], -1 /* CACHED */),
                      _createTextVNode(" Palestra ", -1 /* CACHED */)
                    ]))], 2 /* CLASS */),
                    _createElementVNode("button", {
                      onClick: _cache[350] || (_cache[350] = $event => (_ctx.setTrainingKind('sport'))),
                      class: _normalizeClass(["flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5", _ctx.trainingFormModal.kind === 'sport' ? 'bg-white text-sky-600 shadow-sm' : 'text-gray-500'])
                    }, [...(_cache[934] || (_cache[934] = [
                      _createElementVNode("svg", {
                        class: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2"
                      }, [
                        _createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"
                        })
                      ], -1 /* CACHED */),
                      _createTextVNode(" Sport ", -1 /* CACHED */)
                    ]))], 2 /* CLASS */)
                  ]),
                  _createElementVNode("div", _hoisted_1542, [
                    (_ctx.trainingFormModal.kind === 'gym')
                      ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                          _createElementVNode("div", null, [
                            _cache[935] || (_cache[935] = _createElementVNode("label", { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Scheda", -1 /* CACHED */)),
                            (_ctx.workoutSheets.length)
                              ? _withDirectives((_openBlock(), _createElementBlock("select", {
                                  key: 0,
                                  "onUpdate:modelValue": _cache[351] || (_cache[351] = $event => ((_ctx.trainingFormModal.sheetId) = $event)),
                                  class: "w-full bg-gray-50 border border-gray-200 focus:border-arancione rounded-xl p-3 text-xs font-bold text-antracite outline-none transition-all"
                                }, [
                                  (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.workoutSheets, (sheet) => {
                                    return (_openBlock(), _createElementBlock("option", {
                                      key: sheet.id,
                                      value: sheet.id
                                    }, _toDisplayString(sheet.name), 9 /* TEXT, PROPS */, _hoisted_1543))
                                  }), 128 /* KEYED_FRAGMENT */))
                                ], 512 /* NEED_PATCH */)), [
                                  [_vModelSelect, _ctx.trainingFormModal.sheetId]
                                ])
                              : (_openBlock(), _createElementBlock("div", _hoisted_1544, " Nessuna scheda disponibile. Creane una nella sezione Schede per registrare la palestra. "))
                          ]),
                          _cache[936] || (_cache[936] = _createElementVNode("p", { class: "text-[10px] font-medium text-gray-400 leading-relaxed" }, "La palestra è variabile: aggiungi la singola sessione ogni volta, senza giorni fissi.", -1 /* CACHED */))
                        ], 64 /* STABLE_FRAGMENT */))
                      : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                          _createElementVNode("div", null, [
                            _cache[937] || (_cache[937] = _createElementVNode("label", { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Sport", -1 /* CACHED */)),
                            _withDirectives(_createElementVNode("select", {
                              "onUpdate:modelValue": _cache[352] || (_cache[352] = $event => ((_ctx.trainingFormModal.sport) = $event)),
                              class: "w-full bg-gray-50 border border-gray-200 focus:border-sky-400 rounded-xl p-3 text-xs font-bold text-antracite outline-none transition-all"
                            }, [
                              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.trainingSports, (sport) => {
                                return (_openBlock(), _createElementBlock("option", {
                                  key: sport,
                                  value: sport
                                }, _toDisplayString(sport), 9 /* TEXT, PROPS */, _hoisted_1545))
                              }), 128 /* KEYED_FRAGMENT */))
                            ], 512 /* NEED_PATCH */), [
                              [_vModelSelect, _ctx.trainingFormModal.sport]
                            ])
                          ]),
                          _createElementVNode("div", _hoisted_1546, [
                            _cache[938] || (_cache[938] = _createElementVNode("span", { class: "text-xs font-bold text-gray-500" }, "Ripeti ogni settimana", -1 /* CACHED */)),
                            _createElementVNode("button", {
                              onClick: _cache[353] || (_cache[353] = $event => (_ctx.trainingFormModal.recurring = !_ctx.trainingFormModal.recurring)),
                              class: _normalizeClass(["w-10 h-5 rounded-full relative transition-colors flex-shrink-0", _ctx.trainingFormModal.recurring ? 'bg-sky-500' : 'bg-gray-300'])
                            }, [
                              _createElementVNode("div", {
                                class: _normalizeClass(["w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform", _ctx.trainingFormModal.recurring ? 'translate-x-5' : ''])
                              }, null, 2 /* CLASS */)
                            ], 2 /* CLASS */)
                          ]),
                          (_ctx.trainingFormModal.recurring)
                            ? (_openBlock(), _createElementBlock("div", _hoisted_1547, [
                                _cache[939] || (_cache[939] = _createElementVNode("label", { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-wider" }, "Giorni", -1 /* CACHED */)),
                                _createElementVNode("div", _hoisted_1548, [
                                  (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.trainingWeekdays, (wd) => {
                                    return (_openBlock(), _createElementBlock("button", {
                                      key: 'wd-' + wd.value,
                                      onClick: $event => (_ctx.toggleTrainingWeekday(wd.value)),
                                      class: _normalizeClass(["flex-1 py-2 rounded-lg text-xs font-bold transition-colors", _ctx.trainingFormModal.weekdays.includes(wd.value) ? 'bg-sky-500 text-white' : 'bg-gray-100 text-gray-500'])
                                    }, _toDisplayString(wd.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_1549))
                                  }), 128 /* KEYED_FRAGMENT */))
                                ])
                              ]))
                            : _createCommentVNode("v-if", true)
                        ], 64 /* STABLE_FRAGMENT */)),
                    _createElementVNode("div", null, [
                      _cache[940] || (_cache[940] = _createElementVNode("label", { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Note", -1 /* CACHED */)),
                      _withDirectives(_createElementVNode("textarea", {
                        "onUpdate:modelValue": _cache[354] || (_cache[354] = $event => ((_ctx.trainingFormModal.note) = $event)),
                        rows: "2",
                        placeholder: "Es. Palestra comunale, campo 2...",
                        class: "w-full bg-gray-50 border border-gray-200 focus:border-arancione rounded-xl p-3 text-xs text-antracite outline-none resize-none transition-all"
                      }, null, 512 /* NEED_PATCH */), [
                        [_vModelText, _ctx.trainingFormModal.note]
                      ])
                    ])
                  ]),
                  (_ctx.trainingFormModal.error)
                    ? (_openBlock(), _createElementBlock("p", _hoisted_1550, _toDisplayString(_ctx.trainingFormModal.error), 1 /* TEXT */))
                    : _createCommentVNode("v-if", true),
                  _createElementVNode("div", _hoisted_1551, [
                    _createElementVNode("button", {
                      onClick: _cache[355] || (_cache[355] = (...args) => (_ctx.closeTrainingForm && _ctx.closeTrainingForm(...args))),
                      class: "flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 active:scale-95 transition-all"
                    }, "Annulla"),
                    _createElementVNode("button", {
                      onClick: _cache[356] || (_cache[356] = (...args) => (_ctx.saveTrainingSession && _ctx.saveTrainingSession(...args))),
                      class: "flex-1 bg-arancione text-white font-bold py-3 rounded-xl shadow-md hover:bg-arancione/90 active:scale-95 transition-all"
                    }, _toDisplayString(_ctx.trainingFormModal.editingId ? 'Aggiorna' : 'Salva'), 1 /* TEXT */)
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.lightDayModal.isOpen)
            ? (_openBlock(), _createElementBlock("div", {
                key: 42,
                class: "fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4 bg-antracite/40 backdrop-blur-sm animate-fadeIn",
                onClick: _cache[360] || (_cache[360] = _withModifiers($event => (_ctx.lightDayModal.isOpen = false), ["self"]))
              }, [
                _createElementVNode("div", _hoisted_1552, [
                  _cache[943] || (_cache[943] = _createElementVNode("div", { class: "text-center" }, [
                    _createElementVNode("div", { class: "text-4xl" }, "🌱"),
                    _createElementVNode("h3", { class: "text-lg font-extrabold text-antracite mt-2" }, "Anche i giorni piccoli contano"),
                    _createElementVNode("p", { class: "text-xs text-gray-500 font-medium mt-1 leading-relaxed" }, "Oggi non è giornata? Bastano 10 minuti di movimento per tenere viva la serie. Niente sensi di colpa.")
                  ], -1 /* CACHED */)),
                  _createElementVNode("div", _hoisted_1553, [
                    _cache[941] || (_cache[941] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "Cosa hai fatto", -1 /* CACHED */)),
                    _createElementVNode("div", _hoisted_1554, [
                      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.LIGHT_ACTIVITIES, (a) => {
                        return (_openBlock(), _createElementBlock("button", {
                          key: 'la' + a.id,
                          onClick: $event => (_ctx.lightDayModal.type = a.id),
                          class: _normalizeClass(["rounded-2xl py-2.5 px-1 flex flex-col items-center gap-1 border transition-all active:scale-95", _ctx.lightDayModal.type === a.id ? 'bg-salvia/10 border-salvia text-antracite' : 'bg-gray-50 border-gray-100 text-gray-500'])
                        }, [
                          _createElementVNode("span", _hoisted_1556, _toDisplayString(a.icon), 1 /* TEXT */),
                          _createElementVNode("span", _hoisted_1557, _toDisplayString(a.label), 1 /* TEXT */)
                        ], 10 /* CLASS, PROPS */, _hoisted_1555))
                      }), 128 /* KEYED_FRAGMENT */))
                    ])
                  ]),
                  _createElementVNode("div", _hoisted_1558, [
                    _cache[942] || (_cache[942] = _createElementVNode("div", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest" }, "Per quanto", -1 /* CACHED */)),
                    _createElementVNode("div", _hoisted_1559, [
                      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.LIGHT_MINUTES, (m) => {
                        return (_openBlock(), _createElementBlock("button", {
                          key: 'lm' + m,
                          onClick: $event => (_ctx.lightDayModal.min = m),
                          class: _normalizeClass(["py-2 rounded-xl text-xs font-bold border transition-all", _ctx.lightDayModal.min === m ? 'bg-salvia text-white border-salvia' : 'bg-gray-50 text-gray-500 border-gray-100'])
                        }, _toDisplayString(m) + "'", 11 /* TEXT, CLASS, PROPS */, _hoisted_1560))
                      }), 128 /* KEYED_FRAGMENT */))
                    ])
                  ]),
                  _createElementVNode("div", _hoisted_1561, [
                    _createElementVNode("button", {
                      onClick: _cache[357] || (_cache[357] = (...args) => (_ctx.saveLightDay && _ctx.saveLightDay(...args))),
                      class: "w-full bg-salvia text-white font-bold py-3.5 rounded-2xl shadow-md active:scale-95 transition-all"
                    }, "Segna come fatto"),
                    (_ctx.lightToday)
                      ? (_openBlock(), _createElementBlock("button", {
                          key: 0,
                          onClick: _cache[358] || (_cache[358] = (...args) => (_ctx.removeLightDay && _ctx.removeLightDay(...args))),
                          class: "w-full text-xs font-bold text-red-500 py-2"
                        }, "Togli la giornata leggera"))
                      : (_openBlock(), _createElementBlock("button", {
                          key: 1,
                          onClick: _cache[359] || (_cache[359] = $event => (_ctx.lightDayModal.isOpen = false)),
                          class: "w-full text-xs font-bold text-gray-400 py-2"
                        }, "Non ora"))
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          (_ctx.recordModal.isOpen && _ctx.recordModal.record)
            ? (_openBlock(), _createElementBlock("div", _hoisted_1562, [
                _createElementVNode("div", _hoisted_1563, [
                  _createElementVNode("div", _hoisted_1564, [
                    (_openBlock(), _createElementBlock(_Fragment, null, _renderList(18, (n) => {
                      return _createElementVNode("i", {
                        key: 'rc' + n
                      })
                    }), 64 /* STABLE_FRAGMENT */))
                  ]),
                  _createElementVNode("div", _hoisted_1565, [
                    _cache[945] || (_cache[945] = _createElementVNode("div", { class: "w-20 h-20 mx-auto rounded-full bg-arancione/15 border-4 border-arancione/40 flex items-center justify-center text-4xl record-medal" }, "🏆", -1 /* CACHED */)),
                    _cache[946] || (_cache[946] = _createElementVNode("div", { class: "text-[10px] font-black uppercase tracking-[0.2em] text-arancione mt-3" }, "Nuovo record personale", -1 /* CACHED */)),
                    _createElementVNode("h3", _hoisted_1566, _toDisplayString(_ctx.recordModal.record.name), 1 /* TEXT */),
                    _createElementVNode("div", _hoisted_1567, [
                      _createTextVNode(_toDisplayString(_ctx.formatNumber(_ctx.recordModal.record.value)) + " ", 1 /* TEXT */),
                      _cache[944] || (_cache[944] = _createElementVNode("span", { class: "text-lg font-bold text-gray-400" }, "kg", -1 /* CACHED */))
                    ]),
                    _createElementVNode("p", _hoisted_1568, [
                      _createTextVNode("Prima " + _toDisplayString(_ctx.formatNumber(_ctx.recordModal.record.prev)) + " kg · ", 1 /* TEXT */),
                      _createElementVNode("b", _hoisted_1569, "+" + _toDisplayString(_ctx.formatNumber(Math.round((_ctx.recordModal.record.value - _ctx.recordModal.record.prev) * 10) / 10)) + " kg", 1 /* TEXT */)
                    ])
                  ]),
                  _createElementVNode("div", _hoisted_1570, [
                    _createElementVNode("button", {
                      onClick: _cache[361] || (_cache[361] = (...args) => (_ctx.shareRecordFromModal && _ctx.shareRecordFromModal(...args))),
                      class: "w-full cangiante-btn text-white font-extrabold py-3.5 rounded-2xl shadow-md active:scale-95 transition-all"
                    }, "📸 Condividi nella storia"),
                    _createElementVNode("button", {
                      onClick: _cache[362] || (_cache[362] = $event => (_ctx.recordModal.isOpen = false)),
                      class: "w-full text-xs font-bold text-gray-400 py-2"
                    }, "Continua")
                  ])
                ])
              ]))
            : _createCommentVNode("v-if", true),
          _createElementVNode("nav", _hoisted_1571, [
            _createElementVNode("button", {
              onClick: _cache[363] || (_cache[363] = $event => (_ctx.activeTab = 'dashboard')),
              class: _normalizeClass([_ctx.activeTab === 'dashboard' ? 'text-viola' : 'text-gray-400 hover:text-gray-500', "flex flex-col items-center gap-1 transition-all p-2 relative flex-1 group"])
            }, [
              _createElementVNode("div", {
                class: _normalizeClass([_ctx.activeTab === 'dashboard' ? 'bg-viola/10 text-viola' : 'group-hover:bg-gray-100', "p-1.5 rounded-xl transition-colors"])
              }, [...(_cache[947] || (_cache[947] = [
                _createElementVNode("svg", {
                  class: "w-6 h-6",
                  stroke: "currentColor",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "2"
                }, [
                  _createElementVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  })
                ], -1 /* CACHED */)
              ]))], 2 /* CLASS */),
              _cache[948] || (_cache[948] = _createElementVNode("span", { class: "text-[10px] font-bold" }, "Dashboard", -1 /* CACHED */)),
              (_ctx.activeTab === 'dashboard')
                ? (_openBlock(), _createElementBlock("span", _hoisted_1572))
                : _createCommentVNode("v-if", true)
            ], 2 /* CLASS */),
            _createElementVNode("button", {
              onClick: _cache[364] || (_cache[364] = $event => (_ctx.activeTab = 'allenamento')),
              class: _normalizeClass([_ctx.activeTab === 'allenamento' ? 'text-arancione' : 'text-gray-400 hover:text-gray-500', "flex flex-col items-center gap-1 transition-all p-2 relative flex-1 group"])
            }, [
              _createElementVNode("div", {
                class: _normalizeClass([_ctx.activeTab === 'allenamento' ? 'bg-arancione/10 text-arancione' : 'group-hover:bg-gray-100', "p-1.5 rounded-xl transition-colors"])
              }, [...(_cache[949] || (_cache[949] = [
                _createElementVNode("svg", {
                  class: "w-6 h-6",
                  stroke: "currentColor",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "2"
                }, [
                  _createElementVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 6v12M17 6v12M3 9v6h4V9H3zm14 0v6h4V9h-4zM7 12h10"
                  })
                ], -1 /* CACHED */)
              ]))], 2 /* CLASS */),
              _cache[950] || (_cache[950] = _createElementVNode("span", { class: "text-[10px] font-bold" }, "Allenamento", -1 /* CACHED */)),
              (_ctx.activeTab === 'allenamento')
                ? (_openBlock(), _createElementBlock("span", _hoisted_1573))
                : _createCommentVNode("v-if", true)
            ], 2 /* CLASS */),
            _createElementVNode("button", {
              onClick: _cache[365] || (_cache[365] = $event => (_ctx.activeTab = 'nutrition')),
              class: _normalizeClass([_ctx.activeTab === 'nutrition' ? 'text-salvia' : 'text-gray-400 hover:text-gray-500', "flex flex-col items-center gap-1 transition-all p-2 relative flex-1 group"])
            }, [
              _createElementVNode("div", {
                class: _normalizeClass([_ctx.activeTab === 'nutrition' ? 'bg-salvia/10 text-salvia' : 'group-hover:bg-gray-100', "p-1.5 rounded-xl transition-colors"])
              }, [...(_cache[951] || (_cache[951] = [
                _createElementVNode("svg", {
                  class: "w-6 h-6",
                  stroke: "currentColor",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "2"
                }, [
                  _createElementVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M5 16h14M4 12h16c0-3.314-3.582-6-8-6S4 8.686 4 12zm0 4h16c0 1.105-.895 2-2 2H6c-1.105 0-2-.895-2-2z"
                  })
                ], -1 /* CACHED */)
              ]))], 2 /* CLASS */),
              _cache[952] || (_cache[952] = _createElementVNode("span", { class: "text-[10px] font-bold" }, "Nutrizione", -1 /* CACHED */)),
              (_ctx.activeTab === 'nutrition')
                ? (_openBlock(), _createElementBlock("span", _hoisted_1574))
                : _createCommentVNode("v-if", true)
            ], 2 /* CLASS */),
            _createElementVNode("button", {
              onClick: _cache[366] || (_cache[366] = $event => (_ctx.activeTab = 'progress')),
              class: _normalizeClass([_ctx.activeTab === 'progress' ? 'text-viola' : 'text-gray-400 hover:text-gray-500', "flex flex-col items-center gap-1 transition-all p-2 relative flex-1 group"])
            }, [
              _createElementVNode("div", {
                class: _normalizeClass([_ctx.activeTab === 'progress' ? 'bg-viola/10 text-viola' : 'group-hover:bg-gray-100', "p-1.5 rounded-xl transition-colors"])
              }, [...(_cache[953] || (_cache[953] = [
                _createElementVNode("svg", {
                  class: "w-6 h-6",
                  stroke: "currentColor",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "2"
                }, [
                  _createElementVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  })
                ], -1 /* CACHED */)
              ]))], 2 /* CLASS */),
              _cache[954] || (_cache[954] = _createElementVNode("span", { class: "text-[10px] font-bold" }, "Progressi", -1 /* CACHED */)),
              (_ctx.activeTab === 'progress')
                ? (_openBlock(), _createElementBlock("span", _hoisted_1575))
                : _createCommentVNode("v-if", true)
            ], 2 /* CLASS */),
            _createElementVNode("button", {
              onClick: _cache[367] || (_cache[367] = $event => (_ctx.activeTab = 'trophies')),
              class: _normalizeClass([_ctx.activeTab === 'trophies' ? 'text-arancione' : 'text-gray-400 hover:text-gray-500', "flex flex-col items-center gap-1 transition-all p-2 relative flex-1 group"])
            }, [
              _createElementVNode("div", {
                class: _normalizeClass([_ctx.activeTab === 'trophies' ? 'bg-arancione/10 text-arancione' : 'group-hover:bg-gray-100', "p-1.5 rounded-xl transition-colors"])
              }, [...(_cache[955] || (_cache[955] = [
                _createElementVNode("svg", {
                  class: "w-6 h-6",
                  stroke: "currentColor",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "2"
                }, [
                  _createElementVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M8 21h8m-4-4v4M7 4h10v5a5 5 0 01-10 0V4zM7 6H4.5a2.5 2.5 0 002.9 3.4M17 6h2.5a2.5 2.5 0 01-2.9 3.4"
                  })
                ], -1 /* CACHED */)
              ]))], 2 /* CLASS */),
              _cache[956] || (_cache[956] = _createElementVNode("span", { class: "text-[10px] font-bold" }, "Trofei", -1 /* CACHED */)),
              (_ctx.activeTab === 'trophies')
                ? (_openBlock(), _createElementBlock("span", _hoisted_1576))
                : _createCommentVNode("v-if", true)
            ], 2 /* CLASS */)
          ])
        ], 64 /* STABLE_FRAGMENT */))
}
})();
