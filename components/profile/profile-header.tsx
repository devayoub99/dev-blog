import Image from "next/image";

export default function ProfileHeader({
  profile,
  isEditing,
  onProfileUpdate,
  onToggleEdit,
}) {
  return (
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
                <Image src="/camera.svg" width={12} height={12} alt="Camera" />
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
                onChange={(e) => onProfileUpdate("name", e.target.value)}
                className="w-full text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-gray-200 outline-none focus:border-blue-500"
              />
              <input
                value={profile.title}
                onChange={(e) => onProfileUpdate("title", e.target.value)}
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
              <Image src="/map-pin.svg" width={16} height={16} alt="Location" />
              <span className="text-sm">{profile.location}</span>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <div className="self-center flex-shrink-0 sm:self-start">
          <button
            onClick={onToggleEdit}
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
  );
}
