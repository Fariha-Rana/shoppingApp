import { Client, Databases, Account } from "appwrite";
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  // .setProject(process.env.APPWRITE_ID);
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_ID);

export const database = new Databases(
  client,
  process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
);
export const account = new Account(client);
