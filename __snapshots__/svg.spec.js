exports['Converters svg should convert a basic file tree 1'] = `
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve">
  <style>
    .standard {
      font: bold 9px sans-serif;
    }
  </style>
  <svg x="0" y="0">
    <rect x="0" y="9" width="1" height="45" fill= "#000" />
    
    <text x="0" y="9" class="standard">tree.md</text>
    <text x="9" y="18" class="standard">.gitignore</text>
    <text x="9" y="27" class="standard">LICENSE</text>
    <text x="9" y="36" class="standard">README.md</text>
    
    <rect x="0" y="50" width="9" height="1" fill="#000" />
    <svg x="9" y="45">
        <rect x="0" y="9" width="1" height="27" fill= "#000" />
        
        <text x="0" y="9" class="standard">src</text>
        <text x="9" y="18" class="standard">file-builder.js</text>
        
        <rect x="0" y="32" width="9" height="1" fill="#000" />
        <svg x="9" y="27">
            
            <text x="0" y="9" class="standard">models</text>
            <text x="9" y="18" class="standard">file-tree.js</text>
            
        </svg>
    </svg>
  </svg>
</svg>
`
