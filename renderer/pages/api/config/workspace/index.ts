import { NextApiResponse, NextApiRequest } from "next";

// import "../../../data/db";
import DB from "../../../../data/db";
import { Workspace_db as Workspace } from "../../../../data/workspace.interface";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  const dataHandler = DB.get("config.workspaces");
  const relatedHandler = DB.get("config.dirs");
  const relationHandler = DB.get("config.relation.workspace_dir");

  let item: Workspace;

  const data = body && typeof body === "string" ? JSON.parse(body) : body;

  switch (method) {
    case "GET":
      // Get data from your database
      const items: Workspace[] = dataHandler.value();
      items.forEach(item => {
        item.folders = relationHandler
          .filter({ workspaceId: item.id })
          .value()
          .map(item => {
            return relatedHandler.find({ id: item.dirId }).value();
          });
      });
      res.status(200).json(items);
      break;
    case "POST":
      // Update or create data in your database
      const { folders, ...payload } = data;
      const newId = Math.random()
        .toString(16)
        .slice(2, 8);
      const newItem = {
        ...payload,
        id: newId
      };

      dataHandler.push(newItem).write();

      folders.forEach(folderId => {
        const newRelation = { dirId: folderId, workspaceId: newId };
        relationHandler.push(newRelation).write();
      });

      item = dataHandler.find({ id: newId }).value();
      res.status(200).json(item);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
