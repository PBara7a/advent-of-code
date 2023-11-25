with open("input.txt") as f:
    data = f.read()
data = data.replace("\r\n", "\n") # Just in case I run this in Windows
data = data.split("\n")

pairs = [[list(map(int, range_pair.split("-"))) for range_pair in line.split(",")] for line in data]

def is_fully_contained(section_a: list, section_b: list) -> bool:
    return (section_a[0] >= section_b[0] and section_a[1] <= section_b[1]) or (section_a[0] <= section_b[0] and section_a[1] >= section_b[1])

def is_overlaping(section_a: list, section_b: list) -> bool:
    return section_a[1] >= section_b[0] and section_b[1] >= section_a[0]

fully_contained_count = sum(is_fully_contained(pair[0], pair[1]) for pair in pairs)
overlaping_count = sum(is_overlaping(pair[0], pair[1]) for pair in pairs)

print("Part A: ", fully_contained_count)
print("Part B: ", overlaping_count)
