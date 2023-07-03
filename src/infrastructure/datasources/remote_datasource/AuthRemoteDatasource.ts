import { injectable } from 'tsyringe';
import * as bcrypt from 'bcryptjs';
import { UserEmailLoginDto, UserEmailRegisterDto } from '../../../core/dtos';
import { Role, User } from '../../../core/entities';
import { BadRequestError, NotFoundError } from '../../../api/errors';
import { DataContext } from '../../database';
import UserModel from '../../models/auth/UserModel';
import RoleModel from '../../models/auth/RoleModel';
import { EntityManager } from 'typeorm';

export interface AuthRemoteDatasource {
  registerUserWithEmail(dto: UserEmailRegisterDto): Promise<User>;

  loginUserWithEmail(dto: UserEmailLoginDto): Promise<User>;

  getAllUsers(): Promise<User[]>;
}

@injectable()
export class AuthRemoteDatasourceImpl implements AuthRemoteDatasource {
  constructor(private dbContext: DataContext) {}

  async registerUserWithEmail(dto: UserEmailRegisterDto): Promise<User> {
    // Hash password before saving to database
    const password = this._hashPassword(dto.password);

    return this.dbContext.db.transaction(async (tem: EntityManager) => {
      /* get roles records */
      console.log(dto.roles);
      const roles = await tem
        .createQueryBuilder(RoleModel, 'role')
        .where('role.id IN (:...ids)', { ids: dto.roles })
        .getMany();

      /* saving user */
      const addingUser = new UserModel();
      addingUser.email = dto.email;
      addingUser.password = password;
      addingUser.name = dto.name;
      addingUser.roles = roles;

      const user = await tem.save(addingUser);
      return new User(user.id, user.name, user.email, user.roles);
    });
  }

  async loginUserWithEmail(dto: UserEmailLoginDto): Promise<User> {
    const user = await this.dbContext.db.findOne(UserModel, {
      where: {
        email: dto.email
      }
    });

    if (!user || !user?.password || !this._verifyPassword(user.password, dto.password)) {
      throw new NotFoundError("User doesn't exist");
    }
    if (!user || !user?.password || !this._verifyPassword(user.password, dto.password)) {
      throw new BadRequestError('Invalid Credentials');
    }

    return new User(user.id, user.email, user.name, user.roles);
  }

  _hashPassword(password: string): string {
    return bcrypt.hashSync(password, 8);
  }

  _verifyPassword(dbPassword: string, password: string): boolean {
    return bcrypt.compareSync(password, dbPassword);
  }

  getAllUsers(): Promise<User[]> {
    return Promise.resolve([]);
  }
}
