import React from 'react'
import {Row, Col} from 'react-materialize'
import FooterMap from './FooterMap'


class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  renderData = () => {
    return this.props.data.map((x) => {
      return <Col s={12} m={12/this.props.data.length} style={{textAlign:"center", margin:"40px 0"}}>
                <h5 style={{marginBottom:"20px"}}>{x.title}</h5>
                  {
                    x.subStuff.map(y => {
                      return <div className="footerContent" style={{height: y.id == 'google' ? "13em" : "2.5em"}} id={y.id} >
                                {
                                typeof y.title == 'object' ? y.title.map(z => {
                                  return <a href={z.hash} style={{marginRight:"10px", color:"white"}}>
                                            <li className={z.icon}></li>
                                         </a>
                                  }) : y.id == 'google' ? ( <FooterMap /> ) : (y.title)
                                }
                            </div>
                          })
                        }
              </Col>
    })
  }

  render() {
    return (
      <Row className="footerRow lazy" data-function="fetchFooter" data-array="footer">
        {
          this.props.mounted ? (
            this.renderData()
          ) : (<div>not loaded</div>)
        }
      </Row>
    );
  }
}
export default Footer
