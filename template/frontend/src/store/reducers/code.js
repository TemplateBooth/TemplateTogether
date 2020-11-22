import * as actionTypes from "../actions/actionTypes";


const initialState = {
    loading:true,
    htmlContent:null,
    cssRootContent:null,
    cssExtraContent:null,
    jsContent:null,
    colors:null,
    template:null,
    htmlUrl:null
}


const reducer = (state = initialState,action) => {
    switch(action.type){
       case actionTypes.SET_CODE:
           return {
               ...state,
               ...action.code
           }
        case actionTypes.UPDATE_CSS_CODE:
            let index = state.cssRootContent.indexOf(action.name);
            let newColor = state.cssRootContent.slice(index + action.name.length - 1,).match(/:(.*)\;/)[1];
            newColor = newColor.trim();
            console.log(newColor);
            return {
                ...state,
                cssRootContent:state.cssRootContent.replace(newColor, action.newColor)
           }
        case actionTypes.UNMOUNT_TEMPLATE:
            return {
                ...state,
                loading:true,
                htmlContent:null,
                cssRootContent:null,
                cssExtraContent:null,
                jsContent:null,
                colors:null,
                template:null

            }
    }
    return state;
}

export default reducer;