/* script.js */
const thumbs=document.querySelectorAll('.thumb');
const heroImage=document.getElementById('heroImage');
thumbs.forEach(t=>t.addEventListener('click',()=>{const src=t.getAttribute('data-src');if(src)heroImage.src=src;}));