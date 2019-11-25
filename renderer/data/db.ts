import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { join } from "path";

const dbFile = join(process.cwd(), "data/db.json");
const adapter = new FileSync(dbFile);

const db = low(adapter);

db.defaults({
  posts: [],
  user: {},
  count: 0,
  config: {
    dirs: [
      {
        id: 1,
        path: process.cwd()
      }
    ],
    workspaces: [],
    current: 0,
    relation: {
      workspace_dir: []
    }
  }
}).write();

export default db;
