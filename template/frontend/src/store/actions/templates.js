import * as actionTypes from "./actionTypes";
import axios from "../../axios-base";
import {tokenConfig} from "./auth";


export const getTemplates = () => {
    return (dispatch,getState) => {
        dispatch({
            type:actionTypes.LOADING_TEMPLATES
        })

        setTimeout(() => {
            axios.get("templates/",tokenConfig(getState))
            .then(res => {
                console.log(res.data);
                let templateTypes = {};
                let template;
                for(let i in res.data){
                    template = res.data[i]
                    console.log(template)
                    if(templateTypes[template.template_type]){
                        templateTypes[template.template_type].push(template);
                    }
                    else{
                        templateTypes[template.template_type] = new Array(template);
                    }
                }
                console.log(templateTypes);
                dispatch({
                    type:actionTypes.SET_TEMPLATES,
                    templateTypes:templateTypes,
                    templates:res.data
                })
               
            })
            .catch(err => {
                console.log(err);
            })
        },500);
       
    }
}
