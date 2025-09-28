"use client";

import { useState } from "react";

import ProfileCoverImage from "@/components/profile/profile-cover-image";
import ProfileHeader from "@/components/profile/profile-header";
import ProfileStats from "@/components/profile/profile-stats";
import ProfileBio from "@/components/profile/profile-bio";
import ProfileContactInfo from "@/components/profile/profile-contact-info";
import ProfileSocialLinks from "@/components/profile/profile-social-links";
import ProfileRecentActivity from "@/components/profile/profile-recent-activity";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Chen",
    title: "Full Stack Developer & Technical Writer",
    location: "San Francisco, CA",
    email: "alex@example.com",
    website: "alexchen.dev",
    bio: "Passionate about creating beautiful web experiences and sharing knowledge through writing. I love exploring new technologies and building tools that make developers' lives easier.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    coverImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop",
    social: {
      github: "alexchen",
      twitter: "alexchen_dev",
      linkedin: "alex-chen-dev",
    },
    stats: {
      posts: 42,
      followers: 1.2,
      following: 384,
    },
  });

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
            onToggleEdit={() => setIsEditing(!isEditing)}
          />

          <ProfileStats stats={profile.stats} />

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
              social={profile.social}
              isEditing={isEditing}
              onSocialUpdate={handleSocialUpdate}
            />
          </div>
        </div>

        <ProfileRecentActivity />
      </div>
    </div>
  );
}
