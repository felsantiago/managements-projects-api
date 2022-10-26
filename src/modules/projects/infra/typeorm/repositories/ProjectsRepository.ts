import { getRepository, Repository } from 'typeorm';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import Project from '../entities/Project';

class ProjectRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async create({
    name,
    user_id
  }: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create({
      name,
      user_id
    });

    await this.ormRepository.save(project);

    return project;
  }

  public async save(project: Project): Promise<Project> {
    return this.ormRepository.save(project);
  }

  public async findById(id: string): Promise<Project | undefined> {
    return this.ormRepository.findOne({
      where: {
        id
      },
      relations: ['tasks']
    });
  }

  public async find(user_id: string): Promise<Project[]> {
    const projects = await this.ormRepository.find({
      where: {
        user_id
      },
      relations: ['tasks']
    });

    return projects;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default ProjectRepository;
