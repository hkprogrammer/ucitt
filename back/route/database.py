import sqlite3
from flask import g
DB= 'db/database.db'



def creates(db):
    
    cur = db.cursor()
    
    statement = """
    CREATE TABLE IF NOT EXISTS league_result(
        
        match_id int,
        player_a char(255),
        player_b char(255),
        score_a int,
        score_b int,
        PRIMARY KEY(match_id)
        
        
    );
    
    
    CREATE TABLE IF NOT EXISTS Player(
       
        player_ucitt_id int, 
        player_name char(255) NOT NULL,
        player_nctta_id int,
        player_usatt_id int,
        player_ucitt_rating int CHECK(player_ucitt_rating >= 0),
        player_nctta_rating int CHECK(player_ucitt_rating >= 0),
        player_usatt_rating int CHECK(player_ucitt_rating >= 0),
        PRIMARY KEY(player_ucitt_id)

    );
    
    --INSERT INTO Player(player_ucitt_int,player_name, player_ucitt_rating) VALUES(1,'Hitoki', 1930);
    --INSERT INTO Player(player_ucitt_int,player_name, player_ucitt_rating) VALUES(2,'Robin', 700);
    
    """
    cur.executescript(statement)
    
    


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DB)
        
        
    db.row_factory = dict_factory
    creates(db)
    
    return db

