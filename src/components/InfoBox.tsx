import Link from "next/link";

interface InfoBoxProps {
  heading: string;
  children: string;
  buttonInfo: {
    text: string;
    directTo: string;
  };
  backgroundColor?: string;
  buttonBackgroundColor?: string;
  buttonBackgroundHoverColor?: string;
}

export default function InfoBox({
  heading,
  children,
  buttonInfo,
  backgroundColor = "bg-gray-100",
  buttonBackgroundColor = "bg-black",
  buttonBackgroundHoverColor = "bg-gray-700",
}: Readonly<InfoBoxProps>) {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold">{heading}</h2>
      <p className="mt-2 mb-4">{children}</p>
      <Link href={buttonInfo.directTo} className={`${buttonBackgroundColor} inline-block text-white rounded-lg px-4 py-2 hover:${buttonBackgroundHoverColor}`}>
        {buttonInfo.text}
      </Link>
    </div>
  );
}
