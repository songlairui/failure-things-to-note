import { NextApiResponse, NextApiRequest } from "next";

// import "../../../data/db";
import DB from "../../../../data/db";
import { Dir } from "../../../../data/dir.interface";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
    body
  } = req;
  const dataHandler = DB.get("config.dirs");

  const data = body ? JSON.parse(body) : null;
  let dirMeta: Dir;
  switch (method) {
    case "GET":
      dirMeta = dataHandler.find({ id }).value();
      res.status(200).json(dirMeta);
      break;
    case "DELETE":
      dirMeta = dataHandler.find({ id }).value();
      dataHandler.remove({ id }).write();
      res.status(200).json(dirMeta);
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
