import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { put, del } from "@vercel/blob";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_SIZE = 50 * 1024 * 1024; // 50MB

const ALLOWED_IMAGE = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_VIDEO = ["video/mp4", "video/webm", "video/quicktime"];

function validateFile(file: File) {
  if (file.size > MAX_SIZE) throw new Error("Arquivo muito grande (máx. 50MB)");

  const isVideo = ALLOWED_VIDEO.includes(file.type);
  const isImage = ALLOWED_IMAGE.includes(file.type);
  if (!isVideo && !isImage) {
    throw new Error("Formato não suportado. Use JPG, PNG, WebP, MP4 ou WebM.");
  }

  return { isVideo, isImage };
}

function fileExtension(file: File, isVideo: boolean) {
  return file.name.split(".").pop()?.toLowerCase() || (isVideo ? "mp4" : "jpg");
}

function useBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function saveToLocal(file: File, isVideo: boolean) {
  await mkdir(UPLOAD_DIR, { recursive: true });
  const ext = fileExtension(file, isVideo);
  const filename = `${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);
  return `/uploads/${filename}`;
}

async function saveToBlob(file: File, isVideo: boolean) {
  const ext = fileExtension(file, isVideo);
  const pathname = `midias/${randomUUID()}.${ext}`;
  const blob = await put(pathname, file, { access: "public" });
  return blob.url;
}

export async function saveUpload(file: File): Promise<{ url: string; tipo: "FOTO" | "VIDEO" }> {
  const { isVideo } = validateFile(file);

  let url: string;

  if (useBlobStorage()) {
    url = await saveToBlob(file, isVideo);
  } else if (process.env.VERCEL) {
    throw new Error(
      "Upload na Vercel requer Vercel Blob. Adicione BLOB_READ_WRITE_TOKEN nas variáveis de ambiente."
    );
  } else {
    url = await saveToLocal(file, isVideo);
  }

  return { url, tipo: isVideo ? "VIDEO" : "FOTO" };
}

export async function deleteUpload(url: string) {
  if (url.includes("blob.vercel-storage.com") || url.startsWith("https://")) {
    await del(url);
    return;
  }

  if (url.startsWith("/uploads/")) {
    try {
      await unlink(path.join(process.cwd(), "public", url));
    } catch {
      /* arquivo pode não existir */
    }
  }
}
