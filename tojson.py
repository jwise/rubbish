import db,json

a = db.open('dg-new.db')
obj = db.toobj(a)
print json.dumps(obj)