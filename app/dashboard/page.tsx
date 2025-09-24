import Card from "@/components/card";
import PageTitle from "@/components/page-title";
import SignoutButton from "@/components/signout-button";
import Image from "next/image";

export default async function DashboardPage() {
  return (
    <div>
      <PageTitle title="لوحة التحكم" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7">
        <Card
          href="/dashboard/profile"
          title="الملف الشخصي"
          CardImage={<Image src="/user-2.svg" fill alt="Profile" />}
          type="Transparent"
        />

        <Card
          href="/dashboard/new-article"
          title="إضافة مقالة"
          CardImage={<Image src="/add-article.svg" fill alt="Profile" />}
          type="Transparent"
        />

        <Card
          href="/dashboard/new-article"
          title="تعديل مقالة"
          CardImage={<Image src="/edit-article.svg" fill alt="Profile" />}
          type="Transparent"
        />

        <Card
          href="/dashboard/new-article"
          title="تغيير كلمة المرور"
          CardImage={<Image src="/change-password.svg" fill alt="Profile" />}
          type="Transparent"
        />

        <Card
          href="/dashboard/new-article"
          title="تسجيل الخروج"
          CardImage={<Image src="/logout.svg" fill alt="Profile" />}
          type="Transparent"
        />
      </div>
      <SignoutButton />
    </div>
  );
}
