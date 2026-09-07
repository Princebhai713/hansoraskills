Markdown
# DATABASE SCHEMA & DATA MODELS

**Project Title:** Hansora Skills Portal  
**Target Database:** MongoDB (Document-Based) / Compatible with Relational PostgreSQL Schemas  
**Data Integrity:** Foreign key parity across Centers, Students, Courses, and Transactions

---

## 1. ENTITY RELATIONSHIP DIAGRAM (ERD OVERVIEW)

   +-------------------------+
   |         CENTERS         |
   +-------------------------+
   | _id (PK)                |
   | center_code (Unique)    |<-------------+
   | wallet_balance          |              |
   | plain_password          |              |
   +-------------------------+              |
                | 1                         | 1
                |                           |
                | N                         | N
   +------------v------------+      +-------v-----------------+
   |        STUDENTS         |      |   WALLET_TRANSACTIONS   |
   +-------------------------+      +-------------------------+
   | _id (PK)                |      | _id (PK)                |
   | roll_no (Unique)        |      | center_code (FK)        |
   | reg_no (Unique)         |      | amount                  |
   | center_code (FK)        |      | type (DEBIT/CREDIT)     |
   | course_code (FK)        |      +-------------------------+
   +-------------------------+
        | 1            | 1
        |              |
        | N            | 1
+-----------v---+      +---v---------------------+
|    COURSES    |      |    EXAM_RESULTS         |
+---------------+      +-------------------------+
| _id (PK)      |      | _id (PK)                |
| code (Unique) |      | student_roll_no (FK)    |
| duration      |      | theory_obtained         |
| tier (1Yr/2Yr)|      | practical_obtained      |
+---------------+      | is_approved (Boolean)   |
+-------------------------+


---

## 2. DETAILED COLLECTION SCHEMAS

### 2.1. `centers` Collection
Stores metadata, geographic details, plain-text security keys, and live prepaid wallet balances for every franchise.

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["center_code", "center_name", "director_name", "phone", "state", "district", "plain_password", "wallet_balance"],
    "properties": {
      "_id": { "bsonType": "objectId" },
      "center_code": { 
        "bsonType": "string",
        "description": "Unique institutional ID, e.g., 'HS-UP-101'"
      },
      "center_name": { "bsonType": "string" },
      "director_name": { "bsonType": "string" },
      "phone": { "bsonType": "string" },
      "email": { "bsonType": "string" },
      "plain_password": { 
        "bsonType": "string",
        "description": "Visible plaintext password accessible exclusively to Super Admin for direct support and franchise login override."
      },
      "state": { "bsonType": "string" },
      "district": { "bsonType": "string" },
      "pincode": { "bsonType": "string" },
      "full_address": { "bsonType": "string" },
      "wallet_balance": { 
        "bsonType": "number", 
        "minimum": 0,
        "description": "Current prepaid reserve in INR available for student acceptances."
      },
      "status": { 
        "enum": ["Active", "Pending", "Suspended"],
        "description": "Account operational flag."
      },
      "created_at": { "bsonType": "date" },
      "updated_at": { "bsonType": "date" }
    }
  }
}
2.2. courses Collection
Stores categorical trades, certification rules, and auto-debit fees per course.

JSON
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["code", "name", "category", "duration", "tier", "enrollment_fee"],
    "properties": {
      "_id": { "bsonType": "objectId" },
      "code": { 
        "bsonType": "string",
        "description": "Short code, e.g., 'DCA', 'ADCA', 'CHM'"
      },
      "name": { "bsonType": "string" },
      "category": { 
        "enum": ["Computer Education", "Vocational Education", "Health Science", "Agriculture", "Beauty & Wellness", "Sports Coaching"]
      },
      "duration": { "bsonType": "string", "description": "e.g., '6 Months', '1 Year', '2 Years'" },
      "tier": { 
        "enum": ["1-Year", "2-Year"],
        "description": "1-Year yields single marksheet; 2-Year enforces semester/year-wise marksheet decomposition."
      },
      "enrollment_fee": { 
        "bsonType": "number",
        "description": "Fee deducted automatically from center's wallet on accepting student (₹200 - ₹500)."
      },
      "curriculum": {
        "bsonType": "array",
        "items": {
          "bsonType": "object",
          "required": ["subject_name", "max_theory", "max_practical", "pass_percentage"],
          "properties": {
            "subject_name": { "bsonType": "string" },
            "max_theory": { "bsonType": "number" },
            "max_practical": { "bsonType": "number" },
            "pass_percentage": { "bsonType": "number" }
          }
        }
      }
    }
  }
}
2.3. students Collection
Manages candidate lifecycle from admission to certification.

