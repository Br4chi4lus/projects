import ProjectsTable from "@/components/projects-table";
import Link from "next/link";

const ProjectsPage = () => {
    return (<div  className={"text-right"}>
        <Link className="mr-5 text-green-600" href="/projects/create">Create new</Link>
        <ProjectsTable/>
    </div>);
}
export default ProjectsPage;