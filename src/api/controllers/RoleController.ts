import { container } from 'tsyringe';
import { BadRequestError } from '../errors';
import { NextFunction, Request, Response } from 'express';
import { AddNewRole, GetRoles } from '../../core/usecases';

export default class RoleController {
  public addNewRole = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    if (!name) return next(new BadRequestError('Role name is required'));

    const addNewRole = container.resolve(AddNewRole);
    await addNewRole.invoke(name);

    res.sendStatus(204);
  };

  public getRoles = async (req: Request, res: Response, next: NextFunction) => {
    const getRoles = container.resolve(GetRoles);
    const roles = await getRoles.invoke();

    res.status(200).send(roles);
  };
}
