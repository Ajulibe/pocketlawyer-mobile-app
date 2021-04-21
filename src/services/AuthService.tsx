import { UserInterface } from "../redux/types/AuthTypes";
import axios from "axios";
import ServerResponse from "../models/ServerResponse";
import URLHOLDER from "../utils/UrlHolder";
import { ServiceConstants } from "./ServiceConstants";
import { AuthDetail } from "../models/AuthDetail";
import { Platform } from "react-native";

export class AuthService {
  //USER REGISTRATION
  static userRegistration = async ({
    authDetail,
  }: {
    authDetail: AuthDetail;
  }) => {
    const reqBody = {
      first_name: authDetail.firstName,
      last_name: authDetail.lastName,
      pin: authDetail.userPin,
      pin_confirm: authDetail.userPin,
      verify_id: authDetail.verifyId,
      phone_number: authDetail.phoneNo,
      email: authDetail.emailAddress,
      meta: {
        device_type: Platform.OS, //ios or android
        "ip-adress": "8.8.8.8",
      },
    };
    let responseData: any = null;
    await fetch(URLHOLDER.REGISTER, ServiceConstants.fetchApiPostData(reqBody))
      .then((result) => result.json())
      .then((response) => {
        if (String(response.success) && String(response.status) == "201") {
          let user = response.data.user;
          let tokens = response.data.tokens;

          let userData: UserInterface = {
            id: user.id,
            uuid: user.uuid,
            userType: user.user_type,
            phoneNumber: user.phone_number,
            firstName: user.first_name,
            lastName: user.last_name,
            emailAddress: user.email,
            accessToken: tokens.access.token,
            accessTokenExpires: tokens.access.expires,
            refreshToken: tokens.refresh.token,
            refreshTokenExpires: tokens.refresh.expires,
          };

          responseData = userData;
        } else {
          responseData = response.message;
        }
      })
      .catch((error) => {
        responseData = error.toString();
      });
    return responseData;
  };

  //USER LOGIN
  static userLogin = async ({
    phoneNumber,
    pin,
  }: {
    phoneNumber: String;
    pin: String;
  }) => {
    const reqBody = {
      pin: pin,
      phone_number: phoneNumber,
    };
    console.log();

    let responseData: any = null;
    await fetch(URLHOLDER.LOGIN, ServiceConstants.fetchApiPostData(reqBody))
      .then((result) => result.json())
      .then((response) => {
        console.log(`\n\nLogin Starts-------`);
        console.log(response);
        console.log("Login Ends---------");

        if (String(response.success) && String(response.status) == "201") {
          let user = response.data.user;
          let tokens = response.data.tokens;

          let userData: UserInterface = {
            id: user.id,
            uuid: user.uuid,
            userType: user.user_type,
            phoneNumber: user.phone_number,
            firstName: user.first_name,
            lastName: user.last_name,
            emailAddress: user.email,
            accessToken: tokens.access.token,
            accessTokenExpires: tokens.access.expires,
            refreshToken: tokens.refresh.token,
            refreshTokenExpires: tokens.refresh.expires,
          };

          responseData = userData;
        } else {
          responseData = response.message;
        }
      })
      .catch((error) => {
        responseData = error.toString();
      });
    return responseData;
  };

  //SEND OTP REQUEST
  static async sendOtp({
    phoneNo,
  }: {
    phoneNo: string;
  }): Promise<ServerResponse> {
    let responseData: ServerResponse = new ServerResponse();
    await axios
      .get(`${URLHOLDER.SEND_OTP}/${phoneNo}`)
      .then((response) => {
        // bind to response data
        responseData.status = response.data.status;
        responseData.success = response.data.success;
        responseData.message = response.data.message;
        responseData.additionalParam = response.data.data.verify_id;
      })
      .catch((error) => {
        responseData.message = error.toString();
      });
    return Promise.resolve(responseData);
  }

  //VERIFY OTP REQUEST
  static async verifyOtp(props: {
    phoneNo: string;
    verifyId: string;
    otpCode: string;
  }): Promise<ServerResponse> {
    const reqBody = {
      phone_number: props.phoneNo,
      verify_id: props.verifyId,
      code: props.otpCode,
    };

    let responseData: ServerResponse = new ServerResponse();
    await fetch(
      URLHOLDER.VERIFY_OTP,
      ServiceConstants.fetchApiPostData(reqBody)
    )
      .then((result) => result.json())
      .then((response) => {
        responseData.status = response.status;
        responseData.success = response.success;
        responseData.message = response.message;
      })
      .catch((error) => {
        responseData.message = error.toString();
      });

    return Promise.resolve(responseData);
  }
}
