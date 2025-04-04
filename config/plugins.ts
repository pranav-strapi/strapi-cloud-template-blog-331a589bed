module.exports = ({ env }) => {
  return ({
    upload: {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          s3Options: { // ✅ NEW: Wrap S3 options inside `s3Options`
            credentials: {
              accessKeyId: env('AWS_ACCESS_KEY_ID'),
              secretAccessKey: env('AWS_ACCESS_SECRET'),
            },
            region: env('AWS_REGION'),
            params: {
              ACL: env('AWS_ACL', 'public-read'),
              Bucket: env('AWS_BUCKET'),
            },
          },
          actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
          },
        },
      },
    }
  });
}