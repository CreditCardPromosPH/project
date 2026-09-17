from datetime import date, datetime
import hashlib
import json
import re
from pathlib import Path

from openpyxl import load_workbook


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / "Credit Card Promos.xlsx"
OUTPUT = ROOT / "app" / "data"


def scalar(value):
    if isinstance(value, datetime):
        return value.date().isoformat()
    if isinstance(value, date):
        return value.isoformat()
    return "" if value is None else str(value).strip()


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    workbook = load_workbook(SOURCE, data_only=True)
    sheet = workbook["All Promos"]
    headers = [scalar(sheet.cell(row=6, column=column).value) for column in range(1, sheet.max_column + 1)]
    columns = {header: index + 1 for index, header in enumerate(headers)}

    def value(row, header):
        cell = sheet.cell(row=row, column=columns[header])
        if cell.hyperlink and cell.hyperlink.target:
            return cell.hyperlink.target
        return scalar(cell.value)

    promos = []
    for row in range(7, sheet.max_row + 1):
        if not any(sheet.cell(row=row, column=column).value is not None for column in range(1, sheet.max_column + 1)):
            continue

        bank = value(row, "Bank")
        promo = value(row, "Promo")
        offer_url = value(row, "Offer page")
        categories_raw = value(row, "Category")
        categories = [part.strip() for part in re.split(r"\s*;\s*", categories_raw) if part.strip()]
        identifier = hashlib.sha1(f"{bank}|{promo}|{offer_url}|{row}".encode()).hexdigest()[:16]

        promos.append({
            "id": identifier,
            "bank": bank,
            "promo": promo,
            "category": categories_raw,
            "categories": categories,
            "summary": value(row, "Offer summary"),
            "startDate": value(row, "Start date") or None,
            "endDate": value(row, "End date") or None,
            "dateCheck": value(row, "Date check"),
            "cardTypes": value(row, "Card types (listing)"),
            "offerUrl": offer_url if offer_url.startswith(("http://", "https://")) else "",
            "imageUrl": value(row, "Image") if value(row, "Image").startswith(("http://", "https://")) else "",
            "originalDateWording": value(row, "Original date wording"),
            "checkedDate": value(row, "Checked date"),
            "dateAdded": value(row, "Date added") or None,
            "sourceRow": row,
        })

    metadata = {
        "sourceFile": SOURCE.name,
        "sheet": "All Promos",
        "checkedAt": scalar(sheet.cell(row=3, column=2).value),
        "listedOffers": len(promos),
        "banks": sorted({promo["bank"] for promo in promos if promo["bank"]}),
        "categories": sorted({category for promo in promos for category in promo["categories"]}),
    }

    (OUTPUT / "promos.json").write_text(json.dumps(promos, ensure_ascii=True, separators=(",", ":")), encoding="utf-8")
    (OUTPUT / "meta.json").write_text(json.dumps(metadata, ensure_ascii=True, indent=2), encoding="utf-8")
    print(f"Exported {len(promos)} promotions from {SOURCE.name}")


if __name__ == "__main__":
    main()
