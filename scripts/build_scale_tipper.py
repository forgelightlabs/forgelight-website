from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether, PageBreak, Image
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT

# FORGELIGHT BRAND
TEXT = HexColor('#1C1C1F')
TEXT_SEC = HexColor('#52525B')
TEXT_TERT = HexColor('#A1A1AA')
ACCENT = HexColor('#64748B')
WARM = HexColor('#E8E4DD')
BORDER = HexColor('#D4D4D8')
BG_LIGHT = HexColor('#F4F4F5')
WHITE = HexColor('#FFFFFF')
BG_DARK = HexColor('#09090B')

output_path = "/home/claude/scale_tipper_final.pdf"

doc = SimpleDocTemplate(
    output_path, pagesize=letter,
    topMargin=0.8*inch, bottomMargin=0.7*inch,
    leftMargin=0.8*inch, rightMargin=0.8*inch,
)

s = {}
s['title'] = ParagraphStyle('Title', fontName='Helvetica-Bold', fontSize=24, leading=30, textColor=TEXT, spaceAfter=6)
s['subtitle'] = ParagraphStyle('Subtitle', fontName='Helvetica', fontSize=11.5, leading=16, textColor=TEXT_SEC, spaceAfter=18)
s['section'] = ParagraphStyle('Section', fontName='Helvetica-Bold', fontSize=14, leading=19, textColor=TEXT, spaceBefore=18, spaceAfter=6)
s['body'] = ParagraphStyle('Body', fontName='Helvetica', fontSize=10.5, leading=16, textColor=TEXT, spaceAfter=8)
s['bold'] = ParagraphStyle('Bold', fontName='Helvetica-Bold', fontSize=10.5, leading=16, textColor=TEXT, spaceAfter=8)
s['quote'] = ParagraphStyle('Quote', fontName='Helvetica-Oblique', fontSize=11, leading=17, textColor=ACCENT, leftIndent=16, rightIndent=16, spaceBefore=8, spaceAfter=10)
s['stat_num'] = ParagraphStyle('StatNum', fontName='Helvetica-Bold', fontSize=26, leading=30, textColor=TEXT, alignment=TA_CENTER)
s['stat_label'] = ParagraphStyle('StatLabel', fontName='Helvetica', fontSize=8.5, leading=12, textColor=TEXT_SEC, alignment=TA_CENTER)
s['step_num'] = ParagraphStyle('StepNum', fontName='Helvetica-Bold', fontSize=12, textColor=ACCENT)
s['step_title'] = ParagraphStyle('StepTitle', fontName='Helvetica-Bold', fontSize=11.5, leading=16, textColor=TEXT)
s['step_body'] = ParagraphStyle('StepBody', fontName='Helvetica', fontSize=10, leading=15, textColor=TEXT_SEC)
s['bullet'] = ParagraphStyle('Bullet', fontName='Helvetica', fontSize=10, leading=15, textColor=TEXT, spaceAfter=6, leftIndent=16)
s['cta_head'] = ParagraphStyle('CTAHead', fontName='Helvetica-Bold', fontSize=13, leading=19, textColor=TEXT, alignment=TA_CENTER, spaceBefore=10, spaceAfter=6)
s['cta_body'] = ParagraphStyle('CTABody', fontName='Helvetica', fontSize=10.5, leading=16, textColor=TEXT_SEC, alignment=TA_CENTER, spaceAfter=12)
s['cta_link'] = ParagraphStyle('CTALink', fontName='Helvetica-Bold', fontSize=12, leading=17, textColor=ACCENT, alignment=TA_CENTER, spaceAfter=4)
s['cta_small'] = ParagraphStyle('CTASmall', fontName='Helvetica', fontSize=9, leading=13, textColor=TEXT_TERT, alignment=TA_CENTER)
s['small'] = ParagraphStyle('Small', fontName='Helvetica', fontSize=9.5, leading=14, textColor=TEXT_SEC)

LOGO_PATH = "/home/claude/forgelight-logo-dark.png"

