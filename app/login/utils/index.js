import { redirectHandler } from "@utils/helper";

export async function proceedToLoginWithTeachify(data) {
  try {
    const teachifyToken = await teachifyLogin(data);

    console.log("data", data);
    console.log("teachifyToken", teachifyToken);

    const nextPage = decodeURIComponent(parse(search)?.redirect);
    if (!nextPage.toString().includes("/course/"))
      return redirectHandler(parse(search).redirect);

    //
    const slug = nextPage.split("/").pop().split("?")[0];
    getHasAccessToCourse({
      variables: {
        subdomain: "udnhealth",
        slug,
      },
      context: {
        headers: {
          authorization: `Bearer ${teachifyToken}`,
        },
      },
    });
  } catch (e) {
    return HealthModal.alert({
      title: "登入失敗",
      text: "請稍後再試" + e.message,
      options: {
        maskCallback: true,
        closeCallback: true,
      },
      callback: () => {
        setIsLoading(false);
      },
    });
  }
}
