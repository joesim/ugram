import * as HomeServices from "./home";
import * as UploadServices from "./upload";

const parseEntry = (data) => {
<<<<<<< HEAD
    let jsonData = data.toJSON();
    delete jsonData._id;
    delete jsonData.__v;

    if (typeof jsonData.registrationDate != 'undefined') {
        jsonData.registrationDate = jsonData.registrationDate.getTime();
    }
    if (typeof jsonData.createdDate != 'undefined') {
        jsonData.createdDate = jsonData.createdDate.getTime();
    }

    for (let key in jsonData) {
        jsonData[key] = jsonData[key].toString();
    }

    return jsonData;
=======
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
>>>>>>> a92b826ae47a6b25dcf8a1d84c12109cdc0e4fb1
};

export { HomeServices, UploadServices, parseEntry };
