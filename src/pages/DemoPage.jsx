import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SidebarToggle from "../components/SidebarToggle/SidebarToggle.jsx";
import Overlay from "../components/Overlay/Overlay.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import MainContent from "../components/MainContent/MainContent.jsx";
import BottomActionsBar from "../components/BottomActionsBar/BottomActionsBar.jsx";
import demosConfig from "../data/demos.json";

const DEMO_VARIANTS = [
  { id: "demo1", label: "A) Zwiększenie sprzedaży" },
  { id: "demo2", label: "B) Zapis do newslettera" },
  { id: "demo3", label: "C) Promocja czasowa" },
];

function DemoPage() {
  const { companySlug } = useParams();
  const [searchParams] = useSearchParams();
  const accessId = searchParams.get("id");

  const demoConfig = demosConfig.find(
    (demo) => demo.slug === companySlug
  );

  const isAuthorized =
    demoConfig && accessId && accessId === demoConfig.accessId;

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentDemo, setCurrentDemo] = useState("demo1");
  const [activePopup, setActivePopup] = useState("sales"); // 'sales' | 'newsletter' | 'limited' | null

  useEffect(() => {
    setIsSidebarOpen(true);
    setCurrentDemo("demo1");

    const timeoutId = setTimeout(() => {
      setActivePopup("sales");
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  if (!isAuthorized) {
    return (
      <div className="locked-message">
        <div className="locked-card">
          <h1>Brak dostępu do tego demo</h1>
          <p>
            Ten link jest przeznaczony wyłącznie dla zaproszonych
            odbiorców. Sprawdź, czy adres URL jest poprawny lub
            skontaktuj się z nami, aby otrzymać dostęp.
          </p>
        </div>
      </div>
    );
  }

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSelectDemo = (demoId) => {
    setCurrentDemo(demoId);

    switch (demoId) {
      case "demo1":
        setActivePopup("sales");
        break;
      case "demo2":
        setActivePopup("newsletter");
        break;
      case "demo3":
      default:
        setActivePopup("limited");
        break;
    }

    setIsSidebarOpen(false);
  };

  const handleDismissSales = () => {
    setActivePopup(null);
  };

  const handleCloseNewsletter = () => {
    setActivePopup(null);
  };

  const handleCloseLimited = () => {
    setActivePopup(null);
  };

  const handleBenefitsClick = () => {
    window.open("https://catchly.pl", "_blank");
  };

  const handleBookMeetingClick = () => {
    window.open("https://calendly.com/dawidklyta5565/catchly-wprowadzanie", "_blank");
  };

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    console.log("Zapisano do newslettera:", email);
    alert("Dziękujemy za zapisanie się do newslettera!");
    setActivePopup(null);
  };

  const showSalesPopup = activePopup === "sales";
  const showNewsletterPopup = activePopup === "newsletter";
  const showLimitedPopup = activePopup === "limited";

  const iframeSrc = demoConfig.iframeSrc || "https://www.wikipedia.org";

  return (
    <>
      <SidebarToggle
        isOpen={isSidebarOpen}
        onToggle={handleToggleSidebar}
      />

      <Overlay
        isVisible={isSidebarOpen}
        onClick={() => {
          if (isSidebarOpen) setIsSidebarOpen(false);
        }}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        currentDemo={currentDemo}
        demos={DEMO_VARIANTS}
        onSelectDemo={handleSelectDemo}
        companyName={demoConfig.companyName}
        sidebarMessage={demoConfig.sidebarMessage}
      />

      <MainContent
        iframeSrc={iframeSrc}
        showSalesPopup={showSalesPopup}
        showNewsletterPopup={showNewsletterPopup}
        showLimitedPopup={showLimitedPopup}
        onDismissSales={handleDismissSales}
        onCloseNewsletter={handleCloseNewsletter}
        onCloseLimited={handleCloseLimited}
        onNewsletterSubmit={handleNewsletterSubmit}
        salesConfig={demoConfig.salesPopup}
        newsletterConfig={demoConfig.newsletterPopup}
        limitedConfig={demoConfig.limitedPopup}
      />

      <BottomActionsBar
        onBenefitsClick={handleBenefitsClick}
        onBookMeetingClick={handleBookMeetingClick}
      />
    </>
  );
}

export default DemoPage;



