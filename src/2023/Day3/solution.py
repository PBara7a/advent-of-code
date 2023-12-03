from collections import defaultdict

with open("input.txt") as f:
    data = f.read()
data = data.replace("\r\n", "\n") # Just in case I run this on Windows
data = data.split("\n")

def calculate_gear_ratios(possible_gears: dict) -> int:
    gear_ratios_sum = 0
    for part_numbers in possible_gears.values():
        if len(part_numbers) == 2:
            gear_ratios_sum += part_numbers[0] * part_numbers[1]
    return gear_ratios_sum

def is_symbol(char: str) -> bool:
    return not char.isalnum() and adjacent_char != "."

grid = [[char for char in line] for line in data]
num_rows = len(grid)
num_cols = len(grid[0])

adjacent_positions = [
    (-1, -1), (-1, 0), (-1, 1), 
    ( 0, -1),          ( 0, 1), 
    ( 1, -1), ( 1, 0), ( 1, 1)
]

part_numbers_sum = 0
possible_gears = defaultdict(list)
for row in range(num_rows):
    current_gears_positions = set()
    current_number = 0
    is_part_number = False

    for col in range(num_cols + 1):
        if col < num_cols and grid[row][col].isdigit():
            current_number = current_number * 10 + int(grid[row][col])

            for delta_row, delta_col in adjacent_positions:
                adj_row = row + delta_row
                adj_col = col + delta_col

                if 0 <= adj_row < num_rows and 0 <= adj_col < num_cols:
                    adjacent_char = grid[adj_row][adj_col]
                    is_part_number = True if is_symbol(adjacent_char) else is_part_number

                    if adjacent_char == "*":
                        current_gears_positions.add((adj_row, adj_col))
        
        elif current_number > 0:
            for gear_position in current_gears_positions:
                possible_gears[gear_position].append(current_number)

            if is_part_number:
                part_numbers_sum += current_number

            current_number = 0
            is_part_number = False
            current_gears_positions = set()

print("Part A: ", part_numbers_sum)
print("Part B: ", calculate_gear_ratios(possible_gears))
