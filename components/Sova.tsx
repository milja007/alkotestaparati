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
      width={250}
      height={250}
      className={className}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "low"}
      sizes="(max-width: 640px) 150px, (max-width: 1024px) 200px, 250px"
    />
  );
}
