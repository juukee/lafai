import { rm } from 'node:fs/promises';  

export default function cleanBeforeWrite(directory) { 
  let removePromise
  return {
    generateBundle(_options, _bundle, isWrite) {
      if (isWrite) {
        // Only remove before first write, but make all writes wait on the removal
        removePromise ??= rm(directory, {
          force: true,
          recursive: true
        });
        return removePromise;
      }
    },
    name: 'clean-before-write'
  };
}  