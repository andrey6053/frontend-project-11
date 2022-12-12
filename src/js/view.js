import onChange from 'on-change';
import i18n from 'i18next';
import state from '../../state/state.js';
import resources from '../locales/index.js';

const watchValidForm = onChange(state, (path, value) => {
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
  if (value === 'invalid-fids') { p.textContent = newInstance.t('errorExist'); return input.classList.add('is-invalid'); }
  if (value !== 'valid' && path === 'formRssState.valid') { p.textContent = newInstance.t('errorValid'); return input.classList.add('is-invalid'); }
  input.classList.remove('is-invalid');
  input.focus();
  input.value = '';
  p.textContent = '';
});

const watchStateData = onChange(state, (path, value) => {
  const posts = document.querySelector('.posts');
  const feeds = document.querySelector('.feeds');
  if (path === 'dataMain.posts') {
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
  } else {
    feeds.innerHTML = `<div class='card border-0'>
      <div class="card-body"><h2 class="card-title h4">Фиды</h2></div>
      <ul class="list-group border-0 rounded-0">${value.map((el) => `<li class="list-group-item border-0 border-end-0"><h3 class="h6 m-0">${el.title}</h3>
         <p class="m-0 small text-black-50">${el.description}</p>`).join('')}
         </li>
      </ul>
      </div>
      `;
  }
});

export { watchValidForm, watchStateData };
