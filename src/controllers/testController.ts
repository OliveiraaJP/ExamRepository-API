import { Request, Response } from "express";
import { TestData } from "../interfaces/testInterface.js";
import * as testService from "../services/testService.js"
import { chalkLogger } from "../utils/chalkLogger.js";

export async function createTest(req: Request, res: Response) {
    const { name, pdfUrl, categoryId, teacherDisciplineId }: TestData = req.body;
    await testService.hasCategoryId(categoryId)
    await testService.hasTeacherDisciplineId(teacherDisciplineId)
    await testService.createTest({ name, pdfUrl, categoryId, teacherDisciplineId })
    res.status(201).send('Test created! :D')
}

export async function getTests(req: Request, res: Response) {
    const {groupBy} = req.query

    const tests = await testService.getTests(String(groupBy))
    chalkLogger.logObject('controller', tests)
    res.status(200).send(tests)
}