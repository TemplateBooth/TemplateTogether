import React, {Component, Fragment} from "react";
import classes from "./Templates.module.css";
import axios from "axios";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions/index";
import Loading from "../../components/UI/Loader/Loader";
import Template from "./Template/Template";


class Templates extends Component{

    state = {
        currentTemplates:null,
        all:true,
    }

    componentDidMount(){
        this.props.getTemplates();
        console.log("templates");
    }

    changeCategoryHandler = (e,type) => {

        console.log(e.target);
        let Item = e.target;
        let Items = document.querySelectorAll("." + classes.LeftSideBar + " ul li");
        console.log(Items)
        for(let i=0;i<Items.length;i++){
            Items[i].classList.remove(classes.active);
            console.log(Items[i]);
        }
        Item.classList.add(classes.active);
        this.setState({
            all:false,
            currentTemplates:this.props.templateTypes[type]
        })
    }

    clearAllHandler = (e) => {
        let clear = e.target;
        console.log(e);
        console.log(this);
        clear.style.backgroundColor = "var(--second)";
        let Items = document.querySelectorAll("." + classes.LeftSideBar + " ul li");
        console.log(Items)
        for(let i=0;i<Items.length;i++){
            Items[i].classList.remove(classes.active);
            console.log(Items[i]);
        }
        this.setState({
            all:true,
            currentTemplates:null
        })
        setTimeout(() => {
            clear.style.backgroundColor = "var(--first";
        },2000);
    }
    
    render(){

       
        return (
            <Fragment>  
                
                <div className={classes.LeftSideBar}>
                    <div className={classes.Heading}>
                        Types
                        <div className={classes.clearAll}>
                            Clear <span onClick={(e) => this.clearAllHandler(e)} className="fa fa-check"></span>
                        </div>
                    </div>
                    <ul>
                        {this.props.templateTypes ? (
                             Object.keys(this.props.templateTypes).map(type => {
                                 console.log("dfd");
                                return (
                                    <li onClick={(e) => this.changeCategoryHandler(e,type)}>{type}</li>
                                )
                            })
                           
                        ):null}
                       
                    </ul>
                </div>    
                <div className={classes.CenterBar}>
                            {!this.props.templates ? this.props.loading ? (
                                 <div style={{marginTop:'100px'}}>
                                    <Loading/>
                                </div>
                            ):null:null}
                            
                            {this.state.all ? this.props.templates ? (
                                                    <ul className={"list-group " + classes.template_list}>             
                                                    {this.props.templates.map(template => {
                                                        return <Template template={template}/>
                                                    })}
                                                    </ul>
                                    ):null
                                :null}
                            
                            {this.state.currentTemplates ? (
                                <ul className={"list-group " + classes.template_list}>             
                                {this.state.currentTemplates.map(template => {
                                    return <Template template={template}/>
                                })}
                                </ul>
                            ):null}
                </div>
                <div className={classes.RightSideBar}>
                    <div className={classes.Heading}>
                        Filters
                    </div>
                    <ul>
                        <li>Jo Bhi Hoga</li>
                        <li>Dekhengey</li>
                    </ul>
                </div>        
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        templates:state.templates.templates,
        templateTypes:state.templates.templateTypes,
        loading:state.templates.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTemplates:() => dispatch(actionCreators.getTemplates()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Templates);