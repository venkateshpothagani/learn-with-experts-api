import { Router } from 'express';

import auth from '../controllers/auth.controller';
import authorize from '../middlewares/authorize.middleware';

const router = Router();

router.post('/signup', auth.signup);

router.post('/login', auth.login);

router.post('/logout', authorize, auth.logout);

router.post('/refresh', auth.refresh);

router.put('/update', authorize, auth.update);

router.delete('/remove', authorize, auth.remove);

export default router;
