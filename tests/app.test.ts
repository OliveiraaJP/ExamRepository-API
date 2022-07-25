import prisma from "../src/config/database.js";
import supertest from "supertest";
import app from "../src/app.js";
import * as userFactory from "./factories/userFactory.js"
import * as testFactory from "./factories/testFactory.js"


beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users`
    await prisma.$executeRaw`TRUNCATE TABLE tests`
})

describe("User Tests", () => {
    it("Create a user", async () => {
        const login = userFactory.createUser()
        const response = await supertest(app).post(`/sign-up`).send(login)
        expect(response.statusCode).toBe(201)

        const user = await prisma.user.findFirst({
            where: { email: login.email }
        })

        // check user
        expect(user.email).toBe(login.email)
    })

    it("Create a duplicate user expect 400", async () => {
        const login = userFactory.createUser()
        await supertest(app).post(`/sign-up`).send(login)
        const response = await supertest(app).post(`/sign-up`).send(login)
        expect(response.statusCode).toBe(400)
    })

    it("Login a user", async () => {
        const login = userFactory.createUser()
        await supertest(app).post(`/sign-up`).send(login)
        const response = await supertest(app).post(`/sign-in`).send({
            email: login.email,
            password: login.password
        })
        const token = response.text
        console.log('login')
        console.log(token)
        console.log('proximo')
        expect(token).not.toBeNull()
    })

    it("Login user w/ wrong credentials", async () => {
        const login = {email: "errado@errado.com", password: "errofeio" }
        const token = await supertest(app).post(`/sign-in`).send(login)
        expect(token.statusCode).toBe(401)
    })
})

describe("Create test Tests", () => {
    it("Create a test", async () => {
        const bearerToken = await testFactory.getToken()
        const test = testFactory.createTest()
        const response = await supertest(app).post(`/tests`).send(test).set("Authorization", bearerToken)
        expect(response.statusCode).toBe(201)
    })

    it("Create a test w/o token", async () => {
        const test = testFactory.createTest()
        const response = await supertest(app).post(`/tests`).send(test)
        expect(response.statusCode).not.toBe(201)
    })

    it("Create a test w/ token but w/o valid values", async () => {
        const bearerToken = await testFactory.getToken()
        const test = testFactory.createFakeTest()
        const response = await supertest(app).post(`/tests`).send(test).set("Authorization", bearerToken)
        expect(response.statusCode).not.toBe(201)
    })

})

describe("Get tests", () => {
    it('Get tests group by disciplines expect 200', async() => {
        const bearerToken = await testFactory.getToken()
        const response = await supertest(app).get(`/tests?groupBy=disciplines`).set("Authorization", bearerToken)
        expect(response.statusCode).toBe(200)
    });

    it('Get tests group by teachers expect 200', async() => {
        const bearerToken = await testFactory.getToken()
        const response = await supertest(app).get(`/tests?groupBy=teachers`).set("Authorization", bearerToken)
        expect(response.statusCode).toBe(200)
    })

    it('Get tests w/ group by expect 404', async() => {
        const bearerToken = await testFactory.getToken()
        const response = await supertest(app).get(`/tests`).set("Authorization", bearerToken)
        expect(response.statusCode).toBe(404)
    })
})

afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users`
    await prisma.$executeRaw`TRUNCATE TABLE tests`
    await prisma.$disconnect()
})