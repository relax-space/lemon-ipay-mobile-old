export default {
  entry: 'src/index.js',
  define: {
    'process.env': {},
    'process.env.NODE_ENV': process.env.NODE_ENV,
    'process.env.API_ENV': process.env.NODE_ENV,
  },
  env: {
    development: {
      extraBabelPlugins: [
        'dva-hmr',
        'transform-runtime',
        [
          'import',
          {
            libraryName: 'antd-mobile',
            style: 'css'
          }
        ]
      ]
    },
    staging: {
      extraBabelPlugins: [
        'transform-runtime',
        [
          'import',
          {
            libraryName: 'antd-mobile',
            style: 'css'
          }
        ]
      ]
    },
    production: {
      extraBabelPlugins: [
        'transform-runtime',
        [
          'import',
          {
            libraryName: 'antd',
            style: 'css'
          }
        ]
      ]
    }
  }
}
