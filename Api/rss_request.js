import axios from 'axios';
import parserRss from './api_parser';
import watchState from '../src/js/view';
import { accessDownload, renderFeedAndPosts } from '../src/js/index';

const reqToRss = async (url) => {
  axios.get(`https://allorigins.hexlet.app/get?disableCache=true&charset=utf-8&url=${url}`)
    .then((response) => {
      parserRss(response.data.contents)
        .then((parsedData) => renderFeedAndPosts(parsedData, url))
        .catch((err) => { watchState.formRssState.error = 'invalidNetwork'; console.log(err); });
    })
    .then(() => accessDownload())
    .catch((err) => { watchState.formRssState.error = 'invalidNetwork'; console.log(err); });
};

export default reqToRss;
