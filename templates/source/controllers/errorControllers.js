const error404 = (req, res) => {
  let error = new Error(),
      locals = {
        title: 'error 404',
        description: 'Page not found',
        error,
      }
  error.status = 404;
  res.render('error', locals);
}

module.exports = {
  error404,
}