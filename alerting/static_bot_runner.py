import telebot
bot = telebot.TeleBot('1029001716:AAGHzYsNcN33ZiGqq9Ubn4c5Wee1Qiu9MHA')
path_id_list = 'bot_id_list'

def add_id(chat_id):
    with open(path_id_list, 'r') as f:
        id_list = [x.strip() for x in f.readlines()]
        if chat_id not in id_list:
            write_to_end(chat_id)

def write_to_end(chat_id):
    with open(path_id_list, 'a') as f:
        f.write(str(chat_id) + '\n')

def write(chat_id_list):
    with open(path_id_list, 'w') as f:
        for line in chat_id_list:
            f.write(str(line) + '\n')
        
def remove_id(chat_id):
    with open(path_id_list, 'r') as f:
        new_id_list = [x.strip() for x in f.readlines() if x != str(chat_id) + '\n']
        write(new_id_list)

@bot.message_handler(commands=['start'])
def start_message(message):
    add_id(message.chat.id)
    hello_text = """
    Привет!\nЯ буду отправлять тебе уведомления о подозрительных событиях, чтобы ты вовремя успел все починить;)
    """
    bot.send_message(message.chat.id, hello_text)

@bot.message_handler(commands=['end'])
def unsubscribe(message):
    remove_id(message.chat.id)
    bot.send_message(message.chat.id, 'Я больше не буду присылать уведомления :(')
    
bot.polling()
