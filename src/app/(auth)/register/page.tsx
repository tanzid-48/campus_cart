import type { Metadata } from "next";
import { Suspense } from "react";
import RegisterForm from "@/components/forms/RegisterForm";

export const metadata: Metadata = {
  title: "Sign up — CampusCart",
};

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}
