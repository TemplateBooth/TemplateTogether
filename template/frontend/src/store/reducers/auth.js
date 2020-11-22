import * as actionTypes from "../actions/actionTypes";

const initialState = {
    IsAuthenticated:null,
    user:null,
    isLoading:false,
    token:null,
    error:null,
    message:null,
    templates:[]
}


const reducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return {
                ...state,
                isLoading:true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                IsAuthenticated:true,
                isLoading:false,
                token:action.token,
                user:action.user,
                error:null
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                IsAuthenticated:false,
                error:action.error,
                isLoading:false
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                IsAuthenticated:false,
                user:null,
                token:null,
            }
        case actionTypes.SET_MESSAGE:
            return {
                ...state,
                message:action.message,
                error:null
            }
        case actionTypes.SET_ERROR:
            return {
                ...state,
                error:action.error,
                message:null
            }
        case actionTypes.INIT_ERROR_MSG:
            return {
                ...state,
                message: null,
                error:null
                
            }
        case actionTypes.SET_USER_TEMPLATES:
            return {
                ...state,
                templates:action.templates
            }
        case actionTypes.ADD_USER_TEMPLATE:
            return {
                ...state,
                templates:state.templates.concat(action.template)
            }
        case actionTypes.DELETE_USER_TEMPLATE:
            return {
                ...state,
                templates:state.templates.filter(template => template.id !== action.id)
            }
        case actionTypes.UPDATE_USER:
            return {
                ...state,
                user:action.user
            }
    }
    return state;
}

export default reducer;