import core from '@actions/core';
import github from '@actions/github';
import artifact from '@actions/artifact';
const artifactClient = artifact.create();
import Parser from 'rss-parser';
const parser = new Parser();
import fetch from 'node-fetch';

try {
  (async () => {
    // const feed = await parser.parseURL("https://feeds.rebuild.fm/rebuildfm");
    // core.setOutput("title", feed.title);
    const response = await fetch("https://feeds.rebuild.fm/rebuildfm");
    const rss = await response.text();
    core.setOutput("rss", rss);
    const feed2 = await parser.parseString(rss);
    // , (err, feed) => {
    //   core.setOutput("title", feed.title + feed.items.length);
    // })
    core.setOutput("title", feed2.title + feed2.items.length);
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
