export default function RecentActivity({ activities = [] }) {
  // Helper function to get activity color based on type
  const getActivityColor = (type) => {
    const colorMap = {
      POST_PUBLISHED: "bg-blue-500",
      PROFILE_UPDATED: "bg-green-500",
      COMMUNITY_JOINED: "bg-purple-500",
      COMMENT_CREATED: "bg-yellow-500",
      PROJECT_CREATED: "bg-red-500",
    };
    return colorMap[type] || "bg-gray-500";
  };

  // Helper function to format date to relative time
  const formatTimeAgo = (date) => {
    if (!date) return "Unknown";

    const now = new Date();
    const activityDate = new Date(date);
    const diffMs = now - activityDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);

    if (diffDays < 1) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffWeeks === 1) return "1 week ago";
    if (diffWeeks < 4) return `${diffWeeks} weeks ago`;
    if (diffMonths === 1) return "1 month ago";
    return `${diffMonths} months ago`;
  };

  // Transform activities with colors and formatted dates
  const styledActivities = activities.map((activity) => ({
    ...activity,
    color: getActivityColor(activity.type),
    formattedTime: formatTimeAgo(activity.createdAt),
  }));

  return (
    <div className="mt-8 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
      <div className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {styledActivities.length === 0 ? (
            <p className="py-8 text-sm text-center text-gray-500">
              No recent activity
            </p>
          ) : (
            styledActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start p-3 space-x-3 rounded-lg bg-gray-50"
              >
                <div
                  className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${activity.color}`}
                ></div>
                <div>
                  <p className="text-sm text-gray-700">{activity.title}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {activity.formattedTime}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
