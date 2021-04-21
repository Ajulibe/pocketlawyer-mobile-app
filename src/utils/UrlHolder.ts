const BASE_URL =
  "https://2janwjh983.execute-api.eu-west-2.amazonaws.com/dev/auth/";

const URLHOLDER = {
  // AUTH URLs 
  SEND_OTP: BASE_URL + "wallet/send_otp",
  VERIFY_OTP: BASE_URL + "wallet/validate_otp",
  REGISTER: BASE_URL + "wallet/register",
  LOGIN: BASE_URL + "wallet/login",
};

export default URLHOLDER;
