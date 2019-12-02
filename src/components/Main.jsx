import React from 'react'
import MainSlide from './MainSlide'
import { Preloader } from "react-materialize"

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      main:[],
      // _isMounted:false
    }
  }

  componentDidMount() {
    // this.fetchData()
  }

  // fetchData = () => {
  //    fetch("api/get?id=2")
  //       .then(blob => blob.json())
  //       .then((data) => {
  //          this.setState({
  //            main:[...data.data.filter(x => x.page == this.props.page)]
  //          }, () => {
  //            setTimeout(() => {
  //              this.setState({
  //                _isMounted:true
  //              })
  //            }, 200)
  //          })
  //       })
  //     }

  renderCarousel = () => {
    // return <MainSlide data = {this.state.main} />
    // console.log(this.props.data, 'props in the main')
    return <MainSlide data = {this.props.data} />
  }

  render() {
    return (
      <div className="fullScreen" id="main">
        // {this.props.mounted ?  ( this.renderCarousel()) : (<div className="react_preloader"><Preloader flashing size="big"/></div>)}
        {this.renderCarousel()}
      </div>
    );
  }
}
