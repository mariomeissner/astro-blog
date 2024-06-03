---
title: 5 things I learned from reading 'Fluent Python'
description: A great book to learn how to write pythonic code
pubDatetime: 2024-06-03
tags:
  - technical
  - python
---

I’ve been a Python developer ever since my second year of undergraduate, when a math professor introduced me to the language as part of a mathematics course. Having only learned Java and C thus far, Python blew my mind away with its dynamism and simplicity. It felt like an elegant hacker’s tool.

Yet more often than not, university Python code looks too much like Java and C, and not enough like Python. I saw too many `for` loops using an integer iterator, and no single list comprehension anywhere.

I strive to write clean and pythonic Python code, so whenever I see something that feels odd, I go online and look for a cleaner way. But I never actually read any serious book about how to write pythonic code. Last weekend I finally decided to change that, so I read Fluent Python by Luciano Ramalho. This post is a summary of the little new pythonic bits I learned.

## Generator expressions

Just like we can write the following to instantiate a list:

```python
my_list = [element for element in some_iterable]
```

We can do the same like this to create an iterator without instantiating the list (and thus polluting memory):

```python
my_generator = (element for element in some_iterable)
```

Until I learned about this, I thought that `yield` is the only way to achieve it. This generator expression should definitely be used before list comprehensions if the whole list is not required to be on memory at once.

## Pattern matching with mappings

Pattern matching was arguably the biggest new feature coming in Python 3.10. I knew it was powerful, but did’t yet have a chance to play around with it extensively. Turns out it is extremely flexible, while remaining intuitive. Very pythonic indeed! What surprised me the most is being able to match against partial mapping definitions, like this:

```jsx
def get_creators(record: Mapping) -> list:
	match record:
		case {'type': 'book', 'api': 2, 'authors': [*names]}:
			return names
		case {'type': 'book', 'api': 1, 'author': name}:
			return [name]
		case {'type': 'book'}:
			raise ValueError(f"Invalid 'book' record: {record!r}")
		case {'type': 'movie', 'director': name}:
			return [name]
		case _:
			raise ValueError(f'Invalid record: {record!r}')
```

This is so much better than writing a chain of if-else clauses!

## Don’t use mutable defaults

I learned about the issues of using a mutable default in this book, and it was exemplified with a wonderful example about a bus with ghost passengers:

```python
class HauntedBus:
	"""A bus model haunted by ghost passengers"""
	def __init__(self, passengers=[]):
		self.passengers = passengers
	def pick(self, name):
		self.passengers.append(name)
	def drop(self, name):
		self.passengers.remove(name)
```

Basically, python will resolve `[]` to an object with a memory address, and assign that address to all calls of `__init__`, so all buses that use the default value will share their passengers! If we have two buses with default empty passenger list, and `bus1` calls `pick('charlie')` , `bus2` will suddenly have `charlie` on board too!

The correct approach is to use `None` as a default, and then assign a new list in the `__init__` method:

```python
class Bus:
    """A bus model without ghost passengers"""
    def __init__(self, passengers=None):
        if passengers is None:
            self.passengers = []
        else:
            self.passengers = list(passengers)
```

## List comprehensions are better than map, filter and reduce

Not much to say here, I agree with this take. List comprehensions and generator expressions look very clean, and are much easier to read and understand. Use those instead of `map` and `filter` whenever you can. As for `reduce`, there are multiple custom reduce functions are built in to python and cover 99% of the reduce use-cases: `sum`, `all` and `any`.

There will always be some situations where the only way forward is to use one of those functions, but I would avoid it when possible in favor of readability.

## Type hinting with Protocols

We’ve had Abstract Base Classes (ABCs) in Python for a long while, and they were a great tool to declare intent of what behavior a class should be adopting, and can also be used for type hints. However, since Python 3.8, we now have `Protocol` classes, that enable us to define behaviors for static type checking without having to inherit from them. For example:

```python
from typing import Protocol

class Duck(Protocol):
  def quack(self) -> str:
    print("Quack!")

class MyPet():
  def quack(self) -> str:
    print("Oink")

def talk_with_duck(duck: Duck):
  duck.quack()

>> my_pet = MyPet()
>> talk_with_duck(my_pet) # This is correct!
```

Our custom pet class has everything necessary to implicitly “implement” the `Duck` protocol, so static type checkers will be happy with the fact that we are passing an instance of `MyPet` to the function taking a `Duck` as a parameter. Note that `isinstanceof(my_pet, Duck)` is still false.

There’s also many protocols provided by the `typing` module for us to use, such as `Iterator`, `Iterable`, `Optional` , etc.

Protocols are a formalization of _duck typing_, which has been a common usage pattern in Python for the longest time, and I love how Protocols decided to embrace this. A great way to preserve the dynamic and flexible nature of Python while introducing more static type checking capabilities. Way to go!
