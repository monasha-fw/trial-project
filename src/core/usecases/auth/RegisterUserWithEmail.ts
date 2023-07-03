import UseCase from 'src/core/usecases/UseCase';
import { inject, injectable } from 'tsyringe';
import { UserEmailRegisterDto } from 'src/core/dtos';
import { IAuthRepository } from 'src/core/repositories';

@injectable()
export class RegisterUserWithEmail implements UseCase<void, UserEmailRegisterDto> {
  constructor(@inject('IAuthRepository') private authRepository: IAuthRepository) {}

  async invoke(dto: UserEmailRegisterDto): Promise<void> {
    await this.authRepository.registerUserWithEmail(dto);
  }
}
