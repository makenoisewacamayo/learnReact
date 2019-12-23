import React, { useRef, useEffect } from 'react';
import Proptype from 'prop-types';
import dialogPolyfill from 'dialog-polyfill'
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dialogRef = useRef(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => { 
    dialogPolyfill.registerDialog(dialogRef.current);
    displayIt(props.show)
  });

  const displayIt = (show) => {
    if ( show ) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  } 

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClose}/>
      <dialog ref={dialogRef} className={classes.Modal} >
        {props.children}
      </dialog>
    </Aux>
  );
};

modal.propType = {
  show: Proptype.bool.isRequired,
  modalClose: Proptype.func.isRequired
}

export default modal;