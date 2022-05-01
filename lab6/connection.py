from sqlalchemy import create_engine, MetaData
from config import SERVER, USERNAME, PASSWORD, DB

metadata = MetaData()
engine = create_engine(f"mysql+pymysql://{USERNAME}:{PASSWORD}@{SERVER}/{DB}")

