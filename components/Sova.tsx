import Image from "next/image";

interface SovaProps {
  imageName: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}

export default function Sova({
  imageName,
  alt = "Dr. Promil",
  className = "",
  priority = false,
}: SovaProps) {
  return (
    <Image
      src={`/assets/${imageName}`}
      alt={alt}
      width={320}
      height={320}
      className={className}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      sizes="(max-width: 480px) 200px, (max-width: 768px) 280px, (max-width: 1024px) 280px, 320px"
      quality={priority ? 90 : 75}
    />
  );
}
