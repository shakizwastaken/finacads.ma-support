export interface ProfileProps {
  picture: string;
  size?: string;
  alt?: string;
  className?: string;
}

export default function Profile({
  picture,
  size,
  alt,
  className,
}: ProfileProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`items-center justify-center overflow-hidden rounded-full ${className}`}
    >
      <img style={{ width: size, height: size }} src={picture} alt={alt} />
    </div>
  );
}
