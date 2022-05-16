class StarRater extends HTMLElement {
  constructor() {
    super();

    this.build();
  }

  build() {
    const shadow = this.attachShadow({ mode: 'open' });

    const teste = document.createElement('p');
    teste.innerText = 'teste';

    shadow.appendChild(teste);
  }
}

customElements.define('star-rater', StarRater);
