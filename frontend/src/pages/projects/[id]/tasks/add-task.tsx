import {useRouter} from "next/router";
import {CreateTaskDTO} from "@/types/create.task.dto";
import React, {useEffect} from "react";
import {UserDTO} from "@/types/user.dto";
import api from "../../../../../axios";

const AddTaskPage = () => {
    const router = useRouter();
    const id = parseInt(router.query.id as string, 10);
    const [task, setTask] = React.useState<CreateTaskDTO>({
        name: '',
        description: '',
        userId: -1,
    });
    const [users, setUsers] = React.useState<UserDTO[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                api.defaults.headers['Authorization'] = localStorage.getItem("token");
                const response = await api.get(`/api/projects/${id}/users`);
                setUsers(response.data);
            }
            catch (error){
                console.log(error);
            }

        }
        if (id)
            fetchUsers();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            api.defaults.headers['Authorization'] = localStorage.getItem("token");
            await api.post(`/api/projects/${id}/tasks`, task);
            await router.push(`/projects/${id}/`);
        }
        catch(error){
            console.log(error)
        }
    }
    const handleRadioChange = async (userId: number) => {
        setTask((prev) => ({...prev, userId: userId}));
    }
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTask((prev) => ({...prev, [e.target.name]: e.target.value }));
    }
    return (
        <div className="ml-28 mr-28">
            <button className={"text-left text-red-500"} onClick={router.back}>Back</button>
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-y-8 mt-8">
                <div className={"col-start-2 flex justify-center font-normal"}>
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className={"text-left"}>Task name:</label>
                        <input className="flex rounded outline outline-1 font-normal" type="text" name="name"
                               value={task.name} onChange={handleTextChange} required/>
                    </div>
                </div>
                <div className={"col-start-2 flex justify-center font-normal"}>
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-left">Description:</label>
                        <textarea className="flex rounded outline outline-1 font-normal" rows={5} cols={30}
                                  type="text"
                                  name="description" value={task.description} onChange={handleTextChange}
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
                                        type="radio"
                                        checked={task.userId === user.id}
                                        onChange={() => handleRadioChange(user.id)}
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

export default AddTaskPage;