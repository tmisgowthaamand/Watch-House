const LOCAL_IMAGE_MAP = {
  '/hero.png': { base: '/hero', width: 640, height: 640 },
  '/hero2.png': { base: '/hero2', width: 640, height: 640 },
  '/hero3.png': { base: '/hero3', width: 640, height: 640 },
  '/coffee_bag.png': { base: '/coffee_bag', width: 640, height: 640 },
};

const RESPONSIVE_WIDTHS = [320, 480, 640];

export const getLocalImageMeta = (src) => LOCAL_IMAGE_MAP[src];

export const localImageSet = (src, format) => {
  const image = getLocalImageMeta(src);
  if (!image) return '';
  return RESPONSIVE_WIDTHS
    .map((width) => `${image.base}-${width}.${format} ${width}w`)
    .join(', ');
};

export const localImageProps = (src) => {
  const image = getLocalImageMeta(src);
  return image ? { width: image.width, height: image.height } : {};
};

export const shopifySizedImage = (src, width = 480) => {
  if (!src || !src.includes('cdn/shop')) return src;
  const url = new URL(src);
  url.searchParams.set('width', String(width));
  return url.toString();
};

export const shopifySrcSet = (src) => {
  if (!src || !src.includes('cdn/shop')) return undefined;
  return [220, 330, 480, 660]
    .map((width) => `${shopifySizedImage(src, width)} ${width}w`)
    .join(', ');
};
