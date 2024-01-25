import { database } from "./appwriteConfig";
import userAuth from "./authentication";
import { Permission, Role } from "appwrite";

class UserSavedData {
  async loadData(doc_id) {
    console.log(doc_id)
    try {
      let response = await database.getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_STATUS_COLLECTION_ID,
        doc_id
      );

      console.log(response);
       return response;
    } catch (error) {
      console.error("error");
      return [];
    }
  }

  async sendSavedData(data, COL_ID) {
    try {
      let user = await userAuth.getCurrentUser();
      let isExistingData = await database.getDocument(user?.$id);

      if (!isExistingData || isExistingData.length == 0) {
        const permissions = [];
        if (user) {
          permissions.push(Permission.write(Role.users()));
        }

        const createdDocument = await database.createDocument(
          process.env.APPWRITE_DATABASE_ID,
          COL_ID,
          user?.$id,
          data,
          permissions
        );
        console.log(createdDocument);
        return createdDocument;
      }

      let updatedData = await database.updateDocument(
        process.env.APPWRITE_DATABASE_ID,
        COL_ID,
        user?.$id,
        data
      );
      console.log(updatedData);
      return updatedData;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

const userSavedData = new UserSavedData();
export default userSavedData;
