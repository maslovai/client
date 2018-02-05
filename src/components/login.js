// TODO: this should be the React-ified version of the simple index.html from last lab (#41)
// TODO: Stretch import React from 'react';
import React from 'react';
import querystring from 'querystring';


class Login extends React.Component {
  
    render() {

      let oauthURL = "https://accounts.google.com/o/oauth2/v2/auth";

      let opts = {
        client_id:__GOOGLE_CLIENT_ID__,
        redirect_uri: `${__API_URL__}/oauth/google/code`,
        scope: 'email openid profile',
        prompt: 'consent',
        response_type: 'code'
      }
      
      let QueryString = querystring.stringify(opts);
      
      let loginURL = `${oauthURL}?${QueryString}`;

      return (
        <div className='login'>
          <a id='google' href={loginURL}>Login With Google</a>
        </div>
      )
    }
  }

  export default Login;