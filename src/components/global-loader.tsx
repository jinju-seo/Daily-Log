import logo from "@/assets/logo.png";

export default function GloabalLoader() {
  return (
    <div className="bg-muted flex h-[100vh] w-[100vw] flex-col items-center justify-center">
      <div className="flex items-center gap-3 mb-15 animate-bounce">
        <img className="w-10" src={logo} />
        <div className="text-2xl font-bold">Daily Log</div>
      </div>
    </div>
  );
}
