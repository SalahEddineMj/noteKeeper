"use strict";
import {
  addEventOnElements,
  getGreetingMsg,
  activeNotebook,
  makeElementEditable,
} from "./utils.js";
import { Tooltip } from "./components/Tooltip.js";
import { db } from "./db.js";
import { client } from "./client.js";
import { noteModal } from "./components/Modal.js";

const sidebar = document.querySelector("[data-sidebar]");
const sidebarTogglers = document.querySelectorAll("[data-sidebar-toggler]");
const overlay = document.querySelector("[data-sidebar-overlay]");

addEventOnElements(sidebarTogglers, "click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

const tooltipElements = document.querySelectorAll("[data-tooltip]");
tooltipElements.forEach((element) => Tooltip(element));

const greetingElement = document.querySelector("[data-greeting]");
const currentHour = new Date().getHours();
greetingElement.textContent = getGreetingMsg(currentHour);

const currentDateElement = document.querySelector("[data-current-date]");
currentDateElement.textContent = new Date().toDateString().replace(" ", ", ");

const sidebarList = document.querySelector("[data-sidebar-list]");

const addNotebookBtn = document.querySelector("[data-add-notebook]");

const showNotebookField = function () {
  const navItem = document.createElement("div");
  navItem.classList.add("nav-item");
  navItem.innerHTML = `
    <span class="text text-label-large" data-notebook-field></span>
    <div class="state-layer"></div>
  `;
  sidebarList.appendChild(navItem);
  const navItemField = navItem.querySelector("[data-notebook-field]");

  activeNotebook.call(navItem);

  makeElementEditable(navItemField);

  navItemField.addEventListener("keydown", createNotebook);
};
addNotebookBtn.addEventListener("click", showNotebookField);

const createNotebook = function (event) {
  if (event.key === "Enter") {
    const notebookData = db.post.notebooks(this.textContent || "Untitled");
    this.parentElement.remove();
    client.notebook.create(notebookData);
  }
};

const renderExistedElements = function () {
  const notebookList = db.get.notebook();
  client.notebook.read(notebookList);
};
renderExistedElements();

const noteCreateBtn = document.querySelectorAll("[data-note-create-btn]");

addEventOnElements(noteCreateBtn, "click", function () {
  const modal = noteModal();
  modal.open();
  modal.onSubmit((noteObj) => {
    const activeNotebookId = document.querySelector("[data-notebook].active").dataset.notebook;
    const noteData = db.post.note(activeNotebookId, noteObj);
    client.note.create(noteData);
    modal.close();
  });
});


const renderExistedNotes = function() {
  const activeNotebookId = document.querySelector("[data-notebook].active")?.dataset.notebook;
  if (activeNotebookId) {
    const notesList = db.get.note(activeNotebookId);
    client.note.read(notesList);
  }
};
renderExistedNotes()