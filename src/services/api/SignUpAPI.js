const base_URL = 'https://api.7789bet.com/789bet-ecp/api/v1';

const SignUpAPI = (Playerid, Password, Mobile, Captcha, Captchauuid) => {
  var formdata = new FormData();
  formdata.append('ulagentaccount', '');
  formdata.append('playerid', `${Playerid}`);
  formdata.append('password', `${Password}`);
  formdata.append('mobile', `${Mobile}`);
  formdata.append('portalid', '');
  formdata.append('currency', 'VND2');
  formdata.append('captcha', `${Captcha}`);
  formdata.append('captchauuid', `${Captchauuid}`);
  formdata.append('language', '4');

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  return fetch(`${base_URL}` + '/register', requestOptions)
    .then(response => response.json())
    .catch(error => {
      console.log('error SignUp', error);
      throw error;
    });
};

export default SignUpAPI;
