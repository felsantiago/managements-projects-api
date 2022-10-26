import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class FindProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    id,
    user_id,
  }: IRequest): Promise<void> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    if (user_id !== project.user_id) {
      throw new AppError('You cannot delete this project');
    }

    if (project.tasks && project.tasks.length > 0) {
      throw new AppError('You cannot delete this project');
    }
    
    await this.projectsRepository.delete(id);
  }
}

export default FindProjectService;
