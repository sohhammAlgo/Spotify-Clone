
Spotify Clone (HTML, CSS, JavaScript)


This project is a simple Spotify-like music player built using HTML, CSS, and JavaScript.
It is a frontend-only project made for learning and practice.

The goal of this project was to understand how a music player works in the browser and how JavaScript controls audio playback.


Features

- Play music from local files

- Play, pause, next, and previous buttons

- Seekbar with moving circle

- Shows current time and total duration

- Displays current song name and artist

- Song list shown in the sidebar

- Spotify-style UI layout


Technologies Used

- HTML

- CSS

- JavaScript

No frameworks or external APIs are used.


How It Works

Songs are loaded from a JSON file using fetch().
When a song is clicked, it plays in the audio player and updates the playbar.
The seekbar updates as the song plays and can be clicked to change position.


How to Run

- Open the project folder in VS Code

- Use Live Server to run index.html

Note: fetch() does not work properly without Live Server.


What I Learned

- Using the HTML Audio API

- Handling play, pause, and seek functionality

- Working with audio events like timeupdate

- Managing application state using JavaScript


Note

This project is created for learning purposes.
It helped me understand how music players like Spotify work internally.