import React from 'react';

import classes from './MenuToggler.module.css';

const menuToggler = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>

);

export default menuToggler;