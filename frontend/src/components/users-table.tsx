import {UserDTO} from "@/types/user.dto";
import {useEffect, useState} from "react";
import {isAxiosError} from "axios";
import api from "../../axios";
import Link from "next/link";

const UsersTable = () =>{
    const [users, setUsers] = useState<UserDTO[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchUsers = async () => {
            try{
                api.defaults.headers['Authorization'] = localStorage.getItem('token');
                const response = await api.get<UserDTO[]>('/api/users');
                setUsers(response.data);
            }catch(error){
                if (isAxiosError(error)) {
                    if(error.response && error.response.status === 401){
                        setError(error.response.data.message);
                    }
                }
            }finally{
                setLoading(false);
            }
        }
        fetchUsers();

    },[]);
    if (loading){
        return <p>Loading...</p>;
    }
    if (error){
        return <p>{error}</p>;
    }
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Id</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Email</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">First Name</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Last Name</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Registration Date</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Role</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-800">{user.id}</td>
                        <td className="px-4 py-2 text-sm text-gray-800">{user.email}</td>
                        <td className="px-4 py-2 text-sm text-gray-800">{user.firstName}</td>
                        <td className="px-4 py-2 text-sm text-gray-800">{user.lastName}</td>
                        <td className="px-4 py-2 text-sm text-gray-800">{user.dateOfRegistration}</td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                            <Link
                                href={`/change-role/${user.id}`}>{user.roleDTO.roleName}</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default UsersTable;