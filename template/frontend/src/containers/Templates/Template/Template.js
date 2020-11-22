import React, { Component } from 'react'
import classes from "./Template.module.css";
import {Link} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";
import * as actionCreators from "../../../store/actions/index";
import Loader from "../../../components/UI/Loader/Loader";
import {tokenConfig} from "../../../store/actions/auth";


class Template extends Component{
    
    state = {
        comment:'',
        showComments:false,
        loading:false,
        comments:null,
        rating:null,
        avgRating:null
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
        console.log(this.state.comment);
    }   

    onSubmitHandler = () => {
        //this.props.postComment(this.state.comment,this.props.template.id);
        
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
            console.log(err.response.data);
        })
        
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
            <li key={this.props.template.id} className="list-group-item mt-2">
                     
                     <Link to={'templates/' + this.props.template.id}>

                     <div class={classes.heading}>
                            <span class={classes.no}>
                            {this.props.template.id}
                            </span>
                            <span class={classes.type}>
                            {this.props.template.template_type}
                            </span>
                            <span className={classes.Username}>
                                @{this.props.template.user.username}<br/>
                            </span>
                            <span className={classes.DateTime}>
                               Uploaded at :  ({this.props.template.uploaded_at})<br/>
                            </span>
                        </div>
                        <div class={classes.description}>
                                {this.props.template.description}
                               
                        </div>

                        {this.props.template.htmlFile ? (
                            <div class={classes.description}>
                                <a target="_blank" href={this.props.template.htmlFile}>Html</a>
                              </div>
                        ): null}
                        
                        {this.props.template.cssFile ? (
                            <div class={classes.description}>
                               
                           <a target="_blank" href= {this.props.template.cssFile}>Css</a>
                            </div>
                        ):null}
                        
                        {this.props.template.jsFile ? (
                        <div class={classes.description}>
                               
                                 <a target="_blank" href= {this.props.template.jsFile}>Js</a>
                        </div>
                        ):null}
                       
                     </Link>

                     <div className={classes.ActionSection + " py-1"}>
                            <div onClick={this.getCommentsHandler}
                             className={classes.Comments}>
                                Comments
                            </div>
                            <div className={classes.Likes}> 
                        <span className={classes.average}>Average Rating : {avgRating}</span>
                                
                                <div className={classes.Feedback} onClick={this.openFeedbackHandler.bind(this)}>
                                    <span className={classes.feedHeading}>
                                    {feedback}
                                    </span>
                                    

                                    <div className={classes.RatingChoice}>
                                    <div onClick={(e) => this.ratingChangeHandler(e,5)}>
                                        <i class="em em-heart" aria-role="presentation" aria-label="HEAVY BLACK HEART"></i>
                                    </div>
                                    <div onClick={(e) => this.ratingChangeHandler(e,4)}>
                                    <i class="em em-100" aria-role="presentation" aria-label="HUNDRED POINTS SYMBOL"></i>
                                    </div>
                                    <div onClick={(e) => this.ratingChangeHandler(e,3)}>
                                    <i class="em em---1" aria-role="presentation" aria-label="THUMBS UP SIGN"></i>
                                    </div>
                                    <div onClick={(e) => this.ratingChangeHandler(e,2)}>
                                      <i class="em em-no_mouth" aria-role="presentation" aria-label="FACE WITHOUT MOUTH"></i>                       
                                  </div>
                                    <div onClick={(e) => this.ratingChangeHandler(e,1)}>
                                    <i class="em em--1" aria-role="presentation" aria-label="THUMBS DOWN SIGN"></i>
                                    </div>
                            
                                </div>
                                </div>
                                
                            </div>
                     </div>

                    {this.state.showComments ? (
                         <div className={classes.CommentSection}>
                            {this.state.loading ? (
                                <Loader/>
                            ): this.state.comments.map(comment => {
                                return (
                                    <div class={classes.Comment}>
                                        <span>
                                             {comment.comment}
                                        </span>
                                    </div>
                                )
                            })}
                         </div>
                    ):null}
                    
                     <div className={classes.CommentInput}>
                            <div className={classes.Input}>
                                <input name="comment" placeholder="Type something" value={this.state.comment} onChange={this.onChangeHandler} autoComplete="off"/>
                            </div>
                            <div className={classes.Button}>
                                <button onClick={this.onSubmitHandler}>Done</button>
                            </div>
                     </div>  


                    {deleteTemplate}
                    </li>           
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
