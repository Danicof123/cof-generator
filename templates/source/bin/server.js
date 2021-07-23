const app = require('../app')

app.listen(app.get('port'), () => console.info('server on http://127.0.0.1:%d',app.get('port')));