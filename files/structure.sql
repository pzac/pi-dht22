CREATE TABLE IF NOT EXISTS data(
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  temperature FLOAT,
  humidity FLOAT
);

CREATE INDEX time_index ON data(time);
