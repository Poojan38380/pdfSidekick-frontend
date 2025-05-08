import { MessageCircle, Search, BookOpen } from "lucide-react";
import { FileSearch } from "lucide-react";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const features = [
  {
    title: "Intelligent PDF Upload",
    description:
      "Upload and process any PDF document instantly. Our system handles academic papers, contracts, manuals and more.",
    icon: FileSearch,
  },
  {
    title: "Natural Language Questions",
    description:
      "Ask questions about your documents in plain English. No complex queries or syntax required.",
    icon: Search,
  },
  {
    title: "Contextual Answers",
    description:
      "Get precise answers with context, not just keyword searches. Follow-up questions maintain conversational context.",
    icon: MessageCircle,
  },
  {
    title: "Citation & Sources",
    description:
      "All answers include page numbers and sections so you know exactly where information comes from.",
    icon: BookOpen,
  },
];

const FeatureSection = () => {
  return (
    <section className="py-20 bg-muted/50" id="features">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Features that make document analysis simple
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Stop wasting hours searching through documents. PDF Sidekick helps
              you instantly find what you are looking for.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 mt-12">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-card border shadow-sm">
              <CardHeader>
                <feature.icon className="h-8 w-8 text-primary" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
