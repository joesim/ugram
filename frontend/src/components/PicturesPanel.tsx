
import * as React from "react";

interface Props {
	pictures_panel: object,
	getAllPictures: any,
}

class PicturesPanel extends React.Component<Props, any> {

	public constructor(props) {
		super(props)
	}

	public componentDidMount() {
		this.props.getAllPictures()
	}

	public render() {
		return (
			<div>
				PicturesPanel
			</div>
		);
	}
};


export default PicturesPanel;
