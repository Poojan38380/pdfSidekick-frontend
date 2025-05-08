import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { FileText } from "lucide-react";
import Link from "next/link";
import React from "react";

const steps = [
  {
    title: "Upload Your Document",
    description:
      "Upload any PDF document to the platform. Our system processes the content to make it searchable and analyzable.",
    icon: FileText,
  },
  {
    title: "Ask Your Question",
    description:
      "Ask any question about your document in plain English. The more specific your question, the more precise the answer.",
    icon: MessageCircle,
  },
  {
    title: "Get Instant Answers",
    description:
      "Receive accurate answers with citations to the relevant sections of your document. Follow up with more questions as needed.",
    icon: CheckCircle,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20" id="how-it-works">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Three simple steps to unlock the knowledge in your documents
            </p>
          </div>
        </div>
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white mb-5">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <div className="mt-2 text-muted-foreground">
                  {step.description}
                </div>
                {index < steps.length - 1 && (
                  <div className="mt-8 hidden h-0.5 w-16 bg-muted md:mt-0 md:block md:self-auto md:justify-self-end" />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <Link href="/dashboard">
            <Button size="lg" className="gap-2 cursor-pointer">
              Try It Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
