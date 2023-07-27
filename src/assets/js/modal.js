const modal = (options) => {
   const defaultOptions = {
      contentSelector: "",
      headerText: "",
      modalId: "",
      buttonToShowSelector: "",
      containerClickingOutside: false,
   };
   const finalOptions = Object.assign(defaultOptions, options);
   const body = document.body;

   function removeOriginalContent() {
      document.querySelector(finalOptions.contentSelector).remove();
   }

   function getContent() {
      const content = document.querySelector(finalOptions.contentSelector);
      const modalIdTemplate = "{{modalId}}";
      const modalHeaderTemplate = "{{modalHeader}}";
      const modalContentTemplate = "{{modalContent}}";
      const template = `
      <div class="modal" id='{{modalId}}'>
          <div class="modal__container">
              <div class="modal__body">
                  <h2 class="modal__header">{{modalHeader}}</h2>
                  <div class="modal__close">
                    <button class="icon-button closeButton" type="button" aria-label="Закрыть форму">
                      <svg
                        class="icon-button__icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M24.38 22.26a1 1 0 0 1 0 1.42l-.7.7a1 1 0 0 1-1.42 0l-6.71-6.71-6.72 6.71a1 1 0 0 1-1.42 0l-.7-.7a1 1 0 0 1 0-1.42l6.71-6.71-6.71-6.72a1 1 0 0 1 0-1.42l.7-.7a1 1 0 0 1 1.42 0l6.72 6.71 6.71-6.71a1 1 0 0 1 1.42 0l.7.7a1 1 0 0 1 0 1.42l-6.71 6.72 6.71 6.71Z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div class="modal__content">
                      {{modalContent}}
                  </div>
              </div>
          </div>
      </div>
      `;

      const htmlToElements = (html) => {
         const template = document.createElement("template");
         html = html.trim();
         template.innerHTML = html;
         return template.content.firstChild;
      };

      const getModalContent = () => {
         const templated = template
            .replace(modalIdTemplate, finalOptions.modalId)
            .replace(modalHeaderTemplate, finalOptions.headerText)
            .replace(modalContentTemplate, content.innerHTML);
         return htmlToElements(templated);
      };

      return getModalContent();
   }

   function initModal() {
      const modalElementContainer = getContent();
      removeOriginalContent();
      const scriptElements = document.querySelectorAll("body script");
      const currentScript = scriptElements[scriptElements.length - scriptElements.length];
      currentScript.parentNode.insertBefore(modalElementContainer, currentScript);
      return modalElementContainer;
   }

   function initActions(modalElement) {
      const closeButton = modalElement.querySelector(".modal__close button");
      const goOutButton = modalElement.querySelector(".modal__go-out button");

      const hide = (event) => {
         event && event.preventDefault();
         modalElement.classList.remove("visible");
         body.classList.remove("modal__visible");

         const forms = document.querySelectorAll("form");
         if (forms) {
            forms.forEach((form) => {
               form.reset();
            });

            forms.forEach((form) => {
               form.querySelectorAll(".input__field").forEach((element) => {
                  element.classList.remove("input__field_error");
               });
            });

            forms.forEach((form) => {
               form.querySelectorAll(".input__error").forEach((element) => {
                  element.classList.remove("input__error_show");
               });
            });

            forms.forEach((form) => {
               form.querySelectorAll(".password-checker__list").forEach((element) => {
                  element
                     .querySelectorAll(".password-checker__item")
                     .forEach((element) => {
                        element.classList.remove("text-red");
                        element.classList.remove("text-green");
                        element
                           .querySelectorAll(".password-checker__icon")
                           .forEach((element) => {
                              element.classList.remove("password-checker__icon_ok");
                              element.classList.remove("password-checker__icon_error");
                           });
                     });
               });
            });
         }
      };

      const show = (event) => {
         event && event.preventDefault();
         modalElement.classList.add("visible");
         body.classList.add("modal__visible");
      };

      closeButton.addEventListener("click", (event) => {
         hide(event);
      });

      goOutButton &&
         goOutButton.addEventListener("click", (event) => {
            hide(event);
         });

      modalElement.addEventListener("click", (event) => {
         if (finalOptions.containerClickingOutside) {
            const isInsideModal = event.target.closest(".modal__container");

            if (isInsideModal) return;

            hide(event);
         }
      });

      body.addEventListener("keyup", (event) => {
         if (event.code === "Escape") {
            hide(event);
         }
      });

      return {
         show,
         hide,
      };
   }

   function initShowButton(showCallback) {
      if (!finalOptions.buttonToShowSelector) return;

      const showButton = document.querySelector(finalOptions.buttonToShowSelector);

      showButton.addEventListener("click", (event) => {
         event.preventDefault();
         showCallback();
      });
   }

   const modalElementContainer = initModal();
   const actions = initActions(modalElementContainer);
   initShowButton(actions.show);

   return actions;
};
