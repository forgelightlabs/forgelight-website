from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether, PageBreak
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.pdfgen import canvas

# Colors
DARK = HexColor('#1a1a2e')
ACCENT = HexColor('#e94560')
BLUE = HexColor('#0f3460')
LIGHT_BG = HexColor('#f5f5f7')
GRAY = HexColor('#6b7280')
WHITE = HexColor('#ffffff')
LIGHT_ACCENT = HexColor('#fef2f2')
DARK_BG = HexColor('#f0f0f3')

output_path = "/home/claude/scale_tipper_v2.pdf"

# Custom page template for branding
class BrandedDocTemplate(SimpleDocTemplate):
    def __init__(self, *args, **kwargs):
        self.calendar_url = kwargs.pop('calendar_url', '#')
        super().__init__(*args, **kwargs)

def add_header_footer(canvas_obj, doc):
    canvas_obj.saveState()
    width, height = letter
    
    # Header bar
    canvas_obj.setFillColor(DARK)
    canvas_obj.rect(0, height - 36, width, 36, fill=True, stroke=False)
    
    # Brand name in header
    canvas_obj.setFillColor(ACCENT)
    canvas_obj.setFont('Helvetica-Bold', 9)
    canvas_obj.drawString(doc.leftMargin, height - 24, "FORGELIGHT")
    
    # Tagline
    canvas_obj.setFillColor(HexColor('#94a3b8'))
    canvas_obj.setFont('Helvetica', 7.5)
    canvas_obj.drawString(doc.leftMargin + 80, height - 24, "AI-Powered Client Acquisition")
    
    # Page number right
    canvas_obj.setFillColor(HexColor('#64748b'))
    canvas_obj.setFont('Helvetica', 7.5)
    canvas_obj.drawRightString(width - doc.rightMargin, height - 24, f"Page {doc.page}")
    
    # Footer line
    canvas_obj.setStrokeColor(HexColor('#e5e7eb'))
    canvas_obj.setLineWidth(0.5)
    canvas_obj.line(doc.leftMargin, 40, width - doc.rightMargin, 40)
    
    # Footer text
    canvas_obj.setFillColor(HexColor('#94a3b8'))
    canvas_obj.setFont('Helvetica', 7)
    canvas_obj.drawString(doc.leftMargin, 28, "Forgelight Labs  \u00b7  forgelightlabs.com  \u00b7  Confidential")
    canvas_obj.drawRightString(width - doc.rightMargin, 28, "david@forgelightlabs.com")
    
    canvas_obj.restoreState()

doc = BrandedDocTemplate(
    output_path,
    pagesize=letter,
    topMargin=0.7*inch,
    bottomMargin=0.7*inch,
    leftMargin=0.8*inch,
    rightMargin=0.8*inch,
    calendar_url='#',
)

# Styles
s = {}

s['title'] = ParagraphStyle(
    'Title', fontName='Helvetica-Bold', fontSize=24, leading=30,
    textColor=DARK, spaceAfter=4,
)

s['subtitle'] = ParagraphStyle(
    'Subtitle', fontName='Helvetica', fontSize=12, leading=17,
    textColor=GRAY, spaceAfter=16,
)

s['section'] = ParagraphStyle(
    'Section', fontName='Helvetica-Bold', fontSize=15, leading=20,
    textColor=BLUE, spaceBefore=20, spaceAfter=6,
)

s['body'] = ParagraphStyle(
    'Body', fontName='Helvetica', fontSize=10.5, leading=16,
    textColor=DARK, spaceAfter=8,
)

s['bold'] = ParagraphStyle(
    'Bold', fontName='Helvetica-Bold', fontSize=10.5, leading=16,
    textColor=DARK, spaceAfter=8,
)

s['quote'] = ParagraphStyle(
    'Quote', fontName='Helvetica-Oblique', fontSize=11.5, leading=17,
    textColor=BLUE, leftIndent=16, rightIndent=16, spaceBefore=10, spaceAfter=10,
)

