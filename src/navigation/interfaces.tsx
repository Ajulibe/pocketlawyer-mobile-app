//--> AUTH_VALIDATE_EMAIL PARAMS
export interface IndividualSignUpInterface {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface IndividualSignUpInterfaceSectionTwo {
  firstSection: IndividualSignUpInterface;
  state: string;
  city: string;
  dob: string;
  password: string;
  userType: number;
}

export interface RegisterInterface {
  firstName: string;
  lastName: string;
  email: string;
  userType: number;
  dob: any;
  password: string;
  address: string;
  phone: string;
}

//--> submitting categories -- individual
type Categorylist = Array<{ CategoryCode: string; CategoryName: string }>;
export interface submitCategories {
  UserId: string | null;
  UserType: string | null;
  Categorylist: Categorylist;
}

//--> SME sign up interface
export interface smeSignupSectionOne {
  email: string;
  userType: number;
  password: string;
  address: string;
  company: {
    name: string;
    CompanyType: number;
  };
}

export interface smeSignupSectionTwo {
  email: string;
  userType: number;
  password: string;
  address: string;
  phone: string;
  company: {
    name: string;
    CompanyType: number;
    ContactFirstName: string;
    ContactLastName: string;
    ContactEmail: string;
    ContactPhone: string;
  };
}
export interface lawyerPayload {
  firstName?: string;
  lastName?: string;
  email: string;
  userType: number;
  address: string;
  SuppremeCourtNumber?: string;
  companyName?: string;
  officeaddress?: string;
}

export interface lawyerRegister extends lawyerPayload {
  password: string;
  phone: string;
  dob: string;
}

export interface DocUploadUserInfo {
  fileName: string;
  fileType: number;
  isfor: string;
  contentType: string;
  userID: number;
  Section?: string;
  HistoryID?: Number;
}

export interface confirmLawyerResume {
  fileName: string;
  fileType: number;
  userID: number;
  uploadID: number;
}

export interface Lawyerdata {
  address: string;
  avatar: any;
  categoryName: string;
  name: string;
  serviceProviderID: number;
}
