import Unsplash from "unsplash-js";
import * as React from "react";
import FontIcon from "material-ui/FontIcon";
import Avatar from "material-ui/Avatar";
import toJson from "../../toJson";

interface UnsplashProfileProps {
	profile: {
		downloads: number,
		followers_count: number,
		total_likes: number,
		name: string,
		username: string,
	};
}

interface UnsplashProfileState {
	profile: {
		downloads: number,
		followers: number,
		likes: number,
		name: string,
		username: string,
		profilePhoto?: string;
	};
	unsplash: any;
}

class UnsplashProfile extends React.Component<UnsplashProfileProps, UnsplashProfileState> {
	constructor(props) {
		super(props);

		this.state = {
			profile: null,
			unsplash: new Unsplash({
				bearerToken: localStorage.getItem("unsplashBearer"),
			}),
		};
		this.fetchProfilePhoto = this.fetchProfilePhoto.bind(this);
		this.fetchProfilePhoto(this.props.profile);
	}

	public fetchProfilePhoto(currentUser) {
		this.state.unsplash.users.profile(currentUser.username)
			.then(toJson)
			.then((userPublicProfile) => {
				if (userPublicProfile.errors) {
					return;
				}
				const profile = {
					downloads: currentUser.downloads,
					followers: currentUser.followers_count,
					likes: currentUser.total_likes,
					name: currentUser.name,
					username: currentUser.username,
				};
				if (currentUser.errors) {
					this.setState({ profile });
					return;
				}
				profile["profilePhoto"] = userPublicProfile.profile_image.small;
				this.setState({ profile });
			});
	}

	public render() {
		if (this.state.profile === null) {
			return null;
		}
		return (
			<div id="unsplashProfile">
				<div className="flex-container">
					<div className="rowUser">
						<div className="infoItem">
							<div className="rowNoSpace mb-5">
								<div className="mr-30 ml-30 flex-justify-center flex-row-wrap flex-align-items-center">
									<Avatar className="ml-15 mr-15 avatarStyle" src={this.state.profile.profilePhoto} />
									<div className="h4 font-weight-bold">{this.state.profile.name}</div>
									<div className="ml-10">@{this.state.profile.username}</div>
								</div>
							</div>
							<div className="rowNoSpace">
								<div className="rowNoWrap ml-25 mr-15">
									<FontIcon className="material-icons mr-10 ml-10">arrow_downward</FontIcon>
									<div>
										{this.state.profile.downloads}
									</div>
								</div>
								<div className="rowNoWrap ml-15 mr-25">
									<FontIcon className="material-icons mr-10 ml-10">favorite</FontIcon>
									<div>
										{this.state.profile.likes}
									</div>
								</div>
								<div className="rowNoWrap ml-15 mr-25">
									<FontIcon className="material-icons mr-10 ml-10">group</FontIcon>
									<div>
										{this.state.profile.followers}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default UnsplashProfile;
