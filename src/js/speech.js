import gauge from './gauge';
import wpm from './animated-wpm';
import Timer from './timer';

const MS_PER_MINUTE = 60000;

try {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  const timer = new Timer();

  // recognition.lang = 'fa';

  recognition.onend = () => {
    recognition.start();
  };

  recognition.onspeechstart = () => {
    document.querySelector('.loader-inner').classList.remove('hidden');
    if (!timer.isActive) {
      timer.setStart();
      timer.isActive = true;
    }
  };

  recognition.onspeechend = () => {
    document.querySelector('.loader-inner').classList.add('hidden');
    if (timer.isActive) {
      timer.setEnd();
      timer.isActive = false;
    }
  };

  recognition.onresult = (event) => {
    const timeSinceLastEvent = timer.getDelta(); // ms
    if (timeSinceLastEvent > 0) {
      const { transcript } = event.results[0][0];
      const numberOfWords = transcript.split(' ').length - 1;
      if (numberOfWords > 1) {
        const wordsPerMinute = (numberOfWords / timeSinceLastEvent) * MS_PER_MINUTE;
        if (wordsPerMinute < 300) {
          gauge.set(wordsPerMinute); // set gauge value
          wpm.update(wordsPerMinute);
          console.log(transcript, wordsPerMinute);
        }
      }
    }
  };

  recognition.start();
} catch (error) {
  console.error(error);
}

