# ISBN‑13 / EAN‑13 Barcode Generator for Adobe InDesign

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![InDesign Script](https://img.shields.io/badge/Adobe%20InDesign-Script-blue)
![JSX](https://img.shields.io/badge/JSX-ExtendScript-orange)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

A lightweight Adobe InDesign script that generates fully vector ISBN‑13 (EAN‑13) barcodes directly inside an open document.  
It draws all bars as vector shapes, adds human‑readable digits, converts them to outlines, groups everything, and scales the final result.

This tool is designed for users who want a quick, print‑ready barcode without using external websites or applications.

---

## ✨ Features

- Generates **valid ISBN‑13 / EAN‑13 barcodes**
- Fully **vector-based** (ideal for print)
- Draws correct guard bars and digit groups
- Adds human‑readable digits and converts them to outlines
- Groups and scales the final barcode
- Uses OCR‑B font if available (falls back to Arial)
- **Requires an open document** — the script will not create one automatically

---

## 📦 Installation

To install the script, place the `.jsx` file in your **user Scripts Panel** folder.

<img width="734" height="301" alt="image" src="https://github.com/user-attachments/assets/bb021f2a-e321-4727-a2b0-a136326bdc81" />


### **Windows**
C:\Users<username>\AppData\Roaming\Adobe\InDesign<version>\en_US\Scripts\Scripts Panel\

### **macOS**
~/Library/Preferences/Adobe InDesign/<version>/en_US/Scripts/Scripts Panel/


If the `Scripts Panel` folder does not exist, you can create it manually.

After copying the script there, restart InDesign if needed.

---

## ▶️ How to Run the Script

1. Open Adobe InDesign.
2. Open any document where you want to place the barcode.
3. Go to:  
   **Window → Utilities → Scripts**
4. In the Scripts Panel, open **Scripts Panel** (the user folder).
5. **Double‑click** the script to run it.

<img width="245" height="206" alt="image" src="https://github.com/user-attachments/assets/086fa136-b58c-4727-a385-5d0f6246d8cc" />


---

## 🔢 Entering the ISBN Code

When you run the script, a small window will appear asking for the ISBN.

<img width="511" height="146" alt="image" src="https://github.com/user-attachments/assets/bd4621b9-f9dd-431b-af04-62f258fcb8c5" />

- Enter a **13‑digit ISBN**
- **Do not** include spaces or dashes  
  ✔️ Correct: `9780306406157`  
  ❌ Incorrect: `978-0-306-40615-7`

If the input is not exactly 13 digits, the script will show an error. If everything is OK, the output should look like this:

<img width="361" height="175" alt="image" src="https://github.com/user-attachments/assets/b9d43075-e5b0-49ef-a0b5-745d60555873" />


---

## 📐 Adjusting the Barcode Size

The script automatically scales the final barcode to **20%** of its original size.

If you want to change this:

1. Open the `.jsx` file in a text editor.
2. Look for this line near the end:

```javascript
[0.2, 0.2] // 20% scale

- Change 0.2 to any value you prefer:
- 1.0 = 100% (no scaling)
- 0.5 = 50%
- 0.25 = 25%
- 0.1 = 10%
Both numbers must be the same to keep proportions.

📝 Notes
- The script requires an open document.
It will not create one automatically.
- All text is converted to outlines for maximum print compatibility.
- The barcode is fully vector and can be resized without quality loss.
- If OCR‑B is installed, it will be used automatically; otherwise, Arial is used.

📄 License
MIT License — free to use, modify, and distribute.

🤝 Acknowledgements
This script was initially drafted with the help of an AI assistant (Gemini) and refined manually through testing and adjustments.
