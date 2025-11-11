"use client";

import { useEffect, useRef } from "react";

const ADSENSE_BASE_SCRIPT =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
const ADSENSE_CLIENT_ID = "ca-pub-3826573131304099";

type InArticleAdProps = {
  slotId?: string;
  className?: string;
};

const SCRIPT_LOADED_ATTR = "data-adsbygoogle-loaded";

const InArticleAd = ({ slotId = "8015069158", className }: InArticleAdProps) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const retryTimeoutRef = useRef<number | null>(null);
  const hasRequestedAdRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const adElement = adRef.current;

    if (!adElement) {
      return;
    }

    hasRequestedAdRef.current = false;
    adElement.innerHTML = "";
    adElement.removeAttribute("data-adsbygoogle-status");

    function clearRetryTimeout() {
      if (retryTimeoutRef.current) {
        window.clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    }

    function scheduleRetry(delay = 200) {
      clearRetryTimeout();
      retryTimeoutRef.current = window.setTimeout(() => {
        requestAd();
      }, delay);
    }

    function requestAd() {
      if (hasRequestedAdRef.current || !adRef.current) {
        return;
      }

      const width = adRef.current.offsetWidth;

      if (width === 0) {
        scheduleRetry();
        return;
      }

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        hasRequestedAdRef.current = true;
      } catch (error) {
        console.error("AdSense push error:", error);
        scheduleRetry(1000);
      }
    }

    const handleScriptReady = (script: HTMLScriptElement) => {
      script.setAttribute(SCRIPT_LOADED_ATTR, "true");
      requestAd();
    };

    let trackedScript: HTMLScriptElement | null = document.querySelector<
      HTMLScriptElement
    >(`script[src^="${ADSENSE_BASE_SCRIPT}"]`);

    const isScriptLoaded =
      trackedScript &&
      (trackedScript.getAttribute(SCRIPT_LOADED_ATTR) === "true" ||
        typeof window.adsbygoogle !== "undefined");

    const onScriptLoad = () => {
      if (!trackedScript) {
        return;
      }

      handleScriptReady(trackedScript);
    };

    if (isScriptLoaded) {
      requestAd();
    } else if (trackedScript) {
      trackedScript.addEventListener("load", onScriptLoad, { once: true });
    } else {
      trackedScript = document.createElement("script");
      trackedScript.src = `${ADSENSE_BASE_SCRIPT}?client=${ADSENSE_CLIENT_ID}`;
      trackedScript.async = true;
      trackedScript.crossOrigin = "anonymous";
      trackedScript.addEventListener("load", onScriptLoad, { once: true });
      document.head.appendChild(trackedScript);
    }

    const handleResize = () => {
      if (!hasRequestedAdRef.current) {
        requestAd();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearRetryTimeout();
      window.removeEventListener("resize", handleResize);
      trackedScript?.removeEventListener("load", onScriptLoad);
    };
  }, [slotId]);

  const wrapperClassName = ["flex justify-center", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClassName}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center", width: "100%" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
      />
    </div>
  );
};

export default InArticleAd;
