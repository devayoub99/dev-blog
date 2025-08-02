import Card from "@/components/card";
import Container from "@/components/container";
import PageTitle from "@/components/page-title";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const posts = await prisma.post.findMany();
  console.log("posts", posts);

  return (
    <div>
      <Container>
        <PageTitle title="آخر المقالات" />
        <section className="py-4 grid gap-8 grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
          {posts.map((post) => (
            <Card
              key={post.id}
              href={`/post/${post.slug}?id=${post.id}`}
              title={post.title}
            />
          ))}
        </section>
      </Container>
    </div>
  );
}
