import React, { LegacyRef, PropsWithChildren, useRef, useState } from "react";
import {
	EmailShareButton,
	FacebookShareButton,
	RedditShareButton,
	TumblrShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	EmailIcon,
	FacebookIcon,
	RedditIcon,
	TumblrIcon,
	TwitterIcon,
	WhatsappIcon
} from "react-share";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";

interface SharePopoverProps extends PropsWithChildren {
	url: string;
}

const SharePopover: React.FC<SharePopoverProps> = ({ children, url }) => {
	let referenceElement = useRef(null);
	let popperElement = useRef(null);
	let { styles, attributes } = usePopper(
		referenceElement.current,
		popperElement.current
		// { placement: "auto-start" } // TODO: Fix weirdness with popover positioning
	);
	return (
		<Popover>
			<Popover.Button ref={referenceElement}>{children}</Popover.Button>

			<Popover.Panel
				ref={popperElement}
				style={styles.popper}
				{...attributes.popper}
			>
				<div className="mt-5 px-10 py-5 bg-white shadow-lg rounded-md border border-solid border-grey-100">
					<div className="font-bold">Share This Page</div>
					<div>
						<EmailShareButton {...{ url }}>
							<EmailIcon round size={40} />
						</EmailShareButton>
						<FacebookShareButton {...{ url }} hashtag="modderize">
							<FacebookIcon round size={40} />
						</FacebookShareButton>
						<RedditShareButton {...{ url }}>
							<RedditIcon round size={40} />
						</RedditShareButton>
						<TumblrShareButton {...{ url }}>
							<TumblrIcon round size={40} />
						</TumblrShareButton>
						<TwitterShareButton
							{...{ url }}
							hashtags={["modderize"]}
						>
							<TwitterIcon round size={40} />
						</TwitterShareButton>
						<WhatsappShareButton {...{ url }}>
							<WhatsappIcon round size={40} />
						</WhatsappShareButton>
					</div>
				</div>
			</Popover.Panel>
		</Popover>
	);
};
export default SharePopover;