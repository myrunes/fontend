/** @format */

import request from 'request';

const PROD_HOST =
  process.env.VUE_APP_API_HOST_URL || `${window.location.origin}/api`;

const HOST =
  process.env.NODE_ENV === 'production'
    ? PROD_HOST
    : 'http://localhost:8080/api';

var accessToken;

function getMe() {
  return _req({
    url: `${HOST}/users/me`,
    method: 'GET',
    withCredentials: true,
  });
}

function checkUsername(uname) {
  return _req({
    url: `${HOST}/users/${uname}`,
    method: 'GET',
  });
}

function register(username, password, remember, recaptcharesponse) {
  return _req({
    url: `${HOST}/users`,
    method: 'POST',
    json: {
      username,
      password,
      remember,
      recaptcharesponse,
    },
  });
}

function login(username, password, remember) {
  return _req({
    url: `${HOST}/login`,
    method: 'POST',
    json: {
      username,
      password,
      remember,
    },
  });
}

async function obtainAccessKey() {
  const res = await _req({
    url: `${HOST}/accesstoken`,
    method: 'GET',
  });
  accessToken = res.body.accesstoken;
}

function logout() {
  return _req({
    url: `${HOST}/logout`,
    method: 'POST',
  });
}

function getChamps() {
  return _req({
    url: `${HOST}/resources/champions`,
    method: 'GET',
  });
}

function getRunes() {
  return _req({
    url: `${HOST}/resources/runes`,
    method: 'GET',
  });
}

function getPages(sortBy, champion, short, filter) {
  return _req({
    url: `${HOST}/pages`,
    method: 'GET',
    qs: {
      sortBy,
      champion,
      short,
      filter,
    },
  });
}

function getPage(uid) {
  return _req({
    url: `${HOST}/pages/${uid}`,
    method: 'GET',
  });
}

function updatePage(uid, page) {
  return _req({
    url: `${HOST}/pages/${uid}`,
    method: 'POST',
    json: page,
  });
}

function createPage(page) {
  return _req({
    url: `${HOST}/pages`,
    method: 'POST',
    json: page,
  });
}

function deletePage(uid) {
  return _req({
    url: `${HOST}/pages/${uid}`,
    method: 'DELETE',
  });
}

function updateUser(update) {
  return _req({
    url: `${HOST}/users/me`,
    method: 'POST',
    json: update,
  });
}

function deleteUser(currpassword) {
  return _req({
    url: `${HOST}/users/me`,
    method: 'DELETE',
    json: { currpassword },
  });
}

function getFavorites() {
  return _req({
    url: `${HOST}/favorites`,
    method: 'GET',
  });
}

function setFavorites(favorites) {
  return _req({
    url: `${HOST}/favorites`,
    method: 'POST',
    json: { favorites },
  });
}

function getShare(ident) {
  return _req({
    url: `${HOST}/shares/${ident}`,
    method: 'GET',
  });
}

function createShare(share) {
  return _req({
    url: `${HOST}/shares`,
    method: 'POST',
    json: share,
  });
}

function updateShare(share) {
  return _req({
    url: `${HOST}/shares/${share.uid}`,
    method: 'POST',
    json: share,
  });
}

function deleteShare(share) {
  return _req({
    url: `${HOST}/shares/${share.uid}`,
    method: 'DELETE',
  });
}

function getVersion() {
  return _req({
    url: `${HOST}/version`,
    method: 'GET',
  });
}

function getRecapctchaInfo() {
  return _req({
    url: `${HOST}/recaptchainfo`,
    method: 'GET',
  });
}

function getAPIToken() {
  return _req({
    url: `${HOST}/apitoken`,
    method: 'GET',
  });
}

function generateAPIToken() {
  return _req({
    url: `${HOST}/apitoken`,
    method: 'POST',
  });
}

function deleteAPIToken() {
  return _req({
    url: `${HOST}/apitoken`,
    method: 'DELETE',
  });
}

function setPageOrder(pageorder, champion) {
  return _req({
    url: `${HOST}/users/me/pageorder`,
    method: 'POST',
    json: { pageorder },
    qs: { champion },
  });
}

function setMailAddress(mailaddress, reset, currpassword) {
  if (reset === undefined || reset === null) {
    reset = false;
  }

  return _req({
    url: `${HOST}/users/me/mail`,
    method: 'POST',
    json: { mailaddress, reset, currpassword },
  });
}

function confirmMail(token) {
  return _req({
    url: `${HOST}/users/me/mail/confirm`,
    method: 'POST',
    json: { token },
  });
}

function resetPassword(mailaddress) {
  return _req({
    url: `${HOST}/users/me/passwordreset`,
    method: 'POST',
    json: { mailaddress },
  });
}

function resetPasswordConfirm(token, new_password, recaptcharesponse) {
  return _req({
    url: `${HOST}/users/me/passwordreset/confirm`,
    method: 'POST',
    json: { token, new_password, recaptcharesponse },
  });
}

// ----------------------------

function _req(options) {
  return new Promise((resolve, rejects) => {
    options.withCredentials = true;
    if (accessToken) {
      options.headers = {'Authorization': 'accessToken ' + accessToken};
    }
    request(options, (err, res, body) => {
      if (err) {
        rejects(err);
        return;
      }

      if (body && typeof body === 'string') body = JSON.parse(body);

      if (res.statusCode >= 400) {
        body._headers = res.headers;
        if (body && body.message === 'invalid access key') {
          obtainAccessKey()
            .then(() => _req(options).then(resolve).catch(rejects))
            .catch(rejects);
        } else {
          rejects(body);
        }
        return;
      }
      resolve({ res, body });
    });
  });
}

export default {
  getMe,
  checkUsername,
  register,
  login,
  logout,
  getChamps,
  getRunes,
  getPages,
  getPage,
  updatePage,
  createPage,
  deletePage,
  updateUser,
  deleteUser,
  getFavorites,
  setFavorites,
  getShare,
  createShare,
  updateShare,
  deleteShare,
  getVersion,
  getRecapctchaInfo,
  getAPIToken,
  generateAPIToken,
  deleteAPIToken,
  setPageOrder,
  setMailAddress,
  confirmMail,
  resetPassword,
  resetPasswordConfirm,

  HOST,
};
