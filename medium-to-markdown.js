const mediumToMarkdown = require('medium-to-markdown');
 
// Enter url here
mediumToMarkdown.convertFromUrl('https://medium.com/@kshitij.mamgain/interest-rates-forecasting-using-stochastic-differential-equations-7d5d91e5d65c')
.then(function (markdown) {
  console.log(markdown); //=> Markdown content of medium post
});