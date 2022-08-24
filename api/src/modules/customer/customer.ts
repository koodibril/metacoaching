import { Router } from "express";
import { remove } from "./handlers/remove";
import { create } from "./handlers/create";
import { update } from "./handlers/update";
import { list } from "./handlers/list";

const router = Router();

router.post("/create", create);
router.post("/delete", remove);
router.post("/update", update);
router.get("/list", list);

export default router;
