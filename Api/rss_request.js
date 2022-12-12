import axios from 'axios';
import parserRss from './api_parser.js';
import { watchStateData } from '../src/js/view.js';

const reqToRss = (url) => {
  axios.get(url)
    .then((data) => {
      parserRss(data.data)
        .then(((parsedData) => {
          watchStateData.dataMain.feeds.push(parsedData);
          watchStateData.dataMain.posts.push(...parsedData.items);
        }))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

export default reqToRss;
