# Kindo

A two-player territory game on a 5×5 board: grow from your King, wall off your tiles, and capture the opponent's King. Designed by Paul Vauvrey.

## Language

### Board

**Tile**:
One of the 25 squares on the board.
_Avoid_: square, cell

**Neutral tile**:
A tile nobody owns.
_Avoid_: empty, blank

**King**:
A player's starting tile, in their corner. Capturing it wins the game.
_Avoid_: crown, king tile

**Territory**:
All the tiles a player owns.
_Avoid_: area, land

**Wall**:
A barrier on one edge of a tile, which blocks the opponent from capturing that tile from that side. A tile has at most one wall.
_Avoid_: fence, shield

**Unwallable tile**:
A tile that can never hold a wall: the Kings and the top-left to bottom-right diagonal.
_Avoid_: bracket tile (the bracket is only its icon)

**Last-played marker**:
The mark on tiles a player claimed or captured during their most recent turn. It clears when that player's next turn starts.
_Avoid_: fresh, recent

### Moves and consequences

**Claim**:
A move that takes a neutral tile next to one of your tiles.
_Avoid_: convert, place

**Capture**:
A move that takes an opponent's tile next to one of your tiles, unless a wall on that side blocks it.
_Avoid_: attack, steal

**Cut off**:
Describes an opponent's tile with no connected path of their tiles back to their King.
_Avoid_: isolated, detached

**Mass capture**:
Taking every cut-off tile as a result of a capture.
_Avoid_: chain capture, sweep

**Bonus move**:
An extra move for a player's next turn, earned by a mass capture or by having a last-played tile captured. A turn never has more than 4 moves.
_Avoid_: extra move, free move

### Play

**Move**:
A single action: claiming a tile, capturing a tile, or placing a wall. Each move uses up one of the player's available moves.
_Avoid_: action, play

**Action**:
Anything a player does that goes in the game record: a Move or a Resignation.
_Avoid_: event, command

**Game record**:
The permanent account of a game: its seats and the ordered list of actions. The board at any point is rebuilt from it.
_Avoid_: save, game state, history

**Turn**:
One player's sequence of moves. It ends when that player has no moves left.
_Avoid_: round

**Opening turn**:
Player 1's first turn, which has only 1 move to offset the advantage of going first.
_Avoid_: first move

### Participants

**Seat**:
One of the two fixed positions in a game, P1 or P2. P1 owns the bottom-left King and moves first. The seat decides the default color and where the King sits.
_Avoid_: side, slot, "player 1" (when the seat is meant)

**Player**:
Whoever occupies a seat in a particular game, shown by a display name and an avatar. A player is one of three kinds: Local (a person on this device), AI (with a difficulty level), or Remote (someone on another device).
_Avoid_: controller, participant

**User**:
An account. A user takes part in a game as a player. Usernames, avatars, levels and equipped colors belong to the user.
_Avoid_: account holder, profile, member

**Opponent**:
From one player's point of view, the player in the other seat.
_Avoid_: enemy, rival

### Ending the game

**Trapped King**:
A loss by a player who starts their turn with no legal move: they own only their King, and both of its neighbors are opponent tiles walled toward it.
_Avoid_: stalemate, smothered

**Resignation**:
A player conceding the game, allowed at any time, including during the opponent's turn. It is not a Move.
_Avoid_: forfeit, surrender, quit

**Result**:
How a finished game ended: the winner and the end reason (King captured, Trapped King, or Resignation).
_Avoid_: outcome, score
