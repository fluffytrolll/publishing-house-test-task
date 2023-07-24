document.addEventListener("DOMContentLoaded", function () {
   document
      .querySelector("form__registration")
      .addEventListener("submit", function (event) {
         event.preventDefault();

         const form = event.target;
         const email = form.elements.email.value;
         const nickname = form.elements.nickname.value;
         const password = form.elements.password.value;
         const confirmPassword = form.elements.confirm_password.value;
      });

   document.querySelector("form__bio").addEventListener("submit", function (event) {
      event.preventDefault();

      const form = event.target;
      const gender = form.elements.genger.value;
      const textareaValue = form.elements.textarea.value;
      const education = form.elements.education.value;
      const favoriteTopics = [];
      const checkboxes = form.querySelectorAll("input[type='checkbox']");
      checkboxes.forEach((checkbox) => {
         if (checkbox.checked) {
            favoriteTopics.push(checkbox.nextElementSibling.textContent.trim());
         }
      });
   });
});
