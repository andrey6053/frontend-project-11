import 'bootstrap/dist/css/bootstrap.min.css';
import { state } from "./state/state.js"
import { watchValidForm } from './view.js';
import * as yup from "yup"
import _ from "lodash"
import html from "./html.js"

let userSchema = yup.object({
   inputValue: yup.string().url().required(),
})

const render = () => {
   const container = document.querySelector(".flex-grow-1")
   container.innerHTML = html(state.lng)
}


function app() {
   render()
   const btnSubmitForm = document.querySelector("[aria-label='add']")
   const input = document.querySelector(".form-control")
   const fids = state.formRssState.fids
   input.addEventListener("input", (e) => {
      state.formRssState.data.inputValue = e.target.value
   })
   btnSubmitForm.addEventListener("click", (e) => {
      e.preventDefault()
      state.formRssState.errors = []
      const stateValidate = new Promise(function () {
         const valid = userSchema.validate(state.formRssState.data)
            .then(
               result => { if (fids.join(",").includes(result.inputValue)) return watchValidForm.formRssState.valid = "invalid-fids";
               fids.push(result.inputValue); 
               watchValidForm.formRssState.valid = "valid"
            },
               error => {console.log(error);state.formRssState.errors.push(error); watchValidForm.formRssState.valid = "invalid" }
            )
            .then(
               () => { state.formRssState.data.inputValue = ""; state.formRssState.valid = "" }
            )
      })
   })
}

app()