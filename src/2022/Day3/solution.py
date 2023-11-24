with open('input.txt') as f:
    data = f.read()

def determine_priority(char: str) -> int:
    if char == char.lower():
        return ord(char) - 96
    return ord(char) - 38

def find_repeated_item(group: list) -> str:
    item = set(group[0])
    for rucksack in group[1:]:
        item = item.intersection(set(rucksack))
    return item.pop()

rucksacks = data.split("\n")
elf_groups = [rucksacks[i : i + 3] for i in range(0, len(rucksacks), 3)]

item_priorities = []
for rucksack in rucksacks:
    mid = len(rucksack) // 2
    compartments = [rucksack[:mid], rucksack[mid:]]

    item = find_repeated_item(compartments)
    item_priorities.append(determine_priority(item))

badge_priorities = []
for group in elf_groups:
    badge = find_repeated_item(group)
    badge_priorities.append(determine_priority(badge))

print("Part A: ", sum(item_priorities))
print("Part B: ", sum(badge_priorities))
