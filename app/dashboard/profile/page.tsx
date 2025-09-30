import { getUserProfile } from "@/actions/user-actions";
import ProfilePageClient from "@/components/profile/profile-page-client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  // Fetch profile data (server-side)
  const profileData = await getUserProfile(session?.user?.email);

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600">Profile not found</p>
      </div>
    );
  }

  // Pass data to Client Component
  return <ProfilePageClient initialProfile={profileData} />;
}
