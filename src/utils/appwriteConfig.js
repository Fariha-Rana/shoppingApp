import { Client, Databases, Account } from "appwrite";
import { APPWRITE_PROJECT_ID, DATABASE_ID } from "./envVariables";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(APPWRITE_PROJECT_ID);

export const database = new Databases(
  client,
  DATABASE_ID
);
export const account = new Account(client);
