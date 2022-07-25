import {faker} from "@faker-js/faker"
import supertest from "supertest";
import app from "../../src/app.js";


export function createTest () {

    const test = {
      name: faker.name.findName(),
      pdfUrl: faker.internet.url(),
      categoryId: 1,
      teacherDisciplineId: 1
    };
    
    return test;
  } 

export async function getToken() {
  const login = {
    email: "teste@teste.com",
    password: "123456",
    confirmPassword: "123456"
  }
  await supertest(app).post(`/sign-up`).send(login)
  const loginData = await supertest(app).post(`/sign-in`).send({email: login.email, password: login.password})
  const token = String(loginData.text).trim()
  console.log('FACTORY1')
  console.log(token)
  console.log('FACTORY2')
  return `Bearer ${token}`
}