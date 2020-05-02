import React from 'react';
import classes from './Toolbar.module.css'
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../../components/Logo/Logo';
import Menu from '../Menu/MenuToggler'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Menu clicked={props.openMenuClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.desktopOnly}>
            <NavigationItems 
                isAuthenticated ={props.isAuth}
            />
        </nav>

    </header>

);

export default toolbar;