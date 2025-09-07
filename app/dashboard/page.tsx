import { auth } from "@/auth";
import PageTitle from "@/components/page-title";
import SignoutButton from "@/components/signout-button";
import Image from "next/image";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div>
      <PageTitle title="لوحة التحكم" />
      {session?.user ? (
        <div>
          <h2 className="font-tajawal">أهلاً وسهلاً بك {session.user.name}</h2>
          <p className="font-tajawal">بريدك الإلكتروني: {session.user.email}</p>
            
          
          {session.user?.image && (
            <Image
              src={session.user.image}
              width={52}
              height={52}
              alt={session.user.name ?? "User avatar"}
              className="rounded-full"
            />
          )}
          <SignoutButton />
        </div>
      ) : (
        <p>You're not signed in</p>
      )}
    </div>
  );
}
