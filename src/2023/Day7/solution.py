from collections import Counter

with open("input.txt") as f:
    data = f.read().split("\n")

def get_hand_weight(cards: str, using_jokers=False) -> int:
    hand_weights = { "Five of a Kind": 7, "Four of a Kind": 6, "Full house": 5, "Three of a Kind": 4, "Two pair": 3, "One pair": 2, "High card": 1 }
    card_counts = Counter(cards)
    if using_jokers:
        card_counts = dict(card_counts)
        jokers = card_counts.pop("J", 0)
        if jokers == 5:
            return hand_weights["Five of a Kind"]
        most_common_card = max(card_counts, key=card_counts.get, default=None)
        if most_common_card and jokers:
            card_counts[most_common_card] += jokers        
    card_counts = Counter(card_counts).most_common()
    most_common = card_counts[0]

    if most_common[1] == 5:
        return hand_weights["Five of a Kind"]
    if most_common[1] == 4:
        return hand_weights["Four of a Kind"]
    second_most_common = card_counts[1]
    if most_common[1] == 3:
        if second_most_common[1] == 2:
            return hand_weights["Full house"]
        return hand_weights["Three of a Kind"]
    if most_common[1] == 2:
        if second_most_common[1] == 2:
            return hand_weights["Two pair"]
        return hand_weights["One pair"]
    return hand_weights["High card"]

def get_card_value(card: str, using_jokers: bool) -> int:
    values_map = { "A": 14, "K": 13, "Q": 12, "J": 11 if not using_jokers else 1, "T": 10 }
    return int(card) if card.isdigit() else values_map[card]

def is_stronger_hand(hand_a: str, hand_b: str, using_jokers=False) -> bool:
    for card_a, card_b in zip(hand_a, hand_b):
        if card_a != card_b:
            return get_card_value(card_a, using_jokers) > get_card_value(card_b, using_jokers)
    return False

def process_hands(data: list, using_jokers=False) -> list:
    hands = [{ "cards": cards, "bid": int(bid), "weight": get_hand_weight(cards, using_jokers) } for cards, bid in (line.split() for line in data)]
    hands.sort(key=lambda x: x["weight"])
    for i in range(len(hands) - 1):
        for j in range(len(hands) - 1 - i):
            current_hand, next_hand = hands[j], hands[j + 1]
            if current_hand["weight"] == next_hand["weight"] and is_stronger_hand(current_hand["cards"], next_hand["cards"], using_jokers):
                hands[j], hands[j + 1] = next_hand, current_hand
    return hands

def calculate_winnings(hands: list) -> int:
    return sum(hand["bid"] * rank for rank, hand in enumerate(hands, start=1))

print("Part A: ", calculate_winnings(process_hands(data)))
print("Part B: ", calculate_winnings(process_hands(data, using_jokers=True)))
