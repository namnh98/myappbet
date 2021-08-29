const base_URL = 'https://api.7789bet.com/789bet-ecp/api/v1';

const SignInAPI = (Playerid, Password, Captcha, Captchauuid) => {
  var formdata = new FormData();
  formdata.append('playerid', `${Playerid}`);
  formdata.append('password', `${Password}`);
  formdata.append('captcha', `${Captcha}`);
  formdata.append('captchauuid', `${Captchauuid}`);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  return fetch(`${base_URL}` + '/login', requestOptions)
    .then(response => response.json())
    .catch(error => {
      console.log('error SignIn', error)
      throw error;
    });
};

export default SignInAPI;
