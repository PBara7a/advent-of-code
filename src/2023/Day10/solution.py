from collections import deque

with open("input.txt") as f:
    data = [list(line) for line in f.read().split("\n")]

pipes = {
    "|": { "in": {(-1,  0), ( 1,  0)}, "out": {(-1,  0), (1,  0)} },
    "L": { "in": {( 1,  0), ( 0, -1)}, "out": {(-1,  0), (0,  1)} },
    "J": { "in": {( 1,  0), ( 0,  1)}, "out": {(-1,  0), (0, -1)} },
    "-": { "in": {( 0, -1), ( 0,  1)}, "out": {( 0, -1), (0,  1)} },
    "7": { "in": {( 0,  1), (-1,  0)}, "out": {( 0, -1), (1,  0)} },
    "F": { "in": {( 0, -1), (-1,  0)}, "out": {( 0,  1), (1,  0)} },
    "S": { "in": set(), "out": set() }
}

def find_start_position(sketch: list) -> tuple:
    for y, row in enumerate(sketch):
        if "S" in row:
            return (y, row.index("S"))

def find_start_pipe(coord: tuple, sketch: list, pipes: dict) -> str:
    row, col = coord
    adjacent_positions = [(-1, 0), (0, 1), (1, 0), (0, -1)]

    out_connections = {(delta_row, delta_col) for delta_row, delta_col in adjacent_positions 
        if 0 <= row + delta_row < len(sketch) and 0 <= col + delta_col < len(sketch[0]) 
        and is_pipe(sketch[row + delta_row][col + delta_col]) 
        and (delta_row, delta_col) in pipes[sketch[row + delta_row][col + delta_col]]["in"]}

    for pipe, connections in pipes.items():
        if connections["out"] == out_connections:
            pipes["S"] = connections
            return pipe

def is_pipe(item: str) -> bool:
    return item in pipes
   
def pipes_connect(current_pipe: str, next_pipe: str) -> bool:
    return len(pipes[current_pipe]["out"].intersection(pipes[next_pipe]["in"])) > 0

def measure_pipe_loop(start_coord: tuple, sketch: list):
    visited = set()
    queue = deque([start_coord])
    steps = 0

    while queue:
        row, col = queue.popleft()
        visited.add((row, col))
        steps += 1

        for delta_row, delta_col in pipes[sketch[row][col]]["out"]:
            adj_row, adj_col = row + delta_row, col + delta_col
            next_coord = (adj_row, adj_col)

            if (0 <= adj_row < len(sketch) and 0 <= adj_col < len(sketch[0]) 
                and is_pipe(sketch[adj_row][adj_col]) 
                and pipes_connect(sketch[row][col], sketch[adj_row][adj_col])
                and next_coord not in visited):

                queue.append(next_coord)
    return steps

start = find_start_position(data)
find_start_pipe(start, data, pipes)
total_steps = measure_pipe_loop(start, data)

print("Part A: ", int(total_steps / 2))
