import * as actionTypes from "../actions/actionTypes";


const initialState = {
    templates:null,
    templateTypes:null,
    detail:false,
    loading:false
}


const reducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.LOADING_TEMPLATES:
            return {  
                ...state,
                loading:true
            } 
        case actionTypes.SET_TEMPLATES:
            return {
                ...state,
                templateTypes:action.templateTypes,
                templates:action.templates,
                loading:false
            }
        case actionTypes.SET_DETAIL:
            return {
                ...state,
                detail:true
            }
        case actionTypes.UNSET_DETAIL:
            return {
                ...state,
                detail:false
            }
        
    }
    return state;
}

export default reducer;