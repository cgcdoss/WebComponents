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
      star.addEventListener('mouseover', this.ratingHover.bind(this));

      return star;
    }

    return Array.from({ length: 5 }, createStar);
  }

  resetRating() {
    this.currentRatingValue = this.getAttribute('data-rating') || 0;
    this.highlightRating();
  }

  setRating(event) {
    this.setAttribute('data-rating', event.currentTarget.getAttribute('data-value'));
  }

  ratingHover(event) {
    this.currentRatingValue = event.currentTarget.getAttribute('data-value');
    this.highlightRating();
  }

  highlightRating() {
    this.stars.forEach(star => {
      if (this.currentRatingValue >= this.stars.indexOf(star) + 1) { // star.getAttribute('data-value')
        star.style.color = 'yellow';
      } else {
        star.style.color = 'gray';
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

        transition: color 0.35s;
      }

      .star:hover {
        color: darkgray;
      }
    `;
    return style;
  }

}

customElements.define('star-rater', StarRater);
