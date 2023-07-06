//
// This is only a SKELETON file for the 'Kindergarten Garden' exercise.
// It's been provided as a convenience to get you started writing code faster.
//

const DEFAULT_STUDENTS = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Eve',
  'Fred',
  'Ginny',
  'Harriet',
  'Ileana',
  'Joseph',
  'Kincaid',
  'Larry',
];

const PLANT_CODES = {
  G: 'grass',
  V: 'violets',
  R: 'radishes',
  C: 'clover',
};

export class Garden {
  constructor(diagram, students = DEFAULT_STUDENTS) {
    this.student_plants = [];
    const diagramArr = diagram.split('\n');
    let student_counter = 0;

    //custom students order by alphabet
    if(students !== DEFAULT_STUDENTS)
      students.sort()

    //store students and their plants
    for(let i=0; i < diagramArr[0].length; i+=2){
      let plantGroup = [ diagramArr[0][i], diagramArr[0][i+1],
        diagramArr[1][i], diagramArr[1][i+1] ];
      
      const holder = plantGroup.map( d => {
        return  d === 'G' ? PLANT_CODES.G : d === 'V' ? PLANT_CODES.V :
        d === 'R' ? PLANT_CODES.R : d === 'C' ? PLANT_CODES.C : 'error';
      })
      this.student_plants.push({
        student: students[student_counter],
        plants: holder
      })

      student_counter++;
    }
  }

  plants(student) {
    let retStudent = this.student_plants.find(e => e.student === student);
    return retStudent.plants;
  }
}
