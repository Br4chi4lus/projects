export class UserEntity {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  dateOfRegistration: Date;

  constructor(
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    dateOfRegistration: Date,
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.dateOfRegistration = dateOfRegistration;
  }
}
