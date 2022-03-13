import core from '@actions/core';
import github from '@actions/github';
import artifact from '@actions/artifact';
const artifactClient = artifact.create();
import Parser from 'rss-parser';
const parser = new Parser();
import fetch from 'node-fetch';
import fs from 'fs';

try {
  (async () => {
    const response = await fetch("https://feeds.rebuild.fm/rebuildfm");
    const body = await response.text();
    const feed = await parser.parseString(body);
    core.setOutput("title", feed.title + feed.items.length);

    await fs.writeFile("./feed", feed);

    // download previous text
    // parse previous text
    // if (previous count deffers from current count) {
    //   setOutput("result", result);
    //   TODO: save body text
    //   ここで保存したファイルを後のstepでcommitする
    // }

    // feed.items.forEach(item => {
    //   core.setOutput(item.title + ':' + item.link + ':' + item.guid);
    // });
    // feed 取得
    // 取得したfeedを保存
    // 前回と比較
    // if (前回と個数が異なる) {
    //   更新処理
    // }
  })();
  // // `who-to-greet` input defined in action metadata file
  // const nameToGreet = core.getInput('who-to-greet');
  // console.log(`Hello ${nameToGreet}!`);
  // const time = (new Date()).toTimeString();
  // core.setOutput("time", time);
  // // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
