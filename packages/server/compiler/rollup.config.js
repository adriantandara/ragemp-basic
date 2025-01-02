import nodeResolvePlugin from "@rollup/plugin-node-resolve";
import commonjsPlugin from "@rollup/plugin-commonjs";
import tsPaths from "rollup-plugin-tsconfig-paths";
import jsonPlugin from "@rollup/plugin-json";
import { swc } from "rollup-plugin-swc3";
import { builtinModules } from "module";
import jetpack from "fs-jetpack";
import path from "path";

const buildOutput = "dist";
const sourcePath = path.resolve("src");
const pkgJson = jetpack.read("package.json", "json");
const localInstalledPackages = [...Object.keys(pkgJson.dependencies)];

function resolvePath(pathParts) {
  return jetpack.path(...pathParts);
}

function copy(source, destination, options = { overwrite: true }) {
  return jetpack.copy(source, destination, options);
}

function cleanUp() {
  if (!jetpack.exists(buildOutput)) {
    return;
  }

  const preserved = [
    "node_modules/**/*",
    "ragemp-server*",
    "server*",
    ".env",
    "BugTrap-x64.dll",
    "bin/**/*",
    "dotnet/**/*",
    "maps/**/*",
    "plugins/**/*",
    "pnpm-lock.yaml",
    "package-lock.json",
    "conf.json",
    "yarn.lock",
    "client_packages/game_resources/**/*",
    "client_packages/browser/**/*",
  ];

  const removeablePaths = jetpack.find(buildOutput, {
    matching: preserved.map((path) => `!${path}`),
    directories: false,
  });

  removeablePaths.forEach((path) => jetpack.remove(path));
}

function copyFiles() {
  const prepareForCopy = [];

  prepareForCopy.push(
    {
      from: jetpack.path("package.json"),
      to: jetpack.path(buildOutput, "package.json"),
    },
    {
      from: jetpack.path("package-lock.json"),
      to: jetpack.path(buildOutput, "package-lock.json"),
    }
  );

  prepareForCopy.forEach((item) => copy(item.from, item.to));
}

cleanUp();
copyFiles();

const generateConfig = (options = {}) => {
  const { isServer } = options;

  const outputFile = isServer
    ? resolvePath([buildOutput, "packages", "gamemode", "index.js"])
    : resolvePath([buildOutput, "client_packages", "index.js"]);

  const serverPlugins = [];

  const external = [...builtinModules, ...localInstalledPackages];
  const tsConfigPath = resolvePath([
    sourcePath,
    isServer ? "server" : "client",
    "tsconfig.json",
  ]);

  setTimeout(() => {
    console.log("Compiler started");
  }, 1000);

  return {
    input: resolvePath([
      sourcePath,
      isServer ? "server" : "client",
      "index.ts",
    ]),
    output: {
      file: outputFile,
      format: "cjs",
    },
    plugins: [
      tsPaths({ tsConfigPath }),
      nodeResolvePlugin(),
      jsonPlugin(),
      commonjsPlugin(),
      swc({
        tsconfig: tsConfigPath,
        minify: process.env.NODE_ENV === "production",
        jsc: {
          target: "es2020",
          parser: {
            syntax: "typescript",
            dynamicImport: true,
            decorators: true,
          },
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
          externalHelpers: true,
          keepClassNames: true,
          loose: true,
        },
      }),
      isServer ? [...serverPlugins] : null,
    ],
    external: isServer ? [...external] : null,
    inlineDynamicImports: true,
  };
};

export default [
  generateConfig({ isServer: true }),
  generateConfig({ isServer: false }),
];
