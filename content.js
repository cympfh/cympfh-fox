function extractCleanUrl() {
  const url = location.href;
  const nicoMatch = url.match(/https:\/\/www\.nicovideo\.jp\/watch\/([^/?#]+)/);
  if (nicoMatch) return `https://www.nicovideo.jp/watch/${nicoMatch[1]}`;
  const biliMatch = url.match(/https:\/\/www\.bilibili\.com\/video\/([^/?#]+)/);
  if (biliMatch) return `https://www.bilibili.com/video/${biliMatch[1]}`;
  return url;
}

function createButton() {
  const btn = document.createElement("button");
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
  document.body.appendChild(btn);
}
if (document.body) createButton();
else document.addEventListener("DOMContentLoaded", createButton);
