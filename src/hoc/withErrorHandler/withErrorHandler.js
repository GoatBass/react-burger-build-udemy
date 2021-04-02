import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilliary/Auxilliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        constructor(){
            super();
            console.log('witheErrorHandler Constructor called...');
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            } );

            this.respInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({error: error});
            });
        }
    
        state = {
            error: null
        }
    
        componentWillUnmount() {
            console.log('withErrorHandler componentWillUnMount called...', this.reqInterceptor, this.respInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.respInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Aux>
                    <Modal show={this.state.error} modalCLosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    } 
}

export default withErrorHandler;