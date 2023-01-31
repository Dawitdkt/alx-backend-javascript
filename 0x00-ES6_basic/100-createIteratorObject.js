export default function createIteratorObject(report) {
  let dep = report.allEmployees
  
  console.log(Array.from(...dep.allEmployees))
  return report
}
