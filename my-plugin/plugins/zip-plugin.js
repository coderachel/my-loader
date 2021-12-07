const JSzip = require("jszip");
const zip = new JSzip();
const RawSource = require("webpack-sources").RawSource;
const path = require("path");
module.exports = class ZipPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync("ZipPlugin", (compilation, callback) => {
      const foler = zip.folder(this.options.filename);
      for (let filename in compilation.assets) {
        const source = compilation.assets[filename].source();
        foler.file(filename, source);
      }

      zip
        .generateAsync({
          type: "nodebuffer",
        })
        .then((content) => {
          const outputPath = path.join(
            compilation.options.output.path,
            this.options.filename + ".zip"
          );
          const outputRelativePath = path.relative(
            compilation.options.output.path,
            outputPath
          );

          compilation.assets[outputRelativePath] = new RawSource(content);
          callback();
        });
    });
  }
};
