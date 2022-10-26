import Task from '../infra/typeorm/entities/Task';
import ICreateTaskDTO from '../dtos/ICreateTaskDTO';

export default interface ITaksRepository {
  create(data: ICreateTaskDTO): Promise<Task>;
  save(project: Task): Promise<Task>;
  findById(id: string): Promise<Task | undefined>;
  findOne(id: string, user_id: string): Promise<Task | undefined>;
  delete(id: string): Promise<void>;
}
