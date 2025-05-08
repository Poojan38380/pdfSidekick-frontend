"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ThemeToggleButton } from "@/components/theme/ThemeSelectorButton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { status } = useSession();

  // Optimize scroll handler with useCallback
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as HTMLElement).closest("header")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isMenuOpen]);

  //NOTE: This is a navigation item for the header.
  const navItems: { name: string; href: string }[] = [
    // { name: "Products", href: "/products" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-md ${
        isScrolled ? "bg-card/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className=" w-full px-2 h-16 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-baseline gap-1">
            <div className="md:hidden flex items-center space-x-2"></div>
            <Link
              href="/"
              className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
            >
              <Image
                src="/logo-1500x300.png"
                alt="PDF Sidekick Logo"
                width={150}
                height={30}
              />
            </Link>

            {/* Desktop Navigation */}
            {navItems && (
              <nav className="hidden md:flex items-start space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            )}
          </div>
          {/* Desktop Right Section */}
          <div className="flex items-center space-x-2 ml-2 max-725:hidden ">
            {status === "authenticated" ? (
              <section className="flex items-center space-x-2">
                <Link href="/dashboard">
                  <Button className="px-4 py-1 cursor-pointer ">
                    Dashboard
                  </Button>
                </Link>
              </section>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/login">
                  <Button className="px-4 py-1 cursor-pointer ">Login</Button>
                </Link>
              </div>
            )}

            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
