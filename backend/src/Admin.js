// src/Admin.js

import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Appel GET pour obtenir la liste des cours lors du montage du composant
    fetch('/api/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  // ... (autres parties de l'interface d'administration)

  return (
    <div>
      <h2>Admin Interface</h2>
      {/* Afficher la liste des cours */}
      <ul>
        {courses.map(course => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
