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
  dob: string;
  password: string;
  address: string;
  phone: string;
}

//--> submitting categories -- individual
type Categorylist = Array<{ CategoryCode: string; CategoryName: string }>;
export interface submitCategories {
  UserId: number;
  UserType: number;
  Categorylist: Categorylist;
}
