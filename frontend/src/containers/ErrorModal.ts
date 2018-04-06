import { connect } from "react-redux";
import ErrorModal from "../components/ErrorModal";

interface StateProps {
    error: object;
    errorMessage: object;
}

function mapStateToProps(state): StateProps {
    return {
        error: state.errors.error,
        errorMessage: state.errors.errorMessage,
    };
}

export default connect(mapStateToProps)(ErrorModal);
