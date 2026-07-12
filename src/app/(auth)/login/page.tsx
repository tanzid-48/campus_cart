import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Log in — CampusCart",
};

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
