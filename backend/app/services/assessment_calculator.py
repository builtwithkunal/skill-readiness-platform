from sqlalchemy.orm import Session
from app.models.user_skill_score import UserSkillScore

def calculate_assessment_score(user_id: int, skill_ids: list, db: Session) -> int:
    scores = (
        db.query(UserSkillScore.score)
        .filter(
            UserSkillScore.user_id == user_id,
            UserSkillScore.skill_id.in_(skill_ids)
        )
        .all()
    )

    if not scores:
        return 0

    total = sum(s[0] for s in scores)
    return int(total / len(scores))
