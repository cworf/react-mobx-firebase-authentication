import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.doc(`users/${id}`).set({
    username,
    email,
  });

export const getUser = (user) =>
  db.doc(`users/${user.uid}`).get();

export const getData = company => {
  const eventsCol = db.collection(`companies/${company}/events`).get(),
   clients = db.collection(`companies/${company}/clients`).get(),
   venues = db.collection(`companies/${company}/venues`).get(),
   inventory = db.collection(`companies/${company}/inventory`).get(),
   orders = db.collection(`companies/${company}/orders`).get(),
   conflicts = db.collection(`companies/${company}/conflicts`).get()
  return Promise.all([eventsCol, clients, venues, inventory, orders, conflicts])
}
// Other db APIs ...
