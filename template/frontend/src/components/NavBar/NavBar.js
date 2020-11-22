import react from "react";
import classes from "./NavBar.module.css";
import {NavLink} from "react-router-dom";


const navbar = (props) => {


    let className = ["nav-item active",classes.green];
    className = className.join(' '); 
    console.log(className)
    let NavLinks = (
        <ul>
            <li>
                <NavLink to="/" exact activeClassName={classes.active}>Home</NavLink>

            </li>
            <li>
                <NavLink to="/components" activeClassName={classes.active}>Components</NavLink>
            </li>
            <li>
                <NavLink to="/templates" activeClassName={classes.active}>Templates</NavLink>
            </li>
            <li>
            <NavLink to="/login" activeClassName={classes.active}>Login</NavLink>
            </li>
            <li>
                <NavLink to="/register" activeClassName={classes.active}>Register</NavLink>
            </li>
        </ul>
    );
    if(props.IsAuth){
        NavLinks = (
            <ul>
                <li>
                <NavLink to="/" exact activeClassName={classes.active}>Home</NavLink>

            </li>
            <li>
                <NavLink to="/components" activeClassName={classes.active}>Components</NavLink>
            </li>
            <li>
                <NavLink to="/templates" activeClassName={classes.active}>Templates</NavLink>
            </li>
            <li>
                   <NavLink to="/dashboard" activeClassName={classes.active}>Dashboard</NavLink>
                </li>
                <li>
                   <NavLink to="/logout" activeClassName={classes.active}>Logout</NavLink>
                </li>
            </ul>
        )
    }
    return (
        <nav className={classes.Navbar}>
          {NavLinks}
        </nav>
    )
}



export default navbar;