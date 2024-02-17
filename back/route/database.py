import sqlite3
from flask import g
DB= 'db/database.db'



def creates(db):
    
    cur = db.cursor()
    
    statement = """
    CREATE TABLE IF NOT EXISTS league_results(
        
        match_id int,
        player_a char(255),
        player_b char(255),
        score_a int,
        score_b int,
        PRIMARY KEY(match_id)
        
        
    );
    
    
    --INSERT INTO league_results(match_id, player_a,player_b,score_a,score_b) VALUES(2,'hitoki','nathan',3,0);
    --INSERT INTO league_results(match_id, player_a,player_b,score_a,score_b) VALUES(3,'hitoki','kevin',3,0);
    --INSERT INTO league_results(match_id, player_a,player_b,score_a,score_b) VALUES(4,'james','hitoki',3,0);
    --INSERT INTO league_results(match_id, player_a,player_b,score_a,score_b) VALUES(5,'james','robin',3,0);
    --INSERT INTO league_results(match_id, player_a,player_b,score_a,score_b) VALUES(6,'james','kevin',3,0);
    --INSERT INTO league_results(match_id, player_a,player_b,score_a,score_b) VALUES(7,'kevin','robin',3,0);
    --INSERT INTO league_results(match_id, player_a,player_b,score_a,score_b) VALUES(8,'nathan','robin',3,0);



    
    
    
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

