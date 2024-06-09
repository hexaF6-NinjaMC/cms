import file from "./CHECKLIST.json" with { type: "json" };
const strkText = "strikethrough-";
const ls = localStorage;
const qs = (attribute) => document.querySelector(attribute);
const listen = (event, checkboxElement, chkElement, attribute, lsKey) => {
  checkboxElement.addEventListener(event, () => {
    if (chkElement.checked) {
      ls.setItem(lsKey, chkElement.checked);
      qs(attribute).style.textDecoration = "line-through";
    } else {
      ls.removeItem(lsKey);
      qs(attribute).style.textDecoration = "none";
    }
  });
};
const setStrikeThrough = (chkbxEl, lsKey, attribute) => {
  if (Boolean(ls.getItem(lsKey)) === true) {
    chkbxEl.checked = true;
    qs(attribute).style.textDecoration = "line-through";
  }
};

const todoList = qs("#todo-list");
const tasks = file.tasks;
// console.log(tasks);

tasks.forEach((task) => {
  const lsKey = `${strkText + task.label + task.tag}`;
  const attribute = `label[for="${lsKey}"]`;

  const liEl = document.createElement("li");
  liEl.setAttribute("class", "list-group-item");

  const chkbxEl = document.createElement("input");
  chkbxEl.setAttribute("type", "checkbox");
  chkbxEl.setAttribute("name", lsKey);
  chkbxEl.setAttribute("id", lsKey);
  chkbxEl.setAttribute("class", "m-reset");

  const chkbxLbl = document.createElement("label");
  chkbxLbl.textContent = task.description;
  chkbxLbl.setAttribute("class", "list-group-item-heading");
  chkbxLbl.setAttribute("for", lsKey);

  liEl.appendChild(chkbxEl);
  liEl.appendChild(chkbxLbl);

  if (task.details !== null) {
    const details = document.createElement("details");
    details.setAttribute("class", "pointer");

    const span = document.createElement("span");
    span.setAttribute("class", "caret");

    const summary = document.createElement("summary");
    summary.textContent = "More";
    summary.appendChild(span);

    const p = document.createElement("p");
    p.textContent = task.details;

    details.appendChild(summary);
    details.appendChild(p);
    liEl.appendChild(details);
  }

  todoList.appendChild(liEl);
  setStrikeThrough(chkbxEl, lsKey, attribute);
  listen("change", chkbxEl, chkbxEl, attribute, lsKey);
});
