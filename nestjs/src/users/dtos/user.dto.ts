import { UserEntity } from '../entities/user.entity';
import { RoleDTO } from './role.dto';

export class UserDTO {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  dateOfRegistration: Date;
  roleDTO: RoleDTO;

  constructor(
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    dateOfRegistration: Date,
    roleDTO: RoleDTO,
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfRegistration = dateOfRegistration;
    this.roleDTO = roleDTO;
  }
  public static fromEntity(user: UserEntity): UserDTO {
    return new UserDTO(
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.dateOfRegistration,
      RoleDTO.fromEntity(user.role),
    );
  }
}
