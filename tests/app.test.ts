import prisma from "../src/config/database.js";
import supertest from "supertest";
import app from "../src/app.js";
import * as userFactory from "./factories/userFactory.js"
import * as testFactory from "./factories/testFactory.js"


beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users`
})

describe("User Tests", () => {
    it("Create a user", async () => {
        const login = userFactory.createUser()
        const response = await supertest(app).post(`/signup`).send(login)
        expect(response.statusCode).toBe(201)

        const user = await prisma.user.findFirst({
            where: { email: login.email }
        })

        // check user
        expect(user.email).toBe(login.email)
    })

    it("Create a duplicate user", async () => {
        const login = userFactory.createUser()
        await supertest(app).post(`/signup`).send(login)
        const response = await supertest(app).post(`/signup`).send(login)
        expect(response.statusCode).toBe(400)
    })

    it("Login a user", async () => {
        const login = userFactory.createUser()
        await supertest(app).post(`/signup`).send(login)
        const response = await supertest(app).post(`/signin`).send({
            email: login.email,
            password: login.password
        })
        const token = response.body.token
        expect(token).not.toBeNull()
    })
})

describe("Create test Tests", () => {
    it("Create a test", async () => {
        const test = testFactory.createTest()
        const response = await supertest(app).post(`/tests`).send(test)
        expect(response.statusCode).toBe(201)
    })
})

afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users`
    await prisma.$disconnect()
})