import Project from '../infra/typeorm/entities/Project';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';

export default interface IProjectsRepository {
  create(data: ICreateProjectDTO): Promise<Project>;
  save(project: Project): Promise<Project>;
  findById(id: string): Promise<Project | undefined>;
  find(user_id: string): Promise<Project[]>;
  delete(id: string): Promise<void>;
}
