import {RoleDTO} from "@/types/role.dto";

export class UserDTO {
    id: number;
    email: string,
    firstName: string,
    lastName: string,
    dateOfRegistration: string,
    roleDTO: RoleDTO,
}