import { redirect } from "next/navigation";
import { BASE_PATH } from "@/utils/api";

export default function Page() {
  redirect(BASE_PATH + "/collection/1");
  return null;
}
