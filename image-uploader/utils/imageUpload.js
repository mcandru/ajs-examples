import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import { S3Client } from "@aws-sdk/client-s3";

let upload;

if (process.env.STORAGE_ENGINE === "s3") {
  // Configure AWS S3 client
  const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  // Configure multer to use S3 for storage
  const storage = multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (_req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (_req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  upload = multer({ storage: storage });
} else {
  // Configure multer to use local disk storage
  const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, "./public/uploads");
    },
    filename: function (_req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  upload = multer({ storage: storage });
}

export { upload };
