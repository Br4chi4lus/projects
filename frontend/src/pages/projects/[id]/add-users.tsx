import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Link from "next/link";
import UsersTableWithAction from "@/components/users-table-with-action";
import api from "../../../../axios";
import {UserDTO} from "@/types/user.dto";

const AddUsersPage = () => {
    const router = useRouter();
    const [users, setUsers] = useState<UserDTO[]>([]);
    const [projectUsers, setProjectUsers] = useState<UserDTO[]>([]);
    const id = parseInt(router.query.id as string, 10);

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                api.defaults.headers['Authorization'] = localStorage.getItem("token");
                const response = await api.get(`/api/users`);
                setUsers(response.data);
            }
            catch (error){
                console.log(error);
            }
        }

        fetchUsers();
    }, []);
    useEffect(() => {
        const fetchProjectUsers = async () => {
            try {
                api.defaults.headers['Authorization'] = localStorage.getItem("token");
                const response = await api.get(`/api/projects/${id}/users`);
                setProjectUsers(response.data);
            }
            catch (error){
                console.log(error);
            }
        }
        if (id)
            fetchProjectUsers();
    }, [id]);

    const handleAdd = async (id: number, userId: number) => {
        await api.post(`/api/projects/${id}/users`, {'userId': userId});
    }
    if (!id)
        return <div>Loading...</div>;
    return (
        <div className={"ml-28 mr-28"}>
            <button className={"text-left text-red-500"} onClick={router.back}>Back</button>
            <UsersTableWithAction users={users.filter((user) => !projectUsers.some((projectUser) => projectUser.id === user.id))} action={"Add"} onClick={handleAdd}
                                  projectId={id}/>


        </div>
    )
}
export default AddUsersPage;