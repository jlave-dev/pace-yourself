import Shepherd from 'tether-shepherd';

const tour = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-element shepherd-open shepherd-theme-arrows',
  },
});

if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
  tour.addStep('speech-check', {
    title: '🚨 Uh oh',
    text: 'Speech recognition is not available in your browser! Please use this site in Google Chrome for it to work properly.',
  });
} else {
  tour.addStep('welcome', {
    title: '👋 Welcome!',
    text: 'If speaking in public or on the phone causes you to panic and talk too quickly, this app can help remind you to remain calm! Continue on for a quick tour.',
    advanceOn: '.docs-link click',
    showCancelLink: true,
  });

  tour.addStep('lang', {
    title: '🌐 Multi-Language Support',
    text: 'This app uses your browser\'s default language. If you\'d like to speak in a different language, select it from the dropdown menu above.',
    attachTo: '.navbar-item bottom',
    advanceOn: '.docs-link click',
    showCancelLink: true,
  });

  tour.addStep('wpm', {
    title: '⏲️ Words Per Minute Display',
    text: 'Here you can see the rate (in number of words per minute) of your last recognized speech snippet.',
    attachTo: '#wpm-display bottom',
    advanceOn: '.docs-link click',
  });

  tour.addStep('gauge', {
    title: '📊 WPM Gauge',
    text: 'Your speaking rate is also visually represented by this gauge. Try to keep it in the green!',
    attachTo: '#gauge top',
    advanceOn: '.docs-link click',
  });

  tour.addStep('voice', {
    title: '🎙️ Voice Detection Indicator',
    text: 'This icon appears when the browser has detected speech and is interpreting it. Speak louder or move closer to your microphone if this icon is unstable.',
    attachTo: '#voice-indicator top',
    advanceOn: '.docs-link click',
    when: {
      show() {
        document.querySelector('.loader-inner').classList.remove('hidden');
      },
      hide() {
        document.querySelector('.loader-inner').classList.add('hidden');
      },
    },
  });

  tour.on('complete', () => {
    localStorage.setItem('completed', 'true');
  });
}

// check local storage for completed item
// only run tour if not completed previously
if (!localStorage.getItem('completed')) {
  tour.start();
}