def add_header_footer(c, doc):
    c.saveState()
    w, h = letter
    # Logo in header
    try:
        c.drawImage(LOGO_PATH, doc.leftMargin, h - 52, width=120, height=24, preserveAspectRatio=True, mask='auto')
    except:
        c.setFont('Helvetica-Bold', 8.5)
        c.setFillColor(TEXT)
        c.drawString(doc.leftMargin, h - 40, "FORGELIGHT LABS")
    # Page number
    c.setFillColor(TEXT_TERT)
    c.setFont('Helvetica', 8)
    c.drawRightString(w - doc.rightMargin, h - 40, f"{doc.page}")
    # Warm accent line under header
    c.setStrokeColor(WARM)
    c.setLineWidth(1.5)
    c.line(doc.leftMargin, h - 56, w - doc.rightMargin, h - 56)
    # Footer
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)
    c.line(doc.leftMargin, 42, w - doc.rightMargin, 42)
    c.setFillColor(TEXT_TERT)
    c.setFont('Helvetica', 7.5)
    c.drawString(doc.leftMargin, 30, "forgelightlabs.com")
    c.drawCentredString(w / 2, 30, "Confidential")
    c.drawRightString(w - doc.rightMargin, 30, "david@forgelightlabs.com")
    c.restoreState()

story = []
story.append(Spacer(1, 14))
story.append(Paragraph("How Professional Services Firms Are<br/>Booking 5\u201310 Advisory Meetings a Month<br/>Without Cold Calling", s['title']))
story.append(Paragraph("A short breakdown of the system \u2014 and the math behind it.", s['subtitle']))
story.append(HRFlowable(width="100%", thickness=2, color=WARM, spaceAfter=16))

story.append(Paragraph("The Problem Nobody Talks About", s['section']))
story.append(Paragraph("Most professional services firms \u2014 accounting, financial advisory, law, consulting \u2014 generate new clients almost entirely through referrals and word of mouth.", s['body']))
story.append(Paragraph("It works. Until it doesn\u2019t.", s['bold']))
story.append(Paragraph("Referrals are unpredictable. You can\u2019t scale them. You can\u2019t forecast them. And if one or two key sources dry up, your pipeline disappears overnight. Partners know this is a risk \u2014 they just don\u2019t know what else to do.", s['body']))
story.append(Paragraph("\u201cWe\u2019re great at the work. We\u2019re terrible at generating it.\u201d", s['quote']))

stat_data = [
    [Paragraph("87%", s['stat_num']), Paragraph("47%", s['stat_num']), Paragraph("$0", s['stat_num'])],
    [Paragraph("of firms rely on referrals<br/>as their primary source<br/>of new business", s['stat_label']),
     Paragraph("of partners say pipeline<br/>generation is their<br/>biggest growth challenge", s['stat_label']),
     Paragraph("spent by most firms on<br/>systematic outbound<br/>client acquisition", s['stat_label'])],
]
st = Table(stat_data, colWidths=[2.15*inch]*3)
st.setStyle(TableStyle([
    ('ALIGN', (0,0), (-1,-1), 'CENTER'), ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('BACKGROUND', (0,0), (-1,-1), WARM),
    ('TOPPADDING', (0,0), (-1,0), 14), ('BOTTOMPADDING', (0,-1), (-1,-1), 14),
    ('LEFTPADDING', (0,0), (-1,-1), 10), ('RIGHTPADDING', (0,0), (-1,-1), 10),
]))
story.append(KeepTogether([Spacer(1,6), st]))

# PAGE 2
story.append(PageBreak())
story.append(Paragraph("The System: Three Steps", s['section']))
story.append(Paragraph("We built a done-for-you outbound system specifically for professional services firms. No cold calling. No LinkedIn spam. No marketing agency that burns budget on \u201cbrand awareness.\u201d", s['body']))

def step(num, title, body):
    rows = [[Paragraph(num, s['step_num']), Paragraph(title, s['step_title'])],
            [Paragraph("", s['step_body']), Paragraph(body, s['step_body'])]]
    t = Table(rows, colWidths=[0.45*inch, 5.85*inch])
    t.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),3)]))
    return t

story.append(KeepTogether([Spacer(1,4),
    step("01","We Build Your Infrastructure","Dedicated sending domains, warmed email accounts, full authentication (SPF, DKIM, DMARC), and a campaign platform \u2014 all configured to protect your firm\u2019s reputation. Your name is never on the cold outreach. We are invisible."),
    Spacer(1,6),
    step("02","We Find and Reach Your Ideal Clients","We identify business owners, CFOs, and decision-makers in your target industries using verified B2B data. Then we craft personalized outreach \u2014 written as your firm \u2014 and send at scale. Every email is tailored to the recipient\u2019s situation."),
    Spacer(1,6),
    step("03","You Take the Calls","When a prospect responds, we qualify them and route them to your calendar. You show up to a warm conversation with someone who already understands what you do and has indicated they need it. No cold calling. No pitching strangers."),
]))
story.append(Spacer(1,14))

