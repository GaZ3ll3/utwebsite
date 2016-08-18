var config = [
  { left: '$$', right: '$$', display: true  },
  { left: '$',  right: '$',  display: false }
]
var articles = document.querySelectorAll('article.post-content');
for (var i = 0; i < articles.length; i++) {
  renderMathInElement(articles.item(i), { delimiters: config });
}
