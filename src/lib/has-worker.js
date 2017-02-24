let hasWorker = (typeof window !== 'undefined') && ('Worker' in window);

if (hasWorker) {
  try {
    const w = require('webworkify')(() => {});
    w.terminate();
  } catch (e) {
    hasWorker = false;
  }
}

export {
  hasWorker
}
