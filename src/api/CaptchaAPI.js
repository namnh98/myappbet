import React from 'react';

const base_URL = 'https://api.7789bet.com/789bet-ecp/api/v1';

const CaptchaAPI=async()=>{
    const response = await fetch(`${base_URL}`+'/captchas/random',{
        method:'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
    })
}