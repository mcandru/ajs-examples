const { mock } = require("./mocker.js");

mock("fs", { test: "test" });

const fs = require("fs");
console.log(fs);
