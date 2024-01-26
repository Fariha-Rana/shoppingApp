import { Client, Databases, Account } from "appwrite";
const client = new Client();
import { APPWRITE_PROJECT_ID, DATABASE_ID } from "./envVariables";
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  // .setProject(process.env.APPWRITE_ID);
  .setProject(APPWRITE_PROJECT_ID);

export const database = new Databases(
  client,
  DATABASE_ID
);
export const account = new Account(client);
