import { account } from "./appwriteConfig";

class UserAuth {
  async _createAnonymousSession(name) {
    try {
      await account.createAnonymousSession();
      await account.updateName(name);
      const user = account.get();
      return user;
    } catch (e) {
    }
  }

  async getCurrentUser() {
    try {
      const currentUser = await account.get();
      return currentUser || null;
    } catch (error) {
      return null
    }
  }

}

const userAuth = new UserAuth();
export default userAuth;
