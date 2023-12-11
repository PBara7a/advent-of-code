with open("input.txt") as f:
    data = [list(line) for line in f.read().split("\n")]

galaxy = "#"

def find_empty_indices(data: list, axis="x") -> list:
    if axis == "y":
        return [row for row in range(len(data)) if galaxy not in data[row]]
    return [col for col in range(len(data[0])) if all(row[col] != galaxy for row in data)]

def find_galaxy_coords(universe: list) -> list:
    return [(y, x) for y, row in enumerate(universe) for x, symbol in enumerate(row) if symbol == galaxy]

def adjust_coord(coord: int, empty_indices: list, expansion_rate: int) -> int:
    return coord + sum(1 for i in empty_indices if coord > i) * (expansion_rate - 1)

def expand_universe(coords: list, expansion_rate=2) -> list:
    empty_rows = find_empty_indices(data, axis="y")
    empty_cols = find_empty_indices(data)
    return [(adjust_coord(y, empty_rows, expansion_rate), adjust_coord(x, empty_cols, expansion_rate)) for y, x in coords]

def find_shortest_distances(coords: list) -> list:
    if len(coords) <= 1:
        return []
    current_galaxy = coords[0]
    remaining_galaxies = coords[1:]
    distances = [abs(current_galaxy[0] - galaxy_coord[0]) + abs(current_galaxy[1] - galaxy_coord[1]) for galaxy_coord in remaining_galaxies]
    return distances + find_shortest_distances(remaining_galaxies)
    
galaxy_coords = find_galaxy_coords(data)
distances_a = find_shortest_distances(expand_universe(galaxy_coords))
distances_b = find_shortest_distances(expand_universe(galaxy_coords, expansion_rate=1_000_000))

print("Part A: ", sum(distances_a))
print("Part B: ", sum(distances_b))
