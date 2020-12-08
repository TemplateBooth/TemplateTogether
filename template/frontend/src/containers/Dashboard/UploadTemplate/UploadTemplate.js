/*
import React, {Component} from "react";
import classes from "./UploadTemplate.module.css";
import * as actionCreators from "../../../store/actions/index";
import {connect} from "react-redux";

class UploadTemplate extends Component{
    state = {
        templateType:'Navigation Bar',
        description:'',
        htmlFile:null,
        cssFile:null,
        jsFile:null,
        colors:0
    }
    onFileChangeHandler = (e) => {
        this.setState({
            [e.target.name]:e.target.files[0]
        })
        console.log(e.target.files[0]);
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
        console.log(this.state);
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        const {templateType, description, htmlFile, cssFile, jsFile,colors} = this.state;
        this.props.uploadTemplate(templateType,description,htmlFile,cssFile,jsFile,colors);
    }

    render(){

        const templateChoice = {
            Nav:'Navigation Bar',
            Footer:'Footer',
            FullPage:'Full Page'
        }

        return (
            <div className={classes.UploadTemplate}>

            <form onSubmit={this.onSubmitHandler} className={classes.Form}>
                <div className={classes.Heading}>
                    Upload Template!
                </div>
                <div class="form-row">
                    <div className="form-group col-md-12">
                    <label for="templateType">Template Type</label>
                    <select id="templateType" name="templateType" value={this.state.templateType} onChange={this.onChangeHandler} class="form-control form-control-lg">
                    {Object.keys(templateChoice).map((key,index) => {
                        console.log(key,index)
                        return (
                        <option value={templateChoice[key]}  key={index}>{key}</option>
                        )
                    })}
                    </select>
                    </div>
                </div>
                <div className="form-group">
                    <label for="description">Description</label>
                    <textarea onChange={this.onChangeHandler} name="description" value={this.state.description} type="text" className="form-control" id="description" />
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label for="exampleFormControlFile1">HTML file</label>
                        <input type="file" name="htmlFile" onChange={this.onFileChangeHandler} class="form-control-file" id="exampleFormControlFile1"/>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="exampleFormControlFile1">CSS file</label>
                        <input type="file" name="cssFile" onChange={this.onFileChangeHandler} class="form-control-file" id="exampleFormControlFile1"/>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="exampleFormControlFile1">JS file</label>
                        <input type="file" name="jsFile" onChange={this.onFileChangeHandler} class="form-control-file" id="exampleFormControlFile1"/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="colors">No of colors</label>
                    <input onChange={this.onChangeHandler} name="colors" value={this.state.colors} type="number" className="form-control" id="colors" />
                </div>

                <button type="submit" className={"btn " + classes.Button}>Upload</button>
                </form>
        </div>
        )
    }
}



export const mapDispatchToProps = (dispatch) => {
    return {
        uploadTemplate:(templateType,description,htmlFile,cssFile,jsFile,colors) => dispatch(actionCreators.uploadTemplate(templateType,description,htmlFile,cssFile,jsFile,colors)),
    }
}
export default connect(null,mapDispatchToProps)(UploadTemplate);
*/




import React, { Component } from "react";
import classes from "./UploadTemplate.module.css";
import './upload.css';
import * as actionCreators from "../../../store/actions/index";
import { connect } from "react-redux";

class UploadTemplate extends Component {

    constructor(props) {
        super(props);
        this.drop1 = React.createRef();
        this.drop2 = React.createRef();
        this.drop3 = React.createRef();
        this.drop4 = React.createRef();
    }

    state = {
        templateType: 'Navigation Bar',
        description: '',
        htmlFile: null,
        cssFile: null,
        jsFile: null,
        mediaFile:[],
        colors: 0,
        dragging: false,
    }

