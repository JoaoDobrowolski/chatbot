export default function interpreter(term) {
  if (term) {
    const termLC = term.toLowerCase();
    if (termLC.startsWith('hello') || termLC.startsWith('hi')) {
      return 'Hi';
    }
    if (termLC.match(/i want/)) {
      return 'What do you want?';
    }
    if (termLC.match(/bye/)) { // also works for Goodbye
      return 'See you later';
    }
    return 'Sorry, I didn\'t understand what you meant';
  }
}