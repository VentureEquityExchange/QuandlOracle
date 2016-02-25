import Express from 'express';
import * as QuandlController from '../controllers/quandl.controller';

const router = Express.Router();


router.route('/getData').post(QuandlController.getData);

export default router;
