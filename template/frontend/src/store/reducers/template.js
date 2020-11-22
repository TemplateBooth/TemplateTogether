import * as actionTypes from "../actions/actionTypes";


const initialState = {
    showComments:false,
    comments:null,
    loading:false
}


const reducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.SHOW_COMMENTS:
            return {
                ...state,
                showComments:true,
                loading:true
            }
        case actionTypes.SET_COMMENTS:
            return {
                ...state,
                comments:action.comments,
                loading:false
            }
    }
    return state;
}

export default reducer;