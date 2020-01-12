import tinycolor from 'tinycolor2';

export const flattenObject = (obj: object, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '-' : '';

    if (typeof obj[k] === 'object')
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[(pre + k).replace(/([A-Z])/g, '-$1').toLowerCase()] = obj[k];

    return acc;
  }, {});

export const diffObject = (obj1: object, obj2: object) => {
  const isFunction = (x: any) =>
    Object.prototype.toString.call(x) === '[object Function]';
  const isArray = (x: any) =>
    Object.prototype.toString.call(x) === '[object Array]';
  const isDate = (x: any) =>
    Object.prototype.toString.call(x) === '[object Date]';
  const isObject = (x: any) =>
    Object.prototype.toString.call(x) === '[object Object]';
  const isValue = (x: any) => !isObject(x) && !isArray(x);
  const compareValues = (value1: any, value2: any) => {
    if (value1 === value2) return 'unchanged';
    if (
      isDate(value1) &&
      isDate(value2) &&
      value1.getTime() === value2.getTime()
    )
      return 'unchanged';
    if (value1 === undefined) return 'created';
    if (value2 === undefined) return 'deleted';

    return 'updated';
  };

  if (isFunction(obj1) || isFunction(obj2))
    throw new Error('Invalid argument. Function given, object expected.');

  if (isValue(obj1) || isValue(obj2))
    return {
      type: compareValues(obj1, obj2),
      previous: obj1,
      now: obj2
    };

  const diff = {};
  for (let key in obj1) {
    if (isFunction(obj1[key])) continue;

    let value2 = undefined;
    if (obj2[key] !== undefined) value2 = obj2[key];

    diff[key] = diffObject(obj1[key], value2);
  }
  for (let key in obj2) {
    if (isFunction(obj2[key]) || diff[key] !== undefined) continue;

    diff[key] = diffObject(undefined, obj2[key]);
  }

  return diff;
};

export const colorPalette = (color: string, index: number) => {
  const hueStep = 2;
  const saturationStep = 16;
  const saturationStep2 = 5;
  const brightnessStep1 = 5;
  const brightnessStep2 = 15;
  const lightColorCount = 5;
  const darkColorCount = 4;

  const isLight = index <= 6;
  const hsv = tinycolor(color).toHsv();
  const i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1;

  const getHue = (
    hsv: { h: number; s: number; v: number },
    i: number,
    isLight: boolean
  ) => {
    let hue;
    if (hsv.h >= 60 && hsv.h <= 240) {
      hue = isLight ? hsv.h - hueStep * i : hsv.h + hueStep * i;
    } else {
      hue = isLight ? hsv.h + hueStep * i : hsv.h - hueStep * i;
    }
    if (hue < 0) {
      hue += 360;
    } else if (hue >= 360) {
      hue -= 360;
    }
    return Math.round(hue);
  };

  const getSaturation = (
    hsv: { h: number; s: number; v: number },
    i: number,
    isLight: boolean
  ) => {
    let saturation;
    if (isLight) {
      saturation = Math.round(hsv.s * 100) - saturationStep * i;
    } else if (i === darkColorCount) {
      saturation = Math.round(hsv.s * 100) + saturationStep;
    } else {
      saturation = Math.round(hsv.s * 100) + saturationStep2 * i;
    }
    if (saturation > 100) {
      saturation = 100;
    }
    if (isLight && i === lightColorCount && saturation > 10) {
      saturation = 10;
    }
    if (saturation < 6) {
      saturation = 6;
    }
    return Math.round(saturation);
  };

  const getValue = (
    hsv: { h: number; s: number; v: number },
    i: number,
    isLight: boolean
  ) => {
    if (isLight) {
      return Math.round(hsv.v * 100) + brightnessStep1 * i;
    }
    return Math.round(hsv.v * 100) - brightnessStep2 * i;
  };

  return tinycolor({
    h: getHue(hsv, i, isLight),
    s: getSaturation(hsv, i, isLight),
    v: getValue(hsv, i, isLight)
  }).toHexString();
};
