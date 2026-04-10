module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src/tests"],
  moduleFileExtensions: ["js", "jsx"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/tests/styleMock.js",
  },
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
