export const INPUT_TYPES = {
  EMAIL: "email",
  PHONE: "phone",
  NAME: "name",
  PASSWORD: "password",
};

class InputValidation {
  static isFullName = (name: string) => {
    let split = name.split(" ");
    if (split.length > 1 && split[1].trim().length > 1) return true;
    else return false;
  };

  static isValidEmail = (value: string): boolean => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(value.toLowerCase())) {
      return false;
    }
    return true;
  };

  static hasWhiteSpace(s: string) {
    return /\s/g.test(s);
  }
}
export default InputValidation;
