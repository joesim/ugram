import { ConnectedClientsModel, UserModel } from "../models";

const connectClient = async(socketId, data) => {
    try {
        const accessToken = data.accessToken;
        const user = await UserModel.findOne({accessToken});
        console.log(user.id);
        // const user = new ConnectedClientsModel(userInfos);
    } catch (error) {
        
    }
    console.log(`client connecté: ${socketId}`)
    console.log(`token: ${data.accessToken}`)
}

const disconnectClient = (reason ,socketId) => {
    console.log(`client déconnecté: ${socketId}, ${reason}`);
}

export { connectClient, disconnectClient };