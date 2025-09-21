const loadImagePromise = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);

    img.onerror = function () {
      reject("Failed to load image");
    };

    img.src = url;
  });
};

// Sequentially calling promises
console.log("Starting to load images with promises sequentially...");

loadImagePromise("https://picsum.photos/200/200?random=1")
  .then((img1) => loadImagePromise("https://picsum.photos/200/200?random=2"))
  .then((img2) => loadImagePromise("https://picsum.photos/200/200?random=3"))
  .then((img3) => loadImagePromise("https://picsum.photos/200/200?random=4"))
  .then((img4) =>
    console.log("All images are loaded with promises in sequence!")
  )
  .catch((err) => console.error(err));

// Calling promises in parallel
console.log("Starting to load images with promises in parallel...");

Promise.all([
  loadImagePromise("https://picsum.photos/200/200?random=1"),
  loadImagePromise("https://picsum.photos/200/200?random=2"),
  loadImagePromise("https://picsum.photos/200/200?random=3"),
  loadImagePromise("https://picsum.photos/200/200?random=4"),
])
  .then((images) =>
    console.log(`All images are loaded with promises in parallel!`)
  )
  .catch((err) => console.error(err));
