document.addEventListener("DOMContentLoaded", async () => {
  const app = document.getElementById("app");

  try {
    app.innerHTML = `
      <section class="card">
        <h3>Loading...</h3>
        <p>Starting LAT Technician Pro...</p>
      </section>
    `;

    APP_DATA.tabs = await loadJSON("data/app/tabs.json");
    APP_DATA.workflows = await loadJSON("data/workflows/fountain.json");

    loadTab("workflows");
  } catch (error) {
    app.innerHTML = `
      <section class="card">
        <h3>App Load Error</h3>
        <p>${error.message}</p>
      </section>
    `;
    console.error("LAT load error:", error);
  }
});
