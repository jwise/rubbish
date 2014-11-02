import db

a = db.open('dg-new.db')
db.updurls(a)
while db.getone(a):
  pass
