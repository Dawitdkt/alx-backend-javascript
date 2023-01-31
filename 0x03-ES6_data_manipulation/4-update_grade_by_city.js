export default function getStudentsByLocation(array, city, newGrade) {
  return array
    .filter((i) => i.location === city)
    .map((student) => {
      const gradeI = newGrade
        .filter((i) => i.studentId === student.id)
        .map((x) => x.grade)[0];
      const grade = gradeI || 'N/A';
      return { ...student, grade };
    });
}
