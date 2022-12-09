export class Directory {
  name: string;
  parent: Directory | null;
  children: Array<Directory | File> | null;
  constructor(name: string, parent?: Directory, children?: Array<Directory | File> | null) {
    this.name = name;
    this.parent = parent === undefined ? null : parent;
    this.children = children === undefined ? null : children;
  }

  addChild(child: Directory | File): void {
    this.children ? this.children.push(child) : (this.children = [child]);
  }

  findChild(childName: string): Directory | File | undefined {
    if (!this.children) return;
    return this.children.find((child) => child.name === childName);
  }

  getChildDirectories(): Array<Directory | File> | undefined {
    if (!this.children) return;
    return this.children.filter((child) => child instanceof Directory);
  }

  size(dir?: Directory): number {
    let size = 0;
    this.children?.forEach((child) => {
      if (child instanceof File) size += child.size;
      else size += child.size(child);
    });
    return size;
  }
}

export class File {
  name: string;
  size: number;
  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }
}
