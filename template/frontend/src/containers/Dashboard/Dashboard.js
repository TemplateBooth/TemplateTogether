import React, {Component, Fragment} from "react";
import classes from "./Dashboard.module.css";
import {connect} from "react-redux";
import axios from "axios";
import * as actionCreators from "../../store/actions/index";
import { tokenConfig } from "../../store/actions/index";
import Loading from "../../components/UI/Loader/Loader";
import Template from "../Templates/Template/Template";
import Profile from "./Profile/Profile";
import profileImg from "../../assets/img/default.jpeg"
import UploadTemplate from "./UploadTemplate/UploadTemplate";
import Templates from "./Templates/Templates";
import * as actionTypes from "../../store/actions/actionTypes";

class Dashboard extends Component{

    state = {
        profileImage:null,
        uploadTemplates:false,
        uploadedTemplates:false,
        message:null
    }

    onImageChangeHandler = (e) => {
        this.setState({
            [e.target.name]:e.target.files[0]
        })
        const reader = new FileReader();
        const profileImage = document.getElementById("ProfileImage")
          
        if(e.target.files[0]){
             reader.addEventListener("load",function(){
                console.log(this);
                profileImage.setAttribute("src",this.result);
            })

            reader.readAsDataURL(e.target.files[0]);
        }
        else{

            profileImage.setAttribute("src",profileImg);
        }
        const saveChanges = document.querySelector("." + classes.Save);
        saveChanges.classList.add(classes.Active);
        
    }

    SubmitProfileHandler = () => {
        console.log("lets submit!!");
        let fd = new FormData();
        if(this.state.profileImage){
            fd.append("image",this.state.profileImage,this.state.profileImage.name);
        }
        axios.put("http://localhost:8006/profile/update/",fd,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
        }).then(res => {
            this.props.setMessage("Your profile has been Updated!!");
            let user = JSON.parse(localStorage.getItem('user'));    
            user = {
                ...user,
                profile:res.data
            } 
            localStorage.setItem("user",JSON.stringify(user));
            this.props.updateUser(user);
            const saveChanges = document.querySelector("." + classes.Save);
            saveChanges.classList.remove(classes.Active);
        })
        .catch(err => {
            this.props.setError(err.response.data);
            console.log(err.response);
        })
        
    }
    sectionChangeHandler = (e,section) => {

        let Item = e.target;
        let Items = document.querySelectorAll("." + classes.LeftBar + " ul li");
        console.log(Items)
        for(let i=0;i<Items.length;i++){
            Items[i].classList.remove(classes.Active);
            console.log(Items[i]);
        }
        Item.classList.add(classes.Active);
        this.setState({
            uploadTemplates:false,
            uploadedTemplates:false,
            [section]:true,
        })
    }

    closeNotificationHandler = (e) => {
        let messageContainer = document.querySelector("." + classes.NotificationContainer);
        let cross = document.querySelector("." + classes.cross);
        if(e.target == messageContainer || e.target == cross){
            messageContainer.classList.remove(classes.Active);
            this.props.unsetNotifications();
        }
    }

    render(){
        let rightBarContent = (
            <div className={classes.Profile}>
                <Profile/>
            </div>
        );;
      
        if(this.state.uploadTemplates){
            rightBarContent = (
                    <UploadTemplate/>
            )
        }
        if(this.state.uploadedTemplates){
            rightBarContent = (
               <Templates/>
            )
        }

        let image = profileImg;
        if(this.props.user){
            if(this.props.user.profile){
                image = this.props.user.profile.image
            }
        }
        if(this.props.message || this.props.error){
            let messageContainer = document.querySelector("." + classes.NotificationContainer);
            messageContainer.classList.add(classes.Active);
        }
        return (
            <Fragment>

                    
                    <div onClick={this.closeNotificationHandler} className={classes.NotificationContainer}>
                        <span className={"fa fa-times " + classes.cross}></span>
                            
                            {this.props.message ? (
                            <div className={classes.Notification}>
                                {this.props.message}
                            </div>
                            ):null}

                        {this.props.error? (
                            <div className={classes.error}>
                                {this.props.error.map((error,index) => {
                                    return (
                                        <div key={index} >
                                            {error}
                                        </div>
                                    )
                                            })}
                                        </div>
                            ) : null}

                            
                    </div>

                   

                      

                     <div className={classes.LeftBar}>
                            <div className={classes.User}>
                            <button onClick={this.SubmitProfileHandler} className={classes.Save}>Save</button>
                                <img id="ProfileImage" src={image}/>
                                 <input ref={fileInput => this.fileInput = fileInput} style={{display:"none"}} type="file" name="profileImage" onChange={this.onImageChangeHandler} />
                                 <button onClick={() => this.fileInput.click()} class={classes.editPhoto}><span className="fa fa-edit"></span></button>
   
                            </div>
                            <div className={classes.Name}>
                                {this.props.user.username}
                            </div>
                            <ul>
                               <li className={classes.Active} onClick={(e) => this.sectionChangeHandler(e,'profile')}>Profile</li>
                               <li onClick={(e) => this.sectionChangeHandler(e,'uploadTemplates')}>Upload Template</li>
                               <li onClick={(e) => this.sectionChangeHandler(e,'uploadedTemplates')}>Your Templates</li>
                               <li>Account</li> 
                            </ul>
                        </div>
                        <div className={classes.RightBar}>                    
                            {rightBarContent}            
                    </div>    
            </Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        token:state.auth.token,
        user:state.auth.user,
        message:state.auth.message,
        error:state.auth.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUser:(user) => dispatch({type:actionTypes.UPDATE_USER,
        user:user}),
        setMessage:(msg) => dispatch({type:actionTypes.SET_MESSAGE,
            message:msg}),
        setError:(err) => dispatch({type:actionTypes.SET_ERROR,error:err}),
        unsetNotifications:() => dispatch({type:actionTypes.INIT_ERROR_MSG}),
    

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);