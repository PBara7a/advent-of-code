import re
from functools import reduce

with open("input.txt") as f:
    data = f.read().split("\n\n")
    
instructions = list(data[0])
nodes = { labels[0]: { "L": labels[1], "R": labels[2] } for line in data[1].split("\n") for labels in [re.findall("[A-Z|]{3}", line)] }

def follow_directions(desert_map: dict, instructions: list, current_node="AAA", steps=0, is_ghost=False):
    for direction in instructions:
        current_node = desert_map[current_node][direction]
        steps += 1
    if (is_ghost and not current_node.endswith("Z")) or (not is_ghost and current_node != "ZZZ"):
        return follow_directions(desert_map, instructions, current_node, steps, is_ghost)
    return steps

def find_greatest_common_divisor(a: int, b: int) -> int:
    return a if b == 0 else find_greatest_common_divisor(b, a % b)

def find_lowest_common_multiple(a: int, b: int) -> int:
    return abs(a * b) // find_greatest_common_divisor(a, b)

ghost_start_nodes = [node for node in nodes if node.endswith("A")]
ghost_step_counts = [follow_directions(nodes, instructions, node, is_ghost=True) for node in ghost_start_nodes]
sequence_lenghts = ghost_step_counts + [len(instructions)]
ghost_total_steps = reduce(find_lowest_common_multiple, sequence_lenghts)

print("Part A: ", follow_directions(nodes, instructions))
print("Part B: ", ghost_total_steps)
