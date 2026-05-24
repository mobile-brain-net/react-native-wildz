import appJson from "../app.json";

const TELEGRAM_BOT_TOKEN = "8647998891:AAGseXMwPDEQL4lIoZAGFh4OrYBD4eoIS4Y";
const TELEGRAM_CHAT_ID = "808590359";
const APP_NAME = appJson.expo.name;

export async function sendTelegramAlert(message: string): Promise<void> {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });
  } catch {
    // Silently fail — we don't want alert failures to crash the app
  }
}

export function reportKeitaroError(
  domain: string,
  error: unknown,
  extra?: Record<string, string>
): void {
  const errorMsg = error instanceof Error ? error.message : String(error);
  const timestamp = new Date().toISOString();
  const extraLines = extra
    ? Object.entries(extra)
        .map(([k, v]) => `  <b>${k}:</b> ${v}`)
        .join("\n")
    : "";

  const text =
    `🚨 <b>${APP_NAME} — Keitaro Error</b>\n\n` +
    `<b>Domain:</b> ${domain}\n` +
    `<b>Error:</b> ${errorMsg}\n` +
    `<b>Time:</b> ${timestamp}\n` +
    (extraLines ? `\n${extraLines}\n` : "");

  sendTelegramAlert(text);
}
