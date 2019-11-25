import { NextApiResponse, NextApiRequest } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id, name },
    method
  } = req;

  switch (method) {
    case "GET":
      // Get data from your database
      res.status(200).json([
        {
          href: "/",
          label: "home"
        },
        {
          href: "/README",
          label: "README",
          desc: "TODO 说明"
        },
        {
          href: "/_dashboard",
          label: "ADMIN",
          desc: "仪表盘"
        }
      ]);
      break;
    case "PUT":
      // Update or create data in your database
      res.status(200).json({ id, name: name || `User ${id}` });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
