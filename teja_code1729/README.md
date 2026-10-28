# A Little World for Teja 🤍

A romantic birthday website from Bala Narayana.

## Run
Open `index.html` in a browser. For best results, use a local server in this folder (e.g. `python -m http.server 8000`) and visit `http://localhost:8000`.

## Included song
Your uploaded MP3 is included at `audio/our-song.mp3` and connected to the vinyl player. Playback begins only after the visitor presses Play.

## Add your three photos
Put your photos in the `images` folder and name them:
- `tejaswini-and-bala-1.jpg`
- `tejaswini-and-bala-2.jpg`
- `tejaswini-and-bala-3.jpg`

If using PNG files, update the corresponding filenames in `index.html`. The same three photos appear in the birthday layout and are referenced in the memories section.

## Customize
- Change the PIN in `script.js` (`CONFIG.pin`, default `1729`).
- Edit the letter text in `index.html`.
- Change petals by editing the `CONFIG` values in `script.js`.

## Notes
The PIN is a playful interaction, not security. The website does not upload photos or audio automatically. Google Fonts are loaded online, with fallback fonts if offline.


Polish updates: added a subtle journey progress indicator, automatic PIN checking after the fourth digit, removed the visible PIN hint to preserve the surprise, added a personalized closing line, and added a small petal flourish when note cards open. Secret code: 1729.
