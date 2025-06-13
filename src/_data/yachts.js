const loadGallery = require('../helpers/load-gallery');

module.exports = async () => {
  const yachtNames = [
    'BookEnds', 'Hat Trick', 'Tintin', 'afterglow', 'alexis', 'anaya',
    'bigzip', 'bravo72', 'bravo78', 'bravo88', 'dreamcatcher', 'escapade',
    'holland', 'juanky', 'mazu', 'premier', 'rhapsody', 'samara', 'serenity',
    'youngone'
  ];

  const tourUrls = {
    'afterglow': 'https://my.matterport.com/models/Fa9WwRP6q17',
    'premier': 'https://my.matterport.com/models/xGw4Epropox'
  };

  const gallery = await loadGallery('yachts_complete', yachtNames, {
    thumbnailDir: 'yacht_index_pics',
    thumbnailNameOverrides: { 'Hat Trick': 'HatTrick' },
    thumbnailExtensions: ['.jpg', '.JPG', '.jpeg', '.JPEG']
  });

  return gallery.map(item => ({
    name: item.name,
    slug: item.name.toLowerCase().replace(/\s+/g, '-'),
    imageDir: item.imageDir,
    thumbnail: item.thumbnail,
    images: item.images,
    tourUrl: tourUrls[item.name.toLowerCase()] || null
  }));
};
