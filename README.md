
# 🎵 Theremin App

Theremin App is an interactive web application that uses your camera to detect specific(green and blue) colors on the video feed and translates them into sound. The app simulates the behavior of a theremin, allowing you to control the pitch (frequency) and volume of the sound based on the positions of colored points within the video image. It also features customizable settings and visual feedback to enhance the experience.

---

## 🚀 Features

- **Interactive Sound Control**: Use colored objects (green and blue) in the video feed to control sound frequency and volume.
- **Visual Feedback**: Displays detected points and lines for frequency and volume control on the canvas.
- **Customizable Settings**:
  - Adjustable thresholds for color detection (green and blue).
  - Toggle mirror mode to flip the video feed.
- **Mute/Unmute Feature**: Easily mute or adjust sound output.
- **Responsive UI**: Includes an intuitive settings panel for real-time adjustments.

---

## 📂 Code Overview

### Project Structure

- **`index.html`**: Main HTML structure, including the canvas for the video feed and settings panel.
- **`style.css`**: Manages the layout and design of the application.
- **`effect.js`**: Core logic for the theremin effect, including sound generation and video processing.
- **`utils.js`**: Utility functions for image processing and calculations.

---

## 📜 Documentation

### `Effect` Class

The `Effect` class is the core of the application. It handles video processing, sound generation, and user interaction.

#### Constructor

```javascript
constructor(canvas, video)
```

- **Parameters**:
  - `canvas`: The HTML `<canvas>` element where the video feed and visual effects are displayed.
  - `video`: The HTML `<video>` element used for the video feed.
- **Purpose**:
  - Initializes the canvas and audio context.
  - Sets up the audio processing pipeline, including an oscillator, gain (volume) control, and a low-pass filter for smoothing tones.
  - Starts the animation loop.

---

#### Methods

##### `setThreshold(newThreshold)`
- **Purpose**: Adjusts the sensitivity for detecting color on the video feed.
- **Parameter**:
  - `newThreshold`: The new threshold value for color detection.

---

##### `setGreenComponent(value)`
- **Purpose**: Sets the target green component value for frequency control.
- **Parameter**:
  - `value`: The green component value (0–255).

---

##### `setBlueComponent(value)`
- **Purpose**: Sets the target blue component value for volume control.
- **Parameter**:
  - `value`: The blue component value (0–255).

---

##### `mute()`
- **Purpose**: Mutes the sound by setting the gain to `0`.

---

##### `unmute()`
- **Purpose**: Unmutes the sound by restoring the gain.

---

##### `toggleMute()`
- **Purpose**: Toggles the mute state and updates the mute button text in the UI.

---

##### `setMirror(isMirrored)`
- **Purpose**: Enables or disables mirror mode for the video feed.
- **Parameter**:
  - `isMirrored`: A boolean indicating whether to flip the video horizontally.

---

#### Private Methods

##### `#animate()`
- **Purpose**: Continuously processes the video feed, detects colors, and updates the canvas and audio output.
- **Key Steps**:
  1. Draw the video frame onto the canvas.
  2. Detect green points for frequency control and blue points for volume control.
  3. Calculate average positions of detected points to determine sound frequency and volume.
  4. Update the oscillator frequency and gain based on the detected points.
  5. Provide visual feedback on the canvas.

---

### Utility Functions (`utils.js`)

#### `getLocationsWithColor(imgData, color, threshold)`
- **Purpose**: Detects pixels matching a specific color within a threshold.
- **Parameters**:
  - `imgData`: Image data retrieved from the canvas.
  - `color`: Target color as an object `{ r, g, b }`.
  - `threshold`: The sensitivity for color matching.
- **Returns**: An array of locations `{ x, y }` of matching pixels.

---

#### `colorMatch(c1, c2, threshold)`
- **Purpose**: Checks if two colors match within a given threshold.
- **Parameters**:
  - `c1`: First color `{ r, g, b }`.
  - `c2`: Second color `{ r, g, b }`.
  - `threshold`: The sensitivity for color matching.
- **Returns**: `true` if the colors match, `false` otherwise.

---

#### `sqdistance(c1, c2)`
- **Purpose**: Calculates the squared Euclidean distance between two colors.
- **Parameters**:
  - `c1`: First color `{ r, g, b }`.
  - `c2`: Second color `{ r, g, b }`.
- **Returns**: The squared distance.

---

#### `average(locs)`
- **Purpose**: Calculates the average position from an array of locations.
- **Parameter**:
  - `locs`: An array of `{ x, y }` objects.
- **Returns**: The average location `{ x, y }`.

---

### HTML Structure (`index.html`)

#### Key Elements

1. **Canvas and Video**:
   - `<canvas id="myCanvas"></canvas>`: Displays the video feed with visual effects.
   - The video feed is processed using the `Effect` class.

2. **Settings Panel**:
   - Includes controls for adjusting thresholds, toggling mirror mode, and muting sound.

3. **Buttons**:
   - **Mute Button (`.mute-button`)**: Toggles sound on/off.
   - **Settings Button (`.settings-button`)**: Opens/closes the settings panel.

---

### JavaScript Logic (`index.html`)

#### Core Functions

##### `toggleSettings()`
- **Purpose**: Opens or closes the settings panel.

---

##### `updateGreenThreshold(value)`
- **Purpose**: Updates the green color threshold in the `Effect` class.
- **Parameter**:
  - `value`: The new threshold value.

---

##### `updateBlueThreshold(value)`
- **Purpose**: Updates the blue color threshold in the `Effect` class.
- **Parameter**:
  - `value`: The new threshold value.

---

##### `toggleMirror(isMirrored)`
- **Purpose**: Toggles mirror mode in the `Effect` class.
- **Parameter**:
  - `isMirrored`: Boolean indicating whether to enable mirror mode.

---

## 🛠️ How to Run

1. Clone the repository:
   ```bash
   gh repo clone guzaevegor/terminvoks-vanila-js
   ```
2. Open the `index.html` file in a browser.
3. Allow camera access when prompted.
4. Interact with the app by using green and blue objects in the camera feed.

---

## 📖 How It Works

1. The app captures live video from your webcam and displays it on a canvas.
2. It detects green and blue points in the video feed based on adjustable thresholds.
3. The position of green points determines the frequency of the sound.
4. The position of blue points determines the volume of the sound.
5. The app provides real-time visual feedback, showing detected points and lines for frequency and volume control.

---

## 🎨 Customization

- Modify the thresholds for green and blue detection using the settings panel.
- Flip the video feed using the mirror toggle.
- Mute/unmute the sound using the mute button.

---

## 🛡️ Privacy Note

The app processes video data locally in your browser. No video or audio data is sent to any server.

---

## 📄 License

This project is licensed under the Non-copyright License.

---

## ✨ Credits

- Developed by **[Guzaev Egor, ChatGpt, Youtube]**.
- Inspired by theremin instruments and creative coding.

