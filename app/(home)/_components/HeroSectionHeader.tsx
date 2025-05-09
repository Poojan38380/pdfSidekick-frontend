"use client";

import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { Button } from "@/components/ui/button";
import { FileSearch } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const HeroSectionHeader = () => {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
        Your PDF Documents,{" "}
        <span>
          <LineShadowText className="italic" shadowColor={shadowColor}>
            Instantly
          </LineShadowText>{" "}
          <LineShadowText className="italic" shadowColor={shadowColor}>
            Answered
          </LineShadowText>
        </span>
      </h1>
      <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
        Upload your PDFs and ask questions in plain English. Get accurate
        answers in seconds without reading hundreds of pages.
      </p>
      <Link href="/dashboard">
        <Button size="lg" className="gap-2 text-xl py-6 cursor-pointer">
          <FileSearch className="h-12 w-12" />
          Upload Your First PDF
        </Button>
      </Link>
    </div>
  );
};

export default HeroSectionHeader;
