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
        return Promise.all([userDoc, db.getData(company)]) //get company document containing all subcollections
      })
      .then(results => {
        const userData = results[0].data()
        const companyData = results[1] //array of all promised firestore CollectionQueries
        userStore.setUser(userData)
        dataStore.setData(companyData)
      })
  }

  render() {
    const { user } = this.props.userStore;
    const { inventory } = this.props.dataStore;

    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        { !(user && inventory.empty === false)
            ? 'Loading Inventory...'
            : <EventsList user={user} inventory={inventory} /> }
      </div>
    );
  }
}

const EventsList = ({ user, inventory }) => {
  // console.log('user', user);
  return (<div>
    <h2>List of Inventory for this user</h2>
    <p>(Saved in Firestore Database)</p>

    {inventory.docs.map(item =>{
      return <div key={item.id}>
        ---Item: {item.data().name}
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
