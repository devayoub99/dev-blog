import Card from "@/components/card";
import Container from "@/components/container";
import PageTitle from "@/components/page-title";
import prisma from "@/lib/prisma";

export default async function Home() {
  const posts = await prisma.post.findMany();

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
      <Container>
        <section className="py-8">
          <PageTitle title="آخر المقالات" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {posts.map((post) => (
              <Card
                key={post.id}
                href={`/post/${post.slug}?id=${post.id}`}
                title={post.title}
                content={post.content || ""}
                // imageUrl={post.imageUrl}
              />
            ))}
          </div>

          {posts.length === 0 && (
            <div className="py-16 text-center">
              <div className="mb-4 text-6xl text-gray-400">📝</div>
              <h3 className="mb-2 text-xl font-medium text-gray-600 font-tajawal">
                لا توجد مقالات حالياً
              </h3>
              <p className="text-gray-500 font-tajawal">
                تابعونا لرؤية آخر المقالات والتحديثات
              </p>
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}
