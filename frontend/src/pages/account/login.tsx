import React, {useState} from "react";
import {LoginUserDto} from "@/types/login.user.dto";
import {useRouter} from "next/router";
import api from "../../../axios";
import axios from "axios";

const LoginPage = () =>{
    const [dto, setDto] = useState<LoginUserDto>({
        email: '',
        password: '',
    });

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDto((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const response = await api.post('/api/auth/login', dto);
            console.log(response.data.access_token);
            localStorage.setItem('token', 'Bearer ' + response.data.access_token);
            api.defaults.headers['Authorization'] = `Bearer ${response.data.access_token}`;
            console.log(response.data);
            await router.push('/projects');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 401) {
                    setError(error.response.data.message);
                }
            }
            console.error(error);
        }
    }

    return (<div className="text-center">
        <h1 className="font-bold text-gray-600">Log in</h1>
        <form onSubmit={handleSubmit}>
            <div className="text-left mt-10 grid grid-cols-5 gap-x-6 gap-y-8">
                <div className="col-start-3 flex justify-center">
                    <label className="font-semibold">Email:
                        <input className="flex rounded outline outline-1 font-normal" name="email" value={dto.email}
                               onChange={handleChange} type="email" required/>
                    </label>
                </div>
                <div className="col-start-3 flex justify-center">
                    <label className="font-semibold">Password:
                        <input className="flex rounded outline outline-1 font-normal" name="password"
                               value={dto.password}
                               onChange={handleChange} type="password" required/>
                    </label>
                </div>
                <div className="col-start-3 flex justify-center">
                    <button className="pl-2 pr-2 pt-1 pb-1 rounded outline outline-1 font-semibold "
                            type="submit">Login
                    </button>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </div>
            </div>
        </form>
    </div>);
}
export default LoginPage;