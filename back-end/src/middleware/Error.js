const StatusHttp = require('../utils/statusHttp');
const { errorsCatalog } = require('../utils/errorsCatalog');

const erros = (err, _req, res, _next) => {
  const mappedError = errorsCatalog[err.message];

  if (mappedError) {
    const { statusHttp, message } = mappedError;
    return res.status(statusHttp).json({ message });
  }

  const [code, message] = err.message.split('|');

  if (code && message) {
    return res.status(Number(code)).json({ message });
  }

  console.log(err);
  return res.status(StatusHttp.INTERNAL_ERROR)
    .json({ message: 'Internal server error' });
};

module.exports = erros;