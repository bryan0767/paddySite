import React from 'react'
import {Row, Col} from 'react-materialize'
import FooterMap from './FooterMap'


class Footer extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      Footer:''
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
    fetch("api/get?id=6")
    .then(blob => blob.json())
    .then(data => {
      this.setState({
        Footer: [...data.data]
      })
    })
  }

  render() {
    return (
      <Row className="footerRow">
        {
          this._isMounted ? (
            this.state.Footer.map(x => {
              return <Col s={12} m={12/this.state.Footer.length} style={{textAlign:"center", margin:"40px 0"}}>
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
          ) : (<div>not loaded</div>)
        }
      </Row>
    );
  }
}
export default Footer
