const Responses = require('../common/API_Responses');
const S3 = require('../common/S3');

const bucket = process.env.bucketName;

exports.handler = async event => {
    console.log('Event received:', event);
    if (!event.pathParameters || !event.pathParameters.fileName) {
        return Responses._400({error: 'File name is required'});
    }
    
    let fileName = event.pathParameters.fileName;
    const data = JSON.parse(event.body);

    const newData = await S3.write(fileName, bucket, data).catch(err => {
        console.error('Error writing file to S3:', err);
        return null;
    });
    
    if(!newData) {
        return Responses._404({error: 'File not found'});
    }

    return Responses._200(newData);
}