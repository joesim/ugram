import { mongoose } from './mongoose';
import { ConnectedClientsModel, NotificationModel } from "../models";
import logger from './logger'

const cleanDB = () => {
    mongoose.connection.on("connected", () => {
        ConnectedClientsModel.remove({}, () => logger.info('Old connections instances removed'));
        // NotificationModel.remove({}, () => logger.info('Old notifications instances removed'));
        console.log(NotificationModel);
        // console.log(ConnectedClientsModel);
    });
}

export default cleanDB ;