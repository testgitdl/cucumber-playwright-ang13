const common = `
  --require-module ts-node/register
  --require-module tsconfig-paths/register
  --require src/**/*.ts
  --require support/config.ts
  --format json:reports/report.json 
  --format html:reports/cucumber-html-report.html
  --format summary 
  --format progress-bar 
  --format @cucumber/pretty-formatter
  --format-options ${JSON.stringify({ snippetInterface: 'async-await' })}
  --publish-quiet
  `;

const getWorldParams = () => {
  const params = {
    foo: 'bar',
  };

  return `--world-parameters ${JSON.stringify({ params })}`;
};

module.exports = {
  default: `${common} ${getWorldParams()}`,
};