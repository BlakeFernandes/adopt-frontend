import Image from "next/image";
import { useState } from "react";

import fallback from "$/stock-image.jpg";

export default function FallbackImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      className={className}
      src={imgSrc}
      alt={alt}
      width={216}
      height={216}
      onError={() => {
        setImgSrc(fallback.src);
      }}
    />
  );
}