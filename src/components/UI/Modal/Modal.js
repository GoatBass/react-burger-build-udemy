import React, {Component} from 'react';

import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import classes from './Modal.css'

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        // if (nextProps.show !== this.props.show) {
        //     return true
        // }
        return nextProps.show !== this.props.show;
    }

    componentDidUpdate() {
        console.log('[Modal] Will Update')
    }

    render () {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClose}/>
                <div 
                    className={classes.Modal} 
                    style={{
                            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                            opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;