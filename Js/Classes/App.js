import {validateForm} from '../funciones.js';
import {containerResults, form} from '../selectores.js';

class App {

  constructor() {
    this.initApp();
  }

  initApp() {
      document.addEventListener('DOMContentLoaded',  () => {
      const messageInit = document.createElement('P');
      messageInit.textContent = 'Resultados';
      messageInit.classList.add('results--opacity');
      containerResults.appendChild( messageInit );
    });
  
    form.addEventListener('submit', validateForm );
  }

}

export default App;