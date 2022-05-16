import React from "react";
import { Spacing } from "../..";

interface ImageProps {
  src: string;
  width?: keyof typeof Spacing;
  height?: keyof typeof Spacing;
}

const Image: React.FC<ImageProps> = ({
  src,
  width = Spacing.sm,
  height = Spacing.sm,
}) => {
  const className = `dse-width-${width} dse-height-${height}`;
  return <img src={src} className={className} />;
};

export default Image;
