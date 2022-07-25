import prisma from "../config/database.js";
import { TestData } from "../interfaces/testInterface.js";

async function getCategory(id: number) {
  return await prisma.categorie.findFirst({ where: { id } })
}

async function getTeacherDiscipline(id: number) {
  return await prisma.teacherDiscipline.findFirst({ where: { id } })
}

async function createTest(testObj: TestData) {
  return await prisma.test.create({ data: testObj })
}

async function getTestsByDisciplines() {
  return prisma.term.findMany({
    include: {
      disciplines: {
        select: {
          id: true,
          name: true,
          termRef: {},
          teacherDisciplines: {
            select: {
              id: true,
              disciplineRef: {},
              teacherRef: {},
              tests: {
                select: { id: true, name: true, pdfUrl: true, categoryRef: {} },
              },
            },
          },
        },
      },
    },
  });
}

async function getTestsByTeachers() {
  return prisma.teacherDiscipline.findMany({
    select: {
      id: true,
      disciplineRef: {},
      teacherRef: {},
      tests: { select: { id: true, name: true, pdfUrl: true, categoryRef: {} } },
    },
  });
}



export {
  getCategory,
  getTeacherDiscipline,
  createTest,
  getTestsByDisciplines,
  getTestsByTeachers
}