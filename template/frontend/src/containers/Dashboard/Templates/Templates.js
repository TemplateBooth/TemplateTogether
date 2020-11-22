import React, {Component,Fragment} from "react";
import {connect} from "react-redux";
import Loading from "../../../components/UI/Loader/Loader";
import * as actionCreators from "../../../store/actions/index";
import classes from "./Templates.module.css";
import Template from "../../Templates/Template/Template";

class Templates extends Component{


    componentDidMount(){
        this.props.getUserTemplates();
    }

    render(){

        let templates = (
        <div style={{marginTop:'100px'}}>
            <Loading/>
        </div>
        ) 
        

        if(this.props.templates){
            
        
                templates = (
                    <Fragment>

                <ul className={"list-group " + classes.template_list}> 
                    <div className={classes.Heading}>
                    Templates!
                    </div>     

                    {this.props.templates.length > 0 ? this.props.templates.map(template => {
                    return <Template template={template}/>
                }): (
                    <div className={classes.Sorry}>
                        You have not uploaded any templates till now!!
                    </div>
                )}       
                
                </ul>
                </Fragment>
             )
          
               
        }
        return (
            <div className={classes.UploadedTemplates}>
                <div className={classes.Templates + " mt-4"}>
                    {templates}
                </div>     
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        templates:state.auth.templates
    }
}
export const mapDispatchToProps = (dispatch) => {
    return {
        getUserTemplates:() => dispatch(actionCreators.getUserTemplates())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Templates);