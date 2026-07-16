# AI Pair 1~6강 복습 정리

## 전체 흐름

| 강의 | 주제 | 핵심 키워드 | AI Agent 관점 |
|---|---|---|---|
| 1강 | Python 기초 복습 | f-string, list, dict, while, 함수 | 프롬프트 조립, messages 구조, 재시도, Tool 함수 |
| 2강 | 클래스와 객체 | class, `__init__`, `self`, 메서드, 상속 | LLM 클라이언트와 Agent 상태 관리 |
| 3강 | 모듈과 라이브러리 | import, json, 환경변수, pathlib, requirements | API 키 관리, 설정 저장, 배포 환경 재현 |
| 4강 | 예외처리와 파일 입출력 | try/except, finally, with open, JSON 파일 | API 실패 처리, 로그 저장, Agent 상태 보존 |
| 5강 | 심화 알고리즘 | sorted, 필터링, deepcopy, lru_cache | 로그 분석, 설정 복사, 반복 계산 캐싱 |
| 6강 | 정규표현식 | `\d`, `\w`, `.*?`, 그룹, `re.sub` | LLM 출력 파싱, 개인정보 마스킹, 구조화 추출 |

---

## 1강. Python 기초가 Agent 코드가 되는 순간

### 핵심 개념

- `f-string`: 사용자 입력과 역할을 넣어 프롬프트를 동적으로 조립한다.
- `list + dict`: 대화 이력은 보통 `messages = [{"role": "...", "content": "..."}]` 구조로 관리한다.
- `while`: API 실패 시 재시도 로직을 만들 때 사용한다.
- `def + docstring`: Agent의 Tool 함수는 파이썬 함수이며, docstring은 AI가 읽는 함수 설명서 역할을 한다.

### 외워야 할 패턴

```python
messages = [
    {"role": "user", "content": "질문"},
    {"role": "assistant", "content": "답변"},
]

user_questions = [m["content"] for m in messages if m["role"] == "user"]
```

```python
def get_current_weather(city: str, unit: str = "celsius") -> dict:
    """도시의 현재 날씨를 반환합니다."""
    return {"city": city, "temperature": 15, "unit": unit}
```

### 자주 하는 실수

- f-string 앞에 `f`를 빼먹는다.
- 딕셔너리 키를 `m[role]`처럼 따옴표 없이 쓴다.
- `while`에서 카운터 증가를 빼먹어 무한루프에 빠진다.
- Tool 함수의 docstring을 대충 써서 AI가 언제 호출해야 하는지 판단하지 못하게 만든다.

---

## 2강. 클래스와 객체

### 핵심 개념

- 클래스는 데이터와 기능을 묶는 틀이다.
- `__init__`은 객체가 만들어질 때 실행되는 초기화 메서드다.
- `self`는 현재 객체 자신을 가리킨다.
- 메서드는 객체가 수행할 수 있는 동작이다.
- 상속은 기존 클래스를 확장하는 방식이고, 부모 초기화가 필요하면 `super().__init__()`을 호출해야 한다.

### 외워야 할 패턴

```python
class AIAgent:
    def __init__(self, name: str, model: str):
        self.name = name
        self.model = model
        self.history = []

    def chat(self, message: str) -> str:
        self.history.append({"role": "user", "content": message})
        return f"{self.name}: {message}"
```

```python
class Dog(Animal):
    def __init__(self, name: str, breed: str):
        super().__init__(name)
        self.breed = breed
```

### 실습 포인트

- `TodoManager` 클래스 만들기
- `ConversationAgent`에 `token_count()` 추가하기
- `AIAgent`를 상속한 `CodeReviewAgent` 만들기

### 자주 하는 실수

- `self.todos`가 아니라 그냥 `todos`로 써서 객체 상태가 저장되지 않는다.
- `__init__`에서 필요한 속성을 초기화하지 않는다.
- 상속 클래스에서 `super().__init__()`을 빼먹어 부모 속성이 만들어지지 않는다.

---

## 3강. 모듈과 라이브러리

### 핵심 개념

- `import`: 다른 파일이나 라이브러리의 코드를 가져온다.
- `json.dumps()` / `json.loads()`: 딕셔너리와 JSON 문자열을 변환한다.
- `os.getenv()`: 환경변수를 안전하게 읽는다.
- `pathlib.Path`: 파일 경로를 객체처럼 다룬다.
- `requirements.txt`: 프로젝트 실행에 필요한 패키지 목록이다.

### 외워야 할 패턴

```python
import os
import json
from pathlib import Path

config = {"model": "claude-opus-4-5", "max_tokens": 1000}

json_str = json.dumps(config, ensure_ascii=False)
parsed = json.loads(json_str)
```

```python
api_key = os.getenv("OPENAI_API_KEY", "키 없음")
```

```python
for file in Path(".").glob("*.py"):
    print(file.name, file.stat().st_size)
```

### 자주 하는 실수

- API 키를 코드에 직접 적는다.
- `json.dumps()`와 `json.dump()`를 헷갈린다.
- 환경변수가 없을 때의 기본값 처리를 하지 않는다.
- 경로를 문자열로만 다루다가 운영체제별 경로 차이에 걸린다.

---

## 4강. 예외처리와 파일 입출력

### 핵심 개념

- `try/except`: 에러가 나도 프로그램이 바로 멈추지 않게 한다.
- `finally`: 성공/실패와 상관없이 마지막에 실행된다.
- `with open()`: 파일을 자동으로 닫아준다.
- `json.dump()` / `json.load()`: 딕셔너리를 JSON 파일로 저장하고 불러온다.

