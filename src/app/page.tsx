import type { Metadata } from "next";
import { Experience } from "@/experience/Experience";

export const metadata: Metadata = {
  title: "ZERIV — Technology × Design × Culture",
};

export default function HomePage() {
  return <Experience />;
}
