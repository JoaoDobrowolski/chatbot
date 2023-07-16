export default function interpreter(term) {
  if (term) {
    const termLC = term.toLowerCase();
    if (termLC.startsWith('hello') || termLC.startsWith('hi')) {
      return 'Hello! To continue this conversation, please Sign In';
    }
    if (termLC.match('help')) {
      return 'Of course! I\'m here to help! If you want to know more about loans, type "loan"';
    }
    if (termLC.match('goodbye')) {
      return 'See you later';
    }
    if (termLC.match('loan conditions')) {
      return {
        text: 'Loan conditions encompass factors such as interest rates, loan amounts, repayment terms, schedules, collateral requirements, credit scores, and fees. It\'s crucial to thoroughly understand these conditions before agreeing to a loan.',
        reference: 'https://www.forbes.com/advisor/loans/what-are-loan-terms/'
      };
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