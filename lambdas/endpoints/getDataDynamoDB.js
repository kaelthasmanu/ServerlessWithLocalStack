const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tablenName = process.env.tableName;

exports.handler = async event => {
    console.log('Event received:', event);
    if (!event.pathParameters || !event.pathParameters.id) {
        return Responses._400({error: 'User ID is required'});
    }
    
    let ID = event.pathParameters.id;

    const user = await Dynamo.get(ID, tablenName).catch(err => {
        console.error('Error fetching user from DynamoDB:', err);
        return null;
    });
    
    if(!user) {
        return Responses._404({error: 'User not found'});
    }

    return Responses._200(user);
}