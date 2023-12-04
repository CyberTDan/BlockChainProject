import json
import logging
import bot_messages

from telegram import InlineQueryResultArticle, InputTextMessageContent, Update
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters
from web3 import Web3

# Ethereum node connection
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))

# Contract ABI and address
contract_address = 'TODO: insert contract address' # non-checksum address
contract_address = Web3.to_checksum_address(contract_address)     # we need to convert it to a checksum format

with open('abi.json', 'r') as abi_file:
    contract_abi = json.load(abi_file)

contract = w3.eth.contract(address=contract_address, abi=contract_abi)

# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logging.getLogger("httpx").setLevel(logging.WARNING)
logger = logging.getLogger(__name__)

# Our command handlers
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(bot_messages.MESSAGE_HELLO)

async def authenticate(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_tg_alias = update.effective_user.username
    authentication_result = contract.functions.verifyOwnership(user_tg_alias).call()
    print(f"User: {user_tg_alias}, auth result: {authentication_result}")
    if authentication_result:
        await update.message.reply_text(bot_messages.MESSAGE_SUCCESS)
    else:
        await update.message.reply_text(bot_messages.MESSAGE_FAILURE)

# Telegram bot token and initialization
BOT_TOKEN = 'TODO: insert bot token'
application = Application.builder().token(BOT_TOKEN).build()

# Create command handlers
start_handler = CommandHandler('start', start)
authentication_handler = CommandHandler('authenticate', authenticate)

# Add handlers
application.add_handler(start_handler)
application.add_handler(authentication_handler)

# Start polling
application.run_polling(allowed_updates=Update.ALL_TYPES)
