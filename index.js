import core from '@actions/core';
import Parser from 'rss-parser';
const parser = new Parser();
import fetch from 'node-fetch';
import fs from 'fs';

const DEFAULT_RESULT = "NOT_UPDATED";

try {
  (async () => {
    const response = await fetch("https://feeds.rebuild.fm/rebuildfm");
    const currBody = await response.text();
    const currFeed = await parser.parseString(currBody);
    const currCnt = currFeed.items.length;

    let prevCnt = -1;
    try {
      const prevBody = fs.readFileSync("./rss.xml", "utf-8");
      const prevFeed = await parser.parseString(prevBody);
      prevCnt = prevFeed.items.length;
    } catch (e) {

    }

    let result = DEFAULT_RESULT;
    if (prevCnt !== currCnt) {
      fs.writeFileSync("./rss.xml", currBody);
      result = "UPDATED";
    }
    core.setOutput("result", result);

  })();
} catch (error) {
  core.setFailed(error.message);
  core.setOutput("result", DEFAULT_RESULT);
}
