const Fs = require("fs");
const Path = require("path");
const Sass = require("node-sass");

const getComponents = () => {
  let allComponents = [];

  const types = ["atoms", "molecules"];

  types.forEach((type) => {
    const allFiles = Fs.readdirSync(`src/${type}`).map((file) => {
      if(!/scss$/.test(file.slice(-4))) return;

      return {
        input: `src/${type}/${file}`,
        output: `lib/${file.slice(0, -4) + "css"}`,
      };
    });

    allComponents = [...allComponents, ...allFiles.filter(Boolean)];
  });

  return allComponents;
};

const compile = (origin, output) => {
  const result = Sass.renderSync({
    data: Fs.readFileSync(Path.resolve(origin)).toString(),
    outputStyle: "expanded",
    includePaths: [Path.resolve("src")],
  });

  Fs.writeFileSync(Path.resolve(output), result.css.toString());
};

try {
  Fs.mkdirSync(Path.resolve('lib'))
} catch(e) {}

compile('src/global.scss', 'lib/global.css')

getComponents().forEach(component => {
  compile(component.input, component.output)
})
