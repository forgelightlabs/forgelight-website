// Vercel serverless function: receives questionnaire submissions, writes to Notion
// Env vars needed: NOTION_TOKEN, NOTION_DATABASE_ID

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const DB_ID = process.env.NOTION_DATABASE_ID || '5d2ad863ee184781b2d5f8c4903181e3';

  if (!NOTION_TOKEN) {
    console.error('NOTION_TOKEN not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { firm, answers } = data;

    // Map answers array to named fields
    const q = {};
    if (answers && answers.length >= 5) {
      q.q1 = answers[0]?.answer || '';
      q.q2 = answers[1]?.answer || '';
      q.q3 = answers[2]?.answer || '';
      q.q4 = answers[3]?.answer || '';
      q.q5 = answers[4]?.answer || '';
    }

    const notionPayload = {
      parent: { database_id: DB_ID },
      properties: {
        'Firm Name': { title: [{ text: { content: firm?.firm_name || 'Unknown' } }] },
        'Contact Name': { rich_text: [{ text: { content: firm?.your_name || '' } }] },
        'Contact Title': { rich_text: [{ text: { content: firm?.your_title || '' } }] },
        'Email': { email: firm?.email || null },
        'Firm Size': firm?.firm_size ? { select: { name: firm.firm_size } } : undefined,
        'Q1 Biggest Challenge': { rich_text: [{ text: { content: q.q1?.substring(0, 2000) || '' } }] },
        'Q2 What Tried': { rich_text: [{ text: { content: q.q2?.substring(0, 2000) || '' } }] },
        'Q3 Plan B': { rich_text: [{ text: { content: q.q3?.substring(0, 2000) || '' } }] },
        'Q4 Future State': { rich_text: [{ text: { content: q.q4?.substring(0, 2000) || '' } }] },
        'Q5 Specialty': { rich_text: [{ text: { content: q.q5?.substring(0, 2000) || '' } }] },
        'Status': { select: { name: 'New' } },
        'Submitted At': { date: { start: new Date().toISOString().split('T')[0] } },
      },
    };

    // Remove undefined properties
    Object.keys(notionPayload.properties).forEach(k => {
      if (notionPayload.properties[k] === undefined) delete notionPayload.properties[k];
    });

    const notionRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify(notionPayload),
    });

    if (!notionRes.ok) {
      const err = await notionRes.text();
      console.error('Notion API error:', err);
      return res.status(500).json({ error: 'Failed to save' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
