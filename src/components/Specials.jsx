import React from 'react'
import { Carousel } from "react-materialize"
import SpecialsCarousel from './SpecialsCarousel'

class Specials extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      specials:[]
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchData()
  }

  componentWillUnmount() {
   this._isMounted = false;
  }

  fetchData = () => {
    fetch("api/get?id=3")
    .then(blob => blob.json())
    .then(data => {
      this.setState({
        specials: [...data.data.slides]
      })
    })
  }

  renderCarousel = () => {
    return <SpecialsCarousel data = {this.state.specials} />
  }

  render() {
    return (
      <div id="specials" className="Container fullScreen colFlex" style={{textAlign:"center"}}>
        <h1>Daily Specials</h1>
        {this._isMounted ?  ( this.renderCarousel()) : (<div>not loaded</div>)}
      </div>
    );
  }
}
export default Specials
