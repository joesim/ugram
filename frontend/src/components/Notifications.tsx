import * as React from "react";
import Snackbar from "material-ui/Snackbar";
import { closeNotification } from "../actions/Notifications";

interface Props {
    open: boolean;
    message: string;
    closeNotification: () => any;
}

class Notifications extends React.Component<any, any> {
    public constructor(props) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <Snackbar
                open={this.props.open}
                message={this.props.message}
                autoHideDuration={4000}
                onRequestClose={this.props.closeNotification}
            />
        );
    }
}

export default Notifications;
