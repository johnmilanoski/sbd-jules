const fs = require('fs');
const path = require('path');

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

  const yachtsData = [];

  for (const name of yachtNames) {
    const imageDirRelative = path.join('img/yachts_complete', name);
    const imageDirAbsolute = path.resolve(__dirname, '..', '..', imageDirRelative); // Relative to project root

    let images = [];
    try {
      const files = await fs.promises.readdir(imageDirAbsolute);
      images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
                    .sort(); // Sort alphabetically
    } catch (err) {
      console.warn(`Warning: Could not read directory ${imageDirAbsolute} for yacht ${name}: ${err.message}`);
    }

    // Determine thumbnail path
    // Handle "Hat Trick" specifically for thumbnail name "HatTrick.jpg"
    const thumbnailName = name === 'Hat Trick' ? 'HatTrick' : name;
    const thumbnailExtensions = ['.jpg', '.JPG', '.jpeg', '.JPEG'];
    let thumbnailPath = null;
    for (const ext of thumbnailExtensions) {
        const potentialThumbnail = path.join('img/yacht_index_pics', `${thumbnailName}${ext}`);
        // Check if this thumbnail file exists (relative to project root for fs.promises.stat)
        try {
            await fs.promises.stat(path.resolve(__dirname, '..', '..', potentialThumbnail));
            thumbnailPath = `/assets/${potentialThumbnail}`;
            break;
        } catch (e) {
            // File doesn't exist with this extension, try next
        }
    }
    if (!thumbnailPath) {
        console.warn(`Warning: Thumbnail not found for yacht ${name} (expected something like ${thumbnailName}.jpg in img/yacht_index_pics/)`);
    }


    yachtsData.push({
      name: name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      imageDir: `/assets/img/yachts_complete/${name}/`,
      thumbnail: thumbnailPath,
      images: images,
      tourUrl: tourUrls[name.toLowerCase()] || null
    });
  }

  return yachtsData;
};
