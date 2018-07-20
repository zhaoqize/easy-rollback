const execa = require('execa') 
const inquirer = require('inquirer')
const signale = require('signale');

signale.config({
  displayScope: true,
  displayBadge: true,
  displayDate: true,
  displayFilename: false,
  displayLabel: true,
  displayTimestamp: true,
  underlineLabel: false,
  underlineMessage: false
}); 

const Log = signale.scope('easy-rollback');

function run (command, args) {
  if (!args) { [command, ...args] = command.split(/\s+/) }
  return execa(command, args, { cwd: this.context })
}

async function rollback (number) {
  // 参数处理
  let logNum = number || 10;

  // 分支处理
  let currentBranch = await run('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
  branchName = currentBranch.stdout;

  // 保证本地干净
  let localGitStatus = await run('git', ['status']);
  if (localGitStatus.stdout && localGitStatus.stdout.indexOf('working tree clean') === -1) {
    Log.success('Working Tree Not Clean!')
    await run('git', ['add', '.']);
    await run('git', ['commit', `-nm[mtbr] ${+new Date()}`]);
    await run('git', ['push', 'origin', `${branchName}`]);
  }
  Log.success('Work Tree Is Clean!')

  // 从远程仓库拉取Tags
  await run('git', ['fetch', '--tags']);
  await run('git', ['pull', 'origin', `${branchName}`, '--no-edit']);
  Log.success('Pull Tag OK!');

  // 指定从哪获取commitId
  let { commitIdSource, backMode} = await inquirer.prompt([
    {
      type: 'list',
      name: 'commitIdSource',
      message: '请选择CommitId的来源',
      choices: [
        'Normal',
        'Tag', 
      ],
    },
    {
      type: 'list',
      name: 'backMode',
      message: '请选择模式',
      choices: [
        'reset'
      ],
    }
  ])

  let commitIdWidthMsg = [];
  if (commitIdSource === 'Normal') {
    let { stdout } = await run('git', ['log', `-${logNum}`, '--pretty=format:%h-%s', '--no-patch']);
    commitIdWidthMsg = stdout.split('\n');
  } else {
    let tags = await run('git', ['tag']);
    let aTags = tags.stdout.split('\n');
    for (let i = 0; i < aTags.length; i++) {
      let tagMsg = await run('git', ['show', aTags[i], '--pretty=format:%h-%s', '--no-patch']);
      commitIdWidthMsg.push(tagMsg.stdout.split('\n')[5]);
    }
  }
  let { commitId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'commitId',
      message: '请选择CommitId',
      choices: commitIdWidthMsg,
      pageSize: 10,
      filter (val) {
        return val.split('-')[0];
      }
    }
  ])

  // 根据不同模式操作
  if (backMode === 'reset') {
    await run('git', ['reset', '--hard', `${commitId}`]);
  } else if (backMode === 'revert') {
    try {
      await run('git', ['revert', `${commitId}`]);
    }catch(e) {
      await run('git', ['revert', '-m', '1', `${commitId}`]);
    }
    await run('git', ['add', '.']);
    await run('git', ['commit', `-m'[mtrb]revert-${commitId}'`]);
  }
  // 提交
  await run('git', ['push', 'origin', `${branchName}`, '-f']);
  
  Log.success('✨ rooback success!')
}

module.exports = (number) => {
  rollback(number).catch(err => {
    Log.fatal(err);
    process.exit(1)
  })
}