import type { Metadata } from "next";
import RegisterForm from "@/components/forms/RegisterForm";

export const metadata: Metadata = {
  title: "Sign up — CampusCart",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
