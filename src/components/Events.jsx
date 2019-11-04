import React from 'react'
import { Row, Col } from 'react-materialize'
import { HashLink } from 'react-router-hash-link';

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      Events:''
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
    fetch("api/get?id=4")
    .then(blob => blob.json())
    .then(data => {
      this.setState({
        Events: [...data.data]
      })
    })
  }

  renderEvents = () => {
    return this.state.Events.map((x,y) => {
      return <HashLink to={x.hash}>
               <Col key={x.image}  s={12} m={12/this.state.Events.length} className="eventsCol">
                    <img src={x.image} className="eventPics"/>
                    <div className="imageText">{x.title}</div>
               </Col>
             </HashLink>
      })
    }

  render() {
    return (
      <Row>
        {this._isMounted ? this.renderEvents() : (<div>Not Loaded</div>)}
      </Row>
    );
  }
}
