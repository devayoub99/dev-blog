export default function NewArticleForm() {
  const formAction = async (formData: FormData) => {
    "use server";
    console.log("formData", formData.get("title"));
  };

  return (
    <form action={formAction}>
      <input name="title" placeholder="Article title" />
      <button>Submit</button>
    </form>
  );
}
