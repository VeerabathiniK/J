import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  OnSubmitSuccess = JwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', JwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const LoginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(LoginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.OnSubmitSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-container">
        <form className="login-container" onSubmit={this.onSubmitLoginForm}>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </div>
          <div className="username-container">
            <label className="label-username" htmlFor="username">
              USERNAME
            </label>
            <input
              id="username"
              className="input-username"
              value={username}
              onChange={this.onChangeUsername}
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="username-container">
            <label className="label-username" htmlFor="password">
              PASSWORD
            </label>
            <input
              id="password"
              className="input-username"
              value={password}
              onChange={this.onChangePassword}
              type="password"
              placeholder="Password"
            />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          {showSubmitError && <p className="error-msg">* {errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
