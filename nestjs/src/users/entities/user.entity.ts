import { RoleEntity } from './role.entity';
import { Role, User } from '@prisma/client';

export class UserEntity {
  id: number;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  dateOfRegistration: Date;
  roleId: number;
  role: RoleEntity;
  constructor(
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    dateOfRegistration: Date,
    passwordHash: string,
    roleId: number,
    role: RoleEntity,
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.dateOfRegistration = dateOfRegistration;
    this.passwordHash = passwordHash;
    this.roleId = roleId;
    this.role = role;
  }

  public static fromModel(model: User & { role: Role }): UserEntity {
    return new UserEntity(
      model.id,
      model.email,
      model.firstName,
      model.lastName,
      model.dateOfBirth,
      model.dateOfRegistration,
      model.passwordHash,
      model.roleId,
      RoleEntity.fromModel(model.role),
    );
  }
}
