button.addEventListener("click", async () => {
  const prompt = input.value.trim();
  if (!prompt) return;

  button.disabled = true;
  result.style.display = "block";
  result.textContent = "Analyzing...";

  chrome.runtime.sendMessage({ action: "getSummary", prompt }, (response) => {
    if (response.success) {
      result.textContent = response.data;
    } else {
      result.textContent = "Error: " + response.data;
    }
    button.disabled = false;
  });
});
