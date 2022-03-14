import router from "../utils/router";

import auth from "../controllers/auth.controller";

router.post("/signup", auth.signup);
router.post("/login", auth.signup);

export default router;
