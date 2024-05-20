import {toISOString, formatDate} from './filters/dates.js';
import {shuffleArray} from './filters/shuffle.js';
import {splitlines} from './filters/splitlines.js';
import {striptags} from './filters/striptags.js';
import {toAbsoluteUrl} from './filters/to-absolute-url.js';
import {slugifyString} from './filters/slugify.js';

export default {
  toISOString,
  formatDate,
  splitlines,
  striptags,
  toAbsoluteUrl,
  shuffleArray,
  slugifyString
};
