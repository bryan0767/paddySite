import React from 'react'
import FormInputs from './FormInputs'
import {Row, Col, Button} from 'react-materialize'

export default class Forms extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false
    this.email = {}
    this.reservation = {}
    this.state = {
      Forms:[]
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchData()
  }

  componentWillUnmount() {
   this._isMounted = false;
  }

  fetchData = () =>  {
    fetch("api/get?id=5")
      .then(blob => blob.json())
      .then(data => {
        this.setState({
          Forms:[...data.data]
        })
      })
  }

  send = (type, index) => {
    if( Object.keys(this[type]).length == this.state.Forms[index].inputs.length
        && Object.values(this[type]).every(x => x.length > 0) ) {
        if( index == 0 && isNaN( parseInt(this[type]['appointment_size']))) {
            M.toast({html:"Please enter a valid number for your party size",
                    classes:'rounded red darken-3'})
          } else {
            let endpoint = type == 'reservation' ? "api/reserve" : "api/contact"

            M.toast({ html: `Your ${type} has been sent thank you!`, classes:'rounded amber darken-1'})

            fetch(`${endpoint}`, {
              method:"POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                data:this[type]
              })
            }).then(res => {
                if(type == 'email') {
                  $("#6").val("")
                  $("#email8").val("")
                  $("#FormTextArea").val("")
                } else {
                  $(".datepicker").val("");
                  $(".timepicker").val("")
                  $("#4").val("")
                  $("#5").val("")
                }
            })
          }
    } else {
      M.toast({html: "Please fill in all fields", classes: "rounded red darken-3"})
    }
  }

  fillInput = (e, data) => {
    this.state.Forms.map((x,y) => {
      if(y == data.group_id) {
        this.state.Forms[y].inputs.map(a => {
          switch(e.target.dataset.type) {
            case a.id:
              e.target.validity.valid ?
              this[x.type][a.id] = e.target.value : e=e
            break;
            default:;
          }
        })
      }
    })
  }

  renderForms = () => {
    return this.state.Forms.map((x,z) => {
      return <Col s={12} m={6}
                  key={x.type}
                  data-key={x.type}
                  className="form_item">
                <span style={{top:"35px", position:'relative', textAlign:"center", color:"#9c9f83"}}>{x.title}</span>
                <div className="form_inputs">
                    {
                      x.inputs.map(y => {
                        return y.span == 12 ? (
                            <Row key={y.title}>
                              <Col s={parseInt(y.span)} m={ parseInt(y.span)} className={y.id}>
                                <FormInputs data={y} func={this.fillInput} value={this[x.type][y.id]}/>
                              </Col>
                            </Row>
                          ) : (
                            <Col key={y.title} s={parseInt(y.span)} m={ parseInt(y.span)} className={y.id}>
                              <FormInputs data={y} func={this.fillInput} value={this[x.type][y.id]}/>
                            </Col>
                            )
                        })
                      }
                  </div>
                  <Button className={`button_${x.id} centerHorizantal formSubmit`} onClick={ () => this.send(x.type, z)}>Send</Button>
                </Col>
    })
  }

  render() {
    return (
      <Row className="formRow" id="forms">
        {this._isMounted ? this.renderForms() : (<div>Error Loading</div>)}
      </Row>
    );
  }
}
