const aws = require('aws-sdk'),
config = require('./config.js'),
multer = require('multer'),
multerS3 = require('multer-s3');

//Config to connect to aws
aws.config.update(config);

//Upload function for AWS
const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'plus1health',
      key: (req, file, cb) => {
        cb(null, Date.now().toString()); //unique file names
      }
    })
  });

module.exports = upload;
