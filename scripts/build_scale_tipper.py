from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether, Image
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT

TEXT = HexColor('#1C1C1F')
TEXT_SEC = HexColor('#52525B')
TEXT_TERT = HexColor('#A1A1AA')
ACCENT = HexColor('#64748B')
WARM = HexColor('#E8E4DD')
BORDER = HexColor('#D4D4D8')
BG_LIGHT = HexColor('#F4F4F5')
WHITE = HexColor('#FFFFFF')
BG_DARK = HexColor('#09090B')

LOGO = "/home/claude/forgelight-logo-dark.png"
output = "/home/claude/scale_tipper_2page.pdf"

doc = SimpleDocTemplate(output, pagesize=letter,
    topMargin=0.7*inch, bottomMargin=0.6*inch,
    leftMargin=0.75*inch, rightMargin=0.75*inch)

s = {}
s['title'] = ParagraphStyle('T', fontName='Helvetica-Bold', fontSize=22, leading=27, textColor=TEXT, spaceAfter=4)
s['subtitle'] = ParagraphStyle('Sub', fontName='Helvetica', fontSize=10.5, leading=15, textColor=TEXT_SEC, spaceAfter=12)
s['section'] = ParagraphStyle('Sec', fontName='Helvetica-Bold', fontSize=13, leading=17, textColor=TEXT, spaceBefore=12, spaceAfter=4)
s['body'] = ParagraphStyle('B', fontName='Helvetica', fontSize=10, leading=15, textColor=TEXT, spaceAfter=6)
s['bold'] = ParagraphStyle('Bb', fontName='Helvetica-Bold', fontSize=10, leading=15, textColor=TEXT, spaceAfter=6)
s['quote'] = ParagraphStyle('Q', fontName='Helvetica-Oblique', fontSize=10.5, leading=15, textColor=ACCENT, leftIndent=14, rightIndent=14, spaceBefore=4, spaceAfter=6)
s['stat_num'] = ParagraphStyle('SN', fontName='Helvetica-Bold', fontSize=24, leading=28, textColor=TEXT, alignment=TA_CENTER)
s['stat_label'] = ParagraphStyle('SL', fontName='Helvetica', fontSize=8, leading=11, textColor=TEXT_SEC, alignment=TA_CENTER)
s['step_num'] = ParagraphStyle('StN', fontName='Helvetica-Bold', fontSize=11, textColor=ACCENT)
s['step_title'] = ParagraphStyle('StT', fontName='Helvetica-Bold', fontSize=10.5, leading=14, textColor=TEXT)
s['step_body'] = ParagraphStyle('StB', fontName='Helvetica', fontSize=9.5, leading=14, textColor=TEXT_SEC)
s['bullet'] = ParagraphStyle('Bul', fontName='Helvetica', fontSize=9.5, leading=14, textColor=TEXT, spaceAfter=4, leftIndent=14)
s['cta_head'] = ParagraphStyle('CH', fontName='Helvetica-Bold', fontSize=12, leading=17, textColor=TEXT, alignment=TA_CENTER, spaceBefore=8, spaceAfter=4)
s['cta_body'] = ParagraphStyle('CB', fontName='Helvetica', fontSize=10, leading=15, textColor=TEXT_SEC, alignment=TA_CENTER, spaceAfter=8)
s['cta_link'] = ParagraphStyle('CL', fontName='Helvetica-Bold', fontSize=11, leading=16, textColor=ACCENT, alignment=TA_CENTER, spaceAfter=3)
s['cta_small'] = ParagraphStyle('CS', fontName='Helvetica', fontSize=8.5, leading=12, textColor=TEXT_TERT, alignment=TA_CENTER)

def header_footer(c, doc):
    c.saveState()
    w, h = letter
    try:
        c.drawImage(LOGO, doc.leftMargin, h - 48, width=110, height=22, preserveAspectRatio=True, mask='auto')
    except:
        c.setFont('Helvetica-Bold', 8)
        c.setFillColor(TEXT)
        c.drawString(doc.leftMargin, h - 38, "FORGELIGHT LABS")
    c.setFillColor(TEXT_TERT)
    c.setFont('Helvetica', 7.5)
    c.drawRightString(w - doc.rightMargin, h - 38, f"{doc.page}")
    c.setStrokeColor(WARM)
    c.setLineWidth(1.5)
    c.line(doc.leftMargin, h - 52, w - doc.rightMargin, h - 52)
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)
    c.line(doc.leftMargin, 36, w - doc.rightMargin, 36)
    c.setFillColor(TEXT_TERT)
    c.setFont('Helvetica', 7)
    c.drawString(doc.leftMargin, 25, "forgelightlabs.com")
    c.drawCentredString(w/2, 25, "Confidential")
    c.drawRightString(w - doc.rightMargin, 25, "david@forgelightlabs.com")
    c.restoreState()

