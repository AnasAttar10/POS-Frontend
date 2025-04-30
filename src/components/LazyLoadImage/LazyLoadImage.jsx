import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const LazyLoadImagee = ({ alt, src, width, height }) => {
  return (
    <LazyLoadImage
      alt={alt}
      height={height}
      width={width}
      effect="blur"
      src={src}
    />
  );
};

export default LazyLoadImagee;
