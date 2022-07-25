import {faker} from "@faker-js/faker"



export function createTest () {

    const test = {
      name: faker.name.findName(),
      pdfUrl: faker.internet.url(),
      categoryId: 1,
      teacherDisciplineId: 1
    };
    
    return test;
  } 