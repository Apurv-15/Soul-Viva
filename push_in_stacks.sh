#!/bin/bash

# Get list of modified, added, or deleted files in the git workspace
files=($(git status --porcelain | awk '{print $2}'))

total_files=${#files[@]}
echo "Found $total_files modified/untracked files."

if [ $total_files -eq 0 ]; then
  echo "No changes found to commit."
  exit 0
fi

# Loop through files in stacks of 2
for ((i=0; i<total_files; i+=2)); do
  file1=${files[i]}
  file2=${files[i+1]}
  
  if [ -n "$file2" ]; then
    echo "Staging stack: $file1 and $file2"
    git add "$file1" "$file2"
    git commit -m "Update: $file1 & $file2"
  else
    echo "Staging stack: $file1"
    git add "$file1"
    git commit -m "Update: $file1"
  fi
done

echo "Pushing all stacks to remote..."
git push

echo "Successfully committed all files in stacks of 2 and pushed!"
