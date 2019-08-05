const fs = require('fs');
const path = require('path');
const regex1 = /(<a href="([a-z0-9\\\.]+)index.html">All files<\/a>)/gmi;
const regex2 = / All files/gmi;
const subst1 = `<a href="..\\$2">E.W.O. Next</a> / $1`;
const subst2 = `<a href="..">E.W.O. Next</a> / All files`;


function alterFileHeader(file) {
  const content = fs.readFileSync(file, { encoding: "utf8" });
  if (regex1.test(content)) {
    const result = content.replace(regex1, subst1);
    fs.writeFileSync(file, result);
  } else {
    const result = content.replace(regex2, subst2);
    fs.writeFileSync(file, result);
  }

}

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
        alterFileHeader(path.join(targetFolder, file))
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