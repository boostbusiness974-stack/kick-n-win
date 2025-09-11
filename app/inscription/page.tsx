// app/inscription/page.tsx
import SignupForm from "@/components/SignupForm";

export const metadata = {
  title: "Inscription bêta",
};

export default function Page() {
  return (
    <main style={{minHeight:"100vh", display:"grid", placeItems:"center", padding:"2rem"}}>
      <div style={{maxWidth: 420, width:"100%", border:"1px solid #e5e7eb", borderRadius:12, padding:24}}>
        <h1 style={{margin:0, fontSize:24, fontWeight:700}}></h1>
        <p style={{margin:"8px 0 24px", color:"#6b7280"}}>
          
        </p>
        <SignupForm />
      </div>
    </main>
  );
}
