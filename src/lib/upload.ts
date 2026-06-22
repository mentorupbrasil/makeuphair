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

export function blobOptions() {
  const storeId = process.env.BLOB_STORE_ID;
  return storeId ? { storeId } : {};
}

function blobAccess(): "public" | "private" {
  return process.env.BLOB_ACCESS === "public" ? "public" : "private";
}

function useBlobStorage() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return true;
  if (process.env.VERCEL && process.env.BLOB_STORE_ID) return true;
  return false;
}

export function blobPathnameFromUrl(url: string): string | null {
  if (url.startsWith("/api/media/")) {
    return url.replace("/api/media/", "");
  }
  return null;
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
  const access = blobAccess();
  const blob = await put(pathname, file, {
    access,
    ...blobOptions(),
  });

  // Store privado: servir via proxy /api/media (store da Vercel é private por padrão)
  if (access === "private") {
    return `/api/media/${pathname}`;
  }
  return blob.url;
}

export async function saveUpload(file: File): Promise<{ url: string; tipo: "FOTO" | "VIDEO" }> {
  const { isVideo } = validateFile(file);

  let url: string;

  if (useBlobStorage()) {
    url = await saveToBlob(file, isVideo);
  } else if (process.env.VERCEL) {
    throw new Error(
      "Configure o Vercel Blob: conecte o store ao projeto ou adicione BLOB_READ_WRITE_TOKEN."
    );
  } else {
    url = await saveToLocal(file, isVideo);
  }

  return { url, tipo: isVideo ? "VIDEO" : "FOTO" };
}

export async function deleteUpload(url: string) {
  const pathname = blobPathnameFromUrl(url);
  if (pathname) {
    await del(pathname, blobOptions());
    return;
  }

  if (url.includes("blob.vercel-storage.com") || url.startsWith("https://")) {
    await del(url, blobOptions());
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
