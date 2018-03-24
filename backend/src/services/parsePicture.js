const parsePicture = (data) => {
	let jsonData = data.toJSON();
	jsonData.id = jsonData._id;
	delete jsonData._id;
	delete jsonData.__v;
	delete jsonData.name;
	return jsonData;
};

export default parsePicture;
