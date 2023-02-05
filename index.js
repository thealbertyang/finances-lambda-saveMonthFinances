const axios = require('axios');

/**
 * Pass the data to send as `event.data`, and the request options as
 * `event.options`. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */
exports.handler = async (event, context, callback) => {
    //1. Login
    const creds = {
        "email": "test@gmail.com",
        "password": "test"
    };
    const auth = (await axios.post(`https://api.finances.fyi/users/auth`, creds)).data;
    if(!auth.success){
        throw new Error('Authentication Failed');
    }
    
    //2. Save month finances
    
    const headers = {
        'Content-Type': 'application/json',
        'Cookie': `accessToken=${auth.data.accessToken}`,
    }
    
    const saveMonth = (await axios.get(`https://api.finances.fyi/finances/pullMonth`, {headers})).data; 
    console.log(saveMonth)
    if(!saveMonth.success){
        throw new Error('Save Month failed.');
    }
     
};
