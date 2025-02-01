import React, {useEffect, useState} from "react";
import {StateOfProjectDTO} from "@/types/state-of-project.dto";
import api from "../../axios";
import {useRouter} from "next/router";

const ChangeStateForm = ({id, addUrl}: {id: number, addUrl: string}) => {
    const router = useRouter();
    const [states, setStates] = useState<StateOfProjectDTO[]>([]);
    const [state, setState] = useState<StateOfProjectDTO>(
        { state: '' }
    );

    useEffect(() => {
        const fetchStates = async () => {
            try{

                api.defaults.headers['Authorization'] = localStorage.getItem('token');
                const response = await api.get(`/api/projects/states`);
                setStates(response.data);
            }catch(e){
                console.log(e);
            }
        }
        fetchStates();
    });

    const handleRadioChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({state: e.target.value});
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await api.put(`/api/projects/${id}${addUrl}`, state);
        router.back();
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-y-2 justify-center">
            {states.map((state1) => (
                <div key={state1.state} className={"col-start-2 flex justify-center font-normal"}>
                    <label className={"w-1/4 text-left"}>{state1.state}:</label>
                    <input type="radio" name={"state"} value={state1.state} onChange={handleRadioChange}
                           checked={state1.state === state.state}/>
                </div>)
                    )}
            <div className={"col-start-2 flex justify-center font-normal"}>
                <button type="submit" className="outline outline-1 rounded pt-1 pb-1 pr-2 pl-2">Submit</button>
            </div>
        </form>)
}

export default ChangeStateForm;