import * as React from "react";
import { HashRouter, Link } from "react-router-dom";

class Home extends React.Component {
    public render() {
        return (
            <div>
                Home
                <HashRouter/>
                <Link to="/pictures">Pictures</Link>
            </div>
        );
    }
}

export { Home };
