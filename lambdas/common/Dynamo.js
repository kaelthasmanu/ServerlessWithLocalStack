const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

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
    }
}

module.exports = Dynamo;