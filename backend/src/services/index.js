import * as HomeServices from './home';
import * as UploadServices from './upload';

const parseEntry = (data) => {
    let jsonData = data.toJSON();
    delete jsonData._id;
    delete jsonData.__v;

    // if (jsonData.registrationDate != undefined) {
    //     jsonData.registrationDate = jsonData.registrationDate.getTime();
    // }

    // if (jsonData.createdDate != undefined) {
    //     jsonData.createdDate = jsonData.createDate.getTime();
    // }

    return jsonData;
};

export { HomeServices, UploadServices, parseEntry };
