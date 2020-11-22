import * as actionTypes from "./actionTypes";
import axios from "../../axios-base";

export const authSuccess = (token,user) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        user:user
    }
}

export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    }
}

export const authLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({
            type:actionTypes.AUTH_LOGOUT
        })
    }
}

export const authSubmit = (username, password) => {
    return (dispatch) => {
        dispatch(authStart());
        let data = {
            "username": username,
            "password":password
        }
        
        axios.post("users/login/",data)
        .then(res => {
            console.log(res.data);
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('user',JSON.stringify(res.data.user))

            console.log(localStorage.getItem('token'),localStorage.getItem('user'),localStorage.getItem('IsAuthenticated'))
            dispatch(authSuccess(res.data.token, res.data.user));
        })
        .catch(err => {
            console.log(err);
            
            let errors = [];
            for(let error in err.response.data){
                errors.push(err.response.data[error]);
            }
            console.log(errors);
            dispatch(authFail(errors));
            
        })
    }
}


export const setMessage = (msg) => {
    return {
        type:actionTypes.SET_MESSAGE,
        message:msg
    }
}

export const setError = (errors) => {
    return {
        type:actionTypes.SET_ERROR,
        error:errors
    }
}

export const initErrorMessage = () => {
    return {
        type:actionTypes.INIT_ERROR_MSG
    }
}

export const authRegister = (username,email,password) => {
    return dispatch => {
        
        let data = {
            "username": username,
            "email":email,
            "password":password
        }

        axios.post("users/register/",data)
        .then(res => {
            console.log(res.data);
            dispatch(setMessage('You have been registered!'));
        })
        .catch(err => {
            let errors = [];
            for(let error in err.response.data){
                errors.push(err.response.data[error]);
            }
            console.log(errors);
            dispatch(setError(errors));
            
        })
    }
}

export const setAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('user'));
            console.log(user);
            dispatch(authSuccess(token,user));
        }
        else{
            dispatch(authLogout());
        }
    }
}


export const uploadTemplate = (template_type,description,htmlFile,cssFile,jsFile,colors) => {
    return (dispatch,getState) => {                       

       
        console.log(tokenConfig(getState));

        let fd = new FormData();
        fd.append('template_type',template_type,);
        fd.append('description',description);
        fd.append('colors',colors);
        
        if(htmlFile!=null){
            fd.append('htmlFile',htmlFile,htmlFile.name);   
        }
        if(cssFile != null){
            fd.append('cssFile',cssFile,cssFile.name);
        }
        if(jsFile!=null){
            fd.append('jsFile',jsFile,jsFile.name);
        }


        axios.post("templates/auth/create/",fd,tokenConfig(getState))
        .then(res => {
            console.log(res);
            dispatch(setMessage('Thankyou for uploading your template!'));
            dispatch({
                type:actionTypes.ADD_USER_TEMPLATE,
                template:res.data
            })

        })
        .catch(err => {
            
            console.log(err);
            
            let errors = [];
            for(let error in err.response.data){
                errors.push(err.response.data[error]);
            }
            console.log(errors);
            dispatch(setError(errors));
            
            
        })
    }
}


export const getUserTemplates = () => {
    return (dispatch,getState) => {
        axios.get("templates/user/",tokenConfig(getState))
        .then(res => {
            console.log(res.data)

            dispatch({
                type:actionTypes.SET_USER_TEMPLATES,
                templates:res.data
            })
        })
        .catch(err => {
            console.log(err.response.data);
        })
    }
}



export const tokenConfig = (getState) => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
};