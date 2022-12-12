import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import state from '../../state/state.js';
import { watchValidForm } from './view.js';
import html from './html.js';
import reqToRss from '../../Api/rss_request.js';

const userSchema = yup.object({
  inputValue: yup.string().url().required(),
});

const render = () => {
  const container = document.querySelector('.flex-grow-1');
  container.innerHTML = html(state.lng);
};

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
    state.formRssState.errors = [];
    userSchema.validate(state.formRssState.data)
      .then(
        (result) => {
          if (fids.join(',').includes(result.inputValue)) return watchValidForm.formRssState.valid = 'invalid-fids';
          fids.push(result.inputValue);
          watchValidForm.formRssState.valid = 'valid';
          reqToRss(result.inputValue);
        },
        (error) => { state.formRssState.errors.push(error); watchValidForm.formRssState.valid = 'invalid'; },
      )
      .then(
        () => { state.formRssState.data.inputValue = ''; state.formRssState.valid = ''; },
      );
  });
}

app();
