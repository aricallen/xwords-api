const fetch = require('node-fetch');
const cheerio = require('cheerio');

const PUZZLE_ID = 'PuzTable';
const PUZZLE_PAGE = 'https://www.xwordinfo.com/Crossword?date=9/7/2019';

/**
 * cell: { number, value }
 * row: cell[]
 * puzzle: row[]
 */
const parsePuzzleData = (pageStr) => {
  const $ = cheerio.load(pageStr);
  const $puzzle = $(`#${PUZZLE_ID}`);
  const $rows = $puzzle.find('tr');
  const puzzle = Array.from($rows).reduce((acc, rowNode) => {
    const cells = Array.from($(rowNode).find('td')).map((cellNode) => {
      const isBlack = $(cellNode).find('black').length > 0;
      if (isBlack) {
        return { number: null, value: null };
      }
      const num = $(cellNode)
        .find('.num')
        .text();
      const value = $(cellNode)
        .find('.letter')
        .text();
      return {
        number: num === '' ? null : +num,
        value: value === '' ? null : value,
      };
    });
    acc.push(cells);
    return acc;
  }, []);
  return puzzle;
};

const scrapePuzzle = () => {
  return fetch(PUZZLE_PAGE)
    .then((response) => {
      return response.text();
    })
    .then((html) => {
      const puzzleData = parsePuzzleData(html);
      return puzzleData;
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { scrapePuzzle };
