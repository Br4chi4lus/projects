import {UserDTO} from "@/types/user.dto";

const UsersTableWithAction = ({users, action, onClick, projectId}
                              :{users: UserDTO[], action: string, onClick: (id: number, userId: number) => void, projectId: number}) => {
    return (<table className="min-w-full">
        <thead>
        <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Id</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Email</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">First Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Last Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">{action}</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-800">{user.id}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{user.email}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{user.firstName}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{user.lastName}</td>
                <td className="px-4 py-2 text-sm text-gray-800">
                    <button onClick={() => onClick(projectId, user.id)}>x</button>
                </td>
            </tr>
        ))}
        </tbody>
    </table>)
}
export default UsersTableWithAction;