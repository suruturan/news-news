"use client";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { ReactNode, useEffect, useState } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    async function initMocks() {
      if (typeof window !== 'undefined') {
        const { worker } = await import('../mocks/browser');
        await worker.start({
          onUnhandledRequest: 'bypass',
        });
        setMswReady(true);
      }
    }

    initMocks();
  }, []);

  if (!mswReady) {
    return <div>Loading...</div>;
  }

  return <Provider store={store}>{children}</Provider>;
}
