const _BEZIER_KAPPA = 0.5519150244935105;
const _SQUIRCLE_KAPPA = 0.9091;

function buildSquirclePath<T extends number>(
  width: T,
  height: T,
  cornerRadius: T,
  cornerSmoothing: T,
): string {
  "worklet";

  const maxHalf = Math.min(width, height) / 2;
  const r = Math.min(Math.max(cornerRadius, 0), maxHalf);
  const s = Math.max(0, Math.min(cornerSmoothing, 1));

  const shoulder = Math.min(r * s, Math.max(0, maxHalf - r));
  const effectiveKappa = _BEZIER_KAPPA + s * (_SQUIRCLE_KAPPA - _BEZIER_KAPPA);
  const h = (r + shoulder) * effectiveKappa;
  const W = width;
  const H = height;

  return (
    `M ${r + shoulder} 0 ` +
    `L ${W - r - shoulder} 0 ` +
    `C ${W - r - shoulder + h} 0 ${W} ${r + shoulder - h} ${W} ${r + shoulder} ` +
    `L ${W} ${H - r - shoulder} ` +
    `C ${W} ${H - r - shoulder + h} ${W - r - shoulder + h} ${H} ${W - r - shoulder} ${H} ` +
    `L ${r + shoulder} ${H} ` +
    `C ${r + shoulder - h} ${H} 0 ${H - r - shoulder + h} 0 ${H - r - shoulder} ` +
    `L 0 ${r + shoulder} ` +
    `C 0 ${r + shoulder - h} ${r + shoulder - h} 0 ${r + shoulder} 0 Z`
  );
}

export { buildSquirclePath };
