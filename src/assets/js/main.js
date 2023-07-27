const modal = (options) => {
  const defaultOptions = {
    contentSelector: '',
    headerText: '',
    modalId: '',
    buttonToShowSelector: '',
    containerClickingOutside: false,
  };
  const finalOptions = Object.assign(defaultOptions, options);
  const { body } = document;

  function removeOriginalContent() {
    document.querySelector(finalOptions.contentSelector).remove();
  }

  function getContent() {
    const content = document.querySelector(finalOptions.contentSelector);
    const modalIdTemplate = '{{modalId}}';
    const modalHeaderTemplate = '{{modalHeader}}';
    const modalContentTemplate = '{{modalContent}}';
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
      const template = document.createElement('template');
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
    const scriptElements = document.querySelectorAll('body script');
    const currentScript = scriptElements[scriptElements.length - scriptElements.length];
    currentScript.parentNode.insertBefore(modalElementContainer, currentScript);
    return modalElementContainer;
  }

  function initActions(modalElement) {
    const closeButton = modalElement.querySelector('.modal__close button');
    const goOutButton = modalElement.querySelector('.modal__go-out button');

    const hide = (event) => {
      event && event.preventDefault();
      modalElement.classList.remove('visible');
      body.classList.remove('modal__visible');

      const forms = document.querySelectorAll('form');
      if (forms) {
        forms.forEach((form) => {
          form.reset();
        });

        forms.forEach((form) => {
          form.querySelectorAll('.input__field').forEach((element) => {
            element.classList.remove('input__field_error');
          });
        });

        forms.forEach((form) => {
          form.querySelectorAll('.input__error').forEach((element) => {
            element.classList.remove('input__error_show');
          });
        });

        forms.forEach((form) => {
          form.querySelectorAll('.password-checker__list').forEach((element) => {
            element
              .querySelectorAll('.password-checker__item')
              .forEach((element) => {
                element.classList.remove('text-red');
                element.classList.remove('text-green');
                element
                  .querySelectorAll('.password-checker__icon')
                  .forEach((element) => {
                    element.classList.remove('password-checker__icon_ok');
                    element.classList.remove('password-checker__icon_error');
                  });
              });
          });
        });
      }
    };

    const show = (event) => {
      event && event.preventDefault();
      modalElement.classList.add('visible');
      body.classList.add('modal__visible');
    };

    closeButton.addEventListener('click', (event) => {
      hide(event);
    });

    goOutButton
          && goOutButton.addEventListener('click', (event) => {
            hide(event);
          });

    modalElement.addEventListener('click', (event) => {
      if (finalOptions.containerClickingOutside) {
        const isInsideModal = event.target.closest('.modal__container');

        if (isInsideModal) return;

        hide(event);
      }
    });

    body.addEventListener('keyup', (event) => {
      if (event.code === 'Escape') {
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

    showButton.addEventListener('click', (event) => {
      event.preventDefault();
      showCallback();
    });
  }

  const modalElementContainer = initModal();
  const actions = initActions(modalElementContainer);
  initShowButton(actions.show);

  return actions;
};

document.addEventListener('DOMContentLoaded', () => {
  function initModals() {
    const registrationModal = modal({
      contentSelector: '.registration',
      headerText: 'Регистрация',
      modalId: 'registration',
      buttonToShowSelector: '#registrationButton',
      containerClickingOutside: true,
    });

    const bioModal = modal({
      contentSelector: '.bio',
      headerText: 'Немного о вас',
      modalId: 'bio',
      buttonToShowSelector: '',
      containerClickingOutside: true,
    });

    const formRegistration = document.querySelector('#form-registration');
    const bioButton = document.querySelector('#finishButton');
    let request = {};

    formRegistration.addEventListener('submit', (event) => {
      event.preventDefault();
      request = {
        email: emailInput.value,
        nikname: nicknameInput.value,
        password: passwordAgenInput.value,
        checkbox: checkbox.value,
      };
      const jsonRequest = JSON.stringify(request);
      console.log(jsonRequest);
      registrationModal.hide(event);
      const registrationButton = document.querySelector('#registrationButton');
      registrationButton.classList.add('button_green');
      registrationButton.disabled = true;
      bioModal.show(event);
    });

    bioButton.addEventListener('click', (event) => {
      bioModal.hide(event);
    });

    const emailInput = document.querySelector('#email');
    const errorEmailElement = emailInput.nextElementSibling;
    const nicknameInput = document.querySelector('#nickname');
    const errorNicknameElement = nicknameInput.nextElementSibling;
    const passwordInput = document.querySelector('#password');
    const passwordChecker = document.querySelector('#password-checker');
    const passwordAgenInput = document.querySelector('#passwordAgain');
    const errorPasswordAgenElement = passwordAgenInput.nextElementSibling;
    const registrationButton = document.querySelector('#nextButton');
    const checkbox = document.querySelector('#checkbox');
    const regexRange = /^.{6,32}$/;
    const regexIsLetters = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d_]{3,40}$/;
    const regexIsNumber = /.*\d.*/;
    let lastEditPassword = '';
    let timeout = 0;

    function isRegistration() {
      if (
        emailInput.classList.contains('input__field_error')
            || emailInput.value.trim() === ''
      ) {
        registrationButton.disabled = true;
        return false;
      }

      if (
        nicknameInput.classList.contains('input__field_error')
            || nicknameInput.value.trim() === ''
      ) {
        registrationButton.disabled = true;
        return false;
      }

      if (
        passwordInput.classList.contains('input__field_error')
            || passwordInput.value.trim() === ''
      ) {
        registrationButton.disabled = true;
        return false;
      }

      if (
        passwordAgenInput.classList.contains('input__field_error')
            || passwordAgenInput.value.trim() === ''
      ) {
        registrationButton.disabled = true;
        return false;
      }
      if (!checkbox.checked) {
        registrationButton.disabled = true;
        return false;
      }

      registrationButton.disabled = false;
      return true;
    }

    function errorAction(error, errorElement, element, message = '') {
      if (error) {
        errorElement.textContent = message;
        errorElement.setAttribute('aria-hidden', 'false');
        errorElement.classList.add('input__error_show');
        element.classList.add('input__field_error');
      } else {
        errorElement.textContent = '';
        errorElement.setAttribute('aria-hidden', 'true');
        errorElement.classList.remove('input__error_show');
        element.classList.remove('input__field_error');
      }
    }

    function validate(inputElement, errorElement, regex, message = '') {
      const inputValue = inputElement.value;
      const isValid = regex.test(inputValue);
      errorAction(!isValid, errorElement, inputElement, message);
    }

    function validatePasswordAgen(
      password,
      passwordAgen,
      inputElement,
      errorElement,
      message = '',
    ) {
      const isValid = passwordAgen && password === passwordAgen;
      errorAction(!isValid, errorElement, inputElement, message);
    }

    function validationPassword(inputElement, ruleElement) {
      const inputValue = inputElement.value;
      const ruleElementArray = ruleElement.querySelectorAll('.password-checker__item');
      const errorElementPassword = document.querySelector('#input-error-password');

      if (inputValue === nicknameInput.value) {
        updateRuleState(ruleElementArray, inputElement, 1, 0);
        updateRuleState(ruleElementArray, inputElement, 1, 1);
        updateRuleState(ruleElementArray, inputElement, 1, 2);
        errorElementPassword.classList.add('input__error_show');
        errorElementPassword.textContent = 'Ник не должен совпадать с паролем';
        return;
      }
      updateRuleState(ruleElementArray, inputElement, -1, 0);
      updateRuleState(ruleElementArray, inputElement, -1, 1);
      updateRuleState(ruleElementArray, inputElement, -1, 2);
      errorElementPassword.classList.remove('input__error_show');
      errorElementPassword.textContent = '';

      function updateRuleState(ruleElementArray, inputElement, validState, index) {
        switch (validState) {
          case 0: {
            ruleElementArray[index].classList.remove('text-red');
            ruleElementArray[index].classList.add('text-green');
            ruleElementArray[index]
              .querySelector('.password-checker__icon')
              .classList.add('password-checker__icon_ok');
            ruleElementArray[index]
              .querySelector('.password-checker__icon')
              .classList.remove('password-checker__icon_error');
            ruleElementArray[index].classList.remove('input__field_error');
            inputElement.classList.remove('input__field_error');
            break;
          }

          case 1: {
            ruleElementArray[index].classList.remove('text-green');
            ruleElementArray[index].classList.add('text-red');
            ruleElementArray[index]
              .querySelector('.password-checker__icon')
              .classList.add('password-checker__icon_error');
            ruleElementArray[index]
              .querySelector('.password-checker__icon')
              .classList.remove('password-checker__icon_ok');
            ruleElementArray[index].classList.add('input__field_error');
            inputElement.classList.add('input__field_error');
            break;
          }

          default: {
            ruleElementArray[index].classList.remove('text-red');
            ruleElementArray[index].classList.remove('text-green');
            ruleElementArray[index]
              .querySelector('.password-checker__icon')
              .classList.remove('password-checker__icon_ok');
            ruleElementArray[index]
              .querySelector('.password-checker__icon')
              .classList.remove('password-checker__icon_error');
            inputElement.classList.remove('input__field_error');
            break;
          }
        }
      }

      if (regexRange.test(inputValue)) {
        updateRuleState(ruleElementArray, inputElement, 0, 0);
      } else if (inputValue.length < lastEditPassword.length) {
        updateRuleState(ruleElementArray, inputElement, 1, 0);
      } else {
        updateRuleState(ruleElementArray, inputElement, -1, 0);
      }

      if (regexIsNumber.test(inputValue)) {
        updateRuleState(ruleElementArray, inputElement, 0, 1);
      } else if (inputValue.length < lastEditPassword.length) {
        updateRuleState(ruleElementArray, inputElement, 1, 1);
      } else {
        updateRuleState(ruleElementArray, inputElement, -1, 1);
      }

      if (regexIsLetters.test(inputValue)) {
        updateRuleState(ruleElementArray, inputElement, 0, 2);
      } else if (inputValue.length < lastEditPassword.length) {
        updateRuleState(ruleElementArray, inputElement, 1, 2);
      } else {
        updateRuleState(ruleElementArray, inputElement, -1, 2);
      }
      lastEditPassword = inputValue;
    }

    emailInput.addEventListener('input', () => {
      const regex = /\S+@\S+\.\S+/;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        validate(emailInput, errorEmailElement, regex, 'Не корректный e-mail адрес.');
        isRegistration();
      }, 1000);
    });

    nicknameInput.addEventListener('input', () => {
      const regex = /^(?=[a-zA-Z])[a-zA-Z0-9_]{3,40}$/;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        validate(
          nicknameInput,
          errorNicknameElement,
          regex,
          'Никнейми должен содержать от 3 до 40 символов, латинские буквы, нижнее подчёркивание.',
        );
        isRegistration();
      }, 1000);
    });

    passwordAgenInput.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        validatePasswordAgen(
          passwordInput.value,
          passwordAgenInput.value,
          passwordAgenInput,
          errorPasswordAgenElement,
          'Пароль должен совпадать.',
        );
        isRegistration();
      }, 1000);
    });

    passwordInput.addEventListener('input', () => {
      validationPassword(passwordInput, passwordChecker);
      if (passwordAgenInput.value.length > 0) {
        validatePasswordAgen(
          passwordInput.value,
          passwordAgenInput.value,
          passwordAgenInput,
          errorPasswordAgenElement,
          'Пароль должен совпадать.',
        );
        isRegistration();
      }
    });

    checkbox.addEventListener('change', () => {
      isRegistration();
    });
  }

  initModals();
});
