"""Post model (architecture placeholder).

Planned fields:
- id (PK)
- user_id (FK → User)
- category_id (FK → Category)
- title
- content
- moderation_status (published | hidden | removed)
- like_count (denormalized or computed)
- comment_count (denormalized or computed)
- created_at, updated_at

Planned relationships:
- author (User), category (Category)
- comments, likes, reports
"""

# Model implementation will be added in a future phase.
