import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const unlink = promisify(fs.unlink);

async function deleteFilesOlderThan14Days(folderPaths) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 14);

  for (const folderPath of folderPaths) {
    try {
      const files = await readdir(folderPath);
      for (const file of files) {
        const filePath = path.join(folderPath, file);
        const fileStats = await stat(filePath);

        if (fileStats.isFile() && fileStats.ctime < currentDate) {
          await unlink(filePath);
          console.log(`Deleted file: ${filePath}`);
        }
      }
    } catch (error) {
      console.error(`Error deleting files in ${folderPath}: ${error}`);
    }
  }
}

// Usage example
const folderPaths = ["/home/himanshu/Documents/bds/bds"];
deleteFilesOlderThan14Days(folderPaths);
