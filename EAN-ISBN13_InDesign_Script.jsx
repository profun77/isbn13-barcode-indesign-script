#target indesign

// === ISBN‑13 Barcode Generator for Adobe InDesign ===
// Generates a vector EAN‑13 barcode (ISBN‑13 compatible) inside the current document.
// Requires an open document — the script will not create one automatically.

function createISBNBarcode() {

    // Require an open document
    if (!app.documents.length) {
        alert("Please open a document before generating a barcode.");
        return;
    }

    var isbn = prompt("Enter ISBN‑13 code (no spaces):", "");
    if (!isbn || !/^\d{13}$/.test(isbn)) return alert("Invalid code!");

    var doc = app.activeDocument;
    var black = doc.swatches.itemByName("Black");

    // Encoding tables for EAN‑13
    var L = ["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"];
    var G = ["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"];
    var R = ["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"];
    var parities = ["LLLLLL","LLGLGG","LLGGLG","LLGGGL","LGLLGG","LGGLLG","LGGGLL","LGLGLG","LGLGGL","LGGLGL"];

    // Build binary sequence
    var d1 = parseInt(isbn[0]);
    var p = parities[d1];
    var bin = "101"; // Start guard

    for (var i = 1; i <= 6; i++)
        bin += (p[i-1] === 'L') ? L[isbn[i]] : G[isbn[i]];

    bin += "01010"; // Center guard

    for (var j = 7; j <= 12; j++)
        bin += R[isbn[j]];

    bin += "101"; // End guard

    // Drawing parameters
    var modW = 1.2,
        hNorm = 46,
        hGuard = 54,
        startX = 50,
        startY = 50,
        x = startX;

    var items = [];

    // Draw bars
    for (var k = 0; k < bin.length; k++) {
        var isGuard = (k < 3 || (k > 44 && k < 50) || k > 91);
        if (bin[k] === "1") {
            var r = doc.rectangles.add();
            r.geometricBounds = [
                startY,
                x,
                startY + (isGuard ? hGuard : hNorm),
                x + modW
            ];
            r.fillColor = black;
            r.strokeWeight = 0;
            items.push(r);
        }
        x += modW;
    }

    // Helper: add text frame
    function addTxt(str, bnds, align, track) {
        var tf = doc.textFrames.add();
        tf.geometricBounds = bnds;
        tf.contents = str;

        var txt = tf.texts[0];
        try {
            txt.appliedFont = app.fonts.itemByName("OCR-B 10 Pitch BT");
        } catch(e) {
            try { txt.appliedFont = app.fonts.itemByName("Arial"); } catch(e){}
        }

        txt.pointSize = 28;
        txt.fillColor = black;
        txt.justification = align;
        if (track) txt.tracking = track;

        return tf;
    }

    // Text positioning
    var centerLeft = startX + (24 * modW);
    var centerRight = startX + (71 * modW);
    var boxW = 150;

    var textYTop = startY + hNorm + 4;
    var textYBot = startY + hGuard + 24;

    // Add text blocks
    var t1 = addTxt(isbn[0],
        [textYTop, startX - 30, textYBot, startX - 4],
        Justification.RIGHT_ALIGN, 0);

    var t2 = addTxt(isbn.substr(1,6),
        [textYTop, centerLeft - boxW/2, textYBot, centerLeft + boxW/2],
        Justification.CENTER_ALIGN, 180);

    var t3 = addTxt(isbn.substr(7,6),
        [textYTop, centerRight - boxW/2, textYBot, centerRight + boxW/2],
        Justification.CENTER_ALIGN, 180);

    // Convert text to outlines
    var o1 = t1.createOutlines();
    var o2 = t2.createOutlines();
    var o3 = t3.createOutlines();

    for (var a=0; a<o1.length; a++) items.push(o1[a]);
    for (var b=0; b<o2.length; b++) items.push(o2[b]);
    for (var c=0; c<o3.length; c++) items.push(o3[c]);

    // Group everything
    var grp = doc.groups.add(items);

    // Scale group
    grp.resize(
        CoordinateSpaces.PASTEBOARD_COORDINATES,
        AnchorPoint.TOP_LEFT_ANCHOR,
        ResizeMethods.MULTIPLYING_CURRENT_DIMENSIONS_BY,
        [0.2, 0.2] // 20% scale
    );

    alert("Barcode generated ✓");
}

app.doScript(
    createISBNBarcode,
    ScriptLanguage.JAVASCRIPT,
    undefined,
    UndoModes.ENTIRE_SCRIPT,
    "Generate ISBN‑13 v8"
);