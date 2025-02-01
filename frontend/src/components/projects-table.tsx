import {useEffect, useState} from "react";
import {ProjectDTO} from "@/types/project.dto";
import api from "../../axios";
import Link from "next/link";

const ProjectsTable = () => {
    const [projects, setProjects] = useState<ProjectDTO[]>([]);
     useEffect(() => {
         const fetchProjects = async () => {
             try{
                 api.defaults.headers['Authorization'] = localStorage.getItem('token');
                 const response = await api.get<ProjectDTO[]>('/api/projects');
                 setProjects(response.data);
             }
             catch (error) {
                 console.log(error);
             }

         };
         fetchProjects();
     });
     return (<table className="min-w-full">
         <thead>
         <tr className="bg-gray-100">
             <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Id</th>
             <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
             <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 w-1/5">Description</th>
             <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Manager</th>
             <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">State of project</th>
             <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Date of creation</th>
         </tr>
         </thead>
         <tbody>
         {projects.map((project) => (
             <tr key={project.id} className="border-b hover:bg-gray-50">
                 <td className="px-4 py-2 text-sm font-semibold text-gray-800">{project.id}</td>
                 <td className="px-4 py-2 text-left text-sm text-gray-800"><Link href={`/projects/${project.id}`}>{project.name}</Link></td>
                 <td className="px-4 py-2 text-left text-sm text-gray-800">{project.description}</td>
                 <td className="px-4 py-2 text-left text-sm text-gray-800">{project.manager.firstName + ' ' + project.manager.lastName}</td>
                 <td className="px-4 py-2 text-left text-sm text-gray-800"><Link href={`/projects/${project.id}/edit`}>{project.state.state}</Link></td>
                 <td className="px-4 py-2 text-left text-sm text-gray-800">{project.dateOfCreation.toString()}</td>
             </tr>
         ))}
         </tbody>
     </table>)
}
export default ProjectsTable;