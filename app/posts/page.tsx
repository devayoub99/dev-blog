import Container from "@/components/container";
import PageTitle from "@/components/page-title";
import prisma from "@/lib/prisma";

export default async function Home() {
  const posts = await prisma.post.findMany();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Container>
        <PageTitle title="كل المقالات" />
        <section className="py-8">
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-6 transition-shadow duration-200 bg-white rounded-lg shadow-sm hover:shadow-md"
              >
                <a
                  href={`/post/${post.slug}?id=${post.id}`}
                  className="block text-lg font-medium text-gray-800 transition-colors duration-200 hover:text-blue-600"
                >
                  {post.title}
                </a>
              </div>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="py-16 text-center">
              <div className="mb-4 text-6xl text-gray-400">📝</div>
              <h3 className="mb-2 text-xl font-medium text-gray-600">
                لا توجد مقالات حالياً
              </h3>
              <p className="text-gray-500">
                تابعونا لرؤية آخر المقالات والتحديثات
              </p>
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}
