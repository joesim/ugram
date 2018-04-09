import { ConnectedClientsModel, UserModel } from "../models";

const connectClient = async(socketId, data) => {
    try {
        const accessToken = data.accessToken;
        const userModel = await UserModel.findOne({accessToken});
        const userId = userModel.id;

        const connectedClientsModel = await findOneOrCreate(ConnectedClientsModel, userId);
        const connectedInstances = [...connectedClientsModel.connectedInstances, socketId];
        // TODO the model doesn't update
        await connectedClientsModel.update({userId:userId}, {connectedInstances: connectedInstances});
    } catch (error) {
        
    }

}

const disconnectClient = async(socketId) => {
    try {
        console.log('ici');
        const connectedClientsModel = await ConnectedClientsModel.findOne({socketId});
        const index = connectedClientsModel.connectedInstances.indexOf(socketId);
        const connectedInstances = connectedClientsModel.connectedInstances;
        console.log(connectedClientsModel);
        if(index != -1) {
            connectedInstances.splice(index, 1);
        }
        await connectedClientsModel.update({userId:userId}, {connectedInstances: connectedInstances});
    } catch (error) {
        
    }
    
}

const findOneOrCreate = async(model, id) => {
    const modelFound = await model.findOne({id}) === null ? await model.create({userId:id}) : await model.findOne({id});
    console.log(modelFound);
    return modelFound;
}


export { connectClient, disconnectClient };