const form = document.getElementById("uploadForm");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  resultDiv.textContent = "Uploading...";

  const response = await fetch("/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  resultDiv.innerHTML = ""; // Clear previous content

  const img = document.createElement("img");
  img.src = data.filePath;
  img.alt = data.originalName;
  img.width = 200;

  resultDiv.append(img);
  form.reset();
});
