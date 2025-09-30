"use client";
import { useState } from "react";
import ProfileCoverImage from "@/components/profile/profile-cover-image";
import ProfileHeader from "@/components/profile/profile-header";
import ProfileStats from "@/components/profile/profile-stats";
import ProfileBio from "@/components/profile/profile-bio";
import ProfileContactInfo from "@/components/profile/profile-contact-info";
import ProfileSocialLinks from "@/components/profile/profile-social-links";
import ProfileRecentActivity from "@/components/profile/profile-recent-activity";

export default function ProfilePageClient({ initialProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(initialProfile);

  const handleProfileUpdate = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialUpdate = (platform, value) => {
    setProfile((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        [platform]: value,
      },
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update error:", err);
      alert("Failed to update profile");
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      handleSaveProfile();
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileCoverImage
        coverImage={profile.coverImage}
        isEditing={isEditing}
      />
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="relative -mt-24 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
          <ProfileHeader
            profile={profile}
            isEditing={isEditing}
            onProfileUpdate={handleProfileUpdate}
            onToggleEdit={toggleEdit}
          />
          <ProfileStats
            stats={{
              postsCount: profile.postsCount,
              followersCount: profile.followersCount,
              followingCount: profile.followingCount,
            }}
          />

          <div className="px-6 py-6 space-y-6">
            <ProfileBio
              bio={profile.bio}
              isEditing={isEditing}
              onBioUpdate={(value) => handleProfileUpdate("bio", value)}
            />

            <ProfileContactInfo
              email={profile.email}
              website={profile.website}
            />

            <ProfileSocialLinks
              social={{
                githubUsername: profile.githubUsername,
                twitterUsername: profile.twitterUsername,
                linkedinUsername: profile.linkedinUsername,
              }}
              isEditing={isEditing}
              onSocialUpdate={handleSocialUpdate}
            />
          </div>
        </div>

        <ProfileRecentActivity activities={profile.activities} />
      </div>
    </div>
  );
}
