import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  id: string;
  name: string;
  user_id: string;
}

@injectable()
class UpdateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    id,
    name,
    user_id,
  }: IRequest): Promise<Project> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    if (user_id !== project.user_id) {
      throw new AppError('You cannot update this project');
    }

    project.name = name;

    await this.projectsRepository.save(project);

    return project;
  }
}

export default UpdateProjectService;
