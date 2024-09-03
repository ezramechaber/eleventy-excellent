import dotenv from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';
import axios from 'axios';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';

dotenv.config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getSpotifyToken() {
  const response = await axios.post('https://accounts.spotify.com/api/token', 
    'grant_type=client_credentials', {
    headers: {
      'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return response.data.access_token;
}

async function getTrackInfo(trackId, token) {
  const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  return response.data;
}

async function createSpotifyPost() {
  try {
    const embedCode = await new Promise(resolve => {
      rl.question('Please paste the Spotify embed code or track URL: ', resolve);
    });

    let trackId;
    
    // Match patterns for different Spotify formats
    const patterns = [
      /spotify:track:(\w+)/, // URI format
      /https:\/\/open\.spotify\.com\/track\/(\w+)/, // URL format
      /https:\/\/open\.spotify\.com\/embed\/track\/(\w+)/, // Embed URL format
      /src="https:\/\/open\.spotify\.com\/embed\/track\/(\w+)/ // iFrame embed format
    ];

    for (const pattern of patterns) {
      const match = embedCode.match(pattern);
      if (match) {
        trackId = match[1];
        break;
      }
    }

    if (!trackId) {
      console.log("Invalid embed code or URL. Unable to extract track ID.");
      return;
    }

    console.log(`Extracted track ID: ${trackId}`);

    const token = await getSpotifyToken();
    const trackInfo = await getTrackInfo(trackId, token);

    const artist = trackInfo.artists[0].name;
    const title = trackInfo.name;

    const today = new Date().toISOString().split('T')[0];
    const filename = `${today} music.md`;
    const filepath = path.join("src", 'posts', filename);

    const content = `---
title: "${artist} - ${title}"
date: ${today}
description: "Today's music"
tags:
  - posts
  - music
---

${embedCode}
`;

    await fs.mkdir('posts', { recursive: true });
    await fs.writeFile(filepath, content, 'utf-8');

    console.log(`Post created: ${filepath}`);
  } catch (error) {
    console.error('An error occurred:', error.message);
  } finally {
    rl.close();
  }
}

createSpotifyPost();
