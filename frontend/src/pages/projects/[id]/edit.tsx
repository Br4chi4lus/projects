import {useRouter} from "next/router";
import ChangeStateForm from "@/components/change-state-form";

const EditProjectPage = () => {
    const router = useRouter();
    const id = parseInt(router.query.id as string, 10);
    return (<div><ChangeStateForm id={id} addUrl={''}/></div>)
}
export default EditProjectPage;