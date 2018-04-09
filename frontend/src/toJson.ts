const toJson = (data) => {
	if (typeof data.json === "function") {
		if (data.status === 403) {
			return { errors: ["Limit reached"] };
		}
		return data.json();
	}
};

export default toJson;
