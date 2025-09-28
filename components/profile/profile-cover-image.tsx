import Image from "next/image";

export default function ProfileCoverImage({ coverImage, isEditing }) {
  return (
    <div className="relative h-64 overflow-hidden md:h-80">
      <img
        src={coverImage}
        alt="Cover"
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20" />

      {isEditing && (
        <button className="absolute p-2 text-gray-700 transition-all duration-200 bg-white rounded-full shadow-lg top-4 right-4 bg-opacity-90 hover:bg-white">
          <Image src="/camera.svg" width={16} height={16} alt="Camera" />
        </button>
      )}
    </div>
  );
}
