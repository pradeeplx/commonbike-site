import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import AccountsUIWrapper from '/imports/client/containers/AccountsUIWrapper/AccountsUIWrapper.jsx';
import ReactSwipe from 'react-swipe';
import R from 'ramda';
import {propTypes} from 'react-router';

// Import templates
import SquareButton from '../SquareButton/SquareButton.jsx';
import LoginForm from '../../containers/LoginForm/LoginForm.jsx';

class Login extends Component {

  /**
   *  APP DASHBOARDS
   * 
   * Facebook: https://developers.facebook.com/apps/328645994158360/settings/
   * Google: https://console.developers.google.com/apis/credentials?highlightClient=347856876516-if94srm24tciclpid7keqibf02p4dctn.apps.googleusercontent.com&project=commonbike-149108
   * GitHub: https://github.com/settings/applications/437650
   */

  onError(err) {
    if(err) {
      console.log(err);
      alert(err.message);
    }
  }

  logout() { Meteor.logout() }

  loginWithGoogle() { Meteor.loginWithGoogle({ requestPermissions: ['email'] }, this.onError) }
  loginWithGithub() { Meteor.loginWithGithub({ requestPermissions: ['email'] }), this.onError }
  loginWithTwitter() { Meteor.loginWithTwitter({}, this.onError) }
  loginWithFacebook() { Meteor.loginWithFacebook({ requestPermissions: ['public_profile'] }, this.onError) }

  renderIntro() {
    return (
      <div style={s.base}>

        <div style={s.intro}>

          <p>
            Wil je als eerste<br />de CommonBike app uitproberen?
          </p>

          <p>
            Log in met je favoriete account
          </p>

        </div>

        <div style={s.socialButtonsWrapper}>
          <SquareButton src="google" size="64" title="Login with Google" onClick={this.loginWithGoogle.bind(this)} style={s.google} />
          <SquareButton src="github" size="64" title="Login with Github" onClick={this.loginWithGithub.bind(this)} style={s.github} />
          <SquareButton src="twitter" size="64" title="Login with Twitter" onClick={this.loginWithTwitter.bind(this)} style={s.twitter} />
          <SquareButton src="facebook" size="64" title="Login with Facebook" onClick={this.loginWithFacebook.bind(this)} style={s.facebook} />
        </div>

        <p>
          Of meld je aan met je mailadres
        </p>

        <div style={{textAlign: 'center'}}>
          <LoginForm />
        </div>

      </div>
    )
  }

  renderTeaser() {
    return (
      <div style={Object.assign({padding: '20px'}, s.base)}>
        <p>Leuk dat je meedoet! We sturen je als eerste een bericht als de app gebruikt kan worden.</p>
        <p>In december starten we een pilot bij een intercity treinstation. Daarna breiden we uit.</p>
        <p><button onClick={this.logout}>Log out</button></p>
      </div>
    )
  }

  render() {
    const {currentUser} = this.props
    // console.log(currentUser)
    const active = currentUser && currentUser.profile && currentUser.profile.active
    return (
      <div style={s.base}>
        {currentUser ? (active ? this.context.history.push('/locations') : this.renderTeaser())
                                : this.renderIntro()}

      </div>
    );
  }
}

var s = {
  base: {
    width: '480px',
    maxWidth: '100%',
    minHeight: 'calc(100% - 74px)',
    height: 'calc(100% - 74px)',
    margin: '0 auto',
    lineHeight: 'default',
    color: '#000',
    paddingTop: '20px',
    fontSize: '1.05em',
    textAlign: 'center',
    fontWeight: '500',
  },
  intro: {
    padding: '0 5px'
  },
  signUpButton: {
    margin: '10px 0',
  },
  socialButtonsWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    background: '#fff'
  }
}

Login.contextTypes = {
  history: propTypes.historyContext
}

export default createContainer((props) => {
  return {
    currentUser: Meteor.user()
  };
}, Login);
