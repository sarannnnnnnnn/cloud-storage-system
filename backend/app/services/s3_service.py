import boto3
import os
from dotenv import load_dotenv

load_dotenv()

s3_client = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION")
)

BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")


def upload_file(file_path: str, file_name: str):

    s3_client.upload_file(
        file_path,
        BUCKET_NAME,
        file_name
    )

    file_url = (
        f"https://{BUCKET_NAME}.s3."
        f"{os.getenv('AWS_REGION')}.amazonaws.com/{file_name}"
    )

    return file_url

def generate_download_url(file_name: str):

    url = s3_client.generate_presigned_url(
        "get_object",
        Params={
            "Bucket": BUCKET_NAME,
            "Key": file_name
        },
        ExpiresIn=3600
    )

    return url

def list_files():

    response = s3_client.list_objects_v2(
        Bucket=BUCKET_NAME
    )

    files = []

    if "Contents" in response:

        for file in response["Contents"]:

            files.append({
                "filename": file["Key"],
                "size": file["Size"]
            })

    return files

def delete_file(file_name : str):

    s3_client.delete_object(
        Bucket = BUCKET_NAME,
        Key = file_name
    )

    return True