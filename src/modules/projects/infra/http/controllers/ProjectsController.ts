import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import UpdateProjectService from '@modules/projects/services/UpdateProjectService';
import FindProjectService from '@modules/projects/services/FindProjectService';
import DeleteProjectService from '@modules/projects/services/DeleteProjectService';

export default class ProjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name } = request.body;

    const createProject = container.resolve(CreateProjectService);

    const project = await createProject.execute({
      name,
      user_id,
    });

    return response.status(201).json(project);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name } = request.body;
    const { id } = request.params;

    const updateProject = container.resolve(UpdateProjectService);

    const project = await updateProject.execute({
      id,
      name,
      user_id
    });

    return response.json(project);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const findProjects = container.resolve(FindProjectService);

    const project = await findProjects.execute({
      user_id
    });

    return response.json(project);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;

    const deleteProject = container.resolve(DeleteProjectService);

    await deleteProject.execute({
      id,
      user_id
    });

    return response.status(204).json({});
  }
}
