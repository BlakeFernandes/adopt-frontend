import Image, { ImageProps } from "next/image";
import { useState } from "react";

import fallback from "$/stock-image.jpg";

interface FallbackImageProps extends ImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
}

export default function FallbackImage({
  src,
  alt,
  fallbackSrc = fallback.src,
  ...props
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      width={216} // thanks nextjs
      height={216}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
