const app = require('../app')

app.listen(app.get('port'), () => console.info('servidor funcionando en http://127.0.0.1:%d',app.get('port')));