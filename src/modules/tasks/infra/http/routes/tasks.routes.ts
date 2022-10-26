import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import TaksController from '../controllers/TaksController';

const taksRouter = Router();

const taksController = new TaksController();

taksRouter.use(ensureAuthenticated);

taksRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      project_id: Joi.string().required(),
      end_date: Joi.date().required()
    },
  }),
  taksController.create,
);

taksRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      project_id: Joi.string().required(),
      end_date: Joi.date().required(),
      concluded: Joi.boolean().optional()
    },
  }),
  taksController.update,
);

taksRouter.get(
  '/:id',
  taksController.findOne,
);

taksRouter.delete(
  '/:id',
  taksController.delete,
);

export default taksRouter;
