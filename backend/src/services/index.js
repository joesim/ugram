import * as HomeServices from './home';
import * as UploadServices from './upload';

const parseEntry = (data) => {
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
};

export { HomeServices, UploadServices, parseEntry };