def mkstep(num, title, body):
    rows = [[Paragraph(num, s['step_num']), Paragraph(title, s['step_title'])],
            [Paragraph("", s['step_body']), Paragraph(body, s['step_body'])]]
    t = Table(rows, colWidths=[0.4*inch, 6.0*inch])
    t.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('TOPPADDING',(0,0),(-1,-1),2),('BOTTOMPADDING',(0,0),(-1,-1),2)]))
    return t

# Build table styles early so they exist before KeepTogether references them
th = ParagraphStyle('th', fontName='Helvetica-Bold', fontSize=9, textColor=HexColor('#FAFAFA'))
thc = ParagraphStyle('thc', fontName='Helvetica-Bold', fontSize=9, textColor=HexColor('#FAFAFA'), alignment=TA_CENTER)
td = ParagraphStyle('td', fontName='Helvetica', fontSize=9, textColor=TEXT)
tdc = ParagraphStyle('tdc', fontName='Helvetica', fontSize=9, textColor=TEXT, alignment=TA_CENTER)
tda = ParagraphStyle('tda', fontName='Helvetica-Bold', fontSize=9, textColor=ACCENT, alignment=TA_CENTER)

md = [
    [Paragraph("Metric",th),Paragraph("Conservative",thc),Paragraph("Typical",thc)],
    [Paragraph("Prospects reached / month",td),Paragraph("3,000",tdc),Paragraph("5,000",tdc)],
    [Paragraph("Interested replies",td),Paragraph("15\u201330",tdc),Paragraph("25\u201350",tdc)],
    [Paragraph("Qualified conversations",td),Paragraph("5\u20138",tdc),Paragraph("10\u201315",tdc)],
    [Paragraph("New clients (@ 20% close)",td),Paragraph("1\u20132",tdc),Paragraph("2\u20133",tdc)],
    [Paragraph("Annual value (@ $15K avg)",td),Paragraph("$15\u2013$30K",tda),Paragraph("$30\u2013$45K",tda)],
]
mt = Table(md, colWidths=[3.2*inch,1.5*inch,1.5*inch])
mt.setStyle(TableStyle([
    ('BACKGROUND',(0,0),(-1,0),BG_DARK),('ALIGN',(1,0),(-1,-1),'CENTER'),('VALIGN',(0,0),(-1,-1),'MIDDLE'),
    ('GRID',(0,0),(-1,-1),0.5,BORDER),
    ('BACKGROUND',(0,1),(-1,1),WHITE),('BACKGROUND',(0,2),(-1,2),BG_LIGHT),
    ('BACKGROUND',(0,3),(-1,3),WHITE),('BACKGROUND',(0,4),(-1,4),BG_LIGHT),
    ('BACKGROUND',(0,5),(-1,5),WARM),
    ('TOPPADDING',(0,0),(-1,-1),5),('BOTTOMPADDING',(0,0),(-1,-1),5),
    ('LEFTPADDING',(0,0),(-1,-1),6),('RIGHTPADDING',(0,0),(-1,-1),6),
]))

# ============ STORY ============
story = []
story.append(Spacer(1, 8))

# TITLE
story.append(Paragraph("How Professional Services Firms Are Booking<br/>5\u201310 Advisory Meetings a Month Without Cold Calling", s['title']))
story.append(Paragraph("A short breakdown of the system \u2014 and the math behind it.", s['subtitle']))
story.append(HRFlowable(width="100%", thickness=2, color=WARM, spaceAfter=10))

# PROBLEM
story.append(Paragraph("The Problem Nobody Talks About", s['section']))
story.append(Paragraph("Most professional services firms \u2014 accounting, financial advisory, law, consulting \u2014 generate new clients almost entirely through referrals and word of mouth.", s['body']))
story.append(Paragraph("It works. Until it doesn\u2019t.", s['bold']))
story.append(Paragraph("Referrals are unpredictable. You can\u2019t scale them. You can\u2019t forecast them. And if one or two key sources dry up, your pipeline disappears overnight.", s['body']))
story.append(Paragraph("\u201cWe\u2019re great at the work. We\u2019re terrible at generating it.\u201d", s['quote']))

