from flask import Flask, render_template, request, jsonify
import secrets

app = Flask(__name__, static_url_path='/static', static_folder='static')

@app.route('/', methods=['GET', 'POST'])
def home():
    user = secrets.choice(seq=[0, 1])
    return render_template('index.html', user=user)

@app.route('/api', methods=['GET', 'POST'])
def api():
    data = request.json
    
    print('Data received:', data)
    
    response = {
        'result': 'Success!'
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
