import {useRouter} from "next/router";
import React, {useState} from "react";
import api from "../../../axios";

const ChangeRolePage = () => {
    const router = useRouter();
    const  {id}  = router.query;
    const [roleName, setRoleName] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            api.defaults.headers['Authorization'] = localStorage.getItem("token");
            await api.put(`/api/users/${id}`, {newRole: roleName})
            await router.push("/users");
        }
        catch(error){
            console.log(error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoleName(e.target.value);
    }
    return (<div className={"text-center mt-10"}>
        <h1 className={"mb-8 font-semibold text-gray-500"}>Change role for user with id: {id}</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-y-2">
            <div className={"col-start-2 flex justify-center font-normal"}>

                <label className={"w-1/4 text-left"}>Admin:
                </label>
                <input
                    type="radio"
                    name="role"
                    value="Admin"
                    checked={roleName === 'Admin'}
                    onChange={handleChange}
                />

            </div>
            <div className={"col-start-2 flex justify-center font-normal"}>
                <label className="w-1/4 text-left">Manager:</label>
                <input
                    type="radio"
                    name="role"
                    value="Manager"
                    checked={roleName === 'Manager'}
                    onChange={handleChange}
                />
            </div>
            <div className={"col-start-2 flex justify-center font-normal"}>
                <label className="w-1/4 text-left">User:</label>
                <input
                    type="radio"
                    name="role"
                    value="User"
                    checked={roleName === 'User'}
                    onChange={handleChange}
                />
            </div>
            <div className={"col-start-2 flex justify-center font-normal"}>
                <button type="submit" className="outline outline-1 rounded pt-1 pb-1 pr-2 pl-2">Submit</button>
            </div>
        </form>
    </div>);
}

export default ChangeRolePage;