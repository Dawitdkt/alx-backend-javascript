const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.split('\n').filter((line) => line.trim() !== '');
        const numberOfStudents = lines.length - 1;
        const fields = lines[0].split(',');

        console.log(`Number of students: ${numberOfStudents}`);

        for (let i = 0; i < fields.length; i++) {
          const field = fields[i];
          const students = lines.slice(1).map((line) => line.split(',')[i]);
          const filteredStudents = students.filter((student) => student.trim() !== '');

          console.log(`Number of students in ${field}: ${filteredStudents.length}. List: ${filteredStudents.join(', ')}`);
        }

        resolve();
      }
    });
  });
}

// Example usage
countStudents('database.csv')
  .catch((error) => {
    console.error(error.message);
  });
