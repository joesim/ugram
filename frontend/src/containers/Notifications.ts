import { connect } from "react-redux";
import * as actions from "../actions/Notifications";
import Notifications from "../components/Notifications";

function mapStateToProps(state) {
    return {
        message: state.notifications.message,
        open: state.notifications.open,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        closeNotification: () => dispatch(actions.closeNotification()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
