import { formats } from "../constants"
import { getFileNameWithSuffix } from '../services';

const parsePicture = (data) => {
	let jsonData = data.toJSON();
	jsonData.id = jsonData._id;
	delete jsonData._id;
	delete jsonData.__v;
	delete jsonData.name;

	for (let i in formats) {
		if (formats[i][2] != "") {
			jsonData["url" + formats[i][2]] = getFileNameWithSuffix(jsonData.url, formats[i][2]);
		}
	}

	return jsonData;
};

export default parsePicture;
