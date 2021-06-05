import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_TYPE = "userType";
const TOKEN = "token";
const USER_ID = "userID";
const USER = "user";
const PREVIOUSPATH = "previousPath";
const GOTO_PICK_LAWYER = "gotoPickLawyer";
const GOTO_CHECKOUT = "gotoCheckout";

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
  //previous path
  static setPreviousPath = async (previousPath: string) => {
    return await AsyncStorage.setItem(PREVIOUSPATH, previousPath);
  };

  static getPreviousPath = async (): Promise<string | null> => {
    return await AsyncStorage.getItem(PREVIOUSPATH);
  };
  //Goto Cat Pick Layer
  static setGotoPickLawyer = async (data: string) => {
    return await AsyncStorage.setItem(GOTO_PICK_LAWYER, data);
  };

  static getGotoPickLawyer = async (): Promise<string | null> => {
    return await AsyncStorage.getItem(GOTO_PICK_LAWYER);
  };
  //Goto Checkout
  static setGotoCheckout = async (data: string) => {
    return await AsyncStorage.setItem(GOTO_CHECKOUT, data);
  };

  static getGotoCheckout = async (): Promise<string | null> => {
    return await AsyncStorage.getItem(GOTO_CHECKOUT);
  };
}

export default AsyncStorageUtil;
