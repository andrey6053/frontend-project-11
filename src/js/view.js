import onChange from "on-change"
import {state} from "./state/state.js"
import i18n from "i18next"
import resources from "../locales/index.js"

const watchValidForm = onChange(state,(path,value) => {
   const newInstance = i18n.createInstance()
   newInstance.init({
      lng:state.lng,
      resources,
      debug:false
   }, err => {
      if(err) console.log(err)
   })
   const input = document.querySelector(".form-control")
   const p = document.querySelector(".feedback")
   if (value === "invalid-fids") {p.textContent = newInstance.t("errorExist");return input.classList.add("is-invalid")}
   if (value !== "valid" && path==="formRssState.valid") {p.textContent = newInstance.t("errorValid");return input.classList.add("is-invalid")}
   input.classList.remove("is-invalid")
   input.focus()
   input.value = ""
   p.textContent = ""
})


export {watchValidForm}