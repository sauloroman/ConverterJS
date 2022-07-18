import {containerResults} from '../selectores.js';

class UI {

  showMessage( message, type ) {

    const alertsOnScreen = document.querySelectorAll('.alert');

    if ( !alertsOnScreen.length ) {
      const messagePa = document.createElement('P');
      messagePa.textContent = message;
      messagePa.classList.add('alert');
  
      if ( type === 'error' ) {
        messagePa.classList.add('alert--error');
      } else if ( type === 'success'){
        messagePa.classList.add('alert--success');
      }
  
      document.querySelector('body').appendChild( messagePa );
  
      setTimeout( () => {
        messagePa.classList.add('show');
  
        setTimeout( () => {
          messagePa.classList.remove('show');
  
          setTimeout( () => {
            messagePa.remove();
          }, 500 )
  
        }, 2000 );
  
      }, 500 );
    }
  }

  showResult( number, convertedNumber, from, to) {
    this.clean();
    const numberP = document.createElement('P');
    numberP.innerHTML = `${number}<sub>(${from})</sub> = ${convertedNumber}<sub>(${to})</sub>`;
    containerResults.appendChild( numberP );
  }

  clean() {
    while( containerResults.firstElementChild ) {
      containerResults.removeChild( containerResults.firstElementChild );
    }
  }
}

export default UI;