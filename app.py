from flask import Flask, render_template
app = Flask(__name__)


@app.route("/")
def atlanta():
    return render_template("atlanta.html")


@app.route("/fulton")
def fulton():
    return render_template("index.html")


@app.route("/crime")
def crime():
    return render_template("crime.html")


if __name__ == '__main__':
    app.run()
