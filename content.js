function extractCleanUrl() {
  const url = location.href;
  const nicoMatch = url.match(/https:\/\/www\.nicovideo\.jp\/watch\/([^/?#]+)/);
  if (nicoMatch) return `https://www.nicovideo.jp/watch/${nicoMatch[1]}`;
  const biliMatch = url.match(/https:\/\/www\.bilibili\.com\/video\/([^/?#]+)/);
  if (biliMatch) return `https://www.bilibili.com/video/${biliMatch[1]}`;
  const youtubeId = youtubeVideoId(url);
  if (youtubeId) return `https://www.youtube.com/watch?v=${youtubeId}`;
  return url;
}

function youtubeVideoId(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (parsed.hostname !== "www.youtube.com" && parsed.hostname !== "m.youtube.com") {
    return null;
  }
  if (parsed.pathname === "/watch" || parsed.pathname === "/watch/") {
    const id = parsed.searchParams.get("v");
    return isYoutubeVideoId(id) ? id : null;
  }
  const shorts = parsed.pathname.match(/^\/shorts\/([^/?#]+)/);
  if (shorts && isYoutubeVideoId(shorts[1])) return shorts[1];
  return null;
}

function isYoutubeVideoId(id) {
  return typeof id === "string" && /^[A-Za-z0-9_-]+$/.test(id);
}

function isTargetPage() {
  const url = location.href;
  if (/https:\/\/www\.nicovideo\.jp\/watch\//.test(url)) return true;
  if (/https:\/\/www\.bilibili\.com\/video\//.test(url)) return true;
  return youtubeVideoId(url) !== null;
}

let btn;

function ensureButton() {
  if (!document.body) return;
  if (!btn) {
    btn = document.createElement("button");
    btn.textContent = "s.cympfh";
    btn.style.cssText = "position:fixed;bottom:20px;right:20px;z-index:999999;padding:8px 12px;background:#1a1a1a;color:#fff;border:1px solid #555;border-radius:4px;cursor:pointer;font-size:12px;";
    btn.addEventListener("click", async () => {
      const clean = extractCleanUrl();
      const target = `https://s.cympfh.cc/video?url=${encodeURIComponent(clean)}`;
      try {
        await navigator.clipboard.writeText(target);
        btn.textContent = "copied";
        setTimeout(() => btn.textContent = "s.cympfh", 1000);
      } catch {
        btn.textContent = "fail";
        setTimeout(() => btn.textContent = "s.cympfh", 1000);
      }
    });
  }
  if (!btn.isConnected) document.body.appendChild(btn);
  btn.style.display = isTargetPage() ? "" : "none";
}

function init() {
  ensureButton();
  document.addEventListener("yt-navigate-finish", ensureButton);
  window.addEventListener("yt-navigate-finish", ensureButton);
  window.addEventListener("popstate", ensureButton);
  let last = location.href;
  setInterval(() => {
    if (location.href !== last) {
      last = location.href;
      ensureButton();
    }
  }, 500);
}

if (document.body) init();
else document.addEventListener("DOMContentLoaded", init);
