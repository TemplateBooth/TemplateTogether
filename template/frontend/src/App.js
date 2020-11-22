import logo from './logo.svg';
import './App.css';
import React, {Component, Fragment} from "react";
import Navbar from "./components/NavBar/NavBar";
import {BrowserRouter , Route, Switch} from "react-router-dom";
import bodyclasses from "./App.module.css";
import Register from "./containers/Auth/Register/Register";
import classes from "./containers/Auth/Register/Register.module.css";
import Login from "./containers/Auth/Login/Login";
import Home from "./containers/Home/Home";
import Templates from "./containers/Templates/Templates";
import Dashboard from "./containers/Dashboard/Dashboard";
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from "react-redux";
import * as actionCreators from "./store/actions/index";
import Code from "./containers/Code/Code";


class App extends Component{

  componentDidMount(){
    this.props.setAuthState();
    console.log("app mount");
    console.log(window.location.href);
  }

  render(){

    let routes = (
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/templates" exact component={Templates} />
          <Route path="/components" exact component={Templates} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/templates/:id" component={Code} />
      </Switch>
    );

    if(this.props.IsAuthenticated){
      routes = (
        <Switch>
           <Route path="/" exact component={Home} />
            <Route path="/templates" exact component={Templates} />
            <Route path="/components" exact component={Templates} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={Login} />
            <Route path="/templates/:id" component={Code} />
        </Switch>
      )
    }
       
    return ( 
        <Fragment>
          {!this.props.templateDetail ? (
               <Navbar IsAuth={this.props.IsAuthenticated}/> 
          ):null}
            {routes}
        </Fragment> 
    );
  }
}


const mapStateToProps = state => {
  return {
    IsAuthenticated: state.auth.IsAuthenticated,
    templateDetail:state.templates.detail
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setAuthState:() => dispatch(actionCreators.setAuthState())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);


