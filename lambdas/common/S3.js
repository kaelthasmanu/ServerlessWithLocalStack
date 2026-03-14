const AWS = require('aws-sdk');

const endpoint = process.env.AWS_ENDPOINT_URL ||
    (process.env.LOCALSTACK_HOSTNAME
        ? `http://${process.env.LOCALSTACK_HOSTNAME}:4566`
        : 'http://localhost:4566');

const s3Client = new AWS.S3({
    endpoint,
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3ForcePathStyle: true,
});

const S3 = {
    async get (filename, bucket){
        const params = {
            Bucket: bucket,
            Key: filename
        };
        const result = await s3Client.getObject(params).promise();

        if (!result || !result.Body) {
            throw Error('File not found');
        }

        const bodyStr = result.Body.toString();
        const contentType = result.ContentType || '';

        if (contentType.includes('application/json') || filename.endsWith('.json')) {
            return JSON.parse(bodyStr);
        }

        return bodyStr;
    },
    async write (fileName, bucket, data) {
        const params = {
            Bucket: bucket,
            Key: fileName,
            Body: JSON.stringify(data),
            ContentType: 'application/json'
        };
        const result = await s3Client.putObject(params).promise();

        if (!result) {
            throw Error('Error writing file to S3');
        }

        console.log('S3 write result:', result);
        return data; // Devolvemos los datos escritos para confirmación
    }
}

module.exports = S3;