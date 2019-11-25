import { NextApiResponse, NextApiRequest } from "next";

// import "../../../data/db";
import DB from "../../../../data/db";
import { Workspace_db as Workspace } from "../../../../data/workspace.interface";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
    body
  } = req;
  const dataHandler = DB.get("config.workspaces");
  const relatedataHandler = DB.get("config.dirs");
  const relationHandler = DB.get("config.relation.workspace_dir");

  const data = body && typeof body === "string" ? JSON.parse(body) : body;

  let itemMeta: Workspace;

  switch (method) {
    case "GET":
      itemMeta = dataHandler.find({ id }).value();
      itemMeta.folders = relationHandler
        .filter({ workspaceId: id })
        .map(({ dirId }) => relatedataHandler.find({ id: dirId }).value());
      res.status(200).json(itemMeta);
      break;
    case "DELETE":
      itemMeta = dataHandler.find({ id }).value();
      // 删除相关数据？！
      dataHandler.remove({ id }).write();
      res.status(200).json(itemMeta);
      break;

    case "PUT":
      delete data.id;
      res.status(200).json(
        dataHandler
          .find({ id })
          .assign({ ...data })
          .write()
      );
      break;
    default:
      res.setHeader("Allow", ["GET", "DELETE", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
