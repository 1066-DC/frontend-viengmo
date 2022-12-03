const isNotNumeric = (n) => isNaN(parseFloat(n)) || !isFinite(n);
const separator = / |,/;

export const formatThousands = (n, space = false) => {
  if (!n) {
    return '';
  }
  if (isNotNumeric(n)) {
    return '';
  }
  const split = n.toString().split('.');
  let spaced = split[0]
    .toString()
    .split('')
    .reverse()
    .reduce(
      (str, char, i) =>
        (i + 1) % 3 ? `${str}${char}` : `${str}${char}${space ? ' ' : ','}`,
      ''
    )
    .split('');

  // remove trailing comma or space if present
  if (spaced[spaced.length - 1].match(separator)) {
    spaced.pop();
  } else if (spaced[spaced.length - 1] === '-' && spaced[spaced.length - 2].match(separator)) {
    spaced.splice(-2, 1);
  }

  spaced = spaced.reverse().join('');
  return split[1] ? `${spaced}.${split[1]}` : spaced;
};

// 0-9   | 2dp
// 10-99 | 1dp
// 100+  | 0dp
export const formatDecimalPlaces = (n, dp) => {
  if (isNotNumeric(n)) {
    return n;
  }
  const numericN = parseFloat(n);
  if (numericN === 0) {
    return '0';
  }
  if (typeof dp === 'number') {
    return numericN.toFixed(dp);
  }

  const abs = Math.abs(numericN);
  if (abs < 10) {
    return numericN.toFixed(2);
  }
  if (abs < 100) {
    return numericN.toFixed(1);
  }
  return `${Math.round(numericN)}`;
};

export const formatNumber = (n, dp) => formatThousands(formatDecimalPlaces(n, dp));

export const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const getChildGranularity = (granularity) => {
  if (granularity === 'country') {
    return 'province';
  }
  if (granularity === 'province') {
    return 'district';
  }
  if (granularity === 'district') {
    return 'village';
  }
  if (granularity === 'village') {
    return 'project';
  }
};


export const DISTRICTS_LAYER = 'districts';
export const VILLAGES_LAYER = 'villages';
export const VILLAGES_SOURCE = 'villages';
export const DISTRICTS_OUTLINE_LAYER = 'districts-outline';
export const PROVINCES_LAYER = 'provinces';
export const PROVINCES_OUTLINE_LAYER = 'provinces-outline';