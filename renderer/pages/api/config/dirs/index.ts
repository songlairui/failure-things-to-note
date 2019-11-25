import { NextApiResponse, NextApiRequest } from "next";

// import "../../../data/db";
import DB from "../../../../data/db";
import { Dir } from "../../../../data/dir.interface";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  const dataHandler = DB.get("config.dirs");
  let item: Dir;
  const data = body ? JSON.parse(body) : null;
  switch (method) {
    case "GET":
      // Get data from your database
      const dirs: Dir[] = dataHandler.value();

      res.status(200).json(dirs);
      break;
    case "POST":
      // Update or create data in your database

      const newItem = {
        ...data,
        id: Math.random()
          .toString(16)
          .slice(2, 8)
      };
      dataHandler.push(newItem).write();
      item = dataHandler.find({ id: newItem.id });

      res.status(200).json(item);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
