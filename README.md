# StudyRoom Booking API (체험용 가상 프로젝트)

> 말해봄 체험용 가상 지원자 '김말해'의 샘플 README입니다. 실제 프로젝트가 아닙니다.

스터디룸 시간대 예약을 처리하는 백엔드 API입니다. 3인 팀 프로젝트(2026.03 ~ 2026.06)에서 예약 API와 동시성 처리를 맡았습니다.

## 기술 스택
- Python 3.12, FastAPI, SQLAlchemy
- PostgreSQL 16, Redis
- Docker Compose, GitHub Actions, pytest, locust

## 주요 기능
- 스터디룸 목록과 시간대별 빈 슬롯 조회
- 예약 생성·취소, 예약 내역 조회
- JWT 기반 로그인

## 트러블슈팅: 중복 예약
- 문제: 같은 방, 같은 시간대에 예약이 두 건씩 생성됨
- 원인: 빈 슬롯 조회 후 저장 전 사이에 다른 요청이 끼어드는 경쟁 조건 (운영 로그에서 같은 시각 요청 2건 모두 성공 확인)
- 해결: `(room_id, start_at)` 유니크 제약 추가, 예약 저장 시 `SELECT ... FOR UPDATE` 행 잠금 적용
- 검증: locust로 같은 슬롯에 동시 요청 100건 → 성공 1건, 나머지 409 응답, 중복 예약 0건

## 실행
```bash
docker compose up -d
pytest
```
