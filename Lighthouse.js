const puppeteer = require('puppeteer-core');
const lighthouse = require('lighthouse');
const chai = require('chai');

const opts = {
    onlyCategories: 'performance',
    emulatedFormFactor: 'none',
    throttlingMethod: 'provided',
    outputPath: 'output.json'
  };
  const url = "https://www.example.com"; //change url for which client-side performance is to be executed
  const PORT = '9222';

  (async () => {

  const browser = await puppeteer.launch({headless:true,
                                          executablePath:"C:/Google/Chrome/Application/chrome.exe",
                                         args: [`--remote-debugging-port=9222`]});
    
  //const result = await lighthouse(url, {port: PORT, output: 'json', emulatedFormFactor: 'none', throttlingMethod: 'provided'});
  // Output the result.
  //console.log(JSON.stringify(result.lhr, null, 2));
  const {lhr}  = await lighthouse(url, {port: PORT, output: "json", categoriesId: "performance", emulatedFormFactor: "none", throttlingMethod: "provided"});
  /*console.log(
      `Lighthouse scores: ${Object.values(lhr.audits.metrics.details.items)
        .map(c => c.firstContentfulPaint)
        .join(", ")}`
  );*/

  await browser.disconnect();
  await browser.close();

  console.log(`firstContentfulPaint: ${Object.values(lhr.audits.metrics.details.items).map(c => c.firstContentfulPaint).slice(0,-1)}`);
  console.log(`largestContentfulPaint: ${Object.values(lhr.audits.metrics.details.items).map(c => c.largestContentfulPaint).slice(0,-1)}`);
  console.log(`interactive: ${Object.values(lhr.audits.metrics.details.items).map(c => c.interactive).slice(0,-1)}`);
  console.log(`totalBlockingTime: ${Object.values(lhr.audits.metrics.details.items).map(c => c.totalBlockingTime).slice(0,-1)}`);
  console.log(`cumulativeLayoutShift: ${Object.values(lhr.audits.metrics.details.items).map(c => c.cumulativeLayoutShift).slice(0,-1)}`);
  console.log(`speedIndex: ${Object.values(lhr.audits.metrics.details.items).map(c => c.speedIndex).slice(0,-1)}`);
  console.log(`maxPotentialFID: ${Object.values(lhr.audits.metrics.details.items).map(c => c.maxPotentialFID).slice(0,-1)}`);

  var firstContentfulPaint = parseInt (Object.values(lhr.audits.metrics.details.items).map(c => c.firstContentfulPaint).slice(0,1));
  var largestContentfulPaint = parseInt (Object.values(lhr.audits.metrics.details.items).map(c => c.largestContentfulPaint).slice(0,1));
  var interactive = parseInt (Object.values(lhr.audits.metrics.details.items).map(c => c.interactive).slice(0,1));
  var totalBlockingTime = parseInt (Object.values(lhr.audits.metrics.details.items).map(c => c.totalBlockingTime).slice(0,1));
  var cumulativeLayoutShift = parseFloat (Object.values(lhr.audits.metrics.details.items).map(c => c.cumulativeLayoutShift).slice(0,1));
  var speedIndex = parseInt (Object.values(lhr.audits.metrics.details.items).map(c => c.speedIndex).slice(0,1));
  var maxPotentialFID = parseInt (Object.values(lhr.audits.metrics.details.items).map(c => c.maxPotentialFID).slice(0,1));
  
  try {
    chai.expect(firstContentfulPaint).to.be.below(1001) ;
    chai.expect(largestContentfulPaint).to.be.below(2501);
    chai.expect(interactive).to.be.below(3801);
    chai.expect(totalBlockingTime).to.be.below(301);
    chai.expect(cumulativeLayoutShift).to.be.below(0.1);
    chai.expect(speedIndex).to.be.below(4301);
    chai.expect(maxPotentialFID).to.be.below(131);
  }
  catch (err) {
    console.error(err);
  }
  
  
})();