s['stat_num'] = ParagraphStyle(
    'StatNum', fontName='Helvetica-Bold', fontSize=26, leading=30,
    textColor=ACCENT, alignment=TA_CENTER,
)

s['stat_label'] = ParagraphStyle(
    'StatLabel', fontName='Helvetica', fontSize=8.5, leading=12,
    textColor=GRAY, alignment=TA_CENTER,
)

s['step_num'] = ParagraphStyle(
    'StepNum', fontName='Helvetica-Bold', fontSize=12, textColor=ACCENT,
)

s['step_title'] = ParagraphStyle(
    'StepTitle', fontName='Helvetica-Bold', fontSize=11.5, leading=16, textColor=DARK,
)

s['step_body'] = ParagraphStyle(
    'StepBody', fontName='Helvetica', fontSize=10, leading=15, textColor=GRAY,
)

s['bullet'] = ParagraphStyle(
    'Bullet', fontName='Helvetica', fontSize=10, leading=15,
    textColor=DARK, spaceAfter=6, leftIndent=16,
)

s['cta_head'] = ParagraphStyle(
    'CTAHead', fontName='Helvetica-Bold', fontSize=14, leading=20,
    textColor=BLUE, alignment=TA_CENTER, spaceBefore=12, spaceAfter=6,
)

s['cta_body'] = ParagraphStyle(
    'CTABody', fontName='Helvetica', fontSize=10.5, leading=16,
    textColor=DARK, alignment=TA_CENTER, spaceAfter=12,
)

s['cta_link'] = ParagraphStyle(
    'CTALink', fontName='Helvetica-Bold', fontSize=12, leading=17,
    textColor=ACCENT, alignment=TA_CENTER, spaceAfter=6,
)

s['cta_small'] = ParagraphStyle(
    'CTASmall', fontName='Helvetica', fontSize=9, leading=13,
    textColor=GRAY, alignment=TA_CENTER, spaceAfter=4,
)

s['small'] = ParagraphStyle(
    'Small', fontName='Helvetica', fontSize=9.5, leading=14, textColor=GRAY,
)

# ============================
# BUILD STORY
# ============================
story = []

# --- PAGE 1: Title + Problem + Stats ---

story.append(Spacer(1, 8))

story.append(Paragraph(
    "How Professional Services Firms Are<br/>Booking 5\u201310 Advisory Meetings a Month<br/>Without Cold Calling",
    s['title']
))

story.append(Paragraph(
    "A short breakdown of the system \u2014 and the math behind it.",
    s['subtitle']
))

story.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT, spaceAfter=16))

# Problem section
story.append(Paragraph("The Problem Nobody Talks About", s['section']))

story.append(Paragraph(
    "Most professional services firms \u2014 accounting, financial advisory, law, consulting \u2014 "
    "generate new clients almost entirely through referrals and word of mouth.",
    s['body']
))

story.append(Paragraph(
    "It works. Until it doesn\u2019t.",
    s['bold']
))

story.append(Paragraph(
    "Referrals are unpredictable. You can\u2019t scale them. You can\u2019t forecast them. "
    "And if one or two key sources dry up, your pipeline disappears overnight. "
    "Partners know this is a risk \u2014 they just don\u2019t know what else to do.",
    s['body']
))

story.append(Paragraph(
    "\u201cWe\u2019re great at the work. We\u2019re terrible at generating it.\u201d",
    s['quote']
))

# Stats - keep together to avoid orphaning
stat_data = [
    [
        Paragraph("87%", s['stat_num']),
        Paragraph("47%", s['stat_num']),
        Paragraph("$0", s['stat_num']),
    ],
    [
        Paragraph("of firms rely on referrals<br/>as their primary source<br/>of new business", s['stat_label']),
        Paragraph("of partners say pipeline<br/>generation is their<br/>biggest growth challenge", s['stat_label']),
        Paragraph("spent by most firms on<br/>systematic outbound<br/>client acquisition", s['stat_label']),
    ],
]

stat_table = Table(stat_data, colWidths=[2.15*inch, 2.15*inch, 2.15*inch])
stat_table.setStyle(TableStyle([
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('BACKGROUND', (0, 0), (-1, -1), LIGHT_BG),
    ('TOPPADDING', (0, 0), (-1, 0), 14),
    ('BOTTOMPADDING', (0, -1), (-1, -1), 14),
    ('LEFTPADDING', (0, 0), (-1, -1), 10),
    ('RIGHTPADDING', (0, 0), (-1, -1), 10),
]))

story.append(KeepTogether([
    Spacer(1, 6),
    stat_table,
    Spacer(1, 4),
]))

# --- PAGE 2: The System (3 Steps) + The Math ---
story.append(PageBreak())

story.append(Paragraph("The System: Three Steps", s['section']))

story.append(Paragraph(
    "We built a done-for-you outbound system specifically for professional services firms. "
    "No cold calling. No LinkedIn spam. No marketing agency that burns budget on \u201cbrand awareness.\u201d",
    s['body']
))

# Keep all 3 steps together
def make_step(num, title, body_text):
    rows = [
        [Paragraph(num, s['step_num']), Paragraph(title, s['step_title'])],
        [Paragraph("", s['step_body']), Paragraph(body_text, s['step_body'])],
    ]
    t = Table(rows, colWidths=[0.45*inch, 5.85*inch])
    t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    return t

steps_block = KeepTogether([
    Spacer(1, 4),
    make_step("01", "We Build Your Infrastructure",
        "Dedicated sending domains, warmed email accounts, full authentication (SPF, DKIM, DMARC), "
        "and a campaign platform \u2014 all configured to protect your firm\u2019s reputation. "
        "Your name is never on the cold outreach. We are invisible."),
    Spacer(1, 6),
    make_step("02", "We Find and Reach Your Ideal Clients",
        "We identify business owners, CFOs, and decision-makers in your target industries using verified B2B data. "
        "Then we craft personalized outreach \u2014 written as your firm \u2014 and send at scale. "
        "Every email is tailored to the recipient\u2019s situation."),
    Spacer(1, 6),
    make_step("03", "You Take the Calls",
        "When a prospect responds, we qualify them and route them to your calendar. "
        "You show up to a warm conversation with someone who already understands what you do "
        "and has indicated they need it. No cold calling. No pitching strangers."),
])

story.append(steps_block)
story.append(Spacer(1, 12))

# The Math section
story.append(Paragraph("The Math", s['section']))

story.append(Paragraph(
    "Here\u2019s what a typical engagement looks like for a mid-sized firm:",
    s['body']
))

th = ParagraphStyle('th', fontName='Helvetica-Bold', fontSize=9.5, textColor=WHITE)
th_c = ParagraphStyle('thc', fontName='Helvetica-Bold', fontSize=9.5, textColor=WHITE, alignment=TA_CENTER)
td = ParagraphStyle('td', fontName='Helvetica', fontSize=9.5, textColor=DARK)
td_c = ParagraphStyle('tdc', fontName='Helvetica', fontSize=9.5, textColor=DARK, alignment=TA_CENTER)
td_accent = ParagraphStyle('tda', fontName='Helvetica-Bold', fontSize=9.5, textColor=ACCENT, alignment=TA_CENTER)

math_data = [
    [Paragraph("Metric", th), Paragraph("Conservative", th_c), Paragraph("Typical", th_c)],
    [Paragraph("Prospects reached / month", td), Paragraph("3,000", td_c), Paragraph("5,000", td_c)],
    [Paragraph("Interested replies", td), Paragraph("15\u201330", td_c), Paragraph("25\u201350", td_c)],
    [Paragraph("Qualified conversations booked", td), Paragraph("5\u20138", td_c), Paragraph("10\u201315", td_c)],
    [Paragraph("New clients closed (@ 20% close)", td), Paragraph("1\u20132", td_c), Paragraph("2\u20133", td_c)],
    [Paragraph("Annual value per client (@ $15K avg)", td), Paragraph("$15\u2013$30K", td_accent), Paragraph("$30\u2013$45K", td_accent)],
]

