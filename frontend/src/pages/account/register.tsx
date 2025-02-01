import {useState} from "react";
import {CreateUserDto} from "@/types/create.user.dto";
import {useRouter} from "next/router";
import api from "../../../axios";
import axios from "axios";


const RegisterPage = () => {
    const [user, setUser] = useState<CreateUserDto>({
        email: '',
        password: '',
        passwordConfirmation: '',
        firstName: '',
        lastName: '',
        dateOfBirth: ''
    });
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await api.post('/api/auth/register', user);

            await router.push(`login`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 400) {
                    setError(error.response.data.message);
                }
            }

            console.error('Błąd:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <div className="text-center">
            <h1 className="font-bold text-gray-600">Registration</h1>
            <form onSubmit={handleSubmit}>
                <div className="text-left">
                    <div className="mt-10 grid grid-cols-5 gap-x-6 gap-y-8">
                        <div className="col-start-3 flex justify-center">
                            <label className="text-gray-700 font-semibold">
                                Email:
                                <input
                                    className="flex rounded outline outline-1 font-normal"
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className="col-start-3 flex justify-center">
                            <label className="text-gray-700 font-semibold">
                                Password:
                                <input
                                    className="flex rounded outline outline-1 font-normal"
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className="col-start-3 flex justify-center">
                            <label className="text-gray-700 font-semibold">
                                Password Confirmation:
                                <input
                                    className="flex rounded outline outline-1 font-normal"
                                    type="password"
                                    name="passwordConfirmation"
                                    value={user.passwordConfirmation}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className="col-start-3 flex justify-center">
                            <label className="text-gray-700 font-semibold">
                                First Name:
                                <input
                                    className="flex rounded outline outline-1 font-normal"
                                    type="text"
                                    name="firstName"
                                    value={user.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className="col-start-3 flex justify-center">
                            <label className="text-gray-700 font-semibold">
                                Last Name:
                                <input className="flex rounded outline outline-1 font-normal"
                                       type="text"
                                       name="lastName"
                                       value={user.lastName}
                                       onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="col-start-3 flex justify-center">
                            <label className="text-gray-700 font-semibold">
                                Date of Birth:
                                <input
                                    className="flex justify-center rounded outline outline-1 font-normal"
                                    type="date"
                                    name="dateOfBirth"
                                    value={user.dateOfBirth}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className="col-start-3 flex justify-center font-semibold font-normal">
                            <button type="submit"
                                    className="pl-2 pr-2 pt-1 pb-1 rounded bg-gray-50 outline outline-1">Submit
                            </button>
                            {error && <p style={{color: 'red'}}>{error}</p>}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;