import random


class Die:

    def __init__(self, num_sides=6):
        self._num_sides = num_sides

    def __str__(self):
        return f'This die has {self._num_sides} sides.'

    def __repr__(self):
        return f'Die({self._num_sides})'

    def get_sides(self):
        return self._num_sides

    def roll_die(self):
        return random.randint(1, self._num_sides)
