"use client";

import { SubmitEvent, useState } from "react";

const AZURE_HELLO_URL = "https://spring-function-example-handson.azurewebsites.net/api/hello";

export default function Home() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendGreeting(event: SubmitEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setGreeting(null);

    try {
      const query = name ? `?name=${encodeURIComponent(name)}` : "";
      const response = await fetch(`${AZURE_HELLO_URL}${query}`);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const text = await response.text();
      setGreeting(text || "Hello from Azure function!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12 text-slate-900">
      <main className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-200">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Azure Function Demo</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-800">Hello API request</h1>
          <p className="mt-2 text-slate-600">
            Send a request to the Azure function and get a greeting message back.
          </p>
        </div>

        <form onSubmit={sendGreeting} className="space-y-4">
          <label className="block text-sm font-medium text-slate-700" htmlFor="name">
            Your name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name (optional)"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-blue-300 transition focus:ring-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loading ? "Sending..." : "Send Greeting"}
          </button>
        </form>

        {greeting ? (
          <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-3 text-green-800">
            <p className="font-semibold">Response from Azure function:</p>
            <p className="mt-1">{greeting}</p>
          </div>
        ) : null}

        {error ? (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-red-800">
            <p className="font-semibold">Error</p>
            <p className="mt-1">{error}</p>
          </div>
        ) : null}

        <div className="mt-5 text-xs text-slate-500">
          Endpoint: <code className="rounded bg-slate-100 px-1 py-0.5">{AZURE_HELLO_URL}</code>
        </div>
      </main>
    </div>
  );
}
