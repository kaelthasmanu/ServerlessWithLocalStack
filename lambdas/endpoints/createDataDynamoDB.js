const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tablenName = process.env.tableName;

exports.handler = async event => {
    console.log('Event received:', event);
    if (!event.pathParameters || !event.pathParameters.id) {
        return Responses._400({error: 'User ID is required'});
    }
    
    let ID = event.pathParameters.id;

    const data = JSON.parse(event.body);

    data.id = ID; // Aseguramos que el ID del usuario se incluya en los datos a guardar

    const newUser = await Dynamo.write(data, tablenName).catch(err => {
        console.error('Error writing user to DynamoDB:', err);
        return null;
    });
    
    if(!newUser) {
        return Responses._400({error: 'Error creating user'});
    }

    return Responses._200(newUser);
}