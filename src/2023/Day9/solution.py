with open("input.txt") as f:
    data = [[int(value) for value in line.split()] for line in f.read().split("\n")]

def generate_difference_sequences(line: list, difference_sequences=None) -> list:
    if difference_sequences is None:
        difference_sequences = [line]

    current_sequence = [line[i + 1] - line[i] for i in range(len(line) - 1)]
    difference_sequences.append(current_sequence)

    if any(item != 0 for item in current_sequence):
        return generate_difference_sequences(current_sequence, difference_sequences)
    return difference_sequences

def predict_next_value(sequences: list) -> int:
    return sum(seq[-1] for seq in sequences)

def predict_previous_value(sequences: list) -> int:
    value = 0
    for i in range(len(sequences)-2, -1, -1):
        value = sequences[i][0] - value
    return value

next_values_sum = sum(predict_next_value(generate_difference_sequences(line)) for line in data)
previous_values_sum = sum(predict_previous_value(generate_difference_sequences(line)) for line in data)

print("Part A: ", next_values_sum)
print("Part B: ", previous_values_sum)
