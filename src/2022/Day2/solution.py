with open('input.txt') as f:
    data = f.read()

data = data.split("\n")

POINTS = { "win": 6, "draw": 3, "loss": 0 }
HAND_VALUES = { "A": 0, "B": 1, "C": 2, "X": 0, "Y": 1, "Z": 2 }
STRATEGY_MAP = { # X = lose, Y = draw, Z = win
    "X": { "A": "C", "B": "A", "C": "B" },
    "Y": { "A": "A", "B": "B", "C": "C" },
    "Z": { "A": "B", "B": "C", "C": "A" }
}

def play_hand(elf_hand: str, my_hand: str) -> int:
    result = (3 + HAND_VALUES[elf_hand] - HAND_VALUES[my_hand]) % 3
    # result: 0 -> draw, 1 -> elf wins, 2 -> I win
    if result == 2:
        return HAND_VALUES[my_hand] + 1 + POINTS["win"]
    if result == 1:
        return HAND_VALUES[my_hand] + 1 + POINTS["loss"]
    return HAND_VALUES[my_hand] + 1 + POINTS["draw"]

rounds = []
for line in data:
    rounds.append([x for x in line.split(" ")])

part_a_score = 0
part_b_score = 0
for hand in rounds:
    part_a_score += play_hand(hand[0], hand[1])
    strategy_hand = STRATEGY_MAP[hand[1]][hand[0]]
    part_b_score += play_hand(hand[0], strategy_hand)

print("Part A: ", part_a_score)
print("Part B: ", part_b_score)
