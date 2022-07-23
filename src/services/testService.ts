import { TestData } from "../interfaces/testInterface.js"
import * as testRepository from "../repositories/testRepository.js"
import { AppError } from "../utils/error.js"

async function hasCategoryId(id: number) {
    const hasCategory = testRepository.getCategory(id)
    if(!hasCategory){
        throw new AppError(404, 'Category not found! x_x')
    }
}

async function hasTeacherDisciplineId(id: number) {
    const hasTeacherDiscipline = testRepository.getTeacherDiscipline(id)
    if(!hasTeacherDiscipline){
        throw new AppError(404, 'Teacher-Discipline not found! x_x')
    }
}

async function createTest(testObj:TestData) {
    await testRepository.createTest(testObj)
}

export {
    hasCategoryId,
    hasTeacherDisciplineId,
    createTest
}