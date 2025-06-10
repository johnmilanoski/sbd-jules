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
    const imageDirRelative = path.join('assets/img/in_progress', name);
    // Path for fs.readdir, relative to project root, inside 'src'
    const imageDirAbsolute = path.join('src', imageDirRelative);

    let images = [];
    try {
      const files = await fs.promises.readdir(imageDirAbsolute);
      images = files
        .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
        // Filter out known thumbnail names from the main image list, if necessary
        .filter(file => !/^Thumbnail-/i.test(file) && file !== `${name}.jpg`)
        .sort();
    } catch (err) {
      console.warn(`Warning: Could not read directory ${imageDirAbsolute} (resolved from 'src/${imageDirRelative}') for project ${name}: ${err.message}`);
    }

    let thumbnailName = name;
    if (name === 'Juanky_II') {
      thumbnailName = 'JuankyIIL';
    }

    const thumbnailExtensions = ['.jpg', '.JPG', '.jpeg', '.JPEG', '.png', '.PNG'];
    let thumbnailPath = null;
    for (const ext of thumbnailExtensions) {
        // Path for web URL (e.g., /assets/img/in_progress_index_pics/MyImage.jpg)
        const webPathSegment = `assets/img/in_progress_index_pics/${thumbnailName}${ext}`;
        
        // Path for fs.stat, relative to project root, inside 'src'
        // (e.g., src/assets/img/in_progress_index_pics/MyImage.jpg)
        const statPath = path.join('src', webPathSegment);

        try {
            // Assuming CWD is project root for Eleventy builds.
            await fs.promises.stat(statPath); 
            thumbnailPath = `/${webPathSegment}`; // Assign the web-accessible path
            break;
        } catch (e) {
            // File doesn't exist with this extension, try next
        }
    }
    if (!thumbnailPath) {
        console.warn(`Warning: Thumbnail not found for project ${name} (expected something like ${thumbnailName}.jpg in src/assets/img/in_progress_index_pics/)`);
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
