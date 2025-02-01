import React, {useState} from "react";
import {ChangePasswordDTO} from "@/types/change.password.dto";
import {useRouter} from "next/router";
import api from "../../../axios";
import {isAxiosError} from "axios";

const ChangePasswordPage = () =>{
    const [dto, setDto] = useState<ChangePasswordDTO>({
        password: '',
        passwordConfirmation: '',
    });
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDto((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            api.defaults.headers['Authorization'] = localStorage.getItem("token");
            const response = await api.put('api/auth/change-password', dto);
            await router.push('/');
        }catch(error){
            if(isAxiosError(error)){
                if(error.response){
                    setError(error.response.data.message);
                }
            }
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Password</label>
                <input type="password" name="password" value={dto.password} onChange={handleChange} />
                <label>Confirm password</label>
                <input type="password" name="passwordConfirmation" value={dto.passwordConfirmation} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}
export default ChangePasswordPage;