import * as React from "react";
import { Link } from 'react-router-dom'

class Home extends React.Component {
    public render() {
        return (
            <div>
                Home
                <Link to="/pictures">Pictures</Link>
            </div>
        );
    }
}

export { Home };
