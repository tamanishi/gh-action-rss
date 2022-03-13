const core = require('@actions/core');
const github = require('@actions/github');
const rss_parser = require('rss-parser');
const parser = new rss_parser();

try {
  (async () => {
    const feed = await parser.parseURL("https://feeds.rebuild.fm/rebuildfm");
    core.setOutput("title", feed.title);
    // feed.items.forEach(item => {
    //   core.setOutput(item.title + ':' + item.link + ':' + item.guid);
    // });
    // feed 取得
    // 前回と比較
    // if (前回と個数が異なる) {
    //   更新処理
    //   取得したfeedを保存
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
