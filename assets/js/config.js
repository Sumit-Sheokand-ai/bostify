/**
 * Bostify SEO Payment Configuration
 * 
 * This file contains all payment-related configuration for the Bostify SEO website
 * including pricing, Stripe checkout links, PayPal settings, and admin email.
 * 
 * IMPORTANT: Do NOT store real API keys or sensitive data in public repositories.
 * Replace the placeholders below with your real keys in a secure/private environment.
 */

window.Bostify_PAYMENT_CONFIG = {
  // Site Settings
  siteUrl: "https://bostify.com",
  siteName: "Bostify",
  businessOwner: "Sumit Sheokand",
  adminEmail: "sumitsheokand347@gmail.com",
  supportEmail: "support@Bostify.com",
  businessPhone: "+1(905)961-1902",
  
  // PayPal Configuration
  paypal: {
    clientId: "AQ8k0aDREdXnxFEkff8KN-YKSSfamT_JsozBGT2OU2Oaz7b41sx3gYDPfywmJjXJd4WvcH778BfzenC_", // Live PayPal client ID
    currency: "CAD",
    environment: "live", // Changed to live for production
    // Monthly subscription plan IDs (create these in PayPal Dashboard)
    plans: {
      essential: "P-72525346SJ635940RNCYRP7I", // Replace with actual PayPal plan ID
      professional: "P-1R507775TN084534GNCYRR5A", // Replace with actual PayPal plan ID
      enterprise2000: "P-39E56739XW385500SNCYR2000", // $2000 monthly plan (CAD)
      enterprise: "P-6GD104850B817825DNCYR3OA" // Replace with actual PayPal plan ID
    }
  },
  
  // Stripe Configuration
  stripe: {
    publishableKey: "pk_live_51Rz61fRMLubk1q1npVm94scgNeWktQUPqLcON7TXqA5tezo2V1rAd7Mjw3nN0vSU943uSeQDhIdeKmCmtHZNiVD700zOzrDRSD", // Live Stripe key
    environment: "live", // Changed to live for production
    // Product IDs
    productIds: {
      basic: "prod_SxEAXfi7LqAWYF",
      comprehensive: "prod_SxEVrtPRN64oep",
      enterprise: "prod_SxEaAPGClKHYWP"
    },
    // Subscription Product IDs
    subscriptionProductIds: {
      essential: "prod_SxEgr58AJ4cN0x",
      professional: "prod_SxEgNFuKxEQLys",
      enterprise2000: "prod_SxEh7kvtLAxDvW",
      enterprise: "prod_SxEhr5msBU8bas"
    },
    // One-time payment links
    checkoutLinks: {
      basic: "https://buy.stripe.com/fZudRbbslg4D3lL2Kz9Ve00",
      comprehensive: "https://buy.stripe.com/eVqeVffIB7y7g8xcl99Ve01",
      enterprise: "https://buy.stripe.com/8x25kF6817y76xX70P9Ve02"
    },
    // Monthly subscription links
    subscriptionLinks: {
      essential: "https://buy.stripe.com/fZueVfgMFbOn8G5cl99Ve03",
      professional: "https://buy.stripe.com/4gM00laohcSrf4t84T9Ve04",
      enterprise2000: "https://buy.stripe.com/4gM7sNgMF19JcWlad19Ve05",
      enterprise: "https://buy.stripe.com/9B6aEZfIB2dN8G570P9Ve06"
    }
  },
  
  // Service Pricing (in CAD)
  pricing: {
    oneTime: {
      basic: {
        name: "Basic SEO Audit",
        price: 500.00,
        description: "Comprehensive analysis of your website's SEO performance with actionable recommendations.",
        features: ["Technical SEO analysis", "On-page optimization review", "Site speed assessment", "Mobile-friendliness check", "Basic competitor analysis", "Prioritized action plan"]
      },
      comprehensive: {
        name: "Comprehensive SEO Audit",
        price: 1000.00,
        description: "Complete technical analysis with content audit and competitor research.",
        features: ["Complete technical analysis", "Content & keyword audit", "Backlink profile analysis", "Local SEO assessment", "Detailed competitor research", "Custom SEO strategy", "1-hour consultation call"]
      },
      enterprise: {
        name: "Enterprise SEO Audit",
        price: 2000.00,
        description: "Full-scale enterprise audit with ongoing support and team training.",
        features: ["Full-scale enterprise audit", "Multiple domain analysis", "International SEO review", "Advanced technical audit", "Team training session", "90-day implementation roadmap", "Ongoing support for 30 days"]
      }
    },
    monthly: {
      essential: {
        name: "Essential Monitoring",
        price: 799.00,
        description: "Basic SEO monitoring with monthly reports and email support.",
        features: ["Technical SEO audit", "On-page optimization check", "Performance monitoring", "Monthly report", "Priority recommendations", "Email support"]
      },
      professional: {
        name: "Professional Monitoring",
        price: 1500.00,
        description: "Advanced SEO monitoring with competitor analysis and strategy calls.",
        features: ["Everything in Essential", "Comprehensive competitor analysis", "Link profile monitoring", "Content optimization suggestions", "Keyword opportunity tracking", "Monthly strategy call (30 min)", "Priority email support"],
        popular: true
      },
      enterprise2000: {
        name: "Enterprise Monitoring",
        price: 2000.00,
        description: "Enterprise-level SEO monitoring with advanced features and dedicated support.",
        features: ["Everything in Professional", "Multi-site monitoring (up to 3)", "Advanced competitor intelligence", "Custom dashboard access", "Monthly strategy session (45 min)", "Priority support", "Phone & email support"]
      },
      enterprise: {
        name: "Complete Monitoring",
        price: 2500.00,
        description: "Comprehensive SEO monitoring with dedicated account manager and multi-site support.",
        features: ["Everything in Professional", "Multi-site monitoring (up to 5)", "Advanced competitor intelligence", "Custom dashboard access", "Monthly strategy session (60 min)", "Dedicated account manager", "Phone & email support"]
      }
    }
  },
  
  // EmailJS Configuration for form submissions
  emailjs: {
    serviceId: "service_lqo17bk", // Replace with your actual EmailJS service ID
    templateId: "template_noice5r", // Replace with your actual EmailJS template ID
    publicKey: "1CLi83bvtJrxPnH1m", // Replace with your actual EmailJS public key
    enabled: true
  },
  
  // URL Configuration
  urls: {
    home: "/",
    services: "/pages/services.html",
    pricing: "/pages/pricing.html",
    monthlyAudit: "/pages/monthly-audit.html",
    contact: "/pages/contact.html",
    paymentSuccess: "/pages/payment-success.html",
    paymentCancel: "/pages/payment-cancel.html",
    privacyPolicy: "/pages/privacy-policy.html",
    termsOfService: "/pages/terms-of-service.html"
  },
  
  // Analytics Configuration
  analytics: {
    googleAnalytics: {
      trackingId: "G-Z4E591FCE0", // GA4 Measurement ID
      enabled: true, // GA enabled site-wide
      stream: {
        name: "Bostify Website",
        url: "https://www.bostify.me",
        streamId: "12093760477"
      }
    },
  // Facebook Pixel removed per privacy request
    hotjar: {
      siteId: "HOTJAR_SITE_ID", // Replace with your Hotjar site ID
      enabled: false // Enable when ready
    }
  },
  
  // SEO Settings
  seo: {
    defaultTitle: "Bostify - SEO Services That Get Results | Rank Higher on Google",
    defaultDescription: "Professional SEO services by Sumit Sheokand. Rank higher on Google, get more customers, and grow your business with proven SEO strategies.",
    defaultKeywords: ["SEO services", "search engine optimization", "Google ranking", "SEO expert", "digital marketing", "website optimization"],
  // Twitter and Facebook references removed per privacy request
    linkedInProfile: "https://linkedin.com/in/sumitsheokand"
  },
  
  // Feature Flags
  features: {
    blogEnabled: true,
    caseStudiesEnabled: true,
    monthlyAuditsEnabled: true,
    chatBotEnabled: false,
    newsletterEnabled: true,
    darkModeEnabled: false
  },
  
  // Rate Limiting
  rateLimiting: {
    contactFormSubmissions: 3, // Per hour
    auditRequestSubmissions: 2, // Per day
    newsletterSignups: 5 // Per day
  }
};

// Freeze the configuration to prevent accidental modifications
Object.freeze(window.Bostify_PAYMENT_CONFIG);

console.log("Bostify Payment Configuration loaded successfully");
// End of config.js
