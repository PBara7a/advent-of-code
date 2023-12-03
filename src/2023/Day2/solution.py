with open("input.txt") as f:
    data = f.read()
data = data.replace("\r\n", "\n") # Just in case I run this on Windows
data = data.split("\n")

def parse_group(group: str) -> dict:
    parsed_group = {}
    for item in group.split(", "):
        count, color = item.strip().split(" ")
        parsed_group[color] = int(count)
    return parsed_group

def parse_game(game_line: str) -> dict:
    game_id, groups = game_line.split(":")
    game_id = int(game_id.split(" ")[-1])
    groups = groups.split(";")
    groups_dict = {i: parse_group(group) for i, group in enumerate(groups, start=1)}
    return { "id": game_id, "groups": groups_dict }

def is_valid_game(game: dict) -> bool:
    return not any(group.get("red", 0) > 12 or group.get("green", 0) > 13 or group.get("blue", 0) > 14 for group in game["groups"].values())

def calculate_power(game: dict) -> int:
    max_cubes = [0, 0, 0] # R, G, B
    for group in game["groups"].values():
        cur_red = group.get("red", 0)
        cur_green = group.get("green", 0)
        cur_blue = group.get("blue", 0)
        max_cubes = [max(a, b) for a, b in zip(max_cubes, [cur_red, cur_green, cur_blue])]
    return max_cubes[0] * max_cubes[1] * max_cubes[2]
    
parsed_games = [parse_game(game) for game in data]

id_sum, power_sum = 0, 0
for game in parsed_games:
    if is_valid_game(game):
        id_sum += game["id"]

    power_sum += calculate_power(game)

print("Part A: ", id_sum)
print("Part B: ", power_sum)
