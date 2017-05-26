# Start database service
sudo service postgresql start

# Build client app
npm run build:prod-sw --prefix front

# Build server app
npm run build:prod --prefix back

if [ $? -eq 0 ]; then
  echo "=== Build process has been completed successfully ===\nbundle-size: $(du -sh builds/word-kombat-lin)"
  # Run the app
  ./builds/word-kombat-lin
else
  echo "=== Build failed ==="
fi

