import { handler401 } from "../../../utils/common";

export default function handler(req, res) {
  handler401("Not authenticated.", res);
  // res.status(401).json({ message: "Not authenticated." });
}
