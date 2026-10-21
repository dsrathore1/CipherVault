import hashlib

from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/health")

    assert response.status_code == 200


def test_hash_endpoint_returns_correct_sha256():
    response = client.post("/hash", json={"text": "hello"})

    expected_hash = hashlib.sha256(b"hello").hexdigest()

    assert response.status_code == 200
    assert response.json()["hash"] == expected_hash


def test_hash_endpoint_returns_64_character_digest():
    response = client.post("/hash", json={"text": "CipherVault"})

    assert response.status_code == 200
    assert len(response.json()["hash"]) == 64


def test_hash_endpoint_rejects_empty_text():
    response = client.post("/hash", json={"text": ""})

    assert response.status_code == 422


def test_hash_endpoint_rejects_text_over_1000_characters():
    response = client.post("/hash", json={"text": "a" * 1001})

    assert response.status_code == 422


def test_hash_endpoint_rejects_missing_text():
    response = client.post("/hash", json={})

    assert response.status_code == 422


def test_hash_endpoint_rejects_non_string_text():
    response = client.post("/hash", json={"text": 123})

    assert response.status_code == 422


def test_rsa_endpoint_encrypts_and_decrypts_message():
    response = client.post(
        "/rsa/encrypt-decrypt",
        json={"text": "CipherVault RSA test"},
    )

    assert response.status_code == 200

    data = response.json()
    assert data["original_message"] == "CipherVault RSA test"
    assert data["decrypted_message"] == "CipherVault RSA test"
    assert data["success"] is True
    assert data["algorithm"] == "RSA-2048"


def test_rsa_endpoint_rejects_empty_message():
    response = client.post(
        "/rsa/encrypt-decrypt",
        json={"text": ""},
    )

    assert response.status_code == 422


def test_ecc_endpoint_signs_and_verifies_message():
    response = client.post(
        "/ecc/sign-verify",
        json={"text": "CipherVault ECC test"},
    )

    assert response.status_code == 200

    data = response.json()
    assert data["original_message"] == "CipherVault ECC test"
    assert data["signature_verified"] is True
    assert data["algorithm"] == "ECDSA"
    assert data["curve"] == "SECP256R1"


def test_ecc_endpoint_rejects_empty_message():
    response = client.post(
        "/ecc/sign-verify",
        json={"text": ""},
    )

    assert response.status_code == 422
