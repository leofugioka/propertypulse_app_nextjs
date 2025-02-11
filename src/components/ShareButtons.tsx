"use client";

import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, XIcon, WhatsappIcon } from "react-share";

interface ShareButtonsProps {
  propertyId: string;
  propertyName: string;
  propertyType: string;
}

const ShareButtons = ({ propertyId, propertyName, propertyType }: Readonly<ShareButtonsProps>) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${propertyId}`;

  return (
    <>
      <h3 className="text-xl font-bold text-center pr-2">Share This Property:</h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton url={shareUrl} hashtag={`#${propertyType.replace(/\s/g, "")}ForRent`}>
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} hashtags={[`${propertyType.replace(/\s/g, "")}ForRent`]} title={propertyName}>
          <XIcon size={40} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl} title={propertyName}>
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
