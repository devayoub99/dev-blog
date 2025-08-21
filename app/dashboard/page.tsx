import { auth } from "@/auth";
import PageTitle from "@/components/page-title";
import Image from "next/image";

export default async function DashboardPage() {
  const session = await auth();
  console.log("session", session);

  return (
    <div>
      <PageTitle title="لوحة التحكم" />
      {session?.user ? (
        <div>
          <h2>Welcome, {session.user.name}</h2>
          <p>Email {session.user.email}</p>
          {session.user?.image && (
            <Image
              src={session.user.image}
              width={52}
              height={52}
              alt={session.user.name}
              className="rounded-full"
            />
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
