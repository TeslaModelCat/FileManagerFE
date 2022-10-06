const {
  NODEMAILER_HOST, NODEMAILER_PORT, NODEMAILER_USER,
  NODEMAILER_PASSWORD, NODEMAILER_DEFAULT_SENDER,
  MONGODB_URI, S3_BUCKET, S3_REGION,
  AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID,
} = process.env;

const MAIL_SERVICE = {
  host: NODEMAILER_HOST,
  port: NODEMAILER_PORT ? Number(NODEMAILER_PORT) : null,
  username: NODEMAILER_USER,
  password: NODEMAILER_PASSWORD,
  emailFrom: NODEMAILER_DEFAULT_SENDER
};
const DB = {
  connectionString: MONGODB_URI
};
const AWS = {
  s3Bucket: S3_BUCKET,
  s3Region: S3_REGION,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  accessKeyId: AWS_ACCESS_KEY_ID,
};

module.exports = {
  MAIL_SERVICE, DB, AWS
};