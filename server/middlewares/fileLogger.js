import fs from "fs";
import path from "path";
import { currentTime } from "../utils/timeService.js";

const logsDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

export function fileLogger(status, errorMsg) {
  if (status < 400) return;
  const { year, month, day, hours, minutes, seconds } = currentTime();
  const fileName = `${year}-${month}-${day}.log`;
  const filePath = path.join(logsDir, fileName);
  const logLine = `[${year}/${month}/${day} ${hours}:${minutes}:${seconds}] Status: ${status} Error: ${errorMsg}\n`;
  fs.appendFileSync(filePath, logLine);
}
