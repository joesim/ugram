import * as React from "react";

export interface IHelloWorldProps {
    firstname: string;
    lastname: string;
}

export class HelloWorld extends React.Component<IHelloWorldProps, any> {
    public render() {
        return (
        <h1>
            Hello {this.props.firstname} {this.props.lastname}!
        </h1>
        );
    }
}
