const Image = require('@11ty/eleventy-img')
const moment = require('moment')
const eleventySass = require('eleventy-sass')

module.exports = (config) => {
  config.htmlTemplateEngine = 'njk'
  config.addPassthroughCopy('src/css')
  config.addPassthroughCopy('src/img')
  config.addPassthroughCopy('src/js')
  config.addPassthroughCopy('src/favicon.ico')

  // libraries
  config.addPassthroughCopy({
    'node_modules/motion/dist/motion.min.js': 'assets/motion.min.js' 
  })

  config.addNunjucksAsyncShortcode('Image', imageConverter)
  config.addLiquidShortcode('Image', imageConverter)

  config.addPlugin(eleventySass)

  /*FILTERS*/

  config.addFilter('dateIso', date => {
    return moment(date).toISOString()
  })

  config.addFilter('dateReadable', date => {
    return moment(date).utc().format('LL')
  })

  config.addShortcode('excerpt', article => extractExcerpt(article))

  return config
}

async function imageConverter(src) {
  let stats = await Image(src, {
    width: [1280],
    formats: ['webp'],
    urlPath: '/img/',
    outputDir: './dist/img/'
  })

  let source = stats['webp'][0]

  return source.url
}

function extractExcerpt(article) {
  if (!article.hasOwnProperty('templateContent')) {
    console.warn('Failed to extract excerpt: Document has no property "templateContent".');
    return null;
  }

  let excerpt = null;
  const content = article.templateContent;

  const separatorsList = [
    { start: '<!-- Excerpt Start -->', end: '<!-- Excerpt End -->' },
    { start: '<p>', end: '</p>' }
  ];

  separatorsList.some(separators => {
    const startPosition = content.indexOf(separators.start)
    const endPosition = content.indexOf(separators.end)

    if (startPosition !== -1 && endPosition !== -1) {
      excerpt = content.substring(startPosition + separators.start.length, endPosition).trim()
      return true
    }
  });

  return excerpt
}
