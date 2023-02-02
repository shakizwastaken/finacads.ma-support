import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

export interface LogoProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  scale?: string;
}

export default function Logo({ src, alt, style, scale, ...props }: LogoProps) {
  return (
    <img
      {...props}
      style={{ ...style, scale: scale ? scale : style?.scale || "" }}
      src="/assets/logo.png"
      alt="finacards.ma logo"
    />
  );
}
