const loadImage = (url, callback) => {
  const img = new Image();

  img.onload = () => callback(null, img);

  img.onerror = function () {
    callback(new Error("Could not load image at " + url));
  };

  img.src = url;
};

console.log("Starting to load images...");

// Logs to the console once all images have loaded

// Image 1
loadImage("https://picsum.photos/200/200?random=1", (err, img1) => {
  if (err) throw err;
  // Image 2
  loadImage("https://picsum.photos/200/200?random=2", (err, img2) => {
    if (err) throw err;
    // Image 3
    loadImage("https://picsum.photos/200/200?random=3", (err, img3) => {
      if (err) throw err;
      // Image 4
      loadImage("https://picsum.photos/200/200?random=4", (err, img4) => {
        console.log("All images loaded!");
      });
    });
  });
});
