import resolve from "@rollup/plugin-node-resolve";
import commonJs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import { name, homepage, version } from "./package.json";

const umdConf = {
  format: "iife",
  name: "leafletcontour",
  banner: `// Version ${version} ${name} - ${homepage}`,
};

export default {
  // UMD
  input: "src/leaflet_contour.js",
  output: [
    {
      ...umdConf,
      file: `dist/${name}.js`,
      sourcemap: true,
    },
    {
      // minify
      ...umdConf,
      file: `dist/${name}.min.js`,
      plugins: [
        terser({
          output: { comments: "/Version/" },
        }),
      ],
    },
  ],
  plugins: [
    babel({ exclude: "node_modules/**" }),
    resolve({ browser: true }),
    commonJs(),
  ],
};
