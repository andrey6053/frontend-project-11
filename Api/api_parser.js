const Parser = require('rss-parser');

const parser = new Parser();

export default function pars(data) {
  return parser.parseString(data);
}
