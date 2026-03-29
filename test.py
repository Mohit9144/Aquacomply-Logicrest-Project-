import sys

with open(r"c:\Aquacomply logicrest\enterprise-ui.html", "r", encoding="utf-8") as f:
    content = f.read()

lines = content.split('\n')
stack = []
for i, line in enumerate(lines):
    for j, char in enumerate(line):
        if char in '({[':
            stack.append((char, i+1, j+1))
        elif char in ')}]':
            if not stack:
                print(f"Unmatched {char} at line {i+1} col {j+1}")
            else:
                last_char, last_line, last_col = stack.pop()
                if (char == ')' and last_char != '(') or \
                   (char == '}' and last_char != '{') or \
                   (char == ']' and last_char != '['):
                    print(f"Mismatched {char} at line {i+1} col {j+1}. matches with {last_char} at {last_line}:{last_col}")

if stack:
    print(f"Unclosed braces: {stack}")
else:
    print("All braces matched perfectly (in terms of pairing).")
