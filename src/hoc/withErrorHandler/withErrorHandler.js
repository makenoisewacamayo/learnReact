import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import Aux from '../Aux/Aux'

const withErrorhandler = (WrappedComponent, axios) => {
  return class extends Component {


    state = {
      error: null
    }

    UNSAFE_componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(request => {
        this.setState({error: null});
        return request;
      });
      this.resInterceptor = axios.interceptors.response.use(response => response, error => {
        this.setState({error: error});
      });
    }

    errorConfirmHandler= () => {
      this.setState({error: null});
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    render() {
      return (
        <Aux>
          <Modal show={!!this.state.error} clicked={this.errorConfirmHandler}>
            <p>
              {this.state.error ? this.state.error.message : null }
            </p>
            <Button btnType="Danger" clicked={this.errorConfirmHandler}>Close</Button>
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}
export default withErrorhandler;
