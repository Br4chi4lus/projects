import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {ProjectDTO} from "@/types/project.dto";
import api from "../../axios";
import Link from "next/link";
import UsersTableWithAction from "@/components/users-table-with-action";

const ProjectInfo = ({id}: {id: number}) => {
    const [project, setProject] = useState<ProjectDTO | null>(null);
    useEffect(() => {
        const fetchProject = async () => {

            try{
                api.defaults.headers['Authorization'] = localStorage.getItem("token");
                const response = await api.get(`/api/projects/${id}`);
                setProject(response.data);
            }catch(error){
                console.log(error);
            }
        }
        if (id)
            fetchProject();
    });
    const handleDeleteUser = async (id: number, userId: number) => {
        await api.delete(`/api/projects/${id}/users/${userId}`);
    }
    const handleDeleteTask = async (id: number, taskId: number) => {
        await api.delete(`/api/projects/${id}/tasks/${taskId}`);
    }
    if (!project) return <div>Loading...</div>;

    return (
        <div className={"ml-28 mr-28"}>
            <Link className={"text-left text-red-500"} href={"/projects"}>Back</Link>
            <h4 className={"text-right "}>Created: {new Date(project.dateOfCreation).toLocaleDateString()}</h4>
            <h4 className={"text-right "}>Last
                modified: {new Date(project.dateOfModified).toLocaleDateString()} {new Intl.DateTimeFormat('en-US', {
                    timeZone: 'Europe/Warsaw',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                }).format(new Date(project.dateOfModified))}</h4>
            <h1 className={"text-center font-bold text-2xl m-5 text-gray-800"}>{project!.name}</h1>
            <h2 className={"text-center font-semibold text-xl text-gray-600"}>{`${project!.manager.firstName} ${project!.manager.lastName}`}</h2>
            <h3 className={"text-center font-normal text-lg text-gray-500"}>{project!.manager.email}</h3>
            <p className={"text-justify flex font-normal text mt-4 mb-4"}>{project!.description}</p>
            <h1 className={"text-center font-bold text-xl m-5 text-gray-800"}>Participants</h1>
            <h3 className={"text-right"}><Link className={"text-right text-green-600"}
                                               href={`/projects/${id}/add-users`}>Add new one</Link></h3>
            <UsersTableWithAction users={project.users} action={"Delete"} onClick={handleDeleteUser}
                                  projectId={project.id}/>
            <h1 className={"text-center font-bold text-xl m-5 text-gray-800"}>Tasks</h1>
            <h3 className={"text-right"}><Link className={"text-right text-green-600"}
                                               href={`/projects/${id}/tasks/add-task`}>Add new one</Link></h3>
            <table className="min-w-full">
                <thead>
                <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Id</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Description</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">State</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">User</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Delete</th>
                </tr>
                </thead>
                <tbody>
                {project.tasks.map((task) => (
                    <tr key={task.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-800">{task.id}</td>
                        <td className="px-4 py-2 text-sm text-gray-800">{task.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-800">{task.description}</td>
                        <td className="px-4 py-2 text-sm text-gray-800"><Link href={`/projects/${id}/tasks/${task.id}/edit-state`}>{task.state}</Link></td>
                        <td className="px-4 py-2 text-sm text-gray-800">{task.user.firstName + ' ' + task.user.lastName}</td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                            <button onClick={() => handleDeleteTask(id, task.id)}>x</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    )

}

export default ProjectInfo;