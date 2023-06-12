import fs from 'fs';

const readDatabase = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        const lines = data.split('\n').filter(Boolean);
        const studentsByField = {};

        for (const line of lines) {
          const [firstName, field] = line.split(',');
          if (!studentsByField[field]) {
            studentsByField[field] = [];
          }
          studentsByField[field].push(firstName);
        }

        resolve(studentsByField);
      }
    });
  });
};

export default readDatabase;
