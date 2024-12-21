import { UserEntity } from '../entities/user.entity';

export class UserDTO {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  dateOfRegistration: Date;

  constructor(
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    dateOfRegistration: Date,
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfRegistration = dateOfRegistration;
  }
  public static fromEntity(user: UserEntity): UserDTO {
    return new UserDTO(
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.dateOfRegistration,
    );
  }
}
