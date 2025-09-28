import Image from "next/image";

export default function ProfileSocialLinks({
  social,
  isEditing,
  onSocialUpdate,
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-900 uppercase">
        Social
      </h3>
      {isEditing ? (
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Image src="/github.svg" width={20} height={20} alt="GitHub" />
            <input
              value={social.github}
              onChange={(e) => onSocialUpdate("github", e.target.value)}
              placeholder="GitHub username"
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md outline-none bg-gray-50 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-3">
            <Image src="/x-twitter.svg" width={20} height={20} alt="Twitter" />
            <input
              value={social.twitter}
              onChange={(e) => onSocialUpdate("twitter", e.target.value)}
              placeholder="Twitter username"
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md outline-none bg-gray-50 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-3">
            <Image src="/linkedin.svg" width={20} height={20} alt="LinkedIn" />
            <input
              value={social.linkedin}
              onChange={(e) => onSocialUpdate("linkedin", e.target.value)}
              placeholder="LinkedIn username"
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md outline-none bg-gray-50 focus:border-blue-500"
            />
          </div>
        </div>
      ) : (
        <div className="flex space-x-4">
          <a
            href={`https://github.com/${social.github}`}
            className="text-gray-400 transition-colors hover:text-gray-600"
          >
            <Image src="/github.svg" width={20} height={20} alt="GitHub" />
          </a>
          <a
            href={`https://twitter.com/${social.twitter}`}
            className="text-gray-400 transition-colors hover:text-blue-500"
          >
            <Image src="/x-twitter.svg" width={20} height={20} alt="Twitter" />
          </a>
          <a
            href={`https://linkedin.com/in/${social.linkedin}`}
            className="text-gray-400 transition-colors hover:text-blue-700"
          >
            <Image src="/linkedin.svg" width={20} height={20} alt="LinkedIn" />
          </a>
        </div>
      )}
    </div>
  );
}
