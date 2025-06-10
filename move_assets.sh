#!/bin/bash

# Ensure src/assets/ exists
mkdir -p src/assets/

# Move pics, magazines, and pdf directories
echo "Moving pics/ to src/assets/pics/..."
mv -v pics src/assets/pics

echo "Moving magazines/ to src/assets/magazines/..."
mv -v magazines src/assets/magazines

echo "Moving pdf/ to src/assets/pdf/..."
mv -v pdf src/assets/pdf

# Merge css_from_root into css
echo "Merging css_from_root into css..."

# Check if src/assets/css/ exists, create if not
mkdir -p src/assets/css/

# Move specific files from css_from_root
if [ -f "src/assets/css_from_root/components.css" ]; then
  echo "Moving src/assets/css_from_root/components.css to src/assets/css/components.css..."
  mv -v src/assets/css_from_root/components.css src/assets/css/components.css
else
  echo "Warning: src/assets/css_from_root/components.css not found."
fi

if [ -f "src/assets/css_from_root/responsee.css" ]; then
  echo "Moving src/assets/css_from_root/responsee.css to src/assets/css/responsee.css..."
  mv -v src/assets/css_from_root/responsee.css src/assets/css/responsee.css
else
  echo "Warning: src/assets/css_from_root/responsee.css not found."
fi

# Delete the now empty src/assets/css_from_root directory
if [ -d "src/assets/css_from_root" ]; then
  echo "Deleting src/assets/css_from_root directory..."
  rm -rfv src/assets/css_from_root
else
  echo "Warning: src/assets/css_from_root directory not found."
fi

echo "Asset path corrections (file movements and CSS merge) complete."

# Verify by listing the target directories
echo "Contents of src/assets/:"
ls -R src/assets/

# Verify that root directories are gone
echo "Checking root directory for moved folders:"
ls pics magazines pdf || echo "pics, magazines, pdf correctly moved from root."

# Verify css_from_root is gone
ls src/assets/css_from_root || echo "src/assets/css_from_root correctly deleted."
