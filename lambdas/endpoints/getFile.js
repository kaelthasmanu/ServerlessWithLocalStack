const Responses = require('../common/API_Responses');
const S3 = require('../common/S3');

const bucket = process.env.bucketName;

exports.handler = async event => {
    console.log('Event received:', event);
    if (!event.pathParameters || !event.pathParameters.fileName) {
        return Responses._400({error: 'File name is required'});
    }
    
    let fileName = event.pathParameters.fileName;

    const file = await S3.get(fileName, bucket).catch(err => {
        console.error('Error getting file from S3:', err);
        return null;
    });
    
    if(!file) {
        return Responses._404({error: 'File not found'});
    }

    return Responses._200(file);
}