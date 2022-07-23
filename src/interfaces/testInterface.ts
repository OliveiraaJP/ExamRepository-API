import { Test } from "@prisma/client";

export type TestData = Omit<Test, 'id'>