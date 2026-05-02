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

      card.addEventListener("click", () => renderWorkflowDecisionStep(workflow, workflow.startStep));
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
  `;
}

function renderWorkflowDecisionStepByObject(workflowId, stepId) {
  const workflow = APP_DATA.workflows.find((item) => item.id === workflowId);
  renderWorkflowDecisionStep(workflow, stepId);
}

function renderNoAction(workflowId, stepId) {
  const workflow = APP_DATA.workflows.find((item) => item.id === workflowId);
  const step = workflow.steps.find((item) => item.id === stepId);

  const app = document.getElementById("app");
  app.innerHTML = `
    <button class="back-button" onclick="renderWorkflowDecisionStepByObject('${workflow.id}', '${step.id}')">← Back to Question</button>
    <button class="back-button" onclick="loadTab('workflows')">Back to Workflows</button>

    <section class="card">
      <h3>Recommended Action</h3>
      <p>${step.noAction}</p>
    </section>
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
