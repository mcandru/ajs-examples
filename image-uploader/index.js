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

app.get("/file/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).json({ message: "Must provide a file Id!" });
  }

  const image = await Image.findById(id);
  if (!image) {
    return res.status(404).json({ message: "Image not found" });
  }

  if (process.env.STORAGE_ENGINE === "s3") {
    const presignedUrl = await getPresignedUrl(image.filename);
    return res.status(201).json({
      id: image.id,
      filePath: presignedUrl,
      originalName: image.originalName,
      contentType: image.contentType,
    });
  }

  return res.status(201).json({
    id: image.id,
    filePath: process.env.IMAGE_PATH + image.filename,
    originalName: image.originalName,
    contentType: image.contentType,
  });
});

app.use(express.static("public"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
