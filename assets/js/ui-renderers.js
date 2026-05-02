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
    card.style.cursor = "pointer";

    if (canAccess(workflow)) {
      card.innerHTML = `
        <h3>${workflow.title}</h3>
        <p>${workflow.summary}</p>
      `;

      card.addEventListener("click", () =>
        renderWorkflowDecisionStep(workflow, workflow.startStep)
      );
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

function renderListSection(title, items) {
  if (!items || !items.length) return "";

  const list = items.map(item => `<li>${item}</li>`).join("");

  return `
    <section class="card">
      <h3>${title}</h3>
      <ul>${list}</ul>
    </section>
  `;
}
function renderImageSection(title, images) {
  if (!images || !images.length) return "";

  const imageCards = images.map(image => `
    <div class="image-card">
      <strong>${image.title}</strong>
      <img src="${image.src}" alt="${image.title}" class="workflow-image">
    </div>
  `).join("");

  return `
    <section class="card">
      <h3>${title}</h3>
      ${imageCards}
    </section>
  `;
}

function renderWorkflowDecisionStep(workflow, stepId) {
  const app = document.getElementById("app");
  const step = workflow.steps.find((item) => item.id === stepId);

  if (!step) {
    app.innerHTML = `
      <button class="back-button" onclick="loadTab('workflows')">← Back to Workflows</button>
      <section class="card">
        <h3>Workflow Error</h3>
        <p>Step not found: ${stepId}</p>
      </section>
    `;
    return;
  }

  const toolsHTML = renderListSection("Related Tools", step.relatedTools);
  const partsHTML = renderListSection("Related Parts", step.relatedParts);
  const imagesHTML = renderImageSection("Reference Images", step.relatedImages);

  if (step.type === "action") {
    app.innerHTML = `
      <button class="back-button" onclick="loadTab('workflows')">← Back to Workflows</button>

      <section class="card">
        <h3>${workflow.title}</h3>
        <p>${workflow.summary}</p>
      </section>

      <section class="card">
        <h3>${step.title}</h3>
        <p>${step.text}</p>
      </section>

      ${toolsHTML}
      ${partsHTML}
      ${imagesHTML}
    `;
    return;
  }

  app.innerHTML = `
    <button class="back-button" onclick="loadTab('workflows')">← Back to Workflows</button>

    <section class="card">
      <h3>${workflow.title}</h3>
      <p>${workflow.summary}</p>
    </section>

    <section class="card">
      <h3>${step.title}</h3>
      <p>${step.text}</p>

      <div class="decision-buttons">
        <button onclick="renderWorkflowDecisionStepByObject('${workflow.id}', '${step.yes}')">YES</button>
        <button onclick="renderNoAction('${workflow.id}', '${step.id}')">NO</button>
      </div>
    </section>

    ${toolsHTML}
    ${partsHTML}
    ${imagesHTML}
  `;
}

function renderWorkflowDecisionStepByObject(workflowId, stepId) {
  const workflow = APP_DATA.workflows.find(item => item.id === workflowId);
  renderWorkflowDecisionStep(workflow, stepId);
}

function renderNoAction(workflowId, stepId) {
  const workflow = APP_DATA.workflows.find(item => item.id === workflowId);
  const step = workflow.steps.find(item => item.id === stepId);

  const app = document.getElementById("app");

  app.innerHTML = `
    <button class="back-button" onclick="renderWorkflowDecisionStepByObject('${workflow.id}', '${step.id}')">← Back to Question</button>

    <section class="card">
      <h3>Recommended Action</h3>
      <p>${step.noAction}</p>
    </section>

    ${renderListSection("Related Tools", step.relatedTools)}
    ${renderListSection("Related Parts", step.relatedParts)}
    ${renderImageSection("Reference Images", step.relatedImages)}
  `;
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
