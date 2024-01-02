import Image from "next/image";
import { cookies } from "next/headers";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";
//import classes from "./page.module.scss";

import {convertCookieObjArrayToString} from "@utils/helper";
import {fetchDataWithCookieInServer, TRACK_STATE} from "@utils/api";

//import Avater from "./components/Avater";

async function fetchData(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export default async function Page({ params }) {
  //
  const data = await fetchData(`http://localhost:3006/api/track/expert?author_id=${params.track_id}&per_page=6`);
  console.log("data: ", data);

  //
  return (
    <main className="page_body">
      <Container className={` small`}>
        <PageTitle>{ params.track_id }</PageTitle>
      </Container>
      <PageDevName>track</PageDevName>
    </main>
  );
}
