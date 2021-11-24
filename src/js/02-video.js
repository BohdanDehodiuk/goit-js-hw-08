import Player from '@vimeo/player';
var throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo.Player(iframe);

player.on(
  'timeupdate',
  throttle(data => {
    localStorage.setItem('videoplayer-current-time', JSON.stringify(data.seconds));
  }, 1000),
);

const sevedDataTime = JSON.parse(localStorage.getItem('videoplayer-current-time'));

player
  .setCurrentTime(sevedDataTime)
  .then(seconds => {
    // seconds = the actual time that the player seeked to
  })
  .catch(error => {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

player.on('play', () => {
  console.log('played the video!');
});

player.getVideoTitle().then(title => {
  console.log('title:', title);
});

player
  .setColor('#59EF0F')
  .then(color => {
    // color was successfully set
  })
  .catch(error => {
    switch (error.name) {
      case 'ContrastError':
        // the color was set, but the contrast is outside of the acceptable
        // range
        break;

      case 'TypeError':
        // the string was not a valid hex or rgb color
        break;

      case 'EmbedSettingsError':
        // the owner of the video has chosen to use a specific color
        break;

      default:
        // some other error occurred
        break;
    }
  });
