const cucumberJunitConvert = require('cucumber-junit-convert');

const options = {
  inputJsonFile: 'reports/report.json',
  outputXmlFile: 'reports/junit.xml',
  featureNameAsClassName: true // default: false
}

cucumberJunitConvert.convert(options);