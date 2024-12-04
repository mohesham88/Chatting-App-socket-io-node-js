import { pathsToModuleNameMapper } from "ts-jest";
// const tsconfig = require("./tsconfig.json");

const paths = {
  "src/*": ["src/*"],
};

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(paths, {
    prefix: "<rootDir>/src",
  }),
};
