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
          const urlArr = result.inputValue.split('.');
          if (urlArr[urlArr.length - 1] !== 'rss') { watchState.formRssState.error = 'invalidUrlRss'; return; }
          if (fids.join(',').includes(result.inputValue)) { watchState.formRssState.error = 'invalid-fids'; return; }
          watchState.formRssState.error = 'valid';
          watchState.formRssState.state = 'sended';
          reqToRss(result.inputValue);
        },
        () => { watchState.formRssState.error = 'invalidUrl'; },
      );
  });
}

export default app;
