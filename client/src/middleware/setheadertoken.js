import axios from 'axios';

const setAuthToken  = token => {
    //console.log('checking token',token)
    if(token)
    {
        
        axios.defaults.headers.common['tokenJWT77'] = token;
    }
    else {
        delete axios.defaults.headers.common['tokenJWT77'];
    }
};
export default setAuthToken; 