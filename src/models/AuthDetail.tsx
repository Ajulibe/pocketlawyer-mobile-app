export class AuthDetail {
  phoneNo?: string;
  phoneOtp?: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  userPin?: string;
  verifyId?: string;

  constructor(
    phoneNo?: string,
    phoneOtp?: string,
    firstName?: string,
    lastName?: string,
    emailAddress?: string,
    userPin?: string,
    verifyId?: string,
    ver?: string
  ) {
    this.phoneNo = phoneNo;
    this.phoneOtp = phoneOtp;
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailAddress = emailAddress;
    this.userPin = userPin;
    this.verifyId = verifyId;
  }
}
