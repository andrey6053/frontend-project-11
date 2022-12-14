import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import state from '../../state/state';
import watchState, { html } from './view';
import reqToRss from '../../Api/rss_request';

const userSchema = yup.object({
  inputValue: yup.string().url().required(),
});

const render = () => {
  const container = document.querySelector('.flex-grow-1');
  container.innerHTML = html();
};

function toggleEvent() {
  const showModal = (e) => {
    e.preventDefault();
    const { target } = e;
    const linkPrevElem = target.previousElementSibling;
    const modalPost = state.dataMain.posts.filter((post) => post.link === linkPrevElem.href);
    const { content, title, link } = modalPost[0];
    watchState.formRssState.modalPost = { content, title, link };
    watchState.formRssState.isModal = true;
  };
  const hideModal = (e) => {
    e.preventDefault();
    watchState.formRssState.isModal = false;
  };
  const btnShowModal = document.querySelectorAll('[data-bs-target="#modal"]');
  const btnHideModal = document.querySelectorAll("[data-bs-dismiss='modal']");
  btnHideModal.forEach((el) => el.removeEventListener('click', hideModal));
  btnShowModal.forEach((el) => el.removeEventListener('click', showModal));
  btnHideModal.forEach((el) => el.addEventListener('click', hideModal));
  btnShowModal.forEach((el) => el.addEventListener('click', showModal));
}

function renderFeedAndPosts(parsedData, url) {
  if (!state.formRssState.fids.join(',').includes(url)) {
    watchState.dataMain.feeds.push(parsedData);
    watchState.dataMain.posts.push(...parsedData.items);
    watchState.formRssState.fids.push(url);
    toggleEvent();
  } else {
    const newPosts = state.dataMain.posts.filter((el) => {
      parsedData.items.map((elem) => el.link !== elem.link);
    });
    console.log('Обновление постов');
    if (newPosts.length !== 0) {
      watchState.dataMain.posts.push(...newPosts);
      toggleEvent();
    }
  }
}

function accessDownload() {
  watchState.formRssState.error = 'validDownloaded';
  watchState.formRssState.state = 'filling';
  watchState.formRssState.data.inputValue = '';
  setTimeout(() => {
    setTimeout(() => {
      state.formRssState.fids.map((el) => reqToRss(el));
    }, 5000);
  });
}

function app() {
  render();
  const btnSubmitForm = document.querySelector("[aria-label='add']");
  const input = document.querySelector('.form-control');
  const { fids } = state.formRssState;
  input.addEventListener('input', (e) => {
    state.formRssState.data.inputValue = e.target.value;
  });
  btnSubmitForm.addEventListener('click', (e) => {
    e.preventDefault();
    userSchema.validate(state.formRssState.data)
      .then(
        (result) => {
          if (fids.join(',').includes(result.inputValue)) return watchState.formRssState.error = 'invalid-fids';
          watchState.formRssState.error = 'valid';
          watchState.formRssState.state = 'sended';
          reqToRss(result.inputValue);
        },
        () => watchState.formRssState.error = 'invalidUrl',
      );
  });
}

export { renderFeedAndPosts, accessDownload };
export default app;
