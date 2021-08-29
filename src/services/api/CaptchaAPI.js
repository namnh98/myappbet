const base_URL = 'https://api.7789bet.com/789bet-ecp/api/v1';

const CaptchaAPI = () => {
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
    return fetch(`${base_URL}`+'/captchas/random', requestOptions)
        .then(response => response.json())
        .catch(error => {
            console.log('error Captcha', error);
            throw error;
        });
};

export default CaptchaAPI;
