"""Security utilities: password hashing and JWT access tokens.

Password hashing uses the `bcrypt` library directly (not passlib). passlib's
bcrypt backend detection code is incompatible with modern bcrypt releases
(4.1+/5.x) — it fails during passlib's internal self-test with
`AttributeError: module 'bcrypt' has no attribute '__about__'` /
`ValueError: password cannot be longer than 72 bytes`. Calling bcrypt's own
`hashpw`/`checkpw` API sidesteps that broken compatibility shim entirely while
still using the same well-vetted bcrypt algorithm.
"""

from datetime import datetime, timedelta, timezone
from typing import Any

import bcrypt
from jose import jwt

from app.core.config import get_settings

# bcrypt only uses the first 72 bytes of the input; anything past that is
# silently ignored by the algorithm itself. We also enforce a 72-character
# max length at the schema layer (RegisterRequest) so this is just a safety net.
_BCRYPT_MAX_PASSWORD_BYTES = 72


def hash_password(password: str) -> str:
    """Hash a plaintext password for storage. Never store or return plaintext."""
    password_bytes = password.encode("utf-8")[:_BCRYPT_MAX_PASSWORD_BYTES]
    hashed = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
    return hashed.decode("utf-8")


def verify_password(plain_password: str, password_hash: str) -> bool:
    """Check a plaintext password against a stored bcrypt hash."""
    password_bytes = plain_password.encode("utf-8")[:_BCRYPT_MAX_PASSWORD_BYTES]
    try:
        return bcrypt.checkpw(password_bytes, password_hash.encode("utf-8"))
    except ValueError:
        # Malformed/foreign hash format (e.g. not a bcrypt hash at all).
        return False


def create_access_token(subject: str, expires_delta: timedelta | None = None) -> str:
    """Create a signed JWT access token. `subject` is typically the user id (as a string)."""
    settings = get_settings()
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=settings.access_token_expire_minutes)
    )
    to_encode: dict[str, Any] = {"sub": subject, "exp": expire}
    return jwt.encode(to_encode, settings.secret_key, algorithm=settings.jwt_algorithm)


def decode_access_token(token: str) -> dict[str, Any]:
    """Decode and validate a JWT access token.

    Raises `jose.exceptions.JWTError` (or a subclass, e.g. `ExpiredSignatureError`)
    if the token is invalid, malformed, or expired. Callers are responsible for
    translating that into an HTTP 401.
    """
    settings = get_settings()
    return jwt.decode(token, settings.secret_key, algorithms=[settings.jwt_algorithm])