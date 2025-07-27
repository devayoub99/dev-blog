import { ElementType } from "react";
import Image from "next/image";

interface CardProps {
  element?: ElementType;
  imageUrl?: string;
  title: string;
  description: string;
  alt?: string;
}

export default function Card({
  element: Element = "div",
  imageUrl = "/logo.png",
  title,
  description,
  alt = title,
}: CardProps) {
  return (
    <Element>
      <div style={{ position: "relative", width: "100%", height: "200px" }}>
        <Image src={imageUrl} alt={alt} fill style={{ objectFit: "cover" }} />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Element>
  );
}
