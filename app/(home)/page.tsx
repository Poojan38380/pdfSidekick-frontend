import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileSearch,
  Search,
  MessageCircle,
  BookOpen,
  Book,
  FileText,
  CheckCircle,
} from "lucide-react";

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
export default function HomePage() {
  return (
    <>
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_700px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Your PDF Documents,{" "}
                  <span className="text-primary">Instantly Answered</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Upload your PDFs and ask questions in plain English. Get
                  accurate answers in seconds without reading hundreds of pages.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="gap-2">
                  <FileSearch className="h-4 w-4" />
                  Upload Your First PDF
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Try Demo
                </Button>
              </div>
              <div className="mt-6">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Book className="h-4 w-4" />
                  Works with research papers, contracts, manuals, books, and
                  more
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
                      <div className="flex-1 rounded-lg border bg-primary text-white p-3 text-sm">
                        <p>
                          Based on Section 3 of the contract, the main arguments
                          are:
                        </p>
                        <ol className="list-decimal pl-5 pt-2 space-y-1">
                          <li>
                            The non-disclosure agreement expires after 5 years
                          </li>
                          <li>
                            Intellectual property remains with the original
                            owner
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
      <section className="py-20 bg-muted/50" id="features">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Features that make document analysis simple
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Stop wasting hours searching through documents. PDF Sidekick
                helps you instantly find what you are looking for.
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
            <Button size="lg" className="gap-2">
              Try It Now
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
