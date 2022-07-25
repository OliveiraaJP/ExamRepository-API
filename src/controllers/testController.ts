import { Request, Response } from "express";
import { TestData } from "../interfaces/testInterface";
import * as testService from "../services/testService.js"

export async function createTest(req: Request, res: Response) {
    const { name, pdfUrl, categoryId, teacherDisciplineId }: TestData = req.body;
    await testService.hasCategoryId(categoryId)
    await testService.hasTeacherDisciplineId(teacherDisciplineId)
    await testService.createTest({ name, pdfUrl, categoryId, teacherDisciplineId })
    res.status(201).send('Test created! :D')
}

export async function getTests(req: Request, res: Response) {
    const {groupBy} = req.query
}