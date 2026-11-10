(function () {
  "use strict";
  const KEY = "odraz_dovednosti_v1";
  const glyphs = ["•ア", "7i_", "°&", "`ii´", "j’", "i’", "¿", ",!,", ",_.", "7/°", "7/•", "7/˚", "˚&", "'i'"];

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || { notes: "" }; }
    catch { return { notes: "" }; }
  }
  function save(d) {
    d.t = Date.now();
    localStorage.setItem(KEY, JSON.stringify(d));
  }
  function wall() {
    const el = document.getElementById("wall");
    if (!el) return;
    el.innerHTML = "";
    const n = 16 + Math.floor(Math.random() * 10);
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      s.className = "glyph";
      s.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      el.appendChild(s);
    }
  }
  function init() {
    const data = load();
    const notes = document.getElementById("notes");
    if (notes) notes.value = data.notes || "";
    document.getElementById("save")?.addEventListener("click", () => {
      const d = load();
      d.notes = notes.value;
      save(d);
      document.getElementById("status").textContent = "uloženo · " + new Date().toLocaleTimeString("cs-CZ");
    });
    wall();
    setInterval(wall, 14000);
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();
})();
