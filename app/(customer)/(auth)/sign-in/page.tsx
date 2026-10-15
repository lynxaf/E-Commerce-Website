'use client'
import { signIn } from "../lib/actions";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
const initialFormState = {
  error: "",
};


function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[#0d5cd7] px-5 text-sm font-bold text-white shadow-[0_12px_24px_rgba(13,92,215,0.2)] transition hover:bg-[#0a4eBA] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Signing in..." : "Sign In to My Account"}
    </button>
  );
}

export default function Page() {
  const [state, formAction] = useFormState(signIn, initialFormState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#eef3fa] px-4 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_80px_rgba(21,50,92,0.12)] lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative hidden overflow-hidden bg-[#0d5cd7] p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[28px] border-white/10" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border-[36px] border-[#ffc736]/30" />
          <img
            src="/assets/banners/auth-featured-laptop.png"
            alt="Featured laptop"
            className="absolute inset-x-0 bottom-16 h-56 w-full object-contain opacity-90"
          />
          <div className="relative">
            <img src="/assets/logos/logo.svg" alt="" className="h-8 w-auto" />
            <p className="mt-24 max-w-sm text-4xl font-bold leading-tight">Your next favorite find is waiting.</p>
            <p className="mt-5 max-w-xs text-sm leading-6 text-blue-100">Sign in to keep your wishlist, orders, and personalized picks close at hand.</p>
          </div>
          <p className="relative text-xs font-medium uppercase tracking-[0.2em] text-blue-100">Curated for everyday living</p>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-12">
          <form action={formAction} className="flex w-full max-w-md flex-col gap-5">
            <div className="mb-2 lg:hidden">
              <img src="/assets/logos/logo-black.svg" alt="Store logo" className="h-8 w-auto" />
            </div>
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0d5cd7]">Welcome back</p>
              <h1 className="text-3xl font-bold tracking-tight text-[#172033]">Sign in to your account</h1>
              <p className="mt-2 text-sm text-[#687386]">Enter your details to continue shopping.</p>
            </div>

            {state.error !== "" && (
              <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {state.error}
              </div>
            )}

            <label className="flex min-h-14 items-center gap-3 rounded-xl border border-[#dce2eb] px-4 transition focus-within:border-[#0d5cd7] focus-within:ring-4 focus-within:ring-[#0d5cd7]/10">
              <img src="/assets/icons/sms.svg" alt="" className="h-5 w-5" />
              <span className="sr-only">Email address</span>
              <input type="email" id="email" name="email" required autoComplete="email" className="w-full bg-transparent text-sm font-medium text-[#172033] outline-none placeholder:text-[#8b95a5]" placeholder="Email address" />
            </label>
            <div>
              <label className="flex min-h-14 items-center gap-3 rounded-xl border border-[#dce2eb] px-4 transition focus-within:border-[#0d5cd7] focus-within:ring-4 focus-within:ring-[#0d5cd7]/10">
                <img src="/assets/icons/lock.svg" alt="" className="h-5 w-5" />
                <span className="sr-only">Password</span>
                <input type={showPassword ? "text" : "password"} id="password" name="password" required autoComplete="current-password" className="w-full bg-transparent text-sm font-medium text-[#172033] outline-none placeholder:text-[#8b95a5]" placeholder="Password" />
                <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className="shrink-0 opacity-60 transition hover:opacity-100">
                  <img src="/assets/icons/eye.svg" alt="" className="h-5 w-5" />
                </button>
              </label>
              <Link href="/" className="mt-2 block text-right text-xs font-semibold text-[#0d5cd7] hover:underline">Forgot password?</Link>
            </div>
            <SubmitButton />
            <p className="text-center text-sm text-[#687386]">New here? <Link href="/sign-up" className="font-bold text-[#0d5cd7] hover:underline">Create an account</Link></p>
          </form>
        </section>
      </div>
    </main>
  )
}
