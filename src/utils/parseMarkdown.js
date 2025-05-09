const { marked } = require('marked');
const sanitizeHtml = require('sanitize-html');

const parseMarkdown = (markdownContent) => {
  const rawHtml = marked(markdownContent);
  const cleanHtml = sanitizeHtml(rawHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      '*': ['href', 'align', 'alt', 'center', 'src', 'title', 'width', 'height', 'style'],
    }
  });
  return cleanHtml;
}

module.exports = parseMarkdown;