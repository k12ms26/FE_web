module.exports = {

    devServer: {
      proxy: {
        '/course': {
          target: 'https://18.217.211.176:3000',
          changeOrigin: true,
          // headers: {
          //   Origin: 'https://18.217.211.176:3000',
          // },
        },
      },
      //   proxy: 'https://18.217.211.176:3000'
      // },
      runtimeCompiler: true,
    },
  };
