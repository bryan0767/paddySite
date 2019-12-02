import React from 'react'
import { Row, Col } from 'react-materialize'
import { HashLink } from 'react-router-hash-link';

export default class Events extends React.Component {
  constructor(props) {
    super(props);
  }

  renderEvents = () => {
    return this.props.data.map((x,y) => {
      return <HashLink to={x.hash}>
               <Col key={x.image}  s={12} m={12/this.props.data.length} className="eventsCol">
                    <img src={x.image} className="eventPics"/>
                    <div className="imageText">{x.title}</div>
               </Col>
             </HashLink>
      })
    }

  render() {
    return (
      <Row id="events" className="lazy" data-function = 'fetchEvents' data-array="events">
        {this.props.mounted ? this.renderEvents() : (<div></div>)}
      </Row>
    );
  }
}