# STATS
sd = [
    [Paragraph("87%", s['stat_num']), Paragraph("47%", s['stat_num']), Paragraph("$0", s['stat_num'])],
    [Paragraph("of firms rely on referrals<br/>as primary source", s['stat_label']),
     Paragraph("of partners say pipeline<br/>is biggest challenge", s['stat_label']),
     Paragraph("spent by most firms on<br/>systematic outbound", s['stat_label'])],
]
st = Table(sd, colWidths=[2.2*inch]*3)
st.setStyle(TableStyle([
    ('ALIGN',(0,0),(-1,-1),'CENTER'),('VALIGN',(0,0),(-1,-1),'TOP'),
    ('BACKGROUND',(0,0),(-1,-1),WARM),
    ('TOPPADDING',(0,0),(-1,0),10),('BOTTOMPADDING',(0,-1),(-1,-1),10),
    ('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),
]))
story.append(st)
story.append(Spacer(1, 4))

# SYSTEM
story.append(Paragraph("The System: Three Steps", s['section']))
story.append(Paragraph("A done-for-you outbound system for professional services firms. No cold calling. No LinkedIn spam. No marketing agency burning budget on \u201cbrand awareness.\u201d", s['body']))
story.append(mkstep("01","We Build Your Infrastructure","Dedicated domains, warmed accounts, full authentication (SPF, DKIM, DMARC), and a campaign platform. Your firm\u2019s name is never on the outreach. We are invisible."))
story.append(Spacer(1,3))
story.append(mkstep("02","We Find and Reach Your Ideal Clients","We identify decision-makers in your target industries using verified B2B data, then craft personalized outreach written as your firm and send at scale."))
story.append(Spacer(1,3))
story.append(mkstep("03","You Take the Calls","When a prospect responds, we qualify them and route them to your calendar. You show up to a warm conversation. No cold calling. No pitching strangers."))
story.append(Spacer(1,6))

# MATH — keep the whole section together so table doesn't split
story.append(KeepTogether([
    Paragraph("The Math", s['section']),
    mt,
    Spacer(1,4),
    Paragraph("That\u2019s $180K\u2013$540K in new annual revenue from a system that runs in the background.", s['body']),
]))

# WHY THIS WORKS
story.append(Paragraph("Why This Works (When Marketing Agencies Don\u2019t)", s['section']))
story.append(Paragraph("\u2022  <b>Direct outreach, not advertising.</b> We reach specific decision-makers who match your ideal client profile.", s['bullet']))
story.append(Paragraph("\u2022  <b>Written as your firm.</b> The prospect thinks your firm reached out directly. You own the conversation.", s['bullet']))
story.append(Paragraph("\u2022  <b>Measurable from day one.</b> You know exactly how many prospects were reached, replied, and booked calls.", s['bullet']))
story.append(Paragraph("\u2022  <b>Infrastructure you can own.</b> The systems we build are yours. We can train your team to run it with AI. No lock-in.", s['bullet']))
story.append(Spacer(1,8))

# CTA
story.append(KeepTogether([
    HRFlowable(width="100%", thickness=1.5, color=WARM, spaceAfter=10),
    Paragraph("Ready to see if this fits your firm?", s['cta_head']),
    Paragraph("Book a 15-minute call. No generic pitch \u2014 we\u2019ll review your situation and give you an honest assessment.", s['cta_body']),
    Paragraph('<link href="https://calendly.com/forgelightlabs/discovery" color="#64748B">\u2794  Book Your 15-Minute Call</link>', s['cta_link']),
    Paragraph("calendly.com/forgelightlabs/discovery", s['cta_small']),
    Spacer(1,6),
    Paragraph("Or reply to this email and we\u2019ll send a short questionnaire first \u2014 takes 3 minutes.",
        ParagraphStyle('Alt', fontName='Helvetica', fontSize=9, leading=13, textColor=TEXT_TERT, alignment=TA_CENTER)),
]))

doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)

import pdfplumber
with pdfplumber.open(output) as pdf:
    print(f"Pages: {len(pdf.pages)}")
    for i, page in enumerate(pdf.pages):
        text = page.extract_text()
        lines = text.strip().split('\n')
        print(f"  Page {i+1}: ends with: {lines[-2]}")
