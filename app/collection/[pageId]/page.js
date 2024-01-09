import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Pagination from "@components/Pagination";
import Collection from "../components/Collection";

import { convertCookieObjArrayToString } from "@utils/helper";
import { fetchDataWithCookieInServer, COLLECTION_LIST_PATH } from "@utils/api";

import classes from "../page.module.scss";

function isPositiveInteger(value) {
  return /^[1-9]\d*$/.test(String(value));
}

export default async function Page({ params: { pageId } }) {
  //
  const cookieStore = cookies();

  const udnmember = cookieStore.get("udnmember");
  const udngold = cookieStore.get("udngold");
  const udnland = cookieStore.get("udnland");
  const um2 = cookieStore.get("um2");

  const cookieString = convertCookieObjArrayToString([
    udngold,
    udnland,
    um2,
    udnmember,
  ]);

  const limit = 15;

  const collectionState = await fetchDataWithCookieInServer(
    `${COLLECTION_LIST_PATH}?channel_id=1005&limit=${limit}&page=${pageId}`,
    cookieString
  );
  const { lists, totalpage, ...othersState } = collectionState;
  console.log("collectionState: ", { ...othersState });

  if (!isPositiveInteger(pageId) || pageId > totalpage) {
    redirect("/collection/1");
  }

  const collectionList = lists || [];
  //console.log("collectionList: ", collectionList);

  return (
    <>
      <section className={classes["collection-list__container"]}>
        {collectionList.map((collection, index) => (
          <Collection key={index} data={collection} />
        ))}
      </section>
      <Pagination total={totalpage}></Pagination>
    </>
  );
}