math_table = Table(math_data, colWidths=[3.1*inch, 1.6*inch, 1.6*inch])
math_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), BLUE),
    ('ALIGN', (1, 0), (-1, -1), 'CENTER'),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#e5e7eb')),
    ('BACKGROUND', (0, 1), (-1, 1), WHITE),
    ('BACKGROUND', (0, 2), (-1, 2), LIGHT_BG),
    ('BACKGROUND', (0, 3), (-1, 3), WHITE),
    ('BACKGROUND', (0, 4), (-1, 4), LIGHT_BG),
    ('BACKGROUND', (0, 5), (-1, 5), LIGHT_ACCENT),
    ('TOPPADDING', (0, 0), (-1, -1), 7),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
    ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ('RIGHTPADDING', (0, 0), (-1, -1), 8),
]))

story.append(KeepTogether([math_table, Spacer(1, 6)]))

story.append(Paragraph(
    "That\u2019s $180K\u2013$540K in new annual revenue from a system that runs in the background. "
    "The compounding effect is the real story \u2014 clients acquired this month keep paying next year.",
    s['body']
))

# --- Why This Works --- Keep header with content
why_block = [
    Paragraph("Why This Works (When Marketing Agencies Don\u2019t)", s['section']),
]

diff_items = [
    "<b>Direct outreach, not advertising.</b> We reach specific decision-makers at specific companies "
    "who match your ideal client profile. No \u201cbrand awareness\u201d campaigns.",
    "<b>Written as your firm, not as us.</b> The prospect thinks your firm reached out directly. "
    "You own the conversation from the first reply.",
    "<b>Measurable from day one.</b> You know exactly how many prospects were reached, "
    "how many replied, how many booked calls. No fuzzy metrics.",
    "<b>Infrastructure you can own.</b> If you ever want to bring this in-house, "
    "the domains, accounts, and systems are yours. We can train your team to run it with AI. "
    "No vendor lock-in.",
]

diff_block = why_block + [Spacer(1, 2)]
for item in diff_items:
    diff_block.append(Paragraph("\u2022  " + item, s['bullet']))

story.append(KeepTogether(diff_block))

story.append(Spacer(1, 16))

# --- CTA BLOCK --- Keep together so it doesn't orphan
cta_block = [
    HRFlowable(width="100%", thickness=1, color=HexColor('#e5e7eb'), spaceAfter=14),
    Paragraph("Ready to see if this fits your firm?", s['cta_head']),
    Paragraph(
        "Book a 15-minute call with David. No generic pitch \u2014 we\u2019ll review your firm\u2019s "
        "situation and give you an honest assessment of whether this system makes sense for you.",
        s['cta_body']
    ),
    Paragraph(
        '<link href="https://calendly.com/forgelightlabs/discovery" color="#e94560">'
        '\u2794  Book Your 15-Minute Call'
        '</link>',
        s['cta_link']
    ),
    Paragraph(
        "calendly.com/forgelightlabs/discovery",
        s['cta_small']
    ),
    Spacer(1, 10),
    Paragraph(
        "Or reply to this email and we\u2019ll send you a short questionnaire first \u2014 "
        "takes 3 minutes, helps us come to the call prepared with specifics for your firm.",
        ParagraphStyle('CTAAlt', fontName='Helvetica', fontSize=9.5, leading=14,
                       textColor=GRAY, alignment=TA_CENTER, spaceAfter=6)
    ),
    HRFlowable(width="100%", thickness=0.5, color=HexColor('#e5e7eb'), spaceAfter=6),
]

story.append(KeepTogether(cta_block))

# Build
doc.build(story, onFirstPage=add_header_footer, onLaterPages=add_header_footer)
print(f"Scale Tipper v2 created: {output_path}")
