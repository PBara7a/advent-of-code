with open("input.txt") as f:
    data = [line.split(":") for line in f.read().split("\n\n")]

seeds = [int(seed) for seed in data[0][1].split()]
maps = { conversion_map[0]: [[int(val) for val in line.split()] 
       for line in conversion_map[1].strip().split("\n")] for conversion_map in data[1:] }

def process_map(value: int, ranges: list) -> int:
    for start, end, step in ranges:
        if end <= value < end + step:
            return start + (value - end)
    return value

def process_all_maps(value: int, conversion_maps: dict) -> int:
    current_value = value
    for m in conversion_maps.values():
        current_value = process_map(current_value, m)
    return current_value

def find_lowest_location(seeds: list, conversion_maps: dict) -> int:
    return min(process_all_maps(seed, conversion_maps) for seed in seeds)

print("Part A: ", find_lowest_location(seeds, maps))
