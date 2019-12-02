import React from 'react'
import { Carousel } from "react-materialize"
import SpecialsCarousel from './SpecialsCarousel'

export default class Specials extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCarousel = () => {
    return <SpecialsCarousel data = {this.props.data} />
  }

  render() {
    return (
      <div id="specials" className="Container fullScreen colFlex lazy" data-function="fetchSpecials" data-array = 'specials' style={{textAlign:"center"}}>
        <h1 id="dailySpecialsHeader">Daily Specials</h1>
        {this.props.mounted ?  ( this.renderCarousel()) : (<div>not loaded</div>)}
      </div>
    );
  }
} 
