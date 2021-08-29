const base_URL = 'https://api.7789bet.com/789bet-ecp/api/v1';

const SignInAPI = (Playerid, Password, Captcha, Captchauuid) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    loginname: Playerid,
    loginpassword: Password,
    captcha: Captcha,
    captchauuid: Captchauuid,
    fingerprint: '',
    portalid: '',
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(`${base_URL}` + '/login', requestOptions)
    .then(response => response.json())
    .catch(error => {
      console.log('error', error);
      throw error;
    });
};

export default SignInAPI;
