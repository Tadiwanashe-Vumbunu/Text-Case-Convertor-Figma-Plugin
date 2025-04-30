
// Function to convert text case
function textCaseConverter(text, type) {
    switch (type) {
        case "uppercase":
            return text.toUpperCase();
        case "lowercase":
            return text.toLowerCase();
        case "titlecase":
            return text
                .toLowerCase()
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
        case "sentencecase":
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        default:
            return text;
    }
}
figma.showUI(__html__);

figma.ui.onmessage = async (msg) => {
    if (msg.type === "convert-text-case") {
      const caseType = msg.caseType;
  
      const selectedTextNodes = figma.currentPage.selection.filter(
        node => node.type === "TEXT"
      ).filter(node => node.type === "TEXT");
  
      for (const node of selectedTextNodes) {
        if ("characters" in node) {
          await figma.loadFontAsync(node.fontName);
  
          const originalText = node.characters;
          const newText = textCaseConverter(originalText, caseType);
  
    
          for (let i = 0; i < originalText.length; i++) {
            node.deleteCharacters(i, i + 1);
            node.insertCharacters(i, newText[i]);
          }
        }
      }
      
      figma.notify("Text conversion to "+ caseType + " completed.");	
    }
    if (msg.type === "close-plugin") {
        figma.closePlugin();
      }
  };
  

if (typeof figma !== "undefined") {
    figma.showUI(__html__, { width: 400, height: 415 });
}
else {
    console.error("figma object is not available. Ensure this code runs in the Figma plugin environment.");
}
