import React from 'react'
import moment from 'moment'
import {DatePicker, TimePicker, TextInput, Textarea, Toast} from 'react-materialize'

export default (props) => {

  let date = {
    target: {
      dataset: {
        type:"appointment_date",
      },
      validity: {
        valid:true
      },
      value: ""
    }
  }

  let time = {
    target: {
      dataset: {
        type:"appointment_time",
      },
      validity: {
        valid:true
      },
      value: ""
    }
  }

  switch (props.data.type) {
    case "datePicker":
      return <DatePicker id={props.data.id}
                         data-type={props.data.id}
                         placeholder={props.data.title}
                         options = {{
                            container:"body",
                            onSelect: (x) => date.target.value = moment(x).format("YYYY-MM-DD"),
                            onClose: () => $("#"+props.data.id)[0].value ? props.func(date, props.data) : date=date,
                            disableDayFn: (x,y) => {
                              if(x < moment()) {
                                return true
                              }
                            }
                          }}/>
      break;
    case "timePicker":
      return <TimePicker id={props.data.id}
                         data-type={props.data.id}
                         placeholder={props.data.title}
                         options = {{
                            container:"body",
                            onCloseEnd: () => {
                              if($("#"+props.data.id)[0].value) {
                                let el = $("#"+props.data.id)[0].value
                                let momented = moment(el, "hh:mm a").format("HH:mm:ss")
                                time.target.value = momented
                                props.func(time, props.data)
                              } else time=time
                            }
                          }}/>
      break;
    case "email":
      return <TextInput defaultValue={props.value} data-type={props.data.id} onChange={() => props.func(event, props.data)} email validate placeholder={props.data.title} error="Please Enter Valid Email" />
      break;
    case "textarea":
      return <Textarea defaultValue={props.value} data-type={props.data.id} onChange={() => props.func(event, props.data)} placeholder={props.data.title} style={{height:'6.3em', maxHeight:'6.3em', padding:"10px"}} id="FormTextArea"/>
      break;
    case "sizePicker":
      return <TextInput defaultValue={props.value} data-type={props.data.id} onChange={() => props.func(event, props.data)} placeholder={props.data.title} />
      break;
    default:
      return <TextInput defaultValue={props.value} data-type={props.data.id} onChange={() => props.func(event, props.data)} placeholder={props.data.title} />
  }
}
