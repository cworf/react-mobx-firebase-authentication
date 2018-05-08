import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
// import { db } from '../../firebase';

import { firebase } from '../../firebase';
import * as routes from '../../constants/routes';

const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        } else {
          // db.getUser(authUser) // get user info from firestore
          //   .then(userDoc => {
          //     const {company} = userDoc.data()
          //     return Promise.all([userDoc, db.getEvents(company)])
          //   })
          //   .then(results => {
          //     console.log(results);
          //     this.props.userStore.setUser(results[0].data())
          //     this.props.userStore.setEvents(results[1])
          //   })
        }
      });


    }

    render() {
      return this.props.sessionStore.authUser ? <Component /> : null;
    }
  }

  return compose(
    withRouter,
    inject('sessionStore', 'userStore'),
    observer
  )(WithAuthorization);
}

export default withAuthorization;
