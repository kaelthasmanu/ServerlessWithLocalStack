const Responses = require('./API_Responses');

exports.handler = async event => {
    console.log('Event received:', event);
    if (!event.pathParameters || !event.pathParameters.id) {
        return Responses._400({error: 'User ID is required'});
    }

    let ID = event.pathParameters.id;
    if(data[ID]) {
        return Responses._200(data[ID]);
    }
    else {
        return Responses._404({error: 'User not found'});
    }
}

const data = {
    123: {name: 'John Doe', email: 'john.doe@example.com', age: 30},
    456: {name: 'Jane Smith', email: 'jane.smith@example.com', age: 25}
}