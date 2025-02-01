import ProjectInfo from "@/components/project-info";
import {useRouter} from "next/router";

const ProjectPage = () => {
    const router = useRouter();
    const  id  = router.query.id;
    return (
        <div>
            <ProjectInfo id={parseInt(id as string, 10)}/>
        </div>
    )
}

export default ProjectPage;