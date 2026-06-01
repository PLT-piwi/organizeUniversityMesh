const fs = require("fs");
const path = require("path");

const releaseDir = path.join(__dirname, "..", "release");

if (!fs.existsSync(releaseDir)) {
  process.exit(0);
}

const installers = fs
  .readdirSync(releaseDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && path.extname(entry.name) === ".exe")
  .map((entry) => {
    const fullPath = path.join(releaseDir, entry.name);
    return { name: entry.name, fullPath, mtimeMs: fs.statSync(fullPath).mtimeMs };
  })
  .sort((a, b) => b.mtimeMs - a.mtimeMs);

const latestInstaller = installers[0]?.name;

for (const entry of fs.readdirSync(releaseDir, { withFileTypes: true })) {
  const fullPath = path.join(releaseDir, entry.name);
  const shouldKeep = entry.isFile() && entry.name === latestInstaller;

  if (!shouldKeep) {
    fs.rmSync(fullPath, { recursive: true, force: true });
  }
}

console.log(`release limpio: se conservo ${latestInstaller ?? "ningun instalador"}`);
