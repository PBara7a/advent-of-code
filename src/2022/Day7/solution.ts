import fs from "fs/promises";
import { Directory, File } from "./classes";
import { DirectoryInfo } from "./types";

async function main(file: string) {
  const data: string = await fs.readFile(file, { encoding: "utf-8" });
  const lines: Array<string> = data.split("\r\n");

  const root: Directory = new Directory("/");
  setupFilesystem(root, lines);

  const dirSizes: Array<DirectoryInfo> = getDirectorySizes(root);

  return {
    PartA: totalSizeOfDirsUpToTarget(dirSizes, 100000),
    PartB: findSizeOfSmallestDirToDelete(root, dirSizes),
  };
}

function setupFilesystem(root: Directory, lines: Array<string>): void {
  let currentDir: Directory | null = root;
  lines.forEach((line) => {
    if (currentDir) {
      if (isCommand(line)) {
        const dest: string = line.split(" ")[2];
        if (dest === "..") {
          currentDir = currentDir.parent;
        } else if (isValidDest(currentDir, dest)) {
          currentDir = currentDir.findChild(dest) as Directory;
        }
      } else if (isDir(line)) {
        const dirName = line.split(" ")[1];
        currentDir.addChild(new Directory(dirName, currentDir));
      } else {
        const [fileSize, fileName] = line.split(" ");
        currentDir.addChild(new File(fileName, Number(fileSize)));
      }
    }
  });
};

const isCommand = (line: string): boolean => line[0] === "$";

const isDir = (line: string): boolean => line.substring(0, 3) === "dir";

const isValidDest = (dir: Directory, dest: string): boolean => dir.findChild(dest) instanceof Directory;

function getDirectorySizes(root: Directory): Array<DirectoryInfo> {
  const directories: Array<DirectoryInfo> = [];
  const queue = [root];
  while (queue.length) {
    const currentDir = queue.pop();
    if (currentDir) {
      directories.push({ name: currentDir.name, size: currentDir.size() });
      queue.push(...currentDir.getChildDirectories() as Array<Directory>);
    }
  }
  return directories;
};

function findSizeOfSmallestDirToDelete(root: Directory, dirSizes: Array<DirectoryInfo>): number {
  const currentFreeSpace = 70000000 - root.size(); // 70000000 is the total space
  const spaceNeeded = 30000000 - currentFreeSpace; // 30000000 is the needed free space

  return dirSizes
    .filter((dir) => dir.size >= spaceNeeded)
    .sort((a, b) => a.size - b.size)[0].size;
};

function totalSizeOfDirsUpToTarget(dirSizes: Array<DirectoryInfo>, target: number): number {
  return dirSizes.reduce((acc, cur) => {
    if (cur.size <= target) acc += cur.size;
    return acc;
  }, 0);
};

main("input.txt").then((res) => console.log(res));
