"use client";

import Image from "next/image";
import { useState } from "react";

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
      {/* Cover Image */}
      <div className="relative h-64 overflow-hidden md:h-80">
        <img
          src={profile.coverImage}
          alt="Cover"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />

        {/* Edit Cover Button */}
        {isEditing && (
          <button className="absolute p-2 text-gray-700 transition-all duration-200 bg-white rounded-full shadow-lg top-4 right-4 bg-opacity-90 hover:bg-white">
            <Image src="/camera.svg" width={16} height={16} alt="Camera" />
          </button>
        )}
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="relative -mt-24 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
          {/* Header Section */}
          <div className="p-6 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
              {/* Avatar */}
              <div className="relative self-center flex-shrink-0 mb-4 sm:self-auto sm:mb-0">
                <div className="relative">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-24 h-24 border-4 border-white rounded-full shadow-lg md:w-32 md:h-32"
                  />
                  {isEditing && (
                    <button className="absolute p-2 text-white transition-colors duration-200 bg-blue-600 rounded-full shadow-lg bottom-2 right-2 hover:bg-blue-700">
                      <Image
                        src="/camera.svg"
                        width={12}
                        height={12}
                        alt="Camera"
                      />
                    </button>
                  )}
                </div>
              </div>

              {/* Basic Info */}
              <div className="flex-1 text-center sm:text-left">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      value={profile.name}
                      onChange={(e) =>
                        handleProfileUpdate("name", e.target.value)
                      }
                      className="w-full text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-gray-200 outline-none focus:border-blue-500"
                    />
                    <input
                      value={profile.title}
                      onChange={(e) =>
                        handleProfileUpdate("title", e.target.value)
                      }
                      className="w-full text-gray-600 bg-transparent border-b border-gray-200 outline-none focus:border-blue-500"
                    />
                  </div>
                ) : (
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                      {profile.name}
                    </h1>
                    <p className="mt-1 text-gray-600">{profile.title}</p>
                  </div>
                )}

                <div className="flex items-center justify-center mt-2 space-x-4 text-gray-500 sm:justify-start">
                  <div className="flex items-center space-x-1">
                    <Image
                      src="/map-pin.svg"
                      width={16}
                      height={16}
                      alt="Location"
                    />

                    <span className="text-sm">{profile.location}</span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <div className="self-center flex-shrink-0 sm:self-start">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isEditing
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <Image src="/edit.svg" width={16} height={16} alt="Edit" />
                  <span>{isEditing ? "Save" : "Edit"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="px-6 py-4 border-t border-gray-100">
            <div className="flex justify-center space-x-8 sm:justify-start">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">
                  {profile.stats.posts}
                </div>
                <div className="text-sm text-gray-500">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">
                  {profile.stats.followers}K
                </div>
                <div className="text-sm text-gray-500">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">
                  {profile.stats.following}
                </div>
                <div className="text-sm text-gray-500">Following</div>
              </div>
            </div>
          </div>

          {/* Bio and Contact Info */}
          <div className="px-6 py-6 space-y-6">
            {/* Bio */}
            <div>
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-900 uppercase">
                About
              </h3>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                  className="w-full p-3 text-gray-700 border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-blue-500"
                  rows={3}
                />
              ) : (
                <p className="leading-relaxed text-gray-700">{profile.bio}</p>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-900 uppercase">
                Contact
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Image
                    src="/envelope.svg"
                    width={16}
                    height={16}
                    className="flex-shrink-0"
                    alt="Mail"
                  />
                  <span className="text-sm">{profile.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Image
                    src="/globe-black.svg"
                    width={16}
                    height={16}
                    className="flex-shrink-0"
                    alt="Website"
                  />
                  <a
                    href={`https://${profile.website}`}
                    className="text-sm text-blue-600 transition-colors hover:text-blue-800"
                  >
                    {profile.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-900 uppercase">
                Social
              </h3>
              <div className="flex space-x-4">
                <a
                  href={`https://github.com/${profile.social.github}`}
                  className="text-gray-400 transition-colors hover:text-gray-600"
                >
                  <Image
                    src="/github.svg"
                    width={20}
                    height={20}
                    alt="GitHub"
                  />
                </a>
                <a
                  href={`https://twitter.com/${profile.social.twitter}`}
                  className="text-gray-400 transition-colors hover:text-blue-500"
                >
                  <Image
                    src="/x-twitter.svg"
                    width={20}
                    height={20}
                    alt="Twitter"
                  />
                </a>
                <a
                  href={`https://linkedin.com/in/${profile.social.linkedin}`}
                  className="text-gray-400 transition-colors hover:text-blue-700"
                >
                  <Image
                    src="/linkedin.svg"
                    width={20}
                    height={20}
                    alt="LinkedIn"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity or Additional Content */}
        <div className="mt-8 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
          <div className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-start p-3 space-x-3 rounded-lg bg-gray-50">
                <div className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-700">
                    Published "Understanding React Server Components"
                  </p>
                  <p className="mt-1 text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start p-3 space-x-3 rounded-lg bg-gray-50">
                <div className="flex-shrink-0 w-2 h-2 mt-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-700">
                    Updated profile information
                  </p>
                  <p className="mt-1 text-xs text-gray-500">1 week ago</p>
                </div>
              </div>
              <div className="flex items-start p-3 space-x-3 rounded-lg bg-gray-50">
                <div className="flex-shrink-0 w-2 h-2 mt-2 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-700">
                    Joined the Next.js community discussion
                  </p>
                  <p className="mt-1 text-xs text-gray-500">2 weeks ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
