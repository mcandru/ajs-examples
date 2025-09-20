// Sequentially calling promises
console.log("Starting to load images with promises sequentially...");

const getImagesAsync = async () => {
  const img1 = await loadImagePromise("https://picsum.photos/200/200?random=1");
  const img2 = await loadImagePromise("https://picsum.photos/200/200?random=2");
  const img3 = await loadImagePromise("https://picsum.photos/200/200?random=3");
  const img4 = await loadImagePromise("https://picsum.photos/200/200?random=4");

  console.log("All images are loaded with async/await sequentially!");
};

getImagesAsync();

const getImagesAsyncInParallel = async () => {
  const images = await Promise.all([
    loadImagePromise("https://picsum.photos/200/200?random=1"),
    loadImagePromise("https://picsum.photos/200/200?random=2"),
    loadImagePromise("https://picsum.photos/200/200?random=3"),
    loadImagePromise("https://picsum.photos/200/200?random=4"),
  ]);

  console.log("All images are loaded with async/await in parallel!");
};

getImagesAsyncInParallel();
