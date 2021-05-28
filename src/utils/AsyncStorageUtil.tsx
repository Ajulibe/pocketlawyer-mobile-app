import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_TYPE = "userType";
const TOKEN = "token";
const USER_ID = "userID";
const USER = "user";

class AsyncStorageUtil {
  // Token
  static setToken = async (token: string) => {
    return await AsyncStorage.setItem(TOKEN, token);
  };
  static getToken = async (): Promise<string | null> => {
    return await AsyncStorage.getItem(TOKEN);
  };
  // User Type
  static setUserType = async (user: string) => {
    return await AsyncStorage.setItem(USER_TYPE, user);
  };
  static getUserType = async (): Promise<string | null> => {
    return await AsyncStorage.getItem(USER_TYPE);
  };
  // User ID
  static setUserId = async (uid: string) => {
    return await AsyncStorage.setItem(USER_ID, uid);
  };
  static getUserId = async (): Promise<string | null> => {
    return await AsyncStorage.getItem(USER_ID);
  };
  // User Object
  static setUser = async (user: string) => {
    return await AsyncStorage.setItem(USER, user);
  };
  static getUser = async (): Promise<string | null> => {
    return await AsyncStorage.getItem(USER);
  };
}

export default AsyncStorageUtil;
