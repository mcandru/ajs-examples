const loadImage = (url, callback) => {
  const img = new Image();

  img.onload = () => callback(img);

  img.src = url;
};

console.log("Starting to load images...");

// Logs to the console once all images have loaded

// Image 1
loadImage("https://picsum.photos/200/200?random=1", (img1) => {
  // Image 2
  loadImage("https://picsum.photos/200/200?random=2", (img2) => {
    // Image 3
    loadImage("https://picsum.photos/200/200?random=3", (img3) => {
      // Image 4
      loadImage("https://picsum.photos/200/200?random=4", (img4) => {
        console.log("All images loaded!");
      });
    });
  });
});
