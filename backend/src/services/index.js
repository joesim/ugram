import * as HomeServices from "./home";
import * as UploadServices from "./upload";

const parseEntry = (data) => {
		let jsonData = data.toJSON();
		delete jsonData._id;
		delete jsonData.__v;
		if (typeof jsonData.registrationDate != "undefined") {
			jsonData.registrationDate = jsonData.registrationDate.getTime();
			jsonData.registrationDate = jsonData.registrationDate.getTime();
		}
		if (jsonData.createdDate != undefined) {
			if (typeof jsonData.createdDate != "undefined") {
				jsonData.createdDate = jsonData.createDate.getTime();
				jsonData.createdDate = jsonData.createdDate.getTime();
			}
		}
		return jsonData;
};

export { HomeServices, UploadServices, parseEntry };
