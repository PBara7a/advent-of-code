from functools import reduce

with open("input.txt") as f:
    data = [line.split()[1:] for line in f.read().split("\n")]

races = [(int(time), int(distance)) for time, distance in zip(data[0], data[1])]

def count_ways_to_win(time_limit: int, distance_record: int) -> int:
    return sum(1 for mils in range(1, time_limit) if (time_limit - mils) * mils > distance_record)

total_a = reduce(lambda x, race: x * count_ways_to_win(race[0], race[1]), races, 1)
total_b = count_ways_to_win(int("".join(data[0])), int("".join(data[1])))

print("Part A: ", total_a)
print("Part B: ", total_b)
