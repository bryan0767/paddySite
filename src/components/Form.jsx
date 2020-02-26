import React from 'react'
import FormInputs from './FormInputs'
import {Row, Col, Button} from 'react-materialize'

export default class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.email = {}
    this.reservation = {}
  }

  send = (type, index) => {

    let keys =  Object.keys(this[type]);
    let values =  Object.values(this[type]);
    let inputs = this.props.data[index]

    if( keys.length == inputs.inputs.length
        && values.every(x => x.length > 0) ) {

            fetch("api/contact", {
              method:"POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                data:this[type]
              })
            }).then(res => {
                $("#email7").val("")
                $("#FormTextArea").val("")
                $("#5").val("")
                M.toast({
                          html: `Your ${type} has been sent thank you!`,
                          classes:'rounded amber darken-1'
                        })
            })

    } else {
      M.toast({
                html: "Please fill in all fields",
                classes: "rounded red darken-3"
              })
    }
  }

  fillInput = (e, data) => {
    this.props.data.map((x,y) => {
      if(y == data.group_id) {
        this.props.data[y].inputs.map(a => {
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
    return this.props.data.map((x,z) => {
      return <Col s={12} m={12}
                  key={x.type}
                  data-key={x.type}
                  className="form_item">
                <span style={{top:"25px", position:'relative', textAlign:"center", color:"#9c9f83"}}>{x.title}</span>
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
      <Row className="formRow lazy" data-function="fetchForms" data-array="forms" id="forms">
        {this.props.mounted ? this.renderForms() : (<div>Error Loading</div>)}
      </Row>
    );
  }
}
