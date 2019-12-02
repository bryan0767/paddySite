import React from 'react'
import { Modal, Button } from 'react-materialize'

export default class Confirm extends React.Component {
  render() {
    return (
      <div style={this.props.modalStyles} >
        <Modal header={this.props.header}
               trigger={<Button>{this.props.buttonText}</Button>}
               actions={this.props.actions}>
          <div>{this.props.text}</div>
        </Modal>
      </div>
      );
  }
}
