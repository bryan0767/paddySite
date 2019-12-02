import React from 'react'
import {Row, Col, Carousel, Button} from 'react-materialize'
import { HashLink } from 'react-router-hash-link';

export default class MenuItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prices:this.props.prices
    }
  }

  switchCar = (y,x) => {
    M.Carousel.getInstance(this.refs.menuCarousel.instance.el).set(y)
    setTimeout(() => {
      this.moveMenu(x);
    }, 1000)
  }

  moveMenu = (item) => {
    let new_item = $(`#${item}`)[0];
    new_item.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                          inline:"start"
                        });
                      }

  render() {
      return (this.props.mounted ? (
              <div style={{textAlign:"center", margin:"30px 0"}}>
                {
                  this.props.data.map((x,y) => <Button key={x.name} className="carControllers" onClick={() => this.switchCar(y, x.name.split(" ")[0][0])} style={{ margin:"5px 8px" }}>{x.name}</Button>)
                }
                <Carousel ref="menuCarousel" className="menuCarousel" options={{ fullWidth:true }} >
                  {
                    this.props.data.map(x => {
                      return <div key={x.name} id={x.name.split(" ").join("")} >
                                <div style={{ textAlign:"center", margin:"30px 0" }} id={x.name.split(" ")[0][0]}> {
                                    x.data.map(y => <Button key={y.name} style={{ margin:"8px"}} onClick={() => this.moveMenu(y.name.split(" ").filter(x => x != "&").join(""))}>{y.name}</Button>)
                                  }
                                </div>
                                <div> {
                                   x.data.map((y,q) => {
                                       return <div key={y.name} style={{ textAlign:"center" }} id={y.name.split(" ").filter(x => x != "&").join("")}>
                                                <h3 >{y.name}
                                                    <i className="material-icons" style={{margin:"10px", fontSize:"32px", cursor:"pointer"}} onClick={() => this.moveMenu(x.name.split(" ")[0][0])}>expand_less</i>
                                                </h3>
                                                <Row>
                                                  {
                                                    y.data.map(z => <Col s={12}
                                                                          m={12}
                                                                          l ={6}
                                                                          key={z.name}
                                                                          style={{ textAlign:"center",
                                                                                   height:"8em",
                                                                                   padding:"10px" }}>
                                                                        <h6 style={{ fontWeight:"1000" }}>
                                                                          {z.name} { this.state.prices == 1 ? z.price : ""}
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
                 </div>) : (<div></div>))
           }
}
