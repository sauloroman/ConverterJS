"use strict";

// #############################################################
// VARIABLES Y SELECTORES
// #############################################################
const numberUser = document.querySelector('#numberUser');
const fromBase = document.querySelector('#from');
const toBase = document.querySelector('#to');
const form = document.querySelector('#converted__form');
const containerResults = document.querySelector('#converted__results');

// #############################################################
// CLASSES
// #############################################################
class Converter {

  constructor( number, from, to ) {
    this.number = number;
    this.from = from;
    this.to = to;
  }

  intergetPartNum ( number ) {
    let intNum = [];
  
    for ( let digit of number ){
      if ( digit === '.' ){
        return intNum;
      } else {
        intNum.push( digit )
      }
    }
  
    return intNum;
  }

  decimalPartNum = function ( number ) {
    if ( number.includes('.') ) {
      const indexDot = number.indexOf('.');
      // console.log( number );
      return number.slice(indexDot);
    }
  
    return ['0'];
  }

  chooseNumber( digits ) {
    const number = [];
  
    for ( let digit of digits ) {
      switch( digit ) {
        case 'A':
          digit = '10';
          break;
        case 'B':
          digit = '11';
          break;
        case 'C':
          digit = '12';
          break;
        case 'D':
          digit = '13';
          break;
        case 'E':
          digit = '14';
          break;
        case 'F':
          digit = '15';
          break;
      }
  
      number.push( digit );
    }    
  
    return number;
  }

  chooseLetter( number ) {
    if ( number > 9 ) {
      switch( number ) {
        case 10:
          number = 'A';
          break;
        case 11:
          number = 'B';
          break;
        case 12:
          number = 'C';
          break;
        case 13: 
          number = 'D';
          break;
        case 14: 
          number = 'E';
          break;
        case 15:
          number = 'F';
          break;
      }
    }
  
    return number;
  }

  base10toN() {
    let digit, convertedNumber = [];
    let intergetPart = Number(this.intergetPartNum( this.number.split('') ).join(''));
  
    // PARTE ENTERA 
    while ( intergetPart > 0 ) {
      digit = this.chooseLetter( intergetPart % Number(this.to) );      
      convertedNumber.unshift( digit );
      intergetPart = parseInt( intergetPart / Number(this.to) );
    }
  
    if ( String( this.number ).split('').includes('.') ) {
      // PARTE DECIMAL
      convertedNumber.push('.');
      let decimalPart = this.decimalPartNum( this.number.split('') );
      let couter = 0;

      while ( Number(decimalPart.join('')) !== 0 ) {
        const n = Number(decimalPart.join('')) * Number(this.to);
        const nArr = String(n).split('');
        convertedNumber.push( Number(this.intergetPartNum(nArr)) );
        decimalPart = this.decimalPartNum( nArr );
        couter++;

        if ( couter > 5 ) {
          return 'error';
        }
      }

    } 

    return convertedNumber.join('');
  }

  baseNto10() {
    const equivalentNumber = this.chooseNumber(this.number.split(''));

    // PARTE ENTERA
    const intergetPart = this.intergetPartNum( equivalentNumber );
    let potencia = 1, totalEntera = 0, totalDecimal = 0;
  
    for ( let i = intergetPart.length - 1; i >= 0; i-- ) {
      totalEntera += Number(intergetPart[i]) * potencia;
      potencia*=Number(this.from);
    }
  
    // PARTE DECIMAL
    if ( equivalentNumber.includes('.') ) {
      potencia = 1;
      potencia = 1/Number(this.from);
      let decimalPart = this.decimalPartNum( equivalentNumber );

      for ( let i = 1; i < decimalPart.length; i++ ) {
        const digit = Number(decimalPart[i]);
        totalDecimal += digit * potencia;
        potencia *= 1 / this.from;
      }
    }

    return totalEntera + totalDecimal;
  }

  baseNtoN() {
    const numberB10 = this.baseNto10();
    this.number = String(numberB10);
    return this.base10toN();
  }

}

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

// Instancias
const ui = new UI();

// #############################################################
// EVENT LISTENERS
// #############################################################
loadEventListeners();
function loadEventListeners () {

  document.addEventListener('DOMContentLoaded',  () => {
    const messageInit = document.createElement('P');
    messageInit.textContent = 'Resultados';
    messageInit.classList.add('results--opacity');
    containerResults.appendChild( messageInit );
  });

  form.addEventListener('submit', validateForm );
}

// #############################################################
// FUNCTIONS
// #############################################################

function validateForm( e ) {

  e.preventDefault();

  // Values on the form
  const number = numberUser.value;
  const from = fromBase.value;
  const to = toBase.value;

  // Validate form
  if ( number === '' || from === 'null' || to === 'null') {
    ui.showMessage('Campos vacíos', 'error');
    return;
  } 

  // Instanciar la clase de convertidor
  const convertion = new Converter( number, from, to);

  // Validar que el número se haya ingresado en el sistema correcto
  if ( !validateNumber( convertion ) ) {
    return;
  }

  // Efectuar la conversión entre sistemas
  makeConvertion( convertion );

  // Reiniciar el formulario
  form.reset();
}

function makeConvertion( convertion ) {

  const { number, from, to } = convertion;
  let convertedNumber;

  if ( from === '10'){
    convertedNumber = convertion.base10toN();
  } else if ( (from === '2'|| from === '8' || from === '16') && to === '10' ) {
    convertedNumber = convertion.baseNto10();
  } else {
    convertedNumber = convertion.baseNtoN();
  }

  if ( convertedNumber === 'error' ) {
    ui.showMessage('No es posible convertir este número', 'error'); 
  } else {
    ui.showResult( number, convertedNumber, from, to );
    ui.showMessage('Número convertido', 'success');
  }
}

function validateNumber( convertion ) {

  const {number, from} = convertion;

    for ( let digit of number.split('') ){

      digit = convertion.chooseNumber( digit );
      console.log( digit );

      if ( digit > 'F' || Number(digit) > `${from}` ) {
        ui.showMessage(`EL NÚMERO NO ES BASE ${from}`, 'error');
        return false;
      }
    }
  return true;
}