    componentDidMount() {
        let div1 = this.drop1.current
        let div3 = this.drop3.current
        let div2 = this.drop2.current
        let div4 = this.drop4.current

        console.log(div2)
        div1.addEventListener('dragenter', this.handleDragIn)
        div1.addEventListener('dragleave', this.handleDragOut)
        div1.addEventListener('dragover', this.handleDrag)
        div1.addEventListener('drop', this.handleDrop)

        div2.addEventListener('dragenter', this.handleDragIn)
        div2.addEventListener('dragleave', this.handleDragOut)
        div2.addEventListener('dragover', this.handleDrag)
        div2.addEventListener('drop', this.handleDrop)

        div3.addEventListener('dragenter', this.handleDragIn)
        div3.addEventListener('dragleave', this.handleDragOut)
        div3.addEventListener('dragover', this.handleDrag)
        div3.addEventListener('drop', this.handleDrop)

        div4.addEventListener('dragenter', this.handleDragIn)
        div4.addEventListener('dragleave', this.handleDragOut)
        div4.addEventListener('dragover', this.handleDrag)
        div4.addEventListener('drop', this.handleDrop)
    }
    componentWillUnmount() {
        let div1 = this.drop1.current
        let div3 = this.drop3.current
        let div2 = this.drop2.current
        let div4 = this.drop4.current
        div1.removeEventListener('dragenter', this.handleDragIn)
        div1.removeEventListener('dragleave', this.handleDragOut)
        div1.removeEventListener('dragover', this.handleDrag)
        div1.removeEventListener('drop', this.handleDrop)

        div2.removeEventListener('dragenter', this.handleDragIn)
        div2.removeEventListener('dragleave', this.handleDragOut)
        div2.removeEventListener('dragover', this.handleDrag)
        div2.removeEventListener('drop', this.handleDrop)

        div3.removeEventListener('dragenter', this.handleDragIn)
        div3.removeEventListener('dragleave', this.handleDragOut)
        div3.removeEventListener('dragover', this.handleDrag)
        div3.removeEventListener('drop', this.handleDrop)

        div4.removeEventListener('dragenter', this.handleDragIn)
        div4.removeEventListener('dragleave', this.handleDragOut)
        div4.removeEventListener('dragover', this.handleDrag)
        div4.removeEventListener('drop', this.handleDrop)
    }
    handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('handleDrag')
    }

    handleDragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('handleDragIn')
        this.addingHighlight(e);
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({
                ...this.state,
                dragging: true,
            })

        }

    }
    handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('handleDragOut')
        this.setState({
            ...this.state,
            dragging: false,
        })
        this.removingHighlight(e);
    }
    handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('handleDrop', e)
        console.log(e.target.childNodes[0].childNodes[1].id)
        console.log("e---------TARGTE",e.target)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            if(e.target.childNodes[0].childNodes[1].id==='mediaFile'){
                // let dop = []
                // console.log(typeof dop)
                // let obj = e.dataTransfer.files
                // let keys = Object.keys(obj)
                // for(let i in keys){
                // dop.push(obj[i])
                // }
                // console.log(typeof dop,"fmmmmmmmmm",e.dataTransfer.files)
                this.setState({
                    ...this.state,
                    [e.target.childNodes[0].childNodes[1].id]: e.dataTransfer.files
                })
            }else{
                this.setState({
                    ...this.state,
                    [e.target.childNodes[0].childNodes[1].id]: e.dataTransfer.files[0]
                })
            }
           
            this.addingHighlight(e);
            const div = document.createElement('div')
            div.innerHTML = `<span id="upload-span" style="padding-right:30px">${e.dataTransfer.files[0].name}</span>`
            console.log(e)
            console.log(e.target)
            console.log(e.target.lastElementChild.childNodes[e.target.lastElementChild.childNodes.length - 1].tagName);
            if (e.target.firstChild.lastElementChild.tagName === 'DIV') {

                e.target.firstChild.removeChild(e.target.firstChild.lastElementChild);
            }
            e.target.firstChild.append(div);
            console.log(e.target.lastElementChild)
        }
    }
    onFileChangeHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e)
        if(e.target.id==='mediaFile'){
            // let dop = []
            // console.log(typeof dop)
            // let obj = e.target.files 
            // let keys = Object.keys(obj)
            // for(let i in keys){
            //     dop.push(obj[i])
            // }
            // console.log(typeof dop,"fmmmmmmmmm",dop)
            this.setState({
                ...this.state,
                [e.target.id]: e.target.files 
            })
        }else{
            this.setState({
                ...this.state,
                [e.target.id]: e.target.files[0]
            })
        }
       
        console.log("target values---------",e.target.files);
        const div = document.createElement('div')
        div.innerHTML =  `<span id="upload-span" style="padding-right:30px">${
            e.target.files[0].name
        }</span>`
        console.log(e)
        // console.log(e.target)
        // console.log(e.target.lastElementChild.childNodes[e.target.lastElementChild.childNodes.length-1].tagName);
        if (e.target.parentElement.lastElementChild.tagName === 'DIV') {

            e.target.parentElement.removeChild(e.target.parentElement.lastElementChild);
        }
        e.target.parentElement.append(div);
        // console.log(e.target.lastElementChild)
        this.addingHighlight(e)

    }
    addingHighlight = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("hightlight", e.target.id)
        if (e.target.id === "d1" || e.target.id === "htmlFile") {

            console.log('hello');
            this.drop1.current.classList.value = "highlight";
        }
        if (e.target.id === "d2" || e.target.id === "cssFile") {

            this.drop2.current.classList.value = "highlight";
        }
        if (e.target.id === "d3" || e.target.id === "jsFile") {

            this.drop3.current.classList.value = "highlight";
        }
        if (e.target.id === "d4" || e.target.id === "mediaFile") {

            this.drop4.current.classList.value = "highlight";
        }

    }
    removingHighlight = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.target.id === "d1" || e.target.id === "htmlFile") {

            console.log('hello');
            this.drop1.current.classList.value = "";
        }
        if (e.target.id === "d2" || e.target.id === "cssFile") {

            this.drop2.current.classList.value = "";
        }
        if (e.target.id === "d3" || e.target.id === "jsFile") {

            this.drop3.current.classList.value = "";
        }
        if (e.target.id === "d4" || e.target.id === "mediaFile") {

            this.drop4.current.classList.value = "";
        }
    }
    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state);
    }
    // onInputDrop = (e) => {

    //     console.log('hello')
    //     e.stopPropagation();
    //     e.preventDefault();

    //     let dt = e.dataTransfer
    //     let files = dt.files
    //     console.log(files)
    //     console.log(files[0].name)

    //     this.setState({
    //         [e.target.id]:e.target.files[0]
    //     })

    //     const div = document.createElement('div')
    //     div.innerHTML = `<span style="padding-right:30px">${files[0].name}</span>`
    //     console.log(e.target);


    // }

    onSubmitHandler = (e) => {
        e.preventDefault();
        const { templateType, description, htmlFile, cssFile, jsFile,mediaFile, colors } = this.state;
        console.log("submit-handler" ,mediaFile)

        this.props.uploadTemplate(templateType, description, htmlFile, cssFile, jsFile,mediaFile, colors);
    }



    render() {

        const templateChoice = {
            Nav: 'Navigation Bar',
            Footer: 'Footer',
            FullPage: 'Full Page'
        }


        return (

            <div className={classes.UploadTemplate}>

                <form onSubmit={this.onSubmitHandler} className={classes.Form} encType="multipart/form-data">
                    <div className={classes.Heading}>
                        Upload Template!
                </div>
                    <div class="form-row">
                        <div className="form-group col-md-12">
                            <label for="templateType">Template Type</label>
                            <select id="templateType" name="templateType" value={this.state.templateType} onChange={this.onChangeHandler} class="form-control form-control-lg">
                                {Object.keys(templateChoice).map((key, index) => {
                                    console.log(key, index)
                                    return (
                                        <option value={templateChoice[key]} key={index}>{key}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="description">Description</label>
                        <textarea onChange={this.onChangeHandler} name="description" value={this.state.description} type="text" className="form-control" id="description" />
                    </div>

                    {/* <div className="form-row">
                    <div className="form-group col-md-4">
                        <label for="exampleFormControlFile1">HTML file</label>
                        <input type="file" name="htmlFile" onChange={this.onFileChangeHandler} class="form-control-file" id="exampleFormControlFile1"/>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="exampleFormControlFile1">CSS file</label>
                        <input type="file" name="cssFile" onChange={this.onFileChangeHandler} class="form-control-file" id="exampleFormControlFile1"/>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="exampleFormControlFile1">JS file</label>
                        <input type="file" name="jsFile" onChange={this.onFileChangeHandler} class="form-control-file" id="exampleFormControlFile1"/>
                    </div>
                </div> */}
                    <div className="container">
                        <div className="containerChild1">
                            <h1>Upload Your Project Files One By One</h1>
                        </div>

                        <div className="containerChild2">
                            <div ref={this.drop1} id="d1">
                                <div className="myForm">
                                    <p>Choose A HTML File or Drag And Drop them</p>
                                    <input className="yelo y2" type="file" id="htmlFile" multiple accept="files/*" onChange={this.onFileChangeHandler} />
                                    <label className="button" for="htmlFile"><figure><svg xmlns="http://www.w3.org/2000/svg" width="12" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg></figure></label>
                                </div>
                            </div>
                            <div ref={this.drop2} id="d2">
                                <div className="myForm">
                                    <p>Choose A CSS File or Drag And Drop them</p>
                                    <input className="yelo y2" type="file" id="cssFile" multiple accept="files/*" onChange={this.onFileChangeHandler} />
                                    <label className="button" for="cssFile"><figure><svg xmlns="http://www.w3.org/2000/svg" width="12" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg></figure></label>
                                </div>
                            </div>
                            <div ref={this.drop3} id="d3">
                                <div className="myForm">
                                    <p>Choose A JS File or Drag And Drop them</p>
                                    <input className="yelo y3" type="file" id="jsFile" multiple accept="files/*" onChange={this.onFileChangeHandler} />
                                    <label className="button" for="jsFile"><figure><svg xmlns="http://www.w3.org/2000/svg" width="12" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg></figure></label>
                                </div>
                            </div>
                            <div ref={this.drop4} id="d4">
                                <div className="myForm">
                                    <p>Choose Media File Folder or Drag And Drop them</p>
                                    <input className="yelo y4" type="file" id="mediaFile" multiple accept="files/*" onChange={this.onFileChangeHandler} />
                                    <label className="button" for="mediaFile"><figure><svg xmlns="http://www.w3.org/2000/svg" width="12" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg></figure></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="colors">No of colors</label>
                        <input onChange={this.onChangeHandler} name="colors" value={this.state.colors} type="number" className="form-control" id="colors" />
                    </div>

                    <button type="submit" className={"btn " + classes.Button}>Upload</button>
                </form>
            </div>
        )
    }
}



export const mapDispatchToProps = (dispatch) => {
    return {
        uploadTemplate: (templateType, description, htmlFile, cssFile, jsFile,mediaFile, colors) => dispatch(actionCreators.uploadTemplate(templateType, description, htmlFile, cssFile, jsFile,mediaFile, colors)),
    }
}
export default connect(null, mapDispatchToProps)(UploadTemplate);