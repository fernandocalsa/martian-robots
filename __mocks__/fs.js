const fs = jest.genMockFromModule('fs');

let mockFiles = Object.create(null);

const __setMockFiles = (newMockFiles) => {
  mockFiles = Object.create(null);

  for (const filePath in newMockFiles) {
    mockFiles[filePath] = newMockFiles[filePath];
  }
}

const readFile = jest.fn().mockImplementation((filePath, format, cb) => {
  const file = mockFiles[filePath];
  if (file) {
    cb(null, file);
  } else {
    cb(new Error());
  }
});

fs.__setMockFiles = __setMockFiles;
fs.readFile = readFile;

module.exports = fs;
