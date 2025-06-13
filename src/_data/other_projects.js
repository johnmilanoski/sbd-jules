const loadGallery = require('../helpers/load-gallery');

module.exports = async () => {
  const folderToName = {
    highland: 'Highland House',
    magnolia: 'Magnolia House',
    eastside_hotel: 'Eastside Hotel'
  };

  const folders = Object.keys(folderToName);

  const gallery = await loadGallery('other', folders, {
    thumbnailDir: 'other_index_pics'
  });

  return gallery.map(item => ({
    name: folderToName[item.name] || item.name,
    slug: item.name.replace(/_/g, '-'),
    imageDir: item.imageDir,
    thumbnail: item.thumbnail,
    images: item.images
  }));
};
