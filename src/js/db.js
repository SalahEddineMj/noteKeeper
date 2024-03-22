/**
 * @copyright codewithsadee 2023
 */

"use strict";
import {
  generateID,
  findNotebook,
  findNotebookIndex,
  findNote,
  findNoteIndex,
} from "./utils.js";

let noteKeeperDB = {};

const initDB = function () {
  const db = localStorage.getItem("noteKeeperDB");
  if (db) {
    noteKeeperDB = JSON.parse(db);
  } else {
    noteKeeperDB.notebooks = [];
    localStorage.setItem("noteKeeperDB", JSON.stringify(noteKeeperDB));
  }
};

initDB();

const readDB = function () {
  noteKeeperDB = JSON.parse(localStorage.getItem("noteKeeperDB"));
};

const writeDB = function () {
  localStorage.setItem("noteKeeperDB", JSON.stringify(noteKeeperDB));
};

export const db = {
  post: {
    notebooks(name) {
      readDB();
      const notebookData = {
        id: generateID(),
        name,
        notes: [],
      };
      noteKeeperDB.notebooks.push(notebookData);
      writeDB();
      return notebookData;
    },
    note(notebookId, object) {
      readDB();
      const notebook = findNotebook(noteKeeperDB, notebookId);
      const noteData = {
        id: generateID(),
        notebookId,
        ...object,
        postedOn: new Date().getTime(),
      };
      notebook.notes.unshift(noteData);
      writeDB();
      return noteData;
    },
  },
  get: {
    notebook() {
      readDB();
      return noteKeeperDB.notebooks;
    },
    note(notebookId) {
      readDB();
      const notebook = findNotebook(noteKeeperDB, notebookId);
      return notebook.notes;
    },
  },

  update: {
    notebook(notebookId, name) {
      readDB();
      const notebook = findNotebook(noteKeeperDB, notebookId);
      notebook.name = name;
      writeDB();
      return notebook;
    },
    note(id, noteData) {
      readDB();
      const oldNote = findNote(noteKeeperDB, id);
      console.log(oldNote);
      const newNote = Object.assign(oldNote, noteData);
      writeDB();
      return newNote;
    },
  },
  delete: {
    notebook(notebookId) {
      readDB();
      const notebookIndex = findNotebookIndex(noteKeeperDB, notebookId);
      noteKeeperDB.notebooks.splice(notebookIndex, 1);
      writeDB();
    },
    note(noteId, notebookId) {
      readDB();
      const notebook = findNotebook(noteKeeperDB, notebookId);
      const noteIndex = findNoteIndex(notebook, noteId);
      notebook.notes.splice(noteIndex, 1);
      writeDB();
      return notebook.notes
    },
  },
};
