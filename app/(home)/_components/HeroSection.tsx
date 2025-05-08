import React from "react";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { Button } from "@/components/ui/button";
import { FileSearch, Book } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_700px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Your PDF Documents,{" "}
                <span>
                  <LineShadowText className="italic ">Instantly</LineShadowText>
                </span>{" "}
                <LineShadowText className="italic "> Answered</LineShadowText>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Upload your PDFs and ask questions in plain English. Get
                accurate answers in seconds without reading hundreds of pages.
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="gap-2 text-xl py-6 cursor-pointer">
                  <FileSearch className="h-12 w-12" />
                  Upload Your First PDF
                </Button>
              </Link>
            </div>

            <div className="mt-6">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Book className="h-4 w-4" />
                Works with research papers, contracts, manuals, books, and more
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[550px] overflow-hidden rounded-lg border bg-background p-2 shadow-lg">
              <div className="rounded bg-muted p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <div className="ml-2 text-xs text-muted-foreground">
                    PDF Sidekick - Q&A Interface
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 rounded-lg border p-3 text-sm">
                      <p>
                        What are the main arguments in Section 3 of the
                        contract?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    <div className="flex-1 rounded-lg border bg-primary/60 text-primary-foreground p-3 text-sm">
                      <p>
                        Based on Section 3 of the contract, the main arguments
                        are:
                      </p>
                      <ol className="list-decimal pl-5 pt-2 space-y-1">
                        <li>
                          The non-disclosure agreement expires after 5 years
                        </li>
                        <li>
                          Intellectual property remains with the original owner
                        </li>
                        <li>
                          Dispute resolution must go through arbitration first
                        </li>
                      </ol>
                      <p className="mt-2 text-xs opacity-80">
                        Source: Page 12, Contract Section 3.4
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
