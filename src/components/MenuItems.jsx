import React from 'react'
import {Row, Col, Carousel, Button} from 'react-materialize'
import { HashLink } from 'react-router-hash-link';

export default class MenuItems extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true;

  }

  componentWillUnmount() {
   this._isMounted = false;
  }

  switchCar = (y,x) => {
    M.Carousel.getInstance(this.refs.menuCarousel.instance.el).set(y)
    setTimeout(() => {
      this.moveMenu(x);
    }, 1000)
  }

  moveMenu = (item) => {
    let new_kid = $(`#${item}`)[0];
    new_kid.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                          inline:"start"
                        });

  }

  render() {
      return (this._isMounted ? (
              <div style={{textAlign:"center", margin:"30px 0"}}>
                {
                  this.props.data.map((x,y) => <Button key={x.title} className="carControllers" onClick={() => this.switchCar(y, x.title.split(" ")[0][0])} style={{ margin:"5px 8px" }}>{x.title}</Button>)
                }
                <Carousel ref="menuCarousel" className="menuCarousel" options={{ fullWidth:true }} >
                  {
                    this.props.data.map(x => {
                      return <div key={x.title} id={x.title.split(" ").join("")} >
                                <div style={{ textAlign:"center", margin:"30px 0" }} id={x.title.split(" ")[0][0]}> {
                                    x.subtitles.map(y => <Button key={y.title} style={{ margin:"8px"}} onClick={() => this.moveMenu(y.title.split(" ").filter(x => x != "&").join(""))}>{y.title}</Button>)
                                  }
                                </div>
                                <div> {
                                   x.subtitles.map((y,q) => {
                                       return <div key={y.title} style={{ textAlign:"center" }} id={y.title.split(" ").filter(x => x != "&").join("")}>
                                                <h3 >{y.title}
                                                    <i className="material-icons" style={{margin:"10px", fontSize:"32px", cursor:"pointer"}} onClick={() => this.moveMenu(x.title.split(" ")[0][0])}>expand_less</i>
                                                </h3>
                                                <Row>
                                                  {
                                                    y.items.map(z => <Col s={12}
                                                                          m={12}
                                                                          l ={6}
                                                                          key={z.name}
                                                                          style={{ textAlign:"center",
                                                                                   height:"8em",
                                                                                   padding:"10px" }}>
                                                                        <h6 style={{ fontWeight:"1000" }}>
                                                                          {z.name} {z.price}
                                                                        </h6>
                                                                        <div>{z.text}</div>
                                                                     </Col>
                                                      )
                                                  }
                                                </Row>
                                              </div>
                                          })
                                      }
                                 </div>
                              </div>
                          })
                        }
                    </Carousel>
                 </div>) : (<div>daddys home</div>))
           }
}
