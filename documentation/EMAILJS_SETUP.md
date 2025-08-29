# EmailJS Setup Guide for Bostify Website

## Overview
EmailJS is integrated into the contact forms to send email notifications when users submit inquiries or purchase audits.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service
1. Go to Email Services in your dashboard
2. Add a new service (Gmail, Outlook, etc.)
3. Follow the authorization process
4. Copy the **Service ID** (e.g., `service_Bostify`)

### 3. Create Email Templates
Create the following templates:

#### Template 1: Contact Form Submission
- **Template ID**: `template_contact`
- **Template Name**: Contact Form Inquiry
- **Subject**: New Contact Inquiry from {{from_name}}
- **Content**:
```
New contact inquiry from Bostify website:

Name: {{from_name}}
Email: {{from_email}}
Website: {{website}}
Phone: {{phone}}
Service: {{service}}
Timeline: {{timeline}}

Business Goals:
{{business_goals}}

Newsletter Subscription: {{newsletter}}

This inquiry was submitted at {{submission_date}}.
```

#### Template 2: Monthly Audit Purchase
- **Template ID**: `template_monthly_audit`
- **Template Name**: Monthly Audit Service Order
- **Subject**: New Monthly Audit Order from {{from_name}}
- **Content**:
```
New monthly audit service order from Bostify website:

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Website: {{website}}
Phone: {{phone}}

Selected Plan: {{plan}}
Price: {{price}}

Additional Message:
{{message}}

Service Type: {{service_type}}

This order was submitted at {{submission_date}}.
```

### 4. Get Your Keys
1. Go to Account > General
2. Copy your **Public Key** (e.g., `your_public_key_here`)

### 5. Configure the Website
Replace the following placeholders in the website files:

1. In `pages/contact.html`:
   - Replace `YOUR_PUBLIC_KEY` with your actual public key
   - Replace `service_Bostify` with your actual service ID
   - Replace `template_contact` with your actual template ID

2. In `pages/monthly-audit.html`:
   - Replace `YOUR_PUBLIC_KEY` with your actual public key
   - Replace `service_Bostify` with your actual service ID
   - Replace `template_monthly_audit` with your actual template ID

## Files Modified
- `pages/contact.html` - Contact form with EmailJS integration
- `pages/monthly-audit.html` - Monthly audit form with EmailJS integration
