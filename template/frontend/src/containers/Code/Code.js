import axios from "axios";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import SyntaxHighlighter from "react-syntax-highlighter";
import { irBlack as theme } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import classes from "./Code.module.css";
import * as actionTypes from "../../store/actions/actionTypes";
import Picker from "vanilla-picker";
import Color from "color-conversion";
import Loader from "../../components/UI/Loader/Loader";
import Code from "./Snippet/Snippet";
import * as actionCreators from "../../store/actions/index";


const classNamesOfColors = [classes.color1, classes.color2, classes.color3, classes.color4, classes.color5, classes.color6, classes.color7, classes.color8, classes.color9, classes.color10, classes.color11, classes.color12, classes.color13, classes.color14, classes.color15, classes.color16, classes.color17, classes.color18]
class CodeSample extends React.Component {

    componentDidMount() {
        /*add js file*/
        /*end*/
        console.log("***")
        this.props.setDetail();
        document.getElementsByTagName("body")[0].style.marginTop = "0px";
        const { id } = this.props.match.params;
        const template = null;
        console.log(this.props.templates);
        this.props.getTemplate(id);
        /*const script = document.createElement("script");
        script.async = true;
        script.innerHTML = this.props.jsContent;
        document.body.appendChild(script);
        const style = document.createElement("style");
        style.innerHTML = this.props.cssContent;
        document.head.appendChild(style);
        console.log(document.head);*/

    }

    componentWillUnmount() {
        this.props.unsetDetail();
        document.getElementsByTagName("body")[0].style.marginTop = "70px";
        this.props.removeCSSJS();
        console.log("unmount");
    }



    render() {

        let once = true
        let template = null;
        if (this.props.template) {
            template = (
                <div>

                    <div className={classes.Type}>

                        <span>
                            {this.props.template.template_type}
                        </span>
                    </div>
                </div>
            )
        }
        if (this.props.colors) {
            console.log(classNamesOfColors.slice(0, 4));
        }




        return (
            <Fragment>
                <div class={classes.sidebar}>
                    hahaha
                </div>
                {template}

                <div className={classes.colorChange}>
                    {this.props.colors ? (
                        /*slice(0,this.props.colors)*/
                        [...this.props.colors].map((_, index) => {
                            let name = "var(--color_" + (index + 1) + ")";
                            //console.log(name);
                            return (
                                <div style={{ backgroundColor: name }} class={"color_vatiable"}>
                                </div>
                            )
                        })
                    ) : null}
                </div>

                <div class={classes.visual}>
                    {this.props.loading ? (
                        <div style={{ height: '100%' }}>
                            <Loader />
                        </div>
                    ) : this.props.htmlContent ? (
                        /*<div class={classes.container} dangerouslySetInnerHTML={{ __html: this.props.htmlContent }}/>*/
                        <iframe id="frame" name="myframe" width="100%" height="100%" src={"http://localhost:8002" + this.props.htmlUrl}></iframe>
                    ) : null}
                </div>

                <Code />


            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        templates: state.templates.templates,
        htmlContent: state.code.htmlContent,
        template: state.code.template,
        loading: state.code.loading,
        colors: state.code.colors,
        htmlUrl: state.code.htmlUrl
    }
}


const mapDispatchToProps = dispatch => {
    return {
        setDetail: () => dispatch({
            type: actionTypes.SET_DETAIL
        }),
        unsetDetail: () => dispatch({
            type: actionTypes.UNSET_DETAIL
        }),
        getTemplate: (id) => dispatch(actionCreators.getTemplate(id)),
        removeCSSJS: () => dispatch(actionCreators.removeCSSJS()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeSample);