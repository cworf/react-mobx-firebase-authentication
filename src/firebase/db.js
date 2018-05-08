import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.doc(`users/${id}`).set({
    username,
    email,
  });

export const getUser = (user) =>
  db.doc(`users/${user.uid}`).get();

export const getEvents = company =>
  db.collection(`companies/${company}/events`).get()

// Other db APIs ...
