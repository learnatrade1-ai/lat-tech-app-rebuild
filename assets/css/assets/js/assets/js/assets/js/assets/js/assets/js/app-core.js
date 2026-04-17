document.addEventListener("DOMContentLoaded", async () => {
  try {
    APP_DATA.tabs = await loadJSON("data/app/tabs.json");
    APP_DATA.workflows = await loadJSON("data/workflows/fountain.json");
    loadTab("workflows");
  } catch (error) {
    const app = document.getElementById("app");
    app.innerHTML = `
      <section class="card">
        <h3>App Load Error</h3>
        <p>${error.message}</p>
      </section>
    `;
    console.error(error);
  }
});
