import React from 'react';

import classes from './Menu.css'

const menu = (props) => (
    <div className={classes.Menu} onClick={props.clicked}>
        <i className="fas fa-hamburger" style={{fontSize: '35px'}}></i>
    </div>
);

export default menu;