let APP_DATA = {
  tabs: [],
  workflows: []
};

async function loadTab(tabId) {
  renderTabs(APP_DATA.tabs, tabId);

  if (tabId === "workflows") {
    renderWorkflowCards(APP_DATA.workflows);
    return;
  }

  if (tabId === "tools") {
    renderPlaceholder("Tools");
    return;
  }

  if (tabId === "parts") {
    renderPlaceholder("Parts");
    return;
  }

  renderPlaceholder("Section");
}
