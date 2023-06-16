const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.trim().split('\n');
    const studentsByField = {};

    lines.forEach((line) => {
      const [firstName, lastName, age, field] = line.split(',');
      if (firstName && lastName && field && firstName != 'firstname') {
        if (studentsByField[field]) {
          studentsByField[field].push(firstName);
        } else {
          studentsByField[field] = [firstName];
        }
      }
    });

    const fields = Object.keys(studentsByField).sort((a, b) =>
      a.localeCompare(b)
    );
    let totalStudents = 0;
    fields.forEach((field) => {
      const students = studentsByField[field];
      const count = students.length;
      const list = students.join(', ');
      totalStudents += count;
      //console.log(`Number of students in ${field}: ${count}. List: ${list}`);
    });

    console.log(`Number of students: ${totalStudents}`);
    fields.forEach((field) => {
      const students = studentsByField[field];
      const count = students.length;
      const list = students.join(', ');
      totalStudents += count;
      console.log(`Number of students in ${field}: ${count}. List: ${list}`);
    });
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
