import { memo } from 'react';
import {
  getLocalImageMeta,
  localImageProps,
  localImageSet,
  shopifySizedImage,
  shopifySrcSet,
} from '../utils/imageProps';

const OptimizedImage = memo(({
  src,
  alt,
  className,
  loading = 'lazy',
  fetchPriority,
  sizes = '(max-width: 640px) 100vw, 640px',
  ...props
}) => {
  const localImage = getLocalImageMeta(src);
  const imageProps = localImageProps(src);
  const isShopify = src?.includes('cdn/shop');

  if (localImage) {
    return (
      <picture>
        <source srcSet={localImageSet(src, 'avif')} sizes={sizes} type="image/avif" />
        <source srcSet={localImageSet(src, 'webp')} sizes={sizes} type="image/webp" />
        <img
          src={src}
          alt={alt}
          className={className}
          loading={loading}
          decoding="async"
          fetchPriority={fetchPriority}
          {...imageProps}
          {...props}
        />
      </picture>
    );
  }

  return (
    <img
      src={isShopify ? shopifySizedImage(src, 480) : src}
      srcSet={isShopify ? shopifySrcSet(src) : undefined}
      sizes={isShopify ? sizes : undefined}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      {...props}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';
export default OptimizedImage;
