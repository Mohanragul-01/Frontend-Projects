export const copyToClipboard = (text) => {
  // Create a temporary textarea element
  const textarea = document.createElement('textarea');
  textarea.value = text;
  
  // Make it non-visible
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  
  // Add to the DOM
  document.body.appendChild(textarea);
  
  // Select and copy
  textarea.select();
  document.execCommand('copy');
  
  // Clean up
  document.body.removeChild(textarea);
  
  return true;
};