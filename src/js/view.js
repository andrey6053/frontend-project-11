import onChange from 'on-change';
import i18n from 'i18next';
import state from '../../state/state';
import resources from '../locales/index';

const errorHandler = (value) => {
  const newInstance = i18n.createInstance();
  newInstance.init({
    lng: state.lng,
    resources,
    debug: false,
  }, (err) => {
    if (err) console.log(err);
  });
  const input = document.querySelector('.form-control');
  const p = document.querySelector('.feedback');
  switch (value) {
    case ('invalid-fids'): { p.textContent = newInstance.t('errorExist'); input.classList.add('is-invalid'); p.classList.replace('text-success', 'text-danger'); break; }
    case ('invalidUrl'): { p.textContent = newInstance.t('errorValid'); input.classList.add('is-invalid'); p.classList.replace('text-success', 'text-danger'); break; }
    case ('invalidNetwork'): { p.textContent = newInstance.t('errorNetwork'); input.classList.add('is-invalid'); p.classList.replace('text-success', 'text-danger'); break; }
    case ('valid'): { input.classList.remove('is-invalid'); input.focus(); input.value = ''; p.textContent = ''; break; }
    case ('validDownloaded'): { p.textContent = newInstance.t('accessDown'); input.value = ''; p.classList.replace('text-danger', 'text-success'); break; }
    default: break;
  }
};

const showModal = (value) => {
  const modal = document.querySelector('.modal');
  switch (value) {
    case (true): {
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.removeAttribute('aria-hidden');
      modal.setAttribute('aria-modal', true);
      break;
    }
    case (false): { modal.classList.remove('show'); modal.style.display = 'none'; modal.setAttribute('aria-hidden', true); modal.removeAttribute('aria-modal'); break; }
    default: break;
  }
};

const disableTags = (value) => {
  const input = document.querySelector('.form-control');
  const btnSubmitForm = document.querySelector("[aria-label='add']");
  switch (value) {
    case ('sended'): { input.readOnly = true; btnSubmitForm.disabled = true; break; }
    case ('filling'): { input.readOnly = false; btnSubmitForm.disabled = false; break; }
    default: break;
  }
};

const renderModal = (value) => {
  const title = document.querySelector('.modal-title');
  const link = document.querySelector('.full-article');
  const body = document.querySelector('.modal-body');
  const linkPost = document.querySelector(`.fw-bold[href='${value.link}']`);
  if (linkPost !== null) {
    linkPost.classList.remove('fw-bold');
    linkPost.classList.add('fw-normal', 'link-secondary');
  }
  title.textContent = value.title;
  body.textContent = value.content;
  link.href = value.link;
};

const postsFill = (value) => {
  const posts = document.querySelector('.posts');
  posts.innerHTML = `<div class='card border-0'>
  <div class="card-body"><h2 class="card-title h4">Посты</h2></div>
  <ul class='list-group border-0 rounded-0'>
     ${value.map((el) => `
     <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
     <a href="${el.link}" class="fw-bold" data-id="2" target="_blank" rel="noopener noreferrer">
     ${el.title}</a>
     <button type="button" class="btn btn-outline-primary btn-sm" data-id="2" data-bs-toggle="modal" data-bs-target="#modal">Просмотр</button>
     </li>`).join('')}
  </ul>
</div>
`;
};

const feedsFill = (value) => {
  const feeds = document.querySelector('.feeds');
  feeds.innerHTML = `<div class='card border-0'>
  <div class="card-body"><h2 class="card-title h4">Фиды</h2></div>
  <ul class="list-group border-0 rounded-0">${value.map((el) => `<li class="list-group-item border-0 border-end-0"><h3 class="h6 m-0">${el.title}</h3>
     <p class="m-0 small text-black-50">${el.description}</p>`).join('')}
     </li>
  </ul>
  </div>
  `;
};

const watchState = onChange(state, (path, value) => {
  switch (path) {
    case ('dataMain.posts'): postsFill(value); break;
    case ('dataMain.feeds'): feedsFill(value); break;
    case ('formRssState.error'): errorHandler(value); break;
    case ('formRssState.state'): disableTags(value); break;
    case ('formRssState.isModal'): showModal(value); break;
    case ('formRssState.modalPost'): renderModal(value); break;
    default: break;
  }
});

export function html() {
  const newInstance = i18n.createInstance();
  newInstance.init({
    lng: state.lng,
    resources,
    debug: false,
  }, (err) => {
    if (err) console.log(err);
  });
  return `
 <section class="container-fluid bg-dark p-5">
   <div class="row">
     <div class="col-md-10 col-lg-8 mx-auto text-white">
       <h1 class="display-3 mb-0">${newInstance.t('headerH1')}</h1>
       <p class="lead">${newInstance.t('leadP')}</p>
       <form action class="rss-form text-body">
         <div class="row">
           <div class="col">
             <div class="form-floating">
               <input id="url-input" autofocus="" required="" name="url" aria-label="url" class="form-control w-100"
                 placeholder="${newInstance.t('inputRssPlaceholder')}" autocomplete="off">
               <label for="url-input">${newInstance.t('inputRssPlaceholder')}</label>
             </div>
           </div>
           <div class="col-auto">
             <button type="submit" aria-label="add" class="h-100 btn btn-lg btn-primary px-sm-5">${newInstance.t('btnAdd')}</button>
           </div>
         </div>
       </form>
       <p class="mt-2 mb-0 text-muted">${newInstance.t('example')}</p>
       <p class="feedback m-0 position-absolute small text-danger"></p>
     </div>
   </div>
 </section>
 <section class="container-fluid container-xxl p-5">
   <div class="row"><div class="col-md-10 col-lg-8 order-1 mx-auto posts"></div>
   <div class="col-md-10 col-lg-4 mx-auto order-0 order-lg-1 feeds"></div></div>
 </section>
 `;
}

export default watchState;
