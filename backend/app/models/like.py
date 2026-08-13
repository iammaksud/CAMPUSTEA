"""Like model (architecture placeholder).

Planned fields:
- id (PK)
- post_id (FK → Post, cascade on delete)
- user_id (FK → User, cascade on delete)
- created_at

Constraints:
- unique (user_id, post_id) — one like per user per post
"""

# Model implementation will be added in a future phase.
