import { connect } from "react-redux";
import ChatMessages from "../components/ChatMessages";
import * as actions from "../actions/ChatMessages";

interface StateProps {
    messages: object;
}

interface DispatchProps {
    getAllMessages: () => any;
    postMessage: (message) => any;
    addMessage: (message) => any;
}

function mapStateToProps(state): StateProps {
    return {
        messages: state.chatMessages.chatMessages,
    };
}

function mapDispatchToProps(dispatch): DispatchProps {
    return {
        getAllMessages: () => dispatch(actions.getAllChatMessages()),
        postMessage: (message) => dispatch(actions.postChatMessage(message)),
        addMessage: (message) => dispatch(actions.addChatMessage(message)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessages);
