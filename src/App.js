import React, { useState } from "react";
import "./styles.css";
import api from "./services/api";
import { useEffect } from "react";


function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setProjects(response.data);
    });

  }, [])
  async function handleAddRepository(url,title,techs) {
  
    const response = await api.post('repositories', {
      title,
      url,
      techs
    });
    const project = response.data;
    setProjects([...projects, project]);
    // TODO
  }

  async function handleRemoveRepository(id) {
    const project = api.delete("repositories/" + id);

    const index = projects.findIndex(project => project.id == id);

    projects.splice(index,1);
    
    setProjects([...projects]);
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project =>
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
         </button>
          </li>

        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
