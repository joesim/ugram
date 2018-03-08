import * as React from "react";
import { Tabs, Tab } from 'material-ui/Tabs';
import SearchAll from './SearchAll';
import SearchHashtags from './SearchHashtags';
import SearchImages from './SearchImages';
import SearchUsers from './SearchUsers';

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
        return (
            <div>
                <div>
                    <div className="toolbar-custom-search">

                    </div>
                    <div className="container">
                        <Tabs value={this.state.value} onChange={this.handleChange} inkBarStyle={{ background: 'black' }}>
                            <Tab value="all" style={tabStyle} label="All" >
                                <SearchAll handler={this.handleChange}/>
                            </Tab>
                            <Tab value="users" style={tabStyle} label="Users" >
                                <SearchUsers />
                            </Tab>
                            <Tab value="images" style={tabStyle} label="Images" >
                                <SearchImages />
                            </Tab>
                            <Tab value="hashtags" style={tabStyle} label="Hashtags" >
                                <SearchHashtags />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
