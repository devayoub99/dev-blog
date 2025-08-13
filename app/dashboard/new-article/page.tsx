import Container from "@/components/container";
import Editor from "@/components/editor";
import PageTitle from "@/components/page-title";

export default function NewArticle() {
  return (
    <div>
      <Container>
        <PageTitle title="إنشاء مقالة" />
        <Editor />
      </Container>
    </div>
  );
}
