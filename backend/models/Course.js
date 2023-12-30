// backend/models/Course.js

const connection = require('../config/db'); // Assurez-vous d'avoir le fichier de configuration pour la connexion à la base de données

const Course = {
  // Récupérer tous les cours
  findAll: (result) => {
    connection.query('SELECT * FROM courses', result);
  },

  // Récupérer un cours par ID
  findById: (id, result) => {
    connection.query('SELECT * FROM courses WHERE id = ?', [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
        return;
      }

      // Aucun cours trouvé avec l'ID spécifié
      result({ kind: 'not_found' }, null);
    });
  },

  // Créer un nouveau cours
  create: (newCourse, result) => {
    connection.query('INSERT INTO courses SET ?', newCourse, (err, res) => {
      if (err) {
        console.error('Error creating course:', err);
        result(err, null);
        return;
      }
      console.log('Course created successfully:', res);
      result(null, { id: res.insertId, ...newCourse });
    });
  },

  // Mettre à jour un cours par ID
  update: (id, updatedCourse, result) => {
    connection.query('UPDATE courses SET ? WHERE id = ?', [updatedCourse, id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // Aucun cours trouvé avec l'ID spécifié
        result({ kind: 'not_found' }, null);
        return;
      }

      result(null, { id: id, ...updatedCourse });
    });
  },

  // Supprimer un cours par ID
  delete: (id, result) => {
    connection.query('DELETE FROM courses WHERE id = ?', [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // Aucun cours trouvé avec l'ID spécifié
        result({ kind: 'not_found' }, null);
        return;
      }

      result(null, res);
    });
  },
};

module.exports = Course;
