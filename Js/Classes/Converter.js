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

export default Converter;