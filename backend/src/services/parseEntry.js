const parseEntry = (data) => {
	let jsonData = data.toJSON();
	delete jsonData._id;
	delete jsonData.__v;

	if (jsonData.accessToken !== undefined)
		delete jsonData.accessToken;
	if (jsonData.password !== undefined)
		delete jsonData.password;
	return jsonData;
};

export default parseEntry;
