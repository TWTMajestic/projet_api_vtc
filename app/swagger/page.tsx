"use client";

import { useEffect } from "react";

export default function SwaggerPage() {
  useEffect(() => {
    // Charger Swagger UI dynamiquement
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js";
    script.onload = () => {
      // @ts-expect-error SwaggerUIBundle est chargé via CDN
      window.SwaggerUIBundle({
        url: "/api/swagger",
        dom_id: "#swagger-ui",
        presets: [
          // @ts-expect-error SwaggerUIBundle est chargé via CDN
          window.SwaggerUIBundle.presets.apis,
          // @ts-expect-error SwaggerUIStandalonePreset est chargé via CDN
          window.SwaggerUIStandalonePreset,
        ],
        layout: "StandaloneLayout",
        deepLinking: true,
        showExtensions: true,
        showCommonExtensions: true,
        tryItOutEnabled: true,
        requestSnippetsEnabled: true,
        persistAuthorization: true,
      });
    };
    document.body.appendChild(script);

    const standaloneScript = document.createElement("script");
    standaloneScript.src =
      "https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js";
    document.body.appendChild(standaloneScript);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
      document.body.removeChild(standaloneScript);
    };
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div id="swagger-ui" />
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
        .swagger-ui .topbar {
          display: none;
        }
        .swagger-ui .info {
          margin: 20px 0;
        }
        .swagger-ui .info .title {
          font-size: 2rem;
          color: #3b4151;
        }
        .swagger-ui .opblock-tag {
          font-size: 1.2rem;
          margin: 10px 0;
          padding: 10px;
          border-bottom: 1px solid #e0e0e0;
        }
        .swagger-ui .opblock {
          margin: 0 0 15px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .swagger-ui .opblock .opblock-summary {
          padding: 10px 15px;
        }
        .swagger-ui .opblock.opblock-get {
          border-color: #61affe;
          background: rgba(97, 175, 254, 0.1);
        }
        .swagger-ui .opblock.opblock-post {
          border-color: #49cc90;
          background: rgba(73, 204, 144, 0.1);
        }
        .swagger-ui .opblock.opblock-put {
          border-color: #fca130;
          background: rgba(252, 161, 48, 0.1);
        }
        .swagger-ui .opblock.opblock-patch {
          border-color: #50e3c2;
          background: rgba(80, 227, 194, 0.1);
        }
        .swagger-ui .opblock.opblock-delete {
          border-color: #f93e3e;
          background: rgba(249, 62, 62, 0.1);
        }
        .swagger-ui .btn {
          border-radius: 4px;
        }
        .swagger-ui .btn.execute {
          background-color: #4990e2;
        }
        .swagger-ui .btn.execute:hover {
          background-color: #357abd;
        }
        .swagger-ui section.models {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
        }
        .swagger-ui section.models h4 {
          padding: 15px 20px;
          margin: 0;
          background: #f7f7f7;
          border-radius: 8px 8px 0 0;
        }
      `}</style>
    </div>
  );
}