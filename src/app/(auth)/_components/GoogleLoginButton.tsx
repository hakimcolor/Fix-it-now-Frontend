


"use client";

import { Loader2 } from "lucide-react";
import Script from "next/script";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import type { CredentialResponse } from "google-one-tap";
import { loginWithGoogle } from "../_actions/googleLogin";

const initialActionState = {
  status: "idle" as const,
};

export function GoogleLoginButton() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);

  const clientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

  const [state, loginAction, isPending] = useActionState(
    loginWithGoogle,
    initialActionState,
  );

  useEffect(() => {
    if (!scriptReady) return;
    if (!buttonRef.current) return;

    if (!clientId) {
      console.error(
        "NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured.",
      );
      return;
    }

    if (!window.google) {
      console.error(
        "Google Identity Services is not available.",
      );
      return;
    }

    // Prevent duplicate button rendering
    buttonRef.current.innerHTML = "";

    window.google.accounts.id.initialize({
      client_id: clientId,

      cancel_on_tap_outside: true,

      callback: (response:  CredentialResponse) => {
        if (!response.credential) {
          toast.error(
            "Google authentication failed. No ID token received.",
          );
          return;
        }

        startTransition(() => {
          loginAction(response.credential);
        });
      },
    });

    window.google.accounts.id.renderButton(
      buttonRef.current,
      {
        type: "standard",
        theme: "outline",
        size: "large",
        shape: "rectangular",
      },
    );
  }, [scriptReady, clientId, loginAction]);

  useEffect(() => {
    if (state.status === "error") {
      toast.error(
        state.message || "Google login failed.",
      );
    }
  }, [state]);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
        onError={() => {
          toast.error(
            "Unable to load Google Sign-In.",
          );
        }}
      />

      <div className="flex min-h-[90px] items-center justify-center">
        <div className="relative">
          <div
            ref={buttonRef}
            className={
              isPending
                ? "pointer-events-none opacity-50"
                : ""
            }
          />

          {isPending && (
            <div className="absolute inset-0 flex items-center justify-center rounded-md bg-background/70">
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Loader2 className="size-4 animate-spin" />
                Signing in...
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}