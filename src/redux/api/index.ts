import axiosClient from "utils/axiosClient";

export async function getUser({ userID }: any): Promise<any> {
  try {
    const { data } = await axiosClient.get(
      `user/GetUserDetails?UserID=${userID}`
    );
    const user_ = data.data.user_;
    const metaData = data.data;
    return { user_, metaData };
  } catch (error) {
    return error;
  }
}
