// Google Sheets Webhook - logs page visits
const SheetsWebhook = (() => {
  // Replace with your actual Apps Script Web App URL
  const SHEET_WEBHOOK_URL = 'YOUR_APPS_SCRIPT_WEB_APP_URL';

  async function logVisit() {
    if (SHEET_WEBHOOK_URL === 'YOUR_APPS_SCRIPT_WEB_APP_URL') return; // Skip if not configured

    try {
      await fetch(SHEET_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'page_visit',
          page: window.location.pathname,
          userAgent: navigator.userAgent,
          language: navigator.language,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          timestamp: new Date().toISOString()
        })
      });
    } catch (err) {
      // Silent fail - don't break the page for analytics
    }
  }

  function init() {
    logVisit();
  }

  return { init };
})();

/*
=== Google Apps Script Code (deploy as web app) ===

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Visits");
  if (!sheet) {
    SpreadsheetApp.getActiveSpreadsheet().insertSheet("Visits");
  }
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.event || "page_visit",
    data.page || "/",
    data.userAgent || "",
    data.language || "",
    data.timezone || ""
  ]);
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", message: "Visit logger active" })
  ).setMimeType(ContentService.MimeType.JSON);
}

=== End Apps Script Code ===
*/
