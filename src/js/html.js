import i18n from "i18next"
import resources from "../locales/index.js"

export default function(lng){
   const newInstance = i18n.createInstance()
   newInstance.init({
      lng,
      resources,
      debug:false
   }, err => {
      if(err) console.log(err)
   })
   return `
 <section class="container-fluid bg-dark p-5">
   <div class="row">
     <div class="col-md-10 col-lg-8 mx-auto text-white">
       <h1 class="display-3 mb-0">${newInstance.t("headerH1")}</h1>
       <p class="lead">${newInstance.t("leadP")}</p>
       <form action class="rss-form text-body">
         <div class="row">
           <div class="col">
             <div class="form-floating">
               <input id="url-input" autofocus="" required="" name="url" aria-label="url" class="form-control w-100"
                 placeholder="${newInstance.t("inputRssPlaceholder")}" autocomplete="off">
               <label for="url-input">${newInstance.t("inputRssPlaceholder")}</label>
             </div>
           </div>
           <div class="col-auto">
             <button type="submit" aria-label="add" class="h-100 btn btn-lg btn-primary px-sm-5">${newInstance.t("btnAdd")}</button>
           </div>
         </div>
       </form>
       <p class="mt-2 mb-0 text-muted">${newInstance.t("example")}</p>
       <p class="feedback m-0 position-absolute small text-danger"></p>
     </div>
   </div>
 </section>`
}