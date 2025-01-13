"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { WalletConnectButton } from "@/components/wallet-connect-button";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b">
      <div className="mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          PumpStarter.dao
        </Link>
        <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <Button size="sm" variant="ghost">
            <Link href="/projects" className="text-sm font-medium">
              Explore
            </Link>
          </Button>
          <Button size="sm" variant="ghost">
            <Link href="/create-project" className="text-sm font-medium">
              Create Project
            </Link>
          </Button>
          <WalletConnectButton />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}