import UI from './Classes/UI.js';
import Converter from './Classes/Converter.js';

import {
  numberUser,
  fromBase,
  toBase,
  form
} from './selectores.js';

// Instancia de la clase UI
const ui = new UI();

export function validateForm( e ) {

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