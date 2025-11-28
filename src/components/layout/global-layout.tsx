import { Link, Outlet } from "react-router";
import logo from "@/assets/logo.png";
import { SunIcon } from "lucide-react";
import defaultAvatar from "@/assets/default-avatar.jpg";
import ProfileButton from "./header/profile-button";
import ThemaButton from "./header/thema-button";

export default function GlobalLayout() {
  return (
    <div className="flex min-h-[100vh] flex-col">
      <header className="h-12 border-b">
        <div className="m-auto flex h-full max-w-175 justify-between px-4">
          <Link to={"/"} className="flex items-center gap-2">
            <img
              className="h-5"
              src={logo}
              alt="한입 로그의 로고, 메세지 말풍선을 형상화한 모양이다."
            />
            <div className="font-bold">Daily Log</div>
          </Link>
          <div className="flex items-center gap-5">
            <ThemaButton />
            <ProfileButton />
          </div>
        </div>
      </header>
      <main className="m-auto w-full max-w-175 flex-1 border-x px-4 py-6">
        <Outlet />
      </main>
      <footer className="text-muted-foreground border-t py-10 text-center">
        @seojinju
      </footer>
    </div>
  );
}
