import {toISOString, formatDate} from './filters/dates.js';
import {markdownFormat} from './filters/markdown-format.js';
import {shuffleArray} from './filters/shuffle.js';
import {splitlines} from './filters/splitlines.js';
import {striptags} from './filters/striptags.js';
import {toAbsoluteUrl} from './filters/to-absolute-url.js';
import {slugifyString} from './filters/slugify.js';

export default {
  toISOString,
  formatDate,
  markdownFormat,
  splitlines,
  striptags,
  toAbsoluteUrl,
  shuffleArray,
  slugifyString
};
