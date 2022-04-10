export default {
    import: ['e2e/support/*.js', 'e2e/step_definitions/*.js'],
    paths: ['e2e/features/*.feature'],
    format: [
        'json:reports/report.json',
        'html:reports/cucumber-html-report.html',
        'summary',
        'progress - bar',
        '@cucumber/pretty-formatter'
    ],
    publishQuiet: true
}
