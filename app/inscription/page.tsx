import Image from "next/image";

import SignupForm from "@/components/SignupForm";

export const metadata = { title: "Inscription bêta" };

export default function Page() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem" }}>
      <div style={{ maxWidth: 420, width: "100%", border: "1px solid #e5e7eb", borderRadius: 12, padding: 24 }}>
        <SignupForm />
      </div>
    </main>
  );
}
