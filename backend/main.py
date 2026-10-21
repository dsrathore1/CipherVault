import hashlib
import base64
import binascii

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware

from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding, rsa, ec

app = FastAPI(
    title="CipherVault API",
    description=(
        "CipherVault is a cryptography learning platform featuring "
        "SHA-256 hashing and RSA encryption/decryption demonstrations."
    ),
    version="1.0.0",
)

# Allow requests from the Next.js development frontend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


# -----------------------------
# Root endpoint
# -----------------------------
@app.get("/")
def root():
    return {"message": "Welcome to CipherVault API! Visit /docs for API documentation."}


# -----------------------------
# Health-check endpoint
# -----------------------------
@app.get("/health", tags=["Health Check"])
def health_check():
    return {
        "status": "healthy",
        "project": "CipherVault",
        "message": "Backend is running successfully",
        "version": app.version,
    }


# -----------------------------
# SHA-256 hashing endpoint
# -----------------------------
class HashRequest(BaseModel):
    text: str = Field(
        min_length=1,
        max_length=1000,
        description="Text to hash using SHA-256.",
    )


@app.post("/hash", tags=["Hashing"])
def create_hash(request: HashRequest):
    text_bytes = request.text.encode("utf-8")
    hash_value = hashlib.sha256(text_bytes).hexdigest()

    return {
        "algorithm": "SHA-256",
        "input": request.text,
        "hash": hash_value,
    }


# -----------------------------
# RSA request model
# -----------------------------
class RSARequest(BaseModel):
    text: str = Field(
        min_length=1,
        max_length=190,
        description=(
            "Text to encrypt and decrypt using RSA-2048. "
            "The UTF-8 encoded message must not exceed 190 bytes."
        ),
    )


# -----------------------------
# RSA encryption/decryption endpoint
# -----------------------------
@app.post(
    "/rsa/encrypt-decrypt",
    tags=["RSA Encryption/Decryption"],
)
def rsa_encrypt_decrypt(request: RSARequest):
    try:
        # Encode the message once and validate its actual byte length.
        message_bytes = request.text.encode("utf-8")

        # RSA-2048 with OAEP and SHA-256 supports at most 190 plaintext bytes.
        if len(message_bytes) > 190:
            raise HTTPException(
                status_code=400,
                detail=(
                    "Message is too long for RSA-2048 OAEP with SHA-256. "
                    "Use a message of at most 190 UTF-8 bytes."
                ),
            )

        # Generate a fresh 2048-bit RSA key pair.
        private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048,
        )

        public_key = private_key.public_key()

        # Encrypt with the public key using RSA-OAEP and SHA-256.
        ciphertext = public_key.encrypt(
            message_bytes,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None,
            ),
        )

        # Decrypt with the matching private key.
        plaintext = private_key.decrypt(
            ciphertext,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None,
            ),
        )

        decrypted_message = plaintext.decode("utf-8")

        # Export only the public key in PEM format.
        public_pem = public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo,
        ).decode("utf-8")

        return {
            "algorithm": "RSA-2048",
            "padding": "OAEP with SHA-256",
            "original_message": request.text,
            "encrypted_message": base64.b64encode(ciphertext).decode("ascii"),
            "decrypted_message": decrypted_message,
            "public_key": public_pem,
            "success": decrypted_message == request.text,
        }

    except HTTPException:
        # Preserve intentional HTTP errors, including validation errors.
        raise

    except (ValueError, UnicodeDecodeError, binascii.Error) as exc:
        raise HTTPException(
            status_code=400,
            detail="RSA operation failed for the supplied message.",
        ) from exc


# -----------------------------
# ECC request model
# -----------------------------


class ECCRequest(BaseModel):
    text: str = Field(
        min_length=1,
        max_length=1000,
        description=(
            "Text to sign and verify using ECC (Elliptic Curve Cryptography). "
            "The UTF-8 encoded message must not exceed 1000 bytes."
        ),
    )


# -----------------------------
# ECC digital signature endpoint
# -----------------------------
@app.post("/ecc/sign-verify", tags=["ECC Digital Signature"])
def ecc_sign_verify(request: ECCRequest):
    try:
        message_bytes = request.text.encode("utf-8")

        if len(message_bytes) > 1000:
            raise HTTPException(
                status_code=400,
                detail="Message must not exceed 1000 UTF-8 bytes.",
            )

        # Generate a new ECC private/public key pair.
        private_key = ec.generate_private_key(ec.SECP256R1())
        public_key = private_key.public_key()

        # Sign the message with ECDSA and SHA-256.
        signature = private_key.sign(
            message_bytes,
            ec.ECDSA(hashes.SHA256()),
        )

        # Verify the signature using the public key.
        public_key.verify(
            signature,
            message_bytes,
            ec.ECDSA(hashes.SHA256()),
        )

        public_pem = public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo,
        ).decode("utf-8")

        return {
            "algorithm": "ECDSA",
            "curve": "SECP256R1",
            "hash_algorithm": "SHA-256",
            "original_message": request.text,
            "signature": base64.b64encode(signature).decode("ascii"),
            "public_key": public_pem,
            "signature_verified": True,
        }

    except HTTPException:
        raise

    except (ValueError, TypeError) as exc:
        raise HTTPException(
            status_code=400,
            detail="ECC signing or verification failed.",
        ) from exc