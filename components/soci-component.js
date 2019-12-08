// This is a stripped down version of my base component I use for my side project. It's really basic, but it allows some easy functionality.
export default class SociComponent extends HTMLElement {
  constructor() {
    super()

    // Attach a shadowroot. Webcomponents don't need a shadowroot, but typically any component you make will use one. 
    this.attachShadow({'mode':'open'})

    // Fill the shadowroot with whatever is in our html() and css() functions, if they exist. 
    this.shadowRoot.innerHTML = `
      ${this.css ? `<style>${this.css()}</style>` : ''}
      ${this.html ? this.html() : '<slot></slot>'}
    `

    // This is how we do our event binding with the @ directives. Essentailly we generate a flat map of all of the elements in the shadowroot,
    // iterate through them, and see if they have any attributes starting with @. If they do, we remove the attribute, parse the name, and bind 
    // an event listener for the name and map it to the function defined in the value. 
    // This saves you from having a lot of document.shadowRoot.querySelector('foo').addEventListener() calls in your connectedCallback() function.
    // We also support ? directives, which conditionally add attributes based on a boolean check.
    this.shadowRoot.querySelectorAll('*').forEach(el=> {
      Array.from(el.attributes).forEach(attr => {
        const prefix = attr.name.charAt(0)
        if(prefix == '@'){
          this[attr.value] = this[attr.value].bind(this)
          el.addEventListener(attr.name.slice(1), this[attr.value])
          el.removeAttribute(attr.name)
        }
        if(prefix == '?'){
          el[attr.value != 'false' ? 'setAttribute' : 'removeAttribute'](attr.name.slice(1), '')
          el.removeAttribute(attr.name)
        }
      })
    })
  }
}
