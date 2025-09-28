export default function ProfileStats({ stats }) {
  return (
    <div className="px-6 py-4 border-t border-gray-100">
      <div className="flex justify-center space-x-8 sm:justify-start">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">{stats.posts}</div>
          <div className="text-sm text-gray-500">Posts</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">
            {stats.followers}K
          </div>
          <div className="text-sm text-gray-500">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">
            {stats.following}
          </div>
          <div className="text-sm text-gray-500">Following</div>
        </div>
      </div>
    </div>
  );
}