JSON
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["roll_no", "reg_no", "center_code", "course_code", "name", "father_name", "dob", "status"],
    "properties": {
      "_id": { "bsonType": "objectId" },
      "roll_no": { 
        "bsonType": "string",
        "description": "Sequential identifier incorporating center code, e.g., '26101001'"
      },
      "reg_no": { 
        "bsonType": "string",
        "description": "Official institutional registration number, e.g., 'HS/2026/0142'"
      },
      "center_code": { "bsonType": "string", "description": "Foreign key referencing centers.center_code" },
      "course_code": { "bsonType": "string", "description": "Foreign key referencing courses.code" },
      "name": { "bsonType": "string" },
      "father_name": { "bsonType": "string" },
      "mother_name": { "bsonType": "string" },
      "dob": { "bsonType": "string", "description": "YYYY-MM-DD" },
      "gender": { "enum": ["Male", "Female", "Other"] },
      "photo_url": { "bsonType": "string" },
      "admission_date": { "bsonType": "string", "description": "Allows back-dating for historical session alignment" },
      "status": { 
        "enum": ["Applied", "Accepted", "Exam Scheduled", "Pending Verification", "Certified", "Rejected"],
        "description": "Primary progression state."
      },
      "id_card_issued": { "bsonType": "bool" },
      "admit_card_issued": { "bsonType": "bool" }
    }
  }
}
2.4. exam_results Collection
Isolates academic grading, calculation parameters, and Super Admin audit overrides.

JSON
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["student_roll_no", "course_code", "is_approved"],
    "properties": {
      "_id": { "bsonType": "objectId" },
      "student_roll_no": { "bsonType": "string" },
      "course_code": { "bsonType": "string" },
      "evaluation_type": { "enum": ["Combined", "Semester-1", "Semester-2"] },
      "scores": {
        "bsonType": "array",
        "items": {
          "bsonType": "object",
          "required": ["subject_name", "theory_obtained", "practical_obtained"],
          "properties": {
            "subject_name": { "bsonType": "string" },
            "theory_obtained": { "bsonType": "number" },
            "practical_obtained": { "bsonType": "number" }
          }
        }
      },
      "total_max": { "bsonType": "number" },
      "total_obtained": { "bsonType": "number" },
      "percentage": { "bsonType": "number" },
      "grade": { "enum": ["A+", "A", "B", "C", "Fail"] },
      "is_approved": { 
        "bsonType": "bool",
        "description": "Super Admin master switch. Marksheet & diploma download remain completely locked until this evaluates to true."
      },
      "approved_by": { "bsonType": "string" },
      "approved_at": { "bsonType": "date" }
    }
  }
}
2.5. wallet_transactions Collection
Immutable ledger recording every inward deposit and student debit.

JSON
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["center_code", "type", "amount", "balance_after", "timestamp"],
    "properties": {
      "_id": { "bsonType": "objectId" },
      "center_code": { "bsonType": "string" },
      "type": { "enum": ["CREDIT", "DEBIT"] },
      "amount": { "bsonType": "number" },
      "description": { "bsonType": "string" },
      "reference_student_roll": { "bsonType": "string" },
      "utr_number": { "bsonType": "string", "description": "Bank payment reference for wallet top-ups" },
      "balance_after": { "bsonType": "number" },
      "timestamp": { "bsonType": "date" }
    }
  }
}
2.6. franchise_leads Collection
Captures inbound business inquiries generated via the public territory search.

JSON
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["applicant_name", "institution_name", "phone", "state", "district"],
    "properties": {
      "_id": { "bsonType": "objectId" },
      "applicant_name": { "bsonType": "string" },
      "institution_name": { "bsonType": "string" },
      "phone": { "bsonType": "string" },
      "email": { "bsonType": "string" },
      "state": { "bsonType": "string" },
      "district": { "bsonType": "string" },
      "pincode": { "bsonType": "string" },
      "computer_count": { "bsonType": "number" },
      "status": { "enum": ["New Lead", "In Review", "Approved & Onboarded", "Rejected"] },
      "created_at": { "bsonType": "date" }
    }
  }
}
3. CALCULATED FIELDS & LOGIC MAPPINGS
Percentage Calculation:

percentage=( 
total_max
∑theory_obtained+∑practical_obtained
​
 )×100
Grade Mapping:

≥85%→A+ (Distinction / Outstanding)

75%−84%→A (First Division with Honors)

60%−74%→B (First Division)

40%−59%→C (Pass Division)

<40%→Fail

Wallet Auto-Deduction Trigger:

centers.wallet_balance 
new
​
 =centers.wallet_balance 
current
​
 −courses.enrollment_fee
(Logged directly as a DEBIT entry in wallet_transactions with reference_student_roll)