import Card from "@/components/card";
import Container from "@/components/container";
import prisma from "@/lib/prisma";

export default async function Home() {
  const posts = await prisma.post.findMany();
  console.log("posts", posts);

  return (
    <div>
      <Container>
        <h2 className="text-center text-2xl font-mono font-semibold">
          Latest articles
        </h2>
        <section className="flex">
          {posts.map((post) => (
            <Card key={post.id} title={post.title} content={post.content} />
          ))}
        </section>
      </Container>
    </div>
  );
}
