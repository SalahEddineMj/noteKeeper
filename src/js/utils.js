"use strict";
const addEventOnElements = (elements, eventType, callback) => {
  elements.forEach((element) => {
    element.addEventListener(eventType, callback);
  });
};

const getGreetingMsg = (currentHour) => {
  const greeting =
    currentHour < 5
      ? "Night"
      : currentHour < 12
      ? "Morning"
      : currentHour < 15
      ? "Noon"
      : currentHour < 17
      ? "Afternoon"
      : currentHour < 20
      ? "Evening"
      : "Night";
  return `Good ${greeting}`;
};

let lastActiveNavItem;

const activeNotebook = function () {
  lastActiveNavItem?.classList.remove("active");
  this.classList.add("active");
  lastActiveNavItem = this;
};

const makeElementEditable = function (element) {
  element.setAttribute("contenteditable", true);
  element.focus();
};

const generateID = function () {
  return new Date().getTime().toString();
};

const findNotebook = function (db, notebookId) {
  return db.notebooks.find((notebook) => notebook.id === notebookId);
};

const findNotebookIndex = function(db, notebookId) {
  return db.notebooks.findIndex(item => item.id === notebookId);
}

const getRelativeTime =  function(milliseconds) {
  const currentTime = new Date().getTime();
  let minute = Math.floor((currentTime - milliseconds) / 1000 / 60);
  let hour = Math.floor(minute / 60);
  let day = Math.floor(hour / 24);
  return minute < 1 ? 'Just now' : minute < 60 ? `${minute} min ago` : hour < 24 ? `${hour} hour ago` : `${day} day ago`
}

const findNote = function(db, id) {
  let note;
  for (const notebook of db.notebooks) {
    note = notebook.notes.find(noteData => noteData.id === id);
    if (note) break
  }
  return note
}

const findNoteIndex = function(notebook, noteId) {
  return notebook.notes.findIndex(item => item.id === noteId)
}

export {
  addEventOnElements,
  getGreetingMsg,
  activeNotebook,
  makeElementEditable,
  generateID,
  findNotebook,
  findNotebookIndex,
  getRelativeTime,
  findNote,
  findNoteIndex
};
