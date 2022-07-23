import {faker} from "@faker-js/faker"
import bcrypt from "bcrypt"


export function createUser () {
    const pass = bcrypt.hashSync("123456", 10)

    const user = {
      email: faker.internet.email(),
      password: pass,
      confirmPassword: pass
    };
    
    return user;
  } 