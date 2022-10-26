import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTaskService from '@modules/tasks/services/CreateTaskService';
import UpdateTaskService from '@modules/tasks/services/UpdateTaskService';
import FindOneService from '@modules/tasks/services/FindOneService';
import DeleteService from '@modules/tasks/services/DeleteService';

export default class TaksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { description, project_id, end_date } = request.body;

    const createTask = container.resolve(CreateTaskService);

    const task = await createTask.execute({
      description,
      project_id,
      end_date,
      user_id,
    });

    return response.status(201).json(task);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { description, end_date, concluded } = request.body;
    const { id } = request.params;

    const updateTask = container.resolve(UpdateTaskService);

    const task = await updateTask.execute({
      id,
      description,
      end_date,
      concluded,
      user_id
    });

    return response.json(task);
  }

  public async findOne(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;

    const findOne = container.resolve(FindOneService);

    const task = await findOne.execute({
      id,
      user_id
    });

    return response.json(task);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;

    const deleteOne = container.resolve(DeleteService);

    await deleteOne.execute({
      id,
      user_id
    });

    return response.status(204);
  }
}
