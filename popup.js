document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("prompt");
  const button = document.getElementById("analyzeBtn");
  const result = document.getElementById("result");

  button.addEventListener("click", async () => {
    const prompt = input.value.trim();
    if (!prompt) return;

    button.disabled = true;
    result.style.display = "block";
    result.textContent = "Analyzing...";

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }]
        })
      });

      const data = await res.json();
      if (data.choices && data.choices.length > 0) {
        result.textContent = data.choices[0].message.content;
      } else {
        result.textContent = "No valid response from API.";
      }
    } catch (err) {
      console.error(err);
      result.textContent = "Error contacting server.";
    }

    button.disabled = false;
  });
});
