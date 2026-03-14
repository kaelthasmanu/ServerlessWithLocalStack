const Responses = require('../common/API_Responses');

exports.handler = async event => {
    console.log('Event received:', event);
   
    return Responses._200();
  
}
