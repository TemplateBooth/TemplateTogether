import * as actionTypes from "./actionTypes";
import axios from "../../axios-base";
import Picker from "vanilla-picker";
import Color from "color-conversion";

let script;
let style;
let color_variables = [
    '--color_1',
    '--color_2',
    '--color_3',
    '--color_4',
    '--color_5',
    '--color_6',
    '--color_7',
    '--color_8',
    '--color_9',
    '--color_10',
    '--color_11',
    '--color_12',
    '--color_13',
    '--color_14',
    '--color_15',
    '--color_16',
    '--color_17',
    '--color_18', 
  ] 

export const getTemplate = (id) => {
    return dispatch => {
        console.log(id);
        axios.get("templates/content/" + id + "/",{
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            console.log(res);
            let index = res.data.cssContent.indexOf("}");
            let rootCss = res.data.cssContent.substring(0,res.data.cssContent.indexOf("}")+1);
            let extraCss = res.data.cssContent.substring(res.data.cssContent.indexOf("}")+1, );
            console.log(rootCss,extraCss);

            let code = {
                template:res.data,
                htmlContent:res.data.htmlContent,
                cssRootContent:rootCss,
                cssExtraContent:extraCss,
                jsContent:res.data.jsContent,
                loading:false,
                colors:new Array(res.data.colors),
                htmlUrl:res.data.htmlFile
            }         
            
            dispatch({
                type:actionTypes.SET_CODE,
                code:code
            })


        //newwwwwwww
        let no_of_colors = res.data.colors;
        let doc,current,color_variable;
        let iframe = document.getElementById("frame");
        iframe.onload = () => {
            console.log(document.documentElement,iframe.contentWindow.document)
            console.log(window.frames['myframe'].document)
            doc = window.frames['myframe'].document;
            
            for(let i=0;i<no_of_colors;i++){
                let color = '--color_' + String(i+1);
                let colorValue = getComputedStyle(doc.documentElement).getPropertyValue(color)
                document.documentElement.style.setProperty(color, colorValue);
                if(i==(no_of_colors-1)){
                    console.log("FINISHHHHH");
                }
            }


  
            let colorVariables = document.querySelectorAll(".color_vatiable");
                console.log(colorVariables);
            setTimeout(() => {
                let j=0;
                for(let i=0;i<colorVariables.length;i++){
                    console.log(i);
                    current = colorVariables[i];
                    console.log(current);
            
                    
                    let picker = new Picker(current);
                    let defcolor = getComputedStyle(document.documentElement).getPropertyValue(
                        "--color_" + String(i+1)
                    )
                    console.log("--color_" + String(i+1))
                    console.log(defcolor);
                    picker.settings.defaultColor = defcolor;
                    console.log(picker)
                    let changeCssTimeout = null;
                    picker.onChange = function (color) {
                        clearTimeout(changeCssTimeout);
                        console.log(color);
                        console.log(color);
                        changeCssTimeout = setTimeout(() => {
                            dispatch({
                                type:actionTypes.UPDATE_CSS_CODE,
                                name:"--color_" + String(i+1),
                                newColor:color.rgbaString
                         });
                         console.log("color change");
                        },400)
                        document.documentElement.style.setProperty("--color_" + String(i+1), color.rgbaString);
                        doc.documentElement.style.setProperty("--color_" + String(i+1) ,color.rgbaString);
                    };
                 }
            },200);
            
        } 

        //enddddd
            
            /*
            script = document.createElement("script");
            script.async = true;
            script.innerHTML = res.data.jsContent;
            document.body.appendChild(script);
            style = document.createElement("style");
            style.innerHTML = res.data.cssContent;
            document.head.appendChild(style);
            */
            /*color picker code*/ 

            /*

              let colorVariables = document.querySelectorAll(".color_vatiable");
                console.log(colorVariables);    
                let current;
                for(let i in colorVariables){
                  console.log(i);
                  current = colorVariables[i];
                  console.log(current);
                  let picker = new Picker(current);
                  console.log(picker)
                  var defcolor = getComputedStyle(document.documentElement).getPropertyValue(
                    color_variables[i]
                  )
                  console.log(defcolor);
                  var a = Color(defcolor);
                  picker.settings.defaultColor = defcolor;
                  console.log(picker.settings.defaultColor);
                  let changeCssTimeout = null;
                  picker.onChange = (color) => {
                    console.log(color);
                    clearTimeout(changeCssTimeout);
                    let currentColor = getComputedStyle(document.documentElement).getPropertyValue(
                        color_variables[i]
                    )
                    changeCssTimeout = setTimeout(() => {
                        console.log(currentColor,color.rgbaString);
                        dispatch({
                            type:actionTypes.UPDATE_CSS_CODE,
                            name:color_variables[i],
                            newColor:color.rgbaString
                     });
                     console.log("color change");
                    },400)
                    document.documentElement.style.setProperty(color_variables[i], color.rgbaString);
                  };
                  
              }

              */
        })
        .catch(err => {
            console.log(err);
        })
    }
}


export const removeCSSJS = () => {
    return dispatch => {
        
        //document.body.removeChild(script);
        //document.head.removeChild(style);
        dispatch({
            type:actionTypes.UNMOUNT_TEMPLATE
        })
    }
}