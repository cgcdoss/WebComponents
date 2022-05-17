class StarRater extends HTMLElement {
  constructor() {
    super();

    this.build();
  }

  build() {
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.appendChild(this.styles());

    const rater = this.createRater();
    this.stars = this.createStars();

    this.stars.forEach(star => rater.appendChild(star));

    this.resetRating();

    shadow.appendChild(rater);
  }

  createRater() {
    const rater = document.createElement('div');
    rater.classList.add('star-rater');
    rater.addEventListener('mouseout', this.resetRating.bind(this)); // o .bind mantém a referência ao this original (StarRater)
    return rater;
  }

  createStars() {
    const createStar = (_, index) => {
      const star = document.createElement('span');
      star.classList.add('star');
      star.setAttribute('data-value', parseInt(index) + 1);
      star.innerHTML = '&#9733;';

      star.addEventListener('click', this.setRating.bind(this));
      star.addEventListener('mousemove', this.ratingHover.bind(this));

      return star;
    }

    return Array.from({ length: 5 }, createStar);
  }

  resetRating() {
    this.currentRatingValue = parseFloat(this.getAttribute('data-rating')) || 0;
    this.highlightRating();
  }

  setRating(event) {
    let currentPositionOverElement = this.getMousePosition(event);
    let starSelected = event.currentTarget.getAttribute('data-value');
    let value = starSelected;

    if (currentPositionOverElement < 0.5) {
      value = starSelected - 0.5;
    }

    this.setAttribute('data-rating', value);
  }

  ratingHover(event) {
    this.currentRatingValue = parseFloat(event.currentTarget.getAttribute('data-value'));

    let currentPositionOverElement = this.getMousePosition(event);

    this.highlightRating(currentPositionOverElement);
  }

  getMousePosition(event) {
    let rect = event.target.getBoundingClientRect();
    let x = event.clientX - rect.left; // Posição de x dentro do elemento
    let currentPositionOverElement = x / rect.width;
    return currentPositionOverElement;
  }

  highlightRating(currentMousePosition) {
    this.stars.forEach(star => {
      if (this.currentRatingValue >= this.stars.indexOf(star) + 1) { // star.getAttribute('data-value')
        if (this.currentRatingValue === this.stars.indexOf(star) + 1) { // É a estrela com hover?
          if (currentMousePosition < 0.5) { // O hover tá antes da metade?
            star.classList.add('star-half');
          } else {
            star.classList.add('star-full');
            if (this.currentRatingValue % 1 === 0)
              star.classList.remove('star-half');
          }
        } else {
          star.classList.add('star-full');
          if (this.currentRatingValue % 1 === 0)
            star.classList.remove('star-half');
        }
      } else {
        star.classList.remove('star-full');
        if (this.currentRatingValue % 1 === 0)
          star.classList.remove('star-half');
      }
    });
  }

  styles() {
    const style = document.createElement('style');
    style.textContent = `
      .star {
        font-size: 5rem;
        color: gray;
        cursor: pointer;
      }

      .star-half {
        background: linear-gradient(to right, yellow 50%, gray 50%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .star-full {
        color: yellow;
      }
    `;
    return style;
  }

}

customElements.define('star-rater', StarRater);
