# from config import HOST, USERNAME, PASSWORD, PORT, MailBody
# from ssl import create_default_context
# from email.mime.text import MIMEText
# from smtplib import SMTP

# def send_mail(data):
#     msg = MailBody(**data)
#     message = MIMEText(msg.message, "html")
#     message["From"] = USERNAME
#     message["To"] = msg.recipient_email  
#     message["Subject"] = msg.subject

#     ctx = create_default_context()

#     try:
#         with SMTP(HOST, PORT) as server:
#             server.ehlo()
#             server.starttls(context=ctx)
#             server.ehlo()
#             server.login(USERNAME, PASSWORD)
#             server.send_message(message)
#             server.quit()
#         return {"status": 200, "errors": None}
#     except Exception as e:
#         return {"status": 500, "error": str(e)}

from config import HOST, USERNAME, PASSWORD, PORT, MailBody
from ssl import create_default_context
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from smtplib import SMTP

def send_mail(data):
    msg = MailBody(**data)

    # Create a multipart message
    message = MIMEMultipart()
    message["From"] = USERNAME
    message["To"] = msg.recipient_email  
    message["Subject"] = msg.subject

    # Attach the HTML message
    message.attach(MIMEText(msg.message, "html"))

    ctx = create_default_context()

    try:
        with SMTP(host=HOST, port=PORT) as server:
            server.starttls(context=ctx)
            server.login(USERNAME, PASSWORD)
            server.send_message(message)
        return {"status": 200, "errors": None}
    except Exception as e:
        return {"status": 500, "error": str(e)}

