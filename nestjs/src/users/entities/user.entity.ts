import { RoleEntity } from './role.entity';

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
}
