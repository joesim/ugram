import FontIcon from "material-ui/FontIcon";
import * as React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

class SearchBar extends React.Component<any, any> {

    public constructor(props) {
        super(props);
        this.state = {
            navigate: false,
            value: "",
        };
    }

    public handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    public handleKeyPress = (e) => {
        if (e.key === "Enter") {
            this.setState({navigate: true});
        }
    }

    public render(): JSX.Element {

        if (this.state.navigate) {
            this.setState({navigate: false});
            return <Redirect to={"/search/" + this.state.value} push={true}/>;
        }

        return (
            <div className="width-search">
                <div className="search">
                    <input value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress} type="text" className="searchTerm" placeholder="Search" />
                    <button type="submit" className="searchButton">
                        <Link to={"/search/" + this.state.value} ><FontIcon className="material-icons">search</FontIcon></Link>
                    </button>
                </div>
            </div>
        );
    }
}

export default SearchBar;
