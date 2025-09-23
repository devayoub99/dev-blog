import { auth } from "@/auth";
import Card from "@/components/card";
import PageTitle from "@/components/page-title";
import SignoutButton from "@/components/signout-button";
import Image from "next/image";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div>
      <PageTitle title="لوحة التحكم" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7">
        <Card
          href="/dashboard/profile"
          title="الملف الشخصي"
          // imageUrl="/user.svg"
          type="Transparent"
        />
      </div>
      <SignoutButton />
      {/* {session?.user ? (
        <div>
          <h2>أهلاً وسهلاً بك {session.user.name}</h2>
          <p>بريدك الإلكتروني: {session.user.email}</p>
            
          
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
      )} */}
    </div>
  );
}
