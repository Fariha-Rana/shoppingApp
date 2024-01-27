import { database } from "./appwriteConfig";
import { Permission, Role } from "appwrite";

import {
  DATABASE_ID,
  STATUS_COLLECTION_ID,
} from "./envVariables";

class UserSavedData {

  // get the cart and wishlist count to show counts in navbar
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

  // update wishlist and cart items count 
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

  // post or update items of cart and wishlist 
  async postCartorWishlistData(data, COL_ID, DOC_ID) {
    try {
      let isExistingData = await this.existingDoc(COL_ID, DOC_ID);

      if (
        isExistingData.length !== 0 &&
        isExistingData.documents?.length !== 0
      ) {
         await database.updateDocument(
          DATABASE_ID,
          COL_ID,
          DOC_ID,
          {
            image: [...isExistingData.image, data.image],
            price: [...isExistingData.price, data.price],
            inCart: [...isExistingData.inCart, data.inCart],
            inWishlist: [...isExistingData.inWishlist, data.inWishlist],
          }
        );

      } else {
        const permissions = [Permission.write(Role.users())];

        await database.createDocument(
          DATABASE_ID,
          COL_ID,
          DOC_ID,
          {
            price: [data.price],
            image: [data.image],
            inCart: [data.inCart],
            inWishlist: [data.inWishlist],
          },
          permissions
        );
      }
    } catch (error) {
      return [];
    }
  }

  // remove item from cart or wishlist
  async removeCartorWishlistItem(COL_ID, DOC_ID, data){
    try {
      let isExistingData = await this.existingDoc(COL_ID, DOC_ID);
      const index = isExistingData.image.indexOf(data.image);
        if (index !== -1) { 
            const filteredImage = isExistingData.image.filter((_, i) => i !== index);
            const filteredPrice = isExistingData.price.filter((_, i) => i !== index);
            const filteredInCart = isExistingData.inCart.filter((_, i) => i !== index);
            const filteredInWishlist = isExistingData.inWishlist.filter((_, i) => i !== index);

            const response = await database.updateDocument(
                DATABASE_ID,
                COL_ID,
                DOC_ID,
                {
                    image: filteredImage,
                    price: filteredPrice,
                    inCart: filteredInCart,
                    inWishlist: filteredInWishlist,
                }
            );
            console.log(response);
        } else {
            console.log('Image not found in the array');
        }
    } catch (error) {
      console.log(error)
    }
    
  }
}

const userSavedData = new UserSavedData();
export default userSavedData;
