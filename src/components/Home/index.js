import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';


class HomePage extends Component {

  componentDidMount() {
    const { userStore, sessionStore, dataStore } = this.props;

    db.getUser(sessionStore.authUser) // get user info from firestore
      .then(userDoc => {
        const {company} = userDoc.data() // get company ID
        return Promise.all([userDoc, db.getEvents(company)]) //get company document containing all subcollections
      })
      .then(results => {
        const userData = results[0].data()
        const eventsCol = results[1]
        userStore.setUser(userData)
        dataStore.setEvents(eventsCol)
      })
  }

  render() {
    const { user } = this.props.userStore;
    const { eventsCol } = this.props.dataStore;

    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        { user && eventsCol.empty === false ? <EventsList user={user} eventsCol={eventsCol} /> : 'Loading Events...' }
      </div>
    );
  }
}

const EventsList = ({ user, eventsCol }) => {
  // console.log('user', user);
  console.log('events', eventsCol.empty);
  return (<div>
    <h2>List of Events for this user</h2>
    <p>(Saved in Firestore Database)</p>

    {eventsCol.docs.map(eventDoc =>{
      console.log(eventDoc.data());
      return <div key={eventDoc.id}>
        title: {eventDoc.data().title}
      </div>
    })}

  </div>)
}

const condition = (authUser) => !!authUser

export default compose(
  withAuthorization(condition),
  inject('userStore', 'sessionStore', 'dataStore'),
  observer
)(HomePage);
