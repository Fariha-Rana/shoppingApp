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
      return response;
    } catch (error) {
      return false;
    }
  }

  async updateCartandWishlistCount(doc_id, count) {
    try {
      const doc = await this.cartandWishlistCount(doc_id);
      if (!doc) {
        let response = await database.createDocument(
          DATABASE_ID,
          STATUS_COLLECTION_ID,
          doc_id,
          count
        );

        return response;
      } else {
        let response = await database.updateDocument(
          DATABASE_ID,
          STATUS_COLLECTION_ID,
          doc_id,
          count
        );
        return response;
      }
    } catch (error) {
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
            image: [...isExistingData.image, data.image],
            price: [...isExistingData.price, data.price],
            inCart: [...isExistingData.inCart, data?.inCart],
            inWishlist: [...isExistingData.inWishlist, data?.inWishlist],
          }
        );
        return;
      } else {
        const permissions = [Permission.write(Role.users())];

        const createdDocument = await database.createDocument(
          DATABASE_ID,
          COL_ID,
          DOC_ID,
          {
            price: [data.price],
            image: [data.image],
            inCart: [data?.inCart],
            inWishlist: [data?.inWishlist],
          },
          permissions
        );
        return;
      }
    } catch (error) {
      return [];
    }
  }
}

const userSavedData = new UserSavedData();
export default userSavedData;
