#!/bin/bash

# 1. Rename src/yacht_index.njk to src/yachts.njk
if [ -f "src/yacht_index.njk" ]; then
  echo "Renaming src/yacht_index.njk to src/yachts.njk..."
  mv -v src/yacht_index.njk src/yachts.njk
else
  echo "Warning: src/yacht_index.njk not found. Skipping rename."
fi

# 2. Rename src/design.njk to src/design-development.njk
if [ -f "src/design.njk" ]; then
  echo "Renaming src/design.njk to src/design-development.njk..."
  mv -v src/design.njk src/design-development.njk
else
  echo "Warning: src/design.njk not found. Skipping rename."
fi

# 3. Rename src/refits.njk to src/other-projects.njk
if [ -f "src/refits.njk" ]; then
  echo "Renaming src/refits.njk to src/other-projects.njk..."
  mv -v src/refits.njk src/other-projects.njk
else
  echo "Warning: src/refits.njk not found. Skipping rename."
fi

# 4. Create src/about/ directory and move/rename company.njk
echo "Creating src/about/ directory..."
mkdir -pv src/about/

if [ -f "src/company.njk" ]; then
  echo "Moving and renaming src/company.njk to src/about/studio.njk..."
  mv -v src/company.njk src/about/studio.njk
else
  echo "Warning: src/company.njk not found. Skipping move/rename."
fi

# 5. Verify src/contact.njk (no action needed, just acknowledgement)
if [ -f "src/contact.njk" ]; then
  echo "src/contact.njk exists as expected."
else
  echo "Warning: src/contact.njk not found."
fi

# 6. File and directory operations for navbar links complete.
# List relevant directories to verify
echo "Contents of src/:"
ls src/
echo "Contents of src/about/:"
ls src/about/
