var ix;
class PredictiveSearch extends HTMLElement {
  constructor() {
    super();

    this.input = this.querySelector('input[type="search"]');
    this.predictiveSearchResults = this.querySelector('#predictive-search');

    this.input.addEventListener('input', this.debounce((event) => {
      this.onChange(event);
    }, 300).bind(this));
  }

  onChange() {
    const searchTerm = this.input.value.trim();

    if (!searchTerm.length) {
      this.close();
      return;
    }

    this.getSearchResults(searchTerm);
  }

  getSearchResults(searchTerm) {
    fetch(`/search/suggest?q=${searchTerm}&resources[type]=product&resources[limit]=10&section_id=predictive-search`)
      .then((response) => {
        

        return response.text();
      })
      .then((text) => {
        let searchresult =document.querySelector('#shopify-section-predictive-search')
        const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelector('#shopify-section-predictive-search').innerHTML;
       // resultsMarkup.querySelector('li').innerHTML = "blue";
         searchresult.style.display = 'none';
          searchresult.innerHTML = resultsMarkup;
        const notinCollection = document.querySelectorall('li.c3po')
        console.log(notinCollection)
        	//this.predictiveSearchResults.innerHTML = resultsMarkup;
       // this.open();
      })
      .catch((error) => {
       console.log(error)
      });
  }

  open() {
    this.predictiveSearchResults.style.display = 'block';
  }

  close() {
    this.predictiveSearchResults.style.display = 'none';
  }

  debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }
}

customElements.define('predictive-search', PredictiveSearch);
