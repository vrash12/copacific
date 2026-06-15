document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("[data-form]");

  forms.forEach((form) => {
    const message = form.querySelector("[data-form-message]");
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const endpoint = form.getAttribute("data-endpoint");

      if (!endpoint) {
        showMessage(message, "Form endpoint is missing. Please add data-endpoint to the form.", "error");
        return;
      }

      const requiredFields = form.querySelectorAll("[required]");
      let isValid = true;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          field.classList.add("has-error");
          isValid = false;
        } else {
          field.classList.remove("has-error");
        }
      });

      if (!isValid) {
        showMessage(message, "Please complete all required fields.", "error");
        return;
      }

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = "Sending...";
        }

        showMessage(message, "Sending your request...", "loading");

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error("Form submission failed.");
        }

        form.reset();

        showMessage(
          message,
          "Thank you. Your request has been sent successfully.",
          "success"
        );
      } catch (error) {
        showMessage(
          message,
          "Sorry, something went wrong. Please call 671 922 8508 or email copacificdistributors.gu@yahoo.com.",
          "error"
        );
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Submit Request";
        }
      }
    });
  });

  function showMessage(element, text, type) {
    if (!element) return;

    element.textContent = text;
    element.classList.add("is-visible");
    element.classList.remove("is-success", "is-error", "is-loading");

    if (type === "success") {
      element.classList.add("is-success");
    }

    if (type === "error") {
      element.classList.add("is-error");
    }

    if (type === "loading") {
      element.classList.add("is-loading");
    }
  }
});