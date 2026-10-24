import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image } from "@/components/ui/image";
import pomiLogo from "@/assets/pomi-logo.png";
import { ArrowLeft, ArrowRight, Lock, Mail } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function AccountStep({ onBack, onComplete }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await base44.auth.register({ email, password });
      setShowOtp(true);
    } catch (err) {
      setError(
        err?.message || "We couldn't create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await base44.auth.verifyOtp({ email, otpCode });
      if (result?.access_token) {
        base44.auth.setToken(result.access_token);
      }
      await onComplete();
    } catch (err) {
      setError(err?.message || "That code didn't work. Please try again.");
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    try {
      await base44.auth.resendOtp(email);
    } catch (err) {
      setError(err?.message || "We couldn't resend the code.");
    }
  };

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
            {showOtp ? "Verify your email" : "Create your account"}
          </h1>
          <p className="mt-2 max-w-md text-sm text-slate-500">
            {showOtp
              ? `We sent a 6-digit code to ${email}.`
              : "Your answers are saved to your account, so your tracking and your causes stay with you."}
          </p>
        </div>

        <div className="rounded-2xl border border-pomegranate-100 bg-white p-5">
          {showOtp ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otpCode}
                  onChange={setOtpCode}
                  autoFocus
                  autoComplete="one-time-code"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button
                onClick={handleVerify}
                disabled={loading || otpCode.length < 6}
                className="w-full rounded-full bg-pomegranate-600 py-6 text-base hover:bg-pomegranate-700"
              >
                {loading ? "Verifying…" : "Verify and continue"}
              </Button>
              <p className="text-center text-xs text-slate-500">
                Didn't get the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  className="font-medium text-pomegranate-600 hover:underline"
                >
                  Resend
                </button>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  />
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm password</Label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  />
                  <Input
                    id="confirm"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 pl-10"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-pomegranate-600 py-6 text-base hover:bg-pomegranate-700"
              >
                {loading ? "Creating your account…" : "Create account"}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          )}
        </div>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        {!showOtp && (
          <Button
            variant="outline"
            onClick={onBack}
            disabled={loading}
            className="mt-6 w-full rounded-full border-pomegranate-200 text-pomegranate-600 hover:bg-pomegranate-50"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Back
          </Button>
        )}
      </div>
    </div>
  );
}