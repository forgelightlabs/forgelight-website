#!/bin/bash
API_KEY="f0923aca-ecca-4660-95e5-08d936728a6a_qo0g2df"

# Get all account IDs
IDS=$(curl -s "https://server.smartlead.ai/api/v1/email-accounts/?api_key=${API_KEY}" \
  -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
  | python3 -c "import json,sys; [print(a['id'],a['from_email']) for a in json.load(sys.stdin)]")

SUCCESS=0
FAIL=0
TOTAL=0

while IFS=' ' read -r id email; do
    TOTAL=$((TOTAL + 1))
    
    RESULT=$(curl -s -X POST "https://server.smartlead.ai/api/v1/email-accounts/${id}/warmup?api_key=${API_KEY}" \
      -H "Content-Type: application/json" \
      -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
      -H "Accept: application/json" \
      -d '{"warmup_enabled":true,"total_warmup_per_day":30,"daily_rampup":5,"reply_rate_percentage":30}')
    
    if echo "$RESULT" | grep -q '"ok":true'; then
        SUCCESS=$((SUCCESS + 1))
    else
        FAIL=$((FAIL + 1))
        echo "FAIL: $email — $RESULT"
    fi
    
    # Rate limiting
    if [ $((TOTAL % 8)) -eq 0 ]; then
        sleep 2.5
    else
        sleep 0.3
    fi
    
    if [ $((TOTAL % 30)) -eq 0 ]; then
        echo "Progress: $TOTAL — $SUCCESS success, $FAIL failed"
    fi
done <<< "$IDS"

echo ""
echo "=== DONE ==="
echo "Warmup enabled: $SUCCESS / $TOTAL"
echo "Failed: $FAIL"
