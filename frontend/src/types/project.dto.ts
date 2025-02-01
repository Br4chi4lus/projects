import {UserDTO} from "@/types/user.dto";
import {StateOfProjectDTO} from "@/types/state-of-project.dto";
import {TaskDTO} from "@/types/task.dto";

export class ProjectDTO {
    id: number;
    name: string;
    description: string;
    manager: UserDTO;
    users: UserDTO[];
    state: StateOfProjectDTO;
    dateOfCreation: Date;
    dateOfModified: Date;
    tasks: TaskDTO[];
}