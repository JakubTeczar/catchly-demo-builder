import React from "react";
import "./MainContent.scss";
import SalesPopup from "../SalesPopup/SalesPopup.jsx";
import NewsletterPopup from "../NewsletterPopup/NewsletterPopup.jsx";
import LimitedOfferPopup from "../LimitedOfferPopup/LimitedOfferPopup.jsx";

function MainContent({
  iframeSrc,
  showSalesPopup,
  showNewsletterPopup,
  showLimitedPopup,
  onDismissSales,
  onCloseNewsletter,
  onCloseLimited,
  onNewsletterSubmit,
  salesConfig,
  newsletterConfig,
  limitedConfig,
}) {
  return (
    <main className="main-content">
      <iframe
        src={iframeSrc}
        frameBorder="0"
        allow="fullscreen"
        title="Demo Website"
      />

      <SalesPopup
        visible={showSalesPopup}
        onDismiss={onDismissSales}
        config={salesConfig}
      />

      <NewsletterPopup
        visible={showNewsletterPopup}
        onClose={onCloseNewsletter}
        onSubmit={onNewsletterSubmit}
        config={newsletterConfig}
      />

      <LimitedOfferPopup
        visible={showLimitedPopup}
        onClose={onCloseLimited}
        config={limitedConfig}
      />
    </main>
  );
}

export default MainContent;


