const msgTextBox = document.querySelector("#message");
const msgTextCharNotif = document.querySelector("#remaining");
const maxLength = 255;

if (msgTextCharNotif) {
  msgTextCharNotif.textContent = maxLength;
  msgTextCharNotif.style.color = "green";

  msgTextBox.addEventListener("keyup", (event) => {
    const remaining = maxLength - event.target.value.length;
    msgTextCharNotif.textContent = `${remaining}`;
    if (remaining <= 0) {
      msgTextCharNotif.style.color = "darkred"; // Maxed out in text content.
    } else if (remaining > 0 && remaining <= 100) {
      msgTextCharNotif.style.color = "crimson"; // First-degree of 'red', denotes approaching end of limit.
    } else if (remaining > 100 && remaining <= 175) {
      msgTextCharNotif.style.color = "#B8860B"; // yellow-orangeish color in dark mode.
    } else {
      msgTextCharNotif.style.color = "green"; // Obviously, it's black. (/s, it's green! XD)
    }
    if (event.target.value.length > maxLength) {
      event.target.value = event.target.value.slice(0, maxLength);
    }
  });
}
