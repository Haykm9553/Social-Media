import Echo from 'laravel-echo';


window.Echo = new Echo({
  broadcaster: 'reverb',
  host: process.env.REACT_APP_REVERB_HOST,
  port: process.env.REACT_APP_REVERB_PORT,
  encrypted: process.env.REACT_APP_REVERB_ENCRYPTED === 'true',
  forceTLS: process.env.REACT_APP_REVERB_ENCRYPTED === 'true',
});

export default window.Echo;
