import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json } from "@remix-run/node";
import { RemixServer, Meta, Links, Outlet, ScrollRestoration, Scripts, LiveReload, useLoaderData } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {}),
      /* @__PURE__ */ jsx(LiveReload, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
function ChatMessage({ message }) {
  const isAI = message.role === "assistant";
  return /* @__PURE__ */ jsx("div", { className: `flex ${isAI ? "justify-start" : "justify-end"}`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[80%] rounded-lg p-4 ${isAI ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100" : "bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100"}`, children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base", children: message.content }),
    /* @__PURE__ */ jsx("span", { className: "text-xs opacity-75 mt-1 block", children: message.timestamp.toLocaleTimeString() })
  ] }) });
}
function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex gap-2", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: message,
        onChange: (e) => setMessage(e.target.value),
        placeholder: "Type your message...",
        className: "flex-1 rounded-lg border border-gray-300 dark:border-gray-600 p-2 \n          bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        className: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg \n          transition-colors duration-200",
        children: "Send"
      }
    )
  ] });
}
function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI Life Coach. How can I help you today?",
      timestamp: /* @__PURE__ */ new Date()
    }
  ]);
  const handleSendMessage = async (content) => {
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: /* @__PURE__ */ new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateAIResponse(),
        timestamp: /* @__PURE__ */ new Date()
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1e3);
  };
  return /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 min-h-[500px] flex flex-col", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto space-y-4 mb-4", children: messages.map((message) => /* @__PURE__ */ jsx(ChatMessage, { message }, message.id)) }),
    /* @__PURE__ */ jsx(ChatInput, { onSendMessage: handleSendMessage })
  ] }) });
}
function generateAIResponse(userMessage) {
  const responses = [
    "I understand how you feel. Let's work through this together.",
    "That's a great question. Here's what I think...",
    "I hear you. Have you considered looking at it from this perspective?",
    "You're making progress! Let's break this down into smaller steps.",
    "It's normal to feel this way. Let's explore some strategies that might help."
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}
function WelcomeHero({ title }) {
  return /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-900 py-16 sm:py-24", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl", children: title }),
    /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300", children: "Your personal AI companion for guidance, support, and motivation. Here to help you navigate life's challenges and achieve your goals." })
  ] }) }) });
}
const loader = async () => {
  return json({
    title: "AI Life Coach - Your Personal Guide to Success"
  });
};
function Index() {
  const data = useLoaderData();
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800", children: [
    /* @__PURE__ */ jsx(WelcomeHero, { title: data.title }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsx(ChatInterface, {}) })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CtUl-gPl.js", "imports": ["/assets/components-Dcz7_8s9.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-D13DKSml.js", "imports": ["/assets/components-Dcz7_8s9.js"], "css": ["/assets/root-DKhmstLj.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-BaD-xuPk.js", "imports": ["/assets/components-Dcz7_8s9.js"], "css": [] } }, "url": "/assets/manifest-f662530f.js", "version": "f662530f" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
