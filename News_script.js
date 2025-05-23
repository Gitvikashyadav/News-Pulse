const Api_key = "f9a850128ef84dde9e0794fae855f185";
const api = "F41u38k03rijq-uHERJH6eEFHa93EahCN09xhYnWmLTAYV0-";
const url = "https://newsapi.org/v2/everything?q=";
const url2 = "https://api.currentsapi.services/v1/latest-news?";
const url3="https://content.guardianapis.com/search?";
const api3="10882b1e-03cd-4fe4-982d-bef75fb5d269";
window.addEventListener("load", () => fetchNews("India"));

function reload() {
  window.location.reload();
  fetchNews("India");
}

async function fetchNews(query) {
  const res = await fetch(`${url3}${query}&apiKey=${api3}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);

    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;
  const date = new Date(article.publishedAt).toLocaleDateString("en-us", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name}.${date}`;
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}
let curSelectedNav = null;

function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query2 = searchText.value;
  if (!query2) return;
  fetchNews(query2);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
