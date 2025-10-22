import express from "express";
import mongoose from "mongoose";
import { upload } from "./utils/imageUpload.js";
import Image from "./models/image.js";
import { getPresignedUrl } from "./utils/s3.js";

const app = express();

await mongoose.connect(process.env.MONGODB_URI);

app.post("/upload", upload.single("image"), async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const newImage = await Image.create({
    filename: file.filename || file.key,
    originalName: file.originalname,
    contentType: file.mimetype,
  });

  // Generate presigned URL if using S3
  let filePath = "";
  if (process.env.STORAGE_ENGINE === "s3") {
    filePath = await getPresignedUrl(file.key);
  } else {
    filePath = process.env.IMAGE_PATH + file.filename;
  }

  res.status(201).json({
    id: newImage.id,
    filePath,
    originalName: newImage.originalName,
    contentType: newImage.contentType,
  });
});

app.use(express.static("public"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
