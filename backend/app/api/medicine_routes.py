from fastapi import APIRouter, HTTPException

from app.services.medicine_service import (
    get_medicine_suggestions,
    get_medicine_by_id
)

router = APIRouter(prefix="/medicine", tags=["Medicine"])


@router.get("/suggestions")
async def medicine_suggestions(query: str):

    suggestions = get_medicine_suggestions(query)

    return {
        "success": True,
        "count": len(suggestions),
        "data": suggestions
    }


@router.get("/details/{medicine_id}")
async def medicine_details(medicine_id: int):

    medicine = get_medicine_by_id(medicine_id)

    if medicine is None:
        raise HTTPException(
            status_code=404,
            detail="Medicine not found."
        )

    return {
        "success": True,
        "data": medicine
    }