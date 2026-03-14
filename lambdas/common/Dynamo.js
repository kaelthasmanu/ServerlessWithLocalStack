const AWS = require('aws-sdk');

const endpoint = process.env.AWS_ENDPOINT_URL ||
    (process.env.LOCALSTACK_HOSTNAME
        ? `http://${process.env.LOCALSTACK_HOSTNAME}:4566`
        : 'http://localhost:4566');

const docClient = new AWS.DynamoDB.DocumentClient({
    endpoint,
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const Dynamo = {
    async get(ID, tableName) {
        const params = {
            TableName: tableName,
            Key: { id: ID }
        };
        const result = await docClient.get(params).promise();
        if (!result || !result.Item) {
            throw Error('User not found');
        }
        console.log('DynamoDB get result:', result);
        return result.Item;
    },
    async write(data, tableName) {
        if (!data.id) {
            throw Error('Data must include an id field');
        }
        const params = {
            TableName: tableName,
            Item: data
        };
        const result = await docClient.put(params).promise();
        console.log('DynamoDB write result:', result);
        return data; // Devolvemos los datos escritos para confirmación
    }
}

module.exports = Dynamo;