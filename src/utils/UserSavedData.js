import { database } from "./appwriteConfig";
import { Permission, Role } from "appwrite";
import {
  DATABASE_ID,
  STATUS_COLLECTION_ID,
  CART_COLLECTION_ID,
  WISHLIST_COLLECTION_ID,
} from "./envVariables";

class UserSavedData {
  async cartandWishlistCount(doc_id) {
    try {
      let response = await database.getDocument(
        DATABASE_ID,
        STATUS_COLLECTION_ID,
        doc_id
      );

      console.log(response);
      return response;
    } catch (error) {
      console.error("error");
      return [];
    }
  }

  async existingDoc(COL_ID, DOC_ID) {
    try {
      let isExistingData = await database.getDocument(
        DATABASE_ID,
        COL_ID,
        DOC_ID
      );
      console.log(isExistingData);
      return isExistingData;
    } catch (err) {
      return [];
    }
  }

  async postCartorWishlistData(data, COL_ID, DOC_ID) {
    try {
      let isExistingData = await this.existingDoc(COL_ID, DOC_ID);

      if (
        isExistingData.length !== 0 &&
        isExistingData.documents?.length !== 0
      ) {
        const promise = await database.updateDocument(
          DATABASE_ID,
          COL_ID,
          DOC_ID,
          {
            title: [...isExistingData.title, data.title],
            description: [...isExistingData.description, data.description],
            rating: [...isExistingData.rating, data.rating],
            image: [...isExistingData.image, data.image],
            price: [...isExistingData.price, data.price],
            inCart: [...isExistingData.inCart, data?.inCart],
            inWishlist: [...isExistingData.inWishlist, data?.inWishlist],
          }
        );
        console.log(promise);
        return;
      } else {
        const permissions = [Permission.write(Role.users())];

        const createdDocument = await database.createDocument(
          DATABASE_ID,
          COL_ID,
          DOC_ID,
          {
            title: [data.title],
            description: [data.description],
            rating: [data.rating],
            price: [data.price],
            image: [data.image],
            inCart: [data?.inCart],
            inWishlist: [data?.inWishlist],
          },
          permissions
        );
        console.log(createdDocument);
        return;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

const userSavedData = new UserSavedData();
export default userSavedData;
