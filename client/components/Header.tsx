import Link from "next/link";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const { data } = useSession();
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/search?q=${query}`);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="flex items-center justify-between fixed z-10 top-0 left-0 right-0 h-16 px-6 md:px-14 lg:px-48 border-b border-gray-300 bg-white">
      <div className="w-full lg:w-5/6 flex justify-between lg:justify-start lg:gap-x-6 items-center">
        <div className="logo w-12 h-9 cursor-pointer">
          <Link href="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full h-full object-cover rounded-lg"
            />
          </Link>
        </div>
        <div className="w-2/4 lg:w-5/6">
          <input
            type="text"
            placeholder="search here..."
            className="border border-slate-600 rounded-md px-4 py-2 w-full"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              handleKeyDown(e)
            }
          />
        </div>
      </div>
      <div className="w-3/6 hidden lg:flex gap-x-3 items-center justify-end">
        <img src="/facebook.png" className="w-7 h-7 cursor-pointer" />
        <img src="/discord.png" className="w-7 h-7 cursor-pointer ml-2" />
        <img src="/github.png" className="w-7 h-7 cursor-pointer ml-2" />
        {data?.user && (
          <div className="flex gap-2 ml-4 items-center font-semibold">
            <Link href="/admin">{data.user.name}</Link>
            <span
              className="cursor-pointer text-[16px] font-normal"
              onClick={() => signOut()}
            >
              Logout
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
