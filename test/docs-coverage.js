const fs = require('fs');
const path = require('path');

function copyFileSync(source, target) {

  var targetFile = target;

  //if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
  var files = [];

  //check if folder needs to be created or integrated
  var targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  //copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}

function cleanDirectory(src) {
  if (fs.existsSync(src)) {
    fs.readdirSync(src).forEach(function (entry) {
      var entry_path = path.join(src, entry);
      if (fs.lstatSync(entry_path).isDirectory()) {
        cleanDirectory(entry_path);
      } else {
        fs.unlinkSync(entry_path);
      }
    });
    fs.rmdirSync(src);
  }
}

const src = path.resolve(__dirname, './lcov-report');
const destFolder = path.resolve(__dirname, '../docs/coverage');
const dest = path.resolve(__dirname, '../docs');

if (fs.existsSync(destFolder)) {
  cleanDirectory(destFolder);
}

copyFolderRecursiveSync(src, dest);
fs.renameSync(path.resolve(dest, './lcov-report'), path.resolve(dest, './coverage'));