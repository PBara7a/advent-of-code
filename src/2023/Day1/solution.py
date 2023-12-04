import re

with open("input.txt") as f:
    data = f.read().split("\n")

def replace_number_words(line: str, inverted=False) -> str:
    def replace_with_number(match):
        word = match.group(0)[::-1] if inverted else match.group(0)
        return str(word_to_digit_map[word])
    
    word_to_digit_map = { "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9 }
    pattern = "one|two|three|four|five|six|seven|eight|nine"
    pattern = pattern[::-1] if inverted else pattern

    res = re.sub(pattern, replace_with_number, line)
    return res[::-1] if inverted else res

def get_calibrations(data: list, replace_words=False) -> list:
    def process_line(line: str, inverted=False) -> str:
        if replace_words:
            line = replace_number_words(line, inverted=inverted)
        return "".join(re.findall(r"\d+", line))
    
    calibrations = []
    for line in data:
        extracted_digits = process_line(line)

        if replace_words:
            extracted_digits_inverted = process_line(line[::-1], inverted=True)
            extracted_digits += extracted_digits_inverted

        calibration = int(extracted_digits[0] + extracted_digits[-1])
        calibrations.append(calibration)
    return calibrations

print("Part A: ", sum(get_calibrations(data)))
print("Part B: ", sum(get_calibrations(data, replace_words=True)))
