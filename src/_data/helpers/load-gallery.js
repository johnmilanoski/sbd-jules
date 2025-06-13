const fs = require('fs');
const path = require('path');

/**
 * Load gallery information for a list of items.
 *
 * @param {string} baseDir - Directory within "assets/img" that contains image folders
 *                           for each item (e.g. "in_progress" or "yachts_complete").
 * @param {string[]} names - Names of the folders/items to load.
 * @param {Object} options
 * @param {string} options.thumbnailDir - Directory within "assets/img" that contains
 *                                        the thumbnail images.
 * @param {Object} [options.thumbnailNameOverrides] - Mapping of item name to an
 *                                                   alternate base name for its thumbnail.
 * @param {(file: string, name: string) => boolean} [options.imageFilter] -
 *        Optional function that receives a file name and the item name and returns
 *        true if the file should be included in the images array.
 * @param {string[]} [options.thumbnailExtensions] - File extensions to check for
 *        thumbnails (default: jpg/jpeg/png variants).
 * @returns {Promise<Array<{name:string,imageDir:string,thumbnail:string|null,images:string[]}>>}
 */
module.exports = async function loadGallery(baseDir, names, options = {}) {
  const {
    thumbnailDir,
    thumbnailNameOverrides = {},
    imageFilter = () => true,
    thumbnailExtensions = ['.jpg', '.JPG', '.jpeg', '.JPEG', '.png', '.PNG']
  } = options;

  const result = [];

  for (const name of names) {
    const fsImageDir = path.join('src', 'assets', 'img', baseDir, name);
    let images = [];
    try {
      const files = await fs.promises.readdir(fsImageDir);
      images = files
        .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
        .filter(file => imageFilter(file, name))
        .sort();
    } catch (err) {
      console.warn(`Warning: Could not read directory ${fsImageDir} for item ${name}: ${err.message}`);
    }

    const thumbBase = thumbnailNameOverrides[name] || name;
    let thumbnailPath = null;
    for (const ext of thumbnailExtensions) {
      const webSegment = `assets/img/${thumbnailDir}/${thumbBase}${ext}`;
      const statPath = path.join('src', webSegment);
      try {
        await fs.promises.stat(statPath);
        thumbnailPath = `/${webSegment}`;
        break;
      } catch (e) {
        // file does not exist
      }
    }
    if (!thumbnailPath) {
      console.warn(
        `Warning: Thumbnail not found for item ${name} (expected something like ${thumbBase}.jpg in src/assets/img/${thumbnailDir}/)`
      );
    }

    result.push({
      name,
      imageDir: `/assets/img/${baseDir}/${name}/`,
      images,
      thumbnail: thumbnailPath
    });
  }

  return result;
};