story.append(Paragraph("The Math", s['section']))
story.append(Paragraph("Here\u2019s what a typical engagement looks like:", s['body']))
th = ParagraphStyle('th', fontName='Helvetica-Bold', fontSize=9.5, textColor=HexColor('#FAFAFA'))
thc = ParagraphStyle('thc', fontName='Helvetica-Bold', fontSize=9.5, textColor=HexColor('#FAFAFA'), alignment=TA_CENTER)
td = ParagraphStyle('td', fontName='Helvetica', fontSize=9.5, textColor=TEXT)
tdc = ParagraphStyle('tdc', fontName='Helvetica', fontSize=9.5, textColor=TEXT, alignment=TA_CENTER)
tda = ParagraphStyle('tda', fontName='Helvetica-Bold', fontSize=9.5, textColor=ACCENT, alignment=TA_CENTER)
md = [
    [Paragraph("Metric",th),Paragraph("Conservative",thc),Paragraph("Typical",thc)],
    [Paragraph("Prospects reached / month",td),Paragraph("3,000",tdc),Paragraph("5,000",tdc)],
    [Paragraph("Interested replies",td),Paragraph("15\u201330",tdc),Paragraph("25\u201350",tdc)],
    [Paragraph("Qualified conversations",td),Paragraph("5\u20138",tdc),Paragraph("10\u201315",tdc)],
    [Paragraph("New clients (@ 20% close)",td),Paragraph("1\u20132",tdc),Paragraph("2\u20133",tdc)],
    [Paragraph("Annual value (@ $15K avg)",td),Paragraph("$15\u2013$30K",tda),Paragraph("$30\u2013$45K",tda)],
]
mt = Table(md, colWidths=[3.1*inch,1.6*inch,1.6*inch])
mt.setStyle(TableStyle([
    ('BACKGROUND',(0,0),(-1,0),BG_DARK),('ALIGN',(1,0),(-1,-1),'CENTER'),('VALIGN',(0,0),(-1,-1),'MIDDLE'),
    ('GRID',(0,0),(-1,-1),0.5,BORDER),
    ('BACKGROUND',(0,1),(-1,1),WHITE),('BACKGROUND',(0,2),(-1,2),BG_LIGHT),
    ('BACKGROUND',(0,3),(-1,3),WHITE),('BACKGROUND',(0,4),(-1,4),BG_LIGHT),
    ('BACKGROUND',(0,5),(-1,5),WARM),
    ('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7),
    ('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),
]))
story.append(KeepTogether([mt, Spacer(1,6)]))
story.append(Paragraph("That\u2019s $180K\u2013$540K in new annual revenue from a system that runs in the background. Clients acquired this month keep paying next year. The compounding effect is the real story.", s['body']))

# Why This Works — keep together
story.append(KeepTogether([
    Paragraph("Why This Works (When Marketing Agencies Don\u2019t)", s['section']), Spacer(1,2),
    Paragraph("\u2022  <b>Direct outreach, not advertising.</b> We reach specific decision-makers at specific companies who match your ideal client profile. No \u201cbrand awareness\u201d campaigns.", s['bullet']),
    Paragraph("\u2022  <b>Written as your firm, not as us.</b> The prospect thinks your firm reached out directly. You own the conversation from the first reply.", s['bullet']),
    Paragraph("\u2022  <b>Measurable from day one.</b> You know exactly how many prospects were reached, how many replied, how many booked calls. No fuzzy metrics.", s['bullet']),
    Paragraph("\u2022  <b>Infrastructure you can own.</b> If you ever want to bring this in-house, the domains, accounts, and systems are yours. We can train your team to run it with AI. No vendor lock-in.", s['bullet']),
]))
story.append(Spacer(1,16))

# CTA
story.append(KeepTogether([
    HRFlowable(width="100%", thickness=1.5, color=WARM, spaceAfter=14),
    Paragraph("Ready to see if this fits your firm?", s['cta_head']),
    Paragraph("Book a 15-minute call with David. No generic pitch \u2014 we\u2019ll review your firm\u2019s situation and give you an honest assessment of whether this makes sense for you.", s['cta_body']),
    Paragraph('<link href="https://calendly.com/forgelightlabs/discovery" color="#64748B">\u2794  Book Your 15-Minute Call</link>', s['cta_link']),
    Paragraph("calendly.com/forgelightlabs/discovery", s['cta_small']),
    Spacer(1,10),
    Paragraph("Or reply to this email and we\u2019ll send a short questionnaire first \u2014 takes 3 minutes, helps us prepare specifics for your firm.",
        ParagraphStyle('Alt', fontName='Helvetica', fontSize=9.5, leading=14, textColor=TEXT_TERT, alignment=TA_CENTER)),
    HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=6),
]))

doc.build(story, onFirstPage=add_header_footer, onLaterPages=add_header_footer)
print(f"Done: {output_path}")
