import axios from 'axios';
import parserRss from './api_parser';
import watchState from '../src/js/view';
import renderFeedAndPosts from '../src/js/utils';
import state from '../state/state';

const reqToRss = async (url) => {
  axios.get(`https://allorigins.hexlet.app/get?disableCache=true&charset=utf-8&url=${url}`)
    .then((response) => {
      parserRss(response.data.contents)
        .then((parsedData) => renderFeedAndPosts(parsedData, url))
        .catch((err) => { watchState.formRssState.error = 'invalidNetwork'; throw new Error(err); });
    })
    .then(() => {
      watchState.formRssState.error = 'validDownloaded';
      watchState.formRssState.state = 'filling';
      watchState.formRssState.data.inputValue = '';
      setTimeout(() => {
        setTimeout(() => {
          state.formRssState.fids.map((el) => reqToRss(el));
        }, 5000);
      });
    })
    .catch((err) => { watchState.formRssState.error = 'invalidNetwork'; throw new Error(err); });
};

export default reqToRss;
