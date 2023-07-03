import { inject, injectable } from 'tsyringe';
import { UserEmailLoginDto, UserEmailRegisterDto } from 'src/core/dtos';
import { IAuthRepository } from 'src/core/repositories';
import { User } from '../../core/entities';
import { AuthRemoteDatasource } from 'src/infrastructure/datasources';

@injectable()
export class AuthRepository implements IAuthRepository {
  constructor(@inject('AuthRemoteDatasource') private datasource: AuthRemoteDatasource) {}

  async registerUserWithEmail(dto: UserEmailRegisterDto): Promise<User> {
    return this.datasource.registerUserWithEmail(dto);
  }

  loginUserWithEmail(dto: UserEmailLoginDto): Promise<User> {
    return this.datasource.loginUserWithEmail(dto);
  }
}

