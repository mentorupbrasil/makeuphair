import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_SIZE = 50 * 1024 * 1024; // 50MB

const ALLOWED_IMAGE = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_VIDEO = ["video/mp4", "video/webm", "video/quicktime"];

export async function saveUpload(file: File): Promise<{ url: string; tipo: "FOTO" | "VIDEO" }> {
  if (file.size > MAX_SIZE) throw new Error("Arquivo muito grande (máx. 50MB)");

  const isVideo = ALLOWED_VIDEO.includes(file.type);
  const isImage = ALLOWED_IMAGE.includes(file.type);
  if (!isVideo && !isImage) throw new Error("Formato não suportado. Use JPG, PNG, WebP, MP4 ou WebM.");

  await mkdir(UPLOAD_DIR, { recursive: true });

  const ext = file.name.split(".").pop()?.toLowerCase() || (isVideo ? "mp4" : "jpg");
  const filename = `${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return {
    url: `/uploads/${filename}`,
    tipo: isVideo ? "VIDEO" : "FOTO",
  };
}
