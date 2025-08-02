import { getPost } from "@/actions/post-actions";
import Container from "@/components/container";
import PageTitle from "@/components/page-title";
import { Suspense } from "react";

async function Post({ params, searchParams }) {
  const { slug } = await params;
  const { id } = await searchParams;

  const data = await getPost(parseInt(id));

  console.log("data", data);
  const { title, content, published, author } = data;

  const contentBlocks = content.blocks;
  return (
    <>
      <h2 className="text-2xl font-tajawal font-semibold">{data.title}</h2>
      <div className="prose">
        {contentBlocks?.map((block, i) => {
          switch (block.type) {
            case "header":
              const HeadingTag =
                `h${block.level}` as keyof JSX.IntrinsicElements;
              return <HeadingTag key={i}>{block.data.text}</HeadingTag>;
            case "paragraph":
              return <p key={i}>{block.data.text}</p>;
            case "image":
              return <img key={i} src={block.url} alt={block.alt || ""} />;
            case "video":
              return (
                <video key={i} controls>
                  <source src={block.url} />
                </video>
              );
            default:
              return null;
          }
        })}
      </div>
    </>
  );
}

export default function PostPage({ params, searchParams }) {
  // const { slug } = await params;
  // const { id } = await searchParams;

  // const data = await getPost(parseInt(id));

  // console.log("data", data);
  return (
    <Container>
      <Suspense fallback="loading...">
        <Post params={params} searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}
