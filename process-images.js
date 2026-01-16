import fs from "fs";
import path from "path";
import sharp from "sharp";

const IN_DIR = "static-content/uploads";
const OUT_DIR = "static-content/processed";

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const files = fs.readdirSync(IN_DIR);

for (const file of files) {
  const inputPath = path.join(IN_DIR, file);

  // skip folders
  if (fs.statSync(inputPath).isDirectory()) continue;

  const outputName = file.replace(/\.(png|jpg|jpeg)$/i, ".webp");
  const outputPath = path.join(OUT_DIR, outputName);

  console.log("Processing:", inputPath);

  await sharp(inputPath)
    .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outputPath);

  console.log("Saved:", outputPath);
}
