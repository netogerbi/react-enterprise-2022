import React from "react";
import { Spacing } from "@ds.e/foundation";

interface MarginProps {
  space?: keyof typeof Spacing;
  children: React.ReactNode;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
}

const Margin: React.FC<MarginProps> = ({
  space = Spacing.xxxs,
  children,
  left,
  right,
  top,
  bottom,
}) => {
  const getModifier = () => {
    if (left) {
      return `-left`;
    }

    if (right) {
      return `-right`;
    }

    if (top) {
      return `-top`;
    }

    if (bottom) {
      return `-bottom`;
    }
    return "";
  };

  const className = `dse-margin${getModifier()}-${space}`;

  return <div className={className}>{children}</div>;
};

export default Margin;
