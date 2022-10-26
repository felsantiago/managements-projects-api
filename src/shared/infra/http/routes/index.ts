import { Router } from 'express';
import projectsRouter from '@modules/projects/infra/http/routes/projects.routes';
import tasksRouter from '@modules/tasks/infra/http/routes/tasks.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/projects', projectsRouter);
routes.use('/tasks', tasksRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);

export default routes;
