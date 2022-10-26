import { injectable, inject } from 'tsyringe';
import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  name: string;
  user_id: string;
}

@injectable()
class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    name,
    user_id,
  }: IRequest): Promise<Project> {
    const project = await this.projectsRepository.create({
      name,
      user_id
    });

    return project;
  }
}

export default CreateProjectService;
