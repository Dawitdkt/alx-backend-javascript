import readDatabase from '../utils';

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const studentsByField = await readDatabase(req.databaseFilePath);
      const fields = Object.keys(studentsByField).sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase())
      );

      res.status(200).send('This is the list of our students\n\n');

      for (const field of fields) {
        const students = studentsByField[field];
        const count = students.length;
        const list = students.join(', ');
        res.write(`Number of students in ${field}: ${count}. List: ${list}\n`);
      }

      res.end();
    } catch (error) {
      res.status(500).send(`Cannot load the database: ${error.message}`);
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const studentsByField = await readDatabase(req.databaseFilePath);
      const students = studentsByField[major] || [];
      const list = students.join(', ');

      res.status(200).send(`List: ${list}`);
    } catch (error) {
      res.status(500).send(`Cannot load the database: ${error.message}`);
    }
  }
}

export default StudentsController;
