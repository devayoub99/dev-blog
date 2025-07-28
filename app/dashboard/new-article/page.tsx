import Container from "@/components/container";
import NewArticleForm from "@/components/new-article/new-article-form";
import Image from "next/image";

export default function NewArticle() {
  return (
    <div>
      <Container>
        <h2 className="text-center text-2xl font-mono font-semibold">
          New article
        </h2>
        <NewArticleForm />
      </Container>
    </div>
  );
}
