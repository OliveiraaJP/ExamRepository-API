import prisma from "../config/database.js";
import { TestData } from "../interfaces/testInterface.js";

async function getCategory(id:number) {
    return await prisma.categorie.findFirst({where: {id}})
}

async function getTeacherDiscipline(id:number) {
    return await prisma.teacherDiscipline.findFirst({where: {id}})
}

async function createTest(testObj:TestData) {
    return await prisma.test.create({data: testObj})
}

export{
    getCategory,
    getTeacherDiscipline,
    createTest
}