import { container } from 'tsyringe';
import { BadRequestError } from '../errors';
import { NextFunction, Request, Response } from 'express';
import { UserEmailLoginDto, UserEmailRegisterDto } from '../../core/dtos';
import { LoginUserWithEmail, RegisterUserWithEmail } from '../../core/usecases';
import { User } from '../../core/entities';
import { ISessionUser } from '../interfaces';

export default class AuthController {
  public registerUserWithEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, password, roles } = req.body;
    if (!email || !name || !password || !roles) {
      return next(new BadRequestError('Name, Email, Password and Roles are required'));
    }
    const registerUserWithEmail = container.resolve(RegisterUserWithEmail);
    const dto = new UserEmailRegisterDto(email, password, name, roles);
    await registerUserWithEmail.invoke(dto);

    res.sendStatus(204);
  };

  public loginUserWithEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) throw new BadRequestError('Both email and password required.');

    const loginUserWithEmail = container.resolve(LoginUserWithEmail);
    const dto = new UserEmailLoginDto(email, password);
    const user = await loginUserWithEmail.invoke(dto);

    req.session.user = this.generateSessionUser(req, user);
    res.status(200).send(user);
  };

  private generateSessionUser = (req: Request, user: User): ISessionUser => {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles.map((r) => r.id)
    };
  };
}
