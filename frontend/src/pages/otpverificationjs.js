document.addEventListener("DOMContentLoaded", function (event) {
  function OTPInput() {
    const inputs = document.querySelectorAll("#otp > *[id]");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("input", function (event) {
        if (event.inputType === "deleteContentBackward") {
          // Handle backspace
          if (i !== 0) inputs[i - 1].focus();
        } else {
          // Handle regular input
          this.value = event.data;

          if (i !== inputs.length - 1 && this.value !== "") {
            inputs[i + 1].focus();
          }
        }
      });

      // Handle the case where the user pastes a value
      inputs[i].addEventListener("paste", function (event) {
        event.preventDefault();
        const pastedData = event.clipboardData.getData("text");

        // Only paste the first character
        if (pastedData.length > 0) {
          this.value = pastedData[0];
          if (i !== inputs.length - 1) inputs[i + 1].focus();
        }
      });
    }
  }

  OTPInput();
});
