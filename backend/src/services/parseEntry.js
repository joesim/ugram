const parseEntry = (data) => {
	let jsonData = data.toJSON();
	delete jsonData._id;
	delete jsonData.__v;

	if (jsonData.accessToken !== undefined)
		delete jsonData.accessToken;

	return jsonData;
};

export default parseEntry;
