export default function interpreter(term) {
  if (term) {
    const termLC = term.toLowerCase();
    if (termLC.startsWith('hello') || termLC.startsWith('hi')) {
      return 'Hi';
    }
    if (termLC.match('help')) { // also works for Goodbye
      return 'HELP';
    }
    if (termLC.match('goodbye')) { // also works for Goodbye
      return 'See you later';
    }
    if (termLC.match('loan conditions')) {
      return 'LOAN CONDITIONS';
    }
    if (termLC.match('i want') && termLC.match('loan')) {
      return {
        text: 'When applying for a loan, start by researching lenders and available loan options. Collect all the required documents promptly and ensure their accuracy. Finally, submit your completed application and patiently await the lender\'s approval.',
        reference: 'https://www.cnbc.com/select/how-to-apply-for-a-personal-loan/'
      };
    }
    if (termLC.match('i want') || termLC.match('loan') || termLC.match('apply') || termLC.match('good')) {
      return 'Please choose an option';
    }
    return 'Sorry, I didn\'t understand what you meant';
  }
}