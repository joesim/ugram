function getFileNameWithSuffix(fileName, suffix) {
	let actualFileName = fileName.substr(0, fileName.lastIndexOf("."));
	actualFileName += suffix + fileName.substr(fileName.lastIndexOf("."));
	return actualFileName;
}

export default getFileNameWithSuffix;
