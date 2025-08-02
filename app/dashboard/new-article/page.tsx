import Container from "@/components/container";
import NewArticleForm from "@/components/new-article/new-article-form";
import PageTitle from "@/components/page-title";
import Image from "next/image";

export default function NewArticle() {
  return (
    <div>
      <Container>
        <PageTitle title="إنشاء مقالة" />
        <NewArticleForm />
      </Container>
    </div>
  );
}
