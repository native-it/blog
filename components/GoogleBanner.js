"use client";

import { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "./storageHelper";

export default function GoogleBanner() {
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage(
      "nativeItBlogComConsentGranted",
      false
    );
    const consentDate = getLocalStorage("nativeItBlogComConsentDate", null);

    if (consentDate) {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      if (new Date(consentDate) < oneMonthAgo) {
        setCookieConsent(null);
        return;
      }
    }

    setCookieConsent(storedCookieConsent);
  }, [setCookieConsent]);
  
  useEffect(() => {
    const newValue = cookieConsent ? "granted" : "denied";
    window.gtag("consent", "update", {
      ad_user_data: newValue,
      ad_personalization: newValue,
      ad_storage: newValue,
      analytics_storage: newValue,
    });

    setLocalStorage("nativeItBlogComConsentGranted", cookieConsent);
    setLocalStorage("nativeItBlogComConsentDate", new Date().toISOString());
  }, [cookieConsent]);
  return (
    <div
      className="consent-banner"
      id="consentBanner"
      style={{ display: cookieConsent != null ? "none" : "block" }}
    >
      <p>
        We use cookies and tracking pixels to analyze our traffic. We also share
        information about your use of our site with our social media,
        advertising and analytics partners. By continuing to use our site, you
        accept our use of cookies and tracking pixels.
      </p>
      <div className="button-container">
      <button id="acceptCookiesBtn" onClick={() => setCookieConsent(true)}>
        Accept
      </button>
      <button id="acceptCookiesBtn" onClick={() => setCookieConsent(false)}>
        Decline
      </button>
      </div>
    </div>
  );
}
