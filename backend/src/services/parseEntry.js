const parseEntry = (data) => {
	let jsonData = data.toJSON();
	delete jsonData._id;
	delete jsonData.__v;

	return jsonData;
};

export default parseEntry;
