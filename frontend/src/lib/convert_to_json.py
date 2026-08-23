"""
One-time converter: WIT_Language_Risk_Audit_XX_Case_Reviewed.xlsx -> results.json

Run this locally whenever your teammate sends an updated workbook:
    python convert_to_json.py path/to/workbook.xlsx

Merges 'Case Input' (expected/reference data) with 'Test Runs' (actual
Gemini output + rubric scores + judge verdict) on Case ID, and writes
a results.json ready to drop into your Flask app or React public/ folder.
"""

import sys
import json
import pandas as pd

RUBRIC_FIELDS = [
    "Meaning", "Variety awareness", "Risk identification",
    "Non-stereotyping", "Recommendation", "Confidence",
]


def load_sheets(path):
    xls = pd.ExcelFile(path)
    case_input = pd.read_excel(xls, sheet_name="Case Input", header=1)
    test_runs = pd.read_excel(xls, sheet_name="Test Runs", header=2)
    return case_input, test_runs


def build_case(case_row, run_row):
    scores = {}
    pass_fail = {}
    for field in RUBRIC_FIELDS:
        key = field.lower().replace(" ", "_")
        val = run_row.get(field)
        val = None if pd.isna(val) else int(val)
        scores[key] = val
        pass_fail[key] = (val == 2) if val is not None else None

    total = run_row.get("Total / 12")
    total = None if pd.isna(total) else int(total)

    def clean(v):
        return None if pd.isna(v) else str(v).strip()

    return {
        "case_id": clean(case_row["Case ID"]),
        "variety": clean(case_row["Source variety"]),
        "original_text": clean(case_row["Original text"]),
        "context": clean(case_row.get("Context")),
        "expected": {
            "intended_meaning": clean(case_row.get("Intended meaning")),
            "possible_misunderstanding": clean(case_row.get("Possible misunderstanding")),
            "expected_severity": clean(case_row.get("Expected severity")),
            "expected_recommendation": clean(case_row.get("Expected recommendation")),
        },
        "gemini_output": clean(run_row.get("Gemini output (raw)", run_row.get("Actual result / summary"))),
        "judge_verdict": clean(run_row.get("OpenAI judge verdict")),
        "judge_agrees_with_rubric": clean(run_row.get("Judge agrees with rubric?")),
        "scores": scores,
        "pass_fail": pass_fail,
        "total_score": total,
        "failure_label": clean(run_row.get("Failure labels")) or "NO_FAILURE",
        "priority": clean(run_row.get("Priority")),
        "run_completed": clean(run_row.get("Run completed?")) == "Yes",
        "notes": clean(run_row.get("Problems / notes")),
    }


def convert(path, out_path="results.json"):
    case_input, test_runs = load_sheets(path)
    case_input = case_input.set_index("Case ID", drop=False)
    test_runs = test_runs.set_index("Case ID", drop=False)

    cases = []
    skipped = []
    for case_id, run_row in test_runs.iterrows():
        if pd.isna(case_id) or case_id not in case_input.index:
            continue
        if run_row.get("Run completed?") != "Yes":
            skipped.append(case_id)
            continue
        case_row = case_input.loc[case_id]
        cases.append(build_case(case_row, run_row))

    with open(out_path, "w") as f:
        json.dump(cases, f, indent=2)

    print(f"Wrote {len(cases)} completed cases to {out_path}")
    if skipped:
        print(f"Skipped {len(skipped)} not-yet-run cases: {skipped}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python convert_to_json.py <path_to_xlsx> [output.json]")
        sys.exit(1)
    xlsx_path = sys.argv[1]
    out = sys.argv[2] if len(sys.argv) > 2 else "results.json"
    convert(xlsx_path, out)
