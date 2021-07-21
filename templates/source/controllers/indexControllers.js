const home = (req, res) => {
  res.render('home', {title: 'CofGenerator'})
}

module.exports = {
  home,
}