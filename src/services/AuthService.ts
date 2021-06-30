import axiosClient from "utils/axiosClient";
import {PLToast} from "components/PLToast/index.component";

///---> LOOK INTO THIS LATER
//   const Login = async () => {
//     setIsLoading(true);
//     const payload = {
//       email: email,
//       password: password,
//     };

//     try {
//       const { data } = await axiosClient.post("User/Login", payload);
//       // navigation.navigate(ROUTES.AUTH_LOGIN_CATEGORY_SELECTOR)
//       console.log(data);
//       setIsLoading(false);
//     } catch (error) {
//       setIsLoading(false);
//       const { message } = error?.response.data;
//       PLToast({ message: message, type: "error" });
//     }
//   };

//   const resetPassword = () => {

//   }
