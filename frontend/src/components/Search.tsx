import { Tab, Tabs } from "material-ui/Tabs";
import * as React from "react";
import PicturesPanel from "../containers/PicturesPanel";
import SearchAll from "../containers/SearchAll";
import Users from "../containers/Users";

const tabStyle = {
    color: "black",
};

class Search extends React.Component<any, any> {
    public constructor(props) {
        super(props);
        this.state = {
            searchterm: this.props.match.params.id,
            value: "all",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    public handleChange = (value) => {
        this.setState({
            value,
        });
    }

    public componentWillReceiveProps(nextProps) {
        this.setState({searchterm: nextProps.match.params.id});
    }

    public render(): JSX.Element {

        let searchAll = null;
        if (this.state.value === "all") {
            searchAll = <SearchAll handler={this.handleChange} query={this.state.searchterm}/>;
        }

        let users = null;
        if (this.state.value === "users") {
            users = <Users query={this.props.match.params.id}/>;
        }

        let picturesDesc = null;
        if (this.state.value === "images") {
            picturesDesc = <PicturesPanel category="description" query={this.props.match.params.id} />;
        }

        let picturesHashtags = null;
        if (this.state.value === "hashtags") {
            picturesHashtags = <PicturesPanel category="hashtags" query={this.props.match.params.id} />;
        }

        return (
            <div>
                <div>
                    <div className="toolbar-custom-search" />

                    <div className="container">
                        <Tabs value={this.state.value} onChange={this.handleChange} inkBarStyle={{ background: "black" }}>
                            <Tab value="all" style={tabStyle} label="All" >
                                {searchAll}
                            </Tab>
                            <Tab value="users" style={tabStyle} label="Users" >
                                {users}
                            </Tab>
                            <Tab value="images" style={tabStyle} label="Pictures" >
                                {picturesDesc}
                            </Tab>
                            <Tab value="hashtags" style={tabStyle} label="Mentions" >
                                {picturesHashtags}
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
