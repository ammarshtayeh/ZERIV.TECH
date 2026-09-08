import { redirect } from "next/navigation";

/** Legacy portfolio route — permanently redirected to Work. */
export default function PortfolioRedirect() {
  redirect("/work");
}
