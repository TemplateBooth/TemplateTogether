import React, {Component, Fragment} from "react";
import classes from "./Login.module.css";
import axios from "axios";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import * as actionCreators from "../../../store/actions/index";

class Login extends Component{
    state = {
        username:'',
        password:'',
    }

    componentDidMount(){
        this.props.initErrorMessage();
        
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        const {username, password} = this.state;
        console.log(username, password);
        this.props.onSubmit(username,password);
    }

    closeNotificationHandler = (e) => {
       
        let messageContainer = document.querySelector("." + classes.NotificationContainer);
        let cross = document.querySelector("." + classes.cross);
        if(e.target == messageContainer || e.target == cross){
            messageContainer.classList.remove(classes.Active);
            this.props.initErrorMessage();
        }
    }

    render(){

        if(this.props.error){
            let messageContainer = document.querySelector("." + classes.NotificationContainer);
            messageContainer.classList.add(classes.Active);
        }
        return (
            <Fragment>
                {this.props.IsAuthenticated ?  <Redirect to='/dashboard' /> : null }
            
                     <div onClick={this.closeNotificationHandler} className={classes.NotificationContainer}>
                         <span className={"fa fa-times " + classes.cross}></span>
                          <div className={classes.error}>
                              {this.props.error ? this.props.error.map((error,index) => {
                                return (
                                    <div key={index} >
                                        {error}
                                    </div>
                                )
                            }) :null}
                            
                         </div>
                     </div>

                <div className={classes.FormContainer}>
                    <div className={classes.Heading}>
                        Login!
                    </div>
                <form className="" onSubmit={this.onSubmitHandler}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Username</label>
                        <input type="text" name="username" value={this.state.username} onChange={this.onChangeHandler} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                   </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.onChangeHandler}  className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className={"btn " + classes.Button}>Submit</button>
                </form>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        IsAuthenticated: state.auth.IsAuthenticated,
        loading:state.auth.loading,
        error:state.auth.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit:(username,password) =>  dispatch(actionCreators.authSubmit(username,password)),
        initErrorMessage:() => dispatch(actionCreators.initErrorMessage())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);