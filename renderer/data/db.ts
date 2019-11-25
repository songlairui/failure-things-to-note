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
    current: process.cwd()
  }
}).write();

export default db;
