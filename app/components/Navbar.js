"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.push("/login");
    });
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          OPETEY
        </h1>
        <div className="space-x-4">
          <a
            href="/dashboard"
            className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Dashboard
          </a>
          {session && (
            <>
              <button
                onClick={handleLogout}
                className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
