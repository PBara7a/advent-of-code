with open("input.txt") as f:
    data = f.read()
data = data.replace("\r\n", "\n") # Just in case I run this on Windows
data = data.split("\n")

def parse_card(card: str) -> dict:
    numbers = card.split(": ")[1]
    winning_numbers, card_numbers = numbers.split(" | ")
    winning_numbers = winning_numbers.split()
    card_numbers = card_numbers.split()
    return { "winning_numbers": winning_numbers, "card_numbers": card_numbers, "copies": 1 }

parsed_cards = [parse_card(card) for card in data]

points, scratch_cards = 0, 0
for card_id, card in enumerate(parsed_cards, start=1):
    num_winners = len(set(card["winning_numbers"]).intersection(set(card["card_numbers"])))
    card_score = 2 ** (num_winners - 1) if num_winners > 0 else 0
    
    points += card_score
    scratch_cards += card["copies"]

    for next_card in range(card_id, card_id + num_winners):
        parsed_cards[next_card]["copies"] += card["copies"]

print("Part A: ", points)
print("Part B: ", scratch_cards)
