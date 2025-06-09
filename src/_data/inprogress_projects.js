const fs = require('fs');
const path = require('path');

module.exports = async () => {
  // Based on the directory listing from ls("img/in_progress/")
  const projectNames = [
    '127',
    'Frantoni',
    'Juanky_II',
    'bravo70',
    'buffalo_nickel',
    'dreams'
  ];

  const projectsData = [];

  for (const name of projectNames) {
    const imageDirRelative = path.join('img/in_progress', name);
    // Construct an absolute path relative to the project root for fs operations
    const imageDirAbsolute = path.resolve(__dirname, '..', '..', imageDirRelative);

    let images = [];
    try {
      const files = await fs.promises.readdir(imageDirAbsolute);
      images = files
        .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
        // Filter out known thumbnail names from the main image list, if necessary
        .filter(file => !/^Thumbnail-/i.test(file) && file !== `${name}.jpg`)
        .sort();
    } catch (err) {
      console.warn(`Warning: Could not read directory ${imageDirAbsolute} for project ${name}: ${err.message}`);
    }

    let thumbnailName = name;
    if (name === 'Juanky_II') {
      thumbnailName = 'JuankyIIL';
    }

    const thumbnailExtensions = ['.jpg', '.JPG', '.jpeg', '.JPEG', '.png', '.PNG'];
    let thumbnailPath = null;
    for (const ext of thumbnailExtensions) {
        const potentialThumbnail = path.join('img/in_progress_index_pics', `${thumbnailName}${ext}`);
        try {
            await fs.promises.stat(path.resolve(__dirname, '..', '..', potentialThumbnail));
            thumbnailPath = `/assets/${potentialThumbnail}`;
            break;
        } catch (e) {
            // File doesn't exist with this extension
        }
    }
    if (!thumbnailPath) {
        console.warn(`Warning: Thumbnail not found for project ${name} (expected something like ${thumbnailName}.jpg in img/in_progress_index_pics/)`);
    }

    // Handle slug generation for names like "Juanky_II"
    const slug = name.toLowerCase().replace(/_/g, '-');

    projectsData.push({
      name: name.replace(/_/g, ' '), // Replace underscore with space for display name
      slug: slug,
      imageDir: `/assets/img/in_progress/${name}/`, // Keep original name for directory
      thumbnail: thumbnailPath,
      images: images,
    });
  }

  return projectsData;
};
