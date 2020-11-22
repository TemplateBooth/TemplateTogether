import React, {Component,Fragment} from 'react';
import classes from "./Profile.module.css";
import profileImg from "../../../assets/img/default.jpeg"
import axios from 'axios';
import {connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";
import Spinner from "../../../components/UI/Spinner/Spinner";
class Profile extends Component{
    state = {
        tags:{},
        loading:false,
        error:null,
        message:null
    }

    componentDidMount(){
        let profile
        if(this.props.user){
            profile = this.props.user.profile;
        }
        let tags = {}
        for(let prof in profile){
            if(prof != 'image' && prof != 'id' && prof != 'user' && profile[prof] != "null"){
                tags[prof] = profile[prof]
            }
        }

        console.log(tags);
        this.setState({
            tags:tags
        })
    }
    

    SubmitProfileHandler = () => {
        console.log("lets submit!!");
        let fd = new FormData();
    
        for(let tag in this.state.tags){
            fd.append(tag,this.state.tags[tag]);
        }
        this.setState({
            loading:true
        })
        axios.put("http://localhost:8006/profile/update/",fd,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
        }).then(res => {
            this.props.setMessage("Your profile has been Updated!!");
            this.setState({
                loading:false,
            })
            setTimeout(() => {
                this.setState({
                    message:null
                })
            },2000);
            let user = JSON.parse(localStorage.getItem('user'));
            user = {
                ...user,
                profile:res.data
            }
            localStorage.setItem("user",JSON.stringify(user));
            this.props.updateUser(user);
            let addTags = document.querySelector("." + classes.AddTag);
            let crosses = document.querySelectorAll("." + classes.cross);
    
            addTags.style.display = "none";
            for(let cross in crosses){
                if(crosses[cross].style){
                    crosses[cross].style.display = "none";
                }
            }
            const saveChanges = document.querySelector("." + classes.SaveChanges);
            saveChanges.classList.remove(classes.Active);
        })
        .catch(err => {
            console.log(err)
            //this.props.setError(err.response.data);
        })
        
    }

    tagChangeHandler = (name,value) => {
        let newTags = {
            ...this.state.tags
        }
        newTags[name] = value 
        this.setState({
            tags:newTags
        })
    }

    removeTagHandler = (tag) => {
        console.log(tag);
        this.setState({
            tags:{
                ...this.state.tags,
                [tag]:null
            }
        })
        console.log(this.state.tags);
    }

    editTagHandler = () => {
        let addTags = document.querySelector("." + classes.AddTag);
        let crosses = document.querySelectorAll("." + classes.cross);

        addTags.style.display = "inline-block";
        for(let cross in crosses){
            if(crosses[cross].style){
                crosses[cross].style.display = "inline-block";
            }
        }
        const saveChanges = document.querySelector("." + classes.SaveChanges);
        saveChanges.classList.add(classes.Active);
    }
    addTagsHandler = () => {
        let choices = document.querySelector("." + classes.Choices);
        choices.style.display = "block";
       
    }
    render(){
        let image = profileImg;
        if(this.props.user){
            if(this.props.user.profile){
                image = this.props.user.profile.image
            }
        }
        
       
        return (
            <Fragment>
                <div className={classes.Container}>
                    
                    <div className={classes.description}>
                        <div className={classes.Profile}>
                    
                            <div className={classes.Detail}>
                                <span className={classes.Item}>Name</span> 
                                <span style={{display:'inline-block',
                            marginRight:"10px"}}>
                                    :
                                </span>
                                 <span className={classes.Value}>{this.props.user.username}</span>
                            </div>
                            <div className={classes.Detail + " mt-2"}>
                                <span className={classes.Item}>
                                    Likes
                                </span>
                                <span style={{display:'inline-block',
                            marginRight:"10px"}}>
                                    :
                                </span>
                                {Object.keys(this.state.tags).map(tag => {
                                    return (
                                        this.state.tags[tag] ? (
                                        <span className={classes.Value}>
                                            {this.state.tags[tag]}
                                            <span onClick={() => this.removeTagHandler(tag)} className={"fa fa-times " + classes.cross}></span>
                                         </span>    
                                        ):null                              
                                    )
                                })}

                                <span onClick={this.editTagHandler} className={classes.EditTag}>EDIT</span>
                                <br/>
                 

                                <span onClick={this.addTagsHandler} className={classes.AddTag}>ADD TAGS</span>
                              
                               
                            </div>
                            <div className={classes.Choices}>
                                <span onClick={() => this.tagChangeHandler('tag1','GAMING')} className={classes.TagChoice}>GAMING</span>
                                <span onClick={() => this.tagChangeHandler('tag2','NAVBARS')} className={classes.TagChoice}>NAVBARS</span>
                                <span onClick={ () => this.tagChangeHandler('tag3','BUTTONS')} className={classes.TagChoice}>BUTTONS</span>
                                <span onClick={() =>  this.tagChangeHandler('tag4','GALLERY')} className={classes.TagChoice}>GALLERY</span>
                                <span onClick={() => this.tagChangeHandler('tag5','BLUE')} className={classes.TagChoice}>BLUE</span>
                            </div>
                     
                        </div>
                        <div className={classes.SaveChanges}>
                            <button onClick={this.SubmitProfileHandler}>Save Changes</button>
                            
                            {this.state.loading ? (
                                <Spinner/>
                            
                            ):null}
                        </div>
                    </div>
                </div>
            </Fragment>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        user:state.auth.user,
        token:state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUser:(user) => dispatch({type:actionTypes.UPDATE_USER,
        user:user}),
        setMessage:(msg) => dispatch({type:actionTypes.SET_MESSAGE,
        message:msg}),
        setError:(err) => dispatch({type:actionTypes.SET_ERROR,error:err})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile)