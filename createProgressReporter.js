/* eslint no-console: off */
var path = require('path');
module.exports = function createProgressReporter(options) {
  let lastReported = 0
  let lastFile
  let shouldHookExit = options && options.hookExit
  const stats = []
  let cfg = {
    "printEvery": 15, 
    "showSlowStats": true,
    "maxSlowFiles":20,
    "fullPath": true
  }
  const eslintPlugin = {
    rules: {
      activate: {
        create(context) {
          Object.assign(cfg, context.options[0]);
          
          const currentDate = new Date();
          const now = currentDate.getTime();

          addFileToStats(currentDate, now)

          lastFile = {
            name: context.getFilename(),
            start: now
          }

          if (shouldHookExit) {
            shouldHookExit = false
            process.on('exit', printStats)
          }
          return {}
        }
      }
    }
  }

  function printProcessLine(currentDate, len){
    let dateString = new Date(currentDate.getTime() - (currentDate.getTimezoneOffset() * 60000 ))
        .toISOString().replace("T", " ").replace("Z", "");
    console.error(
      `* [ ${dateString} ] Processed ${len } files...`
    )
    
  }

  function addFileToStats(currentDate, now) {

    if (lastFile) {
      lastFile.finish = now
      lastFile.duration = now - lastFile.start
      stats.push(lastFile)
    }

    if(cfg.printEvery === 0 && lastReported > 0) {
      printProcessLine(currentDate, stats.length);
      lastReported = now
    }
    else if (now > lastReported + (cfg.printEvery * 1000)) {
      if(lastReported > 0)
        printProcessLine(currentDate, stats.length);
      lastReported = now
    }
  }

  function printStats() {
    //catch last file
    const currentDate = new Date();
    const now = currentDate.getTime();
    addFileToStats(currentDate, now);
    
    //print stats
    const basePath = process.cwd()+path.sep; 
    const totalTime = stats.map(s => s.duration).reduce((a, b) => a + b, 0)
    let minutes = (totalTime / (60 * 1000)).toFixed(1)
    let unit = 'minutes';
    if(totalTime < (60 * 1000)) {
      minutes = (totalTime / 1000).toFixed(3)
      unit = 'seconds';
    }
    
    console.log()
    console.log('ESLint Stats Report')
    console.log('===================')
    console.log()
    console.log(`${stats.length} files processed in ${minutes} ${unit}.`)

    // print slow stats
    if(cfg.showSlowStats) {
      stats.sort((a, b) => b.duration - a.duration)
      console.log()
      const slow = stats.slice(0, cfg.maxSlowFiles)
      console.log(`## Slowest ${slow.length} files`)
      for (const file of slow) {
        let name = file.name;
        if(cfg.fullPath === false){
          name = name.replace(basePath, '');
        }
        console.log(` * ${name} (${file.duration} ms)`)
      }
    }
  }
  return {
    eslintPlugin,
    printStats,
    stats
  }
}
