import UseCase from '../UseCase';
import { inject, injectable } from 'tsyringe';
import { IAuthRepository } from '../../repositories';
import { UserEmailLoginDto } from '../../dtos';
import { User } from '../../entities';

@injectable()
export class LoginUserWithEmail implements UseCase<User, UserEmailLoginDto> {
  constructor(@inject('IAuthRepository') private authRepository: IAuthRepository) {}

  async invoke(dto: UserEmailLoginDto): Promise<User> {
    return await this.authRepository.loginUserWithEmail(dto);
  }
}
