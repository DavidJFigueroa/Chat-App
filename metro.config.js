// const {getDefaultConfig} = require("metro-config");

// module.exports = (async () => {
//   const {
//     resolver: {sourceExts, assetExts},
//   } = await getDefaultConfig();
//   return {
//     transformer: {
//       babelTransformerPath: require.resolve("react-native-svg-transformer"),
//     },
//     resolver: {
//       assetExts: assetExts.filter((ext) => ext !== "svg"),
//       sourceExts: [...sourceExts, "svg"],
//     },
//   };
// })();

// const {getDefaultConfig} = require("@expo/metro-config");

// const defaultConfig = getDefaultConfig(__dirname);

// defaultConfig.resolver.assetExts.push("cjs");

// module.exports = defaultConfig;

const {getDefaultConfig, mergeConfig} = require("@react-native/metro-config");

module.exports = function (baseConfig) {
  const defaultConfig = mergeConfig(baseConfig, getDefaultConfig(__dirname));
  defaultConfig.resolver.assetExts.push("cjs");
  const {
    resolver: {assetExts, sourceExts},
  } = defaultConfig;

  return mergeConfig(defaultConfig, {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
    },
  });
};

// const {getDefaultConfig, mergeConfig} = require("@react-native/metro-config");

// module.exports = function (baseConfig) {
//   const defaultConfig = mergeConfig(baseConfig, getDefaultConfig(__dirname));
//   const {
//     resolver: {assetExts, sourceExts},
//   } = defaultConfig;

//   return mergeConfig(defaultConfig, {
//     resolver: {
//       assetExts: assetExts.filter((ext) => ext !== "svg"),
//       sourceExts: [...sourceExts, "svg"],
//     },
//   });
// };
