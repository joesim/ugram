import { s3 } from "../common/s3";
import logger from "../common/logger";

const deleteImage = (fileName, res) => {
    let params = {
        Bucket: process.env.BUCKET_IMAGE_NAME,
        Key: fileName
    };

    s3.deleteObject(params, function(err, data) {
        if (err) {
            errorMessage(res, 500, 'Internal server error');
        }
    });
}

export default deleteImage;
