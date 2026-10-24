import React, { useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { ImageUp, Loader2 } from "lucide-react";

const MAX_BYTES = 10 * 1024 * 1024;

export default function ImportFromScreenshot({ onImported }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleFile = async (file) => {
    if (!file) return;
    setError("");
    setMessage("");

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("That image is too large — please choose one under 10 MB.");
      return;
    }

    setBusy(true);
    try {
      const { file_uri } = await base44.integrations.Core.UploadPrivateFile({ file });
      const response = await base44.functions.invoke("importCycleScreenshot", {
        file_uri,
      });
      const days = response?.data?.days || [];

      if (!days.length) {
        setError(
          "We couldn't spot any period days in that screenshot. Try a clearer one."
        );
      } else {
        const added = onImported(days);
        setMessage(
          added
            ? `${added} day${added === 1 ? "" : "s"} added — check them below, then save.`
            : "Those days are already on your calendar."
        );
      }
    } catch (e) {
      setError("Couldn't read that screenshot. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pomegranate-100 text-pomegranate-600">
          <ImageUp className="h-5 w-5" />
        </div>
        <div className="min-w-[12rem] flex-1">
          <h2 className="font-heading text-lg font-semibold text-slate-800">
            Import from a screenshot
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Already tracking elsewhere? Upload a screenshot of your other app's
            calendar and we'll mark those days for you.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="rounded-full border-pomegranate-200 px-5 text-pomegranate-600 hover:bg-pomegranate-50"
        >
          {busy ? (
            <>
              <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              Reading screenshot…
            </>
          ) : (
            "Choose screenshot"
          )}
        </Button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          handleFile(file);
        }}
      />

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      {message && (
        <p className="mt-3 text-sm text-pomegranate-700">{message}</p>
      )}
    </div>
  );
}