DROP TABLE IF EXISTS game_state;
CREATE TABLE game_state (
  board_id  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  game_id INTEGER,
  player_id INTEGER,
  given_scenario_id TEXT,
  selected_scenario_ids TEXT
);

DROP TABLE IF EXISTS players;
CREATE TABLE players (
  player_id  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  name TEXT NOT NULL,
  FOREIGN KEY (player_id) REFERENCES game_state (player_id)
);

DROP TABLE IF EXISTS games;
CREATE TABLE games (
  game_id  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  winner_id INTEGER,
  FOREIGN KEY (game_id) REFERENCES game_state (game_id)
);