import { Dir } from "./dir.interface";

export interface Workspace {
  id: number;
  title?: string;
  desc?: string;
  folders: Dir[];
}

type DirId = string | number;

export interface Workspace_db {
  id: number;
  title?: string;
  desc?: string;
  folders: DirId[];
}
