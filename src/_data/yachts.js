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
    const imageDirRelative = path.join('assets/img/yachts_complete', name);
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
        // Path for web URL (e.g., /assets/img/yacht_index_pics/MyImage.jpg)
        const webPathSegment = `assets/img/yacht_index_pics/${thumbnailName}${ext}`;
        
        // Path for fs.stat, relative to project root, inside 'src'
        // (e.g., src/assets/img/yacht_index_pics/MyImage.jpg)
        const statPath = path.join('src', webPathSegment);

        try {
            // fs.promises.stat needs a path relative to where the node process is running (project root)
            // or an absolute path. path.resolve() without __dirname will resolve from CWD.
            // Assuming CWD is project root for Eleventy builds.
            await fs.promises.stat(statPath); 
            thumbnailPath = `/${webPathSegment}`; // Assign the web-accessible path
            break;
        } catch (e) {
            // File doesn't exist with this extension, try next
        }
    }
    if (!thumbnailPath) {
        console.warn(`Warning: Thumbnail not found for yacht ${name} (expected something like ${thumbnailName}.jpg in src/assets/img/yacht_index_pics/)`);
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
