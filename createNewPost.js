import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createNewPost() {
  // Get title from command line arguments or use "untitled"
  const title = process.argv[2] || "untitled";
  
  // Get current date in YYYY-MM-DD format
  const today = new Date();
  const dateString = today.toISOString().split('T')[0];
  
  // Create posts directory path
  const postsDir = path.join(__dirname, 'src', 'posts');
  
  // Ensure posts directory exists
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
    console.log(`Created posts directory: ${postsDir}`);
  }
  
  // Create filename
  const fileName = `${dateString} ${title}.md`;
  const filePath = path.join(postsDir, fileName);

  // Create frontmatter content
  const content = `---
title: "${title}"
date: ${dateString}
description: "A new post"
tags:
  - posts
  - 
---

`;

  // Create the file
  fs.writeFileSync(filePath, content);
  console.log(`Created new post: ${fileName}`);
}

createNewPost(); 