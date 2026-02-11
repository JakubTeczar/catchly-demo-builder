import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import demos from "../data/demos.json";

const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY || "";

function AdminPage() {
  const [searchParams] = useSearchParams();
  const key = searchParams.get("k");
  const [jsonText, setJsonText] = useState(
    JSON.stringify(demos, null, 2)
  );
  const [copyMessage, setCopyMessage] = useState("");

  const baseUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.origin;
  }, []);

  if (key !== ADMIN_KEY) {
    return (
      <div className="locked-message">
        <div className="locked-card">
          <h1>Panel administracyjny</h1>
          <p>
            Ten panel jest ukryty. Aby uzyskać dostęp, dodaj poprawny
            parametr <code>?k=…</code> do adresu URL.
          </p>
        </div>
      </div>
    );
  }

  const handleCopyLink = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage("Skopiowano do schowka");
      setTimeout(() => setCopyMessage(""), 1500);
    } catch (e) {
      console.error("Clipboard error", e);
      setCopyMessage("Nie udało się skopiować");
    }
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(jsonText);
      setCopyMessage("JSON skopiowany – wklej do src/data/demos.json");
      setTimeout(() => setCopyMessage(""), 2000);
    } catch (e) {
      console.error("Clipboard error", e);
      setCopyMessage("Nie udało się skopiować JSONa");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-inner">
        <header className="admin-header">
          <h1>Ukryty panel administracyjny</h1>
          <p>
            Podgląd dostępnych dem oraz konfiguracji JSON. Zmiany w JSON
            wprowadzasz, podmieniając zawartość pliku{" "}
            <code>src/data/demos.json</code>.
          </p>
          {copyMessage && (
            <p className="admin-copy-message">{copyMessage}</p>
          )}
        </header>

        <section className="admin-section">
          <h2>Dostępne linki demo</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Firma</th>
                <th>Slug</th>
                <th>Access ID</th>
                <th>Pełny link</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {demos.map((demo) => {
                const url = `${baseUrl}/${demo.slug}?id=${demo.accessId}`;
                return (
                  <tr key={demo.slug}>
                    <td>{demo.companyName}</td>
                    <td>
                      <code>{demo.slug}</code>
                    </td>
                    <td>
                      <code>{demo.accessId}</code>
                    </td>
                    <td className="admin-url-cell">
                      <span>{url}</span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => handleCopyLink(url)}
                      >
                        Kopiuj
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section className="admin-section">
          <h2>Konfiguracja JSON (tylko do kopiowania)</h2>
          <p className="admin-help-text">
            Możesz tutaj szybko podejrzeć i edytować konfigurację. Aby
            zmiany zadziałały na produkcie, skopiuj zawartość i wklej ją
            do pliku <code>src/data/demos.json</code> w edytorze.
          </p>
          <textarea
            className="admin-json-editor"
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            rows={20}
          />
          <div className="admin-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCopyJson}
            >
              Skopiuj JSON do schowka
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminPage;


