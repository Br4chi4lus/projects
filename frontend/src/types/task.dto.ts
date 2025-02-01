import {UserDTO} from "@/types/user.dto";

export class TaskDTO{
    id: number;
    name: string;
    description: string;
    user: UserDTO;
    state: string;
}