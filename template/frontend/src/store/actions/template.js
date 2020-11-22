import * as actionTypes from "./actionTypes";
import axios from "../../axios-base";
import {tokenConfig} from "./auth";


export const postComment = (comment,id) => {
    return (dispatch,getState) => {

        let data = {
            comment:comment,
            template_id:id
        }

        axios.post("comments/create/",data,tokenConfig(getState))
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err.response.data);
        })
    }
}


export const getCommentsHandler = (id) => {
    return dispatch => {

        dispatch({
            type:actionTypes.SHOW_COMMENTS
        })
        axios.get("templates/" + id + "/comments/")
        .then(res => {
            dispatch({
                type:actionTypes.SET_COMMENTS,
                comments:res.data
            })
            console.log(res.data);
        })
        .catch(err => {
            console.log(err.response.data);
        })
    }
}


export const deleteTemplateHandler = (id) => {
    return (dispatch,getState) => {
        axios.delete("templates/" + id + "/",tokenConfig(getState))
        .then(res => {
            dispatch({
                type:actionTypes.DELETE_USER_TEMPLATE,
                id:id
            })
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })

    }

}