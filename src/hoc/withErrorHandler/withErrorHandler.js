import React from 'react';

import useHttpErrorHandler from '../../hooks/http-error-handler';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import Aux from '../Aux/Aux'

const withErrorhandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);
    return (
      <Aux>
        <Modal show={!!error} clicked={clearError}>
          <p>
            {error ? error.message : null }
          </p>
          <Button btnType="Danger" clicked={clearError}>Close</Button>
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
    
  }
}
export default withErrorhandler;
