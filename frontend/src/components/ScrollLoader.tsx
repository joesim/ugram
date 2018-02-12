import * as React from "react";

interface Props {
    scrollHandler: any;
}

class ScrollLoader extends React.Component<Props, any> {

    public constructor(props) {
        super(props);

        this.state = {
            loading: "hidden",
        };

        this.handleOnScroll = this.handleOnScroll.bind(this);
    }

    public componentDidMount() {
        window.addEventListener("scroll", this.handleOnScroll);
    }

    public componentWillUnmount() {
        window.removeEventListener("scroll", this.handleOnScroll);
    }

    public render() {
        return (
            <div className="loader">
                <i
                    className="material-icons rotating"
                    style={{
                        visibility: this.state.loading,
                    }}
                >
                    cached
                </i>
            </div>
        );
    }

    private handleOnScroll() {
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {
            this.props.scrollHandler();
            this.setState({loading: ""});

            setTimeout(() => {
                this.setState({loading: "hidden"});
            }, 2500);
        }
    }
}

export default ScrollLoader;
