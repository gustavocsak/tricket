import React, { useState } from 'react';
import Header from './Header.js';
import Projects from './Projects.js';
import Tickets from './Tickets.js';
import ProjectForm from './ProjectForm.js';

const App = (props) => {
    const [projectSelected, setProjectSelected] = useState('');
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [projectPosted, setProjectPosted] = useState(false);

    const handleProjectPosted = () => {
        setProjectPosted(!projectPosted);
    };

    return (
        <>
            <Header />
            <Projects projectPosted={projectPosted} setProjectSelected={setProjectSelected} setShowProjectForm={setShowProjectForm} />
            {showProjectForm ? <ProjectForm handleProjectPosted={handleProjectPosted} setShowProjectForm={setShowProjectForm} /> : <></>}
            {projectSelected ? <Tickets project={projectSelected} /> : <></>}
        </>
    );
};

export default App;
