// import React, { useState } from 'react';
// import { useQuery } from '@apollo/client';
// import { PROJECTS_QUERY } from '../../utils/queries';
// import ProjectItem from './ProjectItem';
// import ProjectForm from './ProjectForm';

// const ProjectList = ({ userId }) => {
//   const { loading, error, data, refetch } = useQuery(PROJECTS_QUERY, {
//     variables: { userId },
//   });
//   const [selectedProject, setSelectedProject] = useState(null);

//   const handleFinished = () => {
//     setSelectedProject(null);
//     refetch();
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h2>Projects</h2>
//       {data.projects.map((project) => (
//         <ProjectItem
//           key={project._id}
//           project={project}
//           onEdit={() => setSelectedProject(project)}
//         />
//       ))}
//       <h3>{selectedProject ? 'Edit Project' : 'Add Project'}</h3>
//       <ProjectForm project={selectedProject} userId={userId} onFinished={handleFinished} />
//     </div>
//   );
// };

// export default ProjectList;

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { PROJECTS_QUERY } from '../../utils/queries';
import ProjectItem from './ProjectItem';
import ProjectForm from './ProjectForm';
import DisplayLogPage from '../../pages/DailyLogPage'; // Import DisplayLogPage

const ProjectList = ({ userId }) => {
  const { loading, error, data, refetch } = useQuery(PROJECTS_QUERY, {
    variables: { userId },
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeProjectId, setActiveProjectId] = useState(null); // Add this state

  const handleFinished = () => {
    setSelectedProject(null);
    refetch();
  };

  const handleProjectClick = (projectId) => {
    setActiveProjectId(projectId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // If activeProjectId is set, show DisplayLogPage
  if (activeProjectId) {
    return <DisplayLogPage projectId={activeProjectId} />;
  }

  return (
    <div>
      <h2>Projects</h2>
      {data.projects.map((project) => (
        <ProjectItem
          key={project._id}
          project={project}
          onEdit={() => setSelectedProject(project)}
          onClick={() => handleProjectClick(project._id)} // Add onClick handler
        />
      ))}
      <h3>{selectedProject ? 'Edit Project' : 'Add Project'}</h3>
      <ProjectForm project={selectedProject} userId={userId} onFinished={handleFinished} />
    </div>
  );
};

export default ProjectList;


