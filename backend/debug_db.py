import backend.database as db
import sqlalchemy as sa

conn = db.engine.connect()
print('connected')
print(conn.execute(sa.text('SELECT name FROM sqlite_master WHERE type="table"')).fetchall())
conn.close()
