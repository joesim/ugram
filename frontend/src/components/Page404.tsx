import * as React from "react";
import Image from 'material-ui-image'

class Page404 extends React.Component {
  public render() {
      return (
          <div className="notfound">
            <div className="imgNotFound">
              <img src="../../assets/404notfound.jpg" alt="404notfound"/>
            </div>
            Oops, it seems you are lost..
          </div>
      );
  }
}

export {Page404};
