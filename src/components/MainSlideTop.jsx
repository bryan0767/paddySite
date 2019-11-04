import React from "react"
import moment from 'moment'
import { Button, TextInput } from "react-materialize"
import { HashLink } from 'react-router-hash-link';

export default (props) => {

  let emailField = "bryan was here"
  let valid = false

  let emailChange = (e) => {
    emailField = e.target.value
    valid = e.target.validity.valid
  }

  let submitEmail = () => {
      if(valid) {
        fetch("api/signup", {
          method:"POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email:emailField,
            date: moment().format("YYYY-MM-DD HH:mm:ss")
          })
        }).then(res => {
          document.getElementById("emailInput").value = ""
          res.json().then(data => {
            if(data === "success") {
              M.toast({html:"Thanks for signing up", classes:'rounded amber darken-1'})
            } else {
              M.toast({html:"Email already signed up, please try again", classes:'rounded red darken-3'})
            }
          })
        })
      } else {
        document.getElementById("emailInput").value = ""
        M.toast({html:"Please enter a valid email",
                 classes:'rounded red darken-3'})
      }
  }

  return <div>
          <label htmlFor="#mainDisplay" className="mainLabel">{props.data.centerBox.title}</label>
            <div className="centerFlex" id="mainDisplay">
                {
                  props.data.centerBox.type == 'input' ? (
                    <div className="centerFlex" style={{marginTop:"10px"}}>
                        <Button className="btn mainSubmit" type="submit" onClick = {() => submitEmail(emailField)} waves="light">Send</Button>
                        <TextInput id="emailInput" onChange={() => emailChange(event)} email validate error="Please Enter Valid Email" placeholder={props.data.centerBox.subTitle} />
                    </div>
                  ) : (
                    <HashLink to={props.data.centerBox.hash}>
                      <Button className="btn mainSubmit">{ props.data.centerBox.subTitle }</Button>
                    </HashLink>
                  )
                }
            </div>
        </div>
      }
