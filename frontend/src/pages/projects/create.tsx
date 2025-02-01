import React, {useEffect, useState} from "react";
import {UserDTO} from "@/types/user.dto";
import {useRouter} from "next/router";
import {CreateProjectDTO} from "@/types/create.project.dto";
import api from "../../../axios";
import {isAxiosError} from "axios";

const CreateProjectPage = () =>{
    const [users, setUsers] = useState<UserDTO[]>([]);
    const router = useRouter();
    const [project, setProject] = useState<CreateProjectDTO>({
        name: '',
        description: '',
        userIds: [],
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                api.defaults.headers['Authorization'] = localStorage.getItem('token');
                const response = await api.get<UserDTO[]>("/api/users");
                setUsers(response.data);
            } catch (error){
                if (isAxiosError(error)) {
                    if (error.response && error.response.status === 403) {

                    }
                }
            }
        }
        fetchUsers();
    }, []);

    const handleCheckboxChange = (id: number) => {
        setProject((prev) => ({...prev, userIds: prev.userIds.includes(id)
                ?prev.userIds.filter((userId) => userId !== id)
                : [...prev.userIds, id]}));
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProject((prev) => ({...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await api.post("/api/projects", project);
            await router.push('/projects');

        }catch(error){
            console.log(error);
        }

    }
    return (<div className="text-center">
        <h1 className="font-bold text-gray-600">Create new project</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-y-8 mt-8">
            <div className={"col-start-2 flex justify-center font-normal"}>
                <div className="grid grid-cols-1 gap-y-2">
                    <label className={"text-left"}>Project name:</label>
                    <input className="flex rounded outline outline-1 font-normal" type="text" name="name"
                           value={project.name} onChange={handleTextChange} required/>
                </div>
            </div>
            <div className={"col-start-2 flex justify-center font-normal"}>
                <div className="grid grid-cols-1 gap-y-2">
                    <label className="text-left">Description:</label>
                    <textarea className="flex rounded outline outline-1 font-normal" rows={5} cols={30}
                              type="text"
                              name="description" value={project.description} onChange={handleTextChange}
                              required/>

                </div>

            </div>
            <div className={"col-start-2 flex justify-center font-normal"}>
                <table>
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Id</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">First Name</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Last Name</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Selected</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm text-gray-800">{user.id}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{user.firstName}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{user.lastName}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">
                                <input
                                    type="checkbox"
                                    checked={project.userIds.includes(user.id)}
                                    onChange={() => handleCheckboxChange(user.id)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className={"col-start-2 flex justify-center font-normal"}>
                <button type="submit" className="outline outline-1 rounded pt-1 pb-1 pr-2 pl-2">Submit</button>
            </div>
        </form>
    </div>)
}

export default CreateProjectPage;