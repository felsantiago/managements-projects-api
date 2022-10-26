import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProjectsController from '../controllers/ProjectsController';

const projectsRouter = Router();

const projectsController = new ProjectsController();

projectsRouter.use(ensureAuthenticated);

const validateRequestBody = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required()
  },
});

projectsRouter.post(
  '/',
  validateRequestBody,
  projectsController.create,
);

projectsRouter.put(
  '/:id',
  validateRequestBody,
  projectsController.update,
);

projectsRouter.get(
  '/',
  projectsController.find,
);

projectsRouter.delete(
  '/:id',
  projectsController.delete,
);

export default projectsRouter;
