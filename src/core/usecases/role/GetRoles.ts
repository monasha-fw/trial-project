import UseCase from '../UseCase';
import { inject, injectable } from 'tsyringe';
import { Role } from '../../entities';
import { IRoleRepository } from '../../repositories';

@injectable()
export class GetRoles implements UseCase<Role[], void> {
  constructor(@inject('IRoleRepository') private roleRepository: IRoleRepository) {}

  async invoke(): Promise<Role[]> {
    return await this.roleRepository.getRoles();
  }
}
