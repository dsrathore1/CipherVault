import hashlib
import base64
import binascii

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware

from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding, rsa

app = FastAPI(
    title="CipherVault API",
    description="CipherVault is a secure and user-friendly platform for managing and encrypting sensitive data. Our API provides endpoints for encryption, decryption, and secure storage of your confidential information.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


@app.get("/")
def root():
    return {"message": "Welcome to CipherVault API! Visit /docs for API documentation."}


@app.get("/health", tags=["Health Check"])
def health_check():
    return {
        "status": "healthy",
        "project": "CipherVault",
        "message": "Backend is running successfully",
        "version": app.version,
    }


class HashRequest(BaseModel):
    text: str = Field(
        min_length=1,
        max_length=1000,
        description="The text to be hashed. Must be between 1 and 1000 characters, calculate the SHA-256 hash for",
    )


@app.post("/hash", tags=["Hashing"])
def create_hash(request: HashRequest):
    text_bytes = request.text.encode("utf-8")  #! Convert the input text into bytes
    hash_value = hashlib.sha256(text_bytes).hexdigest()

    return {"algorithm": "SHA-256", "input": request.text, "hash": hash_value}


"""
TODO (DONE): Add more endpoints for encryption and decryption.

* - import hashlib	            Loads Python's built-in hashing library.
* - HashRequest	                Defines the input expected by our API.
* - encode("utf-8")	            Converts text into bytes for hashing.
* - hashlib.sha256(...)	        Calculates the SHA-256 digest.
* - hexdigest()	                Converts the digest into 64 hexadecimal characters.
* - @app.post("/hash")          Creates an API endpoint that accepts text using HTTP POST.

"""


@app.post("/rsa/encrypt-decrypt", tags=["RSA Encryption/Decryption"])
def rsa_encrypt_decrypt(request: HashRequest):
    try:
        # Generate a fresh 2048-bit RSA key pair.
        private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048,
        )

        public_key = private_key.public_key()

        # Encrypt using the public key and RSA-OAEP with SHA-256.
        ciphertext = public_key.encrypt(
            request.text.encode("utf-8"),
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None,
            ),
        )

        # Decrypt using the corresponding private key.
        plaintext = private_key.decrypt(
            ciphertext,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None,
            ),
        )

        # Export the public key for educational display.
        public_pem = public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo,
        ).decode("utf-8")

        return {
            "algorithm": "RSA-2048",
            "padding": "OAEP with SHA-256",
            "original_message": request.text,
            "encrypted_message": base64.b64encode(ciphertext).decode("ascii"),
            "decrypted_message": plaintext.decode("utf-8"),
            "public_key": public_pem,
            "success": plaintext.decode("utf-8") == request.text,
        }

    except (ValueError, UnicodeDecodeError, binascii.Error) as exc:
        raise HTTPException(
            status_code=400,
            detail="RSA operation failed for the supplied message.",
        ) from exc
