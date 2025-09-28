export default function ProfileRecentActivity() {
  const activities = [
    {
      id: 1,
      text: 'Published "Understanding React Server Components"',
      time: "2 days ago",
      color: "bg-blue-500",
    },
    {
      id: 2,
      text: "Updated profile information",
      time: "1 week ago",
      color: "bg-green-500",
    },
    {
      id: 3,
      text: "Joined the Next.js community discussion",
      time: "2 weeks ago",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="mt-8 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
      <div className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start p-3 space-x-3 rounded-lg bg-gray-50"
            >
              <div
                className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${activity.color}`}
              ></div>
              <div>
                <p className="text-sm text-gray-700">{activity.text}</p>
                <p className="mt-1 text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
