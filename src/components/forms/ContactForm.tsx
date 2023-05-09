import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import React from "react";
import Button from "../basic/Button";
import Input from "../basic/Input";
import Textarea from "../basic/Textarea";

type ContactFormProps = {};

const ContactForm: React.FC<ContactFormProps> = () => {
	// const subject = "Modderize Contact Form: Inquiry";
	return (
		<div>
			Please direct any questions or feedback regarding the site to Bianca
			Morris on{" "}
			<a
				href="https://www.linkedin.com/in/biancamorris"
				target={"_blank"}
				rel="noreferrer noopener"
			>
				LinkedIn
			</a>{" "}
			or{" "}
			<a
				href="https://www.github.com/bianca-morris"
				target={"_blank"}
				rel="noreferrer noopener"
			>
				Github
			</a>
			. Thank you!
		</div>
		// <form
		// 	action="mailto:biancaallynm@protonmail.com"
		// 	method="get"
		// 	encType="text/plain"
		// >
		// 	{/* Preventing spam w/honeypot field */}
		// 	<label className="hidden" aria-hidden>
		// 		Skynet
		// 	</label>
		// 	<input
		// 		className="hidden"
		// 		aria-hidden
		// 		name="skynet"
		// 		pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
		// 		placeholder="name@domain.com"
		// 	></input>
		// 	{/* Statically defining subject */}
		// 	<input
		// 		type="text"
		// 		name="subject"
		// 		placeholder="Your Name"
		// 		hidden
		// 		readOnly
		// 		aria-hidden
		// 		value={subject}
		// 	/>
		// 	{/* Actual user-facing fields */}
		// 	<label htmlFor="contact-email" className="block">
		// 		Email:
		// 	</label>
		// 	<Input
		// 		required
		// 		id="contact-email"
		// 		type="email"
		// 		name="contact-email"
		// 		placeholder="Your Email"
		// 		cls="text-gray-800"
		// 		maxLength={40}
		// 	/>
		// 	<label htmlFor="body" className="block mt-2">
		// 		Message:
		// 	</label>
		// 	<Textarea
		// 		required
		// 		id="body"
		// 		name="body"
		// 		placeholder="Your Message"
		// 		cls="text-gray-800"
		// 		maxLength={500}
		// 	/>
		// 	<Button variant="violet" type="submit" cls="mt-3">
		// 		<PaperAirplaneIcon className="w-4 h-4 mr-2" />
		// 		Submit
		// 	</Button>
		// </form>
	);
};
export default ContactForm;
