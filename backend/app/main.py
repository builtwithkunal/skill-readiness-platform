from fastapi import FastAPI


app = FastAPI(title="Skill Readiness Platform")


@app.get("/health")
def health_check():
    return {"status": "OK"}