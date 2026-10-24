import React, { useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Images, Loader2 } from "lucide-react";

const MAX_BYTES = 10 * 1024 * 1024;

export default function ImportFromScreenshot({ onImported }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [readCount, setReadCount] = useState(0);

  const handleFiles = async (files) => {
    const list = Array.from(files || []);
    if (!list.length) return;
    setError("");
    setMessage("");

    if (list.some((file) => !file.type.startsWith("image/"))) {
      setError("Please choose image files.");
      return;
    }
    if (list.some((file) => file.size > MAX_BYTES)) {
      setError("Each image needs to be under 10 MB.");
      return;
    }

    setBusy(true);
    setProgress({ done: 0, total: list.length });

    let imported = 0;
    let read = 0;
    let failed = 0;

    for (let i = 0; i < list.length; i += 1) {
      setProgress({ done: i, total: list.length });
      try {
        const { file_uri } = await base44.integrations.Core.UploadPrivateFile({
          file: list[i],
        });
        const response = await base44.functions.invoke("importCycleScreenshot", {
          file_uri,
        });
        const days = response?.data?.days || [];
        if (days.length) read += 1;
        imported += onImported(days);
      } catch (e) {
        failed += 1;
      }
    }

    setProgress({ done: list.length, total: list.length });
    setBusy(false);
    setReadCount((prev) => prev + read);

    const failedNote = failed
      ? ` ${failed} couldn't be read.`
      : "";

    if (failed === list.length) {
      setError("We couldn't read those screenshots. Please try again.");
    } else if (!imported) {
      setMessage(
        `No new period days found in ${list.length === 1 ? "that screenshot" : "those screenshots"}.${failedNote}`
      );
    } else {
      setMessage(
        `${imported} day${imported === 1 ? "" : "s"} added — check them below, then save.${failedNote}`
      );
    }
  };

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pomegranate-100 text-pomegranate-600">
          <Images className="h-5 w-5" />
        </div>
        <div className="min-w-[12rem] flex-1">
          <h2 className="font-heading text-lg font-semibold text-slate-800">
            Import from screenshots
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Already tracking elsewhere? Upload as many screenshots of your other
            app's calendar as you like and we'll mark those days for you.
          </p>
          {readCount > 0 && (
            <p className="mt-2 text-xs uppercase tracking-wider text-pomegranate-400">
              {readCount} screenshot{readCount === 1 ? "" : "s"} read
            </p>
          )}
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
              Reading {Math.min(progress.done + 1, progress.total)} of{" "}
              {progress.total}…
            </>
          ) : readCount > 0 ? (
            "Add more screenshots"
          ) : (
            "Choose screenshots"
          )}
        </Button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = e.target.files;
          e.target.value = "";
          handleFiles(files);
        }}
      />

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      {message && (
        <p className="mt-3 text-sm text-pomegranate-700">{message}</p>
      )}
    </div>
  );
}