export function validateEmail(email) {
	// Regex from https://www.tutorialspoint.com/How-to-validate-email-address-in-JavaScript
	const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (email.match(mailformat)) {
		return true;
	} else {
		return false;
	}
}
