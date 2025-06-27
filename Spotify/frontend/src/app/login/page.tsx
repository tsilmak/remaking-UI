import Login from "@/components/auth/Login";
export default function LoginPage() {
  return (
    <main
      className="flex flex-col h-screen justify-between"
      style={{
        background:
          "linear-gradient(rgba(255, 255, 255, 0.1) 0%, rgb(0, 0, 0) 100%)",
      }}
    >
      {/* Main Login component  */}
      <Login />

      {/* Bottom page reCAPTCHA privacy warnings  */}
      <div className="mt-auto bg-[#121212] text-center text-[#aeaca4] text-xs flex items-center justify-center h-20">
        <p>
          Este site é protegido por reCAPTCHA. Aplicam-se a{" "}
          <span className="underline">Política de Privacidade</span> e os{" "}
          <span className="underline">Termos do Serviço da Google</span>.
        </p>
      </div>
    </main>
  );
}
