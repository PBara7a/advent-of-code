import re
from collections import defaultdict
import copy

with open("input.txt") as f:
    data = f.read()
data = data.replace("\r\n", "\n") # Just in case I run this on Windows

input_top, input_bottom = data.split("\n\n", 1)

intructions = [list(map(int, re.findall(r'\d+', move))) for move in input_bottom.split("\n")]

stacks_initial_state = input_top.split("\n")[:-1]

stacks_map = defaultdict(list)
for line in stacks_initial_state:
    current_stack = 1
    for i in range(1, len(line), 4):
        if line[i] != " ":
            stacks_map[current_stack].append(line[i])
        current_stack += 1

def move_crates(intructions: list, stacks: dict, using_old_model=False) -> dict:
    stacks_copy = copy.deepcopy(stacks)
    for count, from_stack, to_stack in intructions:
        crates_to_move = stacks_copy[from_stack][:count]
        if using_old_model:
            crates_to_move.reverse()
        del stacks_copy[from_stack][:count]
        stacks_copy[to_stack] = crates_to_move + stacks_copy[to_stack]
    return stacks_copy

def get_top_crates(stacks: dict) -> str:
    return "".join(stacks[stack][0] for stack in sorted(stacks))

stacks_a = move_crates(intructions, stacks_map, using_old_model=True)
stacks_b = move_crates(intructions, stacks_map)

print("Part A: ", get_top_crates(stacks_a))
print("Part B: ", get_top_crates(stacks_b))
