GUIDANCE_MAP = {
    "python": {
        "study": "Revise Python basics: loops, functions, data structures",
        "practice": "Solve 20 Python coding problems",
        "project": "Build a small Python automation or API"
    },
    "sql": {
        "study": "Focus on SELECT, JOIN, GROUP BY queries",
        "practice": "Practice SQL queries on sample datasets",
        "project": "Create a database analytics mini-project"
    }
}

def generate_guidance(skill_name: str):
    key = skill_name.lower()
    return GUIDANCE_MAP.get(key, {
        "study": "Revise fundamentals",
        "practice": "Practice basic exercises",
        "project": "Build a small related project"
    })
