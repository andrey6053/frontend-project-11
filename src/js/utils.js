import state from '../../state/state';
import watchState from './view';

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
    if (newPosts.length !== 0) {
      watchState.dataMain.posts.push(...newPosts);
      toggleEvent();
    }
  }
}

export default renderFeedAndPosts;
