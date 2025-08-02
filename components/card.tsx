import Image from "next/image";
import Link from "next/link";

interface CardProps {
  id: number;
  href: string;
  title: string;
  content: string;
  imageUrl?: string;
  alt?: string;
}

export default function Card({
  href,
  title,
  content,
  imageUrl = "/logo.png",
  alt = title,
}: CardProps) {
  return (
    <Link href={href}>
      <div className="relative w-40 h-40">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div>
        <h3 className="font-tajawal-300">{title}</h3>
        <p>{content}</p>
      </div>
    </Link>
  );
}
