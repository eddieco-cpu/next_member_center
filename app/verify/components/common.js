import { postForm, PHONE_CODE_RESEND, PHONE_RESEND } from "@utils/api";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

export async function resendCode(
  mobile,
  setIsLoading,
  getRecaptcha,
  isActivate = true
) {
  //
  setIsLoading(true);

  const g_token = await getRecaptcha();
  const formData = {
    site: "health",
    mobile,
    g_token,
  };

  let postUrl = isActivate ? PHONE_CODE_RESEND : PHONE_RESEND;
  const { data } = await postForm(basePath + postUrl, formData);

  if (data.status === "200") {
    return HealthModal.alert({
      title: "重寄驗證碼",
      text: `已送出驗證碼至 ${mobile}`,
      options: {
        maskCallback: true,
        closeCallback: true,
      },
      callback: () => {
        setIsLoading(false);
      },
    });
  } else {
    return HealthModal.alert({
      title: data.status,
      text: data.message,
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
