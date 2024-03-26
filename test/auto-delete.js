const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const unlink = promisify(fs.unlink);

async function deleteFilesOlderThan14Days(folderPaths) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 20);

  for (const folderPath of folderPaths) {
    try {
      const files = await readdir(folderPath);
      for (const file of files) {
        const filePath = path.join(folderPath, file);
        const fileStats = await stat(filePath);
        if (fileStats.isFile() && fileStats.birthtime < currentDate) {
          await unlink(filePath);
          console.log(`Deleted file: ${filePath}`);
        }
      }
    } catch (error) {
      console.error(`Error deleting files in ${folderPath}: ${error}`);
    }
  }
}

// const folderPaths = [path.resolve(process.cwd(), './images/input'), path.resolve(process.cwd(), './images/output')]
const folderPaths = [
  "C:\\Users\\Wisflux Dev\\Documents\\images\\output",
  "C:\\Users\\Wisflux Dev\\Documents\\images\\input",
];

console.log(folderPaths);

console.log("Deleting files from the following directories", folderPaths);
deleteFilesOlderThan14Days(folderPaths);
