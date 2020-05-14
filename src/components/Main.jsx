import React from 'react'
import MainSlide from './MainSlide'
import { Preloader } from "react-materialize"

export default class Main extends React.Component {

  renderCarousel = () => {
    return <MainSlide data = {this.props.data} />
  }

  render() {
    return (
      <div className="fullScreen" id="main">
        {this.renderCarousel()}
      </div>
    );
  }
}
