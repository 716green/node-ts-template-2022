import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ apiVersion: "api/v1", path: req.url });
});

export default router;
