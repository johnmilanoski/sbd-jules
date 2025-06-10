#!/bin/bash

# Move asset directories into src/assets/
mv bs_css/ src/assets/bs_css/
mv bs_js/ src/assets/bs_js/
mv css/ src/assets/css_from_root/
mv font/ src/assets/font/
mv img/ src/assets/img/
mv js/ src/assets/js/
mv owl-carousel/ src/assets/owl-carousel/

echo "All asset directories have been moved successfully."
