const loadGallery = require('./helpers/load-gallery');

module.exports = async () => {
  const projectNames = [
    '127',
    'Frantoni',
    'Juanky_II',
    'bravo70',
    'buffalo_nickel',
    'dreams'
  ];

  const gallery = await loadGallery('in_progress', projectNames, {
    thumbnailDir: 'in_progress_index_pics',
    thumbnailNameOverrides: { 'Juanky_II': 'JuankyIIL' },
    imageFilter: (file, name) => !/^Thumbnail-/i.test(file) && file !== `${name}.jpg`
  });

  return gallery.map(item => ({
    name: item.name.replace(/_/g, ' '),
    slug: item.name.toLowerCase().replace(/_/g, '-'),
    imageDir: item.imageDir,
    thumbnail: item.thumbnail,
    images: item.images
  }));
};
