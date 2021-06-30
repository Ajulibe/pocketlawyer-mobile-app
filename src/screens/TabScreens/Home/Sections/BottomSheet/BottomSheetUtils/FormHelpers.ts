import {PLToast} from "components/PLToast/index.component";

export function validateInputs(
  FormKeys: Object,
  formData: any,
  callBack: (vData: Object, isError: boolean) => void,
  OptionalKeys?: Object,
) {
  const newData: any = {};
  let isError = false;
  Object.entries(FormKeys).map(([mkey, mValue]) => {
    let field = formData?.[mValue];

    const isOptional =
      OptionalKeys != null && OptionalKeys?.hasOwnProperty(mkey);

    const fieldEmpty =
      (field == null || field?.value == null || field?.value === "") &&
      !isOptional;

    if (fieldEmpty) {
      field = {key: mValue, error: "This field is required"};
      isError = true;
    } else {
      delete field?.error;
    }

    newData[mValue] = field;
  });
  callBack(newData, isError);
}

export function showError(msg: string) {
  PLToast({
    message: msg,
    type: "error",
  });
}

export function showSuccess(msg: string) {
  PLToast({
    message: msg,
    type: "success",
  });
}
