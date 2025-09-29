export default function ProfileBio({ bio, isEditing, onBioUpdate }) {
  console.log("bio", bio);
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-900 uppercase">
        About
      </h3>
      {isEditing ? (
        <textarea
          value={bio}
          onChange={(e) => onBioUpdate(e.target.value)}
          className="w-full p-3 text-gray-700 border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-blue-500"
          rows={3}
        />
      ) : (
        <p className="leading-relaxed text-gray-700">{bio}</p>
      )}
    </div>
  );
}
