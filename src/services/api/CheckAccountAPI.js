const base_url = 'https://api.7789bet.com/789bet-ecp/api'

const CheckAccountAPI = (playerid,password,Captcha,Captchauuid) => {
  var formdata = new FormData();
  formdata.append('playerid', `${playerid}`);
  formdata.append('password', `${password}`);
  formdata.append('captcha', `${Captcha}`);
  formdata.append('captchauuid', `${Captchauuid}`);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  return fetch(`${base_url}`+'/PromotionAPI/CheckUserAccount', requestOptions)
    .then(response => response.json())
    .catch(error => {
      console.log('error CheckAccount', error)
      throw error;
    });
};

export default CheckAccountAPI;
