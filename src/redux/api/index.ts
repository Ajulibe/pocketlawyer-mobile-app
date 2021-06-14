import axiosClient from "utils/axiosClient";

export async function getUser({ userID }: any): Promise<any> {
  console.log(userID, "main function");
  try {
    const { data } = await axiosClient.get(
      `user/GetUserDetails?UserID=${userID}`
    );
    return data;
  } catch (error) {
    return error;
  }
}
