'use babel';

const getRelativePath = (from, to) => {
  const trim = (arr) => {
    let start = 0;
    for (; start < arr.length; start += 1) {
      if (arr[start] !== '') break;
    }

    let end = arr.length - 1;
    for (; end >= 0; end -= 1) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, (end - start) + 1);
  };

  const fromSlashed = from.split('\\').join('/');
  const toSlashed = to.split('\\').join('/');

  const fromParts = trim(fromSlashed.split('/'));
  const toParts = trim(toSlashed.split('/'));

  const length = Math.min(fromParts.length, toParts.length);
  let samePartsLength = length;
  for (let i = 0; i < length; i += 1) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  let outputParts = [];
  for (let i = samePartsLength; i < fromParts.length; i += 1) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

export default {
  getRelativePath,
};
