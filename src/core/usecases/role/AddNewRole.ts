import UseCase from '../UseCase';
import { inject, injectable } from 'tsyringe';
import { Role } from '../../entities';
import { IRoleRepository } from '../../repositories';

@injectable()
export class AddNewRole implements UseCase<Role, string> {
  constructor(@inject('IRoleRepository') private roleRepository: IRoleRepository) {}

  async invoke(name: string): Promise<Role> {
    return await this.roleRepository.addNewRole(name);
  }
}
