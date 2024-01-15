import { getData, FOOTER } from "@utils/api";

export default async function Footer() {
  let data = null;
  try {
    //方法一
    //const { data } = await getData(FOOTER);

    //方法二
    const res = await fetch(FOOTER);
    data = await res.json();

    //console.log("data.footer", data.footer);
  } catch (error) {
    //
    console.error("Fetch error:", error);
  }

  return (
    <>
      {data ? (
        <div
          dangerouslySetInnerHTML={{ __html: data.footer }}
          className="footer_wrapper"
        />
      ) : (
        <div className="footer_wrapper">no data</div>
      )}
    </>
  );
}
