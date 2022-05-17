fetch('card-component/template.html')
    .then(stream => stream.text())
    .then(text => define(text));

function define(htmlTemplate) {
    class Card extends HTMLElement {
        constructor() {
            super();
            this.build();
        }

        build() {
            const wrapper = document.createElement('div'); // Só para obter um element da string que vem no parâmetro
            wrapper.innerHTML = htmlTemplate.trim(); // Obtendo element dentro do wrapper

            const template = wrapper.firstChild; // <template></template>
            this.templateContent = template.content; // fragment


            const shadow = this.attachShadow({ mode: 'open' });
            shadow.appendChild(this.templateContent.cloneNode(true));

            this.setOnclickHeader(shadow);
        }

        setOnclickHeader(shadow) {
            shadow.querySelector('div.header').addEventListener('click', function () {
                alert('clicado!');
            });
        }
    }

    customElements.define('app-card', Card);
}    
