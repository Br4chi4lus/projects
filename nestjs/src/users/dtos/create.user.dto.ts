export class CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  password: string;
  passwordConfirmation: string;
  role: string;
}
