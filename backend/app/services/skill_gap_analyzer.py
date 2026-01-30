from sqlalchemy.orm import Session
from app.models.user_skill_score import UserSkillScore
from app.models.skill import Skill

GAP_THRESHOLD = 60

def analyze_skill_gaps(user_id: int, required_skill_ids: list, db: Session):
    gaps = []

    for skill_id in required_skill_ids:
        score = (
            db.query(UserSkillScore.score)
            .filter(
                UserSkillScore.user_id == user_id,
                UserSkillScore.skill_id == skill_id
            )
            .order_by(UserSkillScore.id.desc())
            .first()
        )

        if not score or score[0] < GAP_THRESHOLD:
            skill = db.query(Skill).filter(Skill.id == skill_id).first()
            gaps.append({
                "skill": skill.name,
                "current_score": score[0] if score else 0,
                "required_score": GAP_THRESHOLD
            })

    return gaps
