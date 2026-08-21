const nunjucksToHTML = require('nunjucks-to-html');
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
var chokidar = require('chokidar');

const args = process.argv;

if (args.length < 3) {
  console.error("Argument Required e.g. build / clean / watch");
  return 1;
}

const arg = args[2];
console.log(arg);
switch (arg) {
  case "build": doBuild(); return;
  case "clean": cleanWebroot(); return;
  case "watch": watch(); return;
  default: console.error("Unknown argument");
}

async function watch() {
  await doWatch();
  
  var watcher = chokidar.watch("templates", {
    depth: 3, 
    ignoreInitial: true,
    persistent: true, 
    usePolling: true,
    interval: 100
  });
  watcher.on("all", () => doWatch());
}

async function doWatch() {
  await doBuild();
  console.log("Watching for template changes");
}

async function doBuild() {
  console.log("Starting Nunjucks to HTML conversion...")
  await nunjucksToHTML(['./*.njk', './pages/**/*.njk', '!./layout.njk'], {
    'config': 'nunjucks.config.js',
    'dest': 'webroot',
    'ext': '.html',
    'baseDir': './templates/',
    'cwd': process.cwd(),
    'flatten': false
  }).then((results) => {
    console.log("Nunjucks to HTML conversion completed.")
  })
    .catch((error) => {
      console.error("Error during Nunjucks to HTML conversion:", error);
    });
}

async function cleanWebroot() {
  try {
    const results = await glob('webroot/**/*.html');
    // [ 'webroot/file.html', 'webroot/file-2.html', 'webroot/file-3.html' ]

    results.forEach(file => {
      console.log("deleted : " + file);
      fs.unlinkSync(path.join(__dirname, file));
    });
  } catch (err) {
    console.log(err);
  }
}