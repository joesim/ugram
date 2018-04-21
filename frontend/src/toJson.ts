/**
 * This function is a toJson function hack of the unsplash-js package
 * for fix a strange bug
 * @param data Object Result of the request on Unsplash API
 * @returns {{errors: string[]}}
 */
const toJson = (data) => {
	if (typeof data.json === "function") {
		if (data.status === 403) {
			return { errors: ["Limit of requests per hour reached"] };
		}
		return data.json();
	}
	return data;
};

export default toJson;
