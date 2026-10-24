import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image } from "@/components/ui/image";
import pomiLogo from "@/assets/pomi-logo.png";
import { ArrowLeft, Apple } from "lucide-react";
import GoogleIcon from "@/components/GoogleIcon";

export default function AccountStep({ onBack, onContinue }) {
  const [name, setName] = useState("");
  const ready = name.trim().length > 0;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5 py-10">
      <div className="w-full max-w-xl">
        <div className="mb-6 flex flex-col items-center text-center">
          <Image
            src={pomiLogo}
            alt="Pomi"
            className="h-12 w-12"
            fittingType="fit"
          />
          <span className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-pomegranate-400">
            Step 3 of 3
          </span>
          <h1 className="mt-2 font-heading text-3xl font-semibold text-slate-800">
            What should we call you?
          </h1>
          <p className="mt-2 max-w-md text-sm text-slate-500">
            Your answers are saved to your account, so your tracking and your
            causes stay with you.
          </p>
        </div>

        <div className="rounded-2xl border border-pomegranate-100 bg-white p-5">
          <div className="space-y-2">
            <Label htmlFor="name">Your name</Label>
            <Input
              id="name"
              autoComplete="given-name"
              placeholder="e.g. Alex"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12"
              autoFocus
            />
          </div>

          <p className="mt-6 text-center text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
            Sign in with
          </p>

          <div className="mt-3 space-y-3">
            <Button
              variant="outline"
              disabled={!ready}
              onClick={() => onContinue(name.trim(), "google")}
              className="h-12 w-full text-sm font-medium"
            >
              <GoogleIcon className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              disabled={!ready}
              onClick={() => onContinue(name.trim(), "apple")}
              className="h-12 w-full text-sm font-medium"
            >
              <Apple className="mr-2 h-5 w-5" />
              Continue with Apple
            </Button>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={onBack}
          className="mt-6 w-full rounded-full border-pomegranate-200 text-pomegranate-600 hover:bg-pomegranate-50"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back
        </Button>
      </div>
    </div>
  );
}