function renderTabs(tabs, activeTabId) {
  const tabsEl = document.getElementById("tabs");
  tabsEl.innerHTML = "";

  tabs.forEach((tab) => {
    const button = document.createElement("button");
    button.textContent = tab.label;

    if (tab.id === activeTabId) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => loadTab(tab.id));
    tabsEl.appendChild(button);
  });
}

function renderWorkflowCards(workflows) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  workflows.forEach((workflow) => {
    const card = document.createElement("section");
    card.className = "card";

    if (canAccess(workflow)) {
      card.innerHTML = `
        <h3>${workflow.title}</h3>
        <p>${workflow.summary}</p>
      `;
    } else {
      card.innerHTML = `
        <h3>${workflow.title}</h3>
        <p>${workflow.summary}</p>
        <span class="lock-note">🔒 Available in Pro</span>
      `;
    }

    app.appendChild(card);
  });
}

function renderPlaceholder(title) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section class="card">
      <h3>${title}</h3>
      <p>This section is coming next in the rebuild.</p>
    </section>
  `;
}
