import type { Metadata } from "next";
import LoginForm from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Login — CampusCart",
};

export default function LoginPage() {
  return <LoginForm />;
}
