export class ServiceConstants {
  static fetchApiPostData = (body: Object) => {
    return {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
  };
}
