import { mkdir, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { dirname, basename } from "path";

const CDN_BASE = "https://kota-content.b-cdn.net";

const images = [
  // Awards logos
  "/app/uploads/2024/03/Digital-Agency-Network.svg",
  "/app/uploads/2024/02/clutch.svg",
  "/app/uploads/2024/02/awwwards.svg",
  "/app/uploads/2024/02/cssda.svg",
  // Partner logos
  "/app/uploads/2023/10/Jamie-oliver.svg",
  "/app/uploads/2023/10/comptoir-libanais-1.svg",
  "/app/uploads/2023/10/british-red-cross.svg",
  "/app/uploads/2023/10/sym.svg",
  "/app/uploads/2023/10/penguin.svg",
  "/app/uploads/2023/10/raw.svg",
  "/app/uploads/2023/10/penhaligons.svg",
  "/app/uploads/2023/10/stoli.svg",
  "/app/uploads/2023/10/bounce.svg",
  "/app/uploads/2023/10/tangerine.svg",
  "/app/uploads/2023/10/spears.svg",
  "/app/uploads/2023/10/oka.svg",
  "/app/uploads/2024/06/DAN-1-500x167.png",
  "/app/uploads/2023/10/upp.svg",
  "/app/uploads/2023/10/goat.svg",
];

const videos = [
  "/app/uploads/2025/10/Short-Preview-homepage.mp4",
  "/app/uploads/2024/02/homepage.mp4",
  "/app/uploads/2025/04/Featured2-Compressed.mp4",
  "/app/uploads/2025/08/GOAT-FeatureVideo.mp4",
  "/app/uploads/2025/02/isi-vid2-1.mp4",
];

async function downloadFile(urlPath, outputDir) {
  const url = `${CDN_BASE}${urlPath}`;
  const filename = basename(urlPath);
  const outPath = `${outputDir}/${filename}`;

  if (existsSync(outPath)) {
    console.log(`  SKIP ${filename} (exists)`);
    return;
  }

  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      console.log(`  FAIL ${filename}: ${resp.status}`);
      return;
    }
    const buffer = Buffer.from(await resp.arrayBuffer());
    await writeFile(outPath, buffer);
    console.log(`  OK   ${filename} (${(buffer.length / 1024).toFixed(1)}KB)`);
  } catch (err) {
    console.log(`  ERR  ${filename}: ${err.message}`);
  }
}

async function main() {
  // Create output dirs
  await mkdir("public/images/awards", { recursive: true });
  await mkdir("public/images/partners", { recursive: true });
  await mkdir("public/videos", { recursive: true });

  console.log("Downloading award logos...");
  for (const path of images.slice(0, 4)) {
    await downloadFile(path, "public/images/awards");
  }

  console.log("Downloading partner logos...");
  for (const path of images.slice(4, 19)) {
    await downloadFile(path, "public/images/partners");
  }

  console.log("Downloading videos (parallel, 2 at a time)...");
  for (let i = 0; i < videos.length; i += 2) {
    const batch = videos.slice(i, i + 2);
    await Promise.all(batch.map((v) => downloadFile(v, "public/videos")));
  }

  console.log("Done!");
}

main().catch(console.error);
