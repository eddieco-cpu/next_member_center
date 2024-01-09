import { redirect } from "next/navigation";

export default function Page() {
  redirect("/collection/1");
  return null;
}
