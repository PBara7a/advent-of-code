import heapq

with open('input.txt') as f:
    data = f.read()

data = data.replace('\r\n', '\n') # Just in case I run this in Windows
data = data.split("\n\n")

elves = []
for elf in data:
    elfCals = [int(cals) for cals in elf.split("\n")]
    elves.append(sum(elfCals))

top3Elves = heapq.nlargest(3, elves)

print("Part A: ", max(elves))
print("Part B: ", sum(top3Elves))