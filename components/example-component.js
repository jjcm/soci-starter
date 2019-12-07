import SociComponent from './soci-component.js'

export default class ExampleComponent extends SociComponent {
  constructor() {
    super()
  }

  // This function inserts css into the shadowroot. This css is entirely encapsulated by the shadowdom, so it wont affect anything outside the component.
  // The reverse is true as well - styles in the global stylesheets cant target things inside the webcomponent (though they CAN target the base component itself, which is what
  // :host is referring to here). If you want the global stylesheets to be able to penetrate the shadowroot, use css variables as tokens.
  css(){
    return `
      :host {
        background: #f00;
      }

      h2 {
        color: blue;
      }

      h2:active { 
        color: var(--example-token-red);
      }
    `
  }

  // This inserts html into the shadowroot. Typically you do this by copying the html over from a template. Both the css() and the html() function are custom
  // ones that I've written to be more react-like. It also supprts VERY basic event binding via an @ directive. Unlike react where this would be your render() function
  // and you'd call this every time the state of the object changed, webcomponents use an attribute callback system, which is what observedAttributes and attributeChangedCallback() are
  html(){ return `
    <h2>Hello, world</h2>
    <button @click=_onClick></button>
  `}

  // This is a native javascript function, not one I've written. Any attribute listed here will trigger attributeChangedCallback when they're modified.
  static get observedAttributes() {
    return ['score', 'user', 'replies', 'date']
  }

  // Also a native javascript function. We use a switch statement to decide what to do based on the name of the attribute that changed.
  attributeChangedCallback(name, oldValue, newValue){
    switch(name) {
      case 'title':
        this.shadowRoot.querySelector('h2').innerHTML = newValue
        break
    }
  }

  // native function, is called once the component is connected to the DOM.
  connectedCallback(){
  }

  // native function, called when the component is disconnected from the DOM.
  disconnectedCallback(){
    if(this._updateTimer){
      clearTimeout(this._updateTimer)
    } 
  }

  _onClick(){
    console.log('You clicked the button!')
  }
}
