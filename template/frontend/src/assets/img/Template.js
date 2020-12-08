import React, { Component } from 'react'
import classes from "./newTemplate.module.css";
import {Link} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";
import * as actionCreators from "../../../store/actions/index";
import Loader from "../../../components/UI/Loader/Loader";
import {tokenConfig} from "../../../store/actions/auth";
import gallery from "../../../assets/img/gallery.png";
import profile from "../../../assets/img/default.jpeg";

class Template extends Component{
    
    state = {
        comment:'',
        showComments:false,
        loading:false,
        comments:null,
        rating:null,
        avgRating:null
    }


    componentDidMount(){
        document.addEventListener("click",function(e){
            let shareOptions = document.querySelector("." + classes.shareOptions);
            let shareButton = document.getElementById("share");
            if(e.target != shareOptions && e.target != shareButton){
                 shareOptions.classList.remove(classes.active);
            }
        })
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
        console.log(this.state.comment);
    }   

    onSubmitHandler = (e) => {
        //this.props.postComment(this.state.comment,this.props.template.id);
        console.log("sdsd")
        if(e.keyCode === 13){
            console.log("hhahah")
            let data = {
                "comment":this.state.comment,
                "template_id":this.props.template.id
            }
    
            axios.post("http://localhost:8006/comments/create/",data,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${this.props.token}`
                },
            })
            .then(res => {
                this.setState((prevState) => {
                    return {
                        comments:prevState.comments.concat(res.data)
                    }
                })
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        }   
    }

    getCommentsHandler = () => {
        //this.props.getComments(this.props.template.id);
       
        this.setState({
            showComments:true,
            loading:true
        })
        axios.get("http://localhost:8006/templates/" + this.props.template.id + "/comments/")
        .then(res => {
            
            this.setState({
                loading:false,
                comments:res.data
            })
            console.log(res.data);
        })
        .catch(err => {
            console.log(err.response.data);
        })
    }

    openFeedbackHandler(ele){
        let Feedback = ele.currentTarget;
        console.log(Feedback);
        let choice = Feedback.querySelector("." + classes.RatingChoice);
        choice.style.display = "flex";
        setTimeout(() => {
            choice.classList.add(classes.active);
        }, 100);
        
       console.log(ele.target.style);
       console.log("feedback")
    }

    ratingChangeHandler = (e,choice) => {
        e.stopPropagation();
        console.log(e);
        this.setState({
            rating:choice
        })



        let data = {
            "template_id":this.props.template.id,
            "rating":choice
        }
        axios.post("http://localhost:8006/ratings/create-update/",data,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
        })
        .then(res => {
            console.log(res.data.avgRating);
            this.setState({
                avgRating:res.data.avgRating
            })

        })
        .catch(err => {
            console.log(err.response.data);
        })

        let parent = document.querySelector("." + classes.RatingChoice + "." + classes.active);
        console.log(parent)
        parent.classList.remove(classes.active);
        setTimeout(() => {
            parent.style.display = "none";
        }, 100);
    }

    deleteTemplateHandler = () => {
        this.props.deleteTemplateHandler(this.props.template.id);
    }
    
    commentClickHandler = () => {
       
    }

    shareClickHandler = () => {
        let shareOptions = document.querySelector("." + classes.shareOptions);
        shareOptions.classList.add(classes.active);
    }


    saveTemplateHandler = () => {
        let saveSpan = document.querySelector("." + classes.saveSpan);
        let savedSpan = document.querySelector("." + classes.savedSpan);
        let saveTip = document.querySelector("." + classes.saveTip);
        if(saveSpan.style.display == "none"){
            saveTip.innerHTML = "unsaved";
            saveSpan.style.display = "inline-block";
            savedSpan.style.display = "none";
        }
        else{
            saveTip.innerHTML = "saved";
            saveSpan.style.display = "none";
            savedSpan.style.display = "inline-block";
        }
        saveTip.classList.add(classes.active);
        setTimeout(() => {
            saveTip.classList.remove(classes.active);
        },1000)
        
    }

    render(){
        const ratingChoice = ['Not Satisfactory','Satisfactory','Good','very Good','Excellent']
        
    
        let feedback = "Feedback";

        
        if(this.state.rating){
            if(this.state.rating == 1){
                feedback =  <i class="em em--1"  aria-label="THUMBS DOWN SIGN"></i>
            }
            else if(this.state.rating == 2){
                feedback =   <i class="em em-no_mouth"  aria-label="FACE WITHOUT MOUTH"></i>                       
            }
            else if(this.state.rating == 3){
                feedback =  <i class="em em---1" aria-label="THUMBS UP SIGN"></i>
            }
            else if(this.state.rating == 4){
                feedback =   <i class="em em-100" aria-label="HUNDRED POINTS SYMBOL"></i>
            }
            else{
                feedback =   <i class="em em-heart"  aria-label="HEAVY BLACK HEART"></i>
                              
            }
        }
        else if(this.props.template.rating){
            let rating = Number(this.props.template.rating);
            if(rating == 1){
                feedback =  <i class="em em--1"  aria-label="THUMBS DOWN SIGN"></i>
            }
            else if(rating == 2){
                feedback =   <i class="em em-no_mouth"  aria-label="FACE WITHOUT MOUTH"></i>                       
            }
            else if(rating == 3){
                feedback =  <i class="em em---1" aria-label="THUMBS UP SIGN"></i>
            }
            else if(rating == 4){
                feedback =   <i class="em em-100" aria-label="HUNDRED POINTS SYMBOL"></i>
            }
            else{
                feedback =   <i class="em em-heart"  aria-label="HEAVY BLACK HEART"></i>
                              
            }

        }

        let avgRating = this.props.template.avgRating;
        if(this.state.avgRating){
            avgRating = this.state.avgRating
        }


        let deleteTemplate = null;
        console.log(this.props);
        console.log(window.location.pathname)
        if(this.props.user && window.location.pathname == '/dashboard' && this.props.template.user.id == this.props.user.id){
            deleteTemplate = (
                <div className={classes.DeleteTemplate}>
                    <span onClick={this.deleteTemplateHandler} className="fa fa-trash-o"></span>
                 </div>
            )
        }
        
        console.log(typeof this.props.template.uploaded_at)

        return (
         
                <div class={classes.templateContainer}>
                    <div class={classes.heading}>
                        <div class={classes.topHeading}>
                            <div class={classes.image}>
                                <img src={gallery}/>
                            </div>
                            <div class={classes.typeTime}>
                                <div class={classes.type}>
                                {this.props.template.template_type}  <span class={classes.uploadTime}>Uploaded 2 min ago!</span>
                                </div>
                                <div class={classes.time}>
                                    <span class={classes.username}>
                                    @{this.props.template.user.username}
                                    </span>
                                
                                </div>
                            </div>
                            <div class={classes.saveRating}>
                        
                                <div class={classes.rating}>
                                    2.3
                                    <span class={classes.stars +  " far fa-star"}></span>
                                </div>
                            
                            </div>
                        </div>
                        <div class={classes.description}>
                            Assalamwalaikum! Here is a Navigation Bar i made last year for an E-commerce store based in Bangalore.
                        </div>
                    </div>  
                    <div class={classes.content}>
                        <iframe src="apple.html"></iframe>
                    </div>
                    <div class={classes.noOfComments}>
                        <div class={classes.commentShare}>
                            <span class={classes.no}>1.3k</span> views <span class={classes.no}>1.3k</span> comments <span class={classes.no}>5</span> shares
                        </div>
                        <div class={classes.save} onClick={this.saveTemplateHandler}>
                            <div class={classes.saveTip}>
                                saved
                            </div>  
                            <span class={classes.saveSpan + " far fa-bookmark"}></span>
                            <span class={classes.savedSpan + " fas fa-bookmark"}></span>
                        </div>
                    </div>
                    <div class={classes.addons}>
                        <div class={classes.rating}>
                            <button><span class={classes.symbol + " far fa-star"}></span>Feedback</button>     
                        </div>
                        <div class={classes.comment}>
                            <button id="comment" onClick={this.getCommentsHandler}>
                                <span class={classes.symbol + " far fa-comment-alt"}></span>Comment
                            </button>
                        </div>
                        <div class={classes.share}>
                            <button id="share" onClick={this.shareClickHandler}>
                                <span class={classes.symbol + " far fa-share-square"}></span>Share
                            </button>

                            <div class={classes.shareOptions}>
                                <div class={classes.listItem}>
                                    <span class="fab fa-facebook-f"></span> Facebook
                                </div>
                                <div class={classes.listItem}>
                                    <span class="fab fa-instagram"></span> Instagram
                                </div>
                                <div class={classes.listItem}>
                                    <span class="fas fa-link"></span> Copy Link
                                </div>
                            </div>
    
                        </div>
                    </div>
                    {this.state.showComments ? (

                    <div class={classes.allComments}>

                    {this.state.loading ? (
                             <div class={classes.ldsRing}><div></div><div></div><div></div><div></div></div>                      
                            ):(
                                <div class={classes.commentsContainer}>
                                    {this.state.comments.map(comment => {
                                return (
                                    <div class={classes.singleComment}>
                                            <div class={classes.image}>
                                                <img src={profile}/>
                                            </div>
                                            <div class={classes.textComment}>
                                                <div class={classes.wrapper}>
                                                    <span class={classes.name}>Israil Khan</span>
                                                    <span class={classes.message}> {comment.comment}</span>
                                                </div>
                                            </div>
                                    </div> 
                                )
                                  })}
                             </div>
                             
                    )}
                    </div>
                    ):null}

                
                    <div class={classes.userComment}>
                        <div class={classes.image}>
                            <img src={profile}/>
                        </div>
                        <div class={classes.comment}>
                            <div class={classes.commentContainer}>
                                <input placeholder="Write a comment..." name="comment" value={this.state.comment} onKeyUp={this.onSubmitHandler} onChange={this.onChangeHandler} autoComplete="off"/>
                            </div>
                        </div>
                    </div>
                </div>
       
              
                  )
    }
}

const mapStateToProps = (state) => {
    return {
        token:state.auth.token,
        user:state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postComment:(comment,id) => dispatch(actionCreators.postComment(comment,id)),
        getComments:(id) => dispatch(actionCreators.getCommentsHandler(id)),
        deleteTemplateHandler:(id) => dispatch(actionCreators.deleteTemplateHandler(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Template)
