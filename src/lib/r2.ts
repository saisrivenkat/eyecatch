import "server-only";
import { AwsClient } from "aws4fetch";

interface R2Config {
  accountId: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
  publicBaseUrl: string;
}

function extractAccountId(raw: string): string {
  // Accept either the bare account hash or the full S3 endpoint URL.
  // e.g. "https://abc123.r2.cloudflarestorage.com/bucket" -> "abc123"
  const match = raw.match(/([a-f0-9]{32})\.r2\.cloudflarestorage\.com/i);
  if (match) return match[1];
  // Strip any accidental scheme/path leftovers.
  return raw.replace(/^https?:\/\//, "").split(/[./]/)[0];
}

function readConfig(): R2Config {
  const rawAccountId = process.env.R2_ACCOUNT_ID;
  const bucket = process.env.R2_BUCKET;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL;

  if (
    !rawAccountId ||
    !bucket ||
    !accessKeyId ||
    !secretAccessKey ||
    !publicBaseUrl
  ) {
    throw new Error(
      "R2 is not fully configured. Required env vars: R2_ACCOUNT_ID, R2_BUCKET, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_PUBLIC_BASE_URL.",
    );
  }

  const accountId = extractAccountId(rawAccountId.trim());
  if (!/^[a-f0-9]{32}$/i.test(accountId)) {
    throw new Error(
      `R2_ACCOUNT_ID does not look like a Cloudflare account hash. Got "${accountId}" — expected a 32-character hex string.`,
    );
  }

  return { accountId, bucket, accessKeyId, secretAccessKey, publicBaseUrl };
}

export function isR2Configured(): boolean {
  return Boolean(
    process.env.R2_ACCOUNT_ID &&
      process.env.R2_BUCKET &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_PUBLIC_BASE_URL,
  );
}

function sanitizeFilename(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface PresignedUploadResult {
  uploadUrl: string;
  publicUrl: string;
  key: string;
}

export async function presignR2Upload(input: {
  filename: string;
  contentType: string;
}): Promise<PresignedUploadResult> {
  const config = readConfig();

  const cleanName = sanitizeFilename(input.filename) || "file";
  const key = `eyecatch/uploads/${Date.now()}-${cleanName}`;

  const aws = new AwsClient({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    service: "s3",
    region: "auto",
  });

  // Path-style URL: <account>.r2.cloudflarestorage.com/<bucket>/<key>
  // X-Amz-Expires sets the presigned-URL TTL (10 minutes).
  const target = new URL(
    `https://${config.accountId}.r2.cloudflarestorage.com/${config.bucket}/${key}`,
  );
  target.searchParams.set("X-Amz-Expires", "600");

  const signed = await aws.sign(target.toString(), {
    method: "PUT",
    headers: { "content-type": input.contentType },
    aws: { signQuery: true },
  });

  const publicUrl = `${config.publicBaseUrl.replace(/\/+$/, "")}/${key}`;

  return { uploadUrl: signed.url, publicUrl, key };
}
