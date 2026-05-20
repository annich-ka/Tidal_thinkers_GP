from flask import Flask, render_template


def create_app():
    app = Flask(__name__)

    @app.route("/")
    def index():
        return render_template(
            "index.html",
            title="Tidal Thinkers",
            active_page="home",
        )

    @app.route("/take-action")
    def take_action():
        return render_template(
            "take_action.html",
            title="Take Action | Tidal Thinkers",
            active_page="take_action",
        )

    @app.route("/about")
    def about():
        return render_template(
            "about.html",
            title="About | Tidal Thinkers",
            active_page="about",
        )

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)
