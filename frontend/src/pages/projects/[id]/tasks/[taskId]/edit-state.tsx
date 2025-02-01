import {useRouter} from "next/router";
import ChangeStateForm from "@/components/change-state-form";

const EditStatePage = () => {
    const router = useRouter();
    const id = parseInt(router.query.id as string, 10);
    const taskId = parseInt(router.query.taskId as string, 10);

    if (!taskId || !id)
        return <div>Loading...</div>;

    return (<div><ChangeStateForm id={id} addUrl={`/tasks/${taskId}`}/></div>)
}

export default EditStatePage;