import React from 'react';
import Header from './Header.js';
import Projects from './Projects.js';
import { useState } from 'react';
import Tickets from './Tickets.js';

const App = (props) => {
    const [projectSelected, setProjectSelected] = useState('');

    return (
        <>
            <Header />
            <Projects setProjectSelected={setProjectSelected} />
            {projectSelected ? <Tickets project={projectSelected} /> : <></>}
        </>
    );
};

export default App;
