#!/bin/bash

echo "Creating a new blog post..."

# Get post details from user
printf "Enter post title: "
read title

printf "Enter post date (YYYY-MM-DD, or press Enter for today): "
read date
if [ -z "$date" ]; then
    date=$(date +%Y-%m-%d)
fi

printf "Enter category: "
read category

printf "Enter description: "
read description

printf "Enter image filename (optional): "
read image

# Generate filename from title
filename=$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')
filepath="pages/$filename.md"

# Create the post file
cat > "$filepath" << EOF
---
date: "$date"
title: "$title"
category: "$category"
description: "$description"
$(if [ ! -z "$image" ]; then echo "image: \"$image\""; fi)
---

Write your post content here...
EOF

echo
echo "✓ Created new post: $filepath"
echo "✓ Title: $title"
echo "✓ Date: $date"
echo "✓ Category: $category"