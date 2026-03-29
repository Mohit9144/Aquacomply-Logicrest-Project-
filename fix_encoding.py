
import os
import re

path = r'c:\Aquacomply logicrest\enterprise-ui.html'
with open(path, 'rb') as f:
    content = f.read()

# Common mangled UTF-8 in ISO-8859/Win-1252
mangled = {
    b'\xc3\xa2\xe2\x82\xac\xc2\xa2': b'&#8226;',
    b'\xc3\xa2\xe2\x80\x9c': b'&#8212;',
    b'\xc3\xa2\xe2\x80\x94': b'&#8212;',
    b'\xc3\xa2\xe2\x82\xac\xe2\x80\x94': b'&#8212;',
    b'\xc3\xa2\xe2\x82\xac\xc5\x93': b'&#8220;',
    b'\xc3\xa2\xe2\x82\xac\x9d': b'&#8221;',
    b'\xc3\xa2\xe2\x80\xa2': b'&#8226;',
    b'\xc3\x82\xc2\xb7': b'-',
}

for k, v in mangled.items():
    content = content.replace(k, v)

# String fixes for things I saw in screenshot
import_text = content.decode('utf-8', 'ignore')
import_text = import_text.replace('AÃ§Ã¢â‚¬Â¹Aâ€™', 'Elevated') # Specific fix for screenshot "Elevated Flow"
import_text = import_text.replace('Period: March 2026 Ã¢Ãâ¬Ãâ¢', 'Period: March 2026 &#8226;')

# Collapse multiple newlines into single or double newlines properly
import_text = re.sub(r'\n\s*\n\s*\n+', '\n\n', import_text)
# Optional: remove absolute trailing spaces
import_text = '\n'.join([line.rstrip() for line in import_text.splitlines()])

with open(path, 'w', encoding='utf-8') as f:
    f.write(import_text)

print("Sanitization complete.")
