import React from 'react'
import MainSlide from './MainSlide'

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      main:[]
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
     fetch("api/get?id=2")
        .then(blob => blob.json())
        .then((data) => {
           this.setState({
             main:[...data.data.filter(x => x.page == this.props.page)]
           }, () => {
             console.log(this.state.main)
           })
        })
      }

  renderCarousel = () => {
    return <MainSlide data = {this.state.main} />
  }

  render() {
    return (
      <div className="fullScreen" id="main">
        {this._isMounted ?  ( this.renderCarousel()) : (<div>not loaded</div>)}
      </div>
    );
  }
}
