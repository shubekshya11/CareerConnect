// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   /* config options here */
// // };

// // export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack: (config) => {
//     // Prevent Knex from bundling SQLite drivers that you don't use
//     config.externals.push({
//       "better-sqlite3": "commonjs better-sqlite3",
//       "sqlite3": "commonjs sqlite3",
//     });

//     return config;
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['knex'],
  
  // Enable source maps in development
  ...(process.env.NODE_ENV === 'development' && {
    productionBrowserSourceMaps: false,
  }),
  
  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    compress: true,
    poweredByHeader: false,
  }),
};

export default nextConfig;
