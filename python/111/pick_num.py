import random
random_integer = random.randint(1, 100)
num_found: bool = False
guess = None
guesses = 0
closest_high: int = 101
closest_low: int = 0
while num_found is False:
    temp = input('Guess a number between 1 and 100. ')
    try:
        guess = int(temp)
    except ValueError:
        print('That is not a number!!!')
        continue
    if guess < 1 or guess > 100:
        print('That is not a number BETWEEN 1 AND 100!!!')
    else:
        guesses += 1
        if guess >= closest_high:
            print(
                f'You are an idiot! I already told you its less than {closest_high}.')
        elif guess <= closest_low:
            print(f'Imbicile! I already told you its more than {closest_low}.')
        elif guess > random_integer:
            closest_high = guess
            print('Nice try but too high!')
        elif guess < random_integer:
            print('Too low! Try again.')
            closest_low = guess
        else:
            num_found = True
            print(f'You got it! It took {guesses} guesses.')
