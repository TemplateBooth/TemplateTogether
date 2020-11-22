import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";
import classes from "./Snippet.module.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { irBlack as theme } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Loader from "../../../components/UI/Loader/Loader";
import Picker from "vanilla-picker";
import Color from "color-conversion";

class Snippet extends Component {
    state = {

    }
    copyHandler = (id) => {
        console.log("df")
        let temp = document.createElement("input");
        document.documentElement.appendChild(temp);
        if (id == 1) {
            temp.value = this.props.htmlContent;
        }
        else if (id == 2) {
            temp.value = this.props.cssRootContent + this.props.cssExtraContent;
        }
        else {
            temp.value = this.props.jsContent;
        }

        temp.select();
        document.execCommand("copy");
        document.documentElement.removeChild(temp);
    }

    render() {
        return (
            <div className={"row no-gutters " + classes.Code}>
                <div className={"col-4 " + classes.col}>

                    <button onClick={this.copyHandler.bind(this, 1)} class={classes.copy}>
                        copy
                            </button>
                    <span class={classes.heading}>
                        HTML
                            </span>

                    <div class={classes.html}>
                        {this.props.loading ? (
                            <div className={classes.CodeContainer}>
                                <Loader />
                            </div>
                        ) : this.props.htmlContent ? (
                            <div className={classes.CodeContainer}>
                                <SyntaxHighlighter language="html" style={theme}>
                                    {this.props.htmlContent}
                                </SyntaxHighlighter>
                            </div>

                        ) : null
                        }

                    </div>
                </div>
                <div className={"col-4 " + classes.col}>
                    <button onClick={this.copyHandler.bind(this, 2)} class={classes.copy}>
                        copy
                            </button>
                    <span class={classes.heading}>
                        CSS
                            </span>
                    <div class={classes.css}>
                        {this.props.loading ? (
                            <div className={classes.CodeContainer}>
                                <Loader />
                            </div>
                        ) : this.props.cssRootContent ? (
                            <React.Fragment>
                                <div className={classes.CodeContainer}>
                                    <SyntaxHighlighter language="css" style={theme}>
                                        {this.props.cssRootContent}

                                    </SyntaxHighlighter>
                                    <SyntaxHighlighter language="css" style={theme}>
                                        {this.props.cssExtraContent}
                                    </SyntaxHighlighter>
                                </div>

                            </React.Fragment>

                        ) : null
                        }
                    </div>

                </div>
                <div className={"col-4 " + classes.col}>
                    <button onClick={this.copyHandler.bind(this, 3)} class={classes.copy}>
                        copy
                            </button>
                    <span class={classes.heading}>
                        JS
                            </span>
                    <div class={classes.js}>
                        {this.props.loading ? (
                            <div className={classes.CodeContainer}>
                                <Loader />
                            </div>
                        ) : this.props.jsContent ? (
                            <div className={classes.CodeContainer}>
                                <SyntaxHighlighter language="js" style={theme}>
                                    {this.props.jsContent}
                                </SyntaxHighlighter>
                            </div>

                        ) : null
                        }


                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.code.loading,
        htmlContent: state.code.htmlContent,
        cssRootContent: state.code.cssRootContent,
        cssExtraContent: state.code.cssExtraContent,
        jsContent: state.code.jsContent,
        loading: state.code.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTemplate: (id) => dispatch(actionCreators.getTemplates(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Snippet);


