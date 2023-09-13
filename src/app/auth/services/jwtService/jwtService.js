import jwtDecode from 'jwt-decode';
import FuseUtils from '@fuse/utils/FuseUtils';
import axios  from '../../../../utls/baseUrl';
import jwtServiceConfig from './jwtServiceConfig';

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Invalid access_token');
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.signUp, data).then((response) => {
        if (response.data.user) {
          this.setSession(response.data.access_token);
          resolve(response.data.user);
          this.emit('onLogin', response.data.user);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  signInWithEmailAndPassword = (username, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.signIn, {
            username,
            password,
        })
        .then((response) => {
          if (response.data) {
            this.setSession(response.data.token);
            axios
              .get(jwtServiceConfig.accessToken, {
                data: {
                  access_token: this.getAccessToken(),
                },
              })
              .then((ress) => {
                const data = {
                  "role": "",
                  "data": {
                    "displayName": "",
                    "photoURL": "",
                    "email": "",
                  }
                }

                data.role = ress.data.role
                data.data.displayName = ress.data.name
                data.data.photoURL = ress.data.avatar
                data.data.email = ress.data.phone
                
                resolve(data);
                this.emit('onLogin', data);
              })
              .catch((error) => {
                console.log(error);
              });
            
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
      .get(jwtServiceConfig.accessToken, {
        data: {
          access_token: this.getAccessToken(),
        },
      })
      .then((response) => {
        const data = {
          "role": "",
          "data": {
            "displayName": "",
            "photoURL": "",
            "email": "",
            
          }
        }

        data.role = response.data.role
        data.data.displayName = response.data.name
        data.data.photoURL = response.data.avatar
        data.data.email = response.data.phone
        
        resolve(data);
        this.emit('onLogin', data);
      })
      .catch((error) => {
        console.log(error);
      });
    });
  };

  updateUserData = (user) => {
    this.emit()
    return axios.post(jwtServiceConfig.updateUser, {
      user,
    });
    
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem('jwt_access_token', access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem('jwt_access_token');
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit('onLogout', 'Logged out');
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token');
  };
}

const instance = new JwtService();

export default instance;
