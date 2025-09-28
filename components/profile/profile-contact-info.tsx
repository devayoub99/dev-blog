import Image from "next/image";

export default function ProfileContactInfo({ email, website }) {
  return (
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
          <span className="text-sm">{email}</span>
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
            href={`https://${website}`}
            className="text-sm text-blue-600 transition-colors hover:text-blue-800"
          >
            {website}
          </a>
        </div>
      </div>
    </div>
  );
}
