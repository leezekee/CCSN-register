import json

from flask import Flask, render_template, request, url_for, jsonify
from flask_cors import CORS
import pymysql

app = Flask(__name__, template_folder="./templates", static_folder="./static")
CORS(app, resources=r'/*')


@app.route("/reg", methods=["GET", "POST"])
def reg():
	if request.method == "GET":
		return render_template("register.html")


@app.route("/reg/data", methods=["POST"])
def getData():
	raw_data = request.get_data(as_text=True)
	print(raw_data)
	data = json.loads(raw_data)
	if save(data):
		res = {"status": "success"}
	else:
		res = {"status": "fail"}
	return json.dumps(res)


def save(dic):
	db = pymysql.connect(host='localhost',
	                     user='root',
	                     password='123456',
	                     database='reg')
	cursor = db.cursor()
	insertSql = "INSERT INTO `reg`.`reg_test_table` (`p_name`, `p_email`, `p_tel`, `p_school`, `p_major`, `p_class`, `p_selfintro`) " \
	            f"VALUES ('{dic['name']}', '{dic['email']}', '{dic['tel']}', '{dic['school']}', '{dic['major']}', '{dic['class']}', '{dic['intro']}')"
	print(insertSql)
	try:
		cursor.execute(insertSql)
		db.commit()
		print("=============add 1 message=====================")
	except:
		db.rollback()
		db.close()
		return False
	db.close()
	return True

if __name__ == "__main__":
	app.run(host='0.0.0.0', port=9000)
