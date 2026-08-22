const generateShareId = (title = 'trip') => {
  const slug = title.toLowerCase().replace(/[^a-z0-0]+/g, '-').replace(/(^-|-$)+/g, '');
  const random = Math.random().toString(36).substring(2, 7);
  return `${slug}-${random}`;
};

module.exports = { generateShareId };
