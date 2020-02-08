import React, { useRef, useEffect } from 'react';
import Proptype from 'prop-types';
import dialogPolyfill from 'dialog-polyfill'
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
  const dialogRef = useRef();

  const { show } = props;
 
  useEffect(() => {
    dialogPolyfill.registerDialog(dialogRef.current);
    displayIt(show);
  }, [show, dialogRef]);

  
  const displayIt = (show) => {
    const dialog =dialogRef.current;
    if ( show) {
      return dialog.open !== true ? dialog.showModal() : null;
    } else {
     dialog.close();
    }
  } 


  return (
    <Aux>
      <Backdrop show={show} clicked={props.modalClose}/>
      <dialog ref={dialogRef} className={classes.Modal} >
        {props.children}
      </dialog>
    </Aux>
  );
  
};

Modal.propType = {
  show: Proptype.bool.isRequired,
  modalClose: Proptype.func.isRequired,
  children: Proptype.element.isRequired
}

export default React.memo(Modal, (prevProps, nextProps) => {
  return prevProps.show === nextProps.show && prevProps.children === nextProps.children
});