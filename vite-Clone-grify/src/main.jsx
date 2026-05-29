import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

 
if (!clerkPubKey) {
  throw new Error("Clerk publishable key is missing. Please set VITE_CLERK_PUBLISHABLE_KEY in your .env file.");
}

createRoot(document.getElementById("root")).render(

  <ClerkProvider publishableKey={clerkPubKey}>
      <App />
  </ClerkProvider>
);


