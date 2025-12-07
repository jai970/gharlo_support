# 🔗 Make.com Integration Guide

Automate your lead workflows with Make.com (formerly Integromat)!

## What You Can Automate

With Make.com, you can automatically:
- ✅ Send leads to Google Sheets
- ✅ Create tasks in Trello/Asana
- ✅ Send notifications to Slack/Discord
- ✅ Add contacts to CRM (HubSpot, Salesforce)
- ✅ Send WhatsApp messages via Twilio
- ✅ Create calendar events
- ✅ Send SMS notifications
- ✅ Update Airtable databases
- ✅ And 1000+ more integrations!

## Setup Steps

### Step 1: Create Make.com Account (2 min)

1. Go to https://www.make.com/en/register
2. Sign up (free plan available)
3. Verify your email

### Step 2: Create a New Scenario (1 min)

1. Click **"Create a new scenario"**
2. Search for **"Webhooks"**
3. Select **"Webhooks"** module
4. Choose **"Custom webhook"**

### Step 3: Get Your Webhook URL (1 min)

1. Click **"Add"** to create a new webhook
2. Give it a name: `Gharlo Support Leads`
3. Click **"Save"**
4. **Copy the webhook URL** (looks like: `https://hook.us1.make.com/xxxxxxxxxxxxx`)

### Step 4: Add Webhook URL to Your App (1 min)

#### For Local Development:

Add to `.env.local`:
```env
MAKE_WEBHOOK_URL=https://hook.us1.make.com/xxxxxxxxxxxxx
WEBHOOK_SECRET=your_random_secret_key
```

#### For Production (Vercel):

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - Name: `MAKE_WEBHOOK_URL`
   - Value: Your Make.com webhook URL
   - Select: Production, Preview, Development
3. Add:
   - Name: `WEBHOOK_SECRET`
   - Value: Any random string (e.g., `gharlo_2024_secret_key`)
   - Select: Production, Preview, Development
4. Redeploy

### Step 5: Test the Webhook (2 min)

1. In Make.com, click **"Run once"** (bottom left)
2. Go to your website
3. Fill out the lead form
4. Submit
5. Go back to Make.com
6. You should see the data appear!

### Step 6: Add Actions (5 min)

Now add what you want to do with the lead data:

#### Example 1: Send to Google Sheets

1. Click the **+** button after the webhook
2. Search for **"Google Sheets"**
3. Choose **"Add a row"**
4. Connect your Google account
5. Select your spreadsheet
6. Map the fields:
   - Name → `{{1.name}}`
   - Email → `{{1.email}}`
   - Phone → `{{1.phone}}`
   - City → `{{1.city}}`
   - Timestamp → `{{1.timestamp}}`

#### Example 2: Send Slack Notification

1. Click the **+** button
2. Search for **"Slack"**
3. Choose **"Create a message"**
4. Connect your Slack workspace
5. Select channel
6. Message template:
   ```
   🎉 New Lead!
   Name: {{1.name}}
   Email: {{1.email}}
   Phone: {{1.phone}}
   City: {{1.city}}
   ```

#### Example 3: Send WhatsApp via Twilio

1. Click the **+** button
2. Search for **"Twilio"**
3. Choose **"Send SMS/WhatsApp"**
4. Connect Twilio account
5. To: Your phone number
6. Message:
   ```
   New lead from {{1.city}}!
   Name: {{1.name}}
   Phone: {{1.phone}}
   ```

### Step 7: Activate Scenario

1. Click **"Save"** (bottom left)
2. Toggle the switch to **ON**
3. Your automation is now live! 🎉

## Data Structure

Your webhook receives this data:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "city": "Bangalore",
  "source": "checklist_download",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "platform": "gharlo_support"
}
```

## Example Workflows

### Workflow 1: Lead to Google Sheets + Slack
1. Webhook receives lead
2. Add row to Google Sheets
3. Send Slack notification to #leads channel
4. Send email to sales team

### Workflow 2: Lead to CRM + WhatsApp
1. Webhook receives lead
2. Create contact in HubSpot
3. Send WhatsApp message to you
4. Create follow-up task

### Workflow 3: Lead to Multiple Destinations
1. Webhook receives lead
2. Add to Google Sheets
3. Add to Airtable
4. Send to Zapier (for other automations)
5. Trigger email sequence

## Testing

### Test Webhook Endpoint

Visit: `https://your-site.vercel.app/api/webhook/make`

Should return:
```json
{
  "status": "active",
  "message": "Make.com webhook endpoint is ready",
  "configured": true
}
```

### Test with cURL

```bash
curl -X POST https://your-site.vercel.app/api/webhook/make \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: your_secret_key" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "city": "Bangalore"
  }'
```

## Troubleshooting

### Webhook Not Receiving Data

1. **Check Make.com is running:**
   - Scenario must be ON (toggle switch)
   - Click "Run once" to test

2. **Check webhook URL:**
   - Verify URL in .env.local or Vercel
   - Make sure no extra spaces

3. **Check logs:**
   - Vercel: Check function logs
   - Make.com: Check execution history

### Data Not Appearing in Make.com

1. **Check form submission:**
   - Submit form on your site
   - Check browser console for errors
   - Check Supabase for lead entry

2. **Check Make.com webhook:**
   - Go to webhook settings
   - Check "Received data" tab
   - Should show recent requests

### Scenario Not Running

1. **Check scenario status:**
   - Must be ON (green toggle)
   - Check for errors in execution history

2. **Check connections:**
   - Google Sheets, Slack, etc. must be connected
   - Reauthorize if needed

## Security

### Webhook Secret

The webhook secret prevents unauthorized access:

1. Generate a strong secret:
   ```bash
   openssl rand -base64 32
   ```

2. Add to environment variables
3. Make.com will need to send this in headers

### Rate Limiting

Make.com free plan limits:
- 1,000 operations/month
- 15-minute intervals

Upgrade if you need more.

## Cost

### Make.com Pricing

- **Free:** 1,000 operations/month
- **Core:** $9/month - 10,000 operations
- **Pro:** $16/month - 10,000 operations + advanced features
- **Teams:** $29/month - 10,000 operations + team features

### What Counts as an Operation?

- 1 webhook receive = 1 operation
- 1 Google Sheets row = 1 operation
- 1 Slack message = 1 operation

Example: Lead → Sheets + Slack = 3 operations

## Advanced: Multiple Webhooks

You can create different webhooks for different events:

### Webhook 1: New Leads
`/api/webhook/make` - For new lead submissions

### Webhook 2: Bookings
Create: `/api/webhook/make/booking` - For service bookings

### Webhook 3: Status Updates
Create: `/api/webhook/make/status` - For project status changes

## Support

- **Make.com Docs:** https://www.make.com/en/help
- **Make.com Community:** https://community.make.com
- **Video Tutorials:** https://www.make.com/en/academy

## Next Steps

1. ✅ Set up Make.com account
2. ✅ Create webhook
3. ✅ Add to environment variables
4. ✅ Test with form submission
5. ✅ Add your first automation
6. ✅ Activate scenario

---

**Your leads will now automatically flow into your tools!** 🚀

Need help? Check Make.com's excellent documentation and video tutorials.
