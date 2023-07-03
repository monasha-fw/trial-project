import { UserEmailLoginDto, UserEmailRegisterDto } from '../dtos';
import { User } from '../entities';

export interface IAuthRepository {
  registerUserWithEmail(dto: UserEmailRegisterDto): Promise<User>;

  loginUserWithEmail(dto: UserEmailLoginDto): Promise<User>;
}

