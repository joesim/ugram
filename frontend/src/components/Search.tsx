import * as React from "react";
import { Tabs, Tab } from 'material-ui/Tabs';
import SearchAll from '../containers/SearchAll';
import Users from "../containers/Users";
import PicturesPanel from "../containers/PicturesPanel";

const tabStyle = {
    color: "black"
}

class Search extends React.Component<any, any> {
    public constructor(props) {
        super(props);
        this.state = {
            value: 'all',
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };


    public render(): JSX.Element {

        let searchAll = null;
        if (this.state.value === "all"){
            searchAll = <SearchAll handler={this.handleChange} query={this.props.match.params.id}/>
        }
        
        let users = null;
        if (this.state.value === "users"){
            users = <Users query={this.props.match.params.id}/>
        }

        let picturesDesc = null;
        if (this.state.value === "images"){
            picturesDesc = <PicturesPanel category="description" query={this.props.match.params.id} />
        }

        let picturesHashtags = null;
        if (this.state.value === "hashtags"){
            picturesHashtags = <PicturesPanel category="hashtags" query={this.props.match.params.id} />
        }


        return (
            <div>
                <div>
                    <div className="toolbar-custom-search">
                    </div>
                    <div className="container">
                        <Tabs value={this.state.value} onChange={this.handleChange} inkBarStyle={{ background: 'black' }}>
                            <Tab value="all" style={tabStyle} label="All" >
                                {searchAll}
                            </Tab>
                            <Tab value="users" style={tabStyle} label="Users" >
                                {users}
                            </Tab>
                            <Tab value="images" style={tabStyle} label="Images" >
                                {picturesDesc}
                            </Tab>
                            <Tab value="hashtags" style={tabStyle} label="Hashtags" >
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