### 외워야 할 패턴

```python
try:
    number = int("123")
except ValueError as e:
    print("숫자로 변환할 수 없습니다:", e)
finally:
    print("처리 완료")
```

```python
import json

data = {"role": "user", "content": "안녕"}

with open("conversation.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

with open("conversation.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)
```

### 자주 하는 실수

- 모든 예외를 무조건 `except Exception`으로만 처리한다.
- 파일을 열고 닫지 않는다.
- `encoding="utf-8"`을 빼먹어 한글이 깨진다.
- `"w"` 모드가 기존 파일 내용을 덮어쓴다는 점을 놓친다.

---

## 5강. 심화 알고리즘

### 핵심 개념

- `sorted(key=...)`: 원하는 기준으로 리스트를 정렬한다.
- 리스트 컴프리헨션: 조건에 맞는 데이터만 필터링한다.
- 얕은 복사: 중첩 객체는 공유된다.
- 깊은 복사: 중첩 객체까지 완전히 새로 복사된다.
- `@lru_cache`: 같은 입력의 함수 결과를 캐시에 저장한다.

### 외워야 할 패턴

```python
by_cost = sorted(agent_logs, key=lambda x: x["cost"], reverse=True)
expensive_logs = [log for log in agent_logs if log["cost"] >= 0.01]
total_cost = sum(log["cost"] for log in expensive_logs)
```

```python
import copy

safe_template = copy.deepcopy(base_template)
```

```python
from functools import lru_cache

@lru_cache(maxsize=128)
def get_token_count(text: str) -> int:
    print("계산 중...")
    return len(text.split())
```

### 자주 하는 실수

- `sorted()`의 `key` 기준을 잘못 잡는다.
- `reverse=True`를 빼먹어 오름차순/내림차순이 반대로 나온다.
- 중첩 딕셔너리에 얕은 복사를 써서 원본 설정이 같이 바뀐다.
- 캐싱이 필요한 함수에 리스트/딕셔너리처럼 해시 불가능한 값을 인자로 넣는다.

---

## 6강. 정규표현식

### 핵심 개념

- `r"..."`: 정규식 패턴은 raw string으로 쓰는 것이 안전하다.
- `\d+`: 숫자 1개 이상
- `\w+`: 문자/숫자/밑줄 1개 이상
- `.*?`: 최소한으로 매칭하는 비탐욕 패턴
- `()` 그룹: 원하는 부분만 캡처한다.
- `re.sub()`: 패턴에 맞는 텍스트를 치환한다.
- 여러 패턴을 순서대로 시도하면 형식이 조금씩 다른 LLM 응답도 파싱할 수 있다.

### 외워야 할 패턴

```python
import re

numbers = re.findall(r"\d+(?:\.\d+)?", "총 42개, 평균 8.7점")
```

```python
match = re.search(r"<answer>(.*?)</answer>", response, re.DOTALL)
answer = match.group(1).strip() if match else ""
```

```python
masked = re.sub(r"(\d{3}-\d{4}-)(\d{4})", r"\g<1>****", "010-1234-5678")
```

### LLM 출력 파싱 패턴

```python
def extract_score(text: str) -> float | None:
    patterns = [
        r'"score"\s*:\s*([\d.]+)',
        r'score:\s*([\d.]+)',
        r'<score>([\d.]+)</score>',
        r'([\d.]+)점',
    ]

    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            return float(match.group(1))

    return None
```

### 자주 하는 실수

- 패턴 앞에 `r`을 빼먹는다.
- `.*`를 써서 너무 많이 매칭한다.
- `group(0)`과 `group(1)`을 헷갈린다.
- 점 `.`을 진짜 점으로 쓰고 싶은데 `\.`로 이스케이프하지 않는다.

---

## 최종 암기 카드

| 상황 | 먼저 떠올릴 코드 |
|---|---|
| 프롬프트 조립 | `f"사용자 질문: {user_input}"` |
| 대화 기록 | `[{"role": "user", "content": "..."}]` |
| 객체 상태 관리 | `self.history = []` |
| 부모 초기화 | `super().__init__(...)` |
| 환경변수 읽기 | `os.getenv("KEY", "기본값")` |
| JSON 문자열 변환 | `json.dumps()` / `json.loads()` |
| JSON 파일 저장 | `json.dump()` / `json.load()` |
| 안전한 파일 열기 | `with open(path, encoding="utf-8") as f:` |
| 정렬 | `sorted(data, key=lambda x: x["cost"], reverse=True)` |
| 필터링 | `[x for x in data if 조건]` |
| 깊은 복사 | `copy.deepcopy(obj)` |
| 캐싱 | `@lru_cache(maxsize=128)` |
| 숫자 추출 | `re.findall(r"\d+(?:\.\d+)?", text)` |
| 태그 안 내용 추출 | `re.search(r"<tag>(.*?)</tag>", text, re.DOTALL)` |

## 복습 순서 추천

1. 1강: `messages` 구조와 함수 docstring을 먼저 이해한다.
2. 2강: `self`와 `__init__`이 왜 필요한지 예제로 확인한다.
3. 3강: API 키를 코드에 직접 쓰지 않고 환경변수로 읽는 습관을 만든다.
4. 4강: 파일 저장과 예외처리를 함께 사용한다.
5. 5강: 로그 데이터를 정렬/필터링하고, 설정 복사는 `deepcopy`로 처리한다.
6. 6강: LLM 응답에서 필요한 값만 정규식으로 추출한다.
