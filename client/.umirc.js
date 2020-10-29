import {resolve} from "path";
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: {webpackChunkName: true},
      title: 'Mobilset',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    "/api": {
      "target": "http://localhost:3001/",
      "changeOrigin": true
    },
    "/upload": {
      "target": "http://localhost:3001/",
      "changeOrigin": true
    }
  },
  alias: {
    api: resolve(__dirname, './src/services/'),
    utils: resolve(__dirname, "./src/utils"),
    services: resolve(__dirname, "./src/services"),
    components: resolve(__dirname, "./src/components"),
    config: resolve(__dirname, "./src/utils/config"),
    constant: resolve(__dirname, "./src/utils/constant"),
  },
}
