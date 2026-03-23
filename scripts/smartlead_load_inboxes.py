import csv
import json
import time
import urllib.request

API_KEY = "f0923aca-ecca-4660-95e5-08d936728a6a_qo0g2df"
URL = f"https://server.smartlead.ai/api/v1/email-accounts/save?api_key={API_KEY}"

success = 0
failed = []

with open('/mnt/user-data/uploads/smartlead-bulk-import-ready.csv', 'r') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

# Skip the first one since we already added it
for i, row in enumerate(rows[1:], start=2):
    payload = {
        "from_email": row['from_email'].strip(),
        "user_name": row['user_name'].strip(),
        "from_name": row['from_name'].strip(),
        "password": row['password'].strip(),
        "smtp_host": row['smtp_host'].strip(),
        "smtp_port": int(row['smtp_port'].strip()),
        "imap_host": row['imap_host'].strip(),
        "imap_port": int(row['imap_port'].strip()),
        "max_email_per_day": int(row['max_email_per_day'].strip()),
        "warmup_enabled": row['warmup_enabled'].strip().lower() == 'true',
        "total_warmup_per_day": int(row['total_warmup_per_day'].strip()),
        "daily_rampup": int(row['daily_rampup'].strip())
    }
    
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(URL, data=data, headers={'Content-Type': 'application/json'}, method='POST')
    
    try:
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read().decode())
            if result.get('ok'):
                success += 1
            else:
                failed.append((row['from_email'], str(result)))
    except Exception as e:
        failed.append((row['from_email'], str(e)))
    
    # Rate limit: 10 requests per 2 seconds, so ~0.25s between requests is safe
    if i % 8 == 0:
        time.sleep(2)
    else:
        time.sleep(0.25)
    
    if i % 10 == 0:
        print(f"Progress: {i}/{len(rows)} processed, {success} success, {len(failed)} failed")

print(f"\n=== DONE ===")
print(f"Total success: {success + 1} (including first test)")  
print(f"Total failed: {len(failed)}")
if failed:
    print("\nFailed accounts:")
    for email, err in failed:
        print(f"  {email}: {err}")
