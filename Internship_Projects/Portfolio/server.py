import os
import smtplib
from email.message import EmailMessage
from flask import Flask, redirect, request, send_from_directory

app = Flask(__name__, static_folder='.', static_url_path='')


@app.route('/')
def index():
    return redirect('/index.html')


@app.route('/send-email', methods=['POST'])
def send_email():
    name = (request.form.get('name') or '').strip()
    email = (request.form.get('email') or '').strip()
    message = (request.form.get('message') or '').strip()

    if not name or not email or not message:
        return redirect('/index.html?status=error&message=' + 'Please%20fill%20in%20all%20fields%20before%20sending.')

    gmail_user = os.getenv('GMAIL_USER')
    gmail_password = os.getenv('GMAIL_APP_PASSWORD')
    gmail_to = os.getenv('GMAIL_TO', gmail_user)

    if not gmail_user:
        return redirect('/index.html?status=error&message=' + 'Please%20set%20GMAIL_USER%20to%20your%20Gmail%20address.')

    if not gmail_password:
        return redirect('/index.html?status=error&message=' + 'Please%20set%20GMAIL_APP_PASSWORD%20to%20a%20valid%20Gmail%20app%20password.')

    if not gmail_to:
        return redirect('/index.html?status=error&message=' + 'Please%20set%20GMAIL_TO%20to%20the%20recipient%20email%20address.')

    try:
        msg = EmailMessage()
        msg['Subject'] = f'New message from {name}'
        msg['From'] = gmail_user
        msg['To'] = gmail_to
        msg.set_content(f'Name: {name}\nEmail: {email}\n\nMessage:\n{message}')

        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(gmail_user, gmail_password)
            server.send_message(msg)

        return redirect('/index.html?status=success&message=' + 'Your%20message%20was%20sent%20successfully.')
    except smtplib.SMTPAuthenticationError:
        return redirect('/index.html?status=error&message=' + 'Gmail%20authentication%20failed.%20Check%20your%20email%20address%20and%20app%20password.')
    except smtplib.SMTPException as exc:
        return redirect('/index.html?status=error&message=' + ('SMTP%20error:%20' + str(exc)).replace(' ', '%20'))
    except Exception as exc:
        return redirect('/index.html?status=error&message=' + ('Failed%20to%20send%20email:%20' + str(exc)).replace(' ', '%20'))


@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
