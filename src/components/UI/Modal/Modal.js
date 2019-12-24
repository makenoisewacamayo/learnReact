import React, { Component } from 'react';
import Proptype from 'prop-types';
import dialogPolyfill from 'dialog-polyfill'
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  constructor(props) {
    super(props)
    this.dialogRef =  React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ( nextProps.show !== this.props.show ) {
      this.displayIt(nextProps.show);
      return true;
    };
    return false
  }

  componentDidMount() { 
    dialogPolyfill.registerDialog(this.dialogRef.current);
  }

  displayIt = (show) => {
    if ( show ) {
      this.dialogRef.current.showModal();
    } else {
      this.dialogRef.current.close();
    }
  } 

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClose}/>
        <dialog ref={this.dialogRef} className={classes.Modal} >
          {this.props.children}
        </dialog>
      </Aux>
    );
  }
};

Modal.propType = {
  show: Proptype.bool.isRequired,
  modalClose: Proptype.func.isRequired
}

export default Modal;