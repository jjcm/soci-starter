// This imports classes and defines them as custom elements. This way we can import the entire component system by just
// importing this file. Theoretically you could call window.customElements.define inside of each of the component files 
// themselves, but this is seen as a bad practice as it means you may have namespace collisions with tags that have the
// same name. Personally I feel like that's a weak argument, but it's what the community thinks.
import ExampleComponent from "./example-component.js"
window.customElements.define('example-component', ExampleComponent